import { describe, it, expect } from 'vitest';
import { calculateTripCostEstimate } from '../../server/services/costCalculator';

describe('Trip Cost Calculator Service', () => {
  it('should calculate budget estimate for 2 travelers visiting Agra for 3 days by train', () => {
    const result = calculateTripCostEstimate({
      startingCity: 'New Delhi',
      destinationId: 'agra-taj-mahal',
      travelersCount: 2,
      daysCount: 3,
      travelStyle: 'standard',
      transitMode: 'train',
    });

    expect(result).toBeDefined();
    expect(result.destinationName).toBe('Agra');
    expect(result.travelersCount).toBe(2);
    expect(result.daysCount).toBe(3);
    expect(result.totalEstimatedCostINR).toBeGreaterThan(10000);
    expect(result.perPersonEstimatedCostINR).toBe(Math.round(result.totalEstimatedCostINR / 2));
    expect(result.breakdown.intercityTransit.estimatedCostINR).toBeGreaterThan(0);
    expect(result.breakdown.accommodation.estimatedCostINR).toBeGreaterThan(0);
    expect(result.breakdown.diningAndStreetFood.estimatedCostINR).toBeGreaterThan(0);
    expect(result.breakdown.monumentsAndGuides.estimatedCostINR).toBeGreaterThan(0);
    expect(result.breakdown.localCityTransit.estimatedCostINR).toBeGreaterThan(0);
    expect(result.disclaimer).toContain('Estimated cost');
  });

  it('should scale cost with luxury palace stays', () => {
    const standard = calculateTripCostEstimate({
      startingCity: 'Mumbai',
      destinationId: 'jaipur-pink-city',
      travelersCount: 2,
      daysCount: 4,
      travelStyle: 'standard',
      transitMode: 'flight',
    });

    const luxury = calculateTripCostEstimate({
      startingCity: 'Mumbai',
      destinationId: 'jaipur-pink-city',
      travelersCount: 2,
      daysCount: 4,
      travelStyle: 'premium',
      transitMode: 'flight',
    });

    expect(luxury.totalEstimatedCostINR).toBeGreaterThan(standard.totalEstimatedCostINR);
    expect(luxury.breakdown.accommodation.estimatedCostINR).toBeGreaterThan(standard.breakdown.accommodation.estimatedCostINR);
  });
});
