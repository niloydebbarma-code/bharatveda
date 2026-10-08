import { useEffect } from 'react';
import { X, MapPin, Calendar, Compass, ShieldCheck, Utensils, Plane, Train, Car, Lightbulb, AlertCircle } from 'lucide-react';
import { Destination } from '../types';

interface HeritageDetailsModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanTrip: (destinationId: string) => void;
}

export function HeritageDetailsModal({
  destination,
  onClose,
  onPlanTrip,
}: HeritageDetailsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (destination) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [destination, onClose]);

  if (!destination) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-destination-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-foreground/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden flex-shrink-0">
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
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
          
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details modal"
            className="absolute top-4 right-4 p-2.5 rounded-full bg-surface/80 hover:bg-surface text-foreground transition-all duration-200 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>

          {/* Title on Image */}
          <div className="absolute bottom-6 left-6 right-6 text-surface">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary text-surface text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                {destination.state} ({destination.region.toUpperCase()})
              </span>
              {destination.isUnesco && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-surface text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  UNESCO World Heritage ({destination.unescoYear})
                </span>
              )}
            </div>
            <h2 id="modal-destination-title" className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-surface">
              {destination.name}
            </h2>
            <p className="text-surface/90 text-sm sm:text-base font-medium mt-1">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Overview Section */}
          <section>
            <h3 className="text-lg font-heading font-bold text-foreground mb-2">Historical Overview</h3>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
              {destination.description}
            </p>
            <div className="mt-3 p-4 rounded-xl bg-background border border-border">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                Epoch & Dynastic History
              </span>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                {destination.historySummary}
              </p>
            </div>
          </section>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-1">
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>Architecture</span>
              </div>
              <p className="text-xs text-foreground/80 font-medium">
                {destination.architecturalStyle}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-1">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Best Season</span>
              </div>
              <p className="text-xs text-foreground/80 font-medium">
                {destination.bestTimeToVisit}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-1">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>ASI Entry Fee</span>
              </div>
              <p className="text-xs text-foreground/80 font-medium">
                Indian: {destination.entryFee.indianNational}
                <br />
                Foreign: {destination.entryFee.foreignNational}
              </p>
            </div>
          </div>

          {/* Key Attractions */}
          <section>
            <h3 className="text-lg font-heading font-bold text-foreground mb-3">Key Monuments & Attractions</h3>
            <div className="flex flex-wrap gap-2">
              {destination.keyAttractions.map((attraction, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-primary/30 text-primary text-xs sm:text-sm font-semibold"
                >
                  {attraction}
                </span>
              ))}
            </div>
          </section>

          {/* Regional Cuisines to Savor */}
          <section>
            <h3 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-accent" aria-hidden="true" />
              <span>Authentic Local Gastronomy</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.localCuisine.map((dish, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-background border border-border text-xs sm:text-sm text-foreground/80 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-medium">{dish}</span>
                </div>
              ))}
            </div>
          </section>

          {/* How to Reach & Transport Connectivity */}
          <section>
            <h3 className="text-lg font-heading font-bold text-foreground mb-3">Transit & Accessibility Guide</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border">
                <Plane className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <strong className="text-foreground">By Air: </strong>
                  <span className="text-foreground/80">{destination.howToReach.nearestAirport}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border">
                <Train className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <strong className="text-foreground">By Rail: </strong>
                  <span className="text-foreground/80">{destination.howToReach.nearestRailway}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border">
                <Car className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <strong className="text-foreground">By Road: </strong>
                  <span className="text-foreground/80">{destination.howToReach.roadConnectivity}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Insider Tip & Cultural Etiquette */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider mb-1">
                <Lightbulb className="w-4 h-4" aria-hidden="true" />
                <span>Traveler Insider Tip</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                {destination.insiderTip}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>Cultural Etiquette</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                {destination.culturalEtiquette}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-background border-t border-border flex items-center justify-between gap-4 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-surface border border-border text-foreground/80 font-medium text-sm hover:bg-background transition-colors"
          >
            Close Guide
          </button>
          
          <button
            type="button"
            onClick={() => {
              onPlanTrip(destination.id);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-surface font-semibold text-sm hover:bg-primary-dark transition-all duration-200 shadow-sm"
          >
            <Compass className="w-4 h-4 stroke-[2]" aria-hidden="true" />
            <span>Generate Itinerary for {destination.name}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
