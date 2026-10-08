import { describe, it, expect } from 'vitest';
import { HOTELS } from '../../server/data/hotels';
import { processAIChatMessage } from '../../server/services/aiChatService';
import { HotelSearchQuerySchema, HotelBookingSchema, AIChatSchema } from '../../server/schemas/index';

describe('Hotels Marketplace & AI Travel Chatbot Services', () => {
  describe('Hotels Data & Inventory', () => {
    it('should have curated properties across major Indian heritage hubs', () => {
      expect(HOTELS.length).toBeGreaterThanOrEqual(6);
      const agraHotel = HOTELS.find((h) => h.city === 'Agra');
      expect(agraHotel).toBeDefined();
      expect(agraHotel?.rooms.length).toBeGreaterThan(0);
      expect(agraHotel?.categoryScores.cleanliness).toBeGreaterThan(8);
      expect(agraHotel?.lat).toBeDefined();
      expect(agraHotel?.lng).toBeDefined();
    });

    it('should have room options with transparent pricing in INR and cancellation policies', () => {
      HOTELS.forEach((hotel) => {
        expect(hotel.rooms.length).toBeGreaterThan(0);
        hotel.rooms.forEach((room) => {
          expect(room.pricePerNightINR).toBeGreaterThan(0);
          expect(room.bedType).toBeDefined();
          expect(room.amenities.length).toBeGreaterThan(0);
          expect(typeof room.breakfastIncluded).toBe('boolean');
          expect(typeof room.freeCancellation).toBe('boolean');
        });
      });
    });
  });

  describe('Zod Validation for Hotels & Chat', () => {
    it('should validate hotel search queries', () => {
      const valid = HotelSearchQuerySchema.safeParse({
        city: 'Agra',
        propertyType: 'palace',
        minStarRating: '5',
        freeCancellationOnly: 'true',
        sortBy: 'price_asc',
      });
      expect(valid.success).toBe(true);
    });

    it('should validate hotel booking requests', () => {
      const valid = HotelBookingSchema.safeParse({
        hotelId: 'agra-amarvilas',
        roomId: 'amarvilas-premier-taj-view',
        checkInDate: '2026-11-12',
        checkOutDate: '2026-11-15',
        adultsCount: 2,
        childrenCount: 0,
        roomsCount: 1,
        guestFullName: 'Vikramaditya Roy',
        guestEmail: 'vikram@example.com',
        guestPhone: '+919876543210',
        paymentMethod: 'upi',
      });
      expect(valid.success).toBe(true);
    });

    it('should validate AI chat request schema', () => {
      const valid = AIChatSchema.safeParse({
        messages: [
          { role: 'user', content: 'What are the best stays near Taj Mahal?' },
        ],
      });
      expect(valid.success).toBe(true);
    });
  });

  describe('AI Travel Assistant NLP Logic', () => {
    it('should generate knowledgeable response for Agra queries', async () => {
      const res = await processAIChatMessage([
        { role: 'user', content: 'What are the best hotels near Taj Mahal in Agra?' },
      ]);
      expect(res.reply).toContain('Agra');
      expect(res.reply).toContain('Taj Mahal');
      expect(res.suggestedPills.length).toBeGreaterThan(0);
    });

    it('should generate knowledgeable response for Varanasi queries', async () => {
      const res = await processAIChatMessage([
        { role: 'user', content: 'Tell me about Varanasi Ganga Aarti and food' },
      ]);
      expect(res.reply).toContain('Varanasi');
      expect(res.reply).toContain('Ganga Aarti');
    });

    it('should return default guided greeting for generic questions', async () => {
      const res = await processAIChatMessage([
        { role: 'user', content: 'Hello there' },
      ]);
      expect(res.reply).toContain('VedaGuide');
      expect(res.suggestedPills.length).toBeGreaterThan(0);
    });

    it('should honor the selected Tamil language in offline festival responses', async () => {
      const res = await processAIChatMessage(
        [{ role: 'user', content: 'Tell me about Onam' }],
        'ta'
      );
      expect(res.reply).toContain('எங்கு');
      expect(res.reply).toContain('எப்போது');
    });

    it('should retain destination context for follow-up questions', async () => {
      const res = await processAIChatMessage([
        { role: 'user', content: 'Tell me about Hampi' },
        { role: 'assistant', content: 'Hampi is in Karnataka.' },
        { role: 'user', content: 'What should I see first?' },
      ]);
      expect(res.reply).toContain('Hampi');
      expect(res.recommendedEntities?.[0]?.title).toBe('Hampi');
    });

    it('should switch topics instead of repeating the first topic response', async () => {
      const res = await processAIChatMessage([
        { role: 'user', content: 'Tell me about Agra' },
        { role: 'assistant', content: 'Agra is home to the Taj Mahal.' },
        { role: 'user', content: 'Tell me about Varanasi ghats' },
      ]);
      expect(res.reply).toContain('Varanasi');
      expect(res.reply).not.toContain('Agra Travel Guide');
    });
  });
});
