import React, { useState, useEffect } from 'react';
import {
  Compass,
  Volume2,
  VolumeX,
  Languages,
  Bot,
  MapPin,
  Clock,
  Sparkles,
  Layers,
  Radio,
  X,
  LogIn
} from 'lucide-react';
import { LANGUAGES } from '../../data/localization';
import { heritageAudio } from '../../services/audioSynthesizer';
import { gpsService, formatLatitude, formatLongitude } from '../../services/gpsService';
import { GPSCoordinatesRadar } from '../HeritageMap/GPSCoordinatesRadar';
import { AcharyaAvatar } from '../LocalGuide/AcharyaAvatar';

export const Navbar = ({
  activeTab,
  setActiveTab,
  currentLang,
  setCurrentLang,
  userContext,
  onOpenGuide,
  translations,
  points = 100,
  unlockedBadges = ['history_explorer'],
  onOpenQuiz,
  onOpenArtifacts,
  onOpenTimeTravel,
  onOpenPassport,
  onOpenAuth,
  onSelectMonument
}) => {
  const [isAudioMuted, setIsAudioMuted] = useState(heritageAudio.isMuted);
  const [gpsPos, setGpsPos] = useState(gpsService.currentPosition);
  const [showGpsModal, setShowGpsModal] = useState(false);

  useEffect(() => {
    const unsub = gpsService.subscribe((pos) => {
      setGpsPos(pos);
    });
    return () => unsub();
  }, []);

  const toggleSound = () => {
    const muted = heritageAudio.toggleMute();
    setIsAudioMuted(muted);
  };

  const navTabs = [
    { id: 'monuments', label: translations.explore3d || '3D Monuments & WebXR', icon: Layers },
    { id: 'map', label: translations.heritageMap || 'GPS Heritage Trails', icon: MapPin },
    { id: 'timeline', label: translations.timeline || 'Timeline & Eras', icon: Clock }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#060913]/95 border-b border-[#e5b869]/25 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-1 sm:gap-2">
          {/* Brand & Motto */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setActiveTab('monuments')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#f3d389] via-[#e5b869] to-[#b88c3a] p-0.5 shadow-lg group-hover:shadow-[0_0_20px_rgba(229,184,105,0.6)] transition-all">
                <div className="w-full h-full rounded-full bg-[#060913] flex items-center justify-center text-[#e5b869]">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-base sm:text-lg text-white font-['Cinzel'] tracking-wide">
                    Heritage<span className="heritage-text-gold">Quest</span>
                  </span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-[#e5b869]/15 text-[#e5b869] border border-[#e5b869]/35 font-semibold hidden lg:inline-block">
                    WebXR
                  </span>
                </div>
                <p className="text-[9px] text-stone-400 font-serif italic hidden xl:block">
                  वसुधैव कुटुम्बकम् • The World Is One Family
                </p>
              </div>
            </button>
          </div>

          {/* Center Nav Tabs */}
          <nav className="flex items-center gap-0.5 sm:gap-1 bg-[#0b1120]/90 p-1 rounded-2xl border border-[#e5b869]/20">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    heritageAudio.playSitarPluck(440);
                  }}
                  className={`px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#e5b869] to-[#d4af37] text-[#060913] shadow-md shadow-[#e5b869]/25 font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-[#111827]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Live GPS, XP, Audio, Language, Guide, Profile & Passport */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Live GPS Coordinates Pill */}
            <button
              onClick={() => {
                setShowGpsModal(true);
                heritageAudio.playSitarPluck(523.25);
              }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-[#0b1120] hover:bg-[#111827] border border-[#e5b869]/30 hover:border-[#e5b869] text-stone-200 text-xs font-mono transition-all cursor-pointer shadow-sm group"
              title="Click to view Instant Live GPS Coordinates & Telemetry"
              aria-label="View live GPS coordinates and telemetry"
            >
              <div className="relative flex items-center justify-center">
                <span className={`w-2 h-2 rounded-full ${gpsPos.isLive ? 'bg-emerald-400' : 'bg-[#e5b869]'}`} />
                <span className={`absolute w-2 h-2 rounded-full opacity-75 animate-ping ${gpsPos.isLive ? 'bg-emerald-400' : 'bg-[#e5b869]'}`} />
              </div>
              <span className="text-[10px] sm:text-[11px] text-white font-mono group-hover:text-[#e5b869] transition-colors hidden sm:inline">
                {formatLatitude(gpsPos.lat).split(' ')[0]}°, {formatLongitude(gpsPos.lng).split(' ')[0]}°
              </span>
            </button>

            {/* XP & Academy Badges Pill */}
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#e5b869]/15 to-[#d4af37]/15 hover:from-[#e5b869]/25 hover:to-[#d4af37]/25 border border-[#e5b869]/35 text-xs font-bold text-[#e5b869] transition-all cursor-pointer shadow-sm"
              title="Open HeritageQuest Academy (Quiz & Badges)"
              aria-label="Open HeritageQuest Academy quiz and badges"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e5b869]" />
              <span>{points} XP</span>
            </button>

            {/* Soft Veena Acoustic Audio Button */}
            <button
              onClick={toggleSound}
              className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer ${
                !isAudioMuted
                  ? 'bg-[#e5b869]/20 text-[#e5b869] border-[#e5b869]/40'
                  : 'bg-[#0b1120] text-stone-400 border-stone-700 hover:text-white'
              }`}
              title={!isAudioMuted ? 'Mute Heritage Ambient Audio' : 'Play Heritage Ambient Audio'}
              aria-label={!isAudioMuted ? 'Mute ambient audio' : 'Play ambient audio'}
            >
              {!isAudioMuted ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative flex items-center">
              <Languages className="w-3.5 h-3.5 text-[#e5b869] absolute left-2 pointer-events-none" />
              <select
                aria-label="Select display and voice language"
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="pl-7 pr-2 py-1.5 rounded-xl bg-[#0b1120] border border-[#e5b869]/30 text-xs text-white focus:outline-none focus:border-[#e5b869] cursor-pointer appearance-none max-w-[90px] sm:max-w-none"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#060913] text-white">
                    {lang.native}
                  </option>
                ))}
              </select>
            </div>

            {/* Local Guide Acharya Vidyadhar Trigger */}
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#e5b869] to-[#c49746] hover:from-[#f3d389] hover:to-[#d4af37] text-[#060913] text-xs font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-[#e5b869]/60"
              title={translations.askGuide || 'Ask Acharya Vidyadhar (Local Guide)'}
              aria-label={translations.askGuide || 'Ask Acharya Vidyadhar, local guide'}
            >
              <AcharyaAvatar className="w-4 h-4 sm:w-5 sm:h-5 -ml-0.5" />
              <span className="hidden lg:inline">{translations.acharyaTitle || 'Acharya'}</span>
            </button>

            {/* User Profile & Auth Security Button */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#e5b869]/25">
              <button
                onClick={onOpenPassport}
                className="flex items-center gap-1 text-xs text-stone-300 hover:text-white cursor-pointer group"
                title="Click to view & download your Shareable Cultural Passport"
              >
                <div className="w-6 h-6 rounded-full bg-[#e5b869]/20 border border-[#e5b869]/40 flex items-center justify-center text-[10px] text-[#e5b869] font-bold group-hover:scale-110 transition-transform">
                  {userContext.userName ? userContext.userName.charAt(0).toUpperCase() : 'C'}
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-stone-200 font-semibold truncate max-w-[70px] leading-tight">
                    {userContext.userName || 'Traveler'}
                  </span>
                  <span className="text-[10px] text-[#e5b869] flex items-center gap-0.5 font-bold">
                    🏅 {unlockedBadges.length} Badges
                  </span>
                </div>
              </button>

              <button
                onClick={onOpenAuth}
                className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#e5b869]/20 to-[#d4af37]/20 hover:from-[#e5b869]/30 hover:to-[#d4af37]/30 border border-[#e5b869]/40 text-[#e5b869] font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="Account Login, Registration & Database Audit Logs"
                aria-label="Account Login, Registration & Database Audit Logs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Instant Live GPS Coordinates Modal (Never redirects away from page) */}
      {showGpsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-2xl">
            <GPSCoordinatesRadar
              onClose={() => setShowGpsModal(false)}
              currentLang={currentLang}
              translations={translations}
              onSelectMonument={(id) => {
                if (onSelectMonument) onSelectMonument(id);
                setShowGpsModal(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
