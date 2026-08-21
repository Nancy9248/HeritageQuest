import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function VirtualHost3D({ isSpeaking }) {
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const auraRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Floating idle animation
    if (auraRef.current) {
      auraRef.current.rotation.z = time * 0.2;
    }

    // Speaking lip-sync & gesture animation
    if (isSpeaking) {
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(time * 12) * 0.05;
        headRef.current.rotation.y = Math.cos(time * 6) * 0.08;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -Math.PI / 4 + Math.sin(time * 8) * 0.15;
      }
    } else {
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(time * 2) * 0.02;
        headRef.current.rotation.y = 0;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -Math.PI / 6;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4} position={[-4.5, 1, 3]}>
      <group scale={[0.85, 0.85, 0.85]}>
        {/* Golden Indian Aura Halo Ring behind Host */}
        <mesh ref={auraRef} position={[0, 1.8, -0.2]}>
          <ringGeometry args={[1.2, 1.5, 32]} />
          <meshBasicMaterial color="#dfb15b" side={THREE.DoubleSide} transparent opacity={0.4} wireframe />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 2.2, 0]}>
          {/* Face Sphere */}
          <mesh castShadow>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial color="#e5c3a6" roughness={0.3} />
          </mesh>
          {/* Royal Turban / Pagri */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.5, 0.55, 0.35, 16]} />
            <meshStandardMaterial color="#c05c46" />
          </mesh>
          {/* Turban Gem Feather */}
          <mesh position={[0, 0.5, 0.4]}>
            <coneGeometry args={[0.08, 0.4, 8]} />
            <meshStandardMaterial color="#dfb15b" metalness={0.9} />
          </mesh>
          {/* Eyes */}
          <mesh position={[-0.15, 0.05, 0.4]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0.15, 0.05, 0.4]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
          {/* Warm Friendly Smile */}
          <mesh position={[0, -0.15, 0.42]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
            <meshBasicMaterial color="#7a3e2e" />
          </mesh>
        </group>

        {/* Royal Angrakha / Robe Torso */}
        <mesh position={[0, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.7, 1.4, 16]} />
          <meshStandardMaterial color="#1f4e5b" roughness={0.4} />
        </mesh>

        {/* Gold Brocade Stole / Dupatta */}
        <mesh position={[0, 1.1, 0.05]}>
          <torusGeometry args={[0.55, 0.08, 12, 24]} />
          <meshStandardMaterial color="#dfb15b" metalness={0.7} />
        </mesh>

        {/* Left Arm (Resting) */}
        <group ref={leftArmRef} position={[-0.65, 1.4, 0]}>
          <mesh rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.1, 0.08, 0.8, 12]} />
            <meshStandardMaterial color="#1f4e5b" />
          </mesh>
        </group>

        {/* Right Arm (Gesture / Pointing) */}
        <group ref={rightArmRef} position={[0.65, 1.4, 0]}>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.1, 0.08, 0.8, 12]} />
            <meshStandardMaterial color="#1f4e5b" />
          </mesh>
        </group>

        {/* Floating Base Plinth */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.8, 0.9, 0.2, 16]} />
          <meshStandardMaterial color="#b28328" metalness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}
