import { useState, useEffect, useId } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Printer,
  ChevronRight,
  ExternalLink,
  MapPin,
  Star
} from 'lucide-react';
import { HotelProperty, RoomOption, HotelBookingConfirmation } from '../types';
import { api } from '../services/api';

interface HotelBookingModalProps {
  hotel: HotelProperty | null;
  room: RoomOption | null;
  checkInDate: string;
  checkOutDate: string;
  adultsCount: number;
  roomsCount: number;
  onClose: () => void;
  onAddStayToItinerary?: (hotel: HotelProperty, confirmation: HotelBookingConfirmation) => void;
}

export function HotelBookingModal({
  hotel,
  room,
  checkInDate,
  checkOutDate,
  adultsCount,
  roomsCount,
  onClose,
  onAddStayToItinerary,
}: HotelBookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Details & Guest info, 2: Payment & Review, 3: Confirmed Voucher

  // Guest details form state
  const [guestFullName, setGuestFullName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'pay_at_hotel'>('upi');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<HotelBookingConfirmation | null>(null);

  const fullNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const specialReqId = useId();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (hotel && room) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hotel, room, onClose]);

  if (!hotel || !room) return null;

  // Nights calculation
  const d1 = new Date(checkInDate).getTime();
  const d2 = new Date(checkOutDate).getTime();
  const nights = Math.max(1, Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24))) || 1;

  const baseRoomTotal = room.pricePerNightINR * nights * roomsCount;
  const gstRate = baseRoomTotal > 7500 ? 0.18 : 0.12;
  const taxesAndGst = Math.round(baseRoomTotal * gstRate);
  const serviceCharge = Math.round(baseRoomTotal * 0.03);
  const discount = room.originalPricePerNightINR
    ? (room.originalPricePerNightINR - room.pricePerNightINR) * nights * roomsCount
    : 0;
  const grandTotalINR = baseRoomTotal + taxesAndGst + serviceCharge;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestFullName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
      setError('Please provide your full name, email, and phone number.');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleConfirmReservation = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.bookHotelRoom({
        hotelId: hotel.id,
        roomId: room.roomId,
        checkInDate,
        checkOutDate,
        adultsCount,
        childrenCount: 0,
        roomsCount,
        guestFullName,
        guestEmail,
        guestPhone,
        specialRequests,
        paymentMethod,
      });
      setConfirmation(res);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reservation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-foreground/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-primary to-primary-dark text-surface flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface/15 flex items-center justify-center text-surface">
              <Building className="w-6 h-6 stroke-[2]" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-accent">
                {step === 3 ? 'Reservation Confirmed' : `Step ${step} of 2 • Hotel Reservation`}
              </span>
              <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-heading font-black">
                {hotel.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking modal"
            className="p-2 rounded-lg bg-surface/10 hover:bg-surface/20 text-surface transition-colors"
          >
            <X className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Guest Information & Stay Summary */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              
              {/* Stay Summary Card */}
              <div className="p-4 rounded-2xl bg-background border border-border space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-base text-foreground">
                      {room.name}
                    </h3>
                    <p className="text-xs text-foreground/70">
                      {hotel.landmarkDistance} • {hotel.city}, {hotel.state}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-primary px-2.5 py-1 rounded bg-primary/10">
                    {room.bedType}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-border/60 text-xs">
                  <div>
                    <span className="text-foreground/60 block">Check-in:</span>
                    <strong className="text-foreground">{checkInDate}</strong>
                  </div>
                  <div>
                    <span className="text-foreground/60 block">Check-out:</span>
                    <strong className="text-foreground">{checkOutDate}</strong>
                  </div>
                  <div>
                    <span className="text-foreground/60 block">Duration & Guests:</span>
                    <strong className="text-foreground">
                      {nights} Night{nights > 1 ? 's' : ''} • {adultsCount} Adults ({roomsCount} Room)
                    </strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                  {room.breakfastIncluded && (
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                      ✓ Breakfast Included
                    </span>
                  )}
                  {room.freeCancellation && (
                    <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-semibold">
                      ✓ Free Cancellation ({room.cancellationDeadlineDays} days before)
                    </span>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-accent/10 border border-accent text-accent text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              {/* Guest Details Form */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Guest Contact Details
                </h4>

                <div>
                  <label htmlFor={fullNameId} className="block text-xs font-bold text-foreground mb-1">
                    Primary Guest Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id={fullNameId}
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Rathore"
                    value={guestFullName}
                    onChange={(e) => setGuestFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={emailId} className="block text-xs font-bold text-foreground mb-1">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      required
                      placeholder="e.g. vikram@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor={phoneId} className="block text-xs font-bold text-foreground mb-1">
                      Phone Number (for SMS & WhatsApp Voucher) <span className="text-accent">*</span>
                    </label>
                    <input
                      id={phoneId}
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={specialReqId} className="block text-xs font-bold text-foreground mb-1">
                    Special Requests (Optional)
                  </label>
                  <input
                    id={specialReqId}
                    type="text"
                    placeholder="e.g. Early check-in requested, high floor room, airport pickup"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-xl text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="text-xs text-foreground/70">
                  Total for {nights} Night{nights > 1 ? 's' : ''}:{' '}
                  <strong className="text-foreground text-sm">
                    ₹{grandTotalINR.toLocaleString('en-IN')}
                  </strong>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-surface font-heading font-bold text-xs sm:text-sm hover:bg-primary-dark transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Review & Payment</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: Price Breakdown & Payment Mode */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Detailed Itemized Price Breakdown */}
              <div className="p-5 rounded-2xl bg-background border border-border space-y-3">
                <h4 className="font-heading font-bold text-sm text-foreground pb-2 border-b border-border">
                  Price Breakdown ({nights} Night{nights > 1 ? 's' : ''} • {roomsCount} Room)
                </h4>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-foreground/80">
                    <span>
                      Room Rate (₹{room.pricePerNightINR.toLocaleString('en-IN')} × {nights} nights × {roomsCount} room)
                    </span>
                    <span className="font-semibold text-foreground">
                      ₹{baseRoomTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-accent font-semibold">
                      <span>Special Promotional Offer</span>
                      <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-foreground/70 text-xs">
                    <span>Taxes & GST ({gstRate * 100}%)</span>
                    <span>₹{taxesAndGst.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-foreground/70 text-xs">
                    <span>Property Service & Tourism Fee</span>
                    <span>₹{serviceCharge.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-border font-heading font-black text-base text-foreground">
                    <span>Total Stay Amount</span>
                    <span className="text-primary">
                      ₹{grandTotalINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Cancellation Guarantee */}
                <div className="pt-2 text-xs text-foreground/70 flex items-center gap-1.5 bg-surface p-2.5 rounded-xl border border-border">
                  <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>
                    {room.freeCancellation
                      ? `Free cancellation available until ${room.cancellationDeadlineDays} days prior to check-in date.`
                      : 'Non-refundable booking tier.'}
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Select Payment Option
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'upi'
                        ? 'bg-primary/10 border-primary ring-2 ring-primary'
                        : 'bg-background border-border hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <QrCode className="w-5 h-5 text-primary" aria-hidden="true" />
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="w-4 h-4 text-primary"
                      />
                    </div>
                    <div>
                      <strong className="text-xs block text-foreground">UPI / QR Code</strong>
                      <span className="text-[10px] text-foreground/60">GPay, PhonePe, Paytm</span>
                    </div>
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'card'
                        ? 'bg-primary/10 border-primary ring-2 ring-primary'
                        : 'bg-background border-border hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-5 h-5 text-primary" aria-hidden="true" />
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-primary"
                      />
                    </div>
                    <div>
                      <strong className="text-xs block text-foreground">Credit / Debit Card</strong>
                      <span className="text-[10px] text-foreground/60">Visa, Mastercard, RuPay</span>
                    </div>
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'pay_at_hotel'
                        ? 'bg-primary/10 border-primary ring-2 ring-primary'
                        : 'bg-background border-border hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Building className="w-5 h-5 text-primary" aria-hidden="true" />
                      <input
                        type="radio"
                        name="payment"
                        value="pay_at_hotel"
                        checked={paymentMethod === 'pay_at_hotel'}
                        onChange={() => setPaymentMethod('pay_at_hotel')}
                        className="w-4 h-4 text-primary"
                      />
                    </div>
                    <div>
                      <strong className="text-xs block text-foreground">Pay at Property</strong>
                      <span className="text-[10px] text-foreground/60">Pay on Check-in</span>
                    </div>
                  </label>
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-accent/10 border border-accent text-accent text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              {/* Step 2 Actions */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-foreground/70 hover:text-foreground"
                >
                  ← Back to Details
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleConfirmReservation}
                  className="px-8 py-3 rounded-xl bg-primary text-surface font-heading font-bold text-xs sm:text-sm hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Confirming Reservation...</span>
                    </>
                  ) : (
                    <span>Confirm & Book (₹{grandTotalINR.toLocaleString('en-IN')})</span>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Confirmed Voucher Screen */}
          {step === 3 && confirmation && (
            <div className="text-center py-4 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10 stroke-[2]" aria-hidden="true" />
              </div>

              <div className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-extrabold uppercase tracking-wider">
                Booking Reference: {confirmation.bookingReference}
              </div>

              <div>
                <h3 className="text-2xl font-heading font-black text-foreground">
                  Your Stay is Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-foreground/70 mt-1 max-w-md mx-auto">
                  A confirmation SMS & email have been dispatched to{' '}
                  <strong>{confirmation.stayDetails.guestEmail}</strong>.
                </p>
              </div>

              {/* Voucher Box */}
              <div className="p-5 rounded-2xl bg-background border border-border text-left space-y-3 max-w-lg mx-auto text-xs">
                <div className="flex items-start justify-between border-b border-border/60 pb-2">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-foreground">
                      {confirmation.hotel.name}
                    </h4>
                    <div className="text-[11px] text-foreground/70 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-primary" aria-hidden="true" />
                      <span>{confirmation.hotel.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-accent font-bold">
                    <Star className="w-3.5 h-3.5 fill-accent" aria-hidden="true" />
                    <span>{confirmation.hotel.reviewScore}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-foreground/80">
                  <div>
                    <span className="text-foreground/50 block">Dates:</span>
                    <strong>{confirmation.stayDetails.checkInDate} → {confirmation.stayDetails.checkOutDate} ({confirmation.stayDetails.nights} Nights)</strong>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Room & Bed:</span>
                    <strong>{confirmation.room.name} ({confirmation.room.bedType})</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/60 pt-2 font-bold">
                  <span>Total Paid / Due:</span>
                  <span className="text-primary text-sm font-extrabold">
                    ₹{confirmation.pricingBreakdown.grandTotalINR.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Actions: Print & Add to Itinerary */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintVoucher}
                  className="px-5 py-2.5 rounded-xl bg-surface border border-border text-foreground font-bold text-xs hover:bg-border/30 flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  <span>Print Booking Voucher</span>
                </button>

                {onAddStayToItinerary && (
                  <button
                    type="button"
                    onClick={() => {
                      onAddStayToItinerary(hotel, confirmation);
                      onClose();
                    }}
                    className="px-6 py-2.5 rounded-xl bg-accent text-surface font-bold text-xs hover:bg-accent-hover transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <span>Connect Stay to Itinerary</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-primary text-surface font-bold text-xs hover:bg-primary-dark transition-colors"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
