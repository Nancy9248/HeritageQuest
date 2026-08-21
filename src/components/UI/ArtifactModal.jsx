import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { soundEngine } from '../../utils/audio';

function Artifact3DView({ shape }) {
  if (shape === 'sword') {
    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 3.2, 0.05]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 16]} />
          <meshStandardMaterial color="#8b5a2b" />
        </mesh>
        <mesh position={[0, -1.2, 0]}>
          <boxGeometry args={[0.8, 0.15, 0.15]} />
          <meshStandardMaterial color="#dfb15b" metalness={0.8} />
        </mesh>
      </group>
    );
  }

  if (shape === 'coin') {
    return (
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.15, 32]} />
        <meshStandardMaterial color="#dfb15b" metalness={0.85} roughness={0.2} />
      </mesh>
    );
  }

  if (shape === 'gem' || shape === 'statue') {
    return (
      <mesh>
        <octahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial color="#e67e22" metalness={0.5} roughness={0.2} />
      </mesh>
    );
  }

  // Default block/pipe artifact
  return (
    <mesh>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshStandardMaterial color="#8a7356" roughness={0.7} />
    </mesh>
  );
}

export default function ArtifactModal({ artifact, onClose, t }) {
  if (!artifact) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-xl w-full glass-panel rounded-3xl p-6 border border-heritage-gold/50 shadow-2xl flex flex-col items-center text-center">
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center font-bold"
        >
          ✕
        </button>

        <div className="inline-block px-3 py-1 rounded-full bg-heritage-gold/20 text-heritage-lightgold text-xs font-mono font-bold uppercase tracking-wider mb-2">
          {t.artifactInspector} • {artifact.era}
        </div>

        <h2 className="text-2xl font-serif font-bold text-white mb-1">
          {artifact.name}
        </h2>

        {/* 3D Interactive Viewport */}
        <div className="w-full h-56 my-3 bg-black/50 rounded-2xl border border-white/10 overflow-hidden relative">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
            <ambientLight intensity={0.9} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#dfb15b" />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <Artifact3DView shape={artifact.shape3d} />
            </Float>
            <OrbitControls autoRotate autoRotateSpeed={3} />
          </Canvas>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 pointer-events-none bg-black/60 px-2 py-0.5 rounded-full">
            Drag to inspect 360° artifact geometry
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
          {artifact.description}
        </p>

        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="px-8 py-2.5 rounded-xl bg-heritage-gold text-heritage-navy font-serif font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}
