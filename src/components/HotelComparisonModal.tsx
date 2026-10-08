import { useEffect } from 'react';
import { X, Check, Star, MapPin, Building } from 'lucide-react';
import { HotelProperty } from '../types';

interface HotelComparisonModalProps {
  hotels: HotelProperty[];
  onClose: () => void;
  onSelectHotel: (hotel: HotelProperty) => void;
  onRemoveFromCompare: (hotelId: string) => void;
}

export function HotelComparisonModal({
  hotels,
  onClose,
  onSelectHotel,
  onRemoveFromCompare,
}: HotelComparisonModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (hotels.length > 0) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hotels, onClose]);

  if (hotels.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-foreground/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-background border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Building className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id="compare-modal-title" className="font-heading font-extrabold text-lg text-foreground">
                Compare Stays ({hotels.length} Selected)
              </h3>
              <span className="text-xs text-foreground/60">
                Side-by-side comparison of ratings, prices, landmark proximity, and facilities
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison"
            className="p-1.5 rounded-lg text-foreground/60 hover:text-foreground hover:bg-surface border border-border"
          >
            <X className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>

        {/* Comparison Table Grid */}
        <div className="p-6 overflow-x-auto max-h-[75vh]">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 font-bold text-foreground/60 uppercase tracking-wider w-1/4">
                  Feature / Property
                </th>
                {hotels.map((h) => (
                  <th key={h.id} className="p-3 w-1/3 align-top">
                    <div className="space-y-2">
                      <div className="relative h-28 rounded-xl overflow-hidden">
                        <img
                          src={h.heroImage}
                          alt={h.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                          }}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveFromCompare(h.id)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-foreground/70 text-surface hover:bg-foreground"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-foreground line-clamp-1">{h.name}</h4>
                      <div className="text-[11px] text-foreground/70 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" aria-hidden="true" />
                        <span>{h.city}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              
              {/* Star Rating & Reviews */}
              <tr>
                <td className="p-3 font-semibold text-foreground/70">Rating & Score</td>
                {hotels.map((h) => (
                  <td key={h.id} className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-primary text-surface font-extrabold text-xs">
                        {h.reviewScore}
                      </span>
                      <span className="text-xs font-bold text-foreground">{h.reviewScoreWord}</span>
                    </div>
                    <div className="text-[11px] text-foreground/60 mt-0.5">
                      {h.starRating} Stars • ({h.reviewsCount.toLocaleString('en-IN')} reviews)
                    </div>
                  </td>
                ))}
              </tr>

              {/* Price / Night */}
              <tr>
                <td className="p-3 font-semibold text-foreground/70">Starting Price</td>
                {hotels.map((h) => (
                  <td key={h.id} className="p-3">
                    <span className="text-base font-heading font-black text-primary">
                      ₹{h.rooms[0]?.pricePerNightINR.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-foreground/60"> / night</span>
                  </td>
                ))}
              </tr>

              {/* Landmark Distance */}
              <tr>
                <td className="p-3 font-semibold text-foreground/70">Landmark Distance</td>
                {hotels.map((h) => (
                  <td key={h.id} className="p-3 text-xs font-semibold text-foreground">
                    📍 {h.landmarkDistance}
                  </td>
                ))}
              </tr>

              {/* Free Breakfast */}
              <tr>
                <td className="p-3 font-semibold text-foreground/70">Breakfast Option</td>
                {hotels.map((h) => {
                  const hasBreakfast = h.rooms.some((r) => r.breakfastIncluded);
                  return (
                    <td key={h.id} className="p-3">
                      {hasBreakfast ? (
                        <span className="text-primary font-bold flex items-center gap-1 text-xs">
                          <Check className="w-4 h-4" aria-hidden="true" />
                          <span>Breakfast Included</span>
                        </span>
                      ) : (
                        <span className="text-foreground/50 text-xs">— Available for purchase</span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Free Cancellation */}
              <tr>
                <td className="p-3 font-semibold text-foreground/70">Cancellation Policy</td>
                {hotels.map((h) => {
                  const hasFreeCancel = h.rooms.some((r) => r.freeCancellation);
                  return (
                    <td key={h.id} className="p-3 text-xs">
                      {hasFreeCancel ? (
                        <span className="text-accent font-bold flex items-center gap-1">
                          <Check className="w-4 h-4" aria-hidden="true" />
                          <span>Free Cancellation</span>
                        </span>
                      ) : (
                        <span className="text-foreground/60">Non-refundable</span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Key Facilities */}
              <tr>
                <td className="p-3 font-semibold text-foreground/70">Top Amenities</td>
                {hotels.map((h) => (
                  <td key={h.id} className="p-3 text-xs text-foreground/80">
                    <div className="space-y-1">
                      {h.facilities.slice(0, 4).map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1 capitalize">
                          <Star className="w-3 h-3 text-accent fill-accent" aria-hidden="true" />
                          <span>{f.replace('frontdesk24', '24h Reception')}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Action Button */}
              <tr>
                <td className="p-3 font-semibold text-foreground/70">Select</td>
                {hotels.map((h) => (
                  <td key={h.id} className="p-3">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectHotel(h);
                        onClose();
                      }}
                      className="w-full py-2.5 rounded-xl bg-primary text-surface font-bold text-xs hover:bg-primary-dark transition-colors shadow-sm"
                    >
                      View Rooms & Book
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
