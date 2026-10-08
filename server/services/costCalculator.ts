import { DESTINATIONS } from '../data/destinations.js';

export interface CostCalculationParams {
  startingCity: string;
  destinationId: string;
  travelersCount: number;
  daysCount: number;
  travelStyle: 'budget' | 'standard' | 'premium';
  transitMode: 'train' | 'flight' | 'road';
}

export function calculateTripCostEstimate(params: CostCalculationParams) {
  const dest = DESTINATIONS.find(d => d.id === params.destinationId) || DESTINATIONS[0];
  const { travelersCount, daysCount, travelStyle, transitMode, startingCity } = params;

  const roomsCount = Math.ceil(travelersCount / 2);

  // 1. Intercity Transit Round Trip
  let transitPerPerson = 0;
  let transitDesc = '';

  const isHighAltitude = dest.id === 'ladakh-leh';

  if (transitMode === 'flight' || isHighAltitude) {
    if (travelStyle === 'budget') transitPerPerson = isHighAltitude ? 8500 : 4200;
    else if (travelStyle === 'standard') transitPerPerson = isHighAltitude ? 13000 : 7500;
    else transitPerPerson = isHighAltitude ? 22000 : 14500;
    transitDesc = `Return domestic flights (${startingCity} ⇄ ${dest.name})`;
  } else if (transitMode === 'train') {
    if (travelStyle === 'budget') transitPerPerson = 1200;
    else if (travelStyle === 'standard') transitPerPerson = 2800;
    else transitPerPerson = 5400;
    transitDesc = `Round-trip high-speed / express train (Vande Bharat / Express from ${startingCity})`;
  } else {
    // Road / Private Chauffeur
    const baseCabTrip = travelStyle === 'budget' ? 3500 : travelStyle === 'standard' ? 6500 : 14000;
    transitPerPerson = Math.round(baseCabTrip / Math.max(1, travelersCount));
    transitDesc = `Interstate private highway cab / toll transit from ${startingCity}`;
  }

  const totalTransitCost = transitPerPerson * travelersCount;

  // 2. Accommodation
  const nightlyRoomRate = {
    budget: 1200,
    standard: 4800,
    luxury: 24000,
    premium: 24000,
  }[travelStyle];

  const totalAccommodationCost = nightlyRoomRate * (daysCount > 1 ? daysCount - 1 : 1) * roomsCount;
  const stayDesc = `${travelStyle === 'budget' ? 'Verified Heritage Homestays / Hostels' : travelStyle === 'standard' ? 'Boutique Heritage Hotels' : '5-Star Royal Palace / Luxury Resorts'} (${roomsCount} room${roomsCount > 1 ? 's' : ''} for ${daysCount > 1 ? daysCount - 1 : 1} night${daysCount > 2 ? 's' : ''})`;

  // 3. Food & Dining
  const dailyFoodPerPerson = {
    budget: 450,
    standard: 1200,
    luxury: 3200,
    premium: 3200,
  }[travelStyle];

  const totalFoodCost = dailyFoodPerPerson * daysCount * travelersCount;
  const foodDesc = `Daily regional meals, street breakfast & specialty dining for ${travelersCount} traveler${travelersCount > 1 ? 's' : ''}`;

  // 4. Monuments & Authorized Guides
  const monumentPassPerPerson = {
    budget: 350,
    standard: 1100,
    luxury: 3200,
    premium: 3200,
  }[travelStyle];

  const totalMonumentsCost = monumentPassPerPerson * travelersCount;
  const monumentDesc = `ASI monuments entry passes & ${travelStyle === 'budget' ? 'audio guides' : 'licensed cultural historian guide'}`;

  // 5. Local Transit within City
  const dailyLocalTransit = {
    budget: 350,
    standard: 1400,
    luxury: 3800,
    premium: 3800,
  }[travelStyle];

  const totalLocalTransitCost = dailyLocalTransit * daysCount;
  const localTransitDesc = `${travelStyle === 'budget' ? 'Local E-Rickshaws, Metro & City Autos' : travelStyle === 'standard' ? 'Pre-booked AC Taxis & Sightseeing Shuttles' : 'Dedicated Private Chauffeur Sedan / SUV'}`;

  const totalEstimatedCost = totalTransitCost + totalAccommodationCost + totalFoodCost + totalMonumentsCost + totalLocalTransitCost;
  const perPersonCost = Math.round(totalEstimatedCost / Math.max(1, travelersCount));

  return {
    destinationName: dest.name,
    startingCity,
    travelersCount,
    daysCount,
    travelStyle: travelStyle.toUpperCase(),
    breakdown: {
      intercityTransit: {
        category: 'Intercity Transit',
        estimatedCostINR: totalTransitCost,
        description: transitDesc,
      },
      accommodation: {
        category: 'Stay & Accommodation',
        estimatedCostINR: totalAccommodationCost,
        description: stayDesc,
      },
      diningAndStreetFood: {
        category: 'Food & Cultural Dining',
        estimatedCostINR: totalFoodCost,
        description: foodDesc,
      },
      monumentsAndGuides: {
        category: 'Monuments & Guides',
        estimatedCostINR: totalMonumentsCost,
        description: monumentDesc,
      },
      localCityTransit: {
        category: 'Local City Travel',
        estimatedCostINR: totalLocalTransitCost,
        description: localTransitDesc,
      },
    },
    totalEstimatedCostINR: totalEstimatedCost,
    perPersonEstimatedCostINR: perPersonCost,
    disclaimer: 'Estimated cost based on verified 2026 regional tariff averages. Actual costs may vary depending on festival seasons, advance booking, and room categories.',
  };
}
