export interface NearbyPlace {
  id: string;
  name: string;
  category: 'heritage' | 'food' | 'stay' | 'transport' | 'service';
  subType: string;
  rating?: number;
  reviewCount?: number;
  distance: string;
  lat: number;
  lng: number;
  description: string;
  priceOrFee?: string;
  timingOrHours?: string;
  address: string;
  phoneOrContact?: string;
  popularFor?: string[];
  externalBookingUrl?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  tags: string[];
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  state: string;
  region: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  category: 'heritage' | 'spiritual' | 'nature' | 'royal' | 'coastal';
  isUnesco: boolean;
  unescoYear?: number;
  rating: number;
  totalReviewsCount: number;
  recommendedDuration: string;
  lat: number;
  lng: number;
  imageUrl: string;
  galleryUrls: string[];
  description: string;
  historySummary: string;
  architecturalStyle: string;
  bestTimeToVisit: string;
  climate: string;
  entryFee: {
    indianNational: string;
    foreignNational: string;
  };
  typicalDailyCostEstimate: {
    budget: string;
    standard: string;
    luxury: string;
  };
  keyAttractions: string[];
  localCuisine: string[];
  howToReach: {
    nearestAirport: string;
    nearestRailway: string;
    roadConnectivity: string;
  };
  insiderTip: string;
  culturalEtiquette: string;
  nearbyPlaces: NearbyPlace[];
  reviews: ReviewItem[];
}

