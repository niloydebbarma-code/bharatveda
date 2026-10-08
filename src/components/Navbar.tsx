import { useState, useEffect } from 'react';
import {
  Compass,
  Menu,
  X,
  Landmark,
  Building,
  MapPin,
  Utensils,
  Route,
  CalendarDays,
  Bookmark,
  Calculator,
  Languages,
  ChevronDown
} from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { useLanguage, LanguageCode } from '../context/LanguageContext';

interface NavbarProps {
  onOpenInquiry: (destinationName?: string) => void;
  onOpenSavedPlaces: () => void;
}

export function Navbar({ onOpenInquiry, onOpenSavedPlaces }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { savedCount } = useBookmarks();
  const { language, setLanguage, t, availableLanguages, currentLanguageOption } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.destinations'), href: '#destinations', icon: Landmark },
    { label: t('nav.stays'), href: '#stays', icon: Building },
    { label: t('nav.states'), href: '#states', icon: MapPin },
    { label: t('nav.planner'), href: '#planner', icon: CalendarDays },
    { label: t('nav.costCalculator'), href: '#cost-calculator', icon: Calculator },
    { label: t('nav.culture'), href: '#culture', icon: Utensils },
    { label: t('nav.trails'), href: '#trails', icon: Route },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-surface border-b border-border'
      }`}
    >
      <div className="container-custom flex items-center justify-between gap-2 min-h-20 py-2">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-colors duration-200">
            <Compass className="w-6 h-6 stroke-[2]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <span className="font-heading font-extrabold text-xl tracking-tight text-foreground block break-words">
              Bharat<span className="text-primary">Veda</span>
            </span>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-foreground/60 block -mt-1 font-sans">
              Indian Heritage & Travel Platform
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-2 min-w-0" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold text-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1.5 py-1"
              >
                <Icon className="w-3.5 h-3.5 text-primary/70" aria-hidden="true" />
                <span className="text-center break-words">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Buttons, Language Selector & Bookmarks */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="px-2.5 py-2 rounded-xl border border-border bg-background hover:bg-surface text-foreground/80 hover:text-foreground text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
              aria-label="Select Language"
              aria-expanded={langMenuOpen}
            >
              <Languages className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span>{currentLanguageOption.nativeName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-foreground/40" aria-hidden="true" />
            </button>

            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-surface rounded-2xl shadow-xl border border-border py-1.5 z-50 animate-fadeIn">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground/50 border-b border-border/60 mb-1">
                  Select Language
                </div>
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code as LanguageCode);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-background transition-colors ${
                      language === lang.code ? 'text-primary bg-primary/10 font-bold' : 'text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </div>
                    <span className="text-[10px] text-foreground/50 font-normal">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saved Places Button */}
          <button
            type="button"
            onClick={onOpenSavedPlaces}
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-border bg-background hover:bg-surface text-foreground/80 hover:text-primary transition-colors relative flex items-center gap-1.5 text-xs font-bold"
            title="View Saved Places"
          >
            <Bookmark className={`w-4 h-4 ${savedCount > 0 ? 'fill-primary text-primary' : ''}`} aria-hidden="true" />
            <span className="hidden sm:inline">{t('nav.saved')}</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-accent text-white text-[10px] font-black flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Plan Custom Trip CTA */}
          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary text-white font-heading font-bold text-xs hover:bg-primary-dark transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap"
          >
            {t('nav.planCustomTrip')}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            className="max-w-[38vw] truncate bg-background border border-border text-foreground text-xs font-bold rounded-lg px-2 py-1.5"
            aria-label="Select Language"
          >
            {availableLanguages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.nativeName}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onOpenSavedPlaces}
            className="p-2 rounded-lg border border-border bg-background text-foreground/80 relative"
            aria-label="View Saved Places"
          >
            <Bookmark className={`w-5 h-5 ${savedCount > 0 ? 'fill-primary text-primary' : ''}`} aria-hidden="true" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-surface text-[9px] font-black flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-surface px-4 py-6 shadow-lg animate-fadeIn">
          <nav className="flex flex-col gap-2.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-background hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{link.label}</span>
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-border flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 rounded-xl bg-primary text-surface font-bold text-xs hover:bg-primary-dark transition-colors text-center"
              >
                {t('nav.planCustomTrip')}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
