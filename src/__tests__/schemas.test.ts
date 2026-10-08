import { describe, it, expect } from 'vitest';
import {
  DestinationQuerySchema,
  ItineraryRequestSchema,
  CostCalculationSchema,
  InquirySchema,
  TriviaVerifySchema,
} from '../../server/schemas/index';

describe('Zod Validation Schemas', () => {
  describe('DestinationQuerySchema', () => {
    it('should validate valid region and category filters', () => {
      const valid = DestinationQuerySchema.safeParse({
        region: 'north',
        category: 'heritage',
        unescoOnly: 'true',
        search: 'Taj',
      });
      expect(valid.success).toBe(true);
    });

    it('should reject invalid region names', () => {
      const invalid = DestinationQuerySchema.safeParse({
        region: 'antarctica',
      });
      expect(invalid.success).toBe(false);
    });
  });

  describe('CostCalculationSchema', () => {
    it('should validate valid trip cost estimation parameters', () => {
      const valid = CostCalculationSchema.safeParse({
        startingCity: 'New Delhi',
        destinationId: 'agra-taj-mahal',
        travelersCount: 2,
        daysCount: 3,
        travelStyle: 'standard',
        transitMode: 'train',
      });
      expect(valid.success).toBe(true);
    });

    it('should reject invalid transit mode', () => {
      const invalid = CostCalculationSchema.safeParse({
        startingCity: 'New Delhi',
        destinationId: 'agra-taj-mahal',
        travelersCount: 2,
        daysCount: 3,
        travelStyle: 'standard',
        transitMode: 'submarine',
      });
      expect(invalid.success).toBe(false);
    });
  });

  describe('ItineraryRequestSchema', () => {
    it('should validate a valid itinerary request', () => {
      const valid = ItineraryRequestSchema.safeParse({
        destinationId: 'hampi-vijayanagara',
        days: 4,
        travelStyle: 'heritage-explorer',
        budget: 'standard',
        travelers: 2,
        interests: ['History', 'Architecture'],
      });
      expect(valid.success).toBe(true);
    });

    it('should reject requests exceeding maximum days', () => {
      const invalid = ItineraryRequestSchema.safeParse({
        destinationId: 'hampi-vijayanagara',
        days: 25,
        travelStyle: 'heritage-explorer',
        budget: 'standard',
        travelers: 2,
        interests: ['History'],
      });
      expect(invalid.success).toBe(false);
    });
  });

  describe('InquirySchema', () => {
    it('should validate a complete and clean inquiry', () => {
      const valid = InquirySchema.safeParse({
        fullName: 'Vikramaditya Roy',
        email: 'vikram@example.com',
        phone: '+919876543210',
        destination: 'Varanasi',
        travelDate: '2026-11-15',
        travelersCount: 2,
        budgetTier: 'premium',
        specialRequests: 'Interested in evening Ganga Aarti private boat ride.',
      });
      expect(valid.success).toBe(true);
    });

    it('should reject malformed email addresses', () => {
      const invalid = InquirySchema.safeParse({
        fullName: 'Vikram',
        email: 'not-an-email',
        phone: '12345678',
        destination: 'Agra',
        travelDate: '2026-11-15',
        travelersCount: 1,
        budgetTier: 'standard',
      });
      expect(invalid.success).toBe(false);
    });
  });

  describe('TriviaVerifySchema', () => {
    it('should validate formatted trivia submission', () => {
      const valid = TriviaVerifySchema.safeParse({
        answers: [
          { questionId: 'q1-taj-mahal', selectedOptionIndex: 1 },
          { questionId: 'q2-kailasa-ellora', selectedOptionIndex: 1 },
        ],
      });
      expect(valid.success).toBe(true);
    });

    it('should reject invalid option indices outside 0-3', () => {
      const invalid = TriviaVerifySchema.safeParse({
        answers: [
          { questionId: 'q1-taj-mahal', selectedOptionIndex: 99 },
        ],
      });
      expect(invalid.success).toBe(false);
    });
  });
});
