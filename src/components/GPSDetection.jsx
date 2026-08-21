import React, { useState, useEffect } from 'react';
import { heritageSites } from '../data/heritageSites';
import { soundEngine } from '../utils/audio';

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function GPSDetection({ onSelectSite, onGoBack, t }) {
  const [userCoords, setUserCoords] = useState(null);
  const [gpsStatus, setGpsStatus] = useState('loading');
  const [nearestSite, setNearestSite] = useState(heritageSites[0]);
  const [nearestDistance, setNearestDistance] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserCoords({ lat, lng });
          setGpsStatus('success');

          let minDistance = Infinity;
          let closest = heritageSites[0];

          heritageSites.forEach((site) => {
            const dist = calculateDistance(lat, lng, site.coordinates.lat, site.coordinates.lng);
            if (dist < minDistance) {
              minDistance = dist;
              closest = site;
            }
          });

          setNearestSite(closest);
          setNearestDistance(minDistance.toFixed(1));
        },
        (error) => {
          console.warn('GPS position error or denied:', error);
          setGpsStatus('denied');
          setNearestSite(heritageSites[0]);
        },
        { timeout: 8000 }
      );
    } else {
      setGpsStatus('denied');
    }
  }, []);

  const handleChooseSite = (site) => {
    soundEngine.playChime();
    onSelectSite(site, userCoords);
  };

  return (
    <div className="relative w-full h-screen bg-heritage-navy flex flex-col justify-between items-center p-6 overflow-y-auto">
      {/* Back Arrow Button */}
      {onGoBack && (
        <button
          onClick={() => {
            soundEngine.playClick();
            onGoBack();
          }}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel text-heritage-lightgold border border-heritage-gold/40 hover:bg-heritage-gold hover:text-heritage-navy font-serif font-bold text-sm transition-all shadow-xl"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      )}

      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-heritage-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-3xl w-full text-center mt-8 md:mt-4">
        <h2 className="text-3xl md:text-5xl font-serif font-bold gold-gradient-text">
          {t.gpsTitle}
        </h2>
        <p className="text-gray-300 text-sm md:text-base mt-2">
          Detecting nearby historical monuments using your device's live coordinates.
        </p>
      </div>

      {/* GPS Status & Nearest Site Card */}
      <div className="relative z-10 max-w-3xl w-full my-auto py-6">
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-heritage-gold/40 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* GPS Coords Badge */}
            <div className="flex-1 w-full text-left bg-black/40 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-heritage-lightgold mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {t.currentLocation}
              </div>
              
              {gpsStatus === 'loading' && (
                <div className="text-sm text-gray-400 italic animate-pulse">
                  {t.detectingGps}
                </div>
              )}

              {gpsStatus === 'success' && userCoords && (
                <div className="font-mono text-sm text-emerald-300 space-y-1">
                  <div>Latitude: <span className="font-bold text-white">{userCoords.lat.toFixed(6)}° N</span></div>
                  <div>Longitude: <span className="font-bold text-white">{userCoords.lng.toFixed(6)}° E</span></div>
                </div>
              )}

              {gpsStatus === 'denied' && (
                <div className="text-xs text-amber-400">
                  {t.gpsDenied}
                </div>
              )}
            </div>

            {/* Nearest Site Highlight */}
            <div className="flex-1 text-left">
              <div className="text-xs uppercase tracking-wider font-semibold text-heritage-amber mb-1">
                {t.nearestSite}
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                {nearestSite.name}
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                📍 {nearestSite.location}
              </p>
              {nearestDistance && (
                <div className="inline-block mt-2 px-3 py-1 rounded-full bg-heritage-gold/20 text-heritage-lightgold text-xs font-semibold">
                  {t.distance}: ~{nearestDistance} km away
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <div>
              <button
                onClick={() => handleChooseSite(nearestSite)}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-heritage-gold to-heritage-amber text-heritage-navy font-serif font-bold text-lg tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {t.exploreThisSite} →
              </button>
            </div>
          </div>
        </div>

        {/* Manual Heritage Site Selection Gallery */}
        <div className="text-center">
          <h3 className="text-lg font-serif text-heritage-sand mb-4 uppercase tracking-wider font-semibold">
            {t.orSelectSite}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {heritageSites.map((site) => (
              <button
                key={site.id}
                onClick={() => handleChooseSite(site)}
                className="group glass-card p-5 rounded-2xl border border-white/10 hover:border-heritage-gold hover:bg-white/10 text-left transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl">🏛️</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-heritage-gold/20 text-heritage-lightgold font-mono">
                    {site.eraBuilt}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-lg text-white group-hover:text-heritage-lightgold transition-colors">
                  {site.name}
                </h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {site.shortDescription}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mb-4 text-xs text-gray-500">
        GPS Geolocation API • Haversine Distance Matrix • HeritageQuest Site Engine
      </div>
    </div>
  );
}
