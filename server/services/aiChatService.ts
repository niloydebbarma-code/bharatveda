import { HOTELS } from '../data/hotels.js';
import { DESTINATIONS } from '../data/destinations.js';
import { FESTIVALS } from '../data/festivals.js';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponsePayload {
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

export class AIProviderError extends Error {
  readonly statusCode = 503;
  readonly code = 'AI_PROVIDER_UNAVAILABLE';

  constructor(message: string) {
    super(message);
    this.name = 'AIProviderError';
  }
}

type AILanguageCode = 'en' | 'hi' | 'bn' | 'ta' | 'te';

const LANGUAGE_NAMES: Record<AILanguageCode, string> = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
};

const LOCALIZED_FALLBACK: Record<AILanguageCode, {
  where: string;
  when: string;
  experience: string;
  food: string;
  destinationWhy: string;
  destinationRegion: string;
  destinationPlanning: string;
  destinationNext: string;
  topSights: string;
  stay: string;
  mustEat: string;
  transit: string;
  sacredCircuits: string;
  morningExperience: string;
  delicacies: string;
  stayOnGhats: string;
  heritageGuide: string;
  spiritualGuide: string;
  generic: string;
}> = {
  en: {
    where: 'Where',
    when: 'When',
    experience: 'What to experience',
    food: 'Traditional food',
    destinationWhy: 'Why visit',
    destinationRegion: 'Region',
    destinationPlanning: 'Planning',
    destinationNext: 'Next step',
    topSights: 'Top Sights',
    stay: 'Where to Stay',
    mustEat: 'Must-Eat Food',
    transit: 'Transit',
    sacredCircuits: 'Sacred Circuits',
    morningExperience: 'Morning River Experience',
    delicacies: 'Food Delicacies',
    stayOnGhats: 'Stay on the Ghats',
    heritageGuide: 'Travel Guide',
    spiritualGuide: 'Spiritual & Cultural Guide',
    generic: 'I can help with that travel question, but I need one more detail to give a precise answer. Try naming a place, festival, food, hotel, or trip duration.',
  },
  hi: {
    where: 'कहाँ',
    when: 'कब',
    experience: 'क्या अनुभव करें',
    food: 'पारंपरिक भोजन',
    destinationWhy: 'क्यों जाएँ',
    destinationRegion: 'क्षेत्र',
    destinationPlanning: 'योजना',
    destinationNext: 'अगला कदम',
    topSights: 'मुख्य दर्शनीय स्थल',
    stay: 'कहाँ ठहरें',
    mustEat: 'ज़रूर खाएँ',
    transit: 'यातायात',
    sacredCircuits: 'पवित्र स्थल',
    morningExperience: 'सुबह का नदी अनुभव',
    delicacies: 'खाने की विशेषताएँ',
    stayOnGhats: 'घाटों पर ठहरें',
    heritageGuide: 'विरासत गाइड',
    spiritualGuide: 'आध्यात्मिक और सांस्कृतिक गाइड',
    generic: 'मैं इस यात्रा प्रश्न में मदद कर सकता हूँ, लेकिन सटीक उत्तर के लिए एक और जानकारी दें। स्थान, त्योहार, भोजन, होटल या यात्रा की अवधि लिखें।',
  },
  bn: {
    where: 'কোথায়',
    when: 'কখন',
    experience: 'কী অভিজ্ঞতা নেবেন',
    food: 'ঐতিহ্যবাহী খাবার',
    destinationWhy: 'কেন যাবেন',
    destinationRegion: 'অঞ্চল',
    destinationPlanning: 'পরিকল্পনা',
    destinationNext: 'পরবর্তী ধাপ',
    topSights: 'প্রধান দর্শনীয় স্থান',
    stay: 'কোথায় থাকবেন',
    mustEat: 'অবশ্যই খাবেন',
    transit: 'যাতায়াত',
    sacredCircuits: 'পবিত্র স্থান',
    morningExperience: 'সকালের নদী অভিজ্ঞতা',
    delicacies: 'খাবারের বিশেষত্ব',
    stayOnGhats: 'ঘাটে থাকুন',
    heritageGuide: 'ঐতিহ্য গাইড',
    spiritualGuide: 'আধ্যাত্মিক ও সাংস্কৃতিক গাইড',
    generic: 'এই ভ্রমণ প্রশ্নে আমি সাহায্য করতে পারি। নির্ভুল উত্তরের জন্য একটি স্থান, উৎসব, খাবার, হোটেল বা ভ্রমণের সময়কাল লিখুন।',
  },
  ta: {
    where: 'எங்கு',
    when: 'எப்போது',
    experience: 'எதை அனுபவிக்கலாம்',
    food: 'பாரம்பரிய உணவு',
    destinationWhy: 'ஏன் செல்ல வேண்டும்',
    destinationRegion: 'பகுதி',
    destinationPlanning: 'திட்டமிடல்',
    destinationNext: 'அடுத்த படி',
    topSights: 'முக்கிய இடங்கள்',
    stay: 'எங்கு தங்கலாம்',
    mustEat: 'அவசியம் சுவைக்க வேண்டிய உணவு',
    transit: 'போக்குவரத்து',
    sacredCircuits: 'புனித இடங்கள்',
    morningExperience: 'காலை நதி அனுபவம்',
    delicacies: 'உணவு சிறப்புகள்',
    stayOnGhats: 'காட்களில் தங்குதல்',
    heritageGuide: 'பாரம்பரிய வழிகாட்டி',
    spiritualGuide: 'ஆன்மீக மற்றும் கலாச்சார வழிகாட்டி',
    generic: 'இந்த பயணக் கேள்விக்கு உதவ முடியும். துல்லியமான பதிலுக்கு இடம், திருவிழா, உணவு, ஹோட்டல் அல்லது பயண நாட்களை குறிப்பிடுங்கள்.',
  },
  te: {
    where: 'ఎక్కడ',
    when: 'ఎప్పుడు',
    experience: 'ఏమి అనుభవించాలి',
    food: 'సాంప్రదాయ ఆహారం',
    destinationWhy: 'ఎందుకు వెళ్లాలి',
    destinationRegion: 'ప్రాంతం',
    destinationPlanning: 'ప్రణాళిక',
    destinationNext: 'తదుపరి దశ',
    topSights: 'ప్రధాన సందర్శనా స్థలాలు',
    stay: 'ఎక్కడ బస చేయాలి',
    mustEat: 'తప్పక రుచి చూడాల్సిన ఆహారం',
    transit: 'రవాణా',
    sacredCircuits: 'పవిత్ర ప్రదేశాలు',
    morningExperience: 'ఉదయం నది అనుభవం',
    delicacies: 'ఆహార ప్రత్యేకతలు',
    stayOnGhats: 'ఘాట్‌ల వద్ద బస',
    heritageGuide: 'వారసత్వ గైడ్',
    spiritualGuide: 'ఆధ్యాత్మిక మరియు సాంస్కృతిక గైడ్',
    generic: 'ఈ ప్రయాణ ప్రశ్నకు సహాయం చేయగలను. ఖచ్చితమైన సమాధానానికి ప్రదేశం, పండుగ, ఆహారం, హోటల్ లేదా ప్రయాణ రోజులు పేర్కొనండి.',
  },
};

