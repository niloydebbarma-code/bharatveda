export interface RoomOption {
  roomId: string;
  name: string;
  description: string;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  sizeSqMeters: number;
  pricePerNightINR: number;
  originalPricePerNightINR?: number;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  cancellationDeadlineDays: number;
  amenities: string[];
  images: string[];
  availableUnitsCount: number;
}

export interface HotelCategoryScores {
  cleanliness: number;
  location: number;
  staff: number;
  comfort: number;
  facilities: number;
  valueForMoney: number;
}

export interface HotelProperty {
  id: string;
  slug: string;
  name: string;
  destinationId: string;
  city: string;
  state: string;
  address: string;
  lat: number;
  lng: number;
  propertyType: 'hotel' | 'resort' | 'palace' | 'hostel' | 'homestay' | 'heritage-haveli';
  starRating: 3 | 4 | 5;
  reviewScore: number;
  reviewScoreWord: 'Exceptional' | 'Superb' | 'Fabulous' | 'Very Good' | 'Good';
  reviewsCount: number;
  landmarkDistance: string;
  primaryLandmark: string;
  heroImage: string;
  galleryImages: string[];
  description: string;
  highlights: string[];
  facilities: string[];
  categoryScores: HotelCategoryScores;
  rooms: RoomOption[];
  cancellationSummary: string;
  paymentSummary: string;
  specialOfferBadge?: string;
}

