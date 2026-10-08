import { useState, useEffect } from 'react';
import { Utensils, Calendar, Sparkles, MapPin, Loader2, AlertCircle, Award } from 'lucide-react';
import { Festival, RegionalCuisine } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export function CultureAndCuisines() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'cuisines' | 'festivals' | 'arts'>('cuisines');
  const [cuisines, setCuisines] = useState<RegionalCuisine[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [selectedCuisineRegion, setSelectedCuisineRegion] = useState<string>('north');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const festivalFallbackImages: Record<Festival['theme'], string> = {
    lights: 'https://images.unsplash.com/photo-1561350111-7daa4f284bc6?auto=format&fit=crop&w=800&q=80',
    colors: 'https://images.unsplash.com/photo-1583225214464-9296029427aa?auto=format&fit=crop&w=800&q=80',
    harvest: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    arts: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80',
    spiritual: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80',
    tribal: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
  };

  useEffect(() => {
    const loadCultureData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [cuisinesRes, festivalsRes] = await Promise.all([
          api.getCuisines(),
          api.getFestivals(),
        ]);
        setCuisines(cuisinesRes.cuisines);
        setFestivals(festivalsRes.festivals);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cultural catalogs.');
      } finally {
        setLoading(false);
      }
    };
    loadCultureData();
  }, []);

  const activeCuisine = cuisines.find((c) => c.region === selectedCuisineRegion) || cuisines[0];

  const performingArts = [
    {
      name: 'Bharatanatyam',
      state: 'Tamil Nadu',
      origin: 'Ancient Natya Shastra temple dancers (Devadasis)',
      elements: 'Geometric body lines, intricate footwork (Adavus), and expressive facial storytelling (Abhinaya).',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Bharatanatyam_dancer.jpg?width=800',
    },
    {
      name: 'Kathakali',
      state: 'Kerala',
      origin: '17th-century temple drama of epic battles',
      elements: 'Elaborate mineral face makeup (Chutti), towering headgear (Kireedam), and dramatic eye expressions.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Kathakali_at_alvas2.jpg?width=800',
    },
    {
      name: 'Kathak',
      state: 'Uttar Pradesh & Rajasthan',
      origin: 'Ancient nomadic storytellers (Kathakars)',
      elements: 'Rapid pirouettes (Chakkars), rhythmic ankle-bell footwork (Tatkar), and delicate hand gestures (Mudras).',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Kathak_dance.jpg?width=800',
    },
    {
      name: 'Odissi',
      state: 'Odisha',
      origin: 'Sculptural temple dance dedicated to Lord Jagannath',
      elements: 'Sensuous Tribhangi (three-bend posture) reflecting ancient stone carvings of Konark and Puri.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Odissi_Dance.JPG?width=800',
    },
  ];

  return (
    <section id="culture" className="py-20 bg-background border-b border-border">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
            <span>Living Heritage & Traditions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight mb-4">
            {t('section.cultureTitle')}
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-sans">
            {t('section.cultureSubtitle')}
          </p>

          {/* Sub-navigation Tabs */}
          <div className="inline-flex items-center gap-2 p-1.5 bg-surface rounded-2xl border border-border shadow-sm mt-8">
            <button
              type="button"
              onClick={() => setActiveTab('cuisines')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'cuisines'
                  ? 'bg-primary text-surface shadow-sm'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <Utensils className="w-4 h-4" aria-hidden="true" />
              <span>Regional Gastronomy</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('festivals')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'festivals'
                  ? 'bg-primary text-surface shadow-sm'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Sacred Festivals</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('arts')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'arts'
                  ? 'bg-primary text-surface shadow-sm'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>Classical Arts</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center bg-surface rounded-2xl border border-border">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" aria-hidden="true" />
            <p className="text-sm font-semibold text-foreground/70">Loading cultural treasures...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-accent/10 border border-accent text-accent-hover text-sm mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* TAB 1: REGIONAL CUISINES */}
        {!loading && !error && activeTab === 'cuisines' && activeCuisine && (
          <div className="space-y-8 animate-fadeIn">
            {/* Region Selector Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {cuisines.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCuisineRegion(c.region)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedCuisineRegion === c.region
                      ? 'bg-accent text-surface shadow-sm'
                      : 'bg-surface border border-border text-foreground hover:bg-border/40'
                  }`}
                >
                  {c.region.toUpperCase()} INDIA
                </button>
              ))}
            </div>

            {/* Active Cuisine Showcase Card */}
            <div className="bg-surface rounded-3xl border border-border shadow-sm p-6 sm:p-8">
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-1">
                  Gastronomic Heritage of {activeCuisine.region.toUpperCase()} INDIA
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-foreground mb-3">
                  {activeCuisine.name}
                </h3>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-4 font-sans">
                  {activeCuisine.cookingPhilosophy}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-background border border-border">
                    <strong className="text-primary block mb-1">Master Spice Matrix:</strong>
                    <span className="text-foreground/85 leading-relaxed">{activeCuisine.spiceProfile}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-background border border-border">
                    <strong className="text-primary block mb-1">States Encompassed:</strong>
                    <span className="text-foreground/85 leading-relaxed">{activeCuisine.statesIncluded.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Iconic Dishes Grid with Photos */}
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-foreground/70 mb-5">
                Signature Heritage Delicacies:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCuisine.iconicDishes.map((dish, dIdx) => (
                  <div
                    key={dIdx}
                    className="bg-background rounded-3xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      {/* Dish Photo Header */}
                      {dish.imageUrl && (
                        <div className="relative h-48 w-full overflow-hidden bg-foreground/10">
                          <img
                            src={dish.imageUrl}
                            alt={dish.name}
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80';
                            }}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-3 right-3">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                                dish.type === 'vegetarian'
                                  ? 'bg-primary text-surface'
                                  : dish.type === 'beverage'
                                  ? 'bg-sky-700 text-surface'
                                  : dish.type === 'dessert'
                                  ? 'bg-accent text-surface'
                                  : 'bg-foreground text-surface'
                              }`}
                            >
                              {dish.type}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h5 className="font-heading font-extrabold text-lg text-foreground">
                            {dish.name}
                          </h5>
                          <span className="text-xs font-bold text-primary flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{dish.originCity}</span>
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-4">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3 border-t border-border/60 bg-background text-xs text-foreground/70">
                      <strong className="text-foreground/90">Signature Ingredients: </strong>
                      <span>{dish.keyIngredients.join(' • ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SACRED FESTIVALS */}
        {!loading && !error && activeTab === 'festivals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {festivals.map((fest) => (
              <div
                key={fest.id}
                className="bg-surface rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-foreground/10">
                    <img
                      src={fest.imageUrl}
                      alt={fest.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = festivalFallbackImages[fest.theme];
                      }}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-accent text-surface text-xs font-bold shadow-sm">
                        {fest.seasonMonth}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-surface">
                      <span className="text-[11px] font-semibold text-surface/80 block">
                        {fest.state}
                      </span>
                      <h4 className="font-heading font-black text-xl leading-tight">{fest.name}</h4>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                      {fest.summary}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-background border border-border text-xs">
                      <strong className="text-primary block mb-0.5">Spiritual Significance:</strong>
                      <span className="text-foreground/80 leading-relaxed">{fest.culturalSignificance}</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/20 text-xs">
                      <strong className="text-primary block mb-0.5">Must Experience:</strong>
                      <span className="text-foreground/80 leading-relaxed">{fest.mustExperience}</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-surface border-t border-border text-xs text-foreground/75 flex items-center justify-between">
                  <span className="font-semibold">Traditional Treat:</span>
                  <span className="font-bold text-accent">{fest.traditionalTreat}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: CLASSICAL ARTS & TRADITIONS */}
        {!loading && !error && activeTab === 'arts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            {performingArts.map((art, aIdx) => (
              <div
                key={aIdx}
                className="bg-surface rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-foreground/10">
                    <img
                      src={art.image}
                      alt={art.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Bharatanatyam_dancer.jpg?width=800';
                      }}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-primary text-surface text-xs font-bold shadow-sm">
                        {art.state}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface/90 text-foreground text-[10px] font-bold">
                        Classical Sangeet Natak
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-5 right-5 text-surface">
                      <h3 className="text-2xl font-heading font-black text-surface mb-0.5">
                        {art.name}
                      </h3>
                      <div className="text-xs font-medium text-surface/90">
                        Origin: {art.origin}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-foreground/85 leading-relaxed font-medium">
                      {art.elements}
                    </p>
                  </div>
                </div>

                <div className="p-4 m-6 mt-0 rounded-2xl bg-background border border-border text-xs text-foreground/70 flex items-center gap-2">
                  <span>🏛️</span>
                  <span>Traditional Performance Season: October through March in temple sabhas and cultural auditoriums.</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
