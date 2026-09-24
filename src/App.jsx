import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/Onboarding/SplashScreen';
import { OnboardingWizard } from './components/Onboarding/OnboardingWizard';
import { Navbar } from './components/Navbar/Navbar';
import { MonumentViewer } from './components/MonumentViewer/MonumentViewer';
import { HeritageMap } from './components/HeritageMap/HeritageMap';
import { TimelineView } from './components/Timeline/TimelineView';
import { AcharyaGuideDrawer } from './components/LocalGuide/AcharyaGuideDrawer';
import { ArtifactInspectorModal } from './components/UI/ArtifactInspectorModal';
import { GamificationModal } from './components/UI/GamificationModal';
import { TimeTravelModal } from './components/UI/TimeTravelModal';
import { PassportModal } from './components/UI/PassportModal';
import { AuthModal } from './components/UI/AuthModal';
import { NetworkStatusBanner } from './components/Common/NetworkStatusBanner';
import { getCurrentUser, logUserAction, syncUserProfile } from './services/supabaseClient';
import { TRANSLATIONS } from './data/localization';
import { MONUMENTS } from './data/monumentsData';
import { heritageAudio } from './services/audioSynthesizer';
import { AcharyaAvatar } from './components/LocalGuide/AcharyaAvatar';
import { Bot, Sparkles } from 'lucide-react';

