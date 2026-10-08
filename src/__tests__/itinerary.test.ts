import { describe, it, expect } from 'vitest';
import { generateCustomItinerary } from '../../server/services/itineraryGenerator';
import { DESTINATIONS } from '../../server/data/destinations';

describe('Itinerary Generator Service', () => {
  it('should generate a valid 3-day itinerary for Agra', () => {
    const itinerary = generateCustomItinerary(
      'agra-taj-mahal',
      3,
      'heritage-explorer',
      'standard',
      2,
      ['Ancient Architecture', 'Photography']
    );

    expect(itinerary).toBeDefined();
    expect(itinerary.destination.name).toBe('Agra');
    expect(itinerary.days.length).toBe(3);
    expect(itinerary.days[0].morning).toBeDefined();
    expect(itinerary.days[0].afternoon).toBeDefined();
    expect(itinerary.days[0].evening).toBeDefined();
    expect(itinerary.culturalRules.length).toBeGreaterThan(0);
    expect(itinerary.recommendedSouvenirs.length).toBeGreaterThan(0);
  });

  it('should handle budget calculations correctly across tiers', () => {
    const budgetItinerary = generateCustomItinerary('jaipur-pink-city', 5, 'relaxed-leisure', 'budget', 1, ['Culture']);
    const luxuryItinerary = generateCustomItinerary('jaipur-pink-city', 5, 'relaxed-leisure', 'luxury', 1, ['Culture']);

    expect(budgetItinerary.overview.budgetCategory).toContain('Budget');
    expect(luxuryItinerary.overview.budgetCategory).toContain('Royal');
  });

  it('should fallback gracefully to default destination if invalid ID provided', () => {
    const fallback = generateCustomItinerary('non-existent-id', 2, 'cultural-immersion', 'standard', 1, ['Food']);
    expect(fallback).toBeDefined();
    expect(fallback.destination.id).toBe(DESTINATIONS[0].id);
  });
});
