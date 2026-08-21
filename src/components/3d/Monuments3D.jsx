import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Monuments3D({ siteId, currentEra }) {
  const waterRef = useRef();
  const fountainRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (waterRef.current) {
      waterRef.current.material.opacity = 0.7 + Math.sin(time * 2) * 0.1;
    }
    if (fountainRef.current) {
      fountainRef.current.rotation.y = time * 0.5;
    }
  });

  const isGoldenEra = currentEra === 'golden_era' || currentEra === 'construction_era' || currentEra === 'mughal_peak';
  const isFireEra = currentEra === 'great_fire';

  // 1. Shaniwar Wada 3D Model
  if (siteId === 'shaniwar_wada') {
    return (
      <group position={[0, -2, 0]}>
        {/* Ground Foundation */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[40, 0.4, 40]} />
          <meshStandardMaterial color="#4a4238" roughness={0.9} />
        </mesh>

        {/* Dilli Darwaza Main Gate Fortification */}
        <group position={[0, 4, -12]}>
          {/* Main Stone Wall */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[20, 8, 4]} />
            <meshStandardMaterial color={isFireEra ? "#221c17" : "#5c5044"} roughness={0.8} />
          </mesh>
          {/* Main Gate Archway Cutout */}
          <mesh position={[0, -2, 0]}>
            <boxGeometry args={[5, 4.5, 4.2]} />
            <meshStandardMaterial color="#1a1410" />
          </mesh>
          {/* Spiked Teakwood Doors */}
          <mesh position={[0, -2, -0.2]}>
            <boxGeometry args={[4.8, 4.2, 0.4]} />
            <meshStandardMaterial color="#3d2a1d" roughness={0.6} />
          </mesh>
          {/* Bastion Towers */}
          <mesh position={[-10, 2, 0]} castShadow>
            <cylinderGeometry args={[2.5, 3, 12, 16]} />
            <meshStandardMaterial color="#4d4237" />
          </mesh>
          <mesh position={[10, 2, 0]} castShadow>
            <cylinderGeometry args={[2.5, 3, 12, 16]} />
            <meshStandardMaterial color="#4d4237" />
          </mesh>
        </group>

        {/* Timber 7-Story Peshwa Palace (Visible in Golden Era) */}
        {isGoldenEra && (
          <group position={[0, 8, -16]}>
            {[...Array(6)].map((_, i) => (
              <mesh key={i} position={[0, i * 2.2, 0]} castShadow>
                <boxGeometry args={[16 - i * 1.5, 2, 12 - i * 1.2]} />
                <meshStandardMaterial color="#7a4f32" roughness={0.5} />
              </mesh>
            ))}
            {/* Saffron Maratha Flag */}
            <mesh position={[0, 15, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 4]} />
              <meshBasicMaterial color="#dfb15b" />
            </mesh>
            <mesh position={[1, 16, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[1.8, 1, 0.05]} />
              <meshBasicMaterial color="#e67e22" />
            </mesh>
          </group>
        )}

        {/* Hazari Karanja Lotus Fountain */}
        <group position={[0, 0.4, 2]}>
          <mesh ref={fountainRef} receiveShadow>
            <cylinderGeometry args={[4, 4.5, 0.8, 16]} />
            <meshStandardMaterial color="#786c5e" />
          </mesh>
          {/* Water Pool */}
          <mesh ref={waterRef} position={[0, 0.45, 0]}>
            <cylinderGeometry args={[3.8, 3.8, 0.1, 16]} />
            <meshStandardMaterial color="#2b7a78" transparent opacity={0.85} roughness={0.1} />
          </mesh>
        </group>
      </group>
    );
  }

  // 2. Ellora Kailasa Temple Monolithic Rock-Cut Model
  if (siteId === 'kailasa_ellora') {
    return (
      <group position={[0, -2, 0]}>
        {/* Giant Excavated Basalt Cliff Backdrop */}
        <mesh position={[0, 10, -18]} receiveShadow>
          <boxGeometry args={[45, 24, 6]} />
          <meshStandardMaterial color="#38322c" roughness={0.95} />
        </mesh>
        <mesh position={[-20, 10, -5]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[30, 24, 6]} />
          <meshStandardMaterial color="#38322c" roughness={0.95} />
        </mesh>
        <mesh position={[20, 10, -5]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[30, 24, 6]} />
          <meshStandardMaterial color="#38322c" roughness={0.95} />
        </mesh>

        {/* Monolithic Mandapa Base */}
        <mesh position={[0, 3, -6]} castShadow receiveShadow>
          <boxGeometry args={[16, 6, 18]} />
          <meshStandardMaterial color="#544a40" roughness={0.85} />
        </mesh>

        {/* Dravidian Shikhara Pyramid Tower Peak */}
        <group position={[0, 10, -10]}>
          {[...Array(5)].map((_, i) => (
            <mesh key={i} position={[0, i * 1.8, 0]} castShadow>
              <boxGeometry args={[10 - i * 1.8, 1.8, 10 - i * 1.8]} />
              <meshStandardMaterial color="#594d42" />
            </mesh>
          ))}
          {/* Top Kalasha Finial */}
          <mesh position={[0, 9.5, 0]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial color="#d4af37" />
          </mesh>
        </group>

        {/* Life-Sized Carved Elephants Frieze */}
        <group position={[0, 0.8, 3]}>
          {[-6, -2, 2, 6].map((x, idx) => (
            <mesh key={idx} position={[x, 0.8, 0]} castShadow>
              <boxGeometry args={[1.5, 1.6, 2]} />
              <meshStandardMaterial color="#423a32" />
            </mesh>
          ))}
        </group>
      </group>
    );
  }

  // 3. Taj Mahal 3D Model
  if (siteId === 'taj_mahal') {
    return (
      <group position={[0, -2, 0]}>
        {/* Main Raised Marble Plinth Base */}
        <mesh position={[0, 1, -8]} castShadow receiveShadow>
          <boxGeometry args={[24, 2, 24]} />
          <meshStandardMaterial color="#f5f2eb" roughness={0.3} />
        </mesh>

        {/* Main Mausoleum Structure */}
        <mesh position={[0, 6, -8]} castShadow receiveShadow>
          <boxGeometry args={[14, 8, 14]} />
          <meshStandardMaterial color="#faf8f5" roughness={0.2} />
        </mesh>

        {/* Central Bulbous Onion Dome */}
        <group position={[0, 13, -8]}>
          <mesh castShadow>
            <sphereGeometry args={[4.2, 32, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.15} />
          </mesh>
          {/* Brass Finial */}
          <mesh position={[0, 5, 0]}>
            <coneGeometry args={[0.3, 2, 16]} />
            <meshStandardMaterial color="#dfb15b" metalness={0.8} />
          </mesh>
        </group>

        {/* Four Corner Minarets */}
        {[
          [-10, -18],
          [10, -18],
          [-10, 2],
          [10, 2]
        ].map(([x, z], idx) => (
          <group key={idx} position={[x, 7, z]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.8, 1.1, 12, 16]} />
              <meshStandardMaterial color="#faf8f5" />
            </mesh>
            {/* Minaret Dome Cap */}
            <mesh position={[0, 6.5, 0]}>
              <sphereGeometry args={[0.9, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}

        {/* Long Reflecting Pool */}
        <mesh position={[0, 0.1, 4]} receiveShadow>
          <boxGeometry args={[6, 0.2, 16]} />
          <meshStandardMaterial color="#1d4e89" roughness={0.05} metalness={0.9} />
        </mesh>

        {/* Cypress Trees */}
        {[-4, 4].map((x, i) =>
          [0, 4, 8, 12].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, 2, z]}>
              <coneGeometry args={[0.8, 4, 8]} />
              <meshStandardMaterial color="#1b4332" />
            </mesh>
          ))
        )}
      </group>
    );
  }

  // 4. Ajanta Caves 3D Model
  if (siteId === 'ajanta_caves') {
    return (
      <group position={[0, -2, 0]}>
        {/* Cliff Facade with Horseshoe Arch */}
        <mesh position={[0, 8, -10]} receiveShadow>
          <boxGeometry args={[36, 18, 4]} />
          <meshStandardMaterial color="#3d332a" roughness={0.9} />
        </mesh>

        {/* Chaitya Arch Vault Entrance */}
        <mesh position={[0, 5, -8]}>
          <cylinderGeometry args={[5, 5, 4, 16, 1, false, 0, Math.PI]} rotation={[0, 0, 0]} />
          <meshStandardMaterial color="#1a1510" side={THREE.DoubleSide} />
        </mesh>

        {/* Central Buddha Stupa Sanctuary */}
        <group position={[0, 2.5, -6]}>
          <mesh castShadow>
            <cylinderGeometry args={[2, 2.5, 3, 16]} />
            <meshStandardMaterial color="#5e5043" />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <sphereGeometry args={[1.8, 16, 16]} />
            <meshStandardMaterial color="#5e5043" />
          </mesh>
        </group>

        {/* Painted Fresco Pillars */}
        {[-8, -4, 4, 8].map((x, idx) => (
          <mesh key={idx} position={[x, 4, -4]} castShadow>
            <cylinderGeometry args={[0.7, 0.7, 8, 12]} />
            <meshStandardMaterial color="#4a3e33" />
          </mesh>
        ))}
      </group>
    );
  }

  // 5. Red Fort 3D Model
  if (siteId === 'red_fort') {
    return (
      <group position={[0, -2, 0]}>
        {/* Red Sandstone Main Ramparts */}
        <mesh position={[0, 5, -12]} castShadow receiveShadow>
          <boxGeometry args={[36, 10, 4]} />
          <meshStandardMaterial color="#8a2b2b" roughness={0.8} />
        </mesh>

        {/* Lahori Gate Towers */}
        <mesh position={[-6, 7, -10]} castShadow>
          <cylinderGeometry args={[2.5, 3, 14, 16]} />
          <meshStandardMaterial color="#993333" />
        </mesh>
        <mesh position={[6, 7, -10]} castShadow>
          <cylinderGeometry args={[2.5, 3, 14, 16]} />
          <meshStandardMaterial color="#993333" />
        </mesh>

        {/* Domed Chhatris */}
        {[-6, 6].map((x, i) => (
          <mesh key={i} position={[x, 15, -10]}>
            <sphereGeometry args={[1.8, 16, 16]} />
            <meshStandardMaterial color="#f7f5f0" />
          </mesh>
        ))}

        {/* White Marble Diwan-i-Khas Pavilion */}
        <mesh position={[0, 2, -2]} castShadow>
          <boxGeometry args={[16, 4, 10]} />
          <meshStandardMaterial color="#faf8f5" roughness={0.3} />
        </mesh>
      </group>
    );
  }

  // 6. Gateway of India 3D Model
  if (siteId === 'gateway_india') {
    return (
      <group position={[0, -2, 0]}>
        {/* Arabian Sea Water Base */}
        <mesh position={[0, -0.2, 4]} receiveShadow>
          <planeGeometry args={[50, 20]} />
          <meshStandardMaterial color="#1a4369" roughness={0.1} metalness={0.8} />
        </mesh>

        {/* Basalt Promenade */}
        <mesh position={[0, 0.4, -6]} receiveShadow>
          <boxGeometry args={[40, 0.8, 16]} />
          <meshStandardMaterial color="#3a3632" roughness={0.8} />
        </mesh>

        {/* Main Triumphal Arch Structure */}
        <group position={[0, 8, -6]}>
          {/* Main Arch Block */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[18, 14, 6]} />
            <meshStandardMaterial color="#8a7356" roughness={0.75} />
          </mesh>
          {/* Central Arch Cutout */}
          <mesh position={[0, -2, 0]}>
            <boxGeometry args={[7, 9, 6.2]} />
            <meshStandardMaterial color="#1f1a14" />
          </mesh>

          {/* Four Corner Turrets */}
          {[-8.5, 8.5].map((x, i) =>
            [-2.8, 2.8].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 7, z]} castShadow>
                <cylinderGeometry args={[0.8, 0.8, 4, 12]} />
                <meshStandardMaterial color="#7a654a" />
              </mesh>
            ))
          )}

          {/* Central Dome Peak */}
          <mesh position={[0, 8.5, 0]}>
            <sphereGeometry args={[3, 24, 24]} />
            <meshStandardMaterial color="#947c5d" />
          </mesh>
        </group>
      </group>
    );
  }

  return null;
}
