import React, { useState, useEffect } from 'react';
import { Download, X, Award, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { generateHeritagePassport, downloadPassportPNG } from '../../services/PassportGenerator';

export function PassportModal({
  isOpen,
  onClose,
  userName = 'Cultural Explorer',
  visitedCount = 8,
  totalMonuments = 8,
  points = 450,
  badgesCount = 4
}) {
  const [customName, setCustomName] = useState(userName);
  const [passportDataUrl, setPassportDataUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      generateHeritagePassport({
        userName: customName,
        visitedCount,
        totalMonuments,
        points,
        badgesCount
      }).then((url) => {
        setPassportDataUrl(url);
        setIsGenerating(false);
      });
    }
  }, [isOpen, customName, visitedCount, totalMonuments, points, badgesCount]);

  if (!isOpen) return null;

  const handleDownload = () => {
    downloadPassportPNG({
      userName: customName,
      visitedCount,
      totalMonuments,
      points,
      badgesCount
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#090c15] border border-[#e5b869]/40 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5b869]/20 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#e5b869] to-[#b88c3a] text-[#060913]">
              <Award className="w-5 h-5 font-bold" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-bold font-['Cinzel'] text-white">
                Shareable Cultural Passport
              </h3>
              <p className="text-xs text-[#e5b869]">
                Your verified record of Indian heritage exploration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-800/80 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close passport modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Name Customization Input */}
        <div className="flex flex-wrap items-center gap-3 bg-[#0b1120] p-3 rounded-2xl border border-[#e5b869]/20">
          <label className="text-xs font-semibold text-stone-300">Name on Passport:</label>
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Enter your name"
            className="flex-1 min-w-[200px] px-3 py-1.5 rounded-xl bg-[#060913] border border-[#e5b869]/40 text-xs text-white focus:outline-none focus:border-[#e5b869]"
          />
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>{visitedCount}/{totalMonuments} Sites Unlocked</span>
          </div>
        </div>

        {/* Passport Preview Canvas Container */}
        <div className="flex-1 relative rounded-2xl overflow-hidden border border-[#e5b869]/30 bg-[#060913] flex items-center justify-center min-h-[220px] max-h-[50vh]">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-2 text-stone-400 text-xs py-12">
              <Sparkles className="w-8 h-8 text-[#e5b869] animate-spin" />
              <span>Generating high-resolution Heritage Passport image...</span>
            </div>
          ) : (
            <img
              src={passportDataUrl}
              alt="HeritageQuest Official Passport"
              className="w-full h-full object-contain max-h-[50vh] rounded-xl shadow-lg"
            />
          )}
        </div>

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5b869]/20 pt-3">
          <span className="text-xs text-stone-400 italic">
            "I traveled through 2,300 years of Indian heritage — HeritageQuest"
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#e5b869] to-[#d4af37] text-[#060913] font-bold text-xs shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Passport PNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