export function App() {
  const [viewState, setViewState] = useState('splash'); // 'splash', 'onboarding', 'app'
  const [activeTab, setActiveTab] = useState('monuments'); // 'monuments', 'map', 'timeline'
  const [activeMonumentId, setActiveMonumentId] = useState('taj-mahal');
  const [currentLang, setCurrentLang] = useState('en');
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Gamification & Modals State with LocalStorage Persistence
  const [points, setPoints] = useState(() => {
    return parseInt(localStorage.getItem('hq_points') || '100', 10);
  });
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('hq_badges');
      return saved ? JSON.parse(saved) : ['history_explorer'];
    } catch (e) {
      return ['history_explorer'];
    }
  });
  const [visitedMonuments, setVisitedMonuments] = useState(() => {
    try {
      const saved = localStorage.getItem('hq_visited_monuments');
      return saved ? JSON.parse(saved) : ['taj-mahal'];
    } catch (e) {
      return ['taj-mahal'];
    }
  });
  const [askedQuestionsCount, setAskedQuestionsCount] = useState(() => {
    return parseInt(localStorage.getItem('hq_asked_questions') || '0', 10);
  });

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isArtifactsModalOpen, setIsArtifactsModalOpen] = useState(false);
  const [isTimeTravelModalOpen, setIsTimeTravelModalOpen] = useState(false);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check current auth user on mount
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setCurrentUser(user);
        if (user.user_metadata?.full_name) {
          setUserContext((prev) => ({ ...prev, userName: user.user_metadata.full_name }));
        }
      }
    });
  }, []);

  const [userContext, setUserContext] = useState({
    userName: '',
    country: 'India',
    countryCode: 'IN',
    lang: 'en',
    persona: 'explorer'
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('hq_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('hq_badges', JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  useEffect(() => {
    localStorage.setItem('hq_visited_monuments', JSON.stringify(visitedMonuments));
  }, [visitedMonuments]);

  useEffect(() => {
    localStorage.setItem('hq_asked_questions', askedQuestionsCount.toString());
  }, [askedQuestionsCount]);

  const translations = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const currentMonument = MONUMENTS.find((m) => m.id === activeMonumentId) || MONUMENTS[0];

  const handleBegin = () => {
    setViewState('onboarding');
  };

  const handleOnboardingComplete = (userData) => {
    setUserContext(userData);
    setCurrentLang(userData.lang || 'en');
    setViewState('app');
  };

  const handleSelectMonument = (monumentId) => {
    setActiveMonumentId(monumentId);
    setActiveTab('monuments');
    heritageAudio.playMonumentAmbient(monumentId);

    // Database Audit Trail Logging
    logUserAction({
      userId: currentUser?.id,
      action_type: 'visit_monument',
      monument_id: monumentId,
      details: `Visited monument ${monumentId}`
    });

    // Track visited monuments & award XP for first visit
    setVisitedMonuments((prev) => {
      if (!prev.includes(monumentId)) {
        const next = [...prev, monumentId];
        handleAddPoints(50); // +50 XP for new monument discovered
        if (next.length >= 8) {
          handleUnlockBadge('time_traveler'); // Unlock "Time Traveler" badge for exploring all 8 monuments
        }
        return next;
      }
      return prev;
    });
  };

  const handleAddPoints = (pts) => {
    setPoints((prev) => prev + pts);
  };

  const handleUnlockBadge = (badgeId) => {
    setUnlockedBadges((prev) => (prev.includes(badgeId) ? prev : [...prev, badgeId]));
  };

  // Global helper window attachment for question asking rewards & audit logging
  useEffect(() => {
    window.__hqRewardQuestion = (charName = 'Historical Duo') => {
      setAskedQuestionsCount((prevCount) => {
        const nextCount = prevCount + 1;
        handleAddPoints(25); // +25 XP per question asked to host/guide
        if (nextCount >= 5) {
          handleUnlockBadge('scholar'); // Unlock "Heritage Scholar" badge for 5+ questions asked
        }
        return nextCount;
      });

      logUserAction({
        userId: currentUser?.id,
        action_type: 'ask_question',
        monument_id: activeMonumentId,
        character_name: charName,
        details: `Asked question to ${charName} at ${activeMonumentId}`
      });
    };
    window.__hqRewardGPS = () => {
      handleAddPoints(50); // +50 XP for interacting with GPS trails
      handleUnlockBadge('explorer'); // Unlock "GPS Trailblazer" badge
      logUserAction({
        userId: currentUser?.id,
        action_type: 'complete_trail',
        monument_id: activeMonumentId,
        details: `Interacted with GPS trail at ${activeMonumentId}`
      });
    };
  }, [activeMonumentId, currentUser]);

  return (
    <div className="min-h-screen bg-[#090c15] text-[#f5ede0] flex flex-col font-['Outfit'] selection:bg-[#dfba73] selection:text-[#090c15] relative">
      {/* Global Network Status & Low-Bandwidth / PWA Banner */}
      <NetworkStatusBanner />

      {/* 1. Splash Screen with Vasudhaiva Kutumbakam */}
      {viewState === 'splash' && (
        <SplashScreen
          onBegin={handleBegin}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          currentUser={currentUser}
          currentLang={currentLang}
          translations={translations}
        />
      )}

      {/* 2. Personalized Onboarding Wizard */}
      {viewState === 'onboarding' && (
        <OnboardingWizard
          onComplete={handleOnboardingComplete}
          initialLang={currentLang}
          translations={translations}
        />
      )}

      {/* 3. Main Experience Layer */}
      {viewState === 'app' && (
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentLang={currentLang}
            setCurrentLang={setCurrentLang}
            userContext={userContext}
            onOpenGuide={() => setIsGuideOpen(true)}
            translations={translations}
            points={points}
            unlockedBadges={unlockedBadges}
            onOpenQuiz={() => setIsQuizModalOpen(true)}
            onOpenArtifacts={() => setIsArtifactsModalOpen(true)}
            onOpenTimeTravel={() => setIsTimeTravelModalOpen(true)}
            onOpenPassport={() => setIsPassportModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onSelectMonument={handleSelectMonument}
          />

          <main className="flex-1 flex flex-col">
            {activeTab === 'monuments' && (
              <MonumentViewer
                activeMonumentId={activeMonumentId}
                onSelectMonument={setActiveMonumentId}
                userContext={userContext}
                currentLang={currentLang}
                translations={translations}
                onOpenLocalGuide={() => setIsGuideOpen(true)}
                points={points}
                onAddPoints={handleAddPoints}
                unlockedBadges={unlockedBadges}
                onUnlockBadge={handleUnlockBadge}
              />
            )}

            {activeTab === 'map' && (
              <HeritageMap
                onSelectMonument={handleSelectMonument}
                currentMonumentId={activeMonumentId}
                userContext={userContext}
                translations={translations}
                currentLang={currentLang}
              />
            )}

            {activeTab === 'timeline' && (
              <TimelineView
                onSelectMonument={handleSelectMonument}
                translations={translations}
                currentLang={currentLang}
              />
            )}
          </main>

          {/* Persistent Floating Quick-Access Button for Acharya Vidyadhar (Modern Guide) */}
          {!isGuideOpen && (
            <button
              onClick={() => {
                heritageAudio.playSitarPluck(440);
                setIsGuideOpen(true);
              }}
              className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#c25e36] text-[#090c15] font-bold text-xs sm:text-sm shadow-2xl hover:shadow-[0_0_25px_rgba(223,186,115,0.7)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-[#dfba73]/60"
              title="Summon Acharya Vidyadhar for practical travel help"
              aria-label="Summon Acharya Vidyadhar for practical travel help"
            >
              <AcharyaAvatar className="w-8 h-8 -ml-1" />
              <span className="font-['Cinzel'] hidden sm:inline">{translations.askGuide || 'Ask Acharya (Guide)'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </button>
          )}

          {/* Acharya Vidyadhar - The Modern Local Guide & Escort Drawer */}
          <AcharyaGuideDrawer
            isOpen={isGuideOpen}
            onClose={() => setIsGuideOpen(false)}
            currentMonument={currentMonument}
            userContext={userContext}
            currentLang={currentLang}
            translations={translations}
          />

          {/* Low-Bandwidth Mobile Access & Offline Resilience Banner */}
          <footer className="w-full bg-[#060913] border-t border-[#dfba73]/20 py-2.5 px-4 text-[11px] text-stone-300 flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#dfba73] font-semibold">Low-Bandwidth &amp; Offline PWA Enabled</span>
              <span className="text-stone-300">• Procedural Web Audio (0 KB) &amp; Offline Resilient</span>
            </div>
            <div className="text-stone-400 text-[10px] font-mono">
              WCAG AA Compliant • Service Worker Active • Responsive 320px–4K
            </div>
          </footer>

          {/* Global Modals */}
          <GamificationModal
            isOpen={isQuizModalOpen}
            onClose={() => setIsQuizModalOpen(false)}
            points={points}
            onAddPoints={handleAddPoints}
            unlockedBadges={unlockedBadges}
            onUnlockBadge={handleUnlockBadge}
            currentMonumentId={activeMonumentId}
          />

          <ArtifactInspectorModal
            isOpen={isArtifactsModalOpen}
            onClose={() => setIsArtifactsModalOpen(false)}
            initialMonumentId={activeMonumentId}
            onSelectMonument={handleSelectMonument}
          />

          <TimeTravelModal
            isOpen={isTimeTravelModalOpen}
            onClose={() => setIsTimeTravelModalOpen(false)}
            onSelectMonument={handleSelectMonument}
          />

          <PassportModal
            isOpen={isPassportModalOpen}
            onClose={() => setIsPassportModalOpen(false)}
            userName={userContext.userName || 'Cultural Explorer'}
            visitedCount={visitedMonuments.length}
            totalMonuments={MONUMENTS.length}
            points={points}
            badgesCount={unlockedBadges.length}
          />

        </div>
      )}

      {/* Global Authentication Modal (Accessible from Splash, Onboarding, or Main App) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUserChange={(user) => {
          setCurrentUser(user);
          if (user?.user_metadata?.full_name) {
            setUserContext((prev) => ({ ...prev, userName: user.user_metadata.full_name }));
          }
        }}
      />
    </div>
  );
}

export default App;

