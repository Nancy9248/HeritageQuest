import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { X, RotateCcw, Sparkles, ChevronLeft, ChevronRight, Layers, Shield } from 'lucide-react';
import { MONUMENTS } from '../../data/monumentsData';
import { heritageAudio } from '../../services/audioSynthesizer';

export const ArtifactInspectorModal = ({ isOpen, onClose, initialMonumentId = 'taj-mahal', onSelectMonument }) => {
  const mountRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const monumentsWithArtifacts = MONUMENTS.filter((m) => m.artifact);

  useEffect(() => {
    const idx = monumentsWithArtifacts.findIndex((m) => m.id === initialMonumentId);
    if (idx !== -1) setCurrentIdx(idx);
  }, [initialMonumentId]);

  const currentMonument = monumentsWithArtifacts[currentIdx] || monumentsWithArtifacts[0];
  const artifact = currentMonument.artifact;

  useEffect(() => {
    if (!isOpen || !mountRef.current || !artifact) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lights for metallic/gem highlights
    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    keyLight.position.set(5, 5, 5);
    const fillLight = new THREE.DirectionalLight(0x88bbff, 1.2);
    fillLight.position.set(-5, -2, -3);
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(keyLight, fillLight, ambient);

    // Build 3D Artifact Mesh
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    buildArtifactMesh(artifactGroup, artifact.shape);

    // Orbit & Auto-rotation state
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      artifactGroup.rotation.y += dx * 0.01;
      artifactGroup.rotation.x += dy * 0.01;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        artifactGroup.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, [isOpen, currentIdx]);

  const buildArtifactMesh = (group, shape) => {
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 });
    const steelMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.95, roughness: 0.1 });
    const gemMat = new THREE.MeshStandardMaterial({ color: 0x00c853, metalness: 0.3, roughness: 0.1 });
    const bronzeMat = new THREE.MeshStandardMaterial({ color: 0x8c6239, metalness: 0.7, roughness: 0.4 });

    if (shape === 'sword' || shape === 'dagger') {
      // Curved blade
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.4, 0.03), steelMat);
      blade.rotation.z = -0.15;
      // Guard & Hilt
      const guard = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.08, 16), goldMat);
      guard.position.y = -1.2;
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.6, 12), bronzeMat);
      handle.position.y = -1.5;
      const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), goldMat);
      pommel.position.y = -1.85;
      group.add(blade, guard, handle, pommel);
    } else if (shape === 'coin') {
      const coin = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.12, 32), goldMat);
      coin.rotation.x = Math.PI / 3;
      const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.04, 16, 32), bronzeMat);
      innerRing.rotation.x = Math.PI / 3;
      group.add(coin, innerRing);
    } else if (shape === 'statue') {
      // Bronze Figurine
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.4, 16), bronzeMat);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), bronzeMat);
      head.position.y = 0.9;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.06, 16, 32), goldMat);
      group.add(body, head, ring);
    } else {
      // Gem / Astrolabe
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(1.3, 0), gemMat);
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.05, 16, 32), goldMat);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.05, 16, 32), bronzeMat);
      ring2.rotation.x = Math.PI / 2;
      group.add(gem, ring1, ring2);
    }
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % monumentsWithArtifacts.length);
    heritageAudio.playSitarPluck(523.25);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + monumentsWithArtifacts.length) % monumentsWithArtifacts.length);
    heritageAudio.playSitarPluck(440);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#0f172a] border-2 border-[#dfba73]/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#090c15] text-stone-300 hover:text-white border border-[#dfba73]/40 flex items-center justify-center font-bold cursor-pointer"
          aria-label="Close 3D artifact inspector"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: 3D Artifact Interactive Viewer */}
        <div className="relative w-full md:w-1/2 h-72 md:h-auto min-h-[320px] bg-gradient-to-b from-[#0f172a] to-[#090c15] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[#dfba73]/30">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-[#dfba73] pointer-events-none">
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
              Drag to Orbit 360°
            </span>
            <span className="px-2 py-0.5 rounded bg-[#dfba73]/20 font-mono">3D Museum Grade</span>
          </div>
        </div>

        {/* Right Column: Historical Provenance & Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#c25e36]/20 border border-[#c25e36]/40 text-[#dfba73] text-[10px] font-bold uppercase tracking-wider">
                {currentMonument.name}
              </span>
              <span className="text-xs text-[#dfba73] font-['Cinzel'] font-bold">
                {currentIdx + 1} / {monumentsWithArtifacts.length}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-['Cinzel'] text-white mb-1">
              {artifact.title}
            </h3>

            <p className="text-xs text-stone-400 font-serif italic mb-4">
              {artifact.dynasty}
            </p>

            <div className="p-3.5 rounded-2xl bg-[#090c15]/80 border border-[#dfba73]/30 mb-4">
              <span className="text-[10px] uppercase tracking-wider text-[#dfba73] font-bold block mb-1">
                Metallurgy & Composition:
              </span>
              <p className="text-xs text-stone-200">{artifact.material}</p>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              {artifact.description}
            </p>
          </div>

          {/* Navigation & Teleport Buttons */}
          <div className="pt-4 border-t border-[#dfba73]/20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-[#090c15] hover:bg-[#1e293b] border border-[#dfba73]/30 text-stone-200 hover:text-[#dfba73] transition-colors cursor-pointer"
                title="Previous Artifact"
                aria-label="Previous artifact"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-[#090c15] hover:bg-[#1e293b] border border-[#dfba73]/30 text-stone-200 hover:text-[#dfba73] transition-colors cursor-pointer"
                title="Next Artifact"
                aria-label="Next artifact"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                onSelectMonument(currentMonument.id);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#dfba73] to-[#c5a059] text-[#090c15] text-xs font-bold font-['Cinzel'] tracking-wider hover:shadow-[0_0_15px_rgba(223,186,115,0.6)] transition-all cursor-pointer"
            >
              Explore {currentMonument.name} in 3D
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
