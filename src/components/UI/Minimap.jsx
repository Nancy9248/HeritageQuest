import React from 'react';
import { soundEngine } from '../../utils/audio';

export default function Minimap({ site, activeHotspot, onSelectHotspot, onClose, t }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-xl w-full glass-panel rounded-3xl p-6 border border-heritage-gold/50 shadow-2xl flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-4 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <h2 className="font-serif font-bold text-xl gold-gradient-text">
              {t.map} — {site.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* 2D Graphical Site Map Canvas */}
        <div className="relative w-full h-64 bg-slate-950 rounded-2xl border border-heritage-gold/30 p-4 flex items-center justify-center overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

          {/* Central Monument Symbol */}
          <div className="relative z-10 p-6 rounded-3xl bg-heritage-gold/10 border-2 border-heritage-gold/50 text-center">
            <div className="text-3xl">🏛️</div>
            <div className="font-serif font-bold text-xs text-heritage-lightgold mt-1">
              {site.name} Central Core
            </div>
          </div>

          {/* Hotspot Markers on Map */}
          {site.hotspots.map((hs, i) => {
            const isActive = activeHotspot?.id === hs.id;
            const offsets = [
              { top: '20%', left: '25%' },
              { top: '65%', left: '70%' },
              { top: '30%', left: '75%' }
            ];
            const pos = offsets[i % offsets.length];

            return (
              <button
                key={hs.id}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectHotspot(hs);
                  onClose();
                }}
                style={pos}
                className={`absolute z-20 p-2 rounded-xl text-xs font-serif font-bold transition-all duration-200 flex items-center gap-1.5 shadow-xl ${
                  isActive
                    ? 'bg-heritage-gold text-heritage-navy scale-110 ring-4 ring-heritage-gold/40'
                    : 'glass-card text-heritage-lightgold border border-white/20 hover:border-heritage-gold'
                }`}
              >
                <span>📍</span>
                <span>{hs.title}</span>
              </button>
            );
          })}

          {/* Directional Beacon Line */}
          {activeHotspot && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-48 h-0.5 bg-dashed bg-gradient-to-r from-heritage-gold to-transparent animate-pulse" />
            </div>
          )}
        </div>

        {/* Hotspot List & Navigate Me */}
        <div className="w-full mt-4 space-y-2">
          <div className="text-xs uppercase font-semibold text-gray-400">
            Points of Interest:
          </div>
          {site.hotspots.map((hs) => (
            <div
              key={hs.id}
              onClick={() => {
                soundEngine.playClick();
                onSelectHotspot(hs);
                onClose();
              }}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                activeHotspot?.id === hs.id
                  ? 'bg-heritage-gold/20 border-heritage-gold text-white font-bold'
                  : 'glass-card border-white/10 text-gray-300 hover:bg-white/5'
              }`}
            >
              <div>
                <div className="text-sm font-serif">{hs.title}</div>
                <div className="text-[10px] text-gray-400">{hs.category}</div>
              </div>
              <button className="px-3 py-1 rounded-lg bg-heritage-gold/30 text-heritage-lightgold text-xs font-bold hover:bg-heritage-gold hover:text-heritage-navy transition-colors">
                {t.navigateMe} ➔
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
