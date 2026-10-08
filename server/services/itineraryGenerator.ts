import { DESTINATIONS, Destination } from '../data/destinations.js';

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

export function generateCustomItinerary(
  destinationId: string,
  days: number,
  travelStyle: string,
  budget: 'budget' | 'standard' | 'luxury',
  travelers: number,
  interests: string[]
): GeneratedItinerary {
  const dest: Destination | undefined = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];

  const budgetMultipliers = {
    budget: { basePerPersonPerDay: 2200, tierName: 'Budget Friendly (Heritage Homestays & Public Transit)' },
    standard: { basePerPersonPerDay: 6500, tierName: 'Standard Comfort (Boutique Heritage Hotels & Private Chauffeur)' },
    luxury: { basePerPersonPerDay: 18500, tierName: 'Royal Luxury (Palace Stays, Curated ASI Historians & VIP Access)' },
  };

  const selectedTier = budgetMultipliers[budget] || budgetMultipliers.standard;
  const totalCost = selectedTier.basePerPersonPerDay * days * travelers;
  const lowerEst = Math.round(totalCost * 0.9);
  const upperEst = Math.round(totalCost * 1.15);

  const styleDescriptions: Record<string, string> = {
    'heritage-explorer': 'In-depth historical exploration of monumental architecture and archaeology',
    'cultural-immersion': 'Deep engagement with living traditions, folklore, and artisanal guilds',
    'photography-scenic': 'Golden hour vantage points, architectural perspectives, and riparian scenes',
    'culinary-journey': 'Authentic culinary trails, street food heritage, and royal recipes',
    'relaxed-leisure': 'Unrushed cadence with restorative heritage gardens and leisurely strolls',
  };

  const daysPlan: DayPlan[] = [];

  for (let i = 1; i <= days; i++) {
    const attraction1 = dest.keyAttractions[(i - 1) % dest.keyAttractions.length] || dest.name;
    const attraction2 = dest.keyAttractions[i % dest.keyAttractions.length] || dest.keyAttractions[0];
    const foodItem1 = dest.localCuisine[(i - 1) % dest.localCuisine.length] || 'Traditional regional thali';
    const foodItem2 = dest.localCuisine[i % dest.localCuisine.length] || 'Local artisanal dessert';

    let dayTheme = '';
    let morningActivity = '';
    let afternoonActivity = '';
    let eveningActivity = '';

    if (i === 1) {
      dayTheme = `Grand Arrival & First Glimpse of ${dest.name} Marvels`;
      morningActivity = `Arrive, check into heritage accommodations, and embark on an orientation walk through the historic district.`;
      afternoonActivity = `Comprehensive guided immersion through ${attraction1}, exploring its foundation history and architectural stone craft.`;
      eveningActivity = `Witness traditional lamps and riverside or rooftop sunset vistas over ${attraction1}.`;
    } else if (i === 2) {
      dayTheme = `Deep Architectural Heritage & Master Craftsmanship`;
      morningActivity = `Sunrise excursion to ${attraction2} for morning light photography and tranquility before regular visiting hours.`;
      afternoonActivity = `Visit local generational craft workshops preserving traditional handloom weaving, stone inlay, or bronze casting.`;
      eveningActivity = `Cultural evening featuring classical music, folk performance, or sound and light narration.`;
    } else if (i === 3) {
      dayTheme = `Spiritual Sanctuaries & Local Gastronomy Walk`;
      morningActivity = `Visit sacred sanctums and stepwells, observing morning devotion, ancient chanting, and water architecture.`;
      afternoonActivity = `Curated culinary tasting tour through historic bazaars, sampling time-honored recipes perfected over centuries.`;
      eveningActivity = `Serene sunset vantage point with panoramic views across the city skyline and temple spires.`;
    } else {
      const remainingAttraction = dest.keyAttractions[(i + 1) % dest.keyAttractions.length];
      dayTheme = `Hidden Gems & Countryside Heritage of ${dest.state}`;
      morningActivity = `Excursion to nearby heritage site ${remainingAttraction}, exploring lesser-known inscriptions and scenic countryside routes.`;
      afternoonActivity = `Interact with local community artisans and explore traditional spice gardens or rural stepwells.`;
      eveningActivity = `Farewell evening dinner enjoying royal recipes and peaceful courtyard ambience.`;
    }

    daysPlan.push({
      dayNumber: i,
      theme: dayTheme,
      morning: {
        time: '07:30 AM – 11:30 AM',
        title: `Morning Exploration: ${attraction1}`,
        description: `${morningActivity} Special focus on: ${interests.slice(0, 2).join(' & ')}.`,
        tip: 'Arrive early with comfortable walking shoes and refillable water flasks.',
      },
      afternoon: {
        time: '01:00 PM – 04:30 PM',
        title: `Afternoon Heritage & Cuisine: ${attraction2}`,
        description: afternoonActivity,
        culinaryHighlight: `Savor authentic ${foodItem1} followed by artisanal ${foodItem2}.`,
      },
      evening: {
        time: '05:30 PM – 08:30 PM',
        title: `Twilight & Sunset Experience`,
        description: eveningActivity,
        sunsetSpot: dest.insiderTip,
      },
      localTransitTip: `Utilize pre-booked authorized ASI electric shuttles or traditional heritage tongas to reduce environmental impact.`,
    });
  }

  return {
    itineraryId: `IN-${dest.id.substring(0, 4).toUpperCase()}-${Date.now().toString().slice(-6)}`,
    destination: {
      id: dest.id,
      name: dest.name,
      state: dest.state,
      tagline: dest.tagline,
      isUnesco: dest.isUnesco,
      imageUrl: dest.imageUrl,
    },
    overview: {
      totalDays: days,
      travelStyle: styleDescriptions[travelStyle] || travelStyle,
      budgetCategory: selectedTier.tierName,
      travelersCount: travelers,
      estimatedCostRangeINR: `₹${lowerEst.toLocaleString('en-IN')} – ₹${upperEst.toLocaleString('en-IN')} (Total for ${travelers} traveler${travelers > 1 ? 's' : ''})`,
      bestSeasonAdvice: `${dest.bestTimeToVisit}. Climate: ${dest.climate}.`,
    },
    days: daysPlan,
    budgetBreakdown: {
      heritagePassesAndGuides: `₹${Math.round(totalCost * 0.15).toLocaleString('en-IN')} (Authorized ASI Guides & Monument Entries)`,
      authenticDining: `₹${Math.round(totalCost * 0.25).toLocaleString('en-IN')} (Regional Specialty Feasts & Street Heritage)`,
      lodgingRange: `₹${Math.round(totalCost * 0.45).toLocaleString('en-IN')} (${selectedTier.tierName})`,
      localTransit: `₹${Math.round(totalCost * 0.15).toLocaleString('en-IN')} (Private EV Cabs & Heritage Shuttles)`,
    },
    culturalRules: [
      dest.culturalEtiquette,
      'Maintain decorum and silence in active sanctums and memorial enclosures.',
      'Always seek verbal permission before photographing local artisans and ceremonial rituals.',
      'Carry small denominations of Indian Rupees (INR) for rural craft purchases and shoe-holding tokens.',
    ],
    recommendedSouvenirs: [
      `Authentic GI-Tagged handicrafts from ${dest.state}`,
      `Freshly sealed pack of ${dest.localCuisine[0] || 'local tea or spices'}`,
      'Hand-carved miniature stone or woodwork from local certified cooperative emporiums',
    ],
  };
}
