import React, { useState } from 'react';
import { X, Clock, Sparkles, ArrowRight, Compass, Shield, Crown } from 'lucide-react';
import { MONUMENTS } from '../../data/monumentsData';
import { heritageAudio } from '../../services/audioSynthesizer';

export const TimeTravelModal = ({ isOpen, onClose, onSelectMonument }) => {
  const timeEras = [
    { year: '250 BCE', title: 'Ancient Mauryan Buddhist Sanctuaries', dynasty: 'Maurya Empire', monumentId: 'sanchi-stupa', host: 'Emperor Ashoka the Great', color: '#ea580c' },
    { year: '1010 CE', title: 'Imperial Chola Monolithic Granite Vimana', dynasty: 'Chola Dynasty', monumentId: 'brihadisvara-temple', host: 'Emperor Rajaraja Chola I', color: '#b91c1c' },
    { year: '1250 CE', title: 'Astronomical Cosmic Chariot of Surya', dynasty: 'Eastern Ganga Dynasty', monumentId: 'konark-sun-temple', host: 'King Narasimhadeva I', color: '#d97706' },
    { year: '1648 CE', title: 'Mughal Architectural Zenith & Marble Paradise', dynasty: 'Mughal Empire', monumentId: 'taj-mahal', host: 'Emperor Shah Jahan', color: '#059669' },
    { year: '1799 CE', title: 'Rajput Honeycomb Palace of 953 Winds', dynasty: 'Kachhwaha Dynasty', monumentId: 'hawa-mahal', host: 'Maharaja Sawai Pratap Singh', color: '#ea580c' },
    { year: '1906 CE', title: 'White Makrana Marble Palace & Angel of Victory', dynasty: 'British Renaissance', monumentId: 'victoria-memorial', host: 'Sir William Emerson', color: '#0284c7' },
    { year: '1911 CE', title: 'Indo-Saracenic Gateway on the Arabian Sea', dynasty: 'British Raj Architecture', monumentId: 'gateway-of-india', host: 'Sir George Wittet', color: '#475569' },
    { year: '1912 CE', title: 'Indo-Saracenic Durbar & Amba Vilas Royalty', dynasty: 'Wadiyar Dynasty', monumentId: 'mysore-palace', host: 'Nalwadi Krishnaraja Wadiyar IV', color: '#d4af37' }
  ];

  const [selectedEraIdx, setSelectedEraIdx] = useState(3); // Default 1648 CE (Taj Mahal)

  const currentEra = timeEras[selectedEraIdx];
  const targetMonument = MONUMENTS.find((m) => m.id === currentEra.monumentId) || MONUMENTS[0];

  const handleWarp = () => {
    heritageAudio.playTempleBell();
    heritageAudio.playSitarPluck(659.25);
    onSelectMonument(currentEra.monumentId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0b1120] border-2 border-[#e5b869]/50 rounded-3xl shadow-2xl overflow-hidden p-6 max-h-[90vh] flex flex-col justify-between text-white selection:bg-[#e5b869] selection:text-[#060913]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#060913] text-stone-300 hover:text-white border border-[#e5b869]/40 flex items-center justify-center font-bold cursor-pointer"
          aria-label="Close time travel warp portal"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-6 h-6 text-[#e5b869]" />
            <h3 className="text-xl font-bold font-['Cinzel'] text-white">Chronos Time Portal</h3>
          </div>
          <p className="text-xs text-stone-300 mb-6 font-serif">
            Slide across two millennia of Indian civilization. Teleport directly into the living era of ancient sovereigns and master architects.
          </p>

          {/* Era Horizontal Year Slider */}
          <div className="relative mb-6">
            <input
              type="range"
              min="0"
              max={timeEras.length - 1}
              value={selectedEraIdx}
              onChange={(e) => {
                setSelectedEraIdx(parseInt(e.target.value));
                heritageAudio.playSitarPluck(440 + parseInt(e.target.value) * 35);
              }}
              className="w-full h-2 bg-[#060913] rounded-lg appearance-none cursor-pointer accent-[#e5b869] border border-[#e5b869]/30"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-2 font-mono">
              {timeEras.map((era, i) => (
                <span
                  key={i}
                  className={`cursor-pointer transition-colors ${
                    selectedEraIdx === i ? 'text-[#e5b869] font-bold scale-110' : 'hover:text-white'
                  }`}
                  onClick={() => setSelectedEraIdx(i)}
                >
                  {era.year.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Selected Era Highlight Card */}
          <div className="bg-[#060913] border border-[#e5b869]/40 rounded-2xl p-5 relative overflow-hidden mb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xl font-bold font-mono text-[#e5b869]">
                {currentEra.year}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#e11d48]/20 border border-[#e11d48]/40 text-[#fca5a5]">
                {currentEra.dynasty}
              </span>
            </div>

            <h4 className="text-lg font-bold font-['Cinzel'] text-white mb-1">
              {currentEra.title}
            </h4>

            <div className="flex items-center gap-2 text-xs text-stone-300 mb-4">
              <Crown className="w-3.5 h-3.5 text-[#e5b869]" />
              <span>Living Host:</span>
              <span className="text-[#e5b869] font-semibold">{currentEra.host}</span>
            </div>

            {/* Target Monument Preview */}
            <div className="flex items-center gap-3 bg-[#111827] p-3 rounded-xl border border-stone-800">
              <img
                src={targetMonument.heroImage}
                alt={`${targetMonument.name} - ${targetMonument.subtitle} in ${targetMonument.state}`}
                loading="lazy"
                decoding="async"
                className="w-14 h-14 rounded-lg object-cover border border-[#e5b869]/30"
              />
              <div>
                <div className="font-bold text-sm text-white font-['Cinzel']">
                  {targetMonument.name}
                </div>
                <div className="text-[11px] text-stone-400 font-serif italic">
                  {targetMonument.state} • {targetMonument.era}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warp Button */}
        <button
          onClick={handleWarp}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e5b869] via-[#f3d389] to-[#d4af37] text-[#060913] font-bold text-sm shadow-xl hover:shadow-[0_0_25px_rgba(229,184,105,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-102 active:scale-98"
        >
          <span>Warp to Year {currentEra.year} & Meet {currentEra.host.split(' ')[0]}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
