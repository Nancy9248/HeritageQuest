import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../utils/audio';

export default function GamificationModal({
  site,
  points,
  unlockedBadges,
  onAddPoints,
  onUnlockBadge,
  onClose,
  t
}) {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' or 'badges'
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizStatus, setQuizStatus] = useState(null); // 'correct', 'incorrect'

  const allBadges = [
    { id: 'history_explorer', title: '🏅 History Explorer', desc: 'Explored historical site stories' },
    { id: 'architecture_expert', title: '🏛 Architecture Expert', desc: 'Inspected structural hotspots' },
    { id: 'secret_finder', title: '🔍 Secret Finder', desc: 'Discovered hidden legends' },
    { id: 'heritage_navigator', title: '🗺 Heritage Navigator', desc: 'Used GPS location navigation' },
    { id: 'time_traveler', title: '👑 Time Traveler', desc: 'Traveled across historical eras' }
  ];

  const currentQuestion = site.quiz[currentQuizIdx] || site.quiz[0];

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;

    if (selectedOption === currentQuestion.correct) {
      soundEngine.playChime();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setQuizStatus('correct');
      onAddPoints(50);
      onUnlockBadge('history_explorer');
    } else {
      soundEngine.playClick();
      setQuizStatus('incorrect');
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setQuizStatus(null);
    if (currentQuizIdx < site.quiz.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
    } else {
      setCurrentQuizIdx(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-xl w-full glass-panel rounded-3xl p-6 border border-heritage-gold/50 shadow-2xl flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center font-bold"
        >
          ✕
        </button>

        {/* Top Summary Bar */}
        <div className="flex items-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-serif font-bold gold-gradient-text">
              {points}
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              {t.heritagePoints}
            </div>
          </div>

          <div className="h-8 w-px bg-white/20" />

          <div className="text-center">
            <div className="text-3xl font-serif font-bold text-heritage-amber">
              {unlockedBadges.length}/{allBadges.length}
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              {t.badges}
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-black/40 p-1 rounded-xl mb-6 w-full max-w-xs border border-white/10">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-serif font-bold transition-all ${
              activeTab === 'quiz' ? 'bg-heritage-gold text-heritage-navy shadow' : 'text-gray-400'
            }`}
          >
            {t.quizTitle}
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-serif font-bold transition-all ${
              activeTab === 'badges' ? 'bg-heritage-gold text-heritage-navy shadow' : 'text-gray-400'
            }`}
          >
            {t.badges}
          </button>
        </div>

        {/* TAB 1: Quiz Challenge */}
        {activeTab === 'quiz' && (
          <div className="w-full text-left">
            <div className="text-xs text-heritage-lightgold font-mono mb-1">
              Question {currentQuizIdx + 1} of {site.quiz.length}
            </div>

            <h3 className="text-base md:text-lg font-serif font-bold text-white mb-4">
              {currentQuestion.question}
            </h3>

            <div className="space-y-2.5 mb-4">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correct;
                let btnStyle = 'glass-card border-white/10 text-gray-200 hover:border-heritage-gold/50';

                if (quizStatus) {
                  if (isCorrect) btnStyle = 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold';
                  else if (isSelected) btnStyle = 'bg-rose-500/30 border-rose-400 text-rose-200';
                } else if (isSelected) {
                  btnStyle = 'bg-heritage-gold/20 border-heritage-gold text-heritage-lightgold font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !quizStatus && setSelectedOption(idx)}
                    className={`w-full p-3 rounded-xl border text-xs md:text-sm font-serif text-left transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Answer Result Explanation */}
            {quizStatus && (
              <div className={`p-3 rounded-xl text-xs mb-4 ${quizStatus === 'correct' ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' : 'bg-amber-950/60 border border-amber-500/40 text-amber-300'}`}>
                <div className="font-bold mb-1">
                  {quizStatus === 'correct' ? t.correctAnswer : t.incorrectAnswer}
                </div>
                <div>{currentQuestion.explanation}</div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              {!quizStatus ? (
                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 rounded-xl bg-heritage-gold text-heritage-navy font-serif font-bold text-xs disabled:opacity-40 hover:scale-105 transition-all"
                >
                  {t.submit}
                </button>
              ) : (
                <button
                  onClick={handleNextQuiz}
                  className="px-6 py-2.5 rounded-xl bg-heritage-gold text-heritage-navy font-serif font-bold text-xs hover:scale-105 transition-all"
                >
                  Next Challenge ➔
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Badges Gallery */}
        {activeTab === 'badges' && (
          <div className="w-full space-y-3 max-h-64 overflow-y-auto pr-1">
            {allBadges.map((badge) => {
              const isUnlocked = unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    isUnlocked
                      ? 'bg-heritage-gold/15 border-heritage-gold text-white'
                      : 'glass-card border-white/10 opacity-50'
                  }`}
                >
                  <div>
                    <div className="font-serif font-bold text-sm text-heritage-lightgold">
                      {badge.title}
                    </div>
                    <div className="text-[11px] text-gray-300">{badge.desc}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${isUnlocked ? 'bg-heritage-gold text-heritage-navy' : 'bg-white/10 text-gray-400'}`}>
                    {isUnlocked ? 'Unlocked ✓' : 'Locked'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
