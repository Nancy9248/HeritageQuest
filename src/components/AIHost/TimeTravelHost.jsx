import React, { useState, useEffect, useMemo } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  MessageCircle,
  Crown,
  Send,
  HelpCircle,
  Shield,
  Info,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Users,
  User,
  Sparkle,
  Layers
} from 'lucide-react';
import { speechService } from '../../services/speechService';
import { geminiService } from '../../services/geminiService';
import { heritageAudio } from '../../services/audioSynthesizer';
import { getLocalizedDuoIntro, getLocalizedDuoDialogues } from '../../data/multilingualDuoDialogues';

export const TimeTravelHost = ({
  monument,
  userContext,
  currentLang = 'en',
  translations = {},
  onOpenLocalGuide
}) => {
  const duo = monument.historicalDuo || {
    maleHost: monument.historicalHost,
    femaleHost: monument.historicalHost,
    introExchange: [],
    dialogueExchanges: []
  };

  const male = duo.maleHost;
  const female = duo.femaleHost;

  // View state: 'duo' | 'male' | 'female'
  const [viewMode, setViewMode] = useState('duo');
  const [isFullBodyExpanded, setIsFullBodyExpanded] = useState(false);

  // Multilingual dynamic exchanges
  const localizedIntro = useMemo(() => {
    return getLocalizedDuoIntro(monument.id, currentLang) || duo.introExchange || [];
  }, [monument.id, currentLang]);

  const localizedDialogues = useMemo(() => {
    return getLocalizedDuoDialogues(monument.id, currentLang) || duo.dialogueExchanges || [];
  }, [monument.id, currentLang]);

  // Active dialogue exchange & line index
  const [activeExchange, setActiveExchange] = useState({
    id: 'intro',
    label: translations.welcomingDiscourse || 'Welcoming Historical Discourse',
    exchange: localizedIntro
  });
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Audio & Animation states
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [blink, setBlink] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);

  // Costume detail tab: 'male' | 'female'
  const [selectedCostumeHost, setSelectedCostumeHost] = useState('male');
  const [activeCostumeKey, setActiveCostumeKey] = useState(null);

  // Custom AI Query
  const [customQuestion, setCustomQuestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [aiCustomResponse, setAiCustomResponse] = useState(null);

  // Active speaking line
  const activeLine =
    activeExchange.exchange && activeExchange.exchange.length > 0
      ? activeExchange.exchange[Math.min(currentLineIndex, activeExchange.exchange.length - 1)]
      : { speaker: 'male', speakerName: male.name, text: male.periodGreeting || 'Welcome.' };

  const activeSpeaker = aiCustomResponse ? 'both' : activeLine?.speaker || 'male';

  // Periodic eye blink effect for realistic animated characters
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Animated mouth movement while speaking
  useEffect(() => {
    if (!isPlayingAudio) {
      setMouthOpen(false);
      return;
    }
    const mouthInterval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 150);
    return () => clearInterval(mouthInterval);
  }, [isPlayingAudio]);

  // When monument or language changes, update the active exchange with localized content
  useEffect(() => {
    speechService.stop();
    setIsPlayingAudio(false);
    setIsAutoPlay(false);
    setAiCustomResponse(null);
    setCurrentLineIndex(0);

    const newIntro = getLocalizedDuoIntro(monument.id, currentLang) || duo.introExchange || [];
    setActiveExchange({
      id: 'intro',
      label: translations.welcomingDiscourse || 'Welcoming Historical Discourse',
      exchange: newIntro
    });
  }, [monument.id, currentLang, localizedIntro]);

  // Handle single-line or exchange audio playback
  const playCurrentLine = (line, autoAdvance = false) => {
    if (!line) return;

    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      setIsAutoPlay(false);
      return;
    }

    heritageAudio.playSitarPluck(line.speaker === 'female' ? 659.25 : 440.0);

    const pitch = line.speaker === 'female' ? 1.15 : 0.88;
    const gender = line.speaker === 'female' ? 'female' : 'male';

    speechService.speak(line.text, currentLang, {
      rate: currentLang === 'en' ? 0.94 : 0.90,
      pitch,
      gender,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => {
        setIsPlayingAudio(false);
        if (autoAdvance) {
          setCurrentLineIndex((prev) => {
            if (prev < activeExchange.exchange.length - 1) {
              const nextIdx = prev + 1;
              setTimeout(() => {
                playCurrentLine(activeExchange.exchange[nextIdx], true);
              }, 400);
              return nextIdx;
            } else {
              setIsAutoPlay(false);
              return prev;
            }
          });
        }
      },
      onError: () => {
        setIsPlayingAudio(false);
        setIsAutoPlay(false);
      }
    });
  };

  const handleToggleAutoPlay = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      setIsAutoPlay(false);
    } else {
      setIsAutoPlay(true);
      playCurrentLine(activeLine, true);
    }
  };

  const handleNextLine = () => {
    speechService.stop();
    setIsPlayingAudio(false);
    setIsAutoPlay(false);
    if (currentLineIndex < activeExchange.exchange.length - 1) {
      const nextIdx = currentLineIndex + 1;
      setCurrentLineIndex(nextIdx);
      playCurrentLine(activeExchange.exchange[nextIdx], false);
    }
  };

  const handlePrevLine = () => {
    speechService.stop();
    setIsPlayingAudio(false);
    setIsAutoPlay(false);
    if (currentLineIndex > 0) {
      const prevIdx = currentLineIndex - 1;
      setCurrentLineIndex(prevIdx);
      playCurrentLine(activeExchange.exchange[prevIdx], false);
    }
  };

  const handleSelectExchange = (exch) => {
    speechService.stop();
    setIsPlayingAudio(false);
    setIsAutoPlay(false);
    setAiCustomResponse(null);
    setActiveExchange(exch);
    setCurrentLineIndex(0);
    setTimeout(() => {
      playCurrentLine(exch.exchange[0], false);
    }, 200);
  };

  // Custom AI Sovereign Inquiry Form
  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    const query = customQuestion.trim();
    setCustomQuestion('');
    setIsThinking(true);
    speechService.stop();
    setIsPlayingAudio(false);

    try {
      const response = await geminiService.askHeritageAI({
        message: query,
        userContext,
        currentMonumentId: monument.id,
        hostMode: 'historical',
        lang: currentLang
      });

      setAiCustomResponse(response);
      const currentSpeakerGender = viewMode === 'female' || selectedCostumeHost === 'female' ? 'female' : 'male';
      speechService.speak(response, currentLang, {
        gender: currentSpeakerGender,
        pitch: currentSpeakerGender === 'female' ? 1.15 : 0.88,
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  // SVG Dimension & Viewbox calculation
  const getViewBox = () => {
    if (viewMode === 'male') return '40 20 210 465';
    if (viewMode === 'female') return '210 20 210 465';
    return '0 20 460 465';
  };

  const hostCostume =
    selectedCostumeHost === 'female'
      ? female.costumeDetails || {}
      : male.costumeDetails || {};

  return (
    <div className="bg-[#0b1120] border border-[#e5b869]/30 rounded-3xl p-3 sm:p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-300">
      {/* Golden Celestial Ambient Halo */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#e5b869]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER: Co-Host Names, Badges, and Action Bar             */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#e5b869]/20 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#e5b869]/30 to-[#d4af37]/10 border border-[#e5b869]/40 flex items-center justify-center text-[#e5b869] shadow-inner">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-white font-['Cinzel'] tracking-wide">
                {male.name} <span className="text-[#e5b869] font-sans font-normal">&amp;</span> {female.name}
              </h3>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#e5b869]/20 border border-[#e5b869]/40 text-[#fde047] font-semibold">
                {translations.historicalDuo || 'Historical Duo'}
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              <span className="text-[#e5b869]">{male.role}</span> &amp; <span className="text-[#f472b6]">{female.role}</span> • {monument.era.split('(')[0]}
            </p>
          </div>
        </div>

        {/* View Switcher & Audio Controls */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Duo / Solo Toggle */}
          <div className="flex items-center bg-[#111827] p-0.5 rounded-xl border border-stone-800 text-[11px]">
            <button
              onClick={() => setViewMode('duo')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                viewMode === 'duo'
                  ? 'bg-[#e5b869] text-[#060913] font-bold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
              title="View Co-Host Duo together"
            >
              {translations.duo || 'Duo'}
            </button>
            <button
              onClick={() => {
                setViewMode('male');
                setSelectedCostumeHost('male');
              }}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'male'
                  ? 'bg-[#e5b869] text-[#060913] font-bold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
              title={`Focus on ${male.name}`}
            >
              {male.name.split(' ')[0]}
            </button>
            <button
              onClick={() => {
                setViewMode('female');
                setSelectedCostumeHost('female');
              }}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'female'
                  ? 'bg-[#e5b869] text-[#060913] font-bold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
              title={`Focus on ${female.name}`}
            >
              {female.name.split(' ')[0]}
            </button>
          </div>

          {/* Full-Body Expand Button */}
          <button
            onClick={() => setIsFullBodyExpanded(!isFullBodyExpanded)}
            className="p-1.5 rounded-xl bg-[#111827] border border-[#e5b869]/30 text-stone-300 hover:text-white hover:border-[#e5b869] transition-all cursor-pointer"
            title={isFullBodyExpanded ? "Compact View" : "Expand Full-Body Stage"}
            aria-label={isFullBodyExpanded ? "Compact view" : "Expand full-body stage"}
          >
            {isFullBodyExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Master Audio Toggle */}
          <button
            onClick={handleToggleAutoPlay}
            className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#e5b869] text-[#060913] border-[#e5b869] shadow-lg shadow-[#e5b869]/30 font-bold'
                : 'bg-[#111827] text-stone-300 border-stone-700 hover:border-[#e5b869]/50 hover:text-white'
            }`}
            title={isPlayingAudio ? 'Stop Dialogue Audio' : 'Play Narration Dialogue'}
            aria-label={isPlayingAudio ? 'Stop dialogue audio' : 'Play narration dialogue'}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="text-xs font-mono">{translations.stop || 'STOP'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span className="text-xs">{translations.listen || 'LISTEN'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN DUAL-COLUMN LAYOUT                                        */}
      {/* ------------------------------------------------------------- */}
      <div className={`grid gap-4 ${isFullBodyExpanded ? 'grid-cols-1 md:grid-cols-12' : 'grid-cols-1 md:grid-cols-12'}`}>
        
        {/* =========================================================== */}
        {/* LEFT / CENTER: 2D Flat-Illustration Host Portraits Stage    */}
        {/* =========================================================== */}
        <div className={`${isFullBodyExpanded ? 'md:col-span-6' : 'md:col-span-5'} flex flex-col justify-between bg-gradient-to-b from-[#060913] via-[#09101f] to-[#04060d] rounded-2xl border border-[#e5b869]/25 p-3 relative overflow-hidden group shadow-inner min-h-[380px]`}>
          
          {/* Stage Header & Era Badge */}
          <div className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-mono border-b border-stone-800/80 mb-3">
            <div className="flex items-center gap-1.5 text-[#e5b869] font-bold">
              <Crown className="w-4 h-4 text-[#e5b869]" />
              <span className="font-['Cinzel'] uppercase tracking-wider">{monument.name} Historical Duo</span>
            </div>
            <span className="text-[10px] text-stone-300 bg-[#111827] px-2 py-0.5 rounded-full border border-stone-800 font-mono">
              {monument.era || 'Living Era'}
            </span>
          </div>

          {/* 2D Host Character Portrait Cards Container (Duo / Solo Male / Solo Female) */}
          <div className={`grid ${viewMode === 'duo' ? 'grid-cols-2 gap-3' : 'grid-cols-1 max-w-xs mx-auto'} w-full items-stretch my-auto transition-all duration-300`}>
            
            {/* 1. MALE HOST PORTRAIT CARD */}
            {(viewMode === 'duo' || viewMode === 'male') && (
            <div
              onClick={() => {
                setSelectedCostumeHost('male');
                heritageAudio.playSitarPluck(440);
              }}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between p-2.5 bg-[#090d1a]/95 backdrop-blur-md ${
                activeSpeaker === 'male' || activeSpeaker === 'both' || viewMode === 'male'
                  ? 'border-[#e5b869] shadow-[0_0_25px_rgba(229,184,105,0.45)] opacity-100 scale-[1.02] z-10'
                  : 'border-stone-800 opacity-60 hover:opacity-90 hover:border-stone-600 grayscale-[25%]'
              }`}
            >
              {/* Active Speaking Indicator Badge */}
              {(activeSpeaker === 'male' || activeSpeaker === 'both' || viewMode === 'male') && (
                <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-full bg-[#e5b869] text-[#060913] text-[9px] font-bold flex items-center gap-1 shadow-lg">
                  <span className={`w-1.5 h-1.5 rounded-full bg-[#060913] ${isPlayingAudio ? 'animate-ping' : ''}`} />
                  <span>{isPlayingAudio ? 'SPEAKING NOW' : 'MALE HISTORICAL HOST'}</span>
                </div>
              )}

              {/* 2D Portrait Image */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-[#111827] to-[#060913] border border-stone-800/80 mb-2 group">
                <img
                  src={male.portrait || `/assets/hosts/${monument.id}-male.svg`}
                  alt={`${male.name} - ${male.role}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = `/assets/hosts/${monument.id}-male.svg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] via-transparent to-transparent opacity-80" />
              </div>

              {/* Host Title & Role Footer */}
              <div className="w-full text-center">
                <div className="font-bold text-xs text-white font-['Cinzel'] truncate" title={male.name}>
                  {male.name}
                </div>
                <div className="text-[10px] text-[#e5b869] font-medium truncate" title={male.role}>
                  {male.role}
                </div>
              </div>
            </div>
            )}

            {/* 2. FEMALE HOST PORTRAIT CARD */}
            {(viewMode === 'duo' || viewMode === 'female') && (
            <div
              onClick={() => {
                setSelectedCostumeHost('female');
                heritageAudio.playSitarPluck(659);
              }}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between p-2.5 bg-[#120617]/95 backdrop-blur-md ${
                activeSpeaker === 'female' || activeSpeaker === 'both' || viewMode === 'female'
                  ? 'border-[#f472b6] shadow-[0_0_25px_rgba(244,114,182,0.45)] opacity-100 scale-[1.02] z-10'
                  : 'border-stone-800 opacity-60 hover:opacity-90 hover:border-stone-600 grayscale-[25%]'
              }`}
            >
              {/* Active Speaking Indicator Badge */}
              {(activeSpeaker === 'female' || activeSpeaker === 'both' || viewMode === 'female') && (
                <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-full bg-[#f472b6] text-[#060913] text-[9px] font-bold flex items-center gap-1 shadow-lg">
                  <span className={`w-1.5 h-1.5 rounded-full bg-[#060913] ${isPlayingAudio ? 'animate-ping' : ''}`} />
                  <span>{isPlayingAudio ? 'SPEAKING NOW' : 'FEMALE HISTORICAL HOST'}</span>
                </div>
              )}

              {/* 2D Portrait Image */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-[#1c0a24] to-[#08040d] border border-stone-800/80 mb-2 group">
                <img
                  src={female.portrait || `/assets/hosts/${monument.id}-female.svg`}
                  alt={`${female.name} - ${female.role}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = `/assets/hosts/${monument.id}-female.svg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120617] via-transparent to-transparent opacity-80" />
              </div>

              {/* Host Title & Role Footer */}
              <div className="w-full text-center">
                <div className="font-bold text-xs text-white font-['Cinzel'] truncate" title={female.name}>
                  {female.name}
                </div>
                <div className="text-[10px] text-[#f472b6] font-medium truncate" title={female.role}>
                  {female.role}
                </div>
              </div>
            </div>
            )}

          </div>

          {/* Active Speaker Status Bar */}
          <div className="w-full mt-3 p-2.5 rounded-xl bg-[#090c15]/90 border border-stone-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${activeSpeaker === 'female' ? 'bg-[#f472b6]' : 'bg-[#e5b869]'} ${isPlayingAudio ? 'animate-ping' : ''}`} />
              <span className="text-stone-300 font-medium">
                Current Speaker: <strong className="text-white">{activeSpeaker === 'female' ? female.name : male.name}</strong>
              </span>
            </div>
            <span className="text-[10px] text-stone-400 font-mono">
              Line {currentLineIndex + 1} of {activeExchange.exchange ? activeExchange.exchange.length : 1}
            </span>
          </div>

          {/* Attire & Costume Overview Pill */}
          <div className="w-full mt-2 p-2 rounded-xl bg-[#0b1120]/80 border border-stone-800/80 text-[11px] text-stone-300 flex items-center justify-between">
            <div className="truncate pr-2">
              <span className="text-[#e5b869] font-semibold">{selectedCostumeHost === 'female' ? female.name : male.name}:</span>{' '}
              <span>{selectedCostumeHost === 'female' ? female.attireDescription : male.attireDescription}</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => setSelectedCostumeHost('male')}
                className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-all ${selectedCostumeHost === 'male' ? 'bg-[#e5b869] text-[#060913]' : 'text-stone-400 hover:text-white'}`}
              >
                M
              </button>
              <button
                onClick={() => setSelectedCostumeHost('female')}
                className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-all ${selectedCostumeHost === 'female' ? 'bg-[#f472b6] text-[#060913]' : 'text-stone-400 hover:text-white'}`}
              >
                F
              </button>
            </div>
          </div>

        </div>

        {/* =========================================================== */}
        {/* RIGHT COLUMN: Alternating Dialogue Stepper & Q&A            */}
        {/* =========================================================== */}
        <div className={`${isFullBodyExpanded ? 'md:col-span-6' : 'md:col-span-7'} flex flex-col justify-between space-y-3`}>
          
          {/* Active Spoken Dialogue Box */}
          <div className="relative bg-[#060913] border border-[#e5b869]/30 rounded-2xl p-4 shadow-inner">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  activeLine?.speaker === 'female'
                    ? 'bg-[#f472b6]/20 border border-[#f472b6]/40 text-[#fbcfe8]'
                    : 'bg-[#e5b869]/20 border border-[#e5b869]/40 text-[#fef08a]'
                }`}>
                  {activeLine?.speaker === 'female' ? '🌸 ' + female.name : '👑 ' + male.name}
                </span>
                <span className="text-[10px] text-stone-400">
                  ({activeLine?.speaker === 'female' ? female.role : male.role})
                </span>
              </div>

              {/* Stepper Controls */}
              {activeExchange.exchange && activeExchange.exchange.length > 1 && (
                <div className="flex items-center gap-1 text-[11px] text-stone-400">
                  <span>{currentLineIndex + 1} / {activeExchange.exchange.length}</span>
                  <div className="flex items-center ml-1">
                    <button
                      onClick={handlePrevLine}
                      disabled={currentLineIndex === 0}
                      className="p-1 rounded hover:bg-stone-800 disabled:opacity-30 cursor-pointer"
                      title="Previous Line"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-stone-300" />
                    </button>
                    <button
                      onClick={handleNextLine}
                      disabled={currentLineIndex >= activeExchange.exchange.length - 1}
                      className="p-1 rounded hover:bg-stone-800 disabled:opacity-30 cursor-pointer"
                      title="Next Line"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Spoken Text Quote */}
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif italic selection:bg-[#e5b869] selection:text-[#060913] min-h-[55px]">
              "{aiCustomResponse || activeLine?.text || ''}"
            </p>

            {/* Stepper & Play/Pause Bar */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-800/80">
              <span className="text-[10px] text-stone-400 font-mono truncate max-w-[200px]">
                {activeExchange.label}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playCurrentLine(activeLine, false)}
                  className={`px-3 py-1 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer font-semibold ${
                    isPlayingAudio
                      ? 'bg-[#e5b869] text-[#060913] font-bold shadow-md shadow-[#e5b869]/30'
                      : 'bg-[#111827] text-stone-300 border border-stone-700 hover:border-[#e5b869]'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-3 h-3" />
                      <span>{translations.pause || 'Pause'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-[#e5b869]" />
                      <span>{translations.playLine || 'Play Line'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Co-Host Dialogue Exchanges (Alternating Narration Topics) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#e5b869] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#e5b869]" /> {translations.dialogueTopics || 'Co-Host Dialogue Topics'}
              </span>
              <span className="text-[10px] text-stone-400">{translations.alternatingAudioGuide || 'Alternating Museum Audio Guide'}</span>
            </div>

            <div className="space-y-1.5">
              {/* Intro Exchange Button */}
              <button
                onClick={() =>
                  handleSelectExchange({
                    id: 'intro',
                    label: translations.welcomingDiscourse || 'Welcoming Historical Discourse',
                    exchange: localizedIntro
                  })
                }
                className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between group cursor-pointer ${
                  activeExchange.id === 'intro'
                    ? 'bg-[#1e293b] border-[#e5b869] text-white'
                    : 'bg-[#111827]/90 hover:bg-[#1a233b] border-stone-800 text-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">👑🌸</span>
                  <span className="font-medium group-hover:text-[#e5b869] transition-colors">
                    {translations.welcomingDiscourse || 'Welcoming Historical Discourse'} ({localizedIntro.length || 2})
                  </span>
                </div>
                <span className="text-stone-400 group-hover:text-[#e5b869] transition-colors text-sm">→</span>
              </button>

              {/* Dynasty Specific Exchanges */}
              {localizedDialogues.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectExchange(item)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between group cursor-pointer ${
                    activeExchange.id === item.id
                      ? 'bg-[#1e293b] border-[#e5b869] text-white'
                      : 'bg-[#111827]/90 hover:bg-[#1a233b] border-stone-800 text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#e5b869] font-mono">0{idx + 1}</span>
                    <span className="font-medium group-hover:text-[#e5b869] transition-colors line-clamp-1">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-stone-400 group-hover:text-[#e5b869] transition-colors text-sm">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ask Anything in Time Travel Mode */}
          <form onSubmit={handleCustomSubmit} className="relative">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder={`${translations.askAnything || 'Ask historical co-hosts anything...'}`}
              disabled={isThinking}
              className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#060913] border border-stone-700 hover:border-[#e5b869]/50 focus:border-[#e5b869] text-xs text-white placeholder-stone-500 focus:outline-none transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={isThinking || !customQuestion.trim()}
              className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#e5b869] text-[#060913] hover:bg-[#f5d77f] disabled:opacity-40 disabled:hover:bg-[#e5b869] transition-all cursor-pointer font-bold"
              title="Send Inquiry"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Modern Local Guide Link */}
          {onOpenLocalGuide && (
            <button
              onClick={onOpenLocalGuide}
              className="w-full py-2 px-3 rounded-xl bg-[#111827] hover:bg-[#1a233b] border border-[#e5b869]/20 text-[11px] text-[#e5b869] hover:text-white font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#e5b869]" />
              <span>{translations.askGuide || 'Need modern logistics? Ask Local Guide Acharya Vidyadhar'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
