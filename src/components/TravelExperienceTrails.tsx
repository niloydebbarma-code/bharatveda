import { useState, useEffect } from 'react';
import { Route, Clock, Calendar, ChevronRight, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { HeritageTrail } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface TravelExperienceTrailsProps {
  onPlanTrail: (destinationName?: string) => void;
}

export function TravelExperienceTrails({ onPlanTrail }: TravelExperienceTrailsProps) {
  const { t } = useLanguage();
  const [trails, setTrails] = useState<HeritageTrail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrails = async () => {
      try {
        setLoading(true);
        const res = await api.getTrails();
        setTrails(res.trails);
      } catch (err) {
        console.error('Failed to load trails:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTrails();
  }, []);

  return (
    <section id="trails" className="py-20 bg-surface border-b border-border">
      <div className="container-custom">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Route className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Curated Grand Expeditions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight mb-4">
            {t('section.trailsTitle')}
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-sans">
            {t('section.trailsSubtitle')}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" aria-hidden="true" />
            <p className="text-sm font-semibold text-foreground/60">Loading curated trails...</p>
          </div>
        )}

        {/* Trails Grid (2 Column) */}
        {!loading && trails.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {trails.map((trail) => (
              <div
                key={trail.id}
                className="bg-background rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Image and Duration Header */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={trail.coverImage}
                      alt={trail.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
                    
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-foreground text-xs font-bold shadow-sm">
                        <Clock className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                        <span>{trail.recommendedDuration}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent text-surface text-xs font-bold shadow-sm">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{trail.bestSeason}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-5 right-5 text-surface">
                      <h3 className="font-heading font-black text-xl sm:text-2xl tracking-tight leading-tight">
                        {trail.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-surface/90 font-medium mt-0.5">
                        {trail.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-foreground/85 leading-relaxed font-medium">
                      {trail.description}
                    </p>

                    {/* Route Stops Sequence */}
                    <div className="p-4 rounded-2xl bg-surface border border-border space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-primary block">
                        Circuit Route Sequence:
                      </span>
                      <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-foreground">
                        {trail.routeStops.map((stop, sIdx) => (
                          <li key={`${trail.id}-${sIdx}`} className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-background border border-border shadow-xs">
                              <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-primary text-surface text-[10px] font-black">
                                {sIdx + 1}
                              </span>
                              {stop}
                            </span>
                            {sIdx < trail.routeStops.length - 1 && (
                              <ChevronRight className="w-4 h-4 text-accent stroke-[3] flex-shrink-0" aria-hidden="true" />
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Highlights List */}
                    <div className="space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-foreground/70 block">
                        Circuit Highlights & Monuments:
                      </span>
                      <ul className="space-y-2 text-xs sm:text-sm text-foreground/85 font-medium">
                        {trail.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 bg-background flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border/60 mt-4 pt-4">
                  <div className="text-xs sm:text-sm text-foreground/70 font-semibold">
                    Ideal for: <strong className="text-foreground">{trail.idealTravelers}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPlanTrail(trail.title)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-surface font-heading font-bold text-xs sm:text-sm hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
                    <span>Inquire Circuit Package</span>
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