export const DESTINATIONS: Destination[] = [
  // 1. AGRA
  {
    id: 'agra-taj-mahal',
    name: 'Agra',
    tagline: 'The Epitome of Mughal Grandeur & Eternal Love',
    state: 'Uttar Pradesh',
    region: 'north',
    category: 'heritage',
    isUnesco: true,
    unescoYear: 1983,
    rating: 4.8,
    totalReviewsCount: 142800,
    recommendedDuration: '2 to 3 Days',
    lat: 27.1767,
    lng: 78.0081,
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585506942812-e72b29cef752?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Home to the iconic ivory-white marble Taj Mahal, Agra sits on the banks of the Yamuna River and preserves the zenith of Mughal architecture, imperial forts, and vibrant bazaars.',
    historySummary: 'Agra rose to prominence as the capital of the Mughal Empire under Emperors Akbar, Jahangir, and Shah Jahan from 1526 to 1658, establishing world-renowned monuments, Persian charbagh gardens, and pietra dura stone inlay art.',
    architecturalStyle: 'Indo-Islamic and Mughal Architecture with Pietra Dura marble inlay work',
    bestTimeToVisit: 'October to March (Mild winter weather)',
    climate: 'Semi-arid, hot summers (38°C–45°C) and pleasant winter days (12°C–22°C)',
    entryFee: {
      indianNational: '₹50 (Mausoleum ₹200 extra)',
      foreignNational: '₹1,100 (Mausoleum ₹200 extra)',
    },
    typicalDailyCostEstimate: {
      budget: '₹1,800 – ₹2,500 / day',
      standard: '₹5,000 – ₹7,500 / day',
      luxury: '₹18,000 – ₹35,000 / day',
    },
    keyAttractions: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh', 'Itimad-ud-Daulah (Baby Taj)'],
    localCuisine: ['Agra Petha (Ash gourd sweet)', 'Bedmi Puri & Aloo Sabzi', 'Mughlai Paratha', 'Dalmoth Namkeen'],
    howToReach: {
      nearestAirport: 'Agra Kheria Airport (AGR, 8 km) / Delhi IGI Airport (DEL, 220 km)',
      nearestRailway: 'Agra Cantt (AGC) with fast Vande Bharat & Gatimaan Express (1 hr 40 min from Delhi)',
      roadConnectivity: 'Connected via 6-lane Yamuna Expressway (3.5 hours driving time from New Delhi)',
    },
    insiderTip: 'Visit the Taj Mahal at sunrise for ethereal soft lighting and significantly fewer crowds. Head to Mehtab Bagh across the Yamuna River at sunset.',
    culturalEtiquette: 'Remove shoes or wear provided shoe covers before stepping onto the marble mausoleum plinth. Dress respectfully with shoulders and knees covered.',
    nearbyPlaces: [
      {
        id: 'agra-taj',
        name: 'Taj Mahal',
        category: 'heritage',
        subType: 'UNESCO World Heritage Monument',
        rating: 4.9,
        reviewCount: 98000,
        distance: '0.0 km (Center)',
        lat: 27.1751,
        lng: 78.0421,
        description: 'Ivory-white marble mausoleum commissioned in 1632 by Shah Jahan for his wife Mumtaz Mahal.',
        priceOrFee: '₹50 (Indian) / ₹1,100 (Foreign)',
        timingOrHours: 'Sunrise to Sunset (Closed on Fridays)',
        address: 'Dharmapuri, Forest Colony, Tajganj, Agra, UP 282001',
        phoneOrContact: '+91 562 242 1204',
        popularFor: ['Sunrise Views', 'Mughal Architecture', 'Marble Inlay', 'Photography'],
      },
      {
        id: 'agra-fort',
        name: 'Agra Fort (Red Fort of Agra)',
        category: 'heritage',
        subType: 'UNESCO World Heritage Fort',
        rating: 4.7,
        reviewCount: 42000,
        distance: '2.5 km NW',
        lat: 27.1795,
        lng: 78.0211,
        description: 'Massive red sandstone imperial city and fortress of the Mughal emperors with Diwan-i-Khas and Jahangiri Mahal.',
        priceOrFee: '₹50 (Indian) / ₹650 (Foreign)',
        timingOrHours: '06:00 AM – 06:00 PM Daily',
        address: 'Agra Fort, Rakabganj, Agra, UP 282003',
        popularFor: ['Red Sandstone Walls', 'Sheesh Mahal', 'Views of Taj Mahal across Yamuna'],
      },
      {
        id: 'agra-mehtab-bagh',
        name: 'Mehtab Bagh (Moonlight Garden)',
        category: 'heritage',
        subType: 'Mughal Charbagh Garden',
        rating: 4.5,
        reviewCount: 16500,
        distance: '3.1 km N',
        lat: 27.1800,
        lng: 78.0420,
        description: 'Charbagh complex perfectly aligned with the Taj Mahal across the Yamuna River, ideal for evening photography.',
        priceOrFee: '₹25 (Indian) / ₹300 (Foreign)',
        timingOrHours: '06:00 AM – 06:00 PM',
        address: 'Opposite Taj Mahal, Nagla Devjit, Agra, UP 282006',
        popularFor: ['Sunset Reflection', 'Peaceful Gardens', 'Panoramic Views'],
      },
      {
        id: 'agra-food-pinch-spice',
        name: 'Pinch of Spice',
        category: 'food',
        subType: 'Authentic Mughlai & North Indian Dining',
        rating: 4.4,
        reviewCount: 9200,
        distance: '2.8 km S',
        lat: 27.1601,
        lng: 78.0152,
        description: 'Acclaimed dining destination serving signature Dal Makhani, Chicken Tikka Lababdar, and Mutton Rogan Josh.',
        priceOrFee: '₹1,200 for two',
        timingOrHours: '12:00 PM – 11:30 PM',
        address: '1076/2, Fatehabad Road, Tajganj, Agra',
        phoneOrContact: '+91 562 404 0399',
        popularFor: ['Mughlai Curries', 'Tandoori Platters', 'Family Dining'],
      },
      {
        id: 'agra-food-deviram',
        name: 'Deviram Sweets & Confectionery',
        category: 'food',
        subType: 'Traditional Street Breakfast & Sweets',
        rating: 4.6,
        reviewCount: 14500,
        distance: '3.6 km NW',
        lat: 27.1852,
        lng: 78.0076,
        description: 'Historic heritage breakfast stop famous for hot Bedmi Puri with spicy Aloo Sabzi and fresh crispy Jalebi.',
        priceOrFee: '₹150 for two',
        timingOrHours: '07:00 AM – 10:30 PM',
        address: 'Pratap Pura, Rakabganj, Agra',
        popularFor: ['Bedmi Puri', 'Jalebi', 'Agra Petha', 'Rabri'],
      },
      {
        id: 'agra-stay-oberoi',
        name: 'The Oberoi Amarvilas',
        category: 'stay',
        subType: '5-Star Luxury Heritage Resort',
        rating: 4.9,
        reviewCount: 4800,
        distance: '0.6 km from Taj Mahal East Gate',
        lat: 27.1685,
        lng: 78.0450,
        description: 'Ultra-luxury palatial resort where every guest room features uninterrupted views of the Taj Mahal.',
        priceOrFee: '₹38,000 – ₹75,000 / night',
        timingOrHours: 'Check-in: 2:00 PM • Check-out: 12:00 PM',
        address: 'Taj East Gate Road, Tajganj, Agra, UP 282001',
        phoneOrContact: '+91 562 223 1515',
        popularFor: ['Direct Taj Views', 'Mughal Architecture', 'Royal Spa', 'Private Dining'],
        externalBookingUrl: 'https://www.google.com/travel/hotels/s/agra-oberoi-amarvilas',
      },
      {
        id: 'agra-railway-cantt',
        name: 'Agra Cantt Railway Station (AGC)',
        category: 'transport',
        subType: 'Primary High-Speed Rail Terminal',
        rating: 4.2,
        reviewCount: 18000,
        distance: '5.2 km SW',
        lat: 27.1585,
        lng: 78.0088,
        description: 'Main rail junction connecting Vande Bharat, Gatimaan, and Shatabdi Express trains to New Delhi, Jaipur, and Mumbai.',
        timingOrHours: '24/7 Rail Service',
        address: 'Idgah Colony, Agra, Uttar Pradesh 282001',
        popularFor: ['Gatimaan Express (100 min from Delhi)', 'Prepaid Auto Stand', 'IRCTC Executive Lounge'],
      },
      {
        id: 'agra-sn-hospital',
        name: 'S.N. Medical College & Hospital',
        category: 'service',
        subType: 'Government Multi-Specialty Hospital',
        rating: 4.0,
        reviewCount: 2900,
        distance: '3.8 km NW',
        lat: 27.1882,
        lng: 78.0089,
        description: 'Major regional tertiary hospital with 24/7 emergency trauma care and multi-specialty medical services.',
        timingOrHours: '24/7 Emergency & Casualty',
        address: 'Hospital Road, Rakabganj, Agra, UP 282002',
        phoneOrContact: '+91 562 226 0353 / Emergency 108',
        popularFor: ['24/7 Emergency', 'Trauma Care', 'In-house Pharmacy'],
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Arun & Meera K. (Bengaluru)',
        rating: 5,
        date: 'February 2026',
        text: 'Visiting the Taj Mahal at 6:15 AM was pure magic. The mist over the Yamuna River and the morning light on the white marble are unforgettable. Pre-booking tickets online saved us over 45 minutes.',
        tags: ['Sunrise Visit', 'Online Tickets Recommended', 'Agra Fort'],
      }
    ]
  },

  // 2. JAIPUR
  {
    id: 'jaipur-pink-city',
    name: 'Jaipur',
    tagline: 'The Regal Pink City of Fortresses & Royal Astronomy',
    state: 'Rajasthan',
    region: 'north',
    category: 'royal',
    isUnesco: true,
    unescoYear: 2019,
    rating: 4.7,
    totalReviewsCount: 118400,
    recommendedDuration: '3 to 4 Days',
    lat: 26.9124,
    lng: 75.7873,
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is India’s first planned city, celebrated for terracotta-pink stone facades, hilltop forts, and geometric astronomical observatories.',
    historySummary: 'Designed on Vedic Vastu Shastra principles by Vidyadhar Bhattacharya, Jaipur was painted pink in 1876 to welcome the Prince of Wales, symbolizing imperial Rajasthani hospitality.',
    architecturalStyle: 'Rajput & Mughal fusion with honeycomb jharokhas and courtyards',
    bestTimeToVisit: 'November to February (Pleasant winter festival season)',
    climate: 'Desert climate with dry sunny days (22°C–26°C) and cool winter nights (8°C–14°C)',
    entryFee: {
      indianNational: 'Composite ticket ₹300',
      foreignNational: 'Composite ticket ₹1,000',
    },
    typicalDailyCostEstimate: {
      budget: '₹2,000 – ₹2,800 / day',
      standard: '₹5,500 – ₹8,500 / day',
      luxury: '₹22,000 – ₹45,000 / day',
    },
    keyAttractions: ['Hawa Mahal', 'Amber Fort & Sheesh Mahal', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort'],
    localCuisine: ['Dal Baati Churma', 'Ghevar', 'Laal Maas', 'Pyaaz Kachori', 'Ker Sangri'],
    howToReach: {
      nearestAirport: 'Jaipur International Airport (JAI, 12 km from city center)',
      nearestRailway: 'Jaipur Junction (JP) connected to Delhi, Mumbai, Kolkata with Vande Bharat',
      roadConnectivity: 'Delhi-Jaipur Expressway (NH 48), 4 hours driving time',
    },
    insiderTip: 'Visit Nahargarh Fort at sunset for panoramic views over the pink city rooftops. Buy a composite ticket at Amber Fort to save on admission to 5 monuments.',
    culturalEtiquette: 'Dress modestly when visiting active sanctums inside palace courtyards. Bargain politely in Johari and Bapu Bazaars.',
    nearbyPlaces: [
      {
        id: 'jaipur-hawa-mahal',
        name: 'Hawa Mahal (Palace of Winds)',
        category: 'heritage',
        subType: 'Historic Royal Facade',
        rating: 4.6,
        reviewCount: 68000,
        distance: '0.0 km (Walled City)',
        lat: 26.9239,
        lng: 75.8267,
        description: 'Five-story pink sandstone palace with 953 carved honeycomb jharokha windows built in 1799.',
        priceOrFee: '₹50 (Indian) / ₹200 (Foreign)',
        timingOrHours: '09:00 AM – 05:00 PM',
        address: 'Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Jaipur',
        popularFor: ['953 Jharokhas', 'Street Photography', 'Wind Architecture'],
      },
      {
        id: 'jaipur-amber-fort',
        name: 'Amber Fort & Palace',
        category: 'heritage',
        subType: 'UNESCO Hill Fort',
        rating: 4.8,
        reviewCount: 74000,
        distance: '10.5 km N',
        lat: 26.9855,
        lng: 75.8513,
        description: 'Majestic hilltop fort overlooking Maota Lake featuring the glittering Sheesh Mahal (Mirror Palace).',
        priceOrFee: '₹100 (Indian) / ₹500 (Foreign)',
        timingOrHours: '08:00 AM – 05:30 PM',
        address: 'Amer, Jaipur, Rajasthan 302001',
        popularFor: ['Sheesh Mahal', 'Light & Sound Show', 'Elephant Courtyard'],
      },
      {
        id: 'jaipur-food-lmb',
        name: 'Laxmi Mishthan Bhandar (LMB)',
        category: 'food',
        subType: 'Heritage Rajasthani Vegetarian Dining',
        rating: 4.5,
        reviewCount: 18200,
        distance: '0.4 km from Hawa Mahal',
        lat: 26.9210,
        lng: 75.8250,
        description: 'Established in 1727 in Johari Bazaar, world-famous for Ghevar, Pyaaz Kachori, and royal Rajasthani Thali.',
        priceOrFee: '₹900 for two',
        timingOrHours: '08:00 AM – 11:00 PM',
        address: '98-99, Johari Bazar, Jaipur, Rajasthan 302003',
        phoneOrContact: '+91 141 256 5844',
        popularFor: ['Paneer Ghevar', 'Royal Thali', 'Pyaaz Kachori'],
      },
      {
        id: 'jaipur-stay-rambagh',
        name: 'Rambagh Palace',
        category: 'stay',
        subType: 'Grand Heritage Palace Hotel',
        rating: 4.9,
        reviewCount: 5200,
        distance: '4.5 km from City Center',
        lat: 26.8970,
        lng: 75.8080,
        description: 'Former residence of the Maharaja of Jaipur, ranked among the finest luxury palace hotels in the world.',
        priceOrFee: '₹45,000 – ₹1,20,000 / night',
        timingOrHours: 'Check-in: 2:00 PM',
        address: 'Bhawani Singh Rd, Jaipur, Rajasthan 302005',
        popularFor: ['Maharaja Heritage', 'Peacock Gardens', 'Polo Lounge'],
        externalBookingUrl: 'https://www.google.com/travel/hotels/s/rambagh-palace-jaipur',
      },
      {
        id: 'jaipur-sms-hospital',
        name: 'Sawai Man Singh (SMS) Hospital',
        category: 'service',
        subType: 'Premier Medical College & Hospital',
        rating: 4.1,
        reviewCount: 6500,
        distance: '3.2 km S',
        lat: 26.8990,
        lng: 75.8150,
        description: 'Largest public tertiary hospital in Rajasthan offering 24/7 emergency care and specialized trauma centers.',
        timingOrHours: '24/7 Emergency',
        address: 'Jawahar Lal Nehru Marg, Ashok Nagar, Jaipur',
        phoneOrContact: '+91 141 251 8224 / 108',
        popularFor: ['24/7 Trauma Care', 'Central Pharmacy'],
      }
    ],
    reviews: [
      {
        id: 'j-rev-1',
        author: 'Pooja Verma (Delhi)',
        rating: 5,
        date: 'March 2026',
        text: 'The evening sound and light show at Amber Fort gave goosebumps. LMB’s Dal Baati Churma and Ghevar were delicious. Getting around by Jaipur Metro and e-rickshaws was very smooth.',
        tags: ['Amber Fort', 'Ghevar', 'Jaipur Metro'],
      }
    ]
  },

  // 3. TAMIL NADU (MADURAI & CHENNAI)
  {
    id: 'madurai-chennai-tamilnadu',
    name: 'Madurai & Chennai',
    tagline: 'Ancient Temple Towers, Classical Carnatic Arts & Coastal Forts',
    state: 'Tamil Nadu',
    region: 'south',
    category: 'spiritual',
    isUnesco: true,
    unescoYear: 1984,
    rating: 4.9,
    totalReviewsCount: 94200,
    recommendedDuration: '3 to 5 Days',
    lat: 9.9195,
    lng: 78.1193,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The cultural soul of South India, home to the 14 towering polychrome gopurams of Meenakshi Sundareswarar Temple in Madurai and the UNESCO Shore Temples of Mahabalipuram along the Bay of Bengal.',
    historySummary: 'The Pandyan, Chola, and Pallava dynasties fostered 2,500 years of Dravidian stone architecture, bronze metallurgy, Sangam literature, and Carnatic music.',
    architecturalStyle: 'Dravidian Temple Architecture with tiered sculptured gopurams and thousand-pillar mandapams',
    bestTimeToVisit: 'November to February (Pleasant winter temple festival season)',
    climate: 'Tropical with warm sunny days (24°C–30°C) and refreshing coastal breezes',
    entryFee: {
      indianNational: 'Free (Art Museum ₹50)',
      foreignNational: 'Free (Art Museum ₹100)',
    },
    typicalDailyCostEstimate: {
      budget: '₹1,600 – ₹2,400 / day',
      standard: '₹4,800 – ₹7,200 / day',
      luxury: '₹16,000 – ₹32,000 / day',
    },
    keyAttractions: ['Meenakshi Amman Temple', 'Shore Temple Mahabalipuram', 'Thirumalai Nayakkar Palace', 'Marina Promenade Chennai', 'Brihadisvara Chola Temple'],
    localCuisine: ['Madurai Kari Dosa', 'Jigarthanda cold dessert', 'Chettinad Pepper Chicken', 'Murugan Idli with Podi', 'South Indian Filter Coffee'],
    howToReach: {
      nearestAirport: 'Chennai International Airport (MAA) / Madurai Airport (IXM, 12 km)',
      nearestRailway: 'Chennai Central (MAS) / Madurai Junction (MDU) connected via Vande Bharat',
      roadConnectivity: 'NH 44 & East Coast Road (ECR) connecting Chennai, Mahabalipuram, and Madurai',
    },
    insiderTip: 'Witness the nightly 9:00 PM procession at Meenakshi Amman Temple and catch sunrise along the stone sculptures of Mahabalipuram.',
    culturalEtiquette: 'Strict modest dress code inside sanctums: shoulders and knees must be covered; footwear removed at main gopurams.',
    nearbyPlaces: [
      {
        id: 'tn-meenakshi',
        name: 'Meenakshi Sundareswarar Temple',
        category: 'heritage',
        subType: 'Historic Dravidian Temple Complex',
        rating: 4.9,
        reviewCount: 78000,
        distance: '0.0 km (Madurai Center)',
        lat: 9.9195,
        lng: 78.1193,
        description: 'Sprawling 14-tower temple with 33,000 intricate stone sculptures and the Hall of Thousand Pillars.',
        priceOrFee: 'Free Entry (Art Museum ₹50)',
        timingOrHours: '05:00 AM – 12:30 PM • 04:00 PM – 10:00 PM',
        address: 'Madurai Main, Madurai, Tamil Nadu 625001',
        popularFor: ['14 Gopurams', 'Thousand Pillar Hall', 'Night Ceremony'],
      },
      {
        id: 'tn-mahabalipuram',
        name: 'Shore Temple & Pancha Rathas',
        category: 'heritage',
        subType: 'UNESCO World Heritage Monolithic Temples',
        rating: 4.8,
        reviewCount: 41000,
        distance: '55 km S of Chennai',
        lat: 12.6167,
        lng: 80.1917,
        description: '7th-century Pallava structural stone temples overlooking the roaring Bay of Bengal surf.',
        priceOrFee: '₹40 (Indian) / ₹600 (Foreign)',
        timingOrHours: '06:00 AM – 06:00 PM',
        address: 'Beach Rd, Mahabalipuram, Tamil Nadu 603104',
        popularFor: ['Rock-Cut Rathas', 'Arjuna\'s Penance', 'Sea Breeze'],
      },
      {
        id: 'tn-food-murugan',
        name: 'Murugan Idli Shop & Famous Jigarthanda',
        category: 'food',
        subType: 'Legendary Tamil Gastronomy',
        rating: 4.7,
        reviewCount: 22000,
        distance: '0.4 km from Meenakshi Temple',
        lat: 9.9180,
        lng: 78.1210,
        description: 'World-famous steaming hot Malli Idlis with four chutneys, Podi ghee, and iced almond gum Jigarthanda.',
        priceOrFee: '₹350 for two',
        timingOrHours: '07:00 AM – 11:00 PM',
        address: 'West Masi Street, Madurai, Tamil Nadu 625001',
        popularFor: ['Malli Idli', 'Podi Ghee Dosa', 'Famous Jigarthanda'],
      },
      {
        id: 'tn-stay-heritage-madurai',
        name: 'Heritage Madurai Resort',
        category: 'stay',
        subType: '5-Star Traditional Courtyard Resort',
        rating: 4.8,
        reviewCount: 3600,
        distance: '3.5 km from Temple',
        lat: 9.9350,
        lng: 78.0950,
        description: 'Designed by legendary architect Geoffrey Bawa, featuring private plunge pool villas and ancient banyan gardens.',
        priceOrFee: '₹8,500 – ₹18,000 / night',
        timingOrHours: 'Check-in: 2:00 PM',
        address: '11 Kochadai, Melakkal Main Rd, Madurai 625016',
        popularFor: ['Geoffrey Bawa Architecture', 'Plunge Pool Villas', 'Ayurvedic Spa'],
        externalBookingUrl: 'https://www.google.com/travel/hotels/s/heritage-madurai',
      },
      {
        id: 'tn-apollo-hospital',
        name: 'Apollo Speciality Hospitals',
        category: 'service',
        subType: 'JCI Accredited Tertiary Medical Center',
        rating: 4.5,
        reviewCount: 9200,
        distance: '4.2 km from Center',
        lat: 9.9280,
        lng: 78.1400,
        description: 'Premier 24/7 multi-specialty trauma and cardiology center with dedicated international patient desk.',
        timingOrHours: '24/7 Emergency',
        address: 'KK Nagar, Madurai, Tamil Nadu 625020',
        phoneOrContact: '+91 452 258 0880 / 1066',
        popularFor: ['24/7 Emergency Trauma', 'Cardiac Care'],
      },
      {
        id: 'tn-railway-station',
        name: 'Madurai Junction (MDU) & Chennai Central (MAS)',
        category: 'transport',
        subType: 'Vande Bharat High-Speed Rail Hub',
        rating: 4.4,
        reviewCount: 31000,
        distance: '1.2 km W',
        lat: 9.9230,
        lng: 78.1110,
        description: 'High-speed Vande Bharat and Tejas Express hub connecting Chennai, Bengaluru, and Kanyakumari.',
        timingOrHours: '24/7 Rail Operations',
        address: 'Railway Colony, Madurai 625001',
        popularFor: ['Vande Bharat Express', 'Prepaid Taxi Stand'],
      }
    ],
    reviews: [
      {
        id: 'tn-rev-1',
        author: 'Srinivasan K. (Coimbatore)',
        rating: 5,
        date: 'January 2026',
        text: 'The evening Aarti at Meenakshi Amman Temple and the stone carving details in the Thousand Pillar Hall are sublime. Filter coffee and Podi Dosa in Madurai are unmatched.',
        tags: ['Meenakshi Temple', 'Thousand Pillar Hall', 'Filter Coffee'],
      }
    ]
  },

  // 4. VARANASI
  {
    id: 'varanasi-kashi',
    name: 'Varanasi',
    tagline: 'The Eternal City of Light on the Sacred Ganga',
    state: 'Uttar Pradesh',
    region: 'north',
    category: 'spiritual',
    isUnesco: false,
    rating: 4.8,
    totalReviewsCount: 96500,
    recommendedDuration: '2 to 3 Days',
    lat: 25.3176,
    lng: 82.9739,
    imageUrl: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Continuously inhabited for over 3,000 years, Varanasi is India’s spiritual capital where 84 riparian stone ghats line the holy Ganges amidst ancient temple bells, Sanskrit hymns, and sacred rituals.',
    historySummary: 'Praised in the Rigveda and Upanishads as Kashi (City of Light), Varanasi has been the heart of classical philosophy, Indian classical music, Sanskrit scholarship, and spiritual liberation.',
    architecturalStyle: 'Traditional riparian ghat architecture, Maratha style stone temples',
    bestTimeToVisit: 'October to March (Dev Deepawali in Nov is spectacular)',
    climate: 'Subtropical; pleasant winter days (14°C–24°C) with morning river mist',
    entryFee: {
      indianNational: 'Free (Ghats & Public Temples)',
      foreignNational: 'Free (Boat rides ₹300-₹1500)',
    },
    typicalDailyCostEstimate: {
      budget: '₹1,500 – ₹2,200 / day',
      standard: '₹4,500 – ₹7,000 / day',
      luxury: '₹16,000 – ₹32,000 / day',
    },
    keyAttractions: ['Dashashwamedh Ghat Evening Ganga Aarti', 'Kashi Vishwanath Corridor', 'Assi Ghat Sunrise', 'Sarnath (Deer Park)', 'Manikarnika Ghat'],
    localCuisine: ['Banarasi Paan', 'Kachori Jalebi', 'Malaiyo (Winter saffron foam dessert)', 'Tamatar Chaat'],
    howToReach: {
      nearestAirport: 'Lal Bahadur Shastri International Airport (VNS, 26 km)',
      nearestRailway: 'Varanasi Junction (BSB) / Pt. Deen Dayal Upadhyaya Jn (DDU, 15 km)',
      roadConnectivity: 'National Highway connectivity from Lucknow, Prayagraj, and Patna',
    },
    insiderTip: 'Book a hand-rowed wooden boat from Assi Ghat at 5:30 AM to watch the morning subah-e-banaras rituals as the sunrise lights up the ghat steps.',
    culturalEtiquette: 'Photography is strictly prohibited at cremation ghats (Manikarnika and Harishchandra) out of respect for mourning families.',
    nearbyPlaces: [
      {
        id: 'varanasi-dashashwamedh',
        name: 'Dashashwamedh Ghat & Evening Ganga Aarti',
        category: 'heritage',
        subType: 'Historic Sacred Ghat',
        rating: 4.9,
        reviewCount: 54000,
        distance: '0.0 km (Riverside)',
        lat: 25.3073,
        lng: 83.0103,
        description: 'The main ghat where the world-renowned synchronized evening brass lamp Ganga Aarti takes place every sunset.',
        priceOrFee: 'Free (Boat viewing ₹300 – ₹600)',
        timingOrHours: 'Aarti starts ~6:30 PM (Winter) / 7:00 PM (Summer)',
        address: 'Dashashwamedh Ghat Rd, Varanasi, UP 221001',
        popularFor: ['Ganga Aarti', 'Brass Oil Lamps', 'Evening Chants', 'Boat Rides'],
      },
      {
        id: 'varanasi-kashi-vishwanath',
        name: 'Shri Kashi Vishwanath Temple & Corridor',
        category: 'heritage',
        subType: 'Sacred Jyotirlinga Temple Complex',
        rating: 4.9,
        reviewCount: 62000,
        distance: '0.4 km from Ghats',
        lat: 25.3109,
        lng: 83.0107,
        description: 'One of the twelve sacred Jyotirlingas of Lord Shiva, newly renovated with a grand pedestrian corridor linking directly to the Ganges.',
        priceOrFee: 'Free General Entry • VIP Sugam Darshan ₹300',
        timingOrHours: '03:00 AM – 11:00 PM Daily',
        address: 'Lahori Tola, Varanasi, Uttar Pradesh 221001',
        popularFor: ['Jyotirlinga Darshan', 'Riverfront Corridor', 'Gold Spire'],
      },
      {
        id: 'varanasi-stay-brijrama',
        name: 'BrijRama Palace, Varanasi',
        category: 'stay',
        subType: 'Luxury Heritage Fort Palace on Ghats',
        rating: 4.8,
        reviewCount: 3800,
        distance: 'Directly on Darbhanga Ghat',
        lat: 25.3080,
        lng: 83.0110,
        description: 'An 18th-century Maratha stone palace perched on the riverbank, accessible by royal private boat.',
        priceOrFee: '₹26,000 – ₹55,000 / night',
        timingOrHours: 'Check-in: 2:00 PM',
        address: 'Darbhanga Ghat, Dashashwamedh, Varanasi',
        popularFor: ['Riverside Luxury', 'Classical Sitar Evenings', 'Private Bajra Boats'],
        externalBookingUrl: 'https://www.google.com/travel/hotels/s/brijrama-palace-varanasi',
      }
    ],
    reviews: [
      {
        id: 'v-rev-1',
        author: 'Raghavan Iyer (Chennai)',
        rating: 5,
        date: 'January 2026',
        text: 'The Kashi Vishwanath Corridor has transformed the pilgrimage experience. The early morning boat ride from Assi Ghat to Sarnath is spiritual poetry. Don’t miss the winter Malaiyo sweet in Chaukhamba lane.',
        tags: ['Vishwanath Corridor', 'Morning Boat Ride', 'Malaiyo Sweet'],
      }
    ]
  },

  // 5. KERALA BACKWATERS & KOCHI
  {
    id: 'kerala-backwaters-alappuzha',
    name: 'Kerala Backwaters & Kochi',
    tagline: 'Tranquil Emerald Waterways, Spice Forts & Ayurvedic Wellness',
    state: 'Kerala',
    region: 'south',
    category: 'nature',
    isUnesco: false,
    rating: 4.8,
    totalReviewsCount: 88200,
    recommendedDuration: '3 to 5 Days',
    lat: 9.9312,
    lng: 76.2673,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A serene network of over 900 km of interconnected canals, palm-fringed lagoons, and colonial spice ports combining Fort Kochi’s historic streets with Alappuzha’s tranquil houseboat cruises.',
    historySummary: 'Originally built as water trade arteries for transporting cardamom, black pepper, and coir from the Western Ghats to coastal trading ports where Arab, Portuguese, Dutch, and British merchants converged.',
    architecturalStyle: 'Traditional Kerala wood-and-thatch architecture with colonial Portuguese-Dutch influences',
    bestTimeToVisit: 'September to March (Pleasant coastal breezes and boat races)',
    climate: 'Tropical maritime (24°C–32°C) with cooling afternoon breezes',
    entryFee: {
      indianNational: 'Free access (Houseboat cruises ₹6,500 – ₹18,000/night)',
      foreignNational: 'Free access',
    },
    typicalDailyCostEstimate: {
      budget: '₹2,200 – ₹3,200 / day',
      standard: '₹6,000 – ₹9,500 / day',
      luxury: '₹20,000 – ₹42,000 / day',
    },
    keyAttractions: ['Alappuzha Backwaters & Houseboat Cruise', 'Fort Kochi Chinese Fishing Nets', 'Mattancherry Dutch Palace', 'Kumarakom Bird Sanctuary', 'Marari Beach'],
    localCuisine: ['Karimeen Pollichathu (Pearl spot fish)', 'Appam with Vegetable Stew', 'Kerala Sadya on Banana Leaf', 'Puttu and Kadala Curry'],
    howToReach: {
      nearestAirport: 'Cochin International Airport (COK, 38 km from Fort Kochi, 75 km from Alappuzha)',
      nearestRailway: 'Ernakulam Junction (ERS) / Alappuzha (ALLP) with express lines across South India',
      roadConnectivity: 'NH 66 coastal corridor along Kochi and Thiruvananthapuram',
    },
    insiderTip: 'Book an eco-friendly solar houseboat or a quiet village canoe in Kumarakom at dawn for peaceful birdwatching and lotus blooms.',
    culturalEtiquette: 'Respect the fragile aquatic ecosystems; avoid plastic disposal into backwater canals.',
    nearbyPlaces: [
      {
        id: 'kerala-chinese-nets',
        name: 'Fort Kochi Chinese Fishing Nets & Beach',
        category: 'heritage',
        subType: 'Maritime Historic Monument',
        rating: 4.6,
        reviewCount: 38000,
        distance: '0.0 km (Fort Kochi Waterfront)',
        lat: 9.9656,
        lng: 76.2421,
        description: 'Fixed mechanical fishing installations introduced by Chinese traders in the 14th century, iconic at sunset.',
        priceOrFee: 'Free to observe',
        timingOrHours: 'Active morning and evening tide hours',
        address: 'River Rd, Fort Kochi, Kochi, Kerala 682001',
        popularFor: ['Sunset Silhouettes', 'Fresh Seafood Stalls', 'Colonial Promenade'],
      },
      {
        id: 'kerala-stay-kumarakom',
        name: 'Kumarakom Lake Resort',
        category: 'stay',
        subType: '5-Star Luxury Backwater Heritage Retreat',
        rating: 4.9,
        reviewCount: 3900,
        distance: 'Vembanad Lake Shore',
        lat: 9.6175,
        lng: 76.4285,
        description: 'Reconstructed 16th-century traditional ancestral wooden villas (Tharavadu) with meandering pool and Ayurveda spa.',
        priceOrFee: '₹22,000 – ₹55,000 / night',
        timingOrHours: 'Check-in: 2:00 PM',
        address: 'Vembanad Lake, Kumarakom, Kottayam, Kerala 686563',
        popularFor: ['Heritage Villas', 'Ayurvedic Spa', 'Lakefront Sunsets'],
        externalBookingUrl: 'https://www.google.com/travel/hotels/s/kumarakom-lake-resort',
      }
    ],
    reviews: [
      {
        id: 'k-rev-1',
        author: 'Elena & Mark (Germany)',
        rating: 5,
        date: 'February 2026',
        text: 'The 24-hour houseboat experience through Alappuzha was the most relaxing day of our trip. Fresh Karimeen fish cooked on board was unbelievable.',
        tags: ['Houseboat Experience', 'Karimeen Pollichathu', 'Fort Kochi Walking'],
      }
    ]
  },

  // 6. HAMPI
  {
    id: 'hampi-vijayanagara',
    name: 'Hampi',
    tagline: 'The Boulder-Strewn Empire of Vijayanagara Wonders',
    state: 'Karnataka',
    region: 'south',
    category: 'heritage',
    isUnesco: true,
    unescoYear: 1986,
    rating: 4.9,
    totalReviewsCount: 65400,
    recommendedDuration: '3 to 4 Days',
    lat: 15.3350,
    lng: 76.4600,
    imageUrl: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An open-air museum of granite boulders and majestic ruins along the Tungabhadra River, Hampi was once the second-largest medieval city in the world during the 14th-16th century Vijayanagara Empire.',
    historySummary: 'Founded in 1336 by Harihara I and Bukka Raya I, Hampi flourished as a global trading metropolis for gems, pearls, and Arabian horses before its sack in 1565.',
    architecturalStyle: 'Vijayanagara Dravidian architecture with monolithic stone carvings and musical pillars',
    bestTimeToVisit: 'November to February (Cooler weather for cycling between ruins)',
    climate: 'Tropical dry; hot afternoons (32°C–36°C) and breezy river evenings (18°C–22°C)',
    entryFee: {
      indianNational: '₹40 (Vittala Temple & Zenana Enclosure)',
      foreignNational: '₹600',
    },
    typicalDailyCostEstimate: {
      budget: '₹1,600 – ₹2,400 / day',
      standard: '₹4,800 – ₹7,500 / day',
      luxury: '₹18,000 – ₹36,000 / day',
    },
    keyAttractions: ['Vittala Temple & Stone Chariot', 'Virupaksha Temple', 'Lotus Mahal & Elephant Stables', 'Matanga Hill Sunrise', 'Hemakuta Hill Sunset'],
    localCuisine: ['North Karnataka Jolada Rotti', 'Ennegai (stuffed brinjal)', 'Filter Coffee', 'Banana Flower Curry'],
    howToReach: {
      nearestAirport: 'Jindal Vidyanagar Airport (VDY, 35 km) or Hubballi Airport (HBX, 145 km)',
      nearestRailway: 'Hosapete Junction (HPT, 13 km from Hampi)',
      roadConnectivity: 'Well connected via NH 50 and NH 67 from Bengaluru (6.5 hrs) and Goa (7 hrs)',
    },
    insiderTip: 'Rent a bicycle or electric scooter to explore the Royal Enclosure and Sacred Center. Hike up Matanga Hill before dawn for a 360-degree sunrise over the boulder valleys.',
    culturalEtiquette: 'Virupaksha Temple is an active sacred shrine; remove footwear at the main gopuram entrance.',
    nearbyPlaces: [
      {
        id: 'hampi-vittala',
        name: 'Vittala Temple & Iconic Stone Chariot',
        category: 'heritage',
        subType: 'UNESCO Monument Complex',
        rating: 4.9,
        reviewCount: 38000,
        distance: '2.8 km E of Hampi Bazaar',
        lat: 15.3389,
        lng: 76.4797,
        description: '16th-century temple complex celebrated for the monolithic Garuda Stone Chariot and 56 musical stone pillars.',
        priceOrFee: '₹40 (Indian) / ₹600 (Foreign)',
        timingOrHours: '08:30 AM – 05:30 PM',
        address: 'Hampi Historical Site, Bellary District, Karnataka 583239',
        popularFor: ['Stone Chariot', 'Musical Pillars', 'Kalyana Mandapa'],
      },
      {
        id: 'hampi-stay-evolve-back',
        name: 'Evolve Back, Kamalapura Palace',
        category: 'stay',
        subType: '5-Star Vijayanagara Palatial Resort',
        rating: 4.9,
        reviewCount: 2900,
        distance: '6.5 km from Hampi Ruins',
        lat: 15.3000,
        lng: 76.4500,
        description: 'Modeled after the 14th-century Vijayanagara palaces, featuring stone arches, private plunge pools, and historian-led trails.',
        priceOrFee: '₹32,000 – ₹65,000 / night',
        timingOrHours: 'Check-in: 2:00 PM',
        address: 'Kamalapura, Hosapete, Karnataka 583221',
        popularFor: ['Royal Palace Suites', 'Historian Guides', 'Ayurvedic Spa'],
        externalBookingUrl: 'https://www.google.com/travel/hotels/s/evolve-back-hampi',
      }
    ],
    reviews: [
      {
        id: 'h-rev-1',
        author: 'Siddharth Rao (Hyderabad)',
        rating: 5,
        date: 'January 2026',
        text: 'Hampi feels like stepping onto another planet. Sunrise from Matanga Hill overlooking the boulder valleys and the Tungabhadra River is the greatest sunrise in India.',
        tags: ['Matanga Sunrise', 'Bicycle Touring', 'Stone Chariot'],
      }
    ]
  },

  // 7. LEH-LADAKH
  {
    id: 'ladakh-leh',
    name: 'Leh-Ladakh',
    tagline: 'The Land of High Mountain Passes & Buddhist Sanctuaries',
    state: 'Ladakh',
    region: 'north',
    category: 'nature',
    isUnesco: false,
    rating: 4.9,
    totalReviewsCount: 72100,
    recommendedDuration: '5 to 7 Days',
    lat: 34.1526,
    lng: 77.5771,
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A breathtaking high-altitude trans-Himalayan realm framed by the Karakoram and Zanskar ranges, dotted with cliffside Tibetan Buddhist monasteries, cobalt alpine lakes, and ancient Silk Route desert dunes.',
    historySummary: 'A crucial trading hub on the ancient Silk Route connecting India, Tibet, and Central Asia for over a millennium, ruled by the Buddhist Namgyal Dynasty from the 10th century onwards.',
    architecturalStyle: 'Tibetan Dzong architecture with thick whitewashed stone walls and timber balconies',
    bestTimeToVisit: 'May to September (High mountain passes open with clear blue skies)',
    climate: 'Cold desert climate; clear thin air, intense daytime sun (18°C–24°C) and chilly nights (4°C–10°C)',
    entryFee: {
      indianNational: 'Inner Line Permit ₹400 – ₹600',
      foreignNational: 'Protected Area Permit ₹600 – ₹800',
    },
    typicalDailyCostEstimate: {
      budget: '₹2,500 – ₹3,500 / day',
      standard: '₹6,500 – ₹10,500 / day',
      luxury: '₹24,000 – ₹48,000 / day',
    },
    keyAttractions: ['Pangong Tso Lake', 'Nubra Valley & Hunder Sand Dunes', 'Thiksey & Hemis Monasteries', 'Khardung La Pass (5,359m)', 'Shanti Stupa'],
    localCuisine: ['Thukpa Noodle Soup', 'Ladakhi Momos', 'Butter Tea (Gur Gur Chai)', 'Tingmo (Steamed Tibetan Bread)', 'Skyu pasta stew'],
    howToReach: {
      nearestAirport: 'Kushok Bakula Rimpochee Airport (IXL, Leh, 3.5 km from town)',
      nearestRailway: 'Jammu Tawi (700 km) — Direct domestic flights to Leh recommended',
      roadConnectivity: 'Manali-Leh Highway & Srinagar-Leh Highway (Open June to October)',
    },
    insiderTip: 'Allow 48 hours for altitude acclimatization in Leh town before traveling across Khardung La (5,359m) to Nubra or Pangong Lake.',
    culturalEtiquette: 'Always walk clockwise around Buddhist stupas (chortens), mani stones, and temple shrines.',
    nearbyPlaces: [
      {
        id: 'leh-thiksey',
        name: 'Thiksey Monastery',
        category: 'heritage',
        subType: '15th-Century Tibetan Buddhist Monastery',
        rating: 4.9,
        reviewCount: 22000,
        distance: '19 km SE of Leh',
        lat: 34.0583,
        lng: 77.6667,
        description: 'Twelve-story whitewashed complex resembling the Potala Palace of Lhasa, home to a 49-foot statue of Maitreya Buddha.',
        priceOrFee: '₹50 per visitor',
        timingOrHours: '07:00 AM – 06:00 PM',
        address: 'Thiksey, Leh, Ladakh 194201',
        popularFor: ['Maitreya Buddha', 'Morning Chanting', 'Panoramic Indus Valley Views'],
      },
      {
        id: 'leh-stay-grand-dragon',
        name: 'The Grand Dragon Ladakh',
        category: 'stay',
        subType: '5-Star Luxury Eco-Friendly Hotel',
        rating: 4.8,
        reviewCount: 3100,
        distance: '1.2 km from Leh Center',
        lat: 34.1600,
        lng: 77.5800,
        description: 'Solar-powered premier luxury hotel with oxygen-equipped rooms and stunning views of the Stok Kangri mountain range.',
        priceOrFee: '₹18,000 – ₹38,000 / night',
        timingOrHours: 'Check-in: 12:00 PM',
        address: 'Old Road, Sheynam, Leh, Ladakh 194101',
        popularFor: ['Oxygen-Fitted Rooms', 'Stok Range Views', 'Solar Heated'],
        externalBookingUrl: 'https://www.google.com/travel/hotels/s/grand-dragon-ladakh',
      }
    ],
    reviews: [
      {
        id: 'l-rev-1',
        author: 'Tenzin & Natasha (Mumbai)',
        rating: 5,
        date: 'July 2026',
        text: 'The colors of Pangong Tso change right before your eyes from cyan to deep sapphire. The morning prayer chants at Thiksey Monastery at 7 AM were profoundly peaceful.',
        tags: ['Pangong Tso', 'Thiksey Morning Chants', 'Altitude Acclimatization'],
      }
    ]
  },

  // 8. GOA
  {
    id: 'goa-heritage',
    name: 'Goa',
    tagline: 'Portuguese Baroque Churches, Latin Quarters & Arabian Sea Coast',
    state: 'Goa',
    region: 'west',
    category: 'coastal',
    isUnesco: true,
    unescoYear: 1986,
    rating: 4.8,
    totalReviewsCount: 84600,
    recommendedDuration: '3 to 5 Days',
    lat: 15.4909,
    lng: 73.8278,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A coastal confluence of 450 years of Portuguese heritage in Old Goa (Velha Goa), colorful tiled mansions in Fontainhas, and palm-lined golden sand beaches.',
    historySummary: 'The maritime headquarters of the Portuguese Estado da Índia from 1510 to 1961, creating a distinctive architectural and culinary fusion of Europe and the Konkan coast.',
    architecturalStyle: 'Manueline, Baroque, and Indo-Portuguese Catholic Architecture',
    bestTimeToVisit: 'November to February',
    climate: 'Tropical coastal; warm sunny afternoons (28°C–32°C) and cool sea breezes',
    entryFee: {
      indianNational: 'Free (Basilicas & Beaches)',
      foreignNational: 'Free',
    },
    typicalDailyCostEstimate: {
      budget: '₹2,000 – ₹3,000 / day',
      standard: '₹6,000 – ₹9,500 / day',
      luxury: '₹22,000 – ₹45,000 / day',
    },
    keyAttractions: ['Basilica of Bom Jesus', 'Se Cathedral', 'Fontainhas Latin Quarter', 'Fort Aguada', 'Dudhsagar Waterfalls'],
    localCuisine: ['Goan Fish Curry (Xitt Codi)', 'Pork/Mushroom Vindaloo', 'Bebinca Layer Cake', 'Poi Bread with Chorizo'],
    howToReach: {
      nearestAirport: 'Manohar International Airport Mopa (GOX) / Dabolim Airport (GOI, 28 km)',
      nearestRailway: 'Madgaon Junction (MAO) / Thivim (THVM) connected with Vande Bharat from Mumbai',
      roadConnectivity: 'NH 66 connecting Mumbai, Pune, and Bengaluru',
    },
    insiderTip: 'Explore Fontainhas Latin Quarter on foot in the morning to photograph Portuguese azulejo tile plaques and pastel yellow balconies.',
    culturalEtiquette: 'Remove beachwear before entering historical churches in Old Goa; maintain decorum at the tomb of St. Francis Xavier.',
    nearbyPlaces: [
      {
        id: 'goa-bom-jesus',
        name: 'Basilica of Bom Jesus',
        category: 'heritage',
        subType: 'UNESCO World Heritage Baroque Basilica',
        rating: 4.8,
        reviewCount: 46000,
        distance: '9.5 km E of Panaji',
        lat: 15.5009,
        lng: 73.9116,
        description: '16th-century unplastered red laterite basilica holding the sacred mortal remains of St. Francis Xavier.',
        priceOrFee: 'Free Entry',
        timingOrHours: '09:00 AM – 06:30 PM (Sunday 10:30 AM – 06:30 PM)',
        address: 'Old Goa Rd, Velha Goa, Goa 403402',
        popularFor: ['St. Francis Xavier Relics', 'Baroque Architecture', 'Laterite Facade'],
      },
      {
        id: 'goa-stay-taj-aguada',
        name: 'Taj Fort Aguada Resort & Spa',
        category: 'stay',
        subType: '5-Star Luxury Coastal Heritage Resort',
        rating: 4.8,
        reviewCount: 4100,
        distance: 'Sinquerim Beach / Fort Aguada',
        lat: 15.4940,
        lng: 73.7700,
        description: 'Built into the ramparts of a 16th-century Portuguese fortress with sweeping Arabian Sea panoramas.',
        priceOrFee: '₹24,000 – ₹55,000 / night',
        timingOrHours: 'Check-in: 2:00 PM',
        address: 'Sinquerim, Candolim, Goa 403515',
        popularFor: ['Fort Ramparts', 'Sea Views', 'Jiva Spa'],
        externalBookingUrl: 'https://www.google.com/travel/hotels/s/taj-fort-aguada',
      }
    ],
    reviews: [
      {
        id: 'goa-rev-1',
        author: 'Carlos & Sunita (Goa)',
        rating: 5,
        date: 'February 2026',
        text: 'Old Goa churches transport you straight to 16th-century Europe. The Latin quarter walk in Fontainhas followed by Kokum fish curry in Panaji was perfection.',
        tags: ['Old Goa Basilicas', 'Fontainhas', 'Goan Fish Curry'],
      }
    ]
  },

  // 9. ODISHA (KONARK & PURI)
  {
    id: 'konark-puri-odisha',
    name: 'Konark & Puri',
    tagline: 'The Monumental Sun Chariot & Sacred Bay of Bengal Shore',
    state: 'Odisha',
    region: 'east',
    category: 'heritage',
    isUnesco: true,
    unescoYear: 1984,
    rating: 4.8,
    totalReviewsCount: 52000,
    recommendedDuration: '2 to 3 Days',
    lat: 19.8876,
    lng: 86.0945,
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Conceived as a colossal stone chariot of the Sun God Surya with 24 carved sundial wheels, Konark stands alongside Puri’s sacred Jagannath Temple on the golden sand coast of the Bay of Bengal.',
    historySummary: 'Commissioned circa 1250 CE by King Narasimhadeva I of the Eastern Ganga Dynasty, representing the zenith of Kalinga stone engineering and maritime trade.',
    architecturalStyle: 'Kalinga Architecture with Rekha and Pidha Deula spires and astronomical stone wheels',
    bestTimeToVisit: 'November to February (Konark Dance Festival in December)',
    climate: 'Coastal temperate with cooling maritime breezes',
    entryFee: {
      indianNational: '₹40',
      foreignNational: '₹600',
    },
    typicalDailyCostEstimate: {
      budget: '₹1,500 – ₹2,200 / day',
      standard: '₹4,500 – ₹7,000 / day',
      luxury: '₹15,000 – ₹28,000 / day',
    },
    keyAttractions: ['Konark Sun Temple (24 Sundial Wheels)', 'Jagannath Temple Puri', 'Chandrabhaga Golden Sand Beach', 'Pipili Applique Artisan Village', 'Chilika Lake Dolphin Sanctuary'],
    localCuisine: ['Chhena Poda (Caramelized cottage cheese cake)', 'Pakhala Bhata', 'Macha Ghanta (Fish curry)', 'Pahala Rasagola', 'Khaja sweet'],
    howToReach: {
      nearestAirport: 'Biju Patnaik International Airport (BBI, Bhubaneswar, 65 km)',
      nearestRailway: 'Puri Railway Station (35 km) or Bhubaneswar Railway Station (Vande Bharat connected)',
      roadConnectivity: 'Marine Drive Highway from Puri offers a stunning coastal scenic drive',
    },
    insiderTip: 'The 24 wheels of Konark Sun Temple are functioning astronomical sundials; examine the shadow cast on spoke beads to tell exact solar time.',
    culturalEtiquette: 'Do not climb or touch sensitive stone reliefs; remove shoes before entering the temple compound.',
    nearbyPlaces: [
      {
        id: 'odisha-konark-temple',
        name: 'Konark Sun Temple (Black Pagoda)',
        category: 'heritage',
        subType: 'UNESCO World Heritage Sun Chariot',
        rating: 4.9,
        reviewCount: 38000,
        distance: '0.0 km (Konark)',
        lat: 19.8876,
        lng: 86.0945,
        description: 'Colossal 13th-century stone chariot pulled by 7 galloping stone horses with 24 intricate sundial wheels.',
        priceOrFee: '₹40 (Indian) / ₹600 (Foreign)',
        timingOrHours: '06:00 AM – 08:00 PM',
        address: 'Konark, Puri District, Odisha 752111',
        popularFor: ['24 Sundials', 'Natya Mandap', 'Kalinga Stone Carving'],
      }
    ],
    reviews: [
      {
        id: 'od-rev-1',
        author: 'Debasish Patnaik (Bhubaneswar)',
        rating: 5,
        date: 'January 2026',
        text: 'Standing in front of the Konark stone wheels at sunrise is breathtaking. The Marine Drive road from Puri is smooth and scenic. Savor fresh Chhena Poda on the way.',
        tags: ['Konark Sun Temple', 'Marine Drive', 'Chhena Poda'],
      }
    ]
  },

  // 10. AMRITSAR
  {
    id: 'amritsar-golden-temple',
    name: 'Amritsar',
    tagline: 'The Sacred Golden Sanctuary & Epicenter of Community Hospitality',
    state: 'Punjab',
    region: 'north',
    category: 'spiritual',
    isUnesco: false,
    rating: 4.9,
    totalReviewsCount: 92400,
    recommendedDuration: '2 to 3 Days',
    lat: 31.6200,
    lng: 74.8765,
    imageUrl: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Centering upon Sri Harmandir Sahib (The Golden Temple) surrounded by the sacred Amrit Sarovar lake, Amritsar serves over 100,000 free hot meals daily in the world’s largest community kitchen.',
    historySummary: 'Founded in 1577 by the fourth Sikh Guru, Guru Ram Das, the sanctum was gilded with 750 kg of pure gold foil by Maharaja Ranjit Singh in 1830.',
    architecturalStyle: 'Sikh Architecture with marble inlays, gold gilded cupolas, and four open doors welcoming all humanity',
    bestTimeToVisit: 'October to March',
    climate: 'Continental, brisk sunny winter days and festive evenings',
    entryFee: {
      indianNational: 'Free entry for all people across all faith traditions',
      foreignNational: 'Free entry',
    },
    typicalDailyCostEstimate: {
      budget: '₹1,400 – ₹2,200 / day',
      standard: '₹4,500 – ₹6,800 / day',
      luxury: '₹14,000 – ₹28,000 / day',
    },
    keyAttractions: ['Sri Harmandir Sahib (Golden Temple)', 'Jallianwala Bagh Memorial', 'Wagah Border Beating Retreat Ceremony', 'Partition Museum', 'Gobindgarh Fort'],
    localCuisine: ['Amritsari Kulcha with Chole', 'Langar Daal & Kheer', 'Sweet Malai Lassi', 'Pinni dessert', 'Amritsari Machhi'],
    howToReach: {
      nearestAirport: 'Sri Guru Ram Dass Jee International Airport (ATQ, 11 km)',
      nearestRailway: 'Amritsar Junction (ASR) with frequent Shatabdi & Vande Bharat links',
      roadConnectivity: 'Grand Trunk Road (NH 1 / NH 44) direct from New Delhi',
    },
    insiderTip: 'Volunteer in the Langar kitchen (rolling chapatis or serving dal) for a deeply moving spiritual and community experience.',
    culturalEtiquette: 'Head must be covered at all times (scarves available at entry), remove shoes, and wash feet in the shallow running water channel before entering.',
    nearbyPlaces: [
      {
        id: 'amritsar-golden-sanctum',
        name: 'Sri Harmandir Sahib (Golden Temple)',
        category: 'heritage',
        subType: 'Spiritual Center of Sikhism',
        rating: 5.0,
        reviewCount: 95000,
        distance: '0.0 km (Center)',
        lat: 31.6200,
        lng: 74.8765,
        description: 'Sacred golden sanctum set amidst the Amrit Sarovar water body, home to the 24/7 Guru Ka Langar community kitchen.',
        priceOrFee: 'Free Entry for All',
        timingOrHours: 'Open 24/7',
        address: 'Golden Temple Rd, Atta Mandi, Amritsar, Punjab 143006',
        popularFor: ['Golden Dome', 'Langar Seva', 'Amrit Sarovar', 'Gurbani Kirtan'],
      }
    ],
    reviews: [
      {
        id: 'amr-rev-1',
        author: 'Jaspreet Singh (Chandigarh)',
        rating: 5,
        date: 'January 2026',
        text: 'The peaceful atmosphere at the Golden Temple at night with reflections on the water is beyond words. Eating hot Amritsari Kulcha at Bhai Kulwant Singh in the morning is pure heaven.',
        tags: ['Golden Temple Night', 'Langar', 'Amritsari Kulcha'],
      }
    ]
  }
];
