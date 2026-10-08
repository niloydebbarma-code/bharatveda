import { DESTINATIONS } from '../data/destinations.js';
import { HOTELS } from '../data/hotels.js';
import { INDIAN_PINCODES } from '../data/pincodes.js';
import { INDIAN_STATES } from '../data/states.js';

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

// Accurate Haversine Distance in Kilometers
export function calculateHaversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Master All-Entity Aggregator
function getAllEntities(): {
  id: string;
  name: string;
  category: 'heritage' | 'food' | 'stay' | 'transport' | 'service';
  subType: string;
  lat: number;
  lng: number;
  address: string;
  rating?: number;
  priceOrFee?: string;
  timingOrHours?: string;
  phoneOrContact?: string;
  popularFor?: string[];
}[] {
  const list: ReturnType<typeof getAllEntities> = [];

  // 1. Gather all nearbyPlaces from destinations
  DESTINATIONS.forEach((d) => {
    d.nearbyPlaces.forEach((p) => {
      list.push({
        id: p.id,
        name: p.name,
        category: p.category,
        subType: p.subType,
        lat: p.lat,
        lng: p.lng,
        address: p.address,
        rating: p.rating,
        priceOrFee: p.priceOrFee,
        timingOrHours: p.timingOrHours,
        phoneOrContact: p.phoneOrContact,
        popularFor: p.popularFor,
      });
    });
  });

  // 2. Gather all hotels from HOTELS
  HOTELS.forEach((h) => {
    if (!list.some((existing) => existing.id === h.id)) {
      list.push({
        id: h.id,
        name: h.name,
        category: 'stay',
        subType: `${h.starRating}★ ${h.propertyType.toUpperCase()} Hotel`,
        lat: h.lat,
        lng: h.lng,
        address: h.address,
        rating: h.reviewScore,
        priceOrFee: `From ₹${h.rooms[0]?.pricePerNightINR.toLocaleString('en-IN')}/night`,
        timingOrHours: 'Check-in: 2:00 PM • Check-out: 12:00 PM',
        popularFor: h.highlights.slice(0, 3),
      });
    }
  });

  return list;
}

// 1. Instant Typeahead Search Suggestions
export function getSearchSuggestions(query: string): SearchSuggestionItem[] {
  if (!query || query.trim().length === 0) {
    // Return popular starter suggestions
    return [
      { id: 'sug-agra', title: 'Agra', subtitle: 'City • Uttar Pradesh (282001)', type: 'city', queryToRun: 'Agra', pincode: '282001', lat: 27.1767, lng: 78.0081 },
      { id: 'sug-taj', title: 'Taj Mahal', subtitle: 'UNESCO Monument • Agra, UP', type: 'place', queryToRun: 'Taj Mahal', pincode: '282001', lat: 27.1751, lng: 78.0421 },
      { id: 'sug-jaipur', title: 'Jaipur', subtitle: 'Pink City • Rajasthan (302001)', type: 'city', queryToRun: 'Jaipur', pincode: '302001', lat: 26.9124, lng: 75.7873 },
      { id: 'sug-varanasi', title: 'Varanasi', subtitle: 'Sacred City • Uttar Pradesh (221001)', type: 'city', queryToRun: 'Varanasi', pincode: '221001', lat: 25.3176, lng: 82.9739 },
      { id: 'sug-kerala', title: 'Kerala', subtitle: 'State • South India (Backwaters & Spice Coast)', type: 'state', queryToRun: 'Kerala', lat: 9.9312, lng: 76.2673 },
      { id: 'sug-hampi', title: 'Hampi', subtitle: 'UNESCO Vijayanagara Ruins • Karnataka (583239)', type: 'place', queryToRun: 'Hampi', pincode: '583239', lat: 15.3350, lng: 76.4600 },
    ];
  }

  const cleanQ = query.trim().toLowerCase();
  const suggestions: SearchSuggestionItem[] = [];

  // A. Check PIN codes
  INDIAN_PINCODES.forEach((pin) => {
    if (pin.pincode.startsWith(cleanQ) || pin.officeName.toLowerCase().includes(cleanQ)) {
      suggestions.push({
        id: `pin-${pin.pincode}`,
        title: `PIN Code ${pin.pincode}`,
        subtitle: `${pin.officeName}, ${pin.district}, ${pin.state}`,
        type: 'pincode',
        queryToRun: pin.pincode,
        pincode: pin.pincode,
        lat: pin.lat,
        lng: pin.lng,
      });
    }
  });

  // B. Check Monuments / Places
  const allEntities = getAllEntities();
  allEntities.forEach((ent) => {
    if (ent.name.toLowerCase().includes(cleanQ)) {
      suggestions.push({
        id: `place-${ent.id}`,
        title: ent.name,
        subtitle: `${ent.subType} • ${ent.address}`,
        type: 'place',
        queryToRun: ent.name,
        lat: ent.lat,
        lng: ent.lng,
      });
    }
  });

  // C. Check Destinations / Cities
  DESTINATIONS.forEach((d) => {
    if (d.name.toLowerCase().includes(cleanQ) || d.state.toLowerCase().includes(cleanQ)) {
      suggestions.push({
        id: `dest-${d.id}`,
        title: d.name,
        subtitle: `City & Tourism Hub • ${d.state}`,
        type: 'city',
        queryToRun: d.name,
        lat: d.lat,
        lng: d.lng,
      });
    }
  });

  // D. Check States & Districts
  INDIAN_STATES.forEach((st) => {
    if (st.name.toLowerCase().includes(cleanQ) || st.capital.toLowerCase().includes(cleanQ)) {
      suggestions.push({
        id: `state-${st.id}`,
        title: st.name,
        subtitle: `State (${st.region.toUpperCase()}) • Capital: ${st.capital}`,
        type: 'state',
        queryToRun: st.name,
        lat: DESTINATIONS.find((d) => d.state === st.name)?.lat || 20.5937,
        lng: DESTINATIONS.find((d) => d.state === st.name)?.lng || 78.9629,
      });
    }
  });

  // Return deduplicated top 8
  const seenTitles = new Set<string>();
  return suggestions.filter((item) => {
    if (seenTitles.has(item.title.toLowerCase())) return false;
    seenTitles.add(item.title.toLowerCase());
    return true;
  }).slice(0, 8);
}

