import { useState, useEffect, useId } from 'react';
import {
  Wallet,
  Calculator,
  Loader2,
  Train,
  Plane,
  Car,
  CheckCircle2,
  AlertCircle,
  Utensils,
  Hotel,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { Destination, CostCalculationResult, CostCalculationRequest } from '../types';
import { api } from '../services/api';

interface TravelCostCalculatorProps {
  currentDestination: Destination;
  allDestinations: Destination[];
  onDestinationChange: (destId: string) => void;
  onBookInquiry: (destinationName: string) => void;
}

export function TravelCostCalculator({
  currentDestination,
  allDestinations,
  onDestinationChange,
  onBookInquiry,
}: TravelCostCalculatorProps) {
  const [startingCity, setStartingCity] = useState('New Delhi');
  const [destinationId, setDestinationId] = useState(currentDestination.id);
  const [travelersCount, setTravelersCount] = useState(2);
  const [daysCount, setDaysCount] = useState(3);
  const [travelStyle, setTravelStyle] = useState<CostCalculationRequest['travelStyle']>('standard');
  const [transitMode, setTransitMode] = useState<CostCalculationRequest['transitMode']>('train');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<CostCalculationResult | null>(null);

  const startCityId = useId();
  const destSelectId = useId();

  // Sync if prop changes
  useEffect(() => {
    setDestinationId(currentDestination.id);
  }, [currentDestination.id]);

  // Run calculation on change or trigger
  const runCalculation = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.calculateTripCost({
        startingCity,
        destinationId,
        travelersCount,
        daysCount,
        travelStyle,
        transitMode,
      });
      setEstimate(res.estimate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate trip estimate.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runCalculation();
  }, [startingCity, destinationId, travelersCount, daysCount, travelStyle, transitMode]);

  const startingCities = [
    'New Delhi',
    'Mumbai',
    'Bengaluru',
    'Kolkata',
    'Chennai',
    'Hyderabad',
    'Ahmedabad',
    'Pune',
  ];

  return (
    <div id="cost-calculator" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <Calculator className="w-4 h-4 text-accent" aria-hidden="true" />
            <span>Interactive Travel Cost Estimator</span>
          </div>
          <h3 className="text-2xl font-heading font-extrabold text-foreground">
            Estimate Your {currentDestination.name} Travel Budget
          </h3>
          <p className="text-xs sm:text-sm text-foreground/70">
            Real-time breakdown of transport, heritage stays, authentic dining, and monument entry passes.
          </p>
        </div>

        <div className="text-xs text-foreground/60 bg-background px-3 py-1.5 rounded-lg border border-border">
          Regional Rates Benchmark 2026
        </div>
      </div>

      {/* Input Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        
        {/* Starting City */}
        <div>
          <label htmlFor={startCityId} className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1.5">
            1. Starting City
          </label>
          <div className="relative">
            <select
              id={startCityId}
              value={startingCity}
              onChange={(e) => setStartingCity(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            >
              {startingCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-foreground/40 absolute right-3 top-3 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        {/* Destination Selector */}
        <div>
          <label htmlFor={destSelectId} className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1.5">
            2. Destination
          </label>
          <div className="relative">
            <select
              id={destSelectId}
              value={destinationId}
              onChange={(e) => {
                setDestinationId(e.target.value);
                onDestinationChange(e.target.value);
              }}
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            >
              {allDestinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-foreground/40 absolute right-3 top-3 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        {/* Travelers Count */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1.5">
            3. Travelers ({travelersCount})
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 4, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setTravelersCount(num)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  travelersCount === num
                    ? 'bg-primary text-surface shadow-sm'
                    : 'bg-background border border-border text-foreground hover:bg-border/40'
                }`}
              >
                {num} {num === 1 ? 'Solo' : 'Pax'}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Days */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1.5">
            4. Duration ({daysCount} Days)
          </label>
          <div className="flex items-center gap-2">
            {[2, 3, 5, 7].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setDaysCount(num)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  daysCount === num
                    ? 'bg-primary text-surface shadow-sm'
                    : 'bg-background border border-border text-foreground hover:bg-border/40'
                }`}
              >
                {num} Days
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Style & Transit Toggle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
        {/* Style Tier */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
            5. Travel & Comfort Style
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'budget', label: 'Budget Friendly', desc: 'Homestays & Autos' },
              { id: 'standard', label: 'Standard Comfort', desc: 'Boutique & Cabs' },
              { id: 'premium', label: 'Royal Luxury', desc: 'Palace Stays & Chauffeur' },
            ].map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setTravelStyle(tier.id as CostCalculationRequest['travelStyle'])}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  travelStyle === tier.id
                    ? 'bg-accent/15 border-accent text-accent font-bold shadow-sm'
                    : 'bg-background border border-border text-foreground/80 hover:bg-border/30'
                }`}
              >
                <div className="text-xs font-bold">{tier.label}</div>
                <div className="text-[10px] text-foreground/60">{tier.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Transit Mode */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
            6. Intercity Transit Mode
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'train', label: 'High-Speed Rail', icon: Train },
              { id: 'flight', label: 'Domestic Flight', icon: Plane },
              { id: 'road', label: 'Highway Cab', icon: Car },
            ].map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setTransitMode(mode.id as CostCalculationRequest['transitMode'])}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    transitMode === mode.id
                      ? 'bg-primary text-surface border-primary shadow-sm'
                      : 'bg-background border border-border text-foreground hover:bg-border/30'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loading & Error */}
      {loading && (
        <div className="py-8 text-center">
          <Loader2 className="w-6 h-6 text-primary animate-spin mx-auto mb-2" aria-hidden="true" />
          <span className="text-xs font-medium text-foreground/60">Calculating 2026 tariff estimate...</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-accent/10 border border-accent text-xs text-accent mt-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {/* Estimate Results Display */}
      {!loading && estimate && (
        <div className="mt-8 pt-6 border-t border-border space-y-6 animate-fadeIn">
          
          {/* Total Highlight Bar */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-1">
                Total Estimated Trip Cost ({estimate.travelersCount} Travelers • {estimate.daysCount} Days)
              </span>
              <div className="text-3xl sm:text-4xl font-heading font-black text-foreground">
                ₹{estimate.totalEstimatedCostINR.toLocaleString('en-IN')}{' '}
                <span className="text-sm font-semibold text-foreground/60">
                  (₹{estimate.perPersonEstimatedCostINR.toLocaleString('en-IN')} / person)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onBookInquiry(estimate.destinationName)}
              className="px-6 py-3 rounded-xl bg-primary text-surface font-heading font-bold text-xs sm:text-sm hover:bg-primary-dark transition-all duration-200 shadow-sm flex items-center gap-2 flex-shrink-0"
            >
              <Wallet className="w-4 h-4" aria-hidden="true" />
              <span>Book Custom Plan with This Budget</span>
            </button>
          </div>

          {/* Detailed Item Breakdown Cards (5 Categories) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            {/* Transit */}
            <div className="p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-primary mb-1">
                <span className="flex items-center gap-1.5">
                  <Train className="w-4 h-4" aria-hidden="true" />
                  {estimate.breakdown.intercityTransit.category}
                </span>
                <span className="font-extrabold text-foreground text-sm">
                  ₹{estimate.breakdown.intercityTransit.estimatedCostINR.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {estimate.breakdown.intercityTransit.description}
              </p>
            </div>

            {/* Accommodation */}
            <div className="p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-primary mb-1">
                <span className="flex items-center gap-1.5">
                  <Hotel className="w-4 h-4" aria-hidden="true" />
                  {estimate.breakdown.accommodation.category}
                </span>
                <span className="font-extrabold text-foreground text-sm">
                  ₹{estimate.breakdown.accommodation.estimatedCostINR.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {estimate.breakdown.accommodation.description}
              </p>
            </div>

            {/* Dining */}
            <div className="p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-primary mb-1">
                <span className="flex items-center gap-1.5">
                  <Utensils className="w-4 h-4" aria-hidden="true" />
                  {estimate.breakdown.diningAndStreetFood.category}
                </span>
                <span className="font-extrabold text-foreground text-sm">
                  ₹{estimate.breakdown.diningAndStreetFood.estimatedCostINR.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {estimate.breakdown.diningAndStreetFood.description}
              </p>
            </div>

            {/* Monuments */}
            <div className="p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-primary mb-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  {estimate.breakdown.monumentsAndGuides.category}
                </span>
                <span className="font-extrabold text-foreground text-sm">
                  ₹{estimate.breakdown.monumentsAndGuides.estimatedCostINR.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {estimate.breakdown.monumentsAndGuides.description}
              </p>
            </div>

            {/* Local Transit */}
            <div className="p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-primary mb-1">
                <span className="flex items-center gap-1.5">
                  <Car className="w-4 h-4" aria-hidden="true" />
                  {estimate.breakdown.localCityTransit.category}
                </span>
                <span className="font-extrabold text-foreground text-sm">
                  ₹{estimate.breakdown.localCityTransit.estimatedCostINR.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {estimate.breakdown.localCityTransit.description}
              </p>
            </div>

          </div>

          {/* Important Transparent Disclaimer */}
          <div className="p-3.5 rounded-xl bg-background border border-border text-xs text-foreground/70 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              <strong>Estimate Transparency: </strong>
              {estimate.disclaimer}
            </span>
          </div>

        </div>
      )}
    </div>
  );
}