export const HOTELS: HotelProperty[] = [
  // --- AGRA ---
  {
    id: 'agra-amarvilas',
    slug: 'the-oberoi-amarvilas-agra',
    name: 'The Oberoi Amarvilas',
    destinationId: 'agra-taj-mahal',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: 'Taj East Gate Road, Tajganj, Agra, Uttar Pradesh 282001',
    lat: 27.1685,
    lng: 78.0450,
    propertyType: 'palace',
    starRating: 5,
    reviewScore: 9.6,
    reviewScoreWord: 'Exceptional',
    reviewsCount: 3820,
    landmarkDistance: '0.6 km from Taj Mahal',
    primaryLandmark: 'Taj Mahal',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ranked among the world’s foremost luxury resorts, The Oberoi Amarvilas offers uninterrupted private views of the Taj Mahal from every room.',
    highlights: ['Uninterrupted Taj Views', 'Mughal Courtyards & Reflection Pools', 'Oberoi Spa', 'Private Electric Buggy'],
    facilities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant', 'ac', 'shuttle', 'gym', 'frontdesk24', 'bar', 'roomservice'],
    categoryScores: { cleanliness: 9.9, location: 9.9, staff: 9.8, comfort: 9.8, facilities: 9.7, valueForMoney: 8.9 },
    cancellationSummary: 'Free cancellation up to 48 hours before check-in date.',
    paymentSummary: 'No prepayment needed • Pay at the property',
    specialOfferBadge: 'Complimentary High Tea & Electric Buggy Transfer',
    rooms: [
      {
        roomId: 'amarvilas-premier-taj-view',
        name: 'Premier Room with Taj Mahal View',
        description: 'Teakwood flooring, hand-woven carpets, and large picture windows framing the Taj Mahal.',
        maxAdults: 2,
        maxChildren: 1,
        bedType: '1 King Bed',
        sizeSqMeters: 42,
        pricePerNightINR: 38500,
        originalPricePerNightINR: 44000,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationDeadlineDays: 2,
        amenities: ['Taj Mahal View Window', 'Marble Bathroom', 'High-Speed Wi-Fi', '24-Hour Butler Service'],
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 4,
      }
    ]
  },
  {
    id: 'agra-itc-mughal',
    slug: 'itc-mughal-resort-agra',
    name: 'ITC Mughal, A Luxury Collection Resort',
    destinationId: 'agra-taj-mahal',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: 'Fatehabad Road, Tajganj, Agra 282001',
    lat: 27.1610,
    lng: 78.0280,
    propertyType: 'resort',
    starRating: 5,
    reviewScore: 8.8,
    reviewScoreWord: 'Fabulous',
    reviewsCount: 5120,
    landmarkDistance: '2.4 km from Taj Mahal',
    primaryLandmark: 'Taj Mahal',
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'],
    description: 'Set over 23 acres of ornamental Mughal gardens, winner of the Aga Khan Award for Architecture.',
    highlights: ['Aga Khan Architecture Award', 'Kaya Kalp Spa', 'Peshawri Dining'],
    facilities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant', 'ac', 'gym', 'frontdesk24', 'bar'],
    categoryScores: { cleanliness: 9.1, location: 8.8, staff: 9.0, comfort: 9.0, facilities: 9.2, valueForMoney: 8.7 },
    cancellationSummary: 'Free cancellation up to 24 hours prior to arrival.',
    paymentSummary: 'Pay online or upon check-in.',
    rooms: [
      {
        roomId: 'itc-mughal-chamber',
        name: 'Mughal Chamber King',
        description: 'Spacious room overlooking landscaped orchards with refined timber furnishings.',
        maxAdults: 2,
        maxChildren: 1,
        bedType: '1 Large Double Bed',
        sizeSqMeters: 38,
        pricePerNightINR: 9800,
        originalPricePerNightINR: 11500,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationDeadlineDays: 1,
        amenities: ['Garden View', 'Deep Soaking Tub', 'High-Speed Wi-Fi'],
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 6,
      }
    ]
  },
  {
    id: 'agra-joeys-hostel',
    slug: 'joeys-hostel-agra',
    name: 'Joey\'s Hostel Agra',
    destinationId: 'agra-taj-mahal',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: '50 Taj Road, Tajganj, Agra 282001',
    lat: 27.1712,
    lng: 78.0415,
    propertyType: 'hostel',
    starRating: 3,
    reviewScore: 9.1,
    reviewScoreWord: 'Superb',
    reviewsCount: 3410,
    landmarkDistance: '0.3 km from Taj Mahal',
    primaryLandmark: 'Taj Mahal',
    heroImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'],
    description: 'Vibrant backpacker hub featuring a rooftop cafe with direct panoramic views of the Taj Mahal dome.',
    highlights: ['Rooftop Cafe with Taj Dome Views', '300m Walk to Taj Gate', 'Walking Tours'],
    facilities: ['wifi', 'breakfast', 'restaurant', 'ac', 'frontdesk24', 'laundry'],
    categoryScores: { cleanliness: 9.0, location: 9.8, staff: 9.6, comfort: 8.7, facilities: 8.6, valueForMoney: 9.7 },
    cancellationSummary: 'Free cancellation up to 24 hours before check-in.',
    paymentSummary: 'Pay on arrival via UPI or Cash.',
    rooms: [
      {
        roomId: 'joeys-mixed-dorm',
        name: 'Bed in 6-Bed Mixed AC Dormitory',
        description: 'Bunk bed with privacy curtain, individual charging socket, and electronic locker.',
        maxAdults: 1,
        maxChildren: 0,
        bedType: '1 Bunk Bed',
        sizeSqMeters: 25,
        pricePerNightINR: 750,
        originalPricePerNightINR: 900,
        breakfastIncluded: false,
        freeCancellation: true,
        cancellationDeadlineDays: 1,
        amenities: ['AC', 'Locker', 'Privacy Curtain', 'Wi-Fi'],
        images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 8,
      }
    ]
  },

  // --- JAIPUR ---
  {
    id: 'jaipur-rambagh',
    slug: 'rambagh-palace-jaipur',
    name: 'Rambagh Palace, Jaipur',
    destinationId: 'jaipur-pink-city',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Bhawani Singh Road, Jaipur 302005',
    lat: 26.8970,
    lng: 75.8080,
    propertyType: 'palace',
    starRating: 5,
    reviewScore: 9.8,
    reviewScoreWord: 'Exceptional',
    reviewsCount: 4200,
    landmarkDistance: '4.2 km from Hawa Mahal',
    primaryLandmark: 'City Center & Bazaars',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
    description: 'Former residence of the Maharaja of Jaipur, featuring 47 acres of tranquil gardens and royal marble architecture.',
    highlights: ['Maharaja Residence', 'Peacock Gardens', 'Jiva Grande Spa', 'Suvarna Mahal Fine Dining'],
    facilities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant', 'ac', 'gym', 'frontdesk24', 'bar', 'roomservice'],
    categoryScores: { cleanliness: 9.9, location: 9.6, staff: 9.9, comfort: 9.9, facilities: 9.8, valueForMoney: 9.0 },
    cancellationSummary: 'Free cancellation up to 48 hours prior to check-in date.',
    paymentSummary: 'Pay at property or online.',
    rooms: [
      {
        roomId: 'rambagh-palace-room',
        name: 'Palace Room with Garden Courtyard',
        description: 'Traditional Rajput architecture with high ceilings and Italian marble bathroom.',
        maxAdults: 2,
        maxChildren: 1,
        bedType: '1 King Bed',
        sizeSqMeters: 48,
        pricePerNightINR: 48000,
        originalPricePerNightINR: 56000,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationDeadlineDays: 2,
        amenities: ['Garden View', 'Marble Bath', 'Historian Palace Tour'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 3,
      }
    ]
  },
  {
    id: 'jaipur-zostel',
    slug: 'zostel-jaipur',
    name: 'Zostel Jaipur Heritage',
    destinationId: 'jaipur-pink-city',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'First Floor, Palace Road, Old Pink City, Jaipur 302002',
    lat: 26.9230,
    lng: 75.8340,
    propertyType: 'hostel',
    starRating: 3,
    reviewScore: 8.9,
    reviewScoreWord: 'Fabulous',
    reviewsCount: 3890,
    landmarkDistance: '0.8 km from Hawa Mahal',
    primaryLandmark: 'Hawa Mahal',
    heroImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'],
    description: 'Inside the historic walled Pink City, featuring Rajasthani jharokha lounges and curated heritage photo walks.',
    highlights: ['Walled City Location', 'Walking Distance to Bazaars', 'Fort Cycling Tours'],
    facilities: ['wifi', 'breakfast', 'restaurant', 'ac', 'frontdesk24', 'laundry'],
    categoryScores: { cleanliness: 8.9, location: 9.7, staff: 9.3, comfort: 8.8, facilities: 8.5, valueForMoney: 9.6 },
    cancellationSummary: 'Free cancellation up to 24 hours before check-in.',
    paymentSummary: 'Pay on arrival via UPI or Cash.',
    rooms: [
      {
        roomId: 'zostel-mixed-dorm',
        name: 'Bed in 6-Bed AC Dormitory',
        description: 'Air-conditioned bunk with personal locker and lamp.',
        maxAdults: 1,
        maxChildren: 0,
        bedType: '1 Bunk Bed',
        sizeSqMeters: 24,
        pricePerNightINR: 650,
        originalPricePerNightINR: 800,
        breakfastIncluded: false,
        freeCancellation: true,
        cancellationDeadlineDays: 1,
        amenities: ['AC', 'Locker', 'Free Wi-Fi', 'Hot Shower'],
        images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 10,
      }
    ]
  },

  // --- TAMIL NADU (MADURAI & CHENNAI) ---
  {
    id: 'tamilnadu-taj-coromandel',
    slug: 'taj-coromandel-chennai-tamilnadu',
    name: 'Taj Coromandel, Chennai',
    destinationId: 'madurai-chennai-tamilnadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '37, Mahatma Gandhi Rd, Nungambakkam, Chennai 600034',
    lat: 13.0600,
    lng: 80.2450,
    propertyType: 'hotel',
    starRating: 5,
    reviewScore: 9.4,
    reviewScoreWord: 'Superb',
    reviewsCount: 3950,
    landmarkDistance: '12 km from Chennai Central (MAS)',
    primaryLandmark: 'Chennai Heritage & Marina',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
    description: 'Iconic luxury hotel in Chennai blending South Indian temple design elements with European elegance, home to the award-winning Southern Spice restaurant.',
    highlights: ['Southern Spice Authentic Dining', 'Jiva Spa Treatments', 'Nungambakkam Central Location'],
    facilities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant', 'ac', 'gym', 'frontdesk24', 'bar', 'roomservice'],
    categoryScores: { cleanliness: 9.7, location: 9.5, staff: 9.6, comfort: 9.5, facilities: 9.4, valueForMoney: 9.0 },
    cancellationSummary: 'Free cancellation up to 24 hours before check-in date.',
    paymentSummary: 'Pay online or at property.',
    specialOfferBadge: 'Complimentary Traditional Filter Coffee Tasting',
    rooms: [
      {
        roomId: 'taj-luxury-room-chennai',
        name: 'Luxury Room with City View',
        description: 'Classic room with marble bathroom, high-speed Wi-Fi, and plush king bedding.',
        maxAdults: 2,
        maxChildren: 1,
        bedType: '1 King Bed',
        sizeSqMeters: 38,
        pricePerNightINR: 11500,
        originalPricePerNightINR: 13500,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationDeadlineDays: 1,
        amenities: ['City View', 'Marble Bath', 'High-Speed Wi-Fi', 'Breakfast Included'],
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 5,
      }
    ]
  },
  {
    id: 'tamilnadu-heritage-madurai',
    slug: 'heritage-madurai-resort',
    name: 'Heritage Madurai Resort',
    destinationId: 'madurai-chennai-tamilnadu',
    city: 'Madurai',
    state: 'Tamil Nadu',
    address: '11 Kochadai, Melakkal Main Rd, Madurai 625016',
    lat: 9.9350,
    lng: 78.0950,
    propertyType: 'resort',
    starRating: 5,
    reviewScore: 9.3,
    reviewScoreWord: 'Superb',
    reviewsCount: 3600,
    landmarkDistance: '3.5 km from Meenakshi Temple',
    primaryLandmark: 'Meenakshi Amman Temple',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
    description: 'Designed by legendary architect Geoffrey Bawa, featuring traditional Tamil stone courtyards, plunge pool villas, and ancient banyan trees.',
    highlights: ['Geoffrey Bawa Design', 'Temple Tank Style Swimming Pool', 'Private Plunge Pools'],
    facilities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant', 'ac', 'gym', 'frontdesk24', 'bar'],
    categoryScores: { cleanliness: 9.5, location: 9.2, staff: 9.4, comfort: 9.4, facilities: 9.3, valueForMoney: 9.1 },
    cancellationSummary: 'Free cancellation up to 48 hours prior to arrival.',
    paymentSummary: 'Pay at property or online.',
    rooms: [
      {
        roomId: 'madurai-bawa-villa',
        name: 'Deluxe Courtyard Villa',
        description: 'Traditional Tamil courtyard villa with private outdoor shower and shaded veranda.',
        maxAdults: 2,
        maxChildren: 1,
        bedType: '1 King Bed',
        sizeSqMeters: 45,
        pricePerNightINR: 8500,
        originalPricePerNightINR: 10500,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationDeadlineDays: 2,
        amenities: ['Private Veranda', 'Courtyard View', 'Open-Air Bath', 'Breakfast Included'],
        images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 4,
      }
    ]
  },

  // --- VARANASI ---
  {
    id: 'varanasi-brijrama',
    slug: 'brijrama-palace-varanasi',
    name: 'BrijRama Palace, Varanasi',
    destinationId: 'varanasi-kashi',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    address: 'Darbhanga Ghat, Dashashwamedh, Varanasi 221001',
    lat: 25.3080,
    lng: 83.0110,
    propertyType: 'palace',
    starRating: 5,
    reviewScore: 9.5,
    reviewScoreWord: 'Exceptional',
    reviewsCount: 3100,
    landmarkDistance: '0.2 km from Dashashwamedh Ghat',
    primaryLandmark: 'Dashashwamedh Ghat & Ganga Aarti',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
    description: 'An 18th-century Maratha stone fortress palace perched directly upon the sacred riverfront, accessed by private royal boat.',
    highlights: ['Riverside Maratha Palace', 'Private Boat Transfers', 'Live Sitar Recitals'],
    facilities: ['wifi', 'spa', 'breakfast', 'restaurant', 'ac', 'gym', 'frontdesk24', 'roomservice'],
    categoryScores: { cleanliness: 9.7, location: 9.9, staff: 9.6, comfort: 9.5, facilities: 9.4, valueForMoney: 8.9 },
    cancellationSummary: 'Free cancellation up to 48 hours before check-in.',
    paymentSummary: 'Pay at property or online.',
    rooms: [
      {
        roomId: 'brijrama-nadidhara',
        name: 'Nadidhara River View Room',
        description: 'Refined room with sweeping morning views of the river Ganga and historic stone ghats.',
        maxAdults: 2,
        maxChildren: 1,
        bedType: '1 King Bed',
        sizeSqMeters: 36,
        pricePerNightINR: 28000,
        originalPricePerNightINR: 32000,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationDeadlineDays: 2,
        amenities: ['Direct Ganga View', 'Private Boat Transfer Included', 'Pure Vegetarian Breakfast'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 3,
      }
    ]
  },

  // --- KERALA ---
  {
    id: 'kerala-kumarakom',
    slug: 'kumarakom-lake-resort-kerala',
    name: 'Kumarakom Lake Resort',
    destinationId: 'kerala-backwaters-alappuzha',
    city: 'Kumarakom',
    state: 'Kerala',
    address: 'Vembanad Lake, Kumarakom 686563',
    lat: 9.6175,
    lng: 76.4285,
    propertyType: 'resort',
    starRating: 5,
    reviewScore: 9.4,
    reviewScoreWord: 'Superb',
    reviewsCount: 3650,
    landmarkDistance: 'Directly on Vembanad Lake',
    primaryLandmark: 'Vembanad Backwaters',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
    description: 'Reconstructed 16th-century traditional ancestral wooden villas (Tharavadu) with a 250-meter meandering pool.',
    highlights: ['Meandering Pool Access', 'Ayurmana Ayurveda Sanctuary', 'Houseboat Cruises'],
    facilities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant', 'ac', 'gym', 'frontdesk24', 'bar'],
    categoryScores: { cleanliness: 9.6, location: 9.7, staff: 9.5, comfort: 9.6, facilities: 9.6, valueForMoney: 8.8 },
    cancellationSummary: 'Free cancellation up to 72 hours prior to arrival.',
    paymentSummary: 'Pay online or upon check-in.',
    rooms: [
      {
        roomId: 'kumarakom-pool-villa',
        name: 'Meandering Pool Villa',
        description: 'Heritage villa opening directly onto the shimmering 250-meter lagoon pool.',
        maxAdults: 2,
        maxChildren: 2,
        bedType: '1 King Bed',
        sizeSqMeters: 55,
        pricePerNightINR: 24500,
        originalPricePerNightINR: 29000,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationDeadlineDays: 3,
        amenities: ['Direct Pool Deck', 'Traditional Bath', 'Breakfast Included'],
        images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 4,
      }
    ]
  },

  // --- HAMPI ---
  {
    id: 'hampi-evolve-back',
    slug: 'evolve-back-kamalapura-palace-hampi',
    name: 'Evolve Back, Kamalapura Palace',
    destinationId: 'hampi-vijayanagara',
    city: 'Hampi',
    state: 'Karnataka',
    address: 'Kamalapura, Hosapete, Karnataka 583221',
    lat: 15.3000,
    lng: 76.4500,
    propertyType: 'palace',
    starRating: 5,
    reviewScore: 9.7,
    reviewScoreWord: 'Exceptional',
    reviewsCount: 2450,
    landmarkDistance: '4.5 km from Hampi Ruins',
    primaryLandmark: 'Vittala Temple & Stone Chariot',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
    description: 'Inspired by the 14th-century Vijayanagara imperial architecture with soaring arches and private plunge pools.',
    highlights: ['Vijayanagara Architecture', 'Private Jacuzzi & Plunge Pools', 'Historian-Guided Trails'],
    facilities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant', 'ac', 'gym', 'frontdesk24', 'bar'],
    categoryScores: { cleanliness: 9.9, location: 9.4, staff: 9.8, comfort: 9.8, facilities: 9.8, valueForMoney: 9.0 },
    cancellationSummary: 'Free cancellation up to 4 days before check-in.',
    paymentSummary: 'Pay online or at property.',
    rooms: [
      {
        roomId: 'evolve-back-nivasa',
        name: 'Nivasa Deluxe Palace Suite',
        description: 'Spacious suite with deep private jacuzzi on private sit-out terrace.',
        maxAdults: 2,
        maxChildren: 1,
        bedType: '1 Royal Four-Poster King Bed',
        sizeSqMeters: 62,
        pricePerNightINR: 32000,
        originalPricePerNightINR: 38000,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationDeadlineDays: 4,
        amenities: ['Private Jacuzzi Sit-Out', 'Living Area', 'Breakfast Included'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 3,
      }
    ]
  },

  // --- LEH LADAKH ---
  {
    id: 'leh-grand-dragon',
    slug: 'the-grand-dragon-ladakh-leh',
    name: 'The Grand Dragon Ladakh',
    destinationId: 'ladakh-leh',
    city: 'Leh',
    state: 'Ladakh',
    address: 'Old Road, Sheynam, Leh 194101',
    lat: 34.1600,
    lng: 77.5800,
    propertyType: 'hotel',
    starRating: 5,
    reviewScore: 9.3,
    reviewScoreWord: 'Superb',
    reviewsCount: 3120,
    landmarkDistance: '1.2 km from Leh Main Bazaar',
    primaryLandmark: 'Leh Palace & Shanti Stupa',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
    description: 'Premier eco-luxury hotel in Leh equipped with solar central heating and oxygen-fitted suites.',
    highlights: ['Oxygen-Fitted Rooms', 'Stok Kangri Mountain Panorama', 'Solar Floor Heating'],
    facilities: ['wifi', 'breakfast', 'restaurant', 'ac', 'gym', 'frontdesk24', 'shuttle', 'roomservice'],
    categoryScores: { cleanliness: 9.6, location: 9.4, staff: 9.7, comfort: 9.5, facilities: 9.3, valueForMoney: 8.9 },
    cancellationSummary: 'Free cancellation up to 48 hours prior to arrival.',
    paymentSummary: 'Pay at property or online.',
    rooms: [
      {
        roomId: 'grand-dragon-deluxe',
        name: 'Deluxe Heritage Mountain View Room',
        description: 'Centrally heated room with large bay window overlooking the snowbound Stok mountain range.',
        maxAdults: 2,
        maxChildren: 1,
        bedType: '1 King Bed',
        sizeSqMeters: 35,
        pricePerNightINR: 18500,
        originalPricePerNightINR: 22000,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationDeadlineDays: 2,
        amenities: ['Oxygen Port Access', 'Mountain View Window', 'Breakfast Included'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 5,
      }
    ]
  },

  // --- GOA ---
  {
    id: 'goa-taj-fort-aguada',
    slug: 'taj-fort-aguada-resort-goa',
    name: 'Taj Fort Aguada Resort & Spa',
    destinationId: 'goa-heritage',
    city: 'Goa',
    state: 'Goa',
    address: 'Sinquerim, Candolim, Goa 403515',
    lat: 15.4940,
    lng: 73.7700,
    propertyType: 'resort',
    starRating: 5,
    reviewScore: 9.4,
    reviewScoreWord: 'Superb',
    reviewsCount: 4120,
    landmarkDistance: '0.4 km from Fort Aguada',
    primaryLandmark: 'Fort Aguada & Coastal Ramparts',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
    description: 'Built directly into the historical Portuguese fortress ramparts overlooking the vast Arabian Sea.',
    highlights: ['16th-Century Portuguese Fort Ramparts', 'Direct Arabian Sea Access', 'Jiva Ayurveda Spa'],
    facilities: ['wifi', 'pool', 'spa', 'breakfast', 'restaurant', 'ac', 'gym', 'frontdesk24', 'bar'],
    categoryScores: { cleanliness: 9.6, location: 9.8, staff: 9.5, comfort: 9.5, facilities: 9.5, valueForMoney: 8.8 },
    cancellationSummary: 'Free cancellation up to 48 hours prior to arrival.',
    paymentSummary: 'Pay at property or online booking.',
    rooms: [
      {
        roomId: 'taj-aguada-sea-cottage',
        name: 'Aguada Sea View Heritage Cottage',
        description: 'Portuguese villa-style cottage with terracotta tiled roof and private garden sit-out facing the sea.',
        maxAdults: 2,
        maxChildren: 1,
        bedType: '1 King Bed',
        sizeSqMeters: 46,
        pricePerNightINR: 24000,
        originalPricePerNightINR: 28500,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationDeadlineDays: 2,
        amenities: ['Direct Sea View', 'Private Garden Sit-Out', 'Breakfast Included', 'Wi-Fi'],
        images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
        availableUnitsCount: 4,
      }
    ]
  }
];
