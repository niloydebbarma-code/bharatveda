import { useState, useEffect, useTransition } from 'react';
import { Search, MapPin, ShieldCheck, ChevronRight, Filter, AlertCircle, RefreshCw, Sparkles, Compass } from 'lucide-react';
import { Destination } from '../types';
import { api } from '../services/api';
import { HeritageDetailsModal } from './HeritageDetailsModal';
import { useLanguage } from '../context/LanguageContext';

interface DestinationExplorerProps {
  onPlanTrip: (destinationId: string) => void;
  onExploreDestination?: (destination: Destination) => void;
}

export function DestinationExplorer({ onPlanTrip, onExploreDestination }: DestinationExplorerProps) {
  const { t } = useLanguage();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [unescoOnly, setUnescoOnly] = useState(false);

  // Modal State
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const [, startTransition] = useTransition();

  const scrollToResults = () => {
    window.requestAnimationFrame(() => {
      document.getElementById('destination-results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getDestinations({
        search: searchTerm,
        region: selectedRegion,
        category: selectedCategory,
        unescoOnly,
      });
      setDestinations(res.destinations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to retrieve destination catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        fetchDestinations();
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedRegion, selectedCategory, unescoOnly]);

  const regionTabs = [
    { id: 'all', label: 'All Regions' },
    { id: 'north', label: 'North India' },
    { id: 'south', label: 'South India' },
    { id: 'east', label: 'East India' },
    { id: 'west', label: 'West India' },
    { id: 'central', label: 'Central India' },
    { id: 'northeast', label: 'North-East' },
  ];

  const categoryTabs = [
    { id: 'all', label: 'All Categories' },
    { id: 'heritage', label: 'Monuments & Architecture' },
    { id: 'spiritual', label: 'Spiritual Circuits' },
    { id: 'nature', label: 'Nature & Wildlife' },
    { id: 'royal', label: 'Royal Forts & Palaces' },
  ];

  return (
    <section id="destinations" className="py-20 bg-background border-b border-border">
      <div className="container-custom">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Interactive Heritage Atlas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight mb-4">
            {t('section.destinationsTitle')}
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-sans">
            {t('section.destinationsSubtitle')}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm mb-10">
          
          {/* Search Input & UNESCO Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6">
            <div className="relative md:col-span-8">
              <label htmlFor="destination-search-input" className="sr-only">
                Search destinations, monuments, or states
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40">
                <Search className="w-5 h-5" aria-hidden="true" />
              </div>
              <input
                id="destination-search-input"
                type="text"
                placeholder="Search by city, monument, state (e.g. Taj Mahal, Hampi, Kerala, Varanasi)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') scrollToResults();
                }}
                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-foreground/50 hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* UNESCO Checkbox Toggle */}
            <div className="md:col-span-4 flex items-center justify-start md:justify-end">
              <label className="flex items-center gap-2.5 cursor-pointer select-none bg-background px-4 py-2.5 rounded-xl border border-border hover:border-primary/50 transition-colors w-full md:w-auto">
                <input
                  type="checkbox"
                  checked={unescoOnly}
                  onChange={(e) => {
                    setUnescoOnly(e.target.checked);
                    scrollToResults();
                  }}
                  className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
                />
                <ShieldCheck className="w-4 h-4 text-accent" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-semibold text-foreground/90">
                  UNESCO Inscribed Only
                </span>
              </label>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground/60 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span>Select Region:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {regionTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedRegion(tab.id);
                    scrollToResults();
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    selectedRegion === tab.id
                      ? 'bg-primary text-surface shadow-sm'
                      : 'bg-background hover:bg-border/60 text-foreground/80 border border-border'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/60">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground/60 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>Experience Theme:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(tab.id);
                    scrollToResults();
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                    selectedCategory === tab.id
                      ? 'bg-accent text-surface shadow-sm'
                      : 'bg-background hover:bg-border/60 text-foreground/70 border border-border'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Status / Active Count */}
        <div id="destination-results" className="flex items-center justify-between mb-6 px-1">
          <div className="text-sm font-medium text-foreground/70">
            Showing <span className="font-bold text-primary">{destinations.length}</span> curated heritage destinations
          </div>
          {(searchTerm || selectedRegion !== 'all' || selectedCategory !== 'all' || unescoOnly) && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('all');
                setSelectedCategory('all');
                setUnescoOnly(false);
                scrollToResults();
              }}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" aria-hidden="true" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="bg-surface rounded-2xl border border-border overflow-hidden animate-pulse">
                <div className="h-48 bg-border/50" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-border/60 rounded w-1/3" />
                  <div className="h-6 bg-border/60 rounded w-3/4" />
                  <div className="h-4 bg-border/40 rounded w-full" />
                  <div className="h-4 bg-border/40 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-8 rounded-2xl bg-surface border border-accent/30 text-center max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-accent mx-auto mb-3" aria-hidden="true" />
            <h3 className="text-lg font-heading font-bold text-foreground mb-1">Unable to Load Catalog</h3>
            <p className="text-sm text-foreground/70 mb-4">{error}</p>
            <button
              type="button"
              onClick={fetchDestinations}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-surface text-sm font-medium hover:bg-primary-dark"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && destinations.length === 0 && (
          <div className="p-12 rounded-2xl bg-surface border border-border text-center max-w-lg mx-auto">
            <Compass className="w-12 h-12 text-primary/40 mx-auto mb-3" aria-hidden="true" />
            <h3 className="text-xl font-heading font-bold text-foreground mb-1">No Matching Destinations</h3>
            <p className="text-sm text-foreground/70 mb-5">
              No places matched your query "{searchTerm}". Try clearing search keywords or selecting another region.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('all');
                setSelectedCategory('all');
                setUnescoOnly(false);
                scrollToResults();
              }}
              className="px-5 py-2.5 rounded-xl bg-primary text-surface text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Show All Destinations
            </button>
          </div>
        )}

        {/* Destinations Cards Grid */}
        {!loading && !error && destinations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="group bg-surface rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-52 w-full overflow-hidden bg-foreground/10">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-60" />
                    
                    {/* Badges on Top */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface/90 backdrop-blur-sm text-foreground text-xs font-semibold shadow-sm">
                        <MapPin className="w-3 h-3 text-primary" aria-hidden="true" />
                        {dest.state}
                      </span>
                      {dest.isUnesco && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-surface text-xs font-bold shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                          UNESCO
                        </span>
                      )}
                    </div>

                    {/* Category pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/90 text-surface text-[11px] font-semibold uppercase tracking-wider">
                        {dest.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                      {dest.name}
                    </h3>
                    <p className="text-xs font-medium text-foreground/60 mb-3 italic">
                      {dest.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-foreground/80 line-clamp-2 leading-relaxed mb-4">
                      {dest.description}
                    </p>

                    {/* Key Attractions Preview */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                        Signature Highlights:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.keyAttractions.slice(0, 3).map((attr, aIdx) => (
                          <span
                            key={aIdx}
                            className="px-2 py-0.5 rounded bg-background border border-border text-[11px] font-medium text-foreground/80"
                          >
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 pb-5 pt-3 border-t border-border/60 flex items-center justify-between gap-3 bg-surface">
                  <button
                    type="button"
                    onClick={() => {
                      if (onExploreDestination) {
                        onExploreDestination(dest);
                      } else {
                        setSelectedDestination(dest);
                      }
                    }}
                    className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded py-1 px-1.5"
                  >
                    <span>{t('btn.explorePlace')}</span>
                    <ChevronRight className="w-4 h-4 stroke-[2]" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onPlanTrip(dest.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-background hover:bg-primary/10 text-primary border border-primary/30 text-xs font-semibold transition-colors"
                  >
                    {t('btn.planItinerary')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal View */}
      {selectedDestination && (
        <HeritageDetailsModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onPlanTrip={onPlanTrip}
        />
      )}
    </section>
  );
}
