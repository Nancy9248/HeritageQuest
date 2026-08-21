import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { soundEngine } from '../../utils/audio';

export default function HotspotMarker({ hotspot, isActive, onClick }) {
  const markerRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (markerRef.current) {
      markerRef.current.rotation.y = time * 2;
      markerRef.current.position.y = hotspot.position[1] + Math.sin(time * 3) * 0.15;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    soundEngine.playClick();
    onClick(hotspot);
  };

  return (
    <group position={hotspot.position}>
      {/* 3D Rotating Diamond Marker */}
      <mesh ref={markerRef} onClick={handleClick} className="cursor-pointer">
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={isActive ? "#ffc107" : "#dfb15b"}
          emissive={isActive ? "#ff9800" : "#b28328"}
          emissiveIntensity={0.8}
          wireframe={true}
        />
      </mesh>

      {/* Pulsating Ring Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <ringGeometry args={[0.4, 0.6, 16]} />
        <meshBasicMaterial color="#dfb15b" transparent opacity={0.5} side={2} />
      </mesh>

      {/* Floating 2D HTML Label */}
      <Html distanceFactor={12} position={[0, 0.8, 0]} center>
        <button
          onClick={handleClick}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-serif font-bold whitespace-nowrap transition-all duration-200 shadow-xl ${
            isActive
              ? 'bg-heritage-gold text-heritage-navy ring-4 ring-heritage-gold/40 scale-110'
              : 'glass-panel text-heritage-lightgold border border-heritage-gold/50 hover:bg-heritage-gold hover:text-heritage-navy'
          }`}
        >
          <span>📍</span>
          <span>{hotspot.title}</span>
        </button>
      </Html>
    </group>
  );
}
