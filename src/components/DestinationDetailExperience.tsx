import { useState } from 'react';
import {
  MapPin,
  Compass,
  ShieldCheck,
  Star,
  Clock,
  ExternalLink,
  Utensils,
  Hotel,
  Train,
  HeartPulse,
  Lightbulb,
  AlertCircle,
  Bookmark
} from 'lucide-react';
import { Destination, NearbyPlace } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { TravelCostCalculator } from './TravelCostCalculator';
import { useBookmarks } from '../context/BookmarkContext';

interface DestinationDetailExperienceProps {
  destination: Destination;
  allDestinations: Destination[];
  onSelectDestination: (destId: string) => void;
  onPlanItinerary: (destId: string) => void;
  onOpenInquiry: (destinationName: string) => void;
  onBackToDirectory: () => void;
}

export function DestinationDetailExperience({
  destination,
  allDestinations,
  onSelectDestination,
  onPlanItinerary,
  onOpenInquiry,
  onBackToDirectory,
}: DestinationDetailExperienceProps) {
  const [mapCategory, setMapCategory] = useState<'all' | 'heritage' | 'food' | 'stay' | 'transport' | 'service'>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'nearby' | 'food' | 'stay' | 'services' | 'reviews'>('overview');
  const [highlightedPlaceId, setHighlightedPlaceId] = useState<string | null>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const handlePlaceSelect = (place: NearbyPlace) => {
    setHighlightedPlaceId(place.id);
  };

  const isCurrentBookmarked = isBookmarked(destination.id);

  const handleToggleCurrent = () => {
    toggleBookmark({
      id: destination.id,
      name: destination.name,
      category: 'destination',
      subtitle: destination.tagline,
      location: destination.state,
      addedAt: new Date().toISOString(),
    });
  };

  const getFilteredPlaces = (cat: NearbyPlace['category']) => {
    return destination.nearbyPlaces.filter((p) => p.category === cat);
  };

  const getGoogleDirectionsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  return (
    <div id="destination-experience" className="py-12 bg-background">
      <div className="container-custom space-y-12">
        
        {/* Breadcrumbs & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToDirectory}
            className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded py-1 px-2 bg-surface border border-border"
          >
            <span>← Back to All Destinations</span>
          </button>

          {/* Quick Destination Switcher Dropdown */}
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
            <span>Switch Destination:</span>
            <select
              value={destination.id}
              onChange={(e) => onSelectDestination(e.target.value)}
              className="bg-surface border border-border rounded-lg px-3 py-1.5 text-foreground text-xs font-bold focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
            >
              {allDestinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hero Section of Destination */}
        <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-lg">
          <div className="relative h-80 sm:h-96 lg:h-[420px] w-full overflow-hidden">
            <img
              src={destination.imageUrl}
              alt={destination.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/50 to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface/90 backdrop-blur-md text-foreground text-xs font-bold shadow-md">
                <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                {destination.state}, India ({destination.region.toUpperCase()})
              </span>
              
              <div className="flex items-center gap-2">
                {destination.isUnesco && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent text-surface text-xs font-extrabold shadow-md">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    UNESCO World Heritage Site ({destination.unescoYear})
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleToggleCurrent}
                  className={`p-2 rounded-xl backdrop-blur-md border text-xs font-bold shadow-md transition-all flex items-center gap-1.5 ${
                    isCurrentBookmarked
                      ? 'bg-accent text-surface border-accent'
                      : 'bg-surface/90 text-foreground border-border hover:bg-surface'
                  }`}
                  title={isCurrentBookmarked ? 'Remove from saved places' : 'Save destination'}
                >
                  <Bookmark className={`w-4 h-4 ${isCurrentBookmarked ? 'fill-surface' : ''}`} aria-hidden="true" />
                  <span className="hidden sm:inline">{isCurrentBookmarked ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Bottom Title & Stats */}
            <div className="absolute bottom-6 left-6 right-6 text-surface">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="flex items-center gap-1 text-accent font-bold text-sm bg-foreground/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-accent text-accent" aria-hidden="true" />
                  <span>{destination.rating}</span>
                  <span className="text-surface/80 font-normal">
                    ({destination.totalReviewsCount.toLocaleString('en-IN')}+ verified traveler reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-surface/90 bg-foreground/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-primary-light" aria-hidden="true" />
                  <span>Recommended: {destination.recommendedDuration}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-surface mb-2">
                {destination.name}
              </h1>
              <p className="text-sm sm:text-lg text-surface/90 font-medium max-w-3xl leading-relaxed">
                {destination.tagline}
              </p>
            </div>
          </div>

          {/* Destination Sub-Navigation Tabs */}
          <div className="p-4 bg-background border-t border-border flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'overview', label: 'About & Overview', icon: Compass },
                { id: 'nearby', label: 'Nearby Map & Sights', icon: MapPin },
                { id: 'food', label: 'Local Food & Cafes', icon: Utensils },
                { id: 'stay', label: 'Where to Stay', icon: Hotel },
                { id: 'services', label: 'Public Services', icon: HeartPulse },
                { id: 'reviews', label: 'Traveler Reviews', icon: Star },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-primary text-surface shadow-sm'
                        : 'bg-surface hover:bg-border/40 text-foreground/80 border border-border'
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onPlanItinerary(destination.id)}
                className="px-4 py-2 rounded-xl bg-accent text-surface text-xs sm:text-sm font-bold hover:bg-accent-hover transition-colors shadow-sm"
              >
                Plan {destination.name} Itinerary
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Content Area */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            
            {/* Left Column: History & Attractions (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Historical Context */}
              <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-4 shadow-sm">
                <h3 className="text-xl font-heading font-extrabold text-foreground">
                  About {destination.name}
                </h3>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                  {destination.description}
                </p>

                <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                    Historical Epoch & Heritage
                  </span>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {destination.historySummary}
                  </p>
                </div>
              </div>

              {/* Key Attractions Grid */}
              <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-heading font-extrabold text-foreground mb-4">
                  Signature Monuments & Attractions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.keyAttractions.map((attraction, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-background border border-border flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                        0{idx + 1}
                      </div>
                      <span className="text-sm font-bold text-foreground">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Map Preview */}
              <div className="space-y-3">
                <h3 className="text-xl font-heading font-extrabold text-foreground">
                  Location & Nearby Places Map
                </h3>
                <InteractiveMap
                  center={[destination.lat, destination.lng]}
                  places={destination.nearbyPlaces}
                  selectedCategory={mapCategory}
                  onSelectCategory={setMapCategory}
                  highlightedPlaceId={highlightedPlaceId}
                  onPlaceClick={handlePlaceSelect}
                />
              </div>

            </div>

            {/* Right Column: Travel Intel & Quick Badges (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Quick Info Box */}
              <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-4">
                <h4 className="font-heading font-bold text-base text-foreground pb-2 border-b border-border">
                  Travel Essentials
                </h4>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-0.5">
                    Architecture & Style
                  </span>
                  <p className="text-xs sm:text-sm text-foreground/80">{destination.architecturalStyle}</p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-0.5">
                    Best Time to Visit
                  </span>
                  <p className="text-xs sm:text-sm text-foreground/80">{destination.bestTimeToVisit}</p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-0.5">
                    Climate
                  </span>
                  <p className="text-xs sm:text-sm text-foreground/80">{destination.climate}</p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-0.5">
                    Typical Daily Budget
                  </span>
                  <div className="text-xs text-foreground/80 space-y-0.5">
                    <div>Budget: {destination.typicalDailyCostEstimate.budget}</div>
                    <div>Standard: {destination.typicalDailyCostEstimate.standard}</div>
                    <div>Luxury: {destination.typicalDailyCostEstimate.luxury}</div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-0.5">
                    ASI Monument Entry Fee
                  </span>
                  <div className="text-xs text-foreground/80">
                    <div>Indian Citizens: {destination.entryFee.indianNational}</div>
                    <div>Foreign Nationals: {destination.entryFee.foreignNational}</div>
                  </div>
                </div>
              </div>

              {/* Transit Connectivity */}
              <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-3">
                <h4 className="font-heading font-bold text-base text-foreground pb-2 border-b border-border flex items-center gap-2">
                  <Train className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>How to Reach</span>
                </h4>
                
                <div className="text-xs space-y-2 text-foreground/80">
                  <div>
                    <strong className="text-foreground">Airport: </strong>
                    {destination.howToReach.nearestAirport}
                  </div>
                  <div>
                    <strong className="text-foreground">Railway: </strong>
                    {destination.howToReach.nearestRailway}
                  </div>
                  <div>
                    <strong className="text-foreground">Roadways: </strong>
                    {destination.howToReach.roadConnectivity}
                  </div>
                </div>
              </div>

              {/* Tips & Etiquette */}
              <div className="p-5 rounded-2xl bg-accent/10 border border-accent/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" aria-hidden="true" />
                  <span>Insider Tip</span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {destination.insiderTip}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Cultural Etiquette</span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {destination.culturalEtiquette}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: NEARBY SIGHTS & MAP */}
        {activeTab === 'nearby' && (
          <div className="space-y-8 animate-fadeIn">
            <InteractiveMap
              center={[destination.lat, destination.lng]}
              places={destination.nearbyPlaces}
              selectedCategory={mapCategory}
              onSelectCategory={setMapCategory}
              highlightedPlaceId={highlightedPlaceId}
              onPlaceClick={handlePlaceSelect}
            />

            {/* Sights Grid */}
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-extrabold text-foreground">
                Historical Monuments & Sights Around {destination.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredPlaces('heritage').map((place) => (
                  <div
                    key={place.id}
                    className={`p-5 rounded-2xl bg-surface border transition-all duration-200 flex flex-col justify-between ${
                      highlightedPlaceId === place.id
                        ? 'border-primary ring-2 ring-primary shadow-md'
                        : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                          {place.subType}
                        </span>
                        {place.rating && (
                          <span className="text-xs font-bold text-accent">★ {place.rating}</span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-lg text-foreground mb-1">
                        {place.name}
                      </h4>
                      <p className="text-xs text-foreground/75 leading-relaxed mb-3">
                        {place.description}
                      </p>
                      
                      <div className="space-y-1 text-xs text-foreground/70 mb-4">
                        <div>📍 Distance: <strong className="text-foreground">{place.distance}</strong></div>
                        {place.priceOrFee && <div>🏷️ Entry: <strong>{place.priceOrFee}</strong></div>}
                        {place.timingOrHours && <div>⏰ Hours: <strong>{place.timingOrHours}</strong></div>}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                      <a
                        href={getGoogleDirectionsUrl(place.lat, place.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Google Maps Directions</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LOCAL FOOD & RESTAURANTS */}
        {activeTab === 'food' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
              <h3 className="text-2xl font-heading font-extrabold text-foreground mb-2">
                Authentic Food & Dining in {destination.name}
              </h3>
              <p className="text-sm text-foreground/70 mb-6">
                From centuries-old street breakfast stalls to royal specialty dining rooms.
              </p>

              {/* Signature Cuisines Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {destination.localCuisine.map((dish, dIdx) => (
                  <span
                    key={dIdx}
                    className="px-3.5 py-1.5 rounded-xl bg-accent/15 border border-accent/30 text-accent font-bold text-xs"
                  >
                    🍛 {dish}
                  </span>
                ))}
              </div>

              {/* Eateries List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredPlaces('food').map((eatery) => (
                  <div
                    key={eatery.id}
                    className="p-5 rounded-2xl bg-background border border-border hover:border-accent transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                          {eatery.subType}
                        </span>
                        {eatery.rating && (
                          <span className="text-xs font-bold text-accent">★ {eatery.rating}</span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-base text-foreground mb-1">
                        {eatery.name}
                      </h4>
                      <p className="text-xs text-foreground/75 leading-relaxed mb-3">
                        {eatery.description}
                      </p>
                      
                      <div className="space-y-1 text-xs text-foreground/70 mb-4">
                        <div>📍 Location: <strong>{eatery.address}</strong></div>
                        {eatery.priceOrFee && <div>💰 Price Range: <strong>{eatery.priceOrFee}</strong></div>}
                        {eatery.timingOrHours && <div>⏰ Hours: <strong>{eatery.timingOrHours}</strong></div>}
                      </div>

                      {eatery.popularFor && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {eatery.popularFor.map((item, pIdx) => (
                            <span key={pIdx} className="px-2 py-0.5 rounded bg-surface border border-border text-[10px] font-medium text-foreground/80">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <a
                        href={getGoogleDirectionsUrl(eatery.lat, eatery.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: WHERE TO STAY */}
        {activeTab === 'stay' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                <div>
                  <h3 className="text-2xl font-heading font-extrabold text-foreground mb-1">
                    Where to Stay in {destination.name}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Verified heritage palace hotels, boutique residences, and backpacker community hostels.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('stays-results') || document.getElementById('stays');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-primary text-surface font-heading font-bold text-xs hover:bg-primary-dark transition-colors shadow-sm flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Book Stays on Marketplace →</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredPlaces('stay').map((stay) => (
                  <div
                    key={stay.id}
                    className="p-5 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                          {stay.subType}
                        </span>
                        {stay.rating && (
                          <span className="text-xs font-bold text-accent">★ {stay.rating}</span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-base text-foreground mb-1">
                        {stay.name}
                      </h4>
                      <p className="text-xs text-foreground/75 leading-relaxed mb-3">
                        {stay.description}
                      </p>

                      <div className="space-y-1 text-xs text-foreground/70 mb-4">
                        <div>📍 Proximity: <strong className="text-foreground">{stay.distance}</strong></div>
                        {stay.priceOrFee && <div>💳 Price: <strong className="text-primary">{stay.priceOrFee}</strong></div>}
                        {stay.address && <div>📫 Address: <strong>{stay.address}</strong></div>}
                      </div>

                      {stay.popularFor && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {stay.popularFor.map((feat, fIdx) => (
                            <span key={fIdx} className="px-2 py-0.5 rounded bg-surface border border-border text-[10px] font-medium text-foreground/80">
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                      <a
                        href={getGoogleDirectionsUrl(stay.lat, stay.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-foreground/70 hover:text-foreground flex items-center gap-1"
                      >
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Map Location</span>
                      </a>

                      <a
                        href={stay.externalBookingUrl || `https://www.google.com/travel/hotels?q=${encodeURIComponent(stay.name + ' ' + destination.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-primary text-surface text-xs font-bold hover:bg-primary-dark transition-colors flex items-center gap-1"
                      >
                        <span>Check Availability</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PUBLIC SERVICES & TRANSIT */}
        {activeTab === 'services' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
              <h3 className="text-2xl font-heading font-extrabold text-foreground mb-2">
                Public Services, Transit & Safety in {destination.name}
              </h3>
              <p className="text-sm text-foreground/70 mb-6">
                Verified 24/7 emergency medical facilities, tourist assistance police cells, pharmacies, and railway terminals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...getFilteredPlaces('service'), ...getFilteredPlaces('transport')].map((srv) => (
                  <div
                    key={srv.id}
                    className="p-5 rounded-2xl bg-background border border-border flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          srv.category === 'service' ? 'text-red-700 dark:text-red-400' : 'text-primary'
                        }`}>
                          {srv.subType}
                        </span>
                        {srv.rating && (
                          <span className="text-xs font-bold text-foreground/70">★ {srv.rating}</span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-base text-foreground mb-1">
                        {srv.name}
                      </h4>
                      <p className="text-xs text-foreground/75 leading-relaxed mb-3">
                        {srv.description}
                      </p>

                      <div className="space-y-1 text-xs text-foreground/70 mb-4">
                        <div>📍 Distance: <strong>{srv.distance}</strong></div>
                        {srv.timingOrHours && <div>⏰ Hours: <strong>{srv.timingOrHours}</strong></div>}
                        {srv.phoneOrContact && <div>📞 Contact: <strong className="text-primary">{srv.phoneOrContact}</strong></div>}
                        <div>📫 Address: <strong>{srv.address}</strong></div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <a
                        href={getGoogleDirectionsUrl(srv.lat, srv.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Get Directions</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: TRAVELER REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
              <div>
                <h3 className="text-2xl font-heading font-extrabold text-foreground">
                  Verified Traveler Reviews ({destination.totalReviewsCount.toLocaleString('en-IN')}+)
                </h3>
                <p className="text-xs sm:text-sm text-foreground/70">
                  Real impressions and advice from domestic and international visitors.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xl font-heading font-black text-foreground">
                <Star className="w-6 h-6 fill-accent text-accent" aria-hidden="true" />
                <span>{destination.rating} / 5.0</span>
              </div>
            </div>

            <div className="space-y-4">
              {destination.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-xl bg-background border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">{rev.author}</span>
                    <span className="text-xs text-foreground/60">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-accent text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    "{rev.text}"
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rev.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-surface border border-border text-[10px] font-semibold text-primary">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Integrated Cost Calculator Section for This Destination */}
        <TravelCostCalculator
          currentDestination={destination}
          allDestinations={allDestinations}
          onDestinationChange={onSelectDestination}
          onBookInquiry={onOpenInquiry}
        />

        {/* Action Callout Bar */}
        <div className="p-8 rounded-3xl bg-primary text-surface flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-2xl font-heading font-black mb-1">
              Ready to Experience {destination.name}?
            </h3>
            <p className="text-xs sm:text-sm text-surface/85 max-w-xl">
              Generate a personalized day-by-day itinerary or connect with licensed ASI historians and authorized transport coordinators.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onPlanItinerary(destination.id)}
              className="px-6 py-3 rounded-xl bg-accent text-surface font-heading font-bold text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-sm"
            >
              Generate Itinerary
            </button>
            <button
              type="button"
              onClick={() => onOpenInquiry(destination.name)}
              className="px-6 py-3 rounded-xl bg-surface text-primary font-heading font-bold text-xs sm:text-sm hover:bg-background transition-colors"
            >
              Request Custom Guide
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
