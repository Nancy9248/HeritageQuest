import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { soundEngine } from '../utils/audio';

// 3D Globe with glowing connections and ancient Indian rangoli mandala ring
function VasudhaivaGlobe() {
  const globeRef = useRef();
  const ringRef = useRef();
  const connectionsRef = useRef();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (globeRef.current) globeRef.current.rotation.y = elapsed * 0.15;
    if (ringRef.current) ringRef.current.rotation.z = -elapsed * 0.1;
    if (connectionsRef.current) connectionsRef.current.rotation.y = elapsed * 0.25;
  });

  // Generate connection points around globe
  const points = [];
  for (let i = 0; i < 40; i++) {
    const phi = Math.acos(-1 + (2 * i) / 40);
    const theta = Math.sqrt(40 * Math.PI) * phi;
    points.push(
      new THREE.Vector3(
        2.5 * Math.cos(theta) * Math.sin(phi),
        2.5 * Math.sin(theta) * Math.sin(phi),
        2.5 * Math.cos(phi)
      )
    );
  }

  return (
    <group>
      {/* Central Glowing Earth Sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          color="#0d2b45"
          emissive="#1c3d5a"
          roughness={0.4}
          wireframe={true}
        />
      </mesh>

      {/* Outer Connection Nodes */}
      <group ref={connectionsRef}>
        {points.map((pt, idx) => (
          <mesh key={idx} position={pt}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color={idx % 2 === 0 ? "#dfb15b" : "#e67e22"} />
          </mesh>
        ))}
      </group>

      {/* Ancient Indian Pattern Ring (Mandala Aura) */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[3.0, 3.8, 32]} />
        <meshBasicMaterial
          color="#dfb15b"
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.35}
          wireframe={true}
        />
      </mesh>

      {/* India Highlight Golden Marker */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[1.1, 0.9, 1.7]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#ffc107" />
        </mesh>
      </Float>
    </group>
  );
}

export default function OpeningScene({ onBegin }) {
  const handleBegin = () => {
    soundEngine.playChime();
    onBegin();
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-heritage-navy via-slate-950 to-black overflow-hidden flex flex-col justify-between items-center p-6 text-center">
      {/* 3D Background Globe */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} color="#dfb15b" intensity={2} />
          <VasudhaivaGlobe />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Subtle Ancient Indian Motif Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,19,43,0.85)_80%)]" />

      {/* Top Header */}
      <div className="relative z-20 mt-6 max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-heritage-gold/40 text-heritage-lightgold text-xs uppercase tracking-widest font-semibold mb-3">
          <span>🕉️</span> Vasudhaiva Kutumbakam
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold gold-gradient-text tracking-wide drop-shadow-lg">
          HeritageQuest
        </h1>
        <p className="text-gray-300 text-sm md:text-base font-light mt-2 tracking-wider uppercase">
          An Immersive 3D Heritage Tourism Experience
        </p>
      </div>

      {/* Center Quote & Action Box */}
      <div className="relative z-20 my-auto max-w-2xl px-6 py-8 rounded-2xl glass-panel gold-border-glow text-center transform transition-transform hover:scale-[1.01]">
        <div className="w-12 h-1 bg-heritage-gold mx-auto mb-6 rounded-full" />
        <blockquote className="text-lg md:text-2xl font-serif text-heritage-sand leading-relaxed italic drop-shadow">
          “The world is one family. Every culture has a story. Every monument holds a memory. Welcome to HeritageQuest.”
        </blockquote>
        <div className="w-12 h-1 bg-heritage-gold mx-auto mt-6 rounded-full" />

        <button
          onClick={handleBegin}
          className="mt-8 px-10 py-4 rounded-xl bg-gradient-to-r from-heritage-gold via-heritage-amber to-heritage-terracotta text-heritage-navy font-serif font-bold text-lg md:text-xl tracking-wider shadow-2xl hover:shadow-heritage-gold/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          <span>Begin Your Journey</span>
          <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-20 mb-4 text-xs text-gray-400 font-light flex items-center gap-4">
        <span>Designed for Web, VR & AR</span>
        <span>•</span>
        <span>Multilingual AI Historical Host</span>
        <span>•</span>
        <span>GPS Heritage Matching</span>
      </div>
    </div>
  );
}
