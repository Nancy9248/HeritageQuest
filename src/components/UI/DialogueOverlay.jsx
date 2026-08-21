import React from 'react';
import { soundEngine } from '../../utils/audio';

export default function DialogueOverlay({
  currentSubtitle,
  isSpeaking,
  onRepeatSpeech,
  onTellMeMore,
  onOpenAiChat,
  t
}) {
  const handlePlayVoice = () => {
    soundEngine.playClick();
    onRepeatSpeech();
  };

  return (
    <div className="absolute bottom-24 left-4 right-4 md:right-auto md:max-w-lg z-20 pointer-events-auto">
      <div className="glass-panel rounded-2xl p-4 md:p-5 border border-heritage-gold/40 shadow-2xl">
        {/* Host Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-heritage-amber to-heritage-gold p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-2xl">
                👳🏽‍♂️
              </div>
              {isSpeaking && (
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 animate-ping" />
              )}
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-heritage-lightgold flex items-center gap-2">
                <span>AI Historical Host</span>
                {isSpeaking ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono animate-pulse">
                    🔊 Speaking...
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-heritage-gold/20 text-heritage-lightgold font-mono">
                    Ready to narrate
                  </span>
                )}
              </div>
              <div className="text-[10px] text-gray-300 uppercase tracking-wider">
                Virtual Guide & Storyteller
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Play/Listen Button */}
            <button
              onClick={handlePlayVoice}
              title="Click to hear Host speak narration aloud"
              className={`px-3 py-1.5 rounded-xl font-serif font-bold text-xs transition-all flex items-center gap-1.5 shadow-md ${
                isSpeaking
                  ? 'bg-emerald-500 text-slate-950 scale-105 animate-pulse'
                  : 'bg-heritage-gold hover:bg-heritage-lightgold text-heritage-navy'
              }`}
            >
              <span>🔊</span>
              <span>{isSpeaking ? 'Speaking' : 'Listen Host'}</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenAiChat();
              }}
              className="px-3 py-1.5 rounded-xl bg-heritage-gold/20 hover:bg-heritage-gold/40 text-heritage-lightgold text-xs font-serif font-bold border border-heritage-gold/40 transition-all flex items-center gap-1"
            >
              <span>💬</span>
              <span>{t.askGuide}</span>
            </button>
          </div>
        </div>

        {/* Subtitles Box */}
        <div className="bg-black/50 rounded-xl p-3.5 text-xs md:text-sm text-heritage-sand leading-relaxed min-h-[64px] max-h-[110px] overflow-y-auto font-serif italic border border-white/10 shadow-inner">
          "{currentSubtitle}"
        </div>

        {/* Dialogue Actions */}
        <div className="flex items-center justify-between gap-2 mt-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                onRepeatSpeech();
              }}
              className="px-3 py-1 rounded-lg glass-card text-gray-200 hover:text-heritage-gold transition-colors flex items-center gap-1"
            >
              <span>🔄</span>
              <span>{t.repeat}</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onTellMeMore();
              }}
              className="px-3 py-1 rounded-lg glass-card text-heritage-amber hover:text-heritage-lightgold transition-colors font-semibold flex items-center gap-1"
            >
              <span>✨</span>
              <span>{t.tellMeMore}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
