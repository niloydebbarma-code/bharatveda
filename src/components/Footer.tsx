import { useState } from 'react';
import { Compass, Mail, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail && subscribedEmail.includes('@')) {
      setIsSubscribed(true);
      setSubscribedEmail('');
    }
  };

  return (
    <footer className="bg-surface border-t border-border pt-16 pb-12 text-foreground">
      <div className="container-custom">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border">
          
          {/* Brand Bio & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Compass className="w-6 h-6 stroke-[2]" aria-hidden="true" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-foreground">
                Bharat<span className="text-primary">Veda</span>
              </span>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed max-w-sm">
              An independent cultural documentation and travel intelligence platform celebrating India's 5,000-year legacy of UNESCO monuments, living temple rituals, classical performing arts, and regional gastronomy.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-primary pt-2">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Dedicated to Responsible & Sustainable Heritage Tourism</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider">
              Heritage Atlas
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75">
              <li>
                <a href="#destinations" className="hover:text-primary transition-colors">
                  All Monuments
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-primary transition-colors">
                  UNESCO Inscribed Sites
                </a>
              </li>
              <li>
                <a href="#trails" className="hover:text-primary transition-colors">
                  Thematic Circuits
                </a>
              </li>
              <li>
                <a href="#culture" className="hover:text-primary transition-colors">
                  Sacred Temple Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Culture & Food (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider">
              Living Traditions
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/75">
              <li>
                <a href="#culture" className="hover:text-primary transition-colors">
                  Regional Gastronomy
                </a>
              </li>
              <li>
                <a href="#culture" className="hover:text-primary transition-colors">
                  Upcoming Festivals
                </a>
              </li>
              <li>
                <a href="#culture" className="hover:text-primary transition-colors">
                  Classical Dances
                </a>
              </li>
              <li>
                <a href="#states" className="hover:text-primary transition-colors">
                  All 28 States & UTs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Bulletin (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider">
              Cultural Dispatch
            </h3>
            <p className="text-xs text-foreground/75 leading-relaxed">
              Receive monthly historical essays, seasonal festival guides, and lesser-known ASI site travel guides.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>Subscribed to Monthly Heritage Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={subscribedEmail}
                    onChange={(e) => setSubscribedEmail(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to dispatch"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary hover:text-primary-dark"
                  >
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="text-[11px] text-foreground/60 flex items-center gap-1">
                  <Mail className="w-3 h-3" aria-hidden="true" />
                  <span>Curated with reverence. Zero spam.</span>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/60">
          <div>
            © {new Date().getFullYear()} BharatVeda Heritage Platform. All rights reserved.
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span>Preserving Cultural Legacies for Generations</span>
            <Heart className="w-3.5 h-3.5 text-accent fill-accent ml-1" aria-hidden="true" />
          </div>
        </div>

      </div>
    </footer>
  );
}
