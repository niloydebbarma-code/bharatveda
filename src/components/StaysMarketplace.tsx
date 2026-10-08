import { useState, useEffect, useTransition, useId } from 'react';
import {
  Building,
  Search,
  Star,
  MapPin,
  ShieldCheck,
  Filter,
  ArrowUpDown,
  Loader2,
  ChevronDown,
  Layers,
  X,
  AlertCircle
} from 'lucide-react';
import { HotelProperty, RoomOption, HotelBookingConfirmation, NearbyPlace } from '../types';
import { api } from '../services/api';
import { InteractiveMap } from './InteractiveMap';
import { HotelBookingModal } from './HotelBookingModal';
import { HotelComparisonModal } from './HotelComparisonModal';
import { useBookmarks } from '../context/BookmarkContext';
import { useLanguage } from '../context/LanguageContext';

interface StaysMarketplaceProps {
  activeCity?: string;
  onAddStayToItinerary?: (hotel: HotelProperty, confirmation: HotelBookingConfirmation) => void;
}

export function StaysMarketplace({ activeCity, onAddStayToItinerary }: StaysMarketplaceProps) {
  const { t } = useLanguage();
  // Search state
  const [selectedCity, setSelectedCity] = useState<string>(activeCity || 'Agra');
  const [checkInDate, setCheckInDate] = useState<string>(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [checkOutDate, setCheckOutDate] = useState<string>(
    new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [roomsCount, setRoomsCount] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (activeCity) {
      setSelectedCity(activeCity);
    }
  }, [activeCity]);

  // Filter state
  const [propertyType, setPropertyType] = useState<string>('all');
  const [minStarRating, setMinStarRating] = useState<string>('');
  const [minReviewScore, setMinReviewScore] = useState<string>('');
  const [freeCancellationOnly, setFreeCancellationOnly] = useState<boolean>(false);
  const [breakfastIncludedOnly, setBreakfastIncludedOnly] = useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recommended');

  // Data & loading
  const [hotels, setHotels] = useState<HotelProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Active Hotel & Modals
  const [selectedHotelForDetails, setSelectedHotelForDetails] = useState<HotelProperty | null>(null);
  const [bookingHotel, setBookingHotel] = useState<HotelProperty | null>(null);
  const [bookingRoom, setBookingRoom] = useState<RoomOption | null>(null);

  // Comparison State
  const [comparedHotelIds, setComparedHotelIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState<boolean>(false);

  const [, startTransition] = useTransition();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const citySelectId = useId();
  const sortSelectId = useId();

  const destinationCities = [
    { label: 'Agra, Uttar Pradesh', value: 'Agra', destId: 'agra-taj-mahal' },
    { label: 'Jaipur, Rajasthan', value: 'Jaipur', destId: 'jaipur-pink-city' },
    { label: 'Varanasi, Uttar Pradesh', value: 'Varanasi', destId: 'varanasi-kashi' },
    { label: 'Kerala Backwaters & Kumarakom', value: 'Kumarakom', destId: 'kerala-backwaters-alappuzha' },
    { label: 'Hampi, Karnataka', value: 'Hampi', destId: 'hampi-vijayanagara' },
    { label: 'Leh-Ladakh', value: 'Leh', destId: 'ladakh-leh' },
  ];

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.searchHotels({
        city: selectedCity,
        search: searchTerm,
        propertyType,
        minStarRating,
        minReviewScore,
        freeCancellationOnly,
        breakfastIncludedOnly,
        facility: selectedFacility,
        sortBy,
      });
      setHotels(res.hotels);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search accommodations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        fetchHotels();
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [
    selectedCity,
    searchTerm,
    propertyType,
    minStarRating,
    minReviewScore,
    freeCancellationOnly,
    breakfastIncludedOnly,
    selectedFacility,
    sortBy,
  ]);

  const handleSearchClick = () => {
    fetchHotels();
    const el = document.getElementById('stays-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleCompare = (hotelId: string) => {
    if (comparedHotelIds.includes(hotelId)) {
      setComparedHotelIds(comparedHotelIds.filter((id) => id !== hotelId));
    } else {
      if (comparedHotelIds.length < 3) {
        setComparedHotelIds([...comparedHotelIds, hotelId]);
      }
    }
  };

  // Convert hotels into NearbyPlace format for the Leaflet Map
  const mapPlaces: NearbyPlace[] = hotels.map((h) => ({
    id: h.id,
    name: h.name,
    category: 'stay',
    subType: `${h.starRating}★ ${h.propertyType.toUpperCase()} • ₹${h.rooms[0]?.pricePerNightINR.toLocaleString('en-IN')}`,
    rating: h.reviewScore,
    reviewCount: h.reviewsCount,
    distance: h.landmarkDistance,
    lat: h.lat,
    lng: h.lng,
    description: h.description,
    priceOrFee: `From ₹${h.rooms[0]?.pricePerNightINR.toLocaleString('en-IN')}/night`,
    timingOrHours: 'Check-in: 2:00 PM • Check-out: 12:00 PM',
    address: h.address,
    popularFor: h.highlights.slice(0, 3),
  }));

  const mapCenter: [number, number] =
    hotels.length > 0 ? [hotels[0].lat, hotels[0].lng] : [27.1767, 78.0081];

  const comparedHotels = hotels.filter((h: HotelProperty) => comparedHotelIds.includes(h.id));

  return (
    <section id="stays" className="py-20 bg-background border-b border-border">
      <div className="container-custom">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Building className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Verified Stays Marketplace</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight mb-4">
            {t('section.staysTitle')}
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-sans">
            {t('section.staysSubtitle')}
          </p>
        </div>

        {/* Master Search Bar (Booking.com style) */}
        <div className="bg-surface rounded-3xl p-6 sm:p-7 border border-border shadow-lg mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Destination / City */}
            <div className="md:col-span-4">
              <label htmlFor={citySelectId} className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                Where are you going?
              </label>
              <div className="relative">
                <select
                  id={citySelectId}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-2xl text-foreground text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  {destinationCities.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-foreground/40 absolute right-4 top-3.5 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* Check-in & Check-out Dates */}
            <div className="md:col-span-4 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Check-in
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-3 bg-background border border-border rounded-2xl text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Check-out
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-3 bg-background border border-border rounded-2xl text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Guests & Rooms */}
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Guests & Rooms
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={adultsCount}
                    onChange={(e) => setAdultsCount(parseInt(e.target.value, 10))}
                    className="w-1/2 px-3 py-3 bg-background border border-border rounded-2xl text-foreground text-xs font-bold focus:ring-2 focus:ring-primary"
                  >
                    {[1, 2, 3, 4, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>

                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(parseInt(e.target.value, 10))}
                    className="w-1/2 px-3 py-3 bg-background border border-border rounded-2xl text-foreground text-xs font-bold focus:ring-2 focus:ring-primary"
                  >
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n} Room{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleSearchClick}
                  className="px-6 py-3.5 rounded-2xl bg-primary text-surface font-heading font-bold text-sm hover:bg-primary-dark transition-all duration-200 shadow-md flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                  <span>Search</span>
                </button>
              </div>
            </div>

          </div>

          {/* Search Input Bar */}
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40">
                <Search className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Search hotel name, landmark or area (e.g. Amarvilas, Near Taj Mahal, Rambagh)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {selectedFacility && (
              <button
                type="button"
                onClick={() => setSelectedFacility('')}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Clear Facility Filter
              </button>
            )}
          </div>

          {/* Quick Filters Pill Bar */}
          <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-foreground/60 uppercase text-[11px] mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Filters:</span>
              </span>

              {/* Property Type Pills */}
              {[
                { id: 'all', label: t('stays.allStays', 'All Stays') },
                { id: 'palace', label: t('stays.palaces', 'Royal Palaces') },
                { id: 'resort', label: t('stays.resorts', 'Resorts') },
                { id: 'hotel', label: t('stays.hotels', 'Boutique Hotels') },
                { id: 'hostel', label: t('stays.hostels', 'Hostels') },
              ].map((pt) => (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => setPropertyType(pt.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    propertyType === pt.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-background hover:bg-border/40 text-foreground/80 border border-border'
                  }`}
                >
                  {pt.label}
                </button>
              ))}

              {/* Free Cancellation Toggle */}
              <button
                type="button"
                onClick={() => setFreeCancellationOnly(!freeCancellationOnly)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  freeCancellationOnly
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-background hover:bg-border/40 text-foreground/80 border border-border'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('label.freeCancellation', 'Free Cancellation')}</span>
              </button>

              {/* Breakfast Included Toggle */}
              <button
                type="button"
                onClick={() => setBreakfastIncludedOnly(!breakfastIncludedOnly)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  breakfastIncludedOnly
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-background hover:bg-border/40 text-foreground/80 border border-border'
                }`}
              >
                ✓ {t('label.breakfastIncluded', 'Breakfast Included')}
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor={sortSelectId} className="text-foreground/60 font-semibold flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span>Sort by:</span>
              </label>
              <select
                id={sortSelectId}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background border border-border rounded-xl px-3 py-1.5 text-foreground text-xs font-bold focus:ring-2 focus:ring-primary cursor-pointer"
              >
                <option value="recommended">Recommended (Top Reviews)</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Guest Rating (9+ first)</option>
                <option value="distance">Distance to Landmark</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Comparison Trigger */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="text-sm font-medium text-foreground/70">
            Found <span className="font-bold text-primary">{hotels.length}</span> verified properties in{' '}
            <strong>{selectedCity}</strong>
          </div>

          {comparedHotelIds.length > 0 && (
            <button
              type="button"
              onClick={() => setCompareModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-accent text-surface text-xs font-bold hover:bg-accent-hover transition-colors shadow-sm flex items-center gap-2 animate-bounce"
            >
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>Compare {comparedHotelIds.length} Hotels Side-by-Side</span>
            </button>
          )}
        </div>

        {/* Main Dual-View: Hotel List on Left + Map on Right */}
        <div id="stays-results" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-24">
          
          {/* Left Column: Hotels List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {error && (
              <div className="p-4 rounded-2xl bg-accent/10 border border-accent text-accent text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {loading && (
              <div className="p-12 text-center bg-surface rounded-2xl border border-border space-y-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" aria-hidden="true" />
                <p className="text-sm font-semibold text-foreground/70">Searching available stays and rooms...</p>
              </div>
            )}

            {!loading && hotels.length === 0 && (
              <div className="p-12 text-center bg-surface rounded-2xl border border-border space-y-3">
                <Building className="w-12 h-12 text-primary/40 mx-auto" aria-hidden="true" />
                <h3 className="font-heading font-bold text-lg text-foreground">No Stays Match Your Filters</h3>
                <p className="text-xs sm:text-sm text-foreground/60 max-w-sm mx-auto">
                  Try clearing specific filter toggles or changing your destination city.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPropertyType('all');
                    setFreeCancellationOnly(false);
                    setBreakfastIncludedOnly(false);
                    setMinStarRating('');
                    setMinReviewScore('');
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-surface text-xs font-bold hover:bg-primary-dark"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {!loading &&
              hotels.map((hotel) => {
                const isCompared = comparedHotelIds.includes(hotel.id);
                const isSaved = isBookmarked(hotel.id);
                const startingRoom = hotel.rooms[0];

                return (
                  <div
                    key={hotel.id}
                    className="bg-surface rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between"
                  >
                    {/* Hotel Image (MD: 40% width) */}
                    <div className="md:w-5/12 relative h-52 md:h-auto overflow-hidden bg-foreground/10 flex-shrink-0">
                      <img
                        src={hotel.heroImage}
                        alt={hotel.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';
                        }}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        <span className="px-2.5 py-0.5 rounded-lg bg-surface/90 backdrop-blur-xs text-foreground text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {hotel.propertyType}
                        </span>
                        {hotel.starRating === 5 && (
                          <span className="px-2 py-0.5 rounded-lg bg-accent text-surface text-[10px] font-bold">
                            5★ Luxury
                          </span>
                        )}
                      </div>

                      {/* Bookmark Button */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleBookmark({
                            id: hotel.id,
                            name: hotel.name,
                            category: 'stay',
                            subtitle: `${hotel.landmarkDistance} • From ₹${startingRoom?.pricePerNightINR.toLocaleString('en-IN')}/night`,
                            location: `${hotel.city}, ${hotel.state}`,
                            addedAt: new Date().toISOString(),
                          })
                        }
                        className="absolute top-3 right-3 p-2 rounded-xl bg-surface/90 hover:bg-surface text-foreground shadow-md transition-colors"
                        title={isSaved ? 'Remove from saved' : 'Save hotel'}
                      >
                        <Star className={`w-4 h-4 ${isSaved ? 'fill-accent text-accent' : 'text-foreground/70'}`} aria-hidden="true" />
                      </button>
                    </div>

                    {/* Hotel Info (MD: 60% width) */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title & Review Score */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div>
                            <h3 className="font-heading font-extrabold text-lg text-foreground hover:text-primary transition-colors cursor-pointer"
                              onClick={() => setSelectedHotelForDetails(hotel)}
                            >
                              {hotel.name}
                            </h3>
                            <div className="text-xs text-primary font-semibold flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                              <span>{hotel.landmarkDistance}</span>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-1.5 justify-end">
                              <span className="text-xs font-bold text-foreground">{hotel.reviewScoreWord}</span>
                              <span className="px-2.5 py-1 rounded-xl bg-primary text-white font-black text-xs shadow-xs">
                                {hotel.reviewScore}
                              </span>
                            </div>
                            <div className="text-[10px] text-foreground/60 mt-0.5">
                              {hotel.reviewsCount.toLocaleString('en-IN')} {t('stays.reviews', 'reviews')}
                            </div>
                          </div>
                        </div>

                        {/* Room Preview & Highlights */}
                        <div className="my-3 space-y-1 text-xs">
                          <div className="font-semibold text-foreground/90">
                            Room: <strong>{startingRoom?.name}</strong> ({startingRoom?.bedType})
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {startingRoom?.breakfastIncluded && (
                              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-semibold">
                                ✓ {t('label.breakfastIncluded', 'Breakfast Included')}
                              </span>
                            )}
                            {startingRoom?.freeCancellation && (
                              <span className="px-2 py-0.5 rounded bg-accent/15 text-accent text-[11px] font-semibold">
                                ✓ {t('label.freeCancellation', 'Free Cancellation')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Price & Action Row */}
                      <div className="pt-3 border-t border-border flex flex-wrap items-end justify-between gap-3">
                        <div className="min-w-[8.5rem]">
                          <div className="text-[11px] text-foreground/60">{t('stays.startingFrom', 'Starting from')}</div>
                          <div className="text-xl font-heading font-black text-primary whitespace-nowrap">
                            ₹{startingRoom?.pricePerNightINR.toLocaleString('en-IN')}{' '}
                            <span className="text-xs font-normal text-foreground/60">{t('label.perNight', '/ night')}</span>
                          </div>
                          <div className="text-[10px] text-foreground/50 whitespace-nowrap">+ ₹{Math.round((startingRoom?.pricePerNightINR || 0) * 0.12).toLocaleString('en-IN')} taxes & fees</div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Compare Checkbox */}
                          <label className="flex items-center gap-1 text-[11px] font-semibold text-foreground/70 cursor-pointer select-none bg-background px-2.5 py-2 rounded-xl border border-border hover:border-primary/50">
                            <input
                              type="checkbox"
                              checked={isCompared}
                              onChange={() => toggleCompare(hotel.id)}
                              className="w-3.5 h-3.5 text-primary rounded"
                            />
                            <span className="hidden sm:inline">{t('stays.compare', 'Compare')}</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedHotelForDetails(hotel);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-primary text-white font-heading font-bold text-xs hover:bg-primary-dark transition-colors shadow-sm whitespace-nowrap"
                          >
                            <span>{t('stays.seeRooms', 'See Rooms & Availability →')}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}

          </div>

          {/* Right Column: Interactive Leaflet Stays Map (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-surface rounded-3xl border border-border p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3 px-1">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Stays & Landmarks Map ({selectedCity})</span>
                </div>
                <span className="text-[11px] font-semibold text-foreground/60">
                  {hotels.length} Pins Available
                </span>
              </div>

              <InteractiveMap
                center={mapCenter}
                zoom={13}
                places={mapPlaces}
                selectedCategory="stay"
                onSelectCategory={() => {}}
                onPlaceClick={(place) => {
                  const h = hotels.find((item) => item.id === place.id);
                  if (h) setSelectedHotelForDetails(h);
                }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Hotel Detail & Room Selection Modal */}
      {selectedHotelForDetails && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-foreground/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedHotelForDetails(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden flex-shrink-0">
              <img
                src={selectedHotelForDetails.heroImage}
                alt={selectedHotelForDetails.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              
              <button
                type="button"
                onClick={() => setSelectedHotelForDetails(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-surface/80 hover:bg-surface text-foreground transition-all shadow-md"
              >
                <X className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-surface">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded bg-primary text-surface text-xs font-bold uppercase tracking-wider">
                    {selectedHotelForDetails.starRating}★ {selectedHotelForDetails.propertyType}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-accent text-surface text-xs font-bold">
                    ★ {selectedHotelForDetails.reviewScore} {selectedHotelForDetails.reviewScoreWord}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-surface">
                  {selectedHotelForDetails.name}
                </h2>
                <div className="text-xs text-surface/90 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  <span>{selectedHotelForDetails.address} ({selectedHotelForDetails.landmarkDistance})</span>
                </div>
              </div>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              
              {/* Category Scores Bar */}
              <div className="p-4 rounded-2xl bg-background border border-border">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-foreground mb-3">
                  Guest Rating Breakdown ({selectedHotelForDetails.reviewsCount.toLocaleString('en-IN')} reviews)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-foreground/70">Cleanliness:</span>{' '}
                    <strong className="text-primary">{selectedHotelForDetails.categoryScores.cleanliness} / 10</strong>
                  </div>
                  <div>
                    <span className="text-foreground/70">Location:</span>{' '}
                    <strong className="text-primary">{selectedHotelForDetails.categoryScores.location} / 10</strong>
                  </div>
                  <div>
                    <span className="text-foreground/70">Staff Service:</span>{' '}
                    <strong className="text-primary">{selectedHotelForDetails.categoryScores.staff} / 10</strong>
                  </div>
                  <div>
                    <span className="text-foreground/70">Comfort:</span>{' '}
                    <strong className="text-primary">{selectedHotelForDetails.categoryScores.comfort} / 10</strong>
                  </div>
                  <div>
                    <span className="text-foreground/70">Facilities:</span>{' '}
                    <strong className="text-primary">{selectedHotelForDetails.categoryScores.facilities} / 10</strong>
                  </div>
                  <div>
                    <span className="text-foreground/70">Value for Money:</span>{' '}
                    <strong className="text-primary">{selectedHotelForDetails.categoryScores.valueForMoney} / 10</strong>
                  </div>
                </div>
              </div>

              {/* Description & Highlights */}
              <div>
                <h4 className="font-heading font-bold text-sm text-foreground mb-2">About the Property</h4>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-3">
                  {selectedHotelForDetails.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedHotelForDetails.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-xs font-semibold">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Available Rooms List */}
              <div className="space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-foreground">
                  Available Room Options for {checkInDate} → {checkOutDate}
                </h3>

                <div className="space-y-4">
                  {selectedHotelForDetails.rooms.map((room) => (
                    <div
                      key={room.roomId}
                      className="p-5 rounded-2xl bg-background border border-border flex flex-col md:flex-row items-start justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-base text-foreground">
                            {room.name}
                          </h4>
                          <span className="text-xs font-semibold text-primary px-2 py-0.5 rounded bg-surface border border-border">
                            {room.sizeSqMeters} m²
                          </span>
                        </div>
                        <p className="text-xs text-foreground/70">{room.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/80 pt-1">
                          <span>🛏️ {room.bedType}</span>
                          <span>👥 Max {room.maxAdults} Adults</span>
                          {room.breakfastIncluded && <span className="text-primary font-bold">🍳 Breakfast Included</span>}
                          {room.freeCancellation && <span className="text-accent font-bold">🛡️ Free Cancellation</span>}
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {room.amenities.map((am, aIdx) => (
                            <span key={aIdx} className="text-[11px] text-foreground/60 bg-surface px-2 py-0.5 rounded border border-border/60">
                              • {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-border">
                        <div className="text-xs text-foreground/60">Price per night</div>
                        <div className="text-2xl font-heading font-black text-primary">
                          ₹{room.pricePerNightINR.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-foreground/50 mb-3">Includes GST & taxes</div>

                        <button
                          type="button"
                          onClick={() => {
                            setBookingHotel(selectedHotelForDetails);
                            setBookingRoom(room);
                            setSelectedHotelForDetails(null);
                          }}
                          className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-primary text-surface font-heading font-bold text-xs hover:bg-primary-dark transition-colors shadow-sm"
                        >
                          Reserve Room →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Booking Reservation Wizard Modal */}
      {bookingHotel && bookingRoom && (
        <HotelBookingModal
          hotel={bookingHotel}
          room={bookingRoom}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adultsCount={adultsCount}
          roomsCount={roomsCount}
          onClose={() => {
            setBookingHotel(null);
            setBookingRoom(null);
          }}
          onAddStayToItinerary={onAddStayToItinerary}
        />
      )}

      {/* Comparison Modal */}
      {compareModalOpen && (
        <HotelComparisonModal
          hotels={comparedHotels}
          onClose={() => setCompareModalOpen(false)}
          onSelectHotel={(h) => {
            setSelectedHotelForDetails(h);
            setCompareModalOpen(false);
          }}
          onRemoveFromCompare={(id) => {
            setComparedHotelIds(comparedHotelIds.filter((hId) => hId !== id));
          }}
        />
      )}

    </section>
  );
}
