import { FastifyPluginAsync } from 'fastify';
import { DESTINATIONS } from '../data/destinations.js';
import { INDIAN_STATES } from '../data/states.js';
import { HOTELS, HotelProperty } from '../data/hotels.js';
import { FESTIVALS } from '../data/festivals.js';
import { REGIONAL_CUISINES } from '../data/cuisines.js';
import { HERITAGE_TRAILS } from '../data/trails.js';
import { TRIVIA_QUESTIONS } from '../data/trivia.js';
import {
  DestinationQuerySchema,
  ItineraryRequestSchema,
  CostCalculationSchema,
  HotelSearchQuerySchema,
  HotelBookingSchema,
  AIChatSchema,
  InquirySchema,
  TriviaVerifySchema
} from '../schemas/index.js';
import { generateCustomItinerary } from '../services/itineraryGenerator.js';
import { calculateTripCostEstimate } from '../services/costCalculator.js';
import { AIProviderError, processAIChatMessage } from '../services/aiChatService.js';
import { getSearchSuggestions, resolveLocationQuery } from '../services/geocodingService.js';

export const apiRoutes: FastifyPluginAsync = async (fastify) => {
  const chatRequests = new Map<string, number[]>();
  const chatWindowMs = 60_000;
  const maxChatRequestsPerWindow = 12;

  // 1. Universal Instant Search Suggestions
  fastify.get('/search/suggest', async (request) => {
    const { q } = request.query as { q?: string };
    const suggestions = getSearchSuggestions(q || '');
    return {
      success: true,
      data: {
        query: q || '',
        total: suggestions.length,
        suggestions,
      }
    };
  });

  // 2. Universal Geocoding & Location Proximity Resolution
  fastify.get('/search/resolve', async (request, reply) => {
    const { q, radius } = request.query as { q?: string; radius?: string };
    if (!q || q.trim().length === 0) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'EMPTY_QUERY',
          message: 'Please provide a location, place, district, state, or PIN code query.',
        }
      });
    }

    const radiusKm = radius ? parseInt(radius, 10) : 35;
    const result = resolveLocationQuery(q, radiusKm);

    return {
      success: true,
      data: { result }
    };
  });

  // 3. Get Destinations with search and filtering
  fastify.get('/destinations', async (request, reply) => {
    const parseResult = DestinationQuerySchema.safeParse(request.query);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'INVALID_QUERY',
          message: 'Invalid destination filter parameters',
          details: parseResult.error.format()
        }
      });
    }

    const { search, region, category, unescoOnly } = parseResult.data;
    let filtered = [...DESTINATIONS];

    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.keyAttractions.some(a => a.toLowerCase().includes(q))
      );
    }

    if (region && region !== 'all') {
      filtered = filtered.filter(d => d.region === region);
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(d => d.category === category);
    }

    if (unescoOnly === 'true') {
      filtered = filtered.filter(d => d.isUnesco);
    }

    return {
      success: true,
      data: {
        total: filtered.length,
        destinations: filtered
      }
    };
  });

  // 4. Get Single Destination by ID
  fastify.get('/destinations/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const destination = DESTINATIONS.find(d => d.id === id);

    if (!destination) {
      return reply.status(404).send({
        success: false,
        error: {
          code: 'DESTINATION_NOT_FOUND',
          message: `Destination with ID '${id}' was not found.`
        }
      });
    }

    return {
      success: true,
      data: { destination }
    };
  });

  // 5. Stays & Hotels Marketplace Search & Filters
  fastify.get('/hotels', async (request, reply) => {
    const parseResult = HotelSearchQuerySchema.safeParse(request.query);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'INVALID_HOTEL_QUERY',
          message: 'Invalid hotel search parameters',
          details: parseResult.error.format()
        }
      });
    }

    const {
      destinationId,
      city,
      search,
      propertyType,
      minStarRating,
      minReviewScore,
      minPrice,
      maxPrice,
      freeCancellationOnly,
      breakfastIncludedOnly,
      facility,
      sortBy
    } = parseResult.data;

    let filtered: HotelProperty[] = [...HOTELS];

    if (destinationId) {
      filtered = filtered.filter(h => h.destinationId === destinationId);
    }

    if (city) {
      const c = city.toLowerCase();
      filtered = filtered.filter(h => h.city.toLowerCase().includes(c) || h.state.toLowerCase().includes(c));
    }

    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.primaryLandmark.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
      );
    }

    if (propertyType && propertyType !== 'all') {
      filtered = filtered.filter(h => h.propertyType === propertyType);
    }

    if (minStarRating) {
      const star = parseInt(minStarRating, 10);
      filtered = filtered.filter(h => h.starRating >= star);
    }

    if (minReviewScore) {
      const score = parseFloat(minReviewScore);
      filtered = filtered.filter(h => h.reviewScore >= score);
    }

    if (minPrice) {
      const minP = parseInt(minPrice, 10);
      filtered = filtered.filter(h => h.rooms.some(r => r.pricePerNightINR >= minP));
    }

    if (maxPrice) {
      const maxP = parseInt(maxPrice, 10);
      filtered = filtered.filter(h => h.rooms.some(r => r.pricePerNightINR <= maxP));
    }

    if (freeCancellationOnly === 'true') {
      filtered = filtered.filter(h => h.rooms.some(r => r.freeCancellation));
    }

    if (breakfastIncludedOnly === 'true') {
      filtered = filtered.filter(h => h.rooms.some(r => r.breakfastIncluded));
    }

    if (facility) {
      filtered = filtered.filter(h => h.facilities.includes(facility));
    }

    // Sorting
    if (sortBy === 'price_asc') {
      filtered.sort((a, b) => (a.rooms[0]?.pricePerNightINR || 0) - (b.rooms[0]?.pricePerNightINR || 0));
    } else if (sortBy === 'price_desc') {
      filtered.sort((a, b) => (b.rooms[0]?.pricePerNightINR || 0) - (a.rooms[0]?.pricePerNightINR || 0));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.reviewScore - a.reviewScore);
    } else if (sortBy === 'distance') {
      filtered.sort((a, b) => parseFloat(a.landmarkDistance) - parseFloat(b.landmarkDistance));
    } else {
      filtered.sort((a, b) => (b.reviewScore * 10 + b.starRating * 5) - (a.reviewScore * 10 + a.starRating * 5));
    }

    return {
      success: true,
      data: {
        total: filtered.length,
        hotels: filtered,
      }
    };
  });

  // 6. Get Single Hotel Details by ID or Slug
  fastify.get('/hotels/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const hotel = HOTELS.find(h => h.id === id || h.slug === id);

    if (!hotel) {
      return reply.status(404).send({
        success: false,
        error: {
          code: 'HOTEL_NOT_FOUND',
          message: `Hotel property with ID or slug '${id}' was not found.`
        }
      });
    }

    return {
      success: true,
      data: { hotel }
    };
  });

  // 7. Create Hotel Room Reservation Booking
  fastify.post('/hotels/booking', async (request, reply) => {
    const parseResult = HotelBookingSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid hotel booking request',
          details: parseResult.error.format()
        }
      });
    }

    const data = parseResult.data;
    const hotel = HOTELS.find(h => h.id === data.hotelId);
    if (!hotel) {
      return reply.status(404).send({
        success: false,
        error: { code: 'HOTEL_NOT_FOUND', message: 'Selected hotel property not found.' }
      });
    }

    const room = hotel.rooms.find(r => r.roomId === data.roomId) || hotel.rooms[0];

    const d1 = new Date(data.checkInDate).getTime();
    const d2 = new Date(data.checkOutDate).getTime();
    const nights = Math.max(1, Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24))) || 1;

    const baseRoomTotal = room.pricePerNightINR * nights * data.roomsCount;
    const gstRate = baseRoomTotal > 7500 ? 0.18 : 0.12;
    const taxesAndGst = Math.round(baseRoomTotal * gstRate);
    const serviceCharge = Math.round(baseRoomTotal * 0.03);
    const discount = room.originalPricePerNightINR
      ? (room.originalPricePerNightINR - room.pricePerNightINR) * nights * data.roomsCount
      : 0;
    const grandTotalINR = baseRoomTotal + taxesAndGst + serviceCharge;

    const bookingReference = `BV-STAY-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    return reply.status(201).send({
      success: true,
      data: {
        bookingReference,
        status: 'CONFIRMED',
        hotel: {
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          address: hotel.address,
          landmarkDistance: hotel.landmarkDistance,
          heroImage: hotel.heroImage,
          starRating: hotel.starRating,
          reviewScore: hotel.reviewScore,
        },
        room: {
          roomId: room.roomId,
          name: room.name,
          bedType: room.bedType,
          breakfastIncluded: room.breakfastIncluded,
          freeCancellation: room.freeCancellation,
        },
        stayDetails: {
          checkInDate: data.checkInDate,
          checkOutDate: data.checkOutDate,
          nights,
          roomsCount: data.roomsCount,
          adultsCount: data.adultsCount,
          childrenCount: data.childrenCount,
          guestFullName: data.guestFullName,
          guestEmail: data.guestEmail,
          guestPhone: data.guestPhone,
          specialRequests: data.specialRequests,
          paymentMethod: data.paymentMethod,
        },
        pricingBreakdown: {
          baseRoomTotal,
          taxesAndGst,
          serviceCharge,
          discount,
          grandTotalINR,
          currency: 'INR',
        },
        cancellationPolicyText: room.freeCancellation
          ? `Free cancellation up to ${room.cancellationDeadlineDays} days before check-in date. Full refund guaranteed.`
          : 'Non-refundable rate as selected.',
        confirmedAt: new Date().toISOString(),
      }
    });
  });

  // 8. AI Travel Chat Assistant
  fastify.post('/chat', async (request, reply) => {
    const clientKey = request.ip;
    const now = Date.now();
    const recentRequests = (chatRequests.get(clientKey) || []).filter(
      (timestamp) => now - timestamp < chatWindowMs
    );

    if (recentRequests.length >= maxChatRequestsPerWindow) {
      const retryAfterSeconds = Math.ceil(
        (chatWindowMs - (now - recentRequests[0])) / 1000
      );
      reply.header('Retry-After', retryAfterSeconds);
      return reply.status(429).send({
        success: false,
        error: {
          code: 'CHAT_RATE_LIMITED',
          message: `Too many assistant requests. Please try again in ${retryAfterSeconds} seconds.`,
        },
      });
    }

    recentRequests.push(now);
    chatRequests.set(clientKey, recentRequests);

    const parseResult = AIChatSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'INVALID_CHAT_PAYLOAD',
          message: 'Invalid chat message payload',
          details: parseResult.error.format()
        }
      });
    }

    let response;
    try {
      response = await processAIChatMessage(
        parseResult.data.messages,
        parseResult.data.language
      );
    } catch (error) {
      if (error instanceof AIProviderError) {
        return reply.status(error.statusCode).send({
          success: false,
          error: {
            code: error.code,
            message: 'The live AI assistant is temporarily unavailable. Please try again shortly.',
          },
        });
      }
      throw error;
    }
    reply.header('Content-Type', 'application/json; charset=utf-8');
    return {
      success: true,
      data: response,
    };
  });

  // 9. Get Indian States & UTs Catalog
  fastify.get('/states', async (request) => {
    const { region, search } = request.query as { region?: string; search?: string };
    let filtered = [...INDIAN_STATES];

    if (region && region !== 'all') {
      filtered = filtered.filter(s => s.region === region);
    }

    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.capital.toLowerCase().includes(q) ||
        s.famousMonuments.some(m => m.toLowerCase().includes(q)) ||
        s.traditionalDances.some(d => d.toLowerCase().includes(q))
      );
    }

    return {
      success: true,
      data: {
        total: filtered.length,
        states: filtered
      }
    };
  });

  // 10. Get Festivals
  fastify.get('/festivals', async () => {
    return {
      success: true,
      data: {
        total: FESTIVALS.length,
        festivals: FESTIVALS
      }
    };
  });

  // 11. Get Regional Cuisines
  fastify.get('/cuisines', async () => {
    return {
      success: true,
      data: {
        total: REGIONAL_CUISINES.length,
        cuisines: REGIONAL_CUISINES
      }
    };
  });

  // 12. Get Curated Heritage Trails
  fastify.get('/trails', async () => {
    return {
      success: true,
      data: {
        total: HERITAGE_TRAILS.length,
        trails: HERITAGE_TRAILS
      }
    };
  });

  // 13. Generate Custom Day-by-Day Itinerary
  fastify.post('/itinerary/generate', async (request, reply) => {
    const parseResult = ItineraryRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid itinerary request parameters',
          details: parseResult.error.format()
        }
      });
    }

    const { destinationId, days, travelStyle, budget, travelers, interests } = parseResult.data;
    const itinerary = generateCustomItinerary(destinationId, days, travelStyle, budget, travelers, interests);

    return {
      success: true,
      data: { itinerary }
    };
  });

  // 14. Calculate Trip Cost Estimate
  fastify.post('/cost/calculate', async (request, reply) => {
    const parseResult = CostCalculationSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid cost calculation parameters',
          details: parseResult.error.format()
        }
      });
    }

    const estimate = calculateTripCostEstimate(parseResult.data);
    return {
      success: true,
      data: { estimate }
    };
  });

  // 15. Submit Travel Inquiry
  fastify.post('/inquiry', async (request, reply) => {
    const parseResult = InquirySchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'INVALID_INQUIRY',
          message: 'Please review and correct the submitted fields',
          details: parseResult.error.format()
        }
      });
    }

    const data = parseResult.data;
    const referenceNumber = `BV-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    return reply.status(201).send({
      success: true,
      data: {
        referenceNumber,
        status: 'CONFIRMED_RECEIVED',
        message: `Thank you, ${data.fullName}. Your custom travel inquiry for ${data.destination} has been logged under reference ${referenceNumber}. Our travel historians and trip coordinators will respond within 24 hours.`,
        submittedAt: new Date().toISOString(),
        details: {
          destination: data.destination,
          travelers: data.travelersCount,
          tier: data.budgetTier,
          travelDate: data.travelDate,
        }
      }
    });
  });

  // 16. Get Trivia Questions (without exposing answers)
  fastify.get('/trivia', async () => {
    const publicQuestions = TRIVIA_QUESTIONS.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
    }));

    return {
      success: true,
      data: {
        total: publicQuestions.length,
        questions: publicQuestions
      }
    };
  });

  // 17. Verify Trivia Answers
  fastify.post('/trivia/verify', async (request, reply) => {
    const parseResult = TriviaVerifySchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'INVALID_TRIVIA_SUBMISSION',
          message: 'Invalid trivia submission payload',
          details: parseResult.error.format()
        }
      });
    }

    const userAnswers = parseResult.data.answers;
    let score = 0;
    const results = [];

    for (const item of userAnswers) {
      const q = TRIVIA_QUESTIONS.find(t => t.id === item.questionId);
      if (q) {
        const isCorrect = item.selectedOptionIndex === q.correctOptionIndex;
        if (isCorrect) score += 1;
        results.push({
          questionId: q.id,
          question: q.question,
          userChoice: q.options[item.selectedOptionIndex] || 'None',
          correctChoice: q.options[q.correctOptionIndex],
          isCorrect,
          explanation: q.explanation,
          historicalContext: q.historicalContext,
        });
      }
    }

    return {
      success: true,
      data: {
        score,
        totalQuestions: TRIVIA_QUESTIONS.length,
        percentage: Math.round((score / TRIVIA_QUESTIONS.length) * 100),
        rankTitle:
          score === TRIVIA_QUESTIONS.length
            ? 'Grand Heritage Scholar'
            : score >= 3
            ? 'Avid Cultural Explorer'
            : 'Curious Heritage Traveler',
        results,
      }
    };
  });
};
