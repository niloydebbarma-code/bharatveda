import { useState, useEffect, useId } from 'react';
import {
  CalendarDays,
  Compass,
  Clock,
  Sparkles,
  Users,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Printer,
  ChevronDown,
  ChevronUp,
  MapPin,
  Utensils,
  Sun,
  ShieldAlert,
  Gift
} from 'lucide-react';
import { Destination, GeneratedItinerary, ItineraryRequest } from '../types';
import { api } from '../services/api';

interface SmartItineraryPlannerProps {
  initialDestinationId?: string;
  onOpenInquiry: (destinationName?: string) => void;
}

export function SmartItineraryPlanner({
  initialDestinationId,
  onOpenInquiry,
}: SmartItineraryPlannerProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('agra-taj-mahal');
  const [days, setDays] = useState<number>(3);
  const [travelStyle, setTravelStyle] = useState<ItineraryRequest['travelStyle']>('heritage-explorer');
  const [budget, setBudget] = useState<ItineraryRequest['budget']>('standard');
  const [travelers, setTravelers] = useState<number>(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Ancient Architecture & Epigraphy',
    'Local Street Food & Regional Banquets',
  ]);

  // Async generator state
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [expandedDay, setExpandedDay] = useState<number>(1);

  const destinationSelectId = useId();
  const travelersInputId = useId();

  // Load destinations for the dropdown
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const res = await api.getDestinations();
        setDestinations(res.destinations);
        if (initialDestinationId && res.destinations.some((d) => d.id === initialDestinationId)) {
          setSelectedDestinationId(initialDestinationId);
        } else if (res.destinations.length > 0) {
          setSelectedDestinationId(res.destinations[0].id);
        }
      } catch (err) {
        console.error('Failed to load destinations for planner:', err);
      }
    };
    loadDestinations();
  }, [initialDestinationId]);

  // Update selected if prop changes
  useEffect(() => {
    if (initialDestinationId) {
      setSelectedDestinationId(initialDestinationId);
    }
  }, [initialDestinationId]);

  const interestOptions = [
    'Ancient Architecture & Epigraphy',
    'Local Street Food & Regional Banquets',
    'Sacred Rituals & Morning Aartis',
    'Generational Handloom & Crafts',
    'Nature, Wildlife & Riparian Walks',
    'Golden Hour Photography Vantage Points',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setGenerating(true);
      setError(null);
      const res = await api.generateItinerary({
        destinationId: selectedDestinationId,
        days,
        travelStyle,
        budget,
        travelers,
        interests: selectedInterests,
      });
      setItinerary(res.itinerary);
      setExpandedDay(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const travelStyles: { id: ItineraryRequest['travelStyle']; label: string; desc: string }[] = [
    { id: 'heritage-explorer', label: 'Heritage Explorer', desc: 'Monuments, history & archaeology' },
    { id: 'cultural-immersion', label: 'Cultural Immersion', desc: 'Living folklore, music & guilds' },
    { id: 'photography-scenic', label: 'Photography & Scenic', desc: 'Golden hour vistas & riparian scenes' },
    { id: 'culinary-journey', label: 'Culinary Journey', desc: 'Royal recipes & historic street food' },
    { id: 'relaxed-leisure', label: 'Relaxed Leisure', desc: 'Unrushed cadence & serene gardens' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="planner" className="py-20 bg-surface border-b border-border">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Intelligent Itinerary Generator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight mb-4">
            Curate Your Personalized Heritage Journey
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
            Select your destination, duration, pace, and passions. Our engine structures a verified day-by-day plan with budget estimates, transport tips, and cultural etiquette.
          </p>
        </div>

        {/* Generator Form and Interactive Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Controls Column */}
          <div className="lg:col-span-5 bg-background rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
            <form onSubmit={handleGenerate} className="space-y-6">
              
              {/* Destination Selector */}
              <div>
                <label htmlFor={destinationSelectId} className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  1. Select Target Destination
                </label>
                <div className="relative">
                  <select
                    id={destinationSelectId}
                    value={selectedDestinationId}
                    onChange={(e) => setSelectedDestinationId(e.target.value)}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.state}) {d.isUnesco ? '• UNESCO' : ''}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-foreground/50">
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Duration and Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                    2. Duration (Days)
                  </label>
                  <div className="flex items-center gap-2">
                    {[2, 3, 5, 7].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setDays(num)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                          days === num
                            ? 'bg-primary text-surface shadow-sm'
                            : 'bg-surface border border-border text-foreground hover:bg-border/40'
                        }`}
                      >
                        {num}D
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor={travelersInputId} className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                    Travelers Count
                  </label>
                  <div className="relative">
                    <input
                      id={travelersInputId}
                      type="number"
                      min={1}
                      max={15}
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-foreground text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Users className="w-4 h-4 text-foreground/40 absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Travel Style Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  3. Travel Style & Cadence
                </label>
                <div className="space-y-2">
                  {travelStyles.map((style) => (
                    <label
                      key={style.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        travelStyle === style.id
                          ? 'bg-primary/5 border-primary ring-1 ring-primary'
                          : 'bg-surface border-border hover:border-border/80'
                      }`}
                    >
                      <input
                        type="radio"
                        name="travelStyle"
                        value={style.id}
                        checked={travelStyle === style.id}
                        onChange={() => setTravelStyle(style.id)}
                        className="mt-1 w-4 h-4 text-primary focus:ring-primary border-border"
                      />
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-foreground">{style.label}</div>
                        <div className="text-[11px] text-foreground/70">{style.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  4. Accommodation & Experience Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'budget', label: 'Budget', sub: 'Homestays' },
                    { id: 'standard', label: 'Standard', sub: 'Boutique' },
                    { id: 'luxury', label: 'Royal', sub: 'Heritage Palace' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setBudget(tier.id as ItineraryRequest['budget'])}
                      className={`p-2.5 rounded-xl text-center border transition-all ${
                        budget === tier.id
                          ? 'bg-accent text-surface border-accent shadow-sm'
                          : 'bg-surface border-border text-foreground hover:bg-border/40'
                      }`}
                    >
                      <div className="text-xs font-bold">{tier.label}</div>
                      <div className="text-[10px] opacity-80">{tier.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Areas */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  5. Curated Interest Focus
                </label>
                <div className="space-y-1.5">
                  {interestOptions.map((opt) => {
                    const isChecked = selectedInterests.includes(opt);
                    return (
                      <label
                        key={opt}
                        className="flex items-center gap-2.5 text-xs text-foreground/80 cursor-pointer select-none p-1.5 rounded hover:bg-surface"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleInterest(opt)}
                          className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-border"
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={generating}
                className="w-full py-4 rounded-xl bg-primary text-surface font-heading font-bold text-sm sm:text-base hover:bg-primary-dark transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>Curating Real Day-by-Day Itinerary...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-accent stroke-[2.5]" aria-hidden="true" />
                    <span>Generate Day-by-Day Itinerary</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7">
            
            {/* Error Message */}
            {error && (
              <div className="p-6 rounded-2xl bg-accent/10 border border-accent text-foreground mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-sm">Itinerary Generation Error</h4>
                  <p className="text-xs text-foreground/80 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Empty Prompt State */}
            {!itinerary && !generating && (
              <div className="h-full min-h-[460px] rounded-2xl border-2 border-dashed border-border bg-background/50 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Compass className="w-8 h-8 stroke-[1.5]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  Your Custom Itinerary Will Appear Here
                </h3>
                <p className="text-sm text-foreground/70 max-w-md mb-6 leading-relaxed">
                  Configure your preferences on the left and click "Generate Day-by-Day Itinerary" to produce an authentic chronological tour schedule with historical timings, verified dining, and budget estimates.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-foreground/60">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" aria-hidden="true" /> Real Pricing in INR
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" aria-hidden="true" /> ASI Timings
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" aria-hidden="true" /> Cultural Etiquette
                  </span>
                </div>
              </div>
            )}

            {/* Generated Output */}
            {itinerary && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Dossier Header Summary */}
                <div className="bg-background rounded-2xl p-6 border border-border shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-border">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded bg-primary text-surface text-xs font-bold uppercase tracking-wider">
                          Itinerary #{itinerary.itineraryId}
                        </span>
                        {itinerary.destination.isUnesco && (
                          <span className="px-2.5 py-0.5 rounded bg-accent text-surface text-xs font-bold">
                            UNESCO Site
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-heading font-black text-foreground">
                        {itinerary.overview.totalDays}-Day {itinerary.destination.name} Exploration
                      </h3>
                      <p className="text-xs text-foreground/60 italic mt-0.5">
                        {itinerary.destination.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="p-2.5 rounded-xl bg-surface border border-border text-foreground/80 hover:text-foreground hover:bg-border/40 transition-colors shadow-sm text-xs font-semibold flex items-center gap-1.5"
                        title="Print Itinerary"
                      >
                        <Printer className="w-4 h-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Print / PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                    <div className="p-3 rounded-xl bg-surface border border-border">
                      <div className="flex items-center gap-1.5 text-xs text-primary font-bold mb-0.5">
                        <Wallet className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Estimated Total Cost</span>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-foreground">
                        {itinerary.overview.estimatedCostRangeINR}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-surface border border-border">
                      <div className="flex items-center gap-1.5 text-xs text-primary font-bold mb-0.5">
                        <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Season Advice</span>
                      </div>
                      <div className="text-xs font-medium text-foreground/80">
                        {itinerary.overview.bestSeasonAdvice}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-surface border border-border">
                      <div className="flex items-center gap-1.5 text-xs text-primary font-bold mb-0.5">
                        <Users className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Party & Cadence</span>
                      </div>
                      <div className="text-xs font-medium text-foreground/80">
                        {itinerary.overview.travelersCount} Traveler(s) • {itinerary.overview.travelStyle}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day-by-Day Accordion Plan */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/70 px-1">
                    Chronological Day-by-Day Schedule:
                  </h4>

                  {itinerary.days.map((day) => {
                    const isExpanded = expandedDay === day.dayNumber;
                    return (
                      <div
                        key={day.dayNumber}
                        className="bg-background rounded-2xl border border-border overflow-hidden transition-all duration-200"
                      >
                        {/* Day Toggle Bar */}
                        <button
                          type="button"
                          onClick={() => setExpandedDay(isExpanded ? 0 : day.dayNumber)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-primary text-surface font-heading font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                              D{day.dayNumber}
                            </span>
                            <div>
                              <div className="font-heading font-bold text-sm sm:text-base text-foreground">
                                {day.theme}
                              </div>
                              <div className="text-xs text-foreground/60 hidden sm:block">
                                Morning, Afternoon & Twilight Heritage schedule
                              </div>
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-foreground/60" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-foreground/60" aria-hidden="true" />
                          )}
                        </button>

                        {/* Expanded Day Details */}
                        {isExpanded && (
                          <div className="p-5 pt-0 border-t border-border/60 bg-surface/40 space-y-4">
                            
                            {/* Morning Block */}
                            <div className="p-3.5 rounded-xl bg-surface border border-border">
                              <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1">
                                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>{day.morning.time} — {day.morning.title}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-2">
                                {day.morning.description}
                              </p>
                              <div className="text-[11px] font-semibold text-accent flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3" aria-hidden="true" />
                                <span>Pro Tip: {day.morning.tip}</span>
                              </div>
                            </div>

                            {/* Afternoon Block */}
                            <div className="p-3.5 rounded-xl bg-surface border border-border">
                              <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1">
                                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>{day.afternoon.time} — {day.afternoon.title}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-2">
                                {day.afternoon.description}
                              </p>
                              <div className="text-[11px] font-semibold text-primary flex items-center gap-1.5 bg-primary/5 p-2 rounded-lg">
                                <Utensils className="w-3 h-3 text-accent flex-shrink-0" aria-hidden="true" />
                                <span>Gastronomy: {day.afternoon.culinaryHighlight}</span>
                              </div>
                            </div>

                            {/* Evening Block */}
                            <div className="p-3.5 rounded-xl bg-surface border border-border">
                              <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1">
                                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>{day.evening.time} — {day.evening.title}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-2">
                                {day.evening.description}
                              </p>
                              <div className="text-[11px] text-foreground/70 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-accent" aria-hidden="true" />
                                <span>Vantage point: {day.evening.sunsetSpot}</span>
                              </div>
                            </div>

                            {/* Transit Note */}
                            <div className="text-[11px] text-foreground/60 italic pl-1">
                              🚗 Transit: {day.localTransitTip}
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Cultural Protocol & Souvenirs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 shadow-xs space-y-3">
                    <div className="flex items-center gap-2.5 text-primary font-heading font-black text-sm sm:text-base uppercase tracking-wider pb-2 border-b border-primary/15">
                      <ShieldAlert className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <span>Cultural Etiquette Protocol</span>
                    </div>
                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-foreground/90 font-medium leading-relaxed">
                      {itinerary.culturalRules.map((rule, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 shadow-xs space-y-3">
                    <div className="flex items-center gap-2.5 text-accent font-heading font-black text-sm sm:text-base uppercase tracking-wider pb-2 border-b border-accent/15">
                      <Gift className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <span>Recommended GI Souvenirs</span>
                    </div>
                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-foreground/90 font-medium leading-relaxed">
                      {itinerary.recommendedSouvenirs.map((souvenir, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>{souvenir}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Final Call to Action */}
                <div className="p-6 sm:p-7 rounded-3xl bg-primary text-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg">
                  <div className="space-y-1">
                    <h4 className="font-heading font-extrabold text-lg sm:text-xl">
                      Want this itinerary curated into a full package?
                    </h4>
                    <p className="text-xs sm:text-sm text-surface/90 leading-relaxed max-w-xl">
                      Connect with certified local heritage historians and certified transport coordinators.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(itinerary.destination.name)}
                    className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-surface text-primary font-heading font-extrabold text-xs sm:text-sm hover:bg-background transition-colors flex-shrink-0 shadow-md text-center"
                  >
                    Request Custom Booking
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
