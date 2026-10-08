import { describe, it, expect } from 'vitest';
import {
  calculateHaversineKm,
  resolveLocationQuery,
  getSearchSuggestions,
} from '../../server/services/geocodingService';

describe('Universal Geocoding & Multi-Type Search Engine', () => {
  describe('Haversine Distance Calculation', () => {
    it('should calculate distance between Taj Mahal and Agra Fort (~2.4 km)', () => {
      const dist = calculateHaversineKm(27.1751, 78.0421, 27.1795, 78.0211);
      expect(dist).toBeGreaterThan(1.8);
      expect(dist).toBeLessThan(3.0);
    });

    it('should return 0.0 for identical coordinates', () => {
      expect(calculateHaversineKm(27.1751, 78.0421, 27.1751, 78.0421)).toBe(0);
    });
  });

  describe('PIN Code Geocoding Resolution', () => {
    it('should resolve Indian PIN code 282001 to Agra District, Uttar Pradesh', () => {
      const res = resolveLocationQuery('282001');
      expect(res.resolvedLevel).toBe('pincode');
      expect(res.anchorLocation.title).toContain('282001');
      expect(res.anchorLocation.district).toContain('Agra');
      expect(res.anchorLocation.state).toBe('Uttar Pradesh');
      expect(res.anchorLocation.lat).toBeCloseTo(27.1751, 1);
      expect(res.nearbyPlaces.length).toBeGreaterThan(0);
    });

    it('should resolve PIN code 302001 to Jaipur District, Rajasthan', () => {
      const res = resolveLocationQuery('302001');
      expect(res.resolvedLevel).toBe('pincode');
      expect(res.anchorLocation.district).toContain('Jaipur');
      expect(res.anchorLocation.state).toBe('Rajasthan');
    });

    it('should resolve PIN code 600001 to Chennai District, Tamil Nadu (NOT Kerala)', () => {
      const res = resolveLocationQuery('600001');
      expect(res.resolvedLevel).toBe('pincode');
      expect(res.anchorLocation.district).toContain('Chennai');
      expect(res.anchorLocation.state).toBe('Tamil Nadu');
      expect(res.matchedDestinationId).toBe('madurai-chennai-tamilnadu');
    });

    it('should resolve PIN code 403001 to North Goa District, Goa', () => {
      const res = resolveLocationQuery('403001');
      expect(res.resolvedLevel).toBe('pincode');
      expect(res.anchorLocation.state).toBe('Goa');
      expect(res.matchedDestinationId).toBe('goa-heritage');
    });

    it('should resolve PIN code 752111 to Puri District, Odisha', () => {
      const res = resolveLocationQuery('752111');
      expect(res.resolvedLevel).toBe('pincode');
      expect(res.anchorLocation.state).toBe('Odisha');
      expect(res.matchedDestinationId).toBe('konark-puri-odisha');
    });
  });

  describe('District & State Level Queries', () => {
    it('should resolve District queries like "Agra District"', () => {
      const res = resolveLocationQuery('Agra District');
      expect(res.anchorLocation.title).toBe('Agra');
      expect(res.anchorLocation.district).toContain('Agra District');
      expect(res.nearbyPlaces.length).toBeGreaterThan(0);
    });

    it('should resolve State queries like "Kerala"', () => {
      const res = resolveLocationQuery('Kerala');
      expect(res.resolvedLevel).toBe('state');
      expect(res.anchorLocation.state).toBe('Kerala');
      expect(res.nearbyPlaces.length).toBeGreaterThan(0);
    });

    it('should resolve "Tamil Nadu" state to Tamil Nadu destination (NOT Kerala)', () => {
      const res = resolveLocationQuery('Tamil Nadu');
      expect(res.resolvedLevel).toBe('state');
      expect(res.anchorLocation.state).toBe('Tamil Nadu');
      expect(res.matchedDestinationId).toBe('madurai-chennai-tamilnadu');
    });

    it('should resolve "Chennai" query to Tamil Nadu', () => {
      const res = resolveLocationQuery('Chennai');
      expect(res.anchorLocation.state).toBe('Tamil Nadu');
      expect(res.matchedDestinationId).toBe('madurai-chennai-tamilnadu');
    });
  });

  describe('Intent & Proximity Queries ("X near Y")', () => {
    it('should parse "Hotels near Taj Mahal" and prioritize stays category', () => {
      const res = resolveLocationQuery('Hotels near Taj Mahal');
      expect(res.intentCategoryFilter).toBe('stay');
      expect(res.anchorLocation.title).toContain('Taj Mahal');
      expect(res.nearbyPlaces.length).toBeGreaterThan(0);
      expect(res.nearbyPlaces[0].distanceKm).toBeLessThan(10);
    });

    it('should parse "Food near Agra" and prioritize food category', () => {
      const res = resolveLocationQuery('Food near Agra');
      expect(res.intentCategoryFilter).toBe('food');
      expect(res.anchorLocation.title).toBe('Agra');
    });
  });

  describe('Instant Typeahead Search Suggestions', () => {
    it('should return matching suggestions for "agr"', () => {
      const suggestions = getSearchSuggestions('agr');
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.some((s) => s.title.toLowerCase().includes('agra'))).toBe(true);
    });

    it('should return PIN code matches for "282"', () => {
      const suggestions = getSearchSuggestions('282');
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.some((s) => s.pincode === '282001')).toBe(true);
    });

    it('should return suggestions for "chennai"', () => {
      const suggestions = getSearchSuggestions('chennai');
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.some((s) => s.subtitle.toLowerCase().includes('tamil nadu'))).toBe(true);
    });
  });
});
