import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Compass,
  Sparkles,
  Volume2,
  VolumeX,
  ArrowRight,
  MapPin,
  Calendar,
  Landmark,
  ChevronRight,
  ChevronLeft,
  Eye
} from 'lucide-react';
import { heritageAudio } from '../../services/audioSynthesizer';
import { MONUMENTS } from '../../data/monumentsData';

export const SplashScreen = ({ onBegin, currentLang = 'en', translations = {} }) => {
  const mountRef = useRef(null);
  const [hasStartedSound, setHasStartedSound] = useState(false);
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeMonument = MONUMENTS[activeSpotlightIdx] || MONUMENTS[0];

  // Auto-cycle through the 8 monuments every 4.5 seconds unless user hovers
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveSpotlightIdx((prev) => (prev + 1) % MONUMENTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  // 3D Sacred Geometry Mandala & Golden Stardust Universe
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.012);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 1. Golden Stardust Ember Particles (320 particles)
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 320;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color('#e5b869'),
      new THREE.Color('#f3d389'),
      new THREE.Color('#b88c3a'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#f59e0b')
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      posArray[i3] = (Math.random() - 0.5) * 45;
      posArray[i3 + 1] = (Math.random() - 0.5) * 35;
      posArray[i3 + 2] = (Math.random() - 0.5) * 25;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colorArray[i3] = c.r;
      colorArray[i3 + 1] = c.g;
      colorArray[i3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.75
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 2. Sacred Indian Mandala Geometry (Concentric Golden Rings & Petal Spoke Lines)
    const mandalaGroup = new THREE.Group();
    mandalaGroup.position.set(4, 0, -4); // Subtle rightward offset behind spotlight card

    const goldLineMat = new THREE.LineBasicMaterial({
      color: 0xe5b869,
      transparent: true,
      opacity: 0.38
    });
    const dimLineMat = new THREE.LineBasicMaterial({
      color: 0x93702a,
      transparent: true,
      opacity: 0.22
    });

    // Concentric Rings
    [3.0, 5.0, 7.2, 9.5].forEach((radius, idx) => {
      const ringPts = [];
      const segments = 64;
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
      const ringLine = new THREE.Line(ringGeo, idx % 2 === 0 ? goldLineMat : dimLineMat);
      mandalaGroup.add(ringLine);
    });

    // 16 Symmetrical Radial Lotus Spokes
    const spokes = 16;
    for (let s = 0; s < spokes; s++) {
      const angle = (s / spokes) * Math.PI * 2;
      const spokePts = [
        new THREE.Vector3(Math.cos(angle) * 3.0, Math.sin(angle) * 3.0, 0),
        new THREE.Vector3(Math.cos(angle) * 9.5, Math.sin(angle) * 9.5, 0)
      ];
      const spokeGeo = new THREE.BufferGeometry().setFromPoints(spokePts);
      const spokeLine = new THREE.Line(spokeGeo, dimLineMat);
      mandalaGroup.add(spokeLine);

      // Lotus Petal Arcs between spokes
      const nextAngle = ((s + 1) / spokes) * Math.PI * 2;
      const midAngle = (angle + nextAngle) / 2;
      const petalPts = [
        new THREE.Vector3(Math.cos(angle) * 5.0, Math.sin(angle) * 5.0, 0),
        new THREE.Vector3(Math.cos(midAngle) * 6.5, Math.sin(midAngle) * 6.5, 0),
        new THREE.Vector3(Math.cos(nextAngle) * 5.0, Math.sin(nextAngle) * 5.0, 0)
      ];
      const petalGeo = new THREE.BufferGeometry().setFromPoints(petalPts);
      const petalLine = new THREE.Line(petalGeo, goldLineMat);
      mandalaGroup.add(petalLine);
    }

    scene.add(mandalaGroup);

    // Subtle Central Golden Aura Glow
    const glowGeo = new THREE.SphereGeometry(2.5, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xe5b869,
      transparent: true,
      opacity: 0.08,
      wireframe: true
    });
    const glowCore = new THREE.Mesh(glowGeo, glowMat);
    mandalaGroup.add(glowCore);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle rotation of sacred mandala
      mandalaGroup.rotation.z = elapsed * 0.035;
      glowCore.rotation.y = elapsed * 0.05;

      // Drifting golden stardust particles
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(elapsed + i) * 0.003;
      }
      particleGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsed * 0.012;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Automatic Soft Veena playback on first interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        heritageAudio.playSoftVeenaIntro();
        setHasStartedSound(true);
      } catch (e) {
        // Autoplay policy waiting for gesture
      }
    }, 450);

    const handleGesture = () => {
      heritageAudio.playSoftVeenaIntro();
      setHasStartedSound(true);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };

    window.addEventListener('pointerdown', handleGesture);
    window.addEventListener('keydown', handleGesture);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, []);

  const toggleSound = () => {
    const muted = heritageAudio.toggleMute();
    setHasStartedSound(!muted);
    if (!muted) {
      heritageAudio.playSoftVeenaIntro();
    }
  };

  const handleStart = () => {
    heritageAudio.playTempleBell();
    heritageAudio.playSitarPluck(523.25);
    onBegin();
  };

  return (
    <div className="relative w-full min-h-screen bg-[#060913] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#e5b869] selection:text-[#060913]">
      {/* 3D WebGL Background: Sacred Mandala & Golden Stardust Universe */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between hero-stagger-1">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f3d389] via-[#e5b869] to-[#b88c3a] p-0.5 shadow-[0_0_25px_rgba(229,184,105,0.45)]">
            <div className="w-full h-full rounded-full bg-[#060913] flex items-center justify-center text-[#e5b869]">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-2xl font-['Cinzel'] tracking-wider text-white flex items-center gap-1.5">
              Heritage<span className="heritage-text-gold">Quest</span>
            </h1>
            <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">
              India Cultural Tourism & Stylized 3D WebXR
            </p>
          </div>
        </div>

        {/* Header Right: Sound Toggle */}
        <div className="flex items-center gap-3">

          <button
            onClick={toggleSound}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f172a]/85 hover:bg-[#1e293b] border border-[#e5b869]/35 text-xs text-[#e5b869] transition-all cursor-pointer backdrop-blur-md shadow-lg"
            title={hasStartedSound ? 'Mute Saraswati Veena' : 'Play Soft Saraswati Veena'}
            aria-label={hasStartedSound ? 'Mute ambient audio' : 'Play ambient audio'}
          >
            {hasStartedSound ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#e5b869]" />
                <span className="text-[11px] font-medium">Soft Veena Raga</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-[11px] font-medium text-stone-400">Sound Muted</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Split Hero Section (2-Column Grid) */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Column (55%): Grand Calligraphy, Inscription & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Sacred Maha Upanishad Inscription Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f172a]/90 border border-[#e5b869]/40 text-xs text-[#e5b869] mb-4 shadow-[0_0_25px_rgba(229,184,105,0.25)] backdrop-blur-md hero-stagger-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e5b869]" />
            <span className="font-serif tracking-wider font-semibold">महोपनिषद् • Maha Upanishad (VI.71-73)</span>
          </div>

          {/* Grand Sanskrit Shloka Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-serif tracking-wide mb-3 bg-gradient-to-r from-[#fff7de] via-[#f3d389] to-[#e5b869] bg-clip-text text-transparent drop-shadow-2xl leading-tight hero-stagger-2 animate-shloka-aura">
            वसुधैव कुटुम्बकम्
          </h2>

          {/* English Translation & Meaning */}
          <div className="flex items-center gap-3 mb-4 hero-stagger-3">
            <span className="w-8 h-[2px] bg-[#e5b869]"></span>
            <p className="text-lg sm:text-2xl text-stone-200 font-light tracking-wide font-['Cinzel']">
              "The World Is One Family"
            </p>
          </div>

          {/* Authentic Shloka Verse in Devanagari */}
          <p className="text-xs sm:text-sm text-[#e5b869]/80 font-serif italic mb-4 leading-relaxed max-w-xl hero-stagger-3">
            अयं बन्धुरयं नेति गणना लघुचेतसाम् । उदारचरितानां तु वसुधैव कुटुम्बकम् ॥
          </p>

          {/* Evocative Narrative Description */}
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-7 max-w-xl hero-stagger-4">
            Journey across two millennia of Indian civilization. Converse with historical monarchs, explore sacred geometries, and discover 8 immortal architectural marvels in interactive stylized 3D WebXR.
          </p>

          {/* Action Row: Primary "Let's Begin" CTA + Feature Highlights */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 w-full sm:w-auto hero-stagger-5">
            <button
              onClick={handleStart}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#e5b869] via-[#f3d389] to-[#d4af37] text-[#060913] font-bold text-base sm:text-lg shadow-[0_0_35px_rgba(229,184,105,0.45)] hover:shadow-[0_0_55px_rgba(229,184,105,0.7)] transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#fff5ce]"
            >
              <span>{translations.letsBegin || "Begin Your Quest"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                setActiveSpotlightIdx((prev) => (prev + 1) % MONUMENTS.length);
                heritageAudio.playSitarPluck(440);
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#0f172a]/80 hover:bg-[#1e293b] border border-[#e5b869]/30 text-stone-300 hover:text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
              aria-label="Preview next monument"
            >
              <Eye className="w-4 h-4 text-[#e5b869]" />
              <span>Preview Next Monument</span>
            </button>
          </div>

          {/* 3 Value Metric Badges */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-lg pt-4 border-t border-[#e5b869]/20 hero-stagger-6">
            <div className="p-2.5 rounded-xl bg-[#0b1120]/70 border border-stone-800 backdrop-blur-sm">
              <div className="text-[#e5b869] font-bold text-sm sm:text-base font-['Cinzel']">8 Icons</div>
              <div className="text-[10px] text-stone-400">UNESCO & Heritage</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0b1120]/70 border border-stone-800 backdrop-blur-sm">
              <div className="text-[#e5b869] font-bold text-sm sm:text-base font-['Cinzel']">20+ Langs</div>
              <div className="text-[10px] text-stone-400">Voice & Dialogues</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0b1120]/70 border border-stone-800 backdrop-blur-sm">
              <div className="text-[#e5b869] font-bold text-sm sm:text-base font-['Cinzel']">WebXR</div>
              <div className="text-[10px] text-stone-400">Stylized 3D View</div>
            </div>
          </div>
        </div>

        {/* Right Column (45%): Illuminated Monument Showcase Card */}
        <div
          className="lg:col-span-5 w-full hero-stagger-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative rounded-3xl bg-[#0b1120]/90 border-2 border-[#e5b869]/40 p-5 shadow-[0_0_50px_rgba(229,184,105,0.2)] backdrop-blur-xl transition-all duration-500 hover:border-[#e5b869]">
            {/* Indian Jali Corner Accents */}
            <div className="absolute top-2 left-2 text-[#e5b869]/30 text-xs font-serif select-none">❖</div>
            <div className="absolute top-2 right-2 text-[#e5b869]/30 text-xs font-serif select-none">❖</div>
            <div className="absolute bottom-2 left-2 text-[#e5b869]/30 text-xs font-serif select-none">❖</div>
            <div className="absolute bottom-2 right-2 text-[#e5b869]/30 text-xs font-serif select-none">❖</div>

            {/* Showcase Header: Spotlighting Label + Counter */}
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#e5b869] flex items-center gap-1.5 font-['Cinzel']">
                <Landmark className="w-3.5 h-3.5" />
                <span>Monument Spotlight</span>
              </span>
              <span className="font-mono text-stone-400 text-[11px] bg-[#111827] px-2 py-0.5 rounded-full border border-stone-700">
                {String(activeSpotlightIdx + 1).padStart(2, '0')} / {String(MONUMENTS.length).padStart(2, '0')}
              </span>
            </div>

            {/* Monument Image with Floating Badges */}
            <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-4 border border-[#e5b869]/30 shadow-inner group">
              <img
                src={activeMonument.heroImage}
                alt={`${activeMonument.name} - ${activeMonument.subtitle} in ${activeMonument.state}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-black/30" />

              {/* Floating Region & Era Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-[#c85a32]/95 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{activeMonument.direction} India • {activeMonument.state}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#0b1120]/85 border border-[#ffd700]/50 text-[#ffd700] text-[10px] font-semibold backdrop-blur-sm flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5" />
                  <span>{activeMonument.era}</span>
                </span>
              </div>

              {/* Quick Arrow Controls for Manual Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSpotlightIdx((prev) => (prev - 1 + MONUMENTS.length) % MONUMENTS.length);
                  heritageAudio.playSitarPluck(392);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#060913]/70 hover:bg-[#e5b869] text-stone-200 hover:text-[#060913] transition-colors cursor-pointer backdrop-blur-sm"
                title="Previous Monument"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSpotlightIdx((prev) => (prev + 1) % MONUMENTS.length);
                  heritageAudio.playSitarPluck(440);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#060913]/70 hover:bg-[#e5b869] text-stone-200 hover:text-[#060913] transition-colors cursor-pointer backdrop-blur-sm"
                title="Next Monument"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Monument Name & Cultural Information */}
            <div className="mb-4">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h3 className="text-xl sm:text-2xl font-bold font-['Cinzel'] text-white">
                  {activeMonument.name}
                </h3>
                <span className="text-sm text-[#e5b869] font-serif font-medium">
                  {activeMonument.hindiName}
                </span>
              </div>
              <p className="text-xs text-[#e5b869] font-medium mb-1.5">
                {activeMonument.subtitle}
              </p>
              <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed">
                {activeMonument.description}
              </p>
            </div>

            {/* 8 Monument Selector Pills */}
            <div className="space-y-1.5 pt-3 border-t border-[#e5b869]/20">
              <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400 mb-1.5 flex items-center justify-between">
                <span>Jump to Any of 8 Monuments:</span>
                <span className="text-[#e5b869]">Click to Select</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {MONUMENTS.map((m, idx) => {
                  const isSelected = idx === activeSpotlightIdx;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setActiveSpotlightIdx(idx);
                        heritageAudio.playSitarPluck(260 + idx * 35);
                      }}
                      className={`px-1.5 py-1.5 rounded-xl text-[10px] font-medium truncate transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[#e5b869] text-[#060913] font-bold shadow-md scale-105'
                          : 'bg-[#111827]/80 hover:bg-[#1a233b] text-stone-400 hover:text-white border border-stone-800'
                      }`}
                      title={`${m.name} (${m.state})`}
                    >
                      {m.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Entry CTA from Card */}
            <button
              onClick={handleStart}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#e5b869] text-[#e5b869] hover:text-[#060913] border border-[#e5b869]/40 font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Explore {activeMonument.name} in 3D</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Footer Status Bar */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-400 border-t border-stone-800/60">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
          <span className="font-mono">India Cultural Tourism Portal • Vasudhaiva Kutumbakam</span>
        </div>
        <div className="text-center sm:text-right font-serif text-stone-400 text-[11px]">
          Taj Mahal • Mysore Palace • Konark Sun Temple • Gateway of India • Brihadisvara • Sanchi • Hawa Mahal • Victoria Memorial
        </div>
      </footer>
    </div>
  );
};
