import React from 'react';
import { languages } from '../data/translations';
import { soundEngine } from '../utils/audio';

export default function LanguageSelector({ selectedLang, onSelectLang, onContinue, onGoBack, t }) {
  const handleSelect = (langCode) => {
    soundEngine.playClick();
    onSelectLang(langCode);
  };

  return (
    <div className="relative w-full h-screen bg-heritage-navy flex flex-col justify-center items-center p-6 overflow-y-auto">
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

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-heritage-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full glass-panel rounded-3xl p-6 md:p-10 border border-heritage-gold/30 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-heritage-gold/10 border border-heritage-gold/30 text-heritage-lightgold mb-3 text-2xl">
            🌐
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold gold-gradient-text">
            {t.selectLanguage}
          </h2>
          <p className="text-gray-300 text-sm md:text-base mt-2 max-w-lg mx-auto">
            {t.selectLanguageDesc}
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {languages.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-heritage-gold/20 border-heritage-gold shadow-lg shadow-heritage-gold/20 scale-[1.02]'
                    : 'glass-card border-white/10 hover:border-heritage-gold/50 hover:bg-white/5'
                }`}
              >
                <span className="text-3xl">{lang.flag}</span>
                <div>
                  <div className={`font-serif font-semibold text-lg ${isSelected ? 'text-heritage-lightgold' : 'text-gray-100'}`}>
                    {lang.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    Audio TTS & Subtitles Supported
                  </div>
                </div>
                {isSelected && (
                  <div className="ml-auto w-4 h-4 rounded-full bg-heritage-gold flex items-center justify-center text-heritage-navy text-xs font-bold">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={() => {
              soundEngine.playChime();
              onContinue();
            }}
            className="px-10 py-3.5 rounded-xl bg-heritage-gold hover:bg-heritage-lightgold text-heritage-navy font-serif font-bold text-lg tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {t.continueBtn} →
          </button>
        </div>
      </div>
    </div>
  );
}
