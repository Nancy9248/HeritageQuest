import React, { useState, useEffect } from 'react';
import { heritageSites } from './data/heritageSites';
import { translations } from './data/translations';
import { siteTranslations } from './data/siteTranslations';
import { speechManager } from './utils/speech';
import { soundEngine } from './utils/audio';

import OpeningScene from './components/OpeningScene';
import LanguageSelector from './components/LanguageSelector';
import GPSDetection from './components/GPSDetection';
import ThreeCanvas from './components/ThreeCanvas';

import Header from './components/UI/Header';
import DialogueOverlay from './components/UI/DialogueOverlay';
import StoryControls from './components/UI/StoryControls';
import TimeTravelModal from './components/UI/TimeTravelModal';
import ArtifactModal from './components/UI/ArtifactModal';
import AIGuideModal from './components/UI/AIGuideModal';
import Minimap from './components/UI/Minimap';
import GamificationModal from './components/UI/GamificationModal';
import VRModeOverlay from './components/UI/VRModeOverlay';

export default function App() {
  const [screen, setScreen] = useState('opening');
  const [selectedLang, setSelectedLang] = useState('en');
  const [userSite, setUserSite] = useState(heritageSites[0]);
  const [userCoords, setUserCoords] = useState(null);

  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [activeEra, setActiveEra] = useState('present');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [dayNightMode, setDayNightMode] = useState('day');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [isTimeWarping, setIsTimeWarping] = useState(false);

  const [showTimeTravel, setShowTimeTravel] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [showAiGuide, setShowAiGuide] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [showGamification, setShowGamification] = useState(false);
  const [showVrMode, setShowVrMode] = useState(false);

  const [points, setPoints] = useState(150);
  const [unlockedBadges, setUnlockedBadges] = useState(['history_explorer']);

  const t = translations[selectedLang] || translations.en;

  // Retrieve localized story data for selected site and language
  const localizedSiteData = siteTranslations[userSite.id]?.[selectedLang] || siteTranslations[userSite.id]?.en;
  
  // Combine base site chapters with localized title & narration if available
  const localizedChapters = userSite.chapters.map((ch, idx) => {
    const locCh = localizedSiteData?.chapters?.[idx];
    return {
      ...ch,
      title: locCh?.title || ch.title,
      narration: locCh?.narration || ch.narration
    };
  });

  const currentChapter = localizedChapters[currentChapterIdx] || localizedChapters[0];

  // Trigger Host Narration when Chapter or Language changes
  useEffect(() => {
    if (screen === 'experience' && currentChapter) {
      triggerNarration(currentChapter.narration);
    }
  }, [screen, currentChapterIdx, userSite, selectedLang]);

  const triggerNarration = (text) => {
    setCurrentSubtitle(text);
    const speechLangMap = {
      en: 'en-US',
      hi: 'hi-IN',
      mr: 'mr-IN',
      pa: 'pa-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      ur: 'ur-IN',
      sa: 'hi-IN',
      ko: 'ko-KR',
      es: 'es-ES',
      fr: 'fr-FR',
      ja: 'ja-JP'
    };
    speechManager.speak(
      text,
      speechLangMap[selectedLang] || 'en-US',
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleSelectSite = (site, coords) => {
    setUserSite(site);
    if (coords) setUserCoords(coords);
    setCurrentChapterIdx(0);
    setActiveEra('present');
    setScreen('experience');

    // Initial Host Greeting in native language
    setTimeout(() => {
      const locGreeting = siteTranslations[site.id]?.[selectedLang]?.greeting || t.hostGreeting;
      triggerNarration(locGreeting);
    }, 800);
  };

  const handleHotspotClick = (hotspot) => {
    setActiveHotspot(hotspot);
    triggerNarration(`${hotspot.title}: ${hotspot.description}`);
    
    if (hotspot.artifactId) {
      const art = userSite.artifacts.find((a) => a.id === hotspot.artifactId);
      if (art) {
        setTimeout(() => setSelectedArtifact(art), 2000);
      }
    }

    handleAddPoints(25);
    handleUnlockBadge('architecture_expert');
  };

  const handleSelectEra = (eraId) => {
    setIsTimeWarping(true);
    setActiveEra(eraId);
    setTimeout(() => setIsTimeWarping(false), 1200);

    const eraObj = userSite.timeEras.find((e) => e.id === eraId);
    if (eraObj) {
      triggerNarration(`${eraObj.name} (${eraObj.year}): ${eraObj.description}`);
    }

    handleAddPoints(40);
    handleUnlockBadge('time_traveler');
  };

  const handleAddPoints = (pts) => {
    setPoints((prev) => prev + pts);
  };

  const handleUnlockBadge = (badgeId) => {
    setUnlockedBadges((prev) => (prev.includes(badgeId) ? prev : [...prev, badgeId]));
  };

  const handleToggleDayNight = () => {
    soundEngine.playClick();
    setDayNightMode((prev) => (prev === 'day' ? 'golden' : prev === 'golden' ? 'night' : 'day'));
  };

  const handleStopSpeech = () => {
    speechManager.stop();
    setIsSpeaking(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-heritage-navy select-none">
      {/* SCREEN 1: Opening Scene */}
      {screen === 'opening' && (
        <OpeningScene onBegin={() => setScreen('language')} />
      )}

      {/* SCREEN 2: Language Selection */}
      {screen === 'language' && (
        <LanguageSelector
          selectedLang={selectedLang}
          onSelectLang={setSelectedLang}
          onContinue={() => setScreen('gps')}
          onGoBack={() => setScreen('opening')}
          t={t}
        />
      )}

      {/* SCREEN 3: GPS & Site Selector */}
      {screen === 'gps' && (
        <GPSDetection
          onSelectSite={handleSelectSite}
          onGoBack={() => setScreen('language')}
          t={t}
        />
      )}

      {/* SCREEN 4: 3D Interactive Heritage Experience */}
      {screen === 'experience' && (
        <div className="relative w-full h-full">
          {/* Header Bar */}
          <Header
            site={userSite}
            userCoords={userCoords}
            selectedLang={selectedLang}
            onSelectLang={setSelectedLang}
            points={points}
            badgesCount={unlockedBadges.length}
            onOpenGamification={() => setShowGamification(true)}
            onOpenVrMode={() => setShowVrMode(true)}
            dayNightMode={dayNightMode}
            onToggleDayNight={handleToggleDayNight}
            onGoBack={() => {
              handleStopSpeech();
              setScreen('gps');
            }}
            t={t}
          />

          {/* 3D WebGL Canvas */}
          <ThreeCanvas
            site={userSite}
            activeEra={activeEra}
            activeHotspot={activeHotspot}
            onHotspotClick={handleHotspotClick}
            isSpeaking={isSpeaking}
            isTimeWarping={isTimeWarping}
            dayNightMode={dayNightMode}
          />

          {/* Dialogue & Subtitles Overlay */}
          <DialogueOverlay
            currentSubtitle={currentSubtitle}
            isSpeaking={isSpeaking}
            onRepeatSpeech={() => triggerNarration(currentSubtitle)}
            onTellMeMore={() => triggerNarration(userSite.longDescription)}
            onOpenAiChat={() => setShowAiGuide(true)}
            t={t}
          />

          {/* Story Controls Bar */}
          <StoryControls
            chapters={localizedChapters}
            currentChapterIdx={currentChapterIdx}
            onSelectChapter={setCurrentChapterIdx}
            onPrevChapter={() => setCurrentChapterIdx((p) => Math.max(0, p - 1))}
            onNextChapter={() => setCurrentChapterIdx((p) => Math.min(localizedChapters.length - 1, p + 1))}
            onOpenTimeTravel={() => setShowTimeTravel(true)}
            onOpenMinimap={() => setShowMinimap(true)}
            activeEra={activeEra}
            site={userSite}
            t={t}
          />

          {/* Time Travel Modal */}
          {showTimeTravel && (
            <TimeTravelModal
              site={userSite}
              activeEra={activeEra}
              onSelectEra={handleSelectEra}
              onClose={() => setShowTimeTravel(false)}
              t={t}
            />
          )}

          {/* 3D Artifact Inspector */}
          {selectedArtifact && (
            <ArtifactModal
              artifact={selectedArtifact}
              onClose={() => setSelectedArtifact(null)}
              t={t}
            />
          )}

          {/* AI Guide Q&A Assistant */}
          {showAiGuide && (
            <AIGuideModal
              site={userSite}
              onClose={() => setShowAiGuide(false)}
              onSpeak={triggerNarration}
              t={t}
            />
          )}

          {/* Site Minimap */}
          {showMinimap && (
            <Minimap
              site={userSite}
              activeHotspot={activeHotspot}
              onSelectHotspot={handleHotspotClick}
              onClose={() => setShowMinimap(false)}
              t={t}
            />
          )}

          {/* Gamification & Quizzes */}
          {showGamification && (
            <GamificationModal
              site={userSite}
              points={points}
              unlockedBadges={unlockedBadges}
              onAddPoints={handleAddPoints}
              onUnlockBadge={handleUnlockBadge}
              onClose={() => setShowGamification(false)}
              t={t}
            />
          )}

          {/* VR / AR Mode Simulator Overlay */}
          {showVrMode && (
            <VRModeOverlay onClose={() => setShowVrMode(false)} t={t} />
          )}
        </div>
      )}
    </div>
  );
}
