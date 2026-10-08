export interface ResolvedLocationItem {
  id: string;
  name: string;
  category: 'heritage' | 'food' | 'stay' | 'transport' | 'service';
  subType: string;
  distanceKm: number;
  formattedDistance: string;
  lat: number;
  lng: number;
  address: string;
  rating?: number;
  priceOrFee?: string;
  timingOrHours?: string;
  phoneOrContact?: string;
  popularFor?: string[];
  directionsUrl: string;
}

export interface GeocodingResolutionResult {
  query: string;
  resolvedLevel: 'pincode' | 'place' | 'city' | 'district' | 'state' | 'nearby_intent';
  anchorLocation: {
    title: string;
    subtitle: string;
    district: string;
    state: string;
    pincode?: string;
    lat: number;
    lng: number;
    formattedCoordinates: string;
  };
  matchedDestinationId?: string;
  matchedStateId?: string;
  intentCategoryFilter?: 'all' | 'heritage' | 'food' | 'stay' | 'transport' | 'service';
  categoryCounts: {
    all: number;
    heritage: number;
    food: number;
    stay: number;
    transport: number;
    service: number;
  };
  nearbyPlaces: ResolvedLocationItem[];
}

export interface SearchSuggestionItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'place' | 'city' | 'district' | 'state' | 'pincode' | 'nearby';
  queryToRun: string;
  pincode?: string;
  lat: number;
  lng: number;
}

export interface IndianState {
  id: string;
  name: string;
  capital: string;
  region: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  type: 'state' | 'union-territory';
  officialLanguages: string[];
  traditionalDances: string[];
  signatureHandicrafts: string[];
  famousMonuments: string[];
  bestSeason: string;
  summary: string;
  coverImage: string;
  destinationCount: number;
}

export interface RoomOption {
  roomId: string;
  name: string;
  description: string;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  sizeSqMeters: number;
  pricePerNightINR: number;
  originalPricePerNightINR?: number;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  cancellationDeadlineDays: number;
  amenities: string[];
  images: string[];
  availableUnitsCount: number;
}

export interface HotelCategoryScores {
  cleanliness: number;
  location: number;
  staff: number;
  comfort: number;
  facilities: number;
  valueForMoney: number;
}

export interface HotelProperty {
  id: string;
  slug: string;
  name: string;
  destinationId: string;
  city: string;
  state: string;
  address: string;
  lat: number;
  lng: number;
  propertyType: 'hotel' | 'resort' | 'palace' | 'hostel' | 'homestay' | 'heritage-haveli';
  starRating: 3 | 4 | 5;
  reviewScore: number;
  reviewScoreWord: 'Exceptional' | 'Superb' | 'Fabulous' | 'Very Good' | 'Good';
  reviewsCount: number;
  landmarkDistance: string;
  primaryLandmark: string;
  heroImage: string;
  galleryImages: string[];
  description: string;
  highlights: string[];
  facilities: string[];
  categoryScores: HotelCategoryScores;
  rooms: RoomOption[];
  cancellationSummary: string;
  paymentSummary: string;
  specialOfferBadge?: string;
}

export interface HotelBookingRequest {
  hotelId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  adultsCount: number;
  childrenCount: number;
  roomsCount: number;
  guestFullName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  paymentMethod: 'upi' | 'card' | 'pay_at_hotel';
}

export interface HotelBookingConfirmation {
  bookingReference: string;
  status: string;
  hotel: {
    id: string;
    name: string;
    city: string;
    address: string;
    landmarkDistance: string;
    heroImage: string;
    starRating: number;
    reviewScore: number;
  };
  room: {
    roomId: string;
    name: string;
    bedType: string;
    breakfastIncluded: boolean;
    freeCancellation: boolean;
  };
  stayDetails: {
    checkInDate: string;
    checkOutDate: string;
    nights: number;
    roomsCount: number;
    adultsCount: number;
    childrenCount: number;
    guestFullName: string;
    guestEmail: string;
    guestPhone: string;
    specialRequests?: string;
    paymentMethod: string;
  };
  pricingBreakdown: {
    baseRoomTotal: number;
    taxesAndGst: number;
    serviceCharge: number;
    discount: number;
    grandTotalINR: number;
    currency: string;
  };
  cancellationPolicyText: string;
  confirmedAt: string;
}

export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type AILanguageCode = 'en' | 'hi' | 'bn' | 'ta' | 'te';

export interface AIChatResponse {
  reply: string;
  suggestedPills: string[];
  recommendedEntities?: {
    type: 'destination' | 'hotel' | 'cuisine' | 'trail';
    id: string;
    title: string;
    subtitle: string;
    priceOrTag?: string;
    imageUrl?: string;
  }[];
}

