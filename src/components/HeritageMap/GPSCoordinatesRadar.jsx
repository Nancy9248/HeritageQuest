import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Navigation,
  Radio,
  ExternalLink,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCw,
  X
} from 'lucide-react';
import {
  gpsService,
  formatLatitude,
  formatLongitude,
  formatDMS,
  findNearestMonument,
  GPS_PRESETS
} from '../../services/gpsService';
import { MONUMENTS } from '../../data/monumentsData';
import { speechService } from '../../services/speechService';
import { heritageAudio } from '../../services/audioSynthesizer';

export const GPSCoordinatesRadar = ({
  onSelectMonument,
  currentLang = 'en',
  translations = {},
  onClose
}) => {
  const [gpsState, setGpsState] = useState(gpsService.currentPosition);
  const [isSpeakingCoords, setIsSpeakingCoords] = useState(false);

  useEffect(() => {
    const unsubscribe = gpsService.subscribe((pos) => {
      setGpsState(pos);
    });

    // Auto-request live location on mount
    gpsService.requestLiveLocation();

    return () => {
      unsubscribe();
    };
  }, []);

  const nearestMonument = findNearestMonument(gpsState.lat, gpsState.lng, MONUMENTS);

  const handleSpeakCoordinates = () => {
    if (!nearestMonument) return;
    setIsSpeakingCoords(true);
    heritageAudio.playSitarPluck(523.25);

    const latText = `${Math.abs(gpsState.lat).toFixed(4)} degrees ${gpsState.lat >= 0 ? 'North' : 'South'}`;
    const lngText = `${Math.abs(gpsState.lng).toFixed(4)} degrees ${gpsState.lng >= 0 ? 'East' : 'West'}`;
    const distanceText = nearestMonument.distanceKm < 1
      ? `${Math.round(nearestMonument.distanceKm * 1000)} meters`
      : `${nearestMonument.distanceKm.toFixed(1)} kilometers`;

    const speechText = `Current GPS coordinates: Latitude ${latText}, Longitude ${lngText}. Your nearest heritage sanctuary is ${nearestMonument.name}, approximately ${distanceText} away.`;

    speechService.speak(speechText, currentLang === 'hi' ? 'hi-IN' : 'en-US', {
      onEnd: () => setIsSpeakingCoords(false),
      onError: () => setIsSpeakingCoords(false)
    });
  };

  return (
    <div className="w-full bg-[#0b1120]/95 border border-[#e5b869]/40 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden text-white selection:bg-[#e5b869] selection:text-[#060913]">
      {/* Decorative Gold Radar Ambient Pulse */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#e5b869]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Live Satellite Status & Close button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-[#e5b869]/20">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <Radio className={`w-5 h-5 ${gpsState.isLive ? 'text-emerald-400' : 'text-[#e5b869]'} animate-pulse`} />
            <span
              className={`absolute w-3 h-3 rounded-full opacity-75 animate-ping ${
                gpsState.isLive ? 'bg-emerald-400' : 'bg-[#e5b869]'
              }`}
            />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white font-['Cinzel'] tracking-wider flex items-center gap-2">
              GPS Satellite Live Location
              <span className="text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold uppercase tracking-wider bg-[#e5b869]/15 text-[#e5b869] border border-[#e5b869]/30">
                WGS 84
              </span>
            </h3>
            <p className="text-[11px] text-stone-400">
              {gpsState.isLive
                ? 'Active Device Geolocation • Real-Time Satellite Stream'
                : `Current Preset: ${gpsState.presetLabel}`}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              gpsService.requestLiveLocation();
              heritageAudio.playSitarPluck(587.33);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111827] hover:bg-[#1a233b] border border-stone-700 hover:border-[#e5b869]/40 text-xs text-stone-200 transition-all cursor-pointer"
            title="Refresh Live Device Location"
            aria-label="Refresh live device location"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#e5b869]" />
            <span className="hidden sm:inline">Refresh GPS</span>
          </button>

          <button
            onClick={handleSpeakCoordinates}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isSpeakingCoords
                ? 'bg-[#e5b869] text-[#060913] border-[#e5b869]'
                : 'bg-[#111827] text-stone-300 border-stone-700 hover:border-[#e5b869]/50 hover:text-white'
            }`}
            title="Audio Readout of Coordinates"
            aria-label={isSpeakingCoords ? "Stop audio readout of coordinates" : "Audio readout of coordinates"}
          >
            {isSpeakingCoords ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#111827] hover:bg-[#1f293d] border border-stone-700 text-stone-300 hover:text-white transition-all cursor-pointer ml-1"
              title="Close Live Location Card"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Coordinates Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Latitude Box */}
        <div className="bg-[#060913] border border-[#e5b869]/25 rounded-2xl p-3.5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#e5b869]">Latitude</span>
            <span className="font-mono text-[10px] text-emerald-400">±{gpsState.accuracy}m accuracy</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
            {formatLatitude(gpsState.lat)}
          </div>
          <div className="text-[11px] font-mono text-stone-400 mt-1">
            DMS: {formatDMS(gpsState.lat, true)}
          </div>
        </div>

        {/* Longitude Box */}
        <div className="bg-[#060913] border border-[#e5b869]/25 rounded-2xl p-3.5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#e5b869]">Longitude</span>
            <span className="font-mono text-[10px] text-emerald-400">Altitude ~{gpsState.altitude}m</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
            {formatLongitude(gpsState.lng)}
          </div>
          <div className="text-[11px] font-mono text-stone-400 mt-1">
            DMS: {formatDMS(gpsState.lng, false)}
          </div>
        </div>
      </div>

      {/* Nearest Heritage Site Proximity Radar */}
      {nearestMonument && (
        <div className="bg-[#060913] border border-[#e5b869]/30 rounded-2xl p-4 mb-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#e5b869]" />
              <span className="text-xs uppercase tracking-wider text-[#e5b869] font-bold">
                Nearest Heritage Monument:
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e5b869]/20 text-[#e5b869] font-semibold">
              Bearing: {nearestMonument.bearing}°
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-base font-bold text-white font-['Cinzel']">
                {nearestMonument.name} ({nearestMonument.state})
              </div>
              <p className="text-xs text-stone-400 mt-0.5 font-serif italic">
                {nearestMonument.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-lg font-mono font-bold text-[#e5b869]">
                  {nearestMonument.distanceKm < 1
                    ? `${Math.round(nearestMonument.distanceKm * 1000)} m`
                    : `${nearestMonument.distanceKm.toFixed(1)} km`}
                </div>
                <div className="text-[10px] text-stone-400">Haversine Distance</div>
              </div>

              {onSelectMonument && (
                <button
                  onClick={() => {
                    onSelectMonument(nearestMonument.id);
                    if (onClose) onClose();
                  }}
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#e5b869] to-[#d4af37] text-[#060913] text-xs font-bold shadow-md hover:shadow-[#e5b869]/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Explore 3D</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Teleport / Simulated Preset Locations for the 8 Monuments */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2 flex items-center justify-between">
          <span>Teleport to Any of the 8 Heritage Monuments:</span>
          <span className="text-[10px] text-stone-400">Instant Geofence</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {GPS_PRESETS.map((preset) => {
            const isCurrent = gpsState.presetLabel === preset.name;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  gpsService.setPreset(preset.id);
                  heritageAudio.playSitarPluck(440);
                }}
                className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer truncate ${
                  isCurrent
                    ? 'bg-[#111827] border-[#e5b869] text-white shadow-md'
                    : 'bg-[#060913]/80 border-stone-800 text-stone-400 hover:text-white hover:border-[#e5b869]/40'
                }`}
              >
                <div className="font-semibold text-[11px] truncate text-stone-200">
                  {preset.name.split('(')[0]}
                </div>
                <div className="text-[10px] text-stone-400 truncate">
                  {preset.name.split('(')[1]?.replace(')', '') || preset.state}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
