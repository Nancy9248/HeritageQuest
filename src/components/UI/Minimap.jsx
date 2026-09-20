import React from 'react';
import { Compass } from 'lucide-react';

export const Minimap = ({ hotspots = [], activeMonumentName = '' }) => {
  return (
    <div className="absolute bottom-4 right-4 z-20 hidden sm:flex flex-col items-center pointer-events-none select-none">
      <div className="relative w-24 h-24 rounded-full bg-[#0f172a]/95 border-2 border-[#dfba73]/60 shadow-2xl backdrop-blur-md flex items-center justify-center overflow-hidden">
        {/* Radar concentric range rings */}
        <div className="absolute inset-2 rounded-full border border-[#dfba73]/25" />
        <div className="absolute inset-5 rounded-full border border-[#dfba73]/15" />

        {/* Crosshairs */}
        <div className="absolute w-full h-[1px] bg-[#dfba73]/20" />
        <div className="absolute h-full w-[1px] bg-[#dfba73]/20" />

        {/* Cardinal Directions */}
        <span className="absolute top-1 text-[8px] font-bold text-[#dfba73] font-mono">N</span>
        <span className="absolute bottom-1 text-[8px] font-bold text-stone-400 font-mono">S</span>
        <span className="absolute left-1.5 text-[8px] font-bold text-stone-400 font-mono">W</span>
        <span className="absolute right-1.5 text-[8px] font-bold text-stone-400 font-mono">E</span>

        {/* Central Monument Marker */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#dfba73] shadow-[0_0_8px_#dfba73] z-10" />

        {/* Hotspot Radar Blips */}
        {hotspots.map((h, i) => {
          // Map x and z 3D coordinates to radar circle percentage
          const blipX = 48 + h.x * 7;
          const blipY = 48 + h.z * 7;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#c25e36] animate-ping"
              style={{
                left: `${Math.max(10, Math.min(86, blipX))}px`,
                top: `${Math.max(10, Math.min(86, blipY))}px`
              }}
            />
          );
        })}

        {/* Radar Sweep Needle */}
        <div
          className="absolute inset-0 rounded-full border-t border-r border-[#dfba73]/30 animate-spin"
          style={{ animationDuration: '6s' }}
        />
      </div>

      <span className="mt-1 text-[9px] font-mono text-[#dfba73]/80 tracking-wider uppercase">
        Radar HUD
      </span>
    </div>
  );
};
