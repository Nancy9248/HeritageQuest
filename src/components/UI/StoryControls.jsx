import React from 'react';
import { soundEngine } from '../../utils/audio';

export default function StoryControls({
  chapters,
  currentChapterIdx,
  onSelectChapter,
  onPrevChapter,
  onNextChapter,
  onOpenTimeTravel,
  onOpenMinimap,
  activeEra,
  site,
  t
}) {
  const currentChapter = chapters[currentChapterIdx] || chapters[0];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4 pointer-events-auto">
      <div className="glass-panel rounded-2xl p-3 md:p-4 border border-heritage-gold/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Chapter Selection & Info */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-8 h-8 rounded-full bg-heritage-gold/20 border border-heritage-gold/50 flex items-center justify-center text-heritage-lightgold font-serif font-bold text-xs shrink-0">
            {currentChapterIdx + 1}/{chapters.length}
          </div>
          
          <div className="flex-1 min-w-0">
            <select
              value={currentChapterIdx}
              onChange={(e) => {
                soundEngine.playClick();
                onSelectChapter(parseInt(e.target.value, 10));
              }}
              className="w-full bg-slate-900/90 text-heritage-sand font-serif font-semibold text-xs md:text-sm rounded-lg px-2.5 py-1 border border-white/10 outline-none cursor-pointer truncate"
            >
              {chapters.map((ch, idx) => (
                <option key={ch.id} value={idx} className="bg-slate-900 text-white">
                  Ch {idx + 1}: {ch.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Playback Nav Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playClick();
              onPrevChapter();
            }}
            disabled={currentChapterIdx === 0}
            className="p-2 rounded-xl glass-card text-white hover:text-heritage-gold disabled:opacity-30 disabled:pointer-events-none transition-all"
            title={t.prevChapter}
          >
            ◀◀
          </button>

          {/* Time Travel Launcher */}
          <button
            onClick={() => {
              soundEngine.playTimeWarp();
              onOpenTimeTravel();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-heritage-terracotta to-heritage-amber text-white font-serif font-bold text-xs tracking-wide shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <span>⏳</span>
            <span>{t.timeTravel}</span>
          </button>

          {/* Minimap Launcher */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenMinimap();
            }}
            className="p-2 rounded-xl glass-card text-heritage-lightgold hover:bg-heritage-gold/20 border border-heritage-gold/30 transition-all text-xs font-bold flex items-center gap-1"
            title={t.map}
          >
            <span>🗺️</span>
            <span className="hidden sm:inline">{t.map}</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onNextChapter();
            }}
            disabled={currentChapterIdx === chapters.length - 1}
            className="p-2 rounded-xl glass-card text-white hover:text-heritage-gold disabled:opacity-30 disabled:pointer-events-none transition-all"
            title={t.nextChapter}
          >
            ▶▶
          </button>
        </div>
      </div>
    </div>
  );
}
