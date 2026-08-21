import React from 'react';
import { soundEngine } from '../../utils/audio';

export default function VRModeOverlay({ onClose, t }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between items-center p-6 text-center">
      {/* Header */}
      <div className="max-w-md w-full pt-4">
        <div className="inline-block p-3 rounded-full bg-heritage-gold/20 text-heritage-lightgold text-3xl mb-2">
          🥽
        </div>
        <h2 className="text-2xl font-serif font-bold gold-gradient-text">
          WebXR & VR/AR Exploration Ready
        </h2>
        <p className="text-xs text-gray-300 mt-1">
          Insert your device into a VR Headset or mobile cardboard holder for 360° stereoscopic immersion.
        </p>
      </div>

      {/* Simulated Stereo Split Screen Divider Graphic */}
      <div className="w-full max-w-xl h-48 my-auto rounded-2xl border-2 border-dashed border-heritage-gold/40 flex items-center justify-around relative overflow-hidden bg-slate-950">
        <div className="text-center p-4 border-r border-white/20 flex-1">
          <span className="text-4xl">👁️</span>
          <div className="text-[10px] text-gray-400 mt-2 font-mono">LEFT EYE VIEW (3D)</div>
        </div>
        <div className="text-center p-4 flex-1">
          <span className="text-4xl">👁️</span>
          <div className="text-[10px] text-gray-400 mt-2 font-mono">RIGHT EYE VIEW (3D)</div>
        </div>
        <div className="absolute inset-[40%] bg-heritage-gold/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      </div>

      {/* Footer Exit Button */}
      <div className="pb-4">
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="px-8 py-3 rounded-xl bg-heritage-gold text-heritage-navy font-serif font-bold text-sm shadow-xl hover:scale-105 transition-all"
        >
          Exit VR Mode ✕
        </button>
      </div>
    </div>
  );
}
