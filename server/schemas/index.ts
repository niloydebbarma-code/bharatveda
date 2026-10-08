import { z } from 'zod';

export const DestinationQuerySchema = z.object({
  search: z.string().optional(),
  region: z.enum(['all', 'north', 'south', 'east', 'west', 'central', 'northeast']).optional(),
  category: z.enum(['all', 'heritage', 'spiritual', 'nature', 'royal', 'coastal']).optional(),
  unescoOnly: z.enum(['true', 'false']).optional(),
});

export const ItineraryRequestSchema = z.object({
  destinationId: z.string().min(1, 'Please select a destination'),
  days: z.number().int().min(1).max(10, 'Maximum 10 days'),
  travelStyle: z.enum(['heritage-explorer', 'cultural-immersion', 'photography-scenic', 'culinary-journey', 'relaxed-leisure']),
  budget: z.enum(['budget', 'standard', 'luxury']),
  travelers: z.number().int().min(1).max(20),
  interests: z.array(z.string()).min(1, 'Select at least one area of interest'),
});

export const CostCalculationSchema = z.object({
  startingCity: z.string().min(2, 'Starting location is required'),
  destinationId: z.string().min(1, 'Destination is required'),
  travelersCount: z.number().int().min(1).max(20),
  daysCount: z.number().int().min(1).max(15),
  travelStyle: z.enum(['budget', 'standard', 'premium']),
  transitMode: z.enum(['train', 'flight', 'road']),
});

export const HotelSearchQuerySchema = z.object({
  destinationId: z.string().optional(),
  city: z.string().optional(),
  search: z.string().optional(),
  propertyType: z.enum(['all', 'hotel', 'resort', 'palace', 'hostel', 'homestay', 'heritage-haveli']).optional(),
  minStarRating: z.string().optional(),
  minReviewScore: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  freeCancellationOnly: z.enum(['true', 'false']).optional(),
  breakfastIncludedOnly: z.enum(['true', 'false']).optional(),
  facility: z.string().optional(),
  sortBy: z.enum(['recommended', 'price_asc', 'price_desc', 'rating', 'distance']).optional(),
});

export const HotelBookingSchema = z.object({
  hotelId: z.string().min(1, 'Hotel ID is required'),
  roomId: z.string().min(1, 'Room ID is required'),
  checkInDate: z.string().min(1, 'Check-in date is required'),
  checkOutDate: z.string().min(1, 'Check-out date is required'),
  adultsCount: z.number().int().min(1).max(10),
  childrenCount: z.number().int().min(0).max(10).default(0),
  roomsCount: z.number().int().min(1).max(5).default(1),
  guestFullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  guestEmail: z.string().trim().email('Valid email is required'),
  guestPhone: z.string().trim().min(7, 'Phone number is required').max(20),
  specialRequests: z.string().max(500).optional(),
  paymentMethod: z.enum(['upi', 'card', 'pay_at_hotel']),
});

export const AIChatSchema = z.object({
  language: z.enum(['en', 'hi', 'bn', 'ta', 'te']).default('en'),
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().min(1).max(2000),
    })
  ).min(1, 'At least one message is required'),
});

export const InquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address'),
  phone: z.string().trim().min(7, 'Phone number is required').max(20),
  destination: z.string().trim().min(1, 'Destination is required'),
  travelDate: z.string().min(1, 'Estimated travel date is required'),
  travelersCount: z.number().int().min(1).max(50),
  budgetTier: z.enum(['budget', 'standard', 'premium', 'bespoke']),
  specialRequests: z.string().max(1000).optional(),
});

export const TriviaVerifySchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedOptionIndex: z.number().int().min(0).max(3),
    })
  ).min(1),
});
