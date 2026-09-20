import React, { useState, useEffect } from 'react';
import { User, Globe, Languages, Compass, Sparkles, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUNTRIES, LANGUAGES } from '../../data/localization';
import { heritageAudio } from '../../services/audioSynthesizer';

export const OnboardingWizard = ({ onComplete, initialLang = 'en', translations }) => {
  const [userName, setUserName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [selectedLang, setSelectedLang] = useState(initialLang);
  const [selectedPersona, setSelectedPersona] = useState('explorer');

  // When country changes, automatically recommend appropriate languages
  const handleCountryChange = (countryCode) => {
    const found = COUNTRIES.find((c) => c.code === countryCode);
    if (found) {
      setSelectedCountry(found);
      if (found.defaultLang) {
        setSelectedLang(found.defaultLang);
      }
    }
  };

  const personas = [
    { id: 'explorer', label: 'Curious Traveler', desc: 'Seeking wonder and untold architectural mysteries' },
    { id: 'scholar', label: 'Archaeological Scholar', desc: 'Fascinated by inscriptions, dynasties and alignments' },
    { id: 'pilgrim', label: 'Cultural Pilgrim', desc: 'Connecting deeply with sacred art, traditions and roots' }
  ];

  const handleFinish = (e) => {
    e.preventDefault();
    const finalName = userName.trim() || 'Noble Voyager';

    // Play temple bell and festive confetti
    heritageAudio.playTempleBell();
    heritageAudio.playSitarPluck(659.25);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#c85a32', '#f39c12', '#d4af37']
      });
    } catch (e) {}

    onComplete({
      userName: finalName,
      country: selectedCountry.name,
      countryCode: selectedCountry.code,
      lang: selectedLang,
      persona: selectedPersona
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090c15]/90 backdrop-blur-xl">
      {/* Background Decorative Rings */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#dfba73]/10 to-[#c25e36]/10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-xl rounded-2xl bg-[#0f172a]/95 border border-[#dfba73]/40 shadow-2xl p-6 sm:p-8 overflow-hidden z-10">
        {/* Top Jali Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c25e36] via-[#dfba73] to-[#c25e36]" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#dfba73]/20 border border-[#dfba73]/50 flex items-center justify-center text-[#dfba73]">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-['Cinzel'] text-white">
              {translations.onboardingTitle || 'Prepare Your Sacred Journey'}
            </h2>
            <p className="text-xs sm:text-sm text-[#dfba73]/80">
              {translations.onboardingSub || 'Step across centuries into the golden eras of India.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleFinish} className="space-y-6">
          {/* Step 1: User Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#dfba73] font-medium mb-2">
              1. {translations.namePrompt || 'What should we call you?'}
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#dfba73]/60" />
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={translations.namePlaceholder || 'Enter your name (e.g., Ananya, Marcus, Kenji)'}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#090c15]/80 border border-[#dfba73]/30 text-white placeholder-stone-400 focus:outline-none focus:border-[#dfba73] focus:ring-2 focus:ring-[#dfba73]/20 transition-all text-sm"
              />
            </div>
          </div>

          {/* Step 2: Country Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#dfba73] font-medium mb-2">
              2. {translations.countryPrompt || 'Select your home country'}
            </label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#dfba73]/60" />
              <select
                value={selectedCountry.code}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#090c15]/80 border border-[#dfba73]/30 text-white focus:outline-none focus:border-[#dfba73] focus:ring-2 focus:ring-[#dfba73]/20 transition-all text-sm appearance-none cursor-pointer"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-[#090c15] text-white">
                    {c.flag} {c.name} ({c.greeting})
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#dfba73]/70">
                ▼
              </div>
            </div>
            <p className="text-[11px] text-stone-400 mt-1.5 flex items-center gap-1">
              <span>Greeting:</span>
              <span className="text-[#dfba73] font-medium">"{selectedCountry.greeting}"</span>
              <span>— removes cultural distance instantly!</span>
            </p>
          </div>

          {/* Step 3: Dynamic Language Selector mapped to Country */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider text-[#dfba73] font-medium">
                3. {translations.languagePrompt || 'Select your preferred language'}
              </label>
              <span className="text-[10px] text-[#dfba73] bg-[#dfba73]/10 px-2 py-0.5 rounded border border-[#dfba73]/30">
                Mapped to {selectedCountry.name}
              </span>
            </div>
            <div className="relative">
              <Languages className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#dfba73]/60" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#090c15]/80 border border-[#dfba73]/30 text-white focus:outline-none focus:border-[#dfba73] focus:ring-2 focus:ring-[#dfba73]/20 transition-all text-sm appearance-none cursor-pointer"
              >
                {LANGUAGES.map((lang) => {
                  const isRecommended = selectedCountry.supportedLangs?.includes(lang.code);
                  return (
                    <option key={lang.code} value={lang.code} className="bg-[#090c15] text-white">
                      {lang.native} ({lang.name}) {isRecommended ? '★ Recommended' : ''}
                    </option>
                  );
                })}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#dfba73]/70">
                ▼
              </div>
            </div>
          </div>

          {/* Persona Style Badges */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#dfba73] font-medium mb-2">
              Traveler Persona
            </label>
            <div className="grid grid-cols-3 gap-2">
              {personas.map((p) => {
                const isSelected = selectedPersona === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPersona(p.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#dfba73]/20 border-[#dfba73] text-white shadow-md'
                        : 'bg-[#090c15]/60 border-stone-700/50 text-stone-400 hover:border-[#dfba73]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold">{p.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#dfba73]" />}
                    </div>
                    <p className="text-[10px] text-stone-400 leading-tight line-clamp-2">{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#c25e36] text-[#090c15] font-bold text-base font-['Cinzel'] tracking-wider shadow-lg hover:shadow-[0_0_25px_rgba(223,186,115,0.6)] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{translations.enterQuest || 'Enter HeritageQuest'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
