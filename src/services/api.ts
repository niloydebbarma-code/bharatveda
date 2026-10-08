import {
  ApiResponse,
  Destination,
  Festival,
  RegionalCuisine,
  HeritageTrail,
  GeneratedItinerary,
  ItineraryRequest,
  CostCalculationRequest,
  CostCalculationResult,
  InquiryFormData,
  InquiryResponse,
  TriviaQuestion,
  TriviaVerificationResult,
  IndianState,
  HotelProperty,
  HotelBookingRequest,
  HotelBookingConfirmation,
  AIChatMessage,
  AIChatResponse,
  AILanguageCode,
  SearchSuggestionItem,
  GeocodingResolutionResult,
} from '../types';

const API_BASE = '/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    const responseText = await response.text();
    let data: ApiResponse<T> | null = null;

    if (responseText.trim()) {
      try {
        data = JSON.parse(responseText) as ApiResponse<T>;
      } catch {
        throw new Error(
          `The API returned an invalid response (HTTP ${response.status}). Please try again.`
        );
      }
    }

    if (!response.ok || !data?.success || !data.data) {
      const errorMessage =
        data?.error?.message || `API request failed with HTTP ${response.status}`;
      throw new Error(errorMessage);
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected network error occurred while communicating with the server.');
  }
}

export const api = {
  // Universal Search & Geocoding
  async getSearchSuggestions(q: string): Promise<{ query: string; total: number; suggestions: SearchSuggestionItem[] }> {
    const qs = q ? `?q=${encodeURIComponent(q)}` : '';
    return request<{ query: string; total: number; suggestions: SearchSuggestionItem[] }>(`/search/suggest${qs}`);
  },

  async resolveLocation(q: string, radiusKm = 35): Promise<{ result: GeocodingResolutionResult }> {
    return request<{ result: GeocodingResolutionResult }>(
      `/search/resolve?q=${encodeURIComponent(q)}&radius=${radiusKm}`
    );
  },

  // Destinations
  async getDestinations(params?: {
    search?: string;
    region?: string;
    category?: string;
    unescoOnly?: boolean;
  }): Promise<{ total: number; destinations: Destination[] }> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.region && params.region !== 'all') query.append('region', params.region);
    if (params?.category && params.category !== 'all') query.append('category', params.category);
    if (params?.unescoOnly) query.append('unescoOnly', 'true');

    const qs = query.toString() ? `?${query.toString()}` : '';
    return request<{ total: number; destinations: Destination[] }>(`/destinations${qs}`);
  },

  async getDestinationById(id: string): Promise<{ destination: Destination }> {
    return request<{ destination: Destination }>(`/destinations/${id}`);
  },

  // Stays & Hotels Marketplace
  async searchHotels(params?: {
    destinationId?: string;
    city?: string;
    search?: string;
    propertyType?: string;
    minStarRating?: string;
    minReviewScore?: string;
    minPrice?: string;
    maxPrice?: string;
    freeCancellationOnly?: boolean;
    breakfastIncludedOnly?: boolean;
    facility?: string;
    sortBy?: string;
  }): Promise<{ total: number; hotels: HotelProperty[] }> {
    const query = new URLSearchParams();
    if (params?.destinationId) query.append('destinationId', params.destinationId);
    if (params?.city) query.append('city', params.city);
    if (params?.search) query.append('search', params.search);
    if (params?.propertyType && params.propertyType !== 'all') query.append('propertyType', params.propertyType);
    if (params?.minStarRating) query.append('minStarRating', params.minStarRating);
    if (params?.minReviewScore) query.append('minReviewScore', params.minReviewScore);
    if (params?.minPrice) query.append('minPrice', params.minPrice);
    if (params?.maxPrice) query.append('maxPrice', params.maxPrice);
    if (params?.freeCancellationOnly) query.append('freeCancellationOnly', 'true');
    if (params?.breakfastIncludedOnly) query.append('breakfastIncludedOnly', 'true');
    if (params?.facility) query.append('facility', params.facility);
    if (params?.sortBy) query.append('sortBy', params.sortBy);

    const qs = query.toString() ? `?${query.toString()}` : '';
    return request<{ total: number; hotels: HotelProperty[] }>(`/hotels${qs}`);
  },

  async getHotelById(id: string): Promise<{ hotel: HotelProperty }> {
    return request<{ hotel: HotelProperty }>(`/hotels/${id}`);
  },

  async bookHotelRoom(payload: HotelBookingRequest): Promise<HotelBookingConfirmation> {
    return request<HotelBookingConfirmation>('/hotels/booking', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // AI Travel Assistant
  async sendAIChat(messages: AIChatMessage[], language: AILanguageCode = 'en'): Promise<AIChatResponse> {
    return request<AIChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, language }),
    });
  },

  // Indian States & UTs
  async getStates(params?: { region?: string; search?: string }): Promise<{ total: number; states: IndianState[] }> {
    const query = new URLSearchParams();
    if (params?.region && params.region !== 'all') query.append('region', params.region);
    if (params?.search) query.append('search', params.search);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return request<{ total: number; states: IndianState[] }>(`/states${qs}`);
  },

  // Festivals
  async getFestivals(): Promise<{ total: number; festivals: Festival[] }> {
    return request<{ total: number; festivals: Festival[] }>('/festivals');
  },

  // Regional Cuisines
  async getCuisines(): Promise<{ total: number; cuisines: RegionalCuisine[] }> {
    return request<{ total: number; cuisines: RegionalCuisine[] }>('/cuisines');
  },

  // Heritage Trails
  async getTrails(): Promise<{ total: number; trails: HeritageTrail[] }> {
    return request<{ total: number; trails: HeritageTrail[] }>('/trails');
  },

  // Itinerary Generator
  async generateItinerary(payload: ItineraryRequest): Promise<{ itinerary: GeneratedItinerary }> {
    return request<{ itinerary: GeneratedItinerary }>('/itinerary/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Cost Calculator
  async calculateTripCost(payload: CostCalculationRequest): Promise<{ estimate: CostCalculationResult }> {
    return request<{ estimate: CostCalculationResult }>('/cost/calculate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Inquiry Submission
  async submitInquiry(payload: InquiryFormData): Promise<InquiryResponse> {
    return request<InquiryResponse>('/inquiry', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Trivia Quiz
  async getTrivia(): Promise<{ total: number; questions: TriviaQuestion[] }> {
    return request<{ total: number; questions: TriviaQuestion[] }>('/trivia');
  },

  async verifyTrivia(
    answers: { questionId: string; selectedOptionIndex: number }[]
  ): Promise<TriviaVerificationResult> {
    return request<TriviaVerificationResult>('/trivia/verify', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  },
};
