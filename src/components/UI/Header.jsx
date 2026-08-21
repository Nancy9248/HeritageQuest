import React from 'react';
import { languages } from '../../data/translations';
import { soundEngine } from '../../utils/audio';

export default function Header({
  site,
  userCoords,
  selectedLang,
  onSelectLang,
  points,
  badgesCount,
  onOpenGamification,
  onOpenVrMode,
  dayNightMode,
  onToggleDayNight,
  onGoBack,
  t
}) {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 p-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
      {/* Top Left: Back Arrow Button, Logo & Site Title */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Navigation Back Arrow Button */}
        {onGoBack && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onGoBack();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl glass-panel text-heritage-lightgold border border-heritage-gold/50 hover:bg-heritage-gold hover:text-heritage-navy transition-all duration-200 shadow-xl font-serif font-bold text-xs"
            title="Return to Site Selection"
          >
            <span className="text-base">←</span>
            <span className="hidden sm:inline">Back</span>
          </button>
        )}

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel gold-border-glow">
          <span className="text-xl">🏛️</span>
          <div>
            <h1 className="font-serif font-bold text-sm md:text-base gold-gradient-text tracking-wide">
              HeritageQuest
            </h1>
            <p className="text-[10px] text-gray-300 font-semibold truncate max-w-[150px] md:max-w-none">
              {site.name}
            </p>
          </div>
        </div>
      </div>

      {/* Top Right: Badges, Coords, Language & Controls */}
      <div className="flex items-center gap-2 flex-wrap pointer-events-auto">
        {/* Heritage Points & Badges */}
        <button
          onClick={onOpenGamification}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border border-heritage-gold/40 hover:bg-heritage-gold/20 text-heritage-lightgold text-xs font-bold transition-all"
        >
          <span>🏆</span>
          <span>{points} pts</span>
          <span className="bg-heritage-gold/30 px-1.5 py-0.5 rounded text-[10px]">
            {badgesCount} Badges
          </span>
        </button>

        {/* GPS Badge */}
        {userCoords && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card border border-white/10 text-emerald-400 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{userCoords.lat.toFixed(3)}°, {userCoords.lng.toFixed(3)}°</span>
          </div>
        )}

        {/* Day/Night Light Toggle */}
        <button
          onClick={onToggleDayNight}
          title={t.dayNightToggle}
          className="p-2 rounded-xl glass-card border border-white/10 hover:border-heritage-gold text-white text-sm transition-all"
        >
          {dayNightMode === 'night' ? '🌙' : dayNightMode === 'golden' ? '🌅' : '☀️'}
        </button>

        {/* Language Selector Dropdown */}
        <select
          value={selectedLang}
          onChange={(e) => {
            soundEngine.playClick();
            onSelectLang(e.target.value);
          }}
          className="px-3 py-1.5 rounded-xl glass-card border border-heritage-gold/40 text-heritage-lightgold text-xs font-serif font-bold cursor-pointer outline-none bg-slate-900/90"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code} className="bg-slate-900 text-white">
              {l.flag} {l.name}
            </option>
          ))}
        </select>

        {/* VR/AR Mode Toggle */}
        <button
          onClick={onOpenVrMode}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-heritage-gold to-heritage-amber text-heritage-navy text-xs font-serif font-bold shadow-lg hover:scale-105 transition-all"
        >
          🥽 {t.vrMode}
        </button>
      </div>
    </header>
  );
}
