import React, { useState } from 'react';
import { X, Award, CheckCircle2, XCircle, HelpCircle, Trophy, Sparkles, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { heritageAudio } from '../../services/audioSynthesizer';
import { MONUMENTS } from '../../data/monumentsData';

export const GamificationModal = ({
  isOpen,
  onClose,
  points,
  onAddPoints,
  unlockedBadges,
  onUnlockBadge,
  currentMonumentId = 'taj-mahal'
}) => {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' or 'badges'
  const [monumentIdx, setMonumentIdx] = useState(
    Math.max(0, MONUMENTS.findIndex((m) => m.id === currentMonumentId))
  );
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerState, setAnswerState] = useState(null); // 'correct', 'incorrect'

  const activeMonument = MONUMENTS[monumentIdx] || MONUMENTS[0];
  const quizQuestions = activeMonument.quiz || [];
  const currentQuestion = quizQuestions[questionIdx] || quizQuestions[0];

  const allBadges = [
    { id: 'history_explorer', title: '🏅 History Explorer', desc: 'Answered historical quiz questions correctly' },
    { id: 'time_traveler', title: '👑 Time Traveler', desc: 'Visited all 8 iconic Indian heritage monuments' },
    { id: 'scholar', title: '📜 Heritage Scholar', desc: 'Asked 5+ questions to historical hosts & Acharya' },
    { id: 'explorer', title: '🗺️ GPS Trailblazer', desc: 'Activated live GPS coordinates & heritage trails' },
    { id: 'architecture_expert', title: '🏛️ Architecture Master', desc: 'Inspected 3D architectural hotspot secrets' }
  ];

  const handleOptionClick = (idx) => {
    if (answerState) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;

    if (selectedOption === currentQuestion.correct) {
      setAnswerState('correct');
      heritageAudio.playTempleBell();
      heritageAudio.playSitarPluck(659.25);
      onAddPoints(50);
      onUnlockBadge('history_explorer');

      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#c85a32', '#f39c12', '#d4af37']
        });
      } catch (e) {}
    } else {
      setAnswerState('incorrect');
      heritageAudio.playSitarPluck(220);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setAnswerState(null);
    if (questionIdx < quizQuestions.length - 1) {
      setQuestionIdx((prev) => prev + 1);
    } else {
      // Advance to next monument's quiz
      setQuestionIdx(0);
      setMonumentIdx((prev) => (prev + 1) % MONUMENTS.length);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#0f172a] border-2 border-[#dfba73]/50 rounded-3xl shadow-2xl overflow-hidden p-6 max-h-[90vh] flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#090c15] text-stone-300 hover:text-white border border-[#dfba73]/40 flex items-center justify-center font-bold cursor-pointer"
          aria-label="Close quiz and academy modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Score Counter & Tabs */}
        <div>
          <div className="flex items-center justify-between mb-4 pr-8">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#dfba73]" />
              <div>
                <h3 className="text-lg font-bold font-['Cinzel'] text-white">HeritageQuest Academy</h3>
                <span className="text-[11px] text-[#dfba73]">Earn XP & Unlock Cultural Badges</span>
              </div>
            </div>

            {/* XP Points Pill */}
            <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#dfba73] to-[#c5a059] text-[#090c15] font-bold text-xs shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{points} XP</span>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="flex items-center gap-2 mb-6 border-b border-[#dfba73]/20 pb-2">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-[#dfba73] to-[#c5a059] text-[#090c15] shadow-md font-bold'
                  : 'bg-[#090c15] text-stone-300 hover:text-white'
              }`}
            >
              🏛️ Monument Quiz
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'badges'
                  ? 'bg-gradient-to-r from-[#dfba73] to-[#c5a059] text-[#090c15] shadow-md font-bold'
                  : 'bg-[#090c15] text-stone-300 hover:text-white'
              }`}
            >
              🏆 Badges & Achievements ({unlockedBadges.length}/{allBadges.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Quiz Content */}
        {activeTab === 'quiz' && currentQuestion && (
          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#dfba73] font-semibold">
                Monument: <strong className="text-white">{activeMonument.name}</strong>
              </span>
              <span className="text-[11px] text-stone-400">
                Question {questionIdx + 1} of {quizQuestions.length}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-medium text-white leading-relaxed">
              {currentQuestion.question}
            </h4>

            {/* Options */}
            <div className="space-y-2">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-[#090c15]/80 border-stone-700/60 text-stone-200 hover:border-[#dfba73]/40';

                if (answerState && idx === currentQuestion.correct) {
                  btnStyle = 'bg-emerald-900/60 border-emerald-500 text-white';
                } else if (answerState === 'incorrect' && isSelected) {
                  btnStyle = 'bg-rose-900/60 border-rose-500 text-white';
                } else if (isSelected) {
                  btnStyle = 'bg-[#dfba73]/20 border-[#dfba73] text-[#dfba73]';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {answerState && idx === currentQuestion.correct && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {answerState === 'incorrect' && isSelected && (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation */}
            {answerState && (
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed border animate-in fade-in duration-300 ${
                  answerState === 'correct'
                    ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/70 border-rose-500/40 text-rose-200'
                }`}
              >
                <strong>{answerState === 'correct' ? '✨ Excellent! (+50 XP)' : '❌ Not quite!'}</strong>
                <p className="mt-1">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Badges Content */}
        {activeTab === 'badges' && (
          <div className="flex-1 overflow-y-auto space-y-2.5">
            {allBadges.map((badge) => {
              const isUnlocked = unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-[#090c15] border-[#dfba73] shadow-md shadow-[#dfba73]/10'
                      : 'bg-[#090c15]/40 border-stone-800 opacity-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#0f172a] border border-[#dfba73]/40 flex items-center justify-center text-xl">
                    {isUnlocked ? '🏅' : '🔒'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-white font-['Cinzel']">
                        {badge.title}
                      </h4>
                      {isUnlocked && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-400">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Button */}
        {activeTab === 'quiz' && (
          <div className="pt-4 border-t border-[#dfba73]/20 flex justify-end">
            {!answerState ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#dfba73] to-[#c5a059] text-[#090c15] font-bold text-xs font-['Cinzel'] tracking-wider disabled:opacity-40 hover:shadow-[0_0_15px_rgba(223,186,115,0.6)] transition-all cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-[#c25e36] hover:bg-[#d9663c] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
