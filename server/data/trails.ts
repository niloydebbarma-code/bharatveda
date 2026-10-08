export interface HeritageTrail {
  id: string;
  title: string;
  tagline: string;
  recommendedDuration: string;
  highlights: string[];
  routeStops: string[];
  description: string;
  idealTravelers: string;
  bestSeason: string;
  coverImage: string;
}

export const HERITAGE_TRAILS: HeritageTrail[] = [
  {
    id: 'golden-triangle-monuments',
    title: 'The Imperial Golden Triangle',
    tagline: 'Delhi, Agra & Jaipur: 1,000 Years of Dynastic Grandeur',
    recommendedDuration: '5 to 7 Days',
    highlights: [
      'Shah Jahan’s marble monument to love (Taj Mahal)',
      'The Rajput hill fortress of Amber and Sheesh Mahal',
      'The astronomical marvel of Jantar Mantar',
      'Old Delhi’s Red Fort & Jama Masjid'
    ],
    routeStops: ['New Delhi', 'Agra', 'Fatehpur Sikri', 'Jaipur'],
    description: 'India’s most celebrated cultural corridor connecting the Mughal monuments of Delhi and Agra with the regal Rajput palaces and vibrant bazaars of Jaipur.',
    idealTravelers: 'First-time visitors to India, history lovers, architectural photographers',
    bestSeason: 'October to March',
    coverImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'southern-dravidian-temple-odyssey',
    title: 'The Great Dravidian Temple Odyssey',
    tagline: 'Living Temples of Tamil Nadu & Karnataka Monoliths',
    recommendedDuration: '7 to 10 Days',
    highlights: [
      'The 14 polychrome gopurams of Meenakshi Amman Temple',
      'The 1,000-year-old Brihadisvara Chola Temple at Thanjavur',
      'The boulder ruins and musical stone pillars of Hampi',
      'Shore Temples and Pancha Rathas of Mahabalipuram'
    ],
    routeStops: ['Chennai', 'Mahabalipuram', 'Thanjavur', 'Madurai', 'Hampi'],
    description: 'Journey through centuries of towering stone architecture, classical Carnatic music, bronze metallurgy, and ancient spiritual rituals preserved intact for millennia.',
    idealTravelers: 'Art historians, spiritual seekers, cultural enthusiasts',
    bestSeason: 'November to February',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'spice-coast-backwater-tranquility',
    title: 'The Malabar Spice Coast & Backwaters',
    tagline: 'Emerald Waterways, Ayurvedic Wellness & Colonial Forts',
    recommendedDuration: '6 to 8 Days',
    highlights: [
      'Overnight eco-houseboat cruise on Alappuzha backwaters',
      'Centuries-old spice plantations in the misty Cardamom Hills of Munnar',
      'Chinese fishing nets and Kathakali classical dance in Fort Kochi',
      'Traditional Ayurvedic rejuvenation therapy sessions'
    ],
    routeStops: ['Kochi', 'Munnar', 'Thekkady (Periyar)', 'Alappuzha', 'Marari Beach'],
    description: 'A sensory immersion into South India’s spice trade history, lush tea slopes, serene palm-fringed lagoons, and indigenous wellness systems.',
    idealTravelers: 'Couples, wellness seekers, nature and wildlife photographers',
    bestSeason: 'September to March',
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'himalayan-silk-route-sanctuary',
    title: 'High Himalayan Monastic Circuit',
    tagline: 'Ancient Tibetan Sanctuaries, Cobalt Lakes & Silk Route Passes',
    recommendedDuration: '7 to 9 Days',
    highlights: [
      'Pangong Tso cobalt alpine lake at 4,225m altitude',
      'Cliffside Thiksey and Hemis Buddhist Monasteries',
      'Khardung La — one of the highest motorable mountain passes in the world',
      'Double-humped Bactrian camel safari on Nubra Valley dunes'
    ],
    routeStops: ['Leh', 'Shey & Thiksey', 'Nubra Valley (Hunder)', 'Pangong Tso', 'Alchi'],
    description: 'Ascend into the trans-Himalayan realm of prayer flags, sacred Buddhist chanting, ancient Silk Route caravans, and pristine celestial stargazing.',
    idealTravelers: 'Adventure travelers, landscape photographers, spiritual explorers',
    bestSeason: 'June to September',
    coverImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
  }
];
