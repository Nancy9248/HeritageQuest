import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Monuments3D from './3d/Monuments3D';
import VirtualHost3D from './3d/VirtualHost3D';
import HotspotMarker from './3d/HotspotMarker';
import TimeWarpEffect from './3d/TimeWarpEffect';

// Camera Fly-To Controller
function CameraController({ targetPosition, activeHotspot }) {
  useFrame(({ camera }) => {
    if (activeHotspot) {
      const [hx, hy, hz] = activeHotspot.position;
      const targetCamPos = new THREE.Vector3(hx + 3, hy + 2, hz + 6);
      camera.position.lerp(targetCamPos, 0.05);
      camera.lookAt(hx, hy, hz);
    }
  });
  return null;
}

export default function ThreeCanvas({
  site,
  activeEra,
  activeHotspot,
  onHotspotClick,
  isSpeaking,
  isTimeWarping,
  dayNightMode
}) {
  const currentEraObj = site.timeEras.find((e) => e.id === activeEra) || site.timeEras[0];
  const isNight = dayNightMode === 'night' || currentEraObj.id === 'moonlight';
  const isGolden = dayNightMode === 'golden' || currentEraObj.id === 'golden_era';

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 6, 16], fov: 50 }}
        shadows
        className="w-full h-full"
      >
        {/* Dynamic Atmosphere / Sky */}
        <color attach="background" args={[isNight ? '#0b132b' : isGolden ? '#3d2414' : '#1c2541']} />
        <fog attach="fog" args={[isNight ? '#0b132b' : '#1c2541', 10, 45]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={isNight ? 0.3 : isGolden ? 0.9 : 0.8} />
        <directionalLight
          position={isNight ? [-10, 20, -10] : [15, 25, 10]}
          intensity={isNight ? 0.4 : isGolden ? 1.4 : 1.2}
          color={isGolden ? '#ffaa44' : isNight ? '#7799bb' : '#fff5ea'}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {isNight && (
          <Stars radius={80} depth={40} count={2000} factor={3} saturation={0} fade />
        )}

        {!isNight && !isGolden && (
          <Sky sunPosition={[100, 20, 100]} turbidity={8} rayleigh={2} />
        )}

        {/* 3D Heritage Monument */}
        <Monuments3D siteId={site.id} currentEra={activeEra} />

        {/* 3D Virtual Host Avatar */}
        <VirtualHost3D isSpeaking={isSpeaking} />

        {/* 3D Hotspot Markers */}
        {site.hotspots.map((hs) => (
          <HotspotMarker
            key={hs.id}
            hotspot={hs}
            isActive={activeHotspot?.id === hs.id}
            onClick={onHotspotClick}
          />
        ))}

        {/* Time Warp Effect Overlay */}
        <TimeWarpEffect isTransitioning={isTimeWarping} />

        {/* Smooth Camera Controller */}
        <CameraController activeHotspot={activeHotspot} />

        {/* User Orbit Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2 - 0.02}
          minDistance={3}
          maxDistance={35}
        />
      </Canvas>
    </div>
  );
}
