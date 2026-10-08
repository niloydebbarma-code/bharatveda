import { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  ExternalLink,
  Loader2,
  AlertCircle,
  Landmark,
  Utensils,
  Hotel,
  HeartPulse,
  Train,
  Layers,
  Compass,
  ChevronRight
} from 'lucide-react';
import { GeocodingResolutionResult, ResolvedLocationItem, NearbyPlace } from '../types';
import { api } from '../services/api';
import { InteractiveMap } from './InteractiveMap';

interface UniversalLocationExplorerProps {
  initialQuery: string;
  onClose: () => void;
  onSelectDestinationById?: (destId: string) => void;
  onOpenInquiry?: (locationName?: string) => void;
}

export function UniversalLocationExplorer({
  initialQuery,
  onClose,
  onSelectDestinationById,
  onOpenInquiry,
}: UniversalLocationExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [radiusKm, setRadiusKm] = useState(35);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeocodingResolutionResult | null>(null);

  const [activeCategory, setActiveCategory] = useState<
    'all' | 'heritage' | 'food' | 'stay' | 'transport' | 'service'
  >('all');
  const [highlightedPlaceId, setHighlightedPlaceId] = useState<string | null>(null);

  const resolveLocation = async (q: string, r: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.resolveLocation(q, r);
      setResult(res.result);
      if (res.result.intentCategoryFilter && res.result.intentCategoryFilter !== 'all') {
        setActiveCategory(res.result.intentCategoryFilter);
      } else {
        setActiveCategory('all');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to resolve location query.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resolveLocation(initialQuery, radiusKm);
  }, [initialQuery, radiusKm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSearchNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      resolveLocation(query.trim(), radiusKm);
    }
  };

  // Convert resolved items into NearbyPlace interface for InteractiveMap
  const mapPlaces: NearbyPlace[] =
    result?.nearbyPlaces.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      subType: `${p.subType} • ${p.formattedDistance}`,
      rating: p.rating,
      distance: p.formattedDistance,
      lat: p.lat,
      lng: p.lng,
      description: p.address,
      priceOrFee: p.priceOrFee,
      timingOrHours: p.timingOrHours,
      address: p.address,
      phoneOrContact: p.phoneOrContact,
      popularFor: p.popularFor,
    })) || [];

  const filteredItems: ResolvedLocationItem[] =
    result?.nearbyPlaces.filter((p) => {
      if (activeCategory === 'all') return true;
      return p.category === activeCategory;
    }) || [];

  const mapCenter: [number, number] = result
    ? [result.anchorLocation.lat, result.anchorLocation.lng]
    : [27.1767, 78.0081];

  const getCategoryIcon = (category: ResolvedLocationItem['category']) => {
    switch (category) {
      case 'heritage':
        return <Landmark className="w-4 h-4 text-primary" aria-hidden="true" />;
      case 'food':
        return <Utensils className="w-4 h-4 text-accent" aria-hidden="true" />;
      case 'stay':
        return <Hotel className="w-4 h-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />;
      case 'service':
        return <HeartPulse className="w-4 h-4 text-red-600 dark:text-red-400" aria-hidden="true" />;
      case 'transport':
        return <Train className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-explorer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-foreground/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[92vh] bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Search Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-primary to-primary-dark text-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-4 flex-shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-accent/30 text-surface text-[10px] font-black uppercase tracking-wider">
                {result?.resolvedLevel?.toUpperCase() || 'LOCATION RESOLVED'}
              </span>
              {result?.anchorLocation.pincode && (
                <span className="px-2.5 py-0.5 rounded-full bg-surface/20 text-surface text-[10px] font-mono font-bold">
                  PIN: {result.anchorLocation.pincode}
                </span>
              )}
            </div>
            <h2 id="location-explorer-title" className="text-xl sm:text-3xl font-heading font-black text-surface">
              {result?.anchorLocation.title || query}
            </h2>
            <div className="text-xs sm:text-sm text-surface/85 flex items-center gap-1.5 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>
                {result?.anchorLocation.district}, {result?.anchorLocation.state} ({result?.anchorLocation.formattedCoordinates})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            {/* Quick search input */}
            <form onSubmit={handleSearchNew} className="relative flex-1 md:w-64">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search new place or PIN..."
                className="w-full pl-3 pr-8 py-2 bg-surface/15 text-surface placeholder:text-surface/60 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-surface border border-surface/20"
              />
            </form>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close location explorer"
              className="p-2 rounded-xl bg-surface/10 hover:bg-surface/20 text-surface transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Sub-Header: Proximity Radius & Category Tabs */}
        <div className="p-4 bg-background border-b border-border flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
          
          {/* Proximity Radius Selector */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground/60 uppercase text-[11px] flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span>Radius:</span>
            </span>
            {[
              { label: '5 km', val: 5 },
              { label: '15 km', val: 15 },
              { label: '35 km', val: 35 },
              { label: 'All Region', val: 80 },
            ].map((rad) => (
              <button
                key={rad.val}
                type="button"
                onClick={() => setRadiusKm(rad.val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  radiusKm === rad.val
                    ? 'bg-primary text-surface shadow-sm'
                    : 'bg-surface border border-border text-foreground hover:bg-border/30'
                }`}
              >
                {rad.label}
              </button>
            ))}
          </div>

          {/* Category Tabs with Counts */}
          {result && (
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All', count: result.categoryCounts.all },
                { id: 'heritage', label: 'Heritage', count: result.categoryCounts.heritage },
                { id: 'food', label: 'Food', count: result.categoryCounts.food },
                { id: 'stay', label: 'Stays', count: result.categoryCounts.stay },
                { id: 'service', label: 'Services', count: result.categoryCounts.service },
                { id: 'transport', label: 'Transit', count: result.categoryCounts.transport },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeCategory === tab.id
                      ? 'bg-accent text-surface shadow-sm'
                      : 'bg-surface border border-border text-foreground/80 hover:bg-border/40'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 rounded-full ${
                      activeCategory === tab.id ? 'bg-surface/20 text-surface' : 'bg-background text-foreground/60'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body: Map + Results Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {loading && (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" aria-hidden="true" />
              <p className="text-sm font-semibold text-foreground/70">
                Resolving spatial coordinates and computing nearby distances...
              </p>
            </div>
          )}

          {error && (
            <div className="p-6 rounded-2xl bg-accent/10 border border-accent text-accent text-sm flex items-center gap-3 max-w-lg mx-auto">
              <AlertCircle className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
              <div>
                <h4 className="font-bold">Location Resolution Failed</h4>
                <p className="text-xs text-foreground/80 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && result && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Dual View: Map on Top, Grid Below */}
              <div className="bg-background rounded-3xl border border-border p-3 sm:p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2 px-1 text-xs">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span>Spatial Map of {result.anchorLocation.title}</span>
                  </div>
                  <span className="text-foreground/60 font-semibold">
                    Showing {filteredItems.length} places within {radiusKm} km
                  </span>
                </div>

                <InteractiveMap
                  center={mapCenter}
                  zoom={result.resolvedLevel === 'state' ? 8 : 13}
                  places={mapPlaces}
                  selectedCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  highlightedPlaceId={highlightedPlaceId}
                  onPlaceClick={(place) => setHighlightedPlaceId(place.id)}
                />
              </div>

              {/* Resolved Places List Grid (2-3 columns) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-foreground">
                    Places & Services Around {result.anchorLocation.title} ({filteredItems.length})
                  </h3>
                  <span className="text-xs text-foreground/60">Sorted by proximity</span>
                </div>

                {filteredItems.length === 0 ? (
                  <div className="p-8 text-center bg-background rounded-2xl border border-border text-xs text-foreground/60">
                    No places found in this category within {radiusKm} km. Try increasing the radius selector above.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl bg-surface border transition-all flex flex-col justify-between ${
                          highlightedPlaceId === item.id
                            ? 'border-primary ring-2 ring-primary shadow-md'
                            : 'border-border hover:border-primary/40'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-background border border-border text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                              {getCategoryIcon(item.category)}
                              <span>{item.subType}</span>
                            </span>

                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-black text-xs flex-shrink-0">
                              {item.formattedDistance}
                            </span>
                          </div>

                          <h4 className="font-heading font-bold text-sm sm:text-base text-foreground mt-1 mb-1">
                            {item.name}
                          </h4>

                          <p className="text-xs text-foreground/75 leading-relaxed line-clamp-2 mb-3">
                            {item.address}
                          </p>

                          {item.popularFor && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.popularFor.map((feat, fIdx) => (
                                <span
                                  key={fIdx}
                                  className="text-[10px] bg-background px-2 py-0.5 rounded text-foreground/70 border border-border/60"
                                >
                                  {feat}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="text-[11px] text-foreground/70 space-y-0.5 mb-3">
                            {item.priceOrFee && <div>🏷️ <strong>{item.priceOrFee}</strong></div>}
                            {item.timingOrHours && <div>⏰ <strong>{item.timingOrHours}</strong></div>}
                            {item.phoneOrContact && <div>📞 <strong>{item.phoneOrContact}</strong></div>}
                          </div>
                        </div>

                        {/* Directions Link */}
                        <div className="pt-2.5 border-t border-border flex items-center justify-between text-xs">
                          <a
                            href={item.directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Google Maps Directions</span>
                          </a>

                          <span className="text-[10px] text-foreground/50 font-mono">
                            {item.lat.toFixed(3)}, {item.lng.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-background border-t border-border flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-foreground/70">
            {result?.matchedDestinationId ? (
              <span>Full destination dossier available for {result.anchorLocation.title}</span>
            ) : (
              <span>OpenStreetMap & Indian Postal Geocoded Coordinates</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {result?.matchedDestinationId && onSelectDestinationById && (
              <button
                type="button"
                onClick={() => {
                  onSelectDestinationById(result.matchedDestinationId!);
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-primary text-surface font-heading font-bold text-xs hover:bg-primary-dark transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Open {result.anchorLocation.title} Destination Guide</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}

            {onOpenInquiry && (
              <button
                type="button"
                onClick={() => {
                  onOpenInquiry(result?.anchorLocation.title || query);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-surface border border-border text-foreground font-bold text-xs hover:bg-border/30"
              >
                Plan Trip for This Area
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
