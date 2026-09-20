import React from 'react';

/**
 * Illustrated portrait avatar of Acharya Vidyadhar
 * Vedic scholar, ASI archaeologist, and cultural escort.
 * Features contoured volumetric shading, saffron silk angavastram with gold zari border,
 * sacred rudraksha mala, and chandan/kumkum tilak.
 */
export const AcharyaAvatar = ({ className = 'w-11 h-11' }) => {
  return (
    <div className={`relative rounded-full overflow-hidden shadow-lg p-[1.5px] bg-gradient-to-tr from-[#c25e36] via-[#dfba73] to-[#ffd700] ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full rounded-full bg-[#0a0d18]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial Halo Lighting */}
          <radialGradient id="acharyaHalo" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#dfba73" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#c25e36" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0a0d18" stopOpacity="0.9" />
          </radialGradient>

          {/* Skin Tones Volumetric Gradients */}
          <linearGradient id="acharyaSkinFace" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#e2ad7d" />
            <stop offset="45%" stopColor="#c98a58" />
            <stop offset="100%" stopColor="#9a5a32" />
          </linearGradient>

          <linearGradient id="acharyaSkinNeck" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#ab6c3e" />
            <stop offset="100%" stopColor="#7a411f" />
          </linearGradient>

          {/* Saffron Angavastram Silk */}
          <linearGradient id="saffronAngavastram" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#ff9933" />
            <stop offset="35%" stopColor="#e66012" />
            <stop offset="70%" stopColor="#bd4106" />
            <stop offset="100%" stopColor="#872902" />
          </linearGradient>

          {/* Gold Zari Embroidery */}
          <linearGradient id="goldZari" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2a8" />
            <stop offset="50%" stopColor="#dfba73" />
            <stop offset="100%" stopColor="#966c1e" />
          </linearGradient>

          {/* Beard Volumetric */}
          <linearGradient id="beardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c2420" />
            <stop offset="50%" stopColor="#1a1412" />
            <stop offset="100%" stopColor="#0e0a09" />
          </linearGradient>

          {/* Rudraksha Bead */}
          <radialGradient id="rudrakshaBead" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#a35429" />
            <stop offset="60%" stopColor="#6e3112" />
            <stop offset="100%" stopColor="#3d1404" />
          </radialGradient>
        </defs>

        {/* Ambient Halo & Aureole */}
        <circle cx="60" cy="60" r="58" fill="url(#acharyaHalo)" />

        {/* Traditional Mandala Sunburst rays in background */}
        <g stroke="#dfba73" strokeWidth="0.8" opacity="0.35">
          <line x1="60" y1="5" x2="60" y2="20" />
          <line x1="20" y1="20" x2="32" y2="32" />
          <line x1="100" y1="20" x2="88" y2="32" />
          <line x1="5" y1="60" x2="20" y2="60" />
          <line x1="115" y1="60" x2="100" y2="60" />
          <circle cx="60" cy="50" r="42" fill="none" stroke="#dfba73" strokeDasharray="3 3" opacity="0.3" />
        </g>

        {/* Torso Base / Neck */}
        <path d="M 50 72 L 70 72 L 73 90 L 47 90 Z" fill="url(#acharyaSkinNeck)" />

        {/* Saffron Silk Angavastram (Draped across shoulders and torso) */}
        {/* Underlayer cloth right side */}
        <path
          d="M 68 82 Q 88 88 108 98 L 105 120 L 55 120 Z"
          fill="url(#saffronAngavastram)"
          opacity="0.9"
        />

        {/* Main Angavastram Drape over Left Shoulder */}
        <path
          d="M 12 108 Q 30 78 48 76 Q 58 76 64 88 Q 50 102 38 120 L 10 120 Z"
          fill="url(#saffronAngavastram)"
        />

        {/* Gold Zari Border on Angavastram */}
        <path
          d="M 48 76 Q 58 76 64 88 Q 50 102 38 120"
          fill="none"
          stroke="url(#goldZari)"
          strokeWidth="3.5"
        />
        <path
          d="M 48 76 Q 58 76 64 88 Q 50 102 38 120"
          fill="none"
          stroke="#fff2a8"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />

        {/* Rudraksha Sacred Mala */}
        <g>
          <path d="M 46 86 Q 60 106 74 86" fill="none" stroke="#5a230b" strokeWidth="1.2" />
          {/* Rudraksha Beads with 3D spherical highlights */}
          {[
            { cx: 48, cy: 87, r: 3 },
            { cx: 52, cy: 92, r: 3.2 },
            { cx: 56, cy: 96, r: 3.4 },
            { cx: 60, cy: 98, r: 3.8 },
            { cx: 64, cy: 96, r: 3.4 },
            { cx: 68, cy: 92, r: 3.2 },
            { cx: 72, cy: 87, r: 3 }
          ].map((b, i) => (
            <g key={i}>
              <circle cx={b.cx} cy={b.cy} r={b.r} fill="url(#rudrakshaBead)" />
              <circle cx={b.cx - 0.7} cy={b.cy - 0.7} r={b.r * 0.4} fill="#e59866" opacity="0.6" />
            </g>
          ))}
          {/* Golden Guru Bead Tassel */}
          <circle cx="60" cy="103" r="2" fill="url(#goldZari)" />
          <path d="M 59 104 L 58 112 L 62 112 L 61 104 Z" fill="#d97706" />
        </g>

        {/* Head & Neck Anatomy */}
        {/* Shikha / Traditional Ascetic Hair Knot */}
        <path
          d="M 55 18 C 52 8 68 8 65 18 C 72 16 70 26 60 26 C 50 26 48 16 55 18 Z"
          fill="#1c1613"
        />
        {/* Gold Hair Ring on Shikha */}
        <ellipse cx="60" cy="18" rx="5" ry="2" fill="url(#goldZari)" />

        {/* Full Hair Bun / Sides */}
        <path
          d="M 36 44 C 34 26 45 18 60 18 C 75 18 86 26 84 44 C 84 56 82 64 80 68 C 76 68 76 56 76 50 C 76 34 70 24 60 24 C 50 24 44 34 44 50 C 44 56 44 68 40 68 C 38 64 36 56 36 44 Z"
          fill="#1c1613"
        />

        {/* Face Oval */}
        <path
          d="M 42 42 C 42 26 78 26 78 42 C 78 56 75 68 60 76 C 45 68 42 56 42 42 Z"
          fill="url(#acharyaSkinFace)"
        />

        {/* Ears */}
        <ellipse cx="41" cy="48" rx="3.5" ry="6" fill="#c98a58" />
        <ellipse cx="79" cy="48" rx="3.5" ry="6" fill="#ab6c3e" />
        {/* Gold Ear Studs (Kundala) */}
        <circle cx="41.5" cy="51" r="1.5" fill="url(#goldZari)" />
        <circle cx="78.5" cy="51" r="1.5" fill="url(#goldZari)" />

        {/* Forehead Sacred Tilak */}
        <g opacity="0.95">
          <path d="M 52 32 Q 60 34 68 32" stroke="#fcf6e8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M 51 34.5 Q 60 36.5 69 34.5" stroke="#fcf6e8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M 52 37 Q 60 39 68 37" stroke="#fcf6e8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          {/* Vermilion / Kumkum Vertical Tilak Bindu */}
          <ellipse cx="60" cy="35" rx="1.6" ry="3.5" fill="#dc2626" />
          <circle cx="60" cy="35" r="0.8" fill="#ffd700" />
        </g>

        {/* Eyebrows */}
        <path d="M 47 41 Q 53 39 56 42" stroke="#231a15" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M 73 41 Q 67 39 64 42" stroke="#231a15" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* Scholarly Expressive Eyes */}
        <g>
          {/* Left Eye */}
          <path d="M 48 46 Q 53 44 57 46 Q 53 49 48 46 Z" fill="#ffffff" />
          <ellipse cx="53" cy="46" rx="2" ry="2" fill="#2d1a0e" />
          <circle cx="53.6" cy="45.4" r="0.7" fill="#ffffff" />

          {/* Right Eye */}
          <path d="M 63 46 Q 67 44 72 46 Q 67 49 63 46 Z" fill="#ffffff" />
          <ellipse cx="67" cy="46" rx="2" ry="2" fill="#2d1a0e" />
          <circle cx="67.6" cy="45.4" r="0.7" fill="#ffffff" />
        </g>

        {/* Nose with Volumetric Shadow */}
        <path d="M 59 43 L 59 53 Q 60 55 62 54" stroke="#8d4a23" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M 57 53 Q 60 55 63 53" stroke="#ab6c3e" strokeWidth="1.1" fill="none" />

        {/* Mustache & Dignified Scholarly Beard */}
        <path
          d="M 53 57 Q 60 58 67 57 Q 69 61 67 63 Q 60 62 53 63 Z"
          fill="url(#beardGrad)"
        />
        {/* Soft Smiling Lips underneath mustache */}
        <path d="M 56 61 Q 60 63 64 61" stroke="#a8432b" strokeWidth="1.1" strokeLinecap="round" fill="none" />

        {/* Trimmed Vedic Beard on Chin */}
        <path
          d="M 53 63 Q 60 64 67 63 Q 69 72 60 76 Q 51 72 53 63 Z"
          fill="url(#beardGrad)"
        />
        {/* Subtle silver/white beard wisdom streaks */}
        <path d="M 58 66 L 58 72" stroke="#d4d4d8" strokeWidth="0.6" opacity="0.6" />
        <path d="M 62 66 L 62 72" stroke="#d4d4d8" strokeWidth="0.6" opacity="0.6" />

        {/* Subtle Outer Specular Glow Ring */}
        <circle cx="60" cy="60" r="58.5" fill="none" stroke="url(#goldZari)" strokeWidth="1.5" opacity="0.8" />
      </svg>
    </div>
  );
};
