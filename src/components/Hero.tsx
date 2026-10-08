import { Compass, Sparkles, MapPin, Award, ChevronRight, ShieldCheck, BookOpen } from 'lucide-react';
import { UniversalSearchBar } from './UniversalSearchBar';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreClick: () => void;
  onPlanTripClick: () => void;
  onUniversalSearch: (query: string) => void;
}

export function Hero({ onExploreClick, onPlanTripClick, onUniversalSearch }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative py-16 md:py-24 overflow-hidden border-b border-border bg-gradient-to-b from-surface via-background to-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Universal Search & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* National Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-accent stroke-[2]" aria-hidden="true" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Main Headline - Clean typography with balanced leading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-foreground tracking-tight leading-[1.24] sm:leading-[1.18] mb-6">
              {t('hero.headlinePart1')}{' '}
              <span className="text-primary font-black inline-block">
                {t('hero.headlineHighlight')}
              </span>{' '}
              {t('hero.headlinePart2')}
            </h1>

            {/* Subtitle answering Who, What, Why */}
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 max-w-2xl font-sans">
              {t('hero.subtitle')}
            </p>

            {/* Universal Multi-Type Search Bar */}
            <div className="w-full mb-8">
              <UniversalSearchBar onSelectQuery={onUniversalSearch} />
              <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs text-foreground/70">
                <span className="font-bold text-primary">{t('hero.popularSearches')}</span>
                {[
                  { label: 'Taj Mahal', q: 'Taj Mahal' },
                  { label: 'PIN 282001', q: '282001' },
                  { label: 'Hotels near Agra', q: 'Hotels near Agra' },
                  { label: 'Jaipur Pink City', q: 'Jaipur' },
                  { label: 'Varanasi Ghats', q: 'Varanasi' },
                  { label: 'Kerala Backwaters', q: 'Kerala' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onUniversalSearch(item.q)}
                    className="px-2.5 py-1 rounded-lg bg-surface border border-border hover:border-primary text-foreground/80 hover:text-primary transition-colors text-[11px] font-semibold"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-surface font-semibold text-base hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Compass className="w-5 h-5 stroke-[2]" aria-hidden="true" />
                <span>{t('hero.exploreBtn')}</span>
              </button>
              
              <button
                type="button"
                onClick={onPlanTripClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-surface border border-primary text-primary font-semibold text-base hover:bg-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>{t('hero.plannerBtn')}</span>
                <ChevronRight className="w-4 h-4 stroke-[2]" aria-hidden="true" />
              </button>
            </div>

            {/* Trust and Verification Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border/80 w-full">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium text-foreground/80">ASI & UNESCO Verified</span>
              </div>
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-accent flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium text-foreground/80">Postal & Spatial Geocoding</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium text-foreground/80">Verified Stays & Tariffs</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-surface p-2">
              <img
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80"
                alt="Taj Mahal marble monument reflected in pool at dawn in Agra, India"
                className="w-full h-80 sm:h-96 object-cover rounded-xl"
                loading="eager"
              />
              
              {/* Floating Stat Card 1 */}
              <div className="absolute top-6 right-6 bg-surface/95 backdrop-blur-md border border-border rounded-xl p-3.5 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
                  <Award className="w-5 h-5 stroke-[2]" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground/60 uppercase">UNESCO Status</div>
                  <div className="text-sm font-bold text-foreground">42 Inscribed Sites</div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-6 left-6 right-6 bg-surface/95 backdrop-blur-md border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold text-primary mb-1">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Agra, Uttar Pradesh (PIN: 282001)</span>
                    </div>
                    <div className="font-heading font-bold text-base text-foreground">Taj Mahal & Agra Fort</div>
                    <div className="text-xs text-foreground/70">Mughal Architecture • 17th Century</div>
                  </div>
                  <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-primary/10 text-primary">
                    UNESCO 1983
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-border">
          <div className="bg-surface rounded-xl p-5 border border-border text-center">
            <div className="font-heading font-black text-3xl sm:text-4xl text-primary mb-1">42+</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground/70">World Heritage Sites</div>
          </div>
          <div className="bg-surface rounded-xl p-5 border border-border text-center">
            <div className="font-heading font-black text-3xl sm:text-4xl text-accent mb-1">28+8</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground/70">States & Union Territories</div>
          </div>
          <div className="bg-surface rounded-xl p-5 border border-border text-center">
            <div className="font-heading font-black text-3xl sm:text-4xl text-primary mb-1">100+</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground/70">GI Tagged Cuisines & Crafts</div>
          </div>
          <div className="bg-surface rounded-xl p-5 border border-border text-center">
            <div className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-1">5,000+</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground/70">Years of Living Civilization</div>
          </div>
        </div>

      </div>
    </section>
  );
}
