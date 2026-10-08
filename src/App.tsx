import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationExplorer } from './components/DestinationExplorer';
import { DestinationDetailExperience } from './components/DestinationDetailExperience';
import { StaysMarketplace } from './components/StaysMarketplace';
import { StatesExplorer } from './components/StatesExplorer';
import { SmartItineraryPlanner } from './components/SmartItineraryPlanner';
import { CultureAndCuisines } from './components/CultureAndCuisines';
import { TravelExperienceTrails } from './components/TravelExperienceTrails';
import { PracticalTravelGuide } from './components/PracticalTravelGuide';
import { TravelerInquiryModal } from './components/TravelerInquiryModal';
import { SavedPlacesDrawer } from './components/SavedPlacesDrawer';
import { UniversalLocationExplorer } from './components/UniversalLocationExplorer';
import { AITravelAssistantChat } from './components/AITravelAssistantChat';
import { Footer } from './components/Footer';
import { BookmarkProvider } from './context/BookmarkContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Destination, HotelProperty, HotelBookingConfirmation } from './types';
import { api } from './services/api';
import { MapPin, Sparkles } from 'lucide-react';

function MainAppContent() {
  const { t } = useLanguage();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [universalSearchQuery, setUniversalSearchQuery] = useState<string | null>(null);
  const [inquiryDestination, setInquiryDestination] = useState<string>('');
  const [plannerDestinationId, setPlannerDestinationId] = useState<string>('agra-taj-mahal');

  const scrollToSection = (id: string) => {
    let attempts = 0;
    const scroll = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (attempts < 2) {
        attempts += 1;
        window.requestAnimationFrame(scroll);
      }
    };

    window.requestAnimationFrame(scroll);
  };

  const scrollToDestinationExperience = () => {
    scrollToSection('destination-experience');
  };

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const res = await api.getDestinations();
        setDestinations(res.destinations);
        const agra = res.destinations.find((d) => d.id === 'agra-taj-mahal') || res.destinations[0];
        if (agra) {
          setActiveDestination(agra);
        }
      } catch (err) {
        console.error('Failed to load initial destinations:', err);
      }
    };
    loadDestinations();
  }, []);

  const handleOpenInquiry = (destinationName?: string) => {
    setInquiryDestination(destinationName || activeDestination?.name || 'Agra & Golden Triangle');
    setInquiryModalOpen(true);
  };

  const handlePlanDestination = (destinationId: string) => {
    setPlannerDestinationId(destinationId);
    const dest = destinations.find((d) => d.id === destinationId);
    if (dest) {
      setActiveDestination(dest);
    }
    scrollToSection('planner');
  };

  const handleSelectDestinationById = (destId: string) => {
    const dest = destinations.find((d) => d.id === destId);
    if (dest) {
      setActiveDestination(dest);
      setPlannerDestinationId(dest.id);
      scrollToDestinationExperience();
    }
  };

  const handleExploreDestination = (dest: Destination) => {
    setActiveDestination(dest);
    setPlannerDestinationId(dest.id);
    scrollToDestinationExperience();
  };

  const handleStateSelect = (stateName: string) => {
    const matched = destinations.find(
      (d) => d.state.toLowerCase().includes(stateName.toLowerCase()) || stateName.toLowerCase().includes(d.state.toLowerCase())
    );
    if (matched) {
      setActiveDestination(matched);
      setPlannerDestinationId(matched.id);
      scrollToDestinationExperience();
    } else {
      scrollToSection('destinations');
    }
  };

  const handleAddStayToItinerary = (hotel: HotelProperty, _confirmation: HotelBookingConfirmation) => {
    setPlannerDestinationId(hotel.destinationId);
    const dest = destinations.find((d) => d.id === hotel.destinationId);
    if (dest) {
      setActiveDestination(dest);
    }
    scrollToSection('planner');
  };

  const handleUniversalSearch = (query: string) => {
    setUniversalSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      
      {/* Primary Sticky Header */}
      <Navbar
        onOpenInquiry={handleOpenInquiry}
        onOpenSavedPlaces={() => setSavedDrawerOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        
        {/* 1. Hero Section with Universal Multi-Type Search */}
        <Hero
          onExploreClick={() => scrollToSection('destinations')}
          onPlanTripClick={() => scrollToSection('planner')}
          onUniversalSearch={handleUniversalSearch}
        />

        {/* Quick Location Nav Bar */}
        <div className="bg-surface border-b border-border py-3 sticky top-20 z-30 shadow-xs">
          <div className="container-custom flex items-center justify-between gap-3 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground/70 uppercase tracking-wider flex-shrink-0">
              <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
              <span className="hidden sm:inline">{t('section.exploreLocation')}</span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {destinations.slice(0, 7).map((dest) => {
                const isActive = activeDestination?.id === dest.id;
                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => handleSelectDestinationById(dest.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 flex-shrink-0 ${
                      isActive
                        ? 'bg-primary text-white shadow-sm ring-2 ring-primary ring-offset-1'
                        : 'bg-background hover:bg-border/60 text-foreground/80 border border-border'
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-accent' : 'text-primary'}`} aria-hidden="true" />
                    <span>{dest.name}</span>
                    {dest.isUnesco && (
                      <span className={`text-[9px] px-1 rounded uppercase font-black ${
                        isActive ? 'bg-white/20 text-white' : 'bg-accent/20 text-accent'
                      }`}>
                        UNESCO
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Deep Location-Based Destination Experience */}
        {activeDestination && (
          <DestinationDetailExperience
            destination={activeDestination}
            allDestinations={destinations}
            onSelectDestination={handleSelectDestinationById}
            onPlanItinerary={handlePlanDestination}
            onOpenInquiry={handleOpenInquiry}
            onBackToDirectory={() => scrollToSection('destinations')}
          />
        )}

        {/* 3. Stays & Accommodations Marketplace Engine (Booking.com style) */}
        <StaysMarketplace
          activeCity={activeDestination?.name}
          onAddStayToItinerary={handleAddStayToItinerary}
        />

        {/* 4. Interactive Destination Directory & Atlas */}
        <DestinationExplorer
          onPlanTrip={handlePlanDestination}
          onExploreDestination={handleExploreDestination}
        />

        {/* 5. Pan-India States & Cultural Traditions Explorer */}
        <StatesExplorer onSelectStateDestination={handleStateSelect} />

        {/* 6. Intelligent Day-by-Day Itinerary Planner */}
        <SmartItineraryPlanner
          initialDestinationId={plannerDestinationId}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 7. Living Culture, Regional Cuisines & Sacred Festivals */}
        <CultureAndCuisines />

        {/* 8. Signature Thematic Heritage Trails */}
        <TravelExperienceTrails onPlanTrail={handleOpenInquiry} />

        {/* 9. Practical Travel Intelligence Guide */}
        <PracticalTravelGuide />
      </main>

      {/* Primary Footer */}
      <Footer />

      {/* Custom Travel Inquiry Modal */}
      <TravelerInquiryModal
        isOpen={inquiryModalOpen}
        initialDestination={inquiryDestination}
        onClose={() => setInquiryModalOpen(false)}
      />

      {/* Saved Places Drawer */}
      <SavedPlacesDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        onSelectDestination={handleSelectDestinationById}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Universal Spatial Geocoding & Proximity Explorer Modal */}
      {universalSearchQuery && (
        <UniversalLocationExplorer
          initialQuery={universalSearchQuery}
          onClose={() => setUniversalSearchQuery(null)}
          onSelectDestinationById={handleSelectDestinationById}
          onOpenInquiry={handleOpenInquiry}
        />
      )}

      {/* Floating AI Travel Assistant Chatbot */}
      <AITravelAssistantChat
        onSelectDestination={handleSelectDestinationById}
        onOpenInquiry={handleOpenInquiry}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BookmarkProvider>
        <MainAppContent />
      </BookmarkProvider>
    </LanguageProvider>
  );
}