// 2. Master Universal Location Resolution Engine
export function resolveLocationQuery(
  rawQuery: string,
  radiusKm = 35
): GeocodingResolutionResult {
  const cleanQ = rawQuery.trim();
  const lowerQ = cleanQ.toLowerCase();

  // Intent detection (e.g. "hotels near taj mahal", "food in agra", "hospitals near varanasi")
  let intentCategory: GeocodingResolutionResult['intentCategoryFilter'] = 'all';
  let targetQuery = cleanQ;

  if (lowerQ.includes('hotel') || lowerQ.includes('stay') || lowerQ.includes('resort') || lowerQ.includes('hostel')) {
    intentCategory = 'stay';
    targetQuery = targetQuery.replace(/hotels?|stays?|resorts?|hostels?|near|around|in/gi, '').trim();
  } else if (lowerQ.includes('food') || lowerQ.includes('restaurant') || lowerQ.includes('eat') || lowerQ.includes('cafe')) {
    intentCategory = 'food';
    targetQuery = targetQuery.replace(/foods?|restaurants?|eat|cafes?|near|around|in/gi, '').trim();
  } else if (lowerQ.includes('hospital') || lowerQ.includes('pharmacy') || lowerQ.includes('police') || lowerQ.includes('atm') || lowerQ.includes('service')) {
    intentCategory = 'service';
    targetQuery = targetQuery.replace(/hospitals?|pharmacies?|police|atms?|services?|near|around|in/gi, '').trim();
  } else if (lowerQ.includes('train') || lowerQ.includes('railway') || lowerQ.includes('airport') || lowerQ.includes('transport')) {
    intentCategory = 'transport';
    targetQuery = targetQuery.replace(/trains?|railway|airports?|transport|near|around|in/gi, '').trim();
  } else if (lowerQ.includes('monument') || lowerQ.includes('heritage') || lowerQ.includes('sight') || lowerQ.includes('place')) {
    intentCategory = 'heritage';
    targetQuery = targetQuery.replace(/monuments?|heritage|sights?|places?|near|around|in/gi, '').trim();
  }

  if (!targetQuery) targetQuery = cleanQ;
  const targetLower = targetQuery.toLowerCase();

  let resolvedLevel: GeocodingResolutionResult['resolvedLevel'] = 'city';
  let anchorTitle = 'Agra';
  let anchorSubtitle = 'City & Heritage Center, Uttar Pradesh';
  let anchorDistrict = 'Agra District';
  let anchorState = 'Uttar Pradesh';
  let anchorPincode: string | undefined = '282001';
  let anchorLat = 27.1767;
  let anchorLng = 78.0081;
  let matchedDestinationId: string | undefined = 'agra-taj-mahal';
  let matchedStateId: string | undefined = 'uttar-pradesh';

  // 1. Check if 6-digit PIN code
  const pincodeMatch = targetQuery.match(/\b\d{6}\b/);
  const matchedPincodeRecord = pincodeMatch
    ? INDIAN_PINCODES.find((p) => p.pincode === pincodeMatch[0])
    : INDIAN_PINCODES.find((p) => p.pincode === targetQuery);

  if (matchedPincodeRecord) {
    resolvedLevel = 'pincode';
    anchorTitle = `PIN Code ${matchedPincodeRecord.pincode}`;
    anchorSubtitle = `${matchedPincodeRecord.officeName}, ${matchedPincodeRecord.district}`;
    anchorDistrict = matchedPincodeRecord.district;
    anchorState = matchedPincodeRecord.state;
    anchorPincode = matchedPincodeRecord.pincode;
    anchorLat = matchedPincodeRecord.lat;
    anchorLng = matchedPincodeRecord.lng;
    matchedDestinationId = matchedPincodeRecord.nearbyDestinationId;
  }
  // 2. Exact State Match (e.g. "Kerala", "Rajasthan")
  else if (INDIAN_STATES.some((s) => s.name.toLowerCase() === targetLower || s.id === targetLower)) {
    const matchedState = INDIAN_STATES.find((s) => s.name.toLowerCase() === targetLower || s.id === targetLower)!;
    resolvedLevel = 'state';
    anchorTitle = matchedState.name;
    anchorSubtitle = `State • Capital: ${matchedState.capital} (${matchedState.region.toUpperCase()} INDIA)`;
    anchorDistrict = `${matchedState.capital} & Surrounding Districts`;
    anchorState = matchedState.name;
    matchedStateId = matchedState.id;

    const linkedDest = DESTINATIONS.find((d) => d.state.toLowerCase() === matchedState.name.toLowerCase());
    if (linkedDest) {
      anchorLat = linkedDest.lat;
      anchorLng = linkedDest.lng;
      matchedDestinationId = linkedDest.id;
    }
  }
  // 3. Exact Destination / City Match (e.g. "Agra", "Jaipur", "Varanasi")
  else if (DESTINATIONS.some((d) => d.name.toLowerCase() === targetLower || d.id === targetLower)) {
    const matchedDest = DESTINATIONS.find((d) => d.name.toLowerCase() === targetLower || d.id === targetLower)!;
    resolvedLevel = 'city';
    anchorTitle = matchedDest.name;
    anchorSubtitle = `${matchedDest.tagline} • ${matchedDest.state}`;
    anchorDistrict = `${matchedDest.name} District`;
    anchorState = matchedDest.state;
    anchorLat = matchedDest.lat;
    anchorLng = matchedDest.lng;
    matchedDestinationId = matchedDest.id;
  }
  // 4. Exact Place / Monument Match (e.g. "Taj Mahal", "Hawa Mahal")
  else if (getAllEntities().some((e) => e.name.toLowerCase() === targetLower)) {
    const allEntities = getAllEntities();
    const matchedPlace = allEntities.find((e) => e.name.toLowerCase() === targetLower)!;
    resolvedLevel = 'place';
    anchorTitle = matchedPlace.name;
    anchorSubtitle = `${matchedPlace.subType} • ${matchedPlace.address}`;
    anchorLat = matchedPlace.lat;
    anchorLng = matchedPlace.lng;

    const parentDest = DESTINATIONS.find((d) =>
      d.nearbyPlaces.some((p) => p.id === matchedPlace.id)
    );
    if (parentDest) {
      anchorDistrict = `${parentDest.name} District`;
      anchorState = parentDest.state;
      matchedDestinationId = parentDest.id;
    }
  }
  // 5. Partial Substring Matches
  else {
    const allEntities = getAllEntities();
    const matchedPlace = allEntities.find((e) =>
      e.name.toLowerCase().includes(targetLower) || targetLower.includes(e.name.toLowerCase())
    );

    if (matchedPlace) {
      resolvedLevel = 'place';
      anchorTitle = matchedPlace.name;
      anchorSubtitle = `${matchedPlace.subType} • ${matchedPlace.address}`;
      anchorLat = matchedPlace.lat;
      anchorLng = matchedPlace.lng;

      const parentDest = DESTINATIONS.find((d) =>
        d.nearbyPlaces.some((p) => p.id === matchedPlace.id)
      );
      if (parentDest) {
        anchorDistrict = `${parentDest.name} District`;
        anchorState = parentDest.state;
        matchedDestinationId = parentDest.id;
      }
    } else {
      const matchedDest = DESTINATIONS.find((d) =>
        d.name.toLowerCase().includes(targetLower) || targetLower.includes(d.name.toLowerCase())
      );

      if (matchedDest) {
        resolvedLevel = 'city';
        anchorTitle = matchedDest.name;
        anchorSubtitle = `${matchedDest.tagline} • ${matchedDest.state}`;
        anchorDistrict = `${matchedDest.name} District`;
        anchorState = matchedDest.state;
        anchorLat = matchedDest.lat;
        anchorLng = matchedDest.lng;
        matchedDestinationId = matchedDest.id;
      } else {
        const matchedState = INDIAN_STATES.find((s) =>
          s.name.toLowerCase().includes(targetLower) || targetLower.includes(s.name.toLowerCase())
        );

        if (matchedState) {
          resolvedLevel = 'state';
          anchorTitle = matchedState.name;
          anchorSubtitle = `State • Capital: ${matchedState.capital} (${matchedState.region.toUpperCase()} INDIA)`;
          anchorDistrict = `${matchedState.capital} & Surrounding Districts`;
          anchorState = matchedState.name;
          matchedStateId = matchedState.id;

          const linkedDest = DESTINATIONS.find((d) => d.state.toLowerCase() === matchedState.name.toLowerCase());
          if (linkedDest) {
            anchorLat = linkedDest.lat;
            anchorLng = linkedDest.lng;
            matchedDestinationId = linkedDest.id;
          }
        }
      }
    }
  }

  // Calculate Spatial Distances from Anchor Location to ALL Entities
  const allEntities = getAllEntities();
  const resolvedPlaces: ResolvedLocationItem[] = allEntities
    .map((ent) => {
      const distance = calculateHaversineKm(anchorLat, anchorLng, ent.lat, ent.lng);
      return {
        id: ent.id,
        name: ent.name,
        category: ent.category,
        subType: ent.subType,
        distanceKm: distance,
        formattedDistance: distance === 0 ? '0.0 km (At Location)' : `${distance} km`,
        lat: ent.lat,
        lng: ent.lng,
        address: ent.address,
        rating: ent.rating,
        priceOrFee: ent.priceOrFee,
        timingOrHours: ent.timingOrHours,
        phoneOrContact: ent.phoneOrContact,
        popularFor: ent.popularFor,
        directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${ent.lat},${ent.lng}`,
      };
    })
    // Filter within spatial radius (or default 35 km)
    .filter((p) => p.distanceKm <= radiusKm || resolvedLevel === 'state')
    .sort((a, b) => a.distanceKm - b.distanceKm);

  const categoryCounts = {
    all: resolvedPlaces.length,
    heritage: resolvedPlaces.filter((p) => p.category === 'heritage').length,
    food: resolvedPlaces.filter((p) => p.category === 'food').length,
    stay: resolvedPlaces.filter((p) => p.category === 'stay').length,
    transport: resolvedPlaces.filter((p) => p.category === 'transport').length,
    service: resolvedPlaces.filter((p) => p.category === 'service').length,
  };

  const formattedCoordinates = `${anchorLat.toFixed(4)}° N, ${anchorLng.toFixed(4)}° E`;

  return {
    query: rawQuery,
    resolvedLevel,
    anchorLocation: {
      title: anchorTitle,
      subtitle: anchorSubtitle,
      district: anchorDistrict,
      state: anchorState,
      pincode: anchorPincode,
      lat: anchorLat,
      lng: anchorLng,
      formattedCoordinates,
    },
    matchedDestinationId,
    matchedStateId,
    intentCategoryFilter: intentCategory,
    categoryCounts,
    nearbyPlaces: resolvedPlaces,
  };
}