export interface NearbyPlace {
  id: string;
  name: string;
  category: 'heritage' | 'food' | 'stay' | 'transport' | 'service';
  subType: string;
  rating?: number;
  reviewCount?: number;
  distance: string;
  lat: number;
  lng: number;
  description: string;
  priceOrFee?: string;
  timingOrHours?: string;
  address: string;
  phoneOrContact?: string;
  popularFor?: string[];
  externalBookingUrl?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  tags: string[];
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  state: string;
  region: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  category: 'heritage' | 'spiritual' | 'nature' | 'royal' | 'coastal';
  isUnesco: boolean;
  unescoYear?: number;
  rating: number;
  totalReviewsCount: number;
  recommendedDuration: string;
  lat: number;
  lng: number;
  imageUrl: string;
  galleryUrls: string[];
  description: string;
  historySummary: string;
  architecturalStyle: string;
  bestTimeToVisit: string;
  climate: string;
  entryFee: {
    indianNational: string;
    foreignNational: string;
  };
  typicalDailyCostEstimate: {
    budget: string;
    standard: string;
    luxury: string;
  };
  keyAttractions: string[];
  localCuisine: string[];
  howToReach: {
    nearestAirport: string;
    nearestRailway: string;
    roadConnectivity: string;
  };
  insiderTip: string;
  culturalEtiquette: string;
  nearbyPlaces: NearbyPlace[];
  reviews: ReviewItem[];
}

export interface Festival {
  id: string;
  name: string;
  alternateName?: string;
  state: string;
  region: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  seasonMonth: string;
  theme: 'lights' | 'colors' | 'harvest' | 'arts' | 'spiritual' | 'tribal';
  imageUrl: string;
  summary: string;
  culturalSignificance: string;
  mustExperience: string;
  traditionalTreat: string;
}

export interface IconicDish {
  name: string;
  type: 'vegetarian' | 'non-vegetarian' | 'dessert' | 'beverage';
  description: string;
  keyIngredients: string[];
  originCity: string;
  imageUrl?: string;
}

export interface RegionalCuisine {
  id: string;
  region: 'north' | 'south' | 'east' | 'west' | 'northeast';
  name: string;
  statesIncluded: string[];
  spiceProfile: string;
  cookingPhilosophy: string;
  iconicDishes: IconicDish[];
  culinaryTraditions: string;
}

export interface HeritageTrail {
  id: string;
  title: string;
  tagline: string;
  recommendedDuration: string;
  highlights: string[];
  routeStops: string[];
  description: string;
  idealTravelers: string;
  bestSeason: string;
  coverImage: string;
}

export interface DayPlan {
  dayNumber: number;
  theme: string;
  morning: {
    time: string;
    title: string;
    description: string;
    tip: string;
  };
  afternoon: {
    time: string;
    title: string;
    description: string;
    culinaryHighlight: string;
  };
  evening: {
    time: string;
    title: string;
    description: string;
    sunsetSpot: string;
  };
  localTransitTip: string;
}

export interface GeneratedItinerary {
  itineraryId: string;
  destination: {
    id: string;
    name: string;
    state: string;
    tagline: string;
    isUnesco: boolean;
    imageUrl: string;
  };
  overview: {
    totalDays: number;
    travelStyle: string;
    budgetCategory: string;
    travelersCount: number;
    estimatedCostRangeINR: string;
    bestSeasonAdvice: string;
  };
  days: DayPlan[];
  budgetBreakdown: {
    heritagePassesAndGuides: string;
    authenticDining: string;
    lodgingRange: string;
    localTransit: string;
  };
  culturalRules: string[];
  recommendedSouvenirs: string[];
}

export interface ItineraryRequest {
  destinationId: string;
  days: number;
  travelStyle: 'heritage-explorer' | 'cultural-immersion' | 'photography-scenic' | 'culinary-journey' | 'relaxed-leisure';
  budget: 'budget' | 'standard' | 'luxury';
  travelers: number;
  interests: string[];
}

export interface CostCalculationRequest {
  startingCity: string;
  destinationId: string;
  travelersCount: number;
  daysCount: number;
  travelStyle: 'budget' | 'standard' | 'premium';
  transitMode: 'train' | 'flight' | 'road';
}

export interface CostBreakdownItem {
  category: string;
  estimatedCostINR: number;
  description: string;
}

export interface CostCalculationResult {
  destinationName: string;
  startingCity: string;
  travelersCount: number;
  daysCount: number;
  travelStyle: string;
  breakdown: {
    intercityTransit: CostBreakdownItem;
    accommodation: CostBreakdownItem;
    diningAndStreetFood: CostBreakdownItem;
    monumentsAndGuides: CostBreakdownItem;
    localCityTransit: CostBreakdownItem;
  };
  totalEstimatedCostINR: number;
  perPersonEstimatedCostINR: number;
  disclaimer: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  travelersCount: number;
  budgetTier: 'budget' | 'standard' | 'premium' | 'bespoke';
  specialRequests?: string;
}

export interface InquiryResponse {
  referenceNumber: string;
  status: string;
  message: string;
  submittedAt: string;
  details: {
    destination: string;
    travelers: number;
    tier: string;
    travelDate: string;
  };
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface TriviaVerificationResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  rankTitle: string;
  results: {
    questionId: string;
    question: string;
    userChoice: string;
    correctChoice: string;
    isCorrect: boolean;
    explanation: string;
    historicalContext: string;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}
