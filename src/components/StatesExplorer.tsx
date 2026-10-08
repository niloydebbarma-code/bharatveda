import { useState, useEffect, useTransition } from 'react';
import { Compass, MapPin, Search, Filter, Loader2, ArrowRight } from 'lucide-react';
import { IndianState } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface StatesExplorerProps {
  onSelectStateDestination: (stateName: string) => void;
}

export function StatesExplorer({ onSelectStateDestination }: StatesExplorerProps) {
  const { t } = useLanguage();
  const [states, setStates] = useState<IndianState[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [, startTransition] = useTransition();

  const scrollToResults = () => {
    window.requestAnimationFrame(() => {
      document.getElementById('states-results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const fetchStates = async () => {
    try {
      setLoading(true);
      const res = await api.getStates({
        region: selectedRegion,
        search: searchTerm,
      });
      setStates(res.states);
    } catch (err) {
      console.error('Failed to load Indian states:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        fetchStates();
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [selectedRegion, searchTerm]);

  const regionTabs = [
    { id: 'all', label: 'All 28 States & 8 UTs' },
    { id: 'north', label: 'North' },
    { id: 'south', label: 'South' },
    { id: 'east', label: 'East' },
    { id: 'west', label: 'West' },
    { id: 'central', label: 'Central' },
    { id: 'northeast', label: 'North-East' },
  ];

  return (
    <section id="states" className="py-20 bg-background border-b border-border">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Pan-India Cultural Atlas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight mb-4">
            {t('section.statesTitle')}
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-sans">
            {t('section.statesSubtitle')}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <label htmlFor="state-search-input" className="sr-only">
                Search state, capital, or dance
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40">
                <Search className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                id="state-search-input"
                type="text"
                placeholder="Search state, capital, dance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') scrollToResults();
                }}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-xs font-bold text-foreground/60 uppercase mr-1 hidden lg:inline flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Zone:</span>
              </span>
              {regionTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedRegion(tab.id);
                    scrollToResults();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedRegion === tab.id
                      ? 'bg-primary text-surface shadow-sm'
                      : 'bg-background hover:bg-border/50 text-foreground/80 border border-border'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        <div id="states-results" className="scroll-mt-36" />

        {/* Loading State */}
        {loading && (
          <div className="py-12 text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" aria-hidden="true" />
            <p className="text-xs font-semibold text-foreground/60">Loading cultural states catalog...</p>
          </div>
        )}

        {/* States Cards Grid (3 Columns) */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {states.map((st) => (
              <div
                key={st.id}
                className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header Image */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={st.coverImage}
                      alt={st.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded bg-surface/90 backdrop-blur-xs text-foreground text-[10px] font-bold uppercase tracking-wider">
                        {st.type === 'state' ? 'State' : 'Union Territory'} • {st.region.toUpperCase()}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-surface">
                      <h3 className="font-heading font-black text-xl text-surface">
                        {st.name}
                      </h3>
                      <div className="text-xs text-surface/90 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-accent" aria-hidden="true" />
                        <span>Capital: <strong>{st.capital}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3.5">
                    <p className="text-xs text-foreground/80 leading-relaxed line-clamp-2">
                      {st.summary}
                    </p>

                    {/* Folk Dances */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                        Traditional Dances:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {st.traditionalDances.map((dance, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-2 py-0.5 rounded bg-background border border-border text-[11px] font-medium text-foreground/80"
                          >
                            {dance}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Signature Handicrafts */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-1">
                        GI Handicrafts & Weaves:
                      </span>
                      <div className="text-xs text-foreground/80 line-clamp-2">
                        {st.signatureHandicrafts.join(' • ')}
                      </div>
                    </div>

                    {/* Famous Monuments */}
                    <div className="p-2.5 rounded-xl bg-background border border-border text-xs text-foreground/75">
                      <strong className="text-foreground">Key Monuments: </strong>
                      {st.famousMonuments.slice(0, 3).join(', ')}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-background border-t border-border flex items-center justify-between">
                  <div className="text-[11px] text-foreground/60">
                    Best: <strong>{st.bestSeason}</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectStateDestination(st.name)}
                    className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1"
                  >
                    <span>View Places in {st.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
