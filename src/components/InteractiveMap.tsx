import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NearbyPlace } from '../types';
import { ExternalLink, Navigation, Compass, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InteractiveMapProps {
  center: [number, number];
  zoom?: number;
  places: NearbyPlace[];
  selectedCategory: 'all' | 'heritage' | 'food' | 'stay' | 'transport' | 'service';
  onSelectCategory: (category: 'all' | 'heritage' | 'food' | 'stay' | 'transport' | 'service') => void;
  highlightedPlaceId?: string | null;
  onPlaceClick?: (place: NearbyPlace) => void;
}

export function InteractiveMap({
  center,
  zoom = 13,
  places,
  selectedCategory,
  onSelectCategory,
  highlightedPlaceId,
  onPlaceClick,
}: InteractiveMapProps) {
  const { t } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [activeMarkerName, setActiveMarkerName] = useState<string | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: false, // gentle for scrolling page
      });

      // OpenStreetMap Carto tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Recenter map when center prop changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  }, [center, zoom]);

  // Update Markers when places, selectedCategory, or highlightedPlaceId changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const filteredPlaces =
      selectedCategory === 'all'
        ? places
        : places.filter((p) => p.category === selectedCategory);

    // Color definitions for map pins
    const categoryColors: Record<NearbyPlace['category'], { bg: string; border: string }> = {
      heritage: { bg: '#1F6B4F', border: '#144634' }, // Forest Green
      food: { bg: '#E98B4A', border: '#C0682B' },     // Warm Orange
      stay: { bg: '#4338CA', border: '#312E81' },     // Indigo
      transport: { bg: '#0284C7', border: '#0369A1' },// Cyan / Blue
      service: { bg: '#DC2626', border: '#991B1B' },  // Crimson
    };

    const bounds = L.latLngBounds([center]);

    filteredPlaces.forEach((place) => {
      bounds.extend([place.lat, place.lng]);
      const colors = categoryColors[place.category] || { bg: '#191A17', border: '#000000' };
      const isHighlighted = highlightedPlaceId === place.id;

      // Custom SVG Pin Icon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: ${colors.bg};
            border: 2px solid #FFFFFF;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            width: ${isHighlighted ? '38px' : '30px'};
            height: ${isHighlighted ? '38px' : '30px'};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          ">
            <div style="
              width: 10px;
              height: 10px;
              background: #FFFFFF;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([place.lat, place.lng], { icon: customIcon });

      const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

      const popupHtml = `
        <div style="font-family: 'Inter', sans-serif; min-width: 200px; max-width: 260px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 4px;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: ${colors.bg}; letter-spacing: 0.5px;">
              ${place.subType}
            </span>
            ${place.rating ? `<span style="font-size: 11px; font-weight: 700; color: #E98B4A;">★ ${place.rating}</span>` : ''}
          </div>
          <h4 style="font-size: 14px; font-weight: 800; color: #191A17; margin: 0 0 4px 0; font-family: 'Sora', sans-serif;">
            ${place.name}
          </h4>
          <p style="font-size: 12px; color: #4B5563; margin: 0 0 6px 0; line-height: 1.4;">
            ${place.description}
          </p>
          <div style="font-size: 11px; font-weight: 600; color: #1F6B4F; margin-bottom: 6px;">
            📍 Distance: ${place.distance}
            ${place.priceOrFee ? `<br>🏷️ ${place.priceOrFee}` : ''}
          </div>
          <div style="border-top: 1px solid #E5E7EB; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
            <a href="${googleDirectionsUrl}" target="_blank" rel="noopener noreferrer" style="color: #1F6B4F; font-size: 11px; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 4px;">
              Get Directions ↗
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setActiveMarkerName(place.name);
        if (onPlaceClick) onPlaceClick(place);
      });

      if (markersLayerRef.current) {
        marker.addTo(markersLayerRef.current);
      }
    });

    if (filteredPlaces.length > 0 && mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [places, selectedCategory, highlightedPlaceId, center]);

  const categories: { id: InteractiveMapProps['selectedCategory']; label: string; count: number }[] = [
    { id: 'all', label: t('map.allPlaces', 'All Places'), count: places.length },
    { id: 'heritage', label: t('map.heritage', 'Heritage & Sights'), count: places.filter((p) => p.category === 'heritage').length },
    { id: 'food', label: t('map.food', 'Local Food & Cafes'), count: places.filter((p) => p.category === 'food').length },
    { id: 'stay', label: t('map.stays', 'Stays & Hotels'), count: places.filter((p) => p.category === 'stay').length },
    { id: 'transport', label: t('map.transit', 'Transit & Rail'), count: places.filter((p) => p.category === 'transport').length },
    { id: 'service', label: t('map.services', 'Public Services'), count: places.filter((p) => p.category === 'service').length },
  ];

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col">
      {/* Category Filter Bar */}
      <div className="p-4 bg-background border-b border-border flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/70">
          <Layers className="w-4 h-4 text-primary" aria-hidden="true" />
          <span>Interactive Map Explorer:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'bg-surface hover:bg-border/40 text-foreground/80 border border-border'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  selectedCategory === cat.id ? 'bg-white/25 text-white' : 'bg-background text-foreground/60'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleResetView}
          className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1 bg-surface px-2.5 py-1.5 rounded-lg border border-border"
          title="Reset map camera"
        >
          <Compass className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('map.recenter', 'Recenter View')}</span>
        </button>
      </div>

      {/* Map Canvas */}
      <div className="relative w-full h-[400px] sm:h-[480px]">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 z-[400] bg-surface/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-md text-[11px] font-medium text-foreground flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#1F6B4F]" />
            <span>Heritage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E98B4A]" />
            <span>Food</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#4338CA]" />
            <span>Hotels</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#0284C7]" />
            <span>Transit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#DC2626]" />
            <span>Services</span>
          </div>
        </div>

        {/* Active Marker Indicator */}
        {activeMarkerName && (
          <div className="absolute top-3 right-3 z-[400] bg-surface/95 backdrop-blur-sm border border-border rounded-xl px-3 py-1.5 shadow-md text-xs font-bold text-primary flex items-center gap-1.5 animate-fadeIn">
            <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Selected: {activeMarkerName}</span>
          </div>
        )}
      </div>

      {/* Directions Notice */}
      <div className="p-3 bg-background border-t border-border flex items-center justify-between text-xs text-foreground/70">
        <span>Click any pin on the map to view details, prices, distance, and direct navigation links.</span>
        <span className="hidden sm:inline font-medium text-primary flex items-center gap-1">
          <ExternalLink className="w-3 h-3" aria-hidden="true" /> Real OpenStreetMap & Google Maps Directions
        </span>
      </div>
    </div>
  );
}