export async function processAIChatMessage(
  messages: ChatMessage[],
  language: AILanguageCode = 'en'
): Promise<ChatResponsePayload> {
  const userMessages = messages.filter(m => m.role === 'user');
  const latestQuery = userMessages.at(-1)?.content.toLowerCase() || '';
  const conversationQuery = userMessages.map(message => message.content).join(' ').toLowerCase();
  const labels = LOCALIZED_FALLBACK[language];
  const topicWords = [
    'agra', 'taj mahal', 'varanasi', 'kashi', 'ghat', 'hotel', 'stay',
    'booking', 'room', 'food', 'cuisine', 'eat', 'dishes', 'cost',
    'budget', 'price', 'calculator', 'festival', 'hampi', 'onam',
  ];
  const query = topicWords.some((term) => latestQuery.includes(term))
    ? latestQuery
    : conversationQuery;

  // Check if OPENAI_API_KEY is available in environment
  const apiKey = process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;

  if (apiKey) {
    try {
      const endpoint = process.env.GROQ_API_KEY
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : 'https://api.openai.com/v1/chat/completions';
      
      const models = process.env.GROQ_API_KEY
        ? (process.env.GROQ_MODELS || 'openai/gpt-oss-120b,openai/gpt-oss-20b')
          .split(',')
          .map(model => model.trim())
          .filter(Boolean)
        : ['gpt-4o-mini'];

      const systemPrompt = `You are VedaGuide, an expert Indian Heritage & Cultural Travel Assistant for BharatVeda.
You provide precise, culturally reverent, practical travel advice across all 28 Indian States and UTs.
Mention real monuments, ASI entry guidelines, authentic regional food, high-speed rail (Vande Bharat), and boutique stays.
Keep answers structured with bullet points. Never make up fake phone numbers or non-existent places.`;

      let lastProviderError = 'The AI provider could not be reached.';
      for (const model of models) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            signal: AbortSignal.timeout(15_000),
            body: JSON.stringify({
              model,
              messages: [
                {
                  role: 'system',
                  content: `${systemPrompt}\nRespond in ${LANGUAGE_NAMES[language]}. Keep place names and prices accurate.`,
                },
                ...messages
                  .filter(message => message.role !== 'system')
                  .slice(-6),
              ],
              temperature: 0,
              max_tokens: 600,
            }),
          });

          if (!res.ok) {
            lastProviderError = `${process.env.GROQ_API_KEY ? 'Groq' : 'OpenAI'} model ${model} returned HTTP ${res.status}.`;
            continue;
          }

          const json = await res.json();
          const content = json.choices?.[0]?.message?.content;
          if (!content || typeof content !== 'string') {
            lastProviderError = `AI model ${model} returned an empty response.`;
            continue;
          }

          return {
            reply: content,
            suggestedPills: [
              'Hotels near Taj Mahal',
              'Varanasi Ghat Aarti Timings',
              'How to reach Hampi by Train',
              'Estimate 3-Day Trip Budget',
            ],
          };
        } catch (error) {
          lastProviderError = error instanceof Error
            ? `AI model ${model} failed: ${error.message}`
            : `AI model ${model} failed.`;
        }
      }

      throw new AIProviderError(lastProviderError);
    } catch (error) {
      if (error instanceof AIProviderError) {
        throw error;
      }
      console.error('AI provider request failed:', error);
      throw new AIProviderError('The AI provider could not be reached.');
    }
  }

  // --- BUILT-IN INTELLIGENT KNOWLEDGE & NLP ENGINE ---
  if (query.includes('agra') || query.includes('taj mahal')) {
    const agraHotels = HOTELS.filter(h => h.destinationId === 'agra-taj-mahal');
    return {
      reply: `**Agra ${labels.heritageGuide} & Heritage Advice:**
• **${labels.topSights}:** Taj Mahal (sunrise visit is best; closed on Fridays), Agra Fort (red sandstone fortress), and Mehtab Bagh across the Yamuna for sunset reflections.
• **${labels.stay}:** Luxury palatial stay at *The Oberoi Amarvilas* (0.6 km from Taj), boutique gardens at *ITC Mughal*, or budget rooftop social dorms at *Joey's Hostel*.
• **${labels.mustEat}:** Agra Petha (authentic ash gourd confection) from certified shops, and Bedmi Puri with spicy Aloo Sabzi for breakfast at Deviram.
• **${labels.transit}:** Gatimaan Express or Vande Bharat from New Delhi (1 hr 40 min) to Agra Cantt station.`,
      suggestedPills: [
        'Hotels in Agra',
        'Calculate Agra Trip Cost',
        'Agra 3-Day Itinerary',
        'Bedmi Puri Breakfast Spots',
      ],
      recommendedEntities: agraHotels.map(h => ({
        type: 'hotel',
        id: h.id,
        title: h.name,
        subtitle: `${h.landmarkDistance} • ₹${h.rooms[0]?.pricePerNightINR.toLocaleString('en-IN')}/night`,
        priceOrTag: `${h.starRating}★ • ${h.reviewScore} ${h.reviewScoreWord}`,
        imageUrl: h.heroImage,
      })),
    };
  }

  if (query.includes('varanasi') || query.includes('kashi') || query.includes('ghat')) {
    return {
      reply: `**Varanasi (Kashi) ${labels.spiritualGuide}:**
• **${labels.sacredCircuits}:** Dashashwamedh Ghat Evening Ganga Aarti (starts ~6:30 PM), newly developed Kashi Vishwanath Corridor, and Sarnath (where Buddha gave his first sermon).
• **${labels.morningExperience}:** Book an early morning hand-rowed boat from Assi Ghat to Dashashwamedh at 5:30 AM to witness sunrise rituals (Subah-e-Banaras).
• **${labels.delicacies}:** Banarasi Paan, Tamatar Chaat at Keshari Bhojnalaya, Kachori Jalebi, and seasonal Malaiyo saffron sweet.
• **${labels.stayOnGhats}:** *BrijRama Palace* directly on Darbhanga Ghat accessible by royal private boat.`,
      suggestedPills: [
        'Varanasi Hotels on Ghats',
        'Kashi Vishwanath Darshan Info',
        'Best Street Food in Varanasi',
        'Plan 3-Day Varanasi Itinerary',
      ],
      recommendedEntities: [
        {
          type: 'destination',
          id: 'varanasi-kashi',
          title: 'Varanasi (Kashi)',
          subtitle: 'The Eternal City of Light on the Sacred Ganga',
          priceOrTag: 'Spiritual • 3 Days',
          imageUrl: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80',
        }
      ]
    };
  }

  if (query.includes('hotel') || query.includes('stay') || query.includes('booking') || query.includes('room')) {
    const featuredHotels = HOTELS.slice(0, 3);
    return {
      reply: `**Verified Heritage Stays & Stays Marketplace:**
We offer authentic verified accommodations across India with live price breakdowns, transparent GST calculations, and free cancellation policies:
• **Royal Palaces:** *The Oberoi Amarvilas* (Agra), *Rambagh Palace* (Jaipur), *BrijRama Palace* (Varanasi), *Evolve Back* (Hampi).
• **Boutique Resorts:** *Kumarakom Lake Resort* (Kerala Backwaters), *ITC Mughal* (Agra).
• **Backpacker Hostels:** *Joey's Hostel* (Agra), *Zostel Jaipur*, *Zostel Leh*.
Select any property to inspect available room tiers, bed types, and landmark proximity.`,
      suggestedPills: [
        'Search Stays in Jaipur',
        'Search Stays in Kerala',
        'Compare Hotels Side-by-Side',
        'Free Cancellation Hotels',
      ],
      recommendedEntities: featuredHotels.map(h => ({
        type: 'hotel',
        id: h.id,
        title: h.name,
        subtitle: `${h.city} • ₹${h.rooms[0]?.pricePerNightINR.toLocaleString('en-IN')}/night`,
        priceOrTag: `${h.starRating}★ ${h.reviewScoreWord}`,
        imageUrl: h.heroImage,
      })),
    };
  }

  if (query.includes('food') || query.includes('cuisine') || query.includes('eat') || query.includes('dishes')) {
    return {
      reply: `**Regional Culinary Traditions of India:**
• **North:** Awadhi Dum Biryani (Lucknow), Dal Makhani (Amritsar), Dal Baati Churma & Ghevar (Rajasthan).
• **South:** Traditional 26-dish Kerala Sadya on banana leaf, Chettinad Pepper Chicken, Mysore Masala Dosa, and South Indian Filter Coffee.
• **East:** Shorshe Ilish (Hilsa in mustard gravy) in Kolkata, and Chhena Poda caramelized cottage cheese cake in Odisha.
• **West:** Gujarati Royal Thali, Goan Fish Curry (Kokum infused), and Puran Poli with homemade ghee.`,
      suggestedPills: [
        'Explore Regional Cuisines',
        'Agra Local Food Guide',
        'Varanasi Chaat Spots',
        'Jaipur Royal Thali',
      ]
    };
  }

  if (query.includes('cost') || query.includes('budget') || query.includes('price') || query.includes('calculator')) {
    return {
      reply: `**Interactive Travel Cost Calculator:**
You can estimate your complete trip budget in real time using our calculator on the homepage:
• **Transport:** Round-trip Vande Bharat / Express rail, domestic flights, or interstate highway cabs.
• **Stays:** Budget homestays (₹1,200/night), Boutique hotels (₹4,800/night), or Royal palace stays (₹24,000/night).
• **Food:** Regional thalis and specialty restaurants (₹450 to ₹1,200 / person / day).
• **Passes & Guides:** ASI monument tickets and licensed government cultural historians.
Scroll to the **Cost Calculator** section to adjust starting city and travelers count.`,
      suggestedPills: [
        'Calculate Agra Budget',
        'Calculate Jaipur Budget',
        'Calculate Kerala Trip',
        'Custom Trip Consultation',
      ]
    };
  }

  const matchedDestination = DESTINATIONS.find((destination) => {
    const terms = [destination.name, destination.state, destination.tagline].join(' ').toLowerCase();
    return terms.split(/\W+/).some((term) => term.length > 3 && query.includes(term));
  });

  if (matchedDestination) {
    return {
      reply: `**${matchedDestination.name} Heritage Guide:**\n• **${labels.destinationWhy}:** ${matchedDestination.tagline}.\n• **${labels.destinationRegion}:** ${matchedDestination.state}, ${matchedDestination.region} India.\n• **${labels.destinationPlanning}:** Allow ${matchedDestination.recommendedDuration.toLowerCase()} and check the monument opening day before booking.\n• **${labels.destinationNext}:** Open the destination card for verified sights, stays, route guidance, and a custom itinerary.`,
      suggestedPills: [
        `Best time to visit ${matchedDestination.name}`,
        `Hotels in ${matchedDestination.name}`,
        `${matchedDestination.name} 3-Day Itinerary`,
        `Calculate ${matchedDestination.name} Budget`,
      ],
      recommendedEntities: [{
        type: 'destination',
        id: matchedDestination.id,
        title: matchedDestination.name,
        subtitle: `${matchedDestination.state} • ${matchedDestination.recommendedDuration}`,
        priceOrTag: matchedDestination.isUnesco ? `UNESCO ${matchedDestination.unescoYear}` : matchedDestination.category,
        imageUrl: matchedDestination.imageUrl,
      }],
    };
  }

  const matchedFestival = FESTIVALS.find((festival) =>
    [festival.name, festival.state, festival.seasonMonth].join(' ').toLowerCase().split(/\W+/)
    .some((term) => term.length > 3 && query.includes(term))
  );

  if (matchedFestival) {
    return {
      reply: `**${matchedFestival.name}:**\n• **${labels.where}:** ${matchedFestival.state}.\n• **${labels.when}:** ${matchedFestival.seasonMonth}.\n• **${labels.experience}:** ${matchedFestival.mustExperience}\n• **${labels.food}:** ${matchedFestival.traditionalTreat}`,
      suggestedPills: [
        `${matchedFestival.name} travel plan`,
        `Best time for ${matchedFestival.name}`,
        `Hotels near ${matchedFestival.state}`,
        'Explore all Indian festivals',
      ],
      recommendedEntities: [{
        type: 'destination',
        id: matchedFestival.id,
        title: matchedFestival.name,
        subtitle: `${matchedFestival.state} • ${matchedFestival.seasonMonth}`,
        priceOrTag: 'Festival guide',
        imageUrl: matchedFestival.imageUrl,
      }],
    };
  }

  // Default helpful overview
  return {
    reply: `**VedaGuide:** ${labels.generic}\n\nFor example: “Plan 3 days in Hampi”, “Where is Hornbill Festival?”, or “Hotels near Varanasi ghats”.`,
    suggestedPills: [
      'Top 5 UNESCO Sites in India',
      'Plan 3-Day Golden Triangle',
      'Hotels near Taj Mahal',
      'Best Time to Visit Ladakh',
    ]
  };
}
