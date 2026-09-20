import React from 'react';
import { MapPin, AlertTriangle, RefreshCw, Radio, Bot, CloudRain, ShieldCheck } from 'lucide-react';

export function GpsErrorFallback({ onRetry, onSelectPreset }) {
  return (
    <div className="bg-[#0b1120]/95 border border-amber-500/40 rounded-2xl p-4 text-stone-200 shadow-xl backdrop-blur-md animate-fadeIn">
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-amber-300 text-sm font-['Cinzel']">GPS Signal Offline / Blocked</h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
              Manual Mode Active
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            Browser geolocation permission denied or satellite signal unavailable. Explore monuments using manual coordinate presets:
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => onSelectPreset && onSelectPreset('taj-mahal')}
              className="px-2.5 py-1 rounded-lg bg-[#060913] hover:bg-[#e5b869]/20 border border-[#e5b869]/30 text-xs text-[#e5b869] font-medium transition-all cursor-pointer"
            >
              📍 Taj Mahal (27.1751° N)
            </button>
            <button
              onClick={() => onSelectPreset && onSelectPreset('mysore-palace')}
              className="px-2.5 py-1 rounded-lg bg-[#060913] hover:bg-[#e5b869]/20 border border-[#e5b869]/30 text-xs text-[#e5b869] font-medium transition-all cursor-pointer"
            >
              📍 Mysore Palace (12.3052° N)
            </button>
            <button
              onClick={() => onSelectPreset && onSelectPreset('konark-sun-temple')}
              className="px-2.5 py-1 rounded-lg bg-[#060913] hover:bg-[#e5b869]/20 border border-[#e5b869]/30 text-xs text-[#e5b869] font-medium transition-all cursor-pointer"
            >
              📍 Konark Temple (19.8876° N)
            </button>
          </div>

          <div className="mt-3 pt-2 border-t border-amber-500/20 flex items-center justify-between">
            <span className="text-[11px] text-stone-400">All 8 monument GPS coordinates built-in</span>
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry Location</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatbotErrorFallback({ onRetry }) {
  return (
    <div className="p-3 my-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-stone-200 text-xs animate-fadeIn">
      <div className="flex items-center gap-2 text-amber-300 font-semibold mb-1">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Offline Heritage Intelligence Active</span>
      </div>
      <p className="text-stone-300 text-[11px] leading-relaxed">
        Live AI cloud connection timed out or offline. Acharya Vidyadhar is relying on his verified local 20-language historical database.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 flex items-center gap-1 text-[11px] text-amber-400 hover:underline font-semibold cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Retry Live AI Connection</span>
        </button>
      )}
    </div>
  );
}

export function WeatherErrorFallback({ onRetry, monumentName = 'this monument' }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-[#0b1120] border border-[#e5b869]/20 text-xs">
      <div className="flex items-center gap-2">
        <CloudRain className="w-4 h-4 text-[#e5b869]/70 shrink-0" />
        <div>
          <span className="text-stone-300 font-medium block text-[11px]">Seasonal Average Active</span>
          <span className="text-[#e5b869] text-[10px]">28°C • Pleasant Cultural Weather</span>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="p-1.5 rounded-lg bg-[#e5b869]/10 hover:bg-[#e5b869]/20 border border-[#e5b869]/30 text-[#e5b869] transition-all cursor-pointer"
          title="Refresh live weather"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
