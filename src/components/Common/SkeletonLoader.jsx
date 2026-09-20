import React from 'react';
import { Compass, Sparkles, CloudSun } from 'lucide-react';

export function Monument3DSkeleton() {
  return (
    <div className="w-full h-full min-h-[420px] rounded-3xl bg-[#0b1120]/90 border border-[#e5b869]/20 flex flex-col items-center justify-center p-6 relative overflow-hidden backdrop-blur-md animate-pulse">
      {/* Background shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e5b869]/5 to-transparent animate-shimmer" />

      {/* Center 3D viewport compass loader */}
      <div className="w-24 h-24 rounded-full border-2 border-[#e5b869]/30 flex items-center justify-center relative mb-4">
        <div className="w-16 h-16 rounded-full border border-dashed border-[#e5b869]/50 animate-spin-slow" />
        <Compass className="w-10 h-10 text-[#e5b869]/70 animate-pulse absolute" />
      </div>

      <div className="h-4 w-48 bg-[#e5b869]/20 rounded-full mb-2" />
      <div className="h-3 w-64 bg-stone-700/40 rounded-full" />

      {/* Floating HUD Skeleton lines */}
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="h-6 w-20 bg-[#e5b869]/15 rounded-lg" />
        <div className="h-6 w-24 bg-[#e5b869]/15 rounded-lg" />
      </div>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <div className="h-8 w-28 bg-[#e5b869]/20 rounded-xl" />
      </div>
    </div>
  );
}

export function ChatbotBubbleSkeleton() {
  return (
    <div className="flex gap-3 my-3 animate-fadeIn">
      <div className="w-8 h-8 rounded-full bg-[#e5b869]/20 border border-[#e5b869]/40 flex items-center justify-center shrink-0">
        <Sparkles className="w-4 h-4 text-[#e5b869] animate-spin" />
      </div>
      <div className="bg-[#0b1120] border border-[#e5b869]/30 rounded-2xl p-3 max-w-[80%] rounded-tl-none">
        <div className="flex items-center gap-1.5 py-1">
          <span className="w-2 h-2 rounded-full bg-[#e5b869] animate-ping" />
          <span className="w-2 h-2 rounded-full bg-[#e5b869]/70 animate-ping delay-150" />
          <span className="w-2 h-2 rounded-full bg-[#e5b869]/40 animate-ping delay-300" />
          <span className="text-xs text-[#e5b869]/80 font-serif italic ml-2">Consulting historical archives...</span>
        </div>
      </div>
    </div>
  );
}

export function WeatherCardSkeleton() {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#0b1120]/80 border border-[#e5b869]/20 animate-pulse">
      <div className="w-8 h-8 rounded-xl bg-[#e5b869]/15 flex items-center justify-center shrink-0">
        <CloudSun className="w-4 h-4 text-[#e5b869]/60" />
      </div>
      <div>
        <div className="h-3 w-20 bg-[#e5b869]/20 rounded mb-1" />
        <div className="h-2.5 w-28 bg-stone-700/50 rounded" />
      </div>
    </div>
  );
}
