import { useState, useEffect, useId } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Compass, ShieldCheck } from 'lucide-react';
import { InquiryFormData, InquiryResponse } from '../types';
import { api } from '../services/api';

interface TravelerInquiryModalProps {
  isOpen: boolean;
  initialDestination?: string;
  onClose: () => void;
}

export function TravelerInquiryModal({
  isOpen,
  initialDestination = '',
  onClose,
}: TravelerInquiryModalProps) {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    destination: initialDestination || 'Agra & Golden Triangle',
    travelDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    travelersCount: 2,
    budgetTier: 'standard',
    specialRequests: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<InquiryResponse | null>(null);

  const fullNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const destinationId = useId();
  const travelDateId = useId();
  const travelersCountId = useId();
  const budgetTierId = useId();
  const specialRequestsId = useId();

  useEffect(() => {
    if (initialDestination) {
      setFormData((prev) => ({ ...prev, destination: initialDestination }));
    }
  }, [initialDestination]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill out all required contact information.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await api.submitInquiry(formData);
      setResponse(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-foreground/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-primary to-primary-dark text-surface flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface/15 flex items-center justify-center text-surface">
              <Compass className="w-6 h-6 stroke-[2]" aria-hidden="true" />
            </div>
            <div>
              <h2 id="inquiry-modal-title" className="text-xl sm:text-2xl font-heading font-black">
                Custom Travel & Guide Request
              </h2>
              <p className="text-xs sm:text-sm text-surface/80">
                Connect with certified cultural historians & authorized logistics coordinators
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg bg-surface/10 hover:bg-surface/20 text-surface transition-colors"
          >
            <X className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* Success Screen */}
          {response ? (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10 stroke-[2]" aria-hidden="true" />
              </div>
              <div className="inline-block px-3.5 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider">
                Reference Code: {response.referenceNumber}
              </div>
              <h3 className="text-2xl font-heading font-extrabold text-foreground">
                Inquiry Successfully Registered
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed max-w-lg mx-auto">
                {response.message}
              </p>

              <div className="p-4 rounded-xl bg-background border border-border text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span className="text-foreground/60">Destination:</span>
                  <span className="font-bold text-foreground">{response.details.destination}</span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-1.5">
                  <span className="text-foreground/60">Estimated Date:</span>
                  <span className="font-bold text-foreground">{response.details.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Travelers & Tier:</span>
                  <span className="font-bold text-foreground">
                    {response.details.travelers} Guests • {response.details.tier.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 rounded-xl bg-primary text-surface font-bold text-sm hover:bg-primary-dark transition-colors shadow-sm"
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {error && (
                <div className="p-4 rounded-xl bg-accent/10 border border-accent text-accent-hover text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={fullNameId} className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id={fullNameId}
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor={emailId} className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    required
                    placeholder="e.g. ananya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Phone & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={phoneId} className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                    Phone / WhatsApp Number <span className="text-accent">*</span>
                  </label>
                  <input
                    id={phoneId}
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor={destinationId} className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                    Destination or Circuit <span className="text-accent">*</span>
                  </label>
                  <input
                    id={destinationId}
                    type="text"
                    required
                    placeholder="e.g. Varanasi, Hampi, Golden Triangle"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Date, Travelers & Tier */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={travelDateId} className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                    Estimated Date
                  </label>
                  <input
                    id={travelDateId}
                    type="date"
                    required
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor={travelersCountId} className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                    Guests Count
                  </label>
                  <input
                    id={travelersCountId}
                    type="number"
                    min={1}
                    max={50}
                    value={formData.travelersCount}
                    onChange={(e) => setFormData({ ...formData, travelersCount: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary text-center font-bold"
                  />
                </div>

                <div>
                  <label htmlFor={budgetTierId} className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                    Service Tier
                  </label>
                  <select
                    id={budgetTierId}
                    value={formData.budgetTier}
                    onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value as InquiryFormData['budgetTier'] })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="budget">Budget Homestays</option>
                    <option value="standard">Standard Boutique</option>
                    <option value="premium">Premium Heritage</option>
                    <option value="bespoke">Bespoke Royal Palace</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label htmlFor={specialRequestsId} className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                  Special Interests / Dietary / Accessibility Requirements (Optional)
                </label>
                <textarea
                  id={specialRequestsId}
                  rows={3}
                  placeholder="e.g. Looking for authentic pure vegetarian cuisine, morning private boat ride in Varanasi, and wheel-chair accessible routes."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full p-3.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Trust Disclaimer */}
              <div className="flex items-center gap-2 text-[11px] text-foreground/70 bg-background p-3 rounded-xl border border-border">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span>Your privacy is protected. We will only contact you regarding your requested travel plan.</span>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-border bg-background text-foreground/80 hover:bg-border/30 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-2.5 rounded-xl bg-primary text-surface font-heading font-bold text-sm hover:bg-primary-dark transition-all duration-200 shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <span>Submit Travel Inquiry</span>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
