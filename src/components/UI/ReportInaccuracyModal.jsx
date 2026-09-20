import React, { useState } from 'react';
import { Flag, X, Check, MessageSquare, Send } from 'lucide-react';

export function ReportInaccuracyModal({ isOpen, onClose, monumentName = 'Taj Mahal' }) {
  const [feedbackType, setFeedbackType] = useState('Historical Fact');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    // Save report to localStorage
    const existing = JSON.parse(localStorage.getItem('hq_inaccuracy_reports') || '[]');
    const newReport = {
      id: Date.now(),
      monumentName,
      feedbackType,
      description,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('hq_inaccuracy_reports', JSON.stringify([...existing, newReport]));

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setDescription('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#090c15] border border-amber-500/40 rounded-3xl p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2 text-amber-300">
            <Flag className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base font-['Cinzel'] text-white">Report an Inaccuracy</h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-200 p-1 cursor-pointer"
            aria-label="Close report modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 flex flex-col items-center gap-3 text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold text-base">Feedback Recorded!</h4>
            <p className="text-xs text-stone-300 max-w-xs">
              Thank you for helping preserve Indian cultural accuracy for {monumentName}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <div>
              <label className="text-xs text-stone-300 block mb-1 font-semibold">Monument:</label>
              <div className="px-3 py-1.5 rounded-xl bg-[#0b1120] border border-[#e5b869]/30 text-xs font-bold text-[#e5b869]">
                {monumentName}
              </div>
            </div>

            <div>
              <label className="text-xs text-stone-300 block mb-1 font-semibold">Inaccuracy Category:</label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0b1120] border border-[#e5b869]/30 text-xs text-white focus:outline-none focus:border-[#e5b869] cursor-pointer"
              >
                <option value="Historical Fact">Historical Date or Era Correction</option>
                <option value="Translation Note">Translation / Language Note</option>
                <option value="Architectural Detail">Architectural Detail Correction</option>
                <option value="Audio or Visual">Audio or Visual Asset Note</option>
                <option value="Other">Other Suggestion</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-300 block mb-1 font-semibold">Details & Suggested Correction:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                placeholder="Please describe what should be updated and your reference source..."
                className="w-full px-3 py-2 rounded-xl bg-[#0b1120] border border-[#e5b869]/30 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#e5b869] resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-500/20">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#e5b869] to-[#d4af37] text-[#060913] text-xs font-bold shadow-md hover:brightness-110 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
