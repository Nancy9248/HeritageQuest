import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Compass,
  MapPin,
  Navigation,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Sparkles,
  ExternalLink,
  Layers,
  LocateFixed,
  Globe,
  Satellite
} from 'lucide-react';
import { MONUMENTS, HERITAGE_TRAILS } from '../../data/monumentsData';
import { heritageAudio } from '../../services/audioSynthesizer';
import { speechService } from '../../services/speechService';
import { gpsService } from '../../services/gpsService';
import { GPSCoordinatesRadar } from './GPSCoordinatesRadar';

export const HeritageMap = ({
  onSelectMonument,
  currentMonumentId,
  userContext,
  translations
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const circlesRef = useRef([]);
  const routePolylineRef = useRef(null);
  const userMarkerRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [selectedTrail, setSelectedTrail] = useState(HERITAGE_TRAILS[0]);
  const [mapLayerType, setMapLayerType] = useState('osm'); // Default to keyless, watermark-free OpenStreetMap Standard
  const [isSimulatingWalk, setIsSimulatingWalk] = useState(false);
  const [simulationIndex, setSimulationIndex] = useState(0);
  const [geofenceAlert, setGeofenceAlert] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [activeSiteInfo, setActiveSiteInfo] = useState(null);

  const cartoApiKey = import.meta.env.VITE_CARTO_API_KEY || '';

  const TILE_LAYERS = {
    osm: {
      name: 'OpenStreetMap Standard (Keyless & Free)',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
    },
    satellite: {
      name: 'Real Satellite (Esri Imagery)',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles & Imagery © Esri, DigitalGlobe, GeoEye, Earthstar Geographics'
    },
    voyager: {
      name: cartoApiKey ? 'Carto Voyager (Authenticated)' : 'Esri World Street (Clear & Detailed)',
      url: cartoApiKey
        ? `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?api_key=${cartoApiKey}`
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: cartoApiKey
        ? '© OpenStreetMap contributors, © CARTO • HeritageQuest'
        : 'Tiles © Esri • Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
    }
  };

  // Switch Tile Layer
  const switchMapLayer = (layerKey) => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    setMapLayerType(layerKey);
    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    const layerConfig = TILE_LAYERS[layerKey];
    tileLayerRef.current = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: 19
    }).addTo(mapInstanceRef.current);
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on Central India (approx. 21.5, 78.9)
    const map = L.map(mapContainerRef.current, {
      center: [21.5, 78.9],
      zoom: 5,
      zoomControl: false
    });
    mapInstanceRef.current = map;

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial Tile Layer
    const layerConfig = TILE_LAYERS[mapLayerType];
    tileLayerRef.current = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: 19
    }).addTo(map);

    // Render 8 Monument Pins & Geofence Circles
    MONUMENTS.forEach((monument) => {
      const customIcon = L.divIcon({
        className: 'custom-heritage-pin',
        html: `
          <div style="
            background: linear-gradient(135deg, #e5b869, #e11d48);
            width: 34px;
            height: 34px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid #ffffff;
            box-shadow: 0 0 15px rgba(229,184,105,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <div style="
              width: 14px;
              height: 14px;
              background: #060913;
              border-radius: 50%;
              transform: rotate(45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #e5b869;
              font-size: 9px;
              font-weight: bold;
            ">★</div>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34]
      });

      const marker = L.marker(monument.coordinates, { icon: customIcon }).addTo(map);
      marker.bindTooltip(
        `<div style="font-family: 'Cinzel', serif; font-weight: bold; color: #060913; padding: 2px 4px;">${monument.name}</div>`,
        { direction: 'top', offset: [0, -34] }
      );

      marker.on('click', () => {
        setActiveSiteInfo(monument);
        heritageAudio.playSitarPluck(493.88);
      });
      markersRef.current[monument.id] = marker;

      // Visual Geofence Proximity Circle
      const geofenceCircle = L.circle(monument.coordinates, {
        color: '#e5b869',
        fillColor: '#f3d389',
        fillOpacity: 0.1,
        radius: 30000,
        weight: 1.5,
        dashArray: '5, 5'
      }).addTo(map);
      circlesRef.current.push(geofenceCircle);
    });

    drawSelectedTrail(selectedTrail, map);

    return () => {
      map.remove();
    };
  }, []);

  // Redraw route polyline when selected trail changes
  useEffect(() => {
    if (mapInstanceRef.current && selectedTrail) {
      drawSelectedTrail(selectedTrail, mapInstanceRef.current);
    }
  }, [selectedTrail]);

  const drawSelectedTrail = (trail, map) => {
    if (!trail || !trail.waypoints) return;
    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
    }

    const latlngs = trail.waypoints.map((wp) => [wp.lat, wp.lng]);

    const polyline = L.polyline(latlngs, {
      color: trail.themeColor || '#e5b869',
      weight: 4,
      opacity: 0.85,
      dashArray: '8, 8',
      lineCap: 'round'
    }).addTo(map);
    routePolylineRef.current = polyline;

    if (latlngs.length > 0) {
      map.flyToBounds(polyline.getBounds(), { padding: [50, 50], duration: 1.5 });
    }
  };

  // Subscribe to live GPS updates
  useEffect(() => {
    const unsub = gpsService.subscribe((pos) => {
      setUserLocation(pos);
      updateUserMarker([pos.lat, pos.lng]);
      checkProximityToMonuments(pos.lat, pos.lng);
    });
    return () => unsub();
  }, []);

  // Simulated GPS Waypoint Tour along Trail
  useEffect(() => {
    let timer;
    if (isSimulatingWalk && selectedTrail && selectedTrail.waypoints) {
      timer = setInterval(() => {
        setSimulationIndex((prev) => {
          const next = (prev + 1) % selectedTrail.waypoints.length;
          const currentWp = selectedTrail.waypoints[next];

          if (mapInstanceRef.current) {
            mapInstanceRef.current.panTo([currentWp.lat, currentWp.lng], {
              animate: true,
              duration: 1.2
            });
            updateUserMarker([currentWp.lat, currentWp.lng]);
            checkProximityToMonuments(currentWp.lat, currentWp.lng);
          }
          return next;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isSimulatingWalk, selectedTrail]);

  const updateUserMarker = (latlng) => {
    if (!mapInstanceRef.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(latlng);
    } else {
      const userIcon = L.divIcon({
        className: 'user-pulse-icon',
        html: `
          <div style="
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #2563eb;
            border: 3px solid #ffffff;
            box-shadow: 0 0 20px #3b82f6;
            animation: pulse 1.5s infinite;
          "></div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      userMarkerRef.current = L.marker(latlng, { icon: userIcon }).addTo(mapInstanceRef.current);
    }
  };

  const checkProximityToMonuments = (lat, lng) => {
    MONUMENTS.forEach((monument) => {
      const dLat = (lat - monument.coordinates[0]) * 111;
      const dLng = (lng - monument.coordinates[1]) * 111 * Math.cos((lat * Math.PI) / 180);
      const distanceKm = Math.sqrt(dLat * dLat + dLng * dLng);

      if (distanceKm < 35) {
        setGeofenceAlert({
          monument,
          distance: Math.round(distanceKm)
        });
      }
    });
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col sm:flex-row bg-[#060913] overflow-hidden">
      {/* Left Sidebar: Heritage Trails & Navigation Controls */}
      <div className="w-full sm:w-96 bg-[#0b1120] border-r border-[#e5b869]/25 flex flex-col justify-between p-4 z-20 shadow-2xl overflow-y-auto">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#e5b869]" />
              <h3 className="font-bold text-base text-white font-['Cinzel']">GPS Heritage Trails</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e11d48]/20 border border-[#e11d48]/40 text-[#fca5a5] font-semibold">
              8 Sovereign Landmarks
            </span>
          </div>

          {/* Real Map Layer Switcher Buttons */}
          <div className="mb-4">
            <label className="text-[10px] uppercase tracking-wider text-[#e5b869] font-bold block mb-1.5">
              Real Map Layer Engine:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => switchMapLayer('osm')}
                className={`px-2 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  mapLayerType === 'osm'
                    ? 'bg-[#e5b869] text-[#060913] font-bold shadow-md'
                    : 'bg-[#111827] text-stone-300 hover:text-white border border-stone-700'
                }`}
                title="OpenStreetMap Standard (100% Free & Keyless)"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Standard</span>
              </button>
              <button
                onClick={() => switchMapLayer('satellite')}
                className={`px-2 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  mapLayerType === 'satellite'
                    ? 'bg-[#e5b869] text-[#060913] font-bold shadow-md'
                    : 'bg-[#111827] text-stone-300 hover:text-white border border-stone-700'
                }`}
                title="Real Satellite (Esri World Imagery)"
              >
                <Satellite className="w-3.5 h-3.5" />
                <span>Satellite</span>
              </button>
              <button
                onClick={() => switchMapLayer('voyager')}
                className={`px-2 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  mapLayerType === 'voyager'
                    ? 'bg-[#e5b869] text-[#060913] font-bold shadow-md'
                    : 'bg-[#111827] text-stone-300 hover:text-white border border-stone-700'
                }`}
                title={cartoApiKey ? 'Carto Voyager (Key Authenticated)' : 'Esri World Street (Clear & Detailed, Keyless)'}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{cartoApiKey ? 'Voyager' : 'Street/Voyager'}</span>
              </button>
            </div>
          </div>

          {/* Curated Trail Selector */}
          <div className="space-y-2 mb-4">
            <label className="text-[10px] uppercase tracking-wider text-[#e5b869] font-bold block">
              Select Curated Heritage Trail:
            </label>
            {HERITAGE_TRAILS.map((trail) => {
              const isSelected = selectedTrail.id === trail.id;
              return (
                <button
                  key={trail.id}
                  onClick={() => {
                    setSelectedTrail(trail);
                    setSimulationIndex(0);
                    heritageAudio.playSitarPluck(440);
                  }}
                  className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#060913] border-[#e5b869] text-white shadow-lg'
                      : 'bg-[#111827]/80 border-stone-800 text-stone-300 hover:border-[#e5b869]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold font-['Cinzel'] text-[#e5b869]">{trail.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#e5b869]/20 text-stone-200">
                      {trail.estimatedDays}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mb-2 leading-relaxed">{trail.description}</p>
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>Region: {trail.region}</span>
                    <span>Distance: ~{trail.distanceKm} km</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Trail Waypoints list */}
          <div className="mb-4">
            <label className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1.5">
              Waypoints on this Trail:
            </label>
            <div className="space-y-1">
              {selectedTrail.waypoints.map((wp, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.flyTo([wp.lat, wp.lng], 10, { duration: 1.5 });
                    }
                  }}
                  className="p-2 rounded-xl bg-[#060913] hover:bg-[#111827] border border-stone-800 text-xs text-stone-300 hover:text-[#e5b869] flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span>{idx + 1}. {wp.name}</span>
                  <span className="text-[10px] text-stone-400 font-mono">View →</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trail Walk Simulation Controls */}
        <div className="pt-3 border-t border-[#e5b869]/20">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-stone-300 font-semibold">Simulated Tour:</span>
            <span className="text-[#e5b869] font-mono">
              {isSimulatingWalk ? 'En Route...' : 'Paused'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsSimulatingWalk(!isSimulatingWalk);
                heritageAudio.playSitarPluck(isSimulatingWalk ? 392 : 523.25);
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isSimulatingWalk
                  ? 'bg-[#e11d48] text-white shadow-md'
                  : 'bg-gradient-to-r from-[#e5b869] to-[#d4af37] text-[#060913]'
              }`}
            >
              {isSimulatingWalk ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Tour</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Auto-Pilot Tour</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setSimulationIndex(0);
                setIsSimulatingWalk(false);
                if (mapInstanceRef.current && selectedTrail.waypoints[0]) {
                  const wp = selectedTrail.waypoints[0];
                  mapInstanceRef.current.panTo([wp.lat, wp.lng]);
                }
              }}
              className="p-2 rounded-xl bg-[#111827] hover:bg-[#1a233b] border border-stone-700 text-stone-300 hover:text-white transition-all cursor-pointer"
              title="Reset Tour"
              aria-label="Reset tour simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Real Map Display Viewport */}
      <div className="flex-1 relative h-full">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Selected Monument Preview Card overlay */}
        {activeSiteInfo && (
          <div className="absolute top-4 right-4 z-30 w-80 bg-[#0b1120]/95 border-2 border-[#e5b869] rounded-3xl p-4 shadow-2xl backdrop-blur-xl animate-fadeIn">
            <div className="relative h-28 rounded-2xl overflow-hidden mb-3">
              <img
                src={activeSiteInfo.heroImage}
                alt={`${activeSiteInfo.name} - ${activeSiteInfo.subtitle || 'Indian Heritage Monument'} in ${activeSiteInfo.state}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveSiteInfo(null)}
                aria-label="Close monument preview card"
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-[#e5b869] font-mono">
                {activeSiteInfo.state}
              </div>
            </div>

            <h4 className="font-bold text-base font-['Cinzel'] text-white">
              {activeSiteInfo.name}
            </h4>
            <p className="text-[11px] text-stone-400 font-serif italic mb-2 line-clamp-2">
              {activeSiteInfo.subtitle}
            </p>

            <div className="text-[11px] text-stone-300 mb-3 space-y-1">
              <div><span className="text-[#e5b869] font-semibold">Era:</span> {activeSiteInfo.era}</div>
              <div>
                <span className="text-[#e5b869] font-semibold">Living Hosts:</span>{' '}
                {activeSiteInfo.historicalDuo
                  ? `${activeSiteInfo.historicalDuo.maleHost.name} & ${activeSiteInfo.historicalDuo.femaleHost.name}`
                  : activeSiteInfo.historicalHost?.name}
              </div>
            </div>

            <button
              onClick={() => {
                if (onSelectMonument) onSelectMonument(activeSiteInfo.id);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#e5b869] to-[#d4af37] text-[#060913] text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg cursor-pointer transform hover:scale-102 active:scale-98 transition-all"
            >
              <span>Explore in 3D WebXR</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
