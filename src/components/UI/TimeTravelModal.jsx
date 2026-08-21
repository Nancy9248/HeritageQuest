import React from 'react';
import { soundEngine } from '../../utils/audio';

export default function TimeTravelModal({ site, activeEra, onSelectEra, onClose, t }) {
  const handleSelect = (eraId) => {
    soundEngine.playTimeWarp();
    onSelectEra(eraId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full glass-panel rounded-3xl p-6 md:p-8 border border-heritage-gold/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⏳</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold gold-gradient-text">
                {t.timeTravelTitle}
              </h2>
              <p className="text-xs text-gray-300">
                Shift the 3D environment across historical centuries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Time Eras Cards */}
        <div className="space-y-4 mb-6">
          {site.timeEras.map((era) => {
            const isActive = activeEra === era.id;
            return (
              <button
                key={era.id}
                onClick={() => handleSelect(era.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                  isActive
                    ? 'bg-gradient-to-r from-heritage-gold/30 to-heritage-terracotta/30 border-heritage-gold shadow-lg scale-[1.02]'
                    : 'glass-card border-white/10 hover:border-heritage-gold/50 hover:bg-white/5'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-heritage-gold/20 text-heritage-lightgold font-mono font-bold text-xs">
                      {era.year}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-white">
                      {era.name}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {era.description}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  {isActive ? (
                    <span className="px-3 py-1 rounded-full bg-heritage-gold text-heritage-navy text-xs font-bold uppercase tracking-wider">
                      Active Era
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full glass-card text-heritage-lightgold text-xs font-semibold hover:bg-heritage-gold hover:text-heritage-navy transition-colors">
                      Warp Here ➔
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center text-xs text-gray-400 italic">
          Shifting eras dynamically alters skyboxes, lighting, audio ambience, and architectural reconstruction states.
        </div>
      </div>
    </div>
  );
}
