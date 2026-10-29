import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';
import L from 'leaflet';

export default function FarmMapLocation({ 
  lat, 
  lng, 
  onLocationChange, 
  onAutoDetectGps, 
  isDetectingGps, 
  gpsSuccess, 
  gpsError,
  lang = 'en' 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const isTamil = lang === 'ta';

  const defaultLat = lat || 10.8789;
  const defaultLng = lng || 79.1065;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet Map
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [defaultLat, defaultLng],
        zoom: 13,
        zoomControl: true,
      });

      // OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Custom Pin Marker
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background-color: #16a34a; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                 <div style="transform: rotate(45deg); color: white; font-size: 14px;">🌾</div>
               </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      const marker = L.marker([defaultLat, defaultLng], {
        icon: customIcon,
        draggable: true,
      }).addTo(map);

      marker.on('dragend', (e) => {
        const position = marker.getLatLng();
        if (onLocationChange) {
          onLocationChange(position.lat, position.lng);
        }
      });

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        if (onLocationChange) {
          onLocationChange(e.latlng.lat, e.latlng.lng);
        }
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    } else {
      // Update existing map
      mapInstanceRef.current.setView([defaultLat, defaultLng], 13);
      if (markerRef.current) {
        markerRef.current.setLatLng([defaultLat, defaultLng]);
      }
    }

    return () => {
      // Clean up map when unmounting
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map when props change
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current && lat && lng) {
      mapInstanceRef.current.setView([lat, lng], 14);
      markerRef.current.setLatLng([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-agri-600" />
          {isTamil ? 'பண்ணை புவியியல் அமைவிடம் (GPS Coordinates):' : 'Farm Geographic Location & GPS:'}
        </label>

        {/* Browser Geolocation Button */}
        <button
          type="button"
          onClick={onAutoDetectGps}
          disabled={isDetectingGps}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-agri-50 hover:bg-agri-100 text-agri-800 border border-agri-300 rounded-xl text-xs font-bold transition-all shadow-2xs self-start sm:self-auto disabled:opacity-50"
        >
          <Navigation className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin text-agri-600' : 'text-agri-700'}`} />
          <span>
            {isDetectingGps 
              ? (isTamil ? 'GPS பெறப்படுகிறது...' : 'Detecting GPS...') 
              : (isTamil ? 'தற்போதைய GPS இருப்பிடத்தை பெறுக' : 'Auto-Detect Current GPS Coordinates')}
          </span>
        </button>
      </div>

      {gpsSuccess && (
        <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{gpsSuccess}</span>
        </div>
      )}

      {gpsError && (
        <div className="p-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>{gpsError}</span>
        </div>
      )}

      {/* Interactive Map Preview Box */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-inner">
        <div ref={mapContainerRef} className="h-60 sm:h-72 w-full z-10" />
        
        <div className="absolute bottom-2 left-2 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 shadow-sm flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-agri-600" />
          <span>Lat: {Number(defaultLat).toFixed(4)}°, Lng: {Number(defaultLng).toFixed(4)}°</span>
        </div>
      </div>
      <p className="text-[11px] text-slate-500">
        {isTamil 
          ? 'வரைபடத்தில் கிளிக் செய்து அல்லது குறியீட்டை நகர்த்தி உங்கள் துல்லியமான பண்ணை இடத்தை குறிக்கலாம்.' 
          : 'You can tap on the map or drag the green pin to pinpoint the exact location of your farm parcel.'}
      </p>
    </div>
  );
}
