import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Compass,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Glasses,
  Move,
  Eye,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Shield,
  Trophy,
  Clock
} from 'lucide-react';
import { MONUMENTS } from '../../data/monumentsData';
import { createMonument3D, createHotspotBeacon } from './Monuments3D';
import { TimeTravelHost } from '../AIHost/TimeTravelHost';
import { Minimap } from '../UI/Minimap';
import { ArtifactInspectorModal } from '../UI/ArtifactInspectorModal';
import { GamificationModal } from '../UI/GamificationModal';
import { TimeTravelModal } from '../UI/TimeTravelModal';
import { ReportInaccuracyModal } from '../UI/ReportInaccuracyModal';
import { ARViewerModal } from '../UI/ARViewerModal';
import { WeatherCardSkeleton, Monument3DSkeleton } from '../Common/SkeletonLoader';
import { WeatherErrorFallback } from '../Common/ErrorFallbackCard';
import { heritageAudio } from '../../services/audioSynthesizer';
import { speechService } from '../../services/speechService';
import { fetchMonumentWeather } from '../../services/weatherService';
import { getLocalizedMonument } from '../../data/multilingualMonumentDetails';
import { Flag, BookOpen, BarChart3, CheckCircle } from 'lucide-react';

export const MonumentViewer = ({
  activeMonumentId = 'taj-mahal',
  onSelectMonument,
  userContext,
  currentLang = 'en',
  translations,
  onOpenLocalGuide,
  points = 100,
  onAddPoints = () => {},
  unlockedBadges = ['history_explorer'],
  onUnlockBadge = () => {}
}) => {
  const mountRef = useRef(null);
  const [isArtifactModalOpen, setIsArtifactModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isTimeTravelModalOpen, setIsTimeTravelModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [activeMonument, setActiveMonument] = useState(
    MONUMENTS.find((m) => m.id === activeMonumentId) || MONUMENTS[0]
  );
  const [directionFilter, setDirectionFilter] = useState('All');
  const [timeOfDay, setTimeOfDay] = useState('noon'); // 'dawn', 'noon', 'sunset', 'night'
  const [controlMode, setControlMode] = useState('orbit'); // 'orbit', 'walk'
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [vrStatus, setVrStatus] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Three.js instances ref
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const monumentGroupRef = useRef(null);
  const hotspotsGroupRef = useRef(null);
  const lightsRef = useRef({});

  // Orbit / Walk state
  const orbitRef = useRef({
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    theta: Math.PI / 4,
    phi: Math.PI / 3.5,
    radius: 18,
    target: new THREE.Vector3(0, 2.5, 0)
  });

  const keysPressed = useRef({});

  // Sync prop changes
  useEffect(() => {
    const found = MONUMENTS.find((m) => m.id === activeMonumentId);
    if (found) {
      setActiveMonument(found);
      setSelectedHotspot(null);
    }
  }, [activeMonumentId]);

  // Initialize Three.js WebGL and WebXR scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Viewport sizing
    const width = container.clientWidth || window.innerWidth || 900;
    const height = container.clientHeight || 580;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x090c15);
    scene.fog = new THREE.FogExp2(0x090c15, 0.006);

    // Camera with guaranteed non-zero aspect ratio
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    cameraRef.current = camera;
    updateCameraPosition();

    // WebGL & WebXR Renderer with guaranteed dimensions
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.xr.enabled = true;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // High-visibility Studio Lighting System
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x475569, 1.2);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 2.0);
    dirLight.position.set(20, 35, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    lightsRef.current = { hemi: hemiLight, dir: dirLight, ambient: ambientLight };

    // Stone Ground & Jali Grid
    const groundGeo = new THREE.PlaneGeometry(80, 80);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0c1222,
      roughness: 0.9,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.25;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(80, 40, 0xdfba73, 0x1e293b);
    gridHelper.position.y = -0.24;
    scene.add(gridHelper);

    // Groups for Monument & Hotspots
    const monGroup = new THREE.Group();
    scene.add(monGroup);
    monumentGroupRef.current = monGroup;

    const hotGroup = new THREE.Group();
    scene.add(hotGroup);
    hotspotsGroupRef.current = hotGroup;

    // Load initial monument model
    loadMonumentModel(activeMonument);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Handle First-Person Walkthrough navigation
      if (controlMode === 'walk') {
        handleWalkNavigation(delta);
      }

      // Animate hotspots pulsating halo
      if (hotspotsGroupRef.current) {
        hotspotsGroupRef.current.children.forEach((child) => {
          const ring = child.children[1];
          if (ring) {
            ring.rotation.z += delta * 1.5;
            const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
            ring.scale.set(scale, scale, scale);
          }
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update monument model, ambient instrument & cross-fade when activeMonument changes
  useEffect(() => {
    if (sceneRef.current && monumentGroupRef.current) {
      loadMonumentModel(activeMonument);
      heritageAudio.playTempleBell();
      heritageAudio.playMonumentAmbient(activeMonument.id);
    }
  }, [activeMonument.id]);

  // Subtle 300ms cross-fade transition when switching between monuments
  useEffect(() => {
    setIsTransitioning(true);
    const t = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(t);
  }, [activeMonument.id]);

  // Live Open-Meteo Weather check & Visit Recommendation (Zero fake data)
  useEffect(() => {
    let isMounted = true;
    setIsLoadingWeather(true);
    if (activeMonument.coordinates && activeMonument.coordinates.length === 2) {
      fetchMonumentWeather(activeMonument.coordinates[0], activeMonument.coordinates[1])
        .then((res) => {
          if (isMounted) {
            setWeatherInfo(res);
            setIsLoadingWeather(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setWeatherInfo({
              success: false,
              error: 'Live weather unavailable (offline mode)',
              recommendation: 'Live weather unavailable (offline mode). Historical best visiting season: October to March.'
            });
            setIsLoadingWeather(false);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [activeMonument.id]);

  // Update lighting when timeOfDay changes
  useEffect(() => {
    applyTimeOfDayLighting(timeOfDay);
  }, [timeOfDay]);

  const loadMonumentModel = (monument) => {
    if (!monumentGroupRef.current || !hotspotsGroupRef.current) return;

    // Clear previous monument
    while (monumentGroupRef.current.children.length > 0) {
      const obj = monumentGroupRef.current.children[0];
      monumentGroupRef.current.remove(obj);
    }
    while (hotspotsGroupRef.current.children.length > 0) {
      const obj = hotspotsGroupRef.current.children[0];
      hotspotsGroupRef.current.remove(obj);
    }

    // Build new 3D monument
    const newMesh = createMonument3D(monument.id);
    monumentGroupRef.current.add(newMesh);

    // Add 3D Hotspot Beacons
    if (monument.hotspots) {
      monument.hotspots.forEach((h) => {
        const beacon = createHotspotBeacon(h);
        hotspotsGroupRef.current.add(beacon);
      });
    }

    // Reset camera to good viewing distance
    orbitRef.current.radius = 18;
    orbitRef.current.theta = Math.PI / 4;
    orbitRef.current.phi = Math.PI / 3.5;
    updateCameraPosition();
  };

  const applyTimeOfDayLighting = (mode) => {
    if (!lightsRef.current.dir || !sceneRef.current) return;
    const { dir, hemi, ambient } = lightsRef.current;

    switch (mode) {
      case 'dawn':
        sceneRef.current.background = new THREE.Color(0x351d3b);
        sceneRef.current.fog.color = new THREE.Color(0x351d3b);
        dir.color.setHex(0xffa07a);
        dir.intensity = 1.3;
        dir.position.set(25, 8, 15);
        hemi.color.setHex(0xffb07c);
        hemi.groundColor.setHex(0x28122c);
        ambient.color.setHex(0xff8c00);
        ambient.intensity = 0.35;
        break;

      case 'noon':
        sceneRef.current.background = new THREE.Color(0x0e1329);
        sceneRef.current.fog.color = new THREE.Color(0x0e1329);
        dir.color.setHex(0xfffaed);
        dir.intensity = 1.8;
        dir.position.set(12, 28, 12);
        hemi.color.setHex(0xffffff);
        hemi.groundColor.setHex(0x333344);
        ambient.color.setHex(0xd4af37);
        ambient.intensity = 0.3;
        break;

      case 'sunset':
        sceneRef.current.background = new THREE.Color(0x2b101e);
        sceneRef.current.fog.color = new THREE.Color(0x2b101e);
        dir.color.setHex(0xff5722);
        dir.intensity = 1.6;
        dir.position.set(-25, 7, 10);
        hemi.color.setHex(0xff7043);
        hemi.groundColor.setHex(0x2d142c);
        ambient.color.setHex(0xe65100);
        ambient.intensity = 0.4;
        break;

      case 'night':
        sceneRef.current.background = new THREE.Color(0x05040a);
        sceneRef.current.fog.color = new THREE.Color(0x05040a);
        dir.color.setHex(0x5c6bc0);
        dir.intensity = 0.6;
        dir.position.set(-10, 20, -10);
        hemi.color.setHex(0x3949ab);
        hemi.groundColor.setHex(0x05040a);
        ambient.color.setHex(0xffd700);
        ambient.intensity = 0.15;
        break;
    }
  };

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { theta, phi, radius, target } = orbitRef.current;
    cameraRef.current.position.x = target.x + radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = target.y + radius * Math.cos(phi);
    cameraRef.current.position.z = target.z + radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(target);
  };

  // Keyboard navigation for First-Person Walk Mode
  const handleWalkNavigation = (delta) => {
    if (!cameraRef.current) return;
    const speed = 7.0 * delta;
    const dir = new THREE.Vector3();
    cameraRef.current.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();

    const side = new THREE.Vector3(-dir.z, 0, dir.x);

    if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp']) {
      cameraRef.current.position.addScaledVector(dir, speed);
      orbitRef.current.target.addScaledVector(dir, speed);
    }
    if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown']) {
      cameraRef.current.position.addScaledVector(dir, -speed);
      orbitRef.current.target.addScaledVector(dir, -speed);
    }
    if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft']) {
      cameraRef.current.position.addScaledVector(side, -speed);
      orbitRef.current.target.addScaledVector(side, -speed);
    }
    if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight']) {
      cameraRef.current.position.addScaledVector(side, speed);
      orbitRef.current.target.addScaledVector(side, speed);
    }

    // Keep camera at comfortable human eye-level (1.7m)
    cameraRef.current.position.y = 1.7;
    orbitRef.current.target.y = 1.7;
  };

  // Mouse Orbit & Drag Controls
  const handleMouseDown = (e) => {
    orbitRef.current.isDragging = true;
    orbitRef.current.prevMouseX = e.clientX;
    orbitRef.current.prevMouseY = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!orbitRef.current.isDragging) return;

    const deltaX = e.clientX - orbitRef.current.prevMouseX;
    const deltaY = e.clientY - orbitRef.current.prevMouseY;
    orbitRef.current.prevMouseX = e.clientX;
    orbitRef.current.prevMouseY = e.clientY;

    if (controlMode === 'orbit') {
      orbitRef.current.theta -= deltaX * 0.007;
      orbitRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2.05, orbitRef.current.phi - deltaY * 0.007));
      updateCameraPosition();
    } else {
      // Look around in first-person
      orbitRef.current.theta -= deltaX * 0.005;
      orbitRef.current.phi = Math.max(0.2, Math.min(Math.PI - 0.2, orbitRef.current.phi - deltaY * 0.005));
      const lookDist = 5;
      const tx = cameraRef.current.position.x + lookDist * Math.sin(orbitRef.current.phi) * Math.sin(orbitRef.current.theta);
      const ty = cameraRef.current.position.y + lookDist * Math.cos(orbitRef.current.phi);
      const tz = cameraRef.current.position.z + lookDist * Math.sin(orbitRef.current.phi) * Math.cos(orbitRef.current.theta);
      cameraRef.current.lookAt(tx, ty, tz);
      orbitRef.current.target.set(tx, ty, tz);
    }
  };

  const handleMouseUp = () => {
    orbitRef.current.isDragging = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (controlMode === 'orbit') {
      orbitRef.current.radius = Math.max(6, Math.min(38, orbitRef.current.radius + e.deltaY * 0.02));
      updateCameraPosition();
    }
  };

  // Raycast click for 3D Hotspot beacons
  const handleClick = (e) => {
    if (!mountRef.current || !cameraRef.current || !hotspotsGroupRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.intersectObjects(hotspotsGroupRef.current.children, true);
    if (intersects.length > 0) {
      let targetObj = intersects[0].object;
      while (targetObj.parent && !targetObj.userData?.id) {
        targetObj = targetObj.parent;
      }
      if (targetObj.userData?.id) {
        setSelectedHotspot(targetObj.userData);
        heritageAudio.playSitarPluck(523.25);
        speechService.speak(targetObj.userData.info, 'en-IN');
      }
    }
  };

  // Listen to keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.code] = true;
    };
    const handleKeyUp = (e) => {
      keysPressed.current[e.code] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // WebXR VR Toggle
  const handleToggleVR = () => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        if (supported) {
          setVrStatus('VR Headset detected! Launching WebXR...');
          // Trigger WebXR session
          navigator.xr.requestSession('immersive-vr').then((session) => {
            rendererRef.current.xr.setSession(session);
          });
        } else {
          setVrStatus('No VR Headset detected. Desktop Orbit & Walkthrough fallback is fully active!');
          setTimeout(() => setVrStatus(null), 4000);
        }
      });
    } else {
      setVrStatus('WebXR is not supported in this browser. Please enjoy the Desktop 3D Orbit Mode!');
      setTimeout(() => setVrStatus(null), 4000);
    }
  };

  // Filter monuments by cardinal direction
  const directions = ['All', 'North', 'South', 'East', 'West'];
  const filteredMonuments =
    directionFilter === 'All'
      ? MONUMENTS
      : MONUMENTS.filter((m) => m.direction.toLowerCase().includes(directionFilter.toLowerCase()));

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between p-3 sm:p-5 bg-[#090c15] overflow-hidden">
      {/* Top Filter Bar: Cardinal Directions & Monuments Carousel */}
      <div className="z-20 w-full max-w-7xl mx-auto flex flex-col gap-3 mb-2">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0f172a]/90 border border-[#dfba73]/30 p-2 sm:p-3 rounded-2xl backdrop-blur-md">
          {/* Direction Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#090c15]/80 p-1 rounded-xl border border-[#dfba73]/20">
            {directions.map((dir) => (
              <button
                key={dir}
                onClick={() => setDirectionFilter(dir)}
                aria-label={`Filter by ${dir} India`}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  directionFilter === dir
                    ? 'bg-gradient-to-r from-[#dfba73] to-[#c5a059] text-[#090c15] font-bold shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {dir}
              </button>
            ))}
          </div>

          {/* Monument Selector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-thin">
            {filteredMonuments.map((m) => {
              const isCurrent = m.id === activeMonument.id;
              return (
                <button
                  key={m.id}
                  aria-label={`Select ${m.name}`}
                  onClick={() => {
                    setActiveMonument(m);
                    if (onSelectMonument) onSelectMonument(m.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#dfba73] to-[#c5a059] text-[#090c15] shadow-lg shadow-[#dfba73]/20 font-bold'
                      : 'bg-[#0f172a]/70 text-stone-300 hover:text-white border border-[#dfba73]/25'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#c25e36]"></span>
                  <span>{m.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Viewport */}
      <div
        className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden border border-[#dfba73]/35 shadow-2xl bg-gradient-to-b from-[#0f172a] to-[#090c15]"
        style={{ minHeight: '560px', height: '600px' }}
      >
        {/* Three.js canvas mount with subtle cross-fade transition */}
        <div
          ref={mountRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          onClick={handleClick}
          className={`w-full h-full cursor-grab active:cursor-grabbing select-none transition-opacity duration-300 ease-in-out ${
            isTransitioning ? 'opacity-25' : 'opacity-100'
          }`}
          style={{ width: '100%', height: '100%' }}
        />

        {/* Top Overlay: Monument Title & Direction/Era Badge */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#c85a32] text-white text-[10px] font-bold uppercase tracking-wider">
              {activeMonument.direction} India • {activeMonument.state}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffd700]/20 border border-[#ffd700]/40 text-[#ffd700] text-[10px] font-semibold">
              UNESCO {activeMonument.unescoYear}
            </span>
            <button
              onClick={() => setIsARModalOpen(true)}
              className="pointer-events-auto px-3 py-0.5 rounded-full bg-gradient-to-r from-[#dfba73] to-[#c25e36] text-[#060913] text-[10px] font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1 cursor-pointer border border-[#dfba73]"
              title="Launch WebXR Augmented Reality for this monument"
            >
              <Glasses className="w-3.5 h-3.5" />
              <span>View in AR (WebXR)</span>
            </button>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-['Cinzel'] text-white drop-shadow-md">
            {activeMonument.name} <span className="text-base sm:text-xl font-normal text-[#ffd700]">({activeMonument.hindiName})</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg drop-shadow">
            {getLocalizedMonument(activeMonument, currentLang)?.subtitle || activeMonument.subtitle}
          </p>

          {/* Live Open-Meteo Weather Check & Visit Recommendation Badge */}
          <div className="mt-2 pointer-events-auto max-w-xl">
            {isLoadingWeather ? (
              <WeatherCardSkeleton />
            ) : weatherInfo?.success ? (
              <div className="p-2.5 rounded-2xl bg-[#090c15]/90 border border-[#dfba73]/40 backdrop-blur-md shadow-xl flex flex-col gap-1 text-xs">
                <div className="flex flex-wrap items-center gap-2 text-stone-200">
                  <span className="text-base" role="img" aria-label={weatherInfo.data.weatherLabel}>
                    {weatherInfo.data.weatherIcon}
                  </span>
                  <span className="font-bold text-white text-sm">
                    {Math.round(weatherInfo.data.temperature)}°C
                  </span>
                  <span className="text-[#dfba73] font-medium">({weatherInfo.data.weatherLabel})</span>
                  <span className="text-stone-300">• Feels {Math.round(weatherInfo.data.apparentTemperature)}°C</span>
                  <span className="text-stone-300">• Humidity {weatherInfo.data.humidity}%</span>
                  <span className="text-stone-300">• Wind {weatherInfo.data.windSpeed} km/h</span>
                </div>
                <div className="text-[11px] text-[#ffd700] font-medium flex items-center gap-1.5 pt-1 border-t border-[#dfba73]/25">
                  <Compass className="w-3.5 h-3.5 text-[#ffd700] flex-shrink-0" />
                  <span><strong>Best time to visit:</strong> {weatherInfo.recommendation}</span>
                </div>
              </div>
            ) : (
              <WeatherErrorFallback
                monumentName={activeMonument.name}
                onRetry={() => {
                  setIsLoadingWeather(true);
                  if (activeMonument.coordinates) {
                    fetchMonumentWeather(activeMonument.coordinates[0], activeMonument.coordinates[1]).then((w) => {
                      setWeatherInfo(w);
                      setIsLoadingWeather(false);
                    });
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* Right Floating Control Pill: Lighting & Mode Toggles */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Time of Day Lighting Toggle */}
          <div className="flex flex-col gap-1 p-1 rounded-2xl bg-[#0f172a]/90 border border-[#dfba73]/30 backdrop-blur-md shadow-xl">
            <button
              onClick={() => setTimeOfDay('dawn')}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                timeOfDay === 'dawn' ? 'bg-[#dfba73] text-[#090c15] font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title="Dawn / Sunrise"
              aria-label="Dawn / Sunrise lighting"
            >
              <Sunrise className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTimeOfDay('noon')}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                timeOfDay === 'noon' ? 'bg-[#dfba73] text-[#090c15] font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title="Bright Midday"
              aria-label="Bright Midday lighting"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTimeOfDay('sunset')}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                timeOfDay === 'sunset' ? 'bg-[#c25e36] text-white font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title="Sunset Golden Hour"
              aria-label="Sunset Golden Hour lighting"
            >
              <Sunset className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                timeOfDay === 'night' ? 'bg-[#475569] text-white font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title="Moonlight & Oil Lamps"
              aria-label="Moonlight & Oil Lamps lighting"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Display Fallback Mode: Orbit vs First-Person Walk */}
          <div className="flex flex-col gap-1 p-1 rounded-2xl bg-[#0f172a]/90 border border-[#dfba73]/30 backdrop-blur-md shadow-xl">
            <button
              onClick={() => setControlMode('orbit')}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center ${
                controlMode === 'orbit' ? 'bg-[#dfba73] text-[#090c15] font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title={translations?.orbitMode || "Orbit Controls (Drag to rotate, scroll to zoom)"}
              aria-label={translations?.orbitMode || "Orbit Controls (Drag to rotate, scroll to zoom)"}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setControlMode('walk');
                orbitRef.current.radius = 0.1;
                orbitRef.current.target.set(0, 1.7, 5);
                cameraRef.current.position.set(0, 1.7, 7);
                updateCameraPosition();
              }}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center ${
                controlMode === 'walk' ? 'bg-[#c25e36] text-white font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title={translations?.walkMode || "First-Person Walkthrough (WASD to walk)"}
              aria-label={translations?.walkMode || "First-Person Walkthrough (WASD to walk)"}
            >
              <Move className="w-4 h-4" />
            </button>
          </div>

          {/* Quick-Access Modals: Artifacts, Quiz, Time Travel */}
          <div className="flex flex-col gap-1 p-1 rounded-2xl bg-[#0f172a]/90 border border-[#dfba73]/30 backdrop-blur-md shadow-xl">
            <button
              onClick={() => setIsArtifactModalOpen(true)}
              className="p-2 rounded-xl text-stone-300 hover:text-[#dfba73] hover:bg-[#1e293b] transition-colors cursor-pointer flex items-center justify-center"
              title={translations?.inspectArtifacts || "Inspect 3D Historical Artifacts"}
              aria-label={translations?.inspectArtifacts || "Inspect 3D Historical Artifacts"}
            >
              <Shield className="w-4 h-4 text-[#dfba73]" />
            </button>
            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="p-2 rounded-xl text-stone-300 hover:text-[#dfba73] hover:bg-[#1e293b] transition-colors cursor-pointer flex items-center justify-center"
              title={translations?.monumentQuiz || "Monument Quiz & Badges"}
              aria-label={translations?.monumentQuiz || "Monument Quiz & Badges"}
            >
              <Trophy className="w-4 h-4 text-[#dfba73]" />
            </button>
            <button
              onClick={() => setIsTimeTravelModalOpen(true)}
              className="p-2 rounded-xl text-stone-300 hover:text-[#dfba73] hover:bg-[#1e293b] transition-colors cursor-pointer flex items-center justify-center"
              title={translations?.timeTravelWarp || "Time-Travel Warp Portal"}
              aria-label={translations?.timeTravelWarp || "Time-Travel Warp Portal"}
            >
              <Clock className="w-4 h-4 text-[#c25e36]" />
            </button>
          </div>

          {/* WebXR AR Camera Mode Button */}
          <button
            onClick={() => setIsARModalOpen(true)}
            className="p-2.5 rounded-2xl bg-[#0f172a]/90 hover:bg-[#dfba73] text-[#dfba73] hover:text-[#090c15] border border-[#dfba73]/40 backdrop-blur-md shadow-xl transition-all cursor-pointer flex items-center justify-center group"
            title="Launch WebXR Augmented Reality Camera Mode"
            aria-label="Launch WebXR Augmented Reality Camera Mode"
          >
            <Glasses className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* 3D Minimap Radar Overlay */}
        <Minimap
          hotspots={activeMonument.hotspots || []}
          activeMonumentName={activeMonument.name}
        />

        {/* Bottom Banner: Desktop Control Tip & VR Status */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
          <div className="px-3 py-1.5 rounded-xl bg-[#090c15]/80 border border-[#dfba73]/30 backdrop-blur-md text-[11px] text-[#dfba73]">
            {controlMode === 'orbit' ? (
              <span>{translations?.orbitControlsTip || '🖱️ Left-Click + Drag to Orbit • Scroll to Zoom • Tap gold beacons'}</span>
            ) : (
              <span>{translations?.fpsWalkTip || '🚶 WASD / Arrow Keys to Walk • Mouse Drag to Look • Tap gold beacons'}</span>
            )}
          </div>
          {vrStatus && (
            <div className="px-3 py-1.5 rounded-xl bg-[#c25e36] text-white text-xs font-semibold shadow-lg animate-bounce">
              {vrStatus}
            </div>
          )}
        </div>

        {/* Selected 3D Hotspot Factoid Popup */}
        {selectedHotspot && (
          <div className="absolute bottom-16 left-4 right-4 sm:right-auto sm:max-w-md z-30 p-4 rounded-2xl bg-[#0f172a]/95 border-2 border-[#dfba73] shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#dfba73] flex items-center gap-1.5 font-['Cinzel']">
                <Sparkles className="w-3.5 h-3.5" />
                {selectedHotspot.title}
              </span>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="text-stone-400 hover:text-white text-xs p-1"
                aria-label="Close hotspot information"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              {selectedHotspot.info}
            </p>
          </div>
        )}
      </div>

      {/* Living Time-Travel Historical Host Dock directly beneath the 3D Monument */}
      <div className="z-20 w-full max-w-7xl mx-auto mt-3">
        <TimeTravelHost
          monument={activeMonument}
          userContext={userContext}
          currentLang={currentLang}
          translations={translations}
          onOpenLocalGuide={onOpenLocalGuide}
        />

        {/* Real Stat Callouts Grid & Citation Footer & Report Inaccuracy Bar */}
        <div className="mt-4 p-4 rounded-3xl bg-[#0b1120]/90 border border-[#e5b869]/25 backdrop-blur-md flex flex-col gap-4 text-xs">
          {/* Verified Stat Callout Cards Grid (Item 3) */}
          {activeMonument.stats && activeMonument.stats.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2.5 text-[#e5b869] font-bold text-xs uppercase tracking-wider font-['Cinzel']">
                <BarChart3 className="w-4 h-4 text-[#e5b869]" />
                <span>Verified Historical Architecture Telemetry &amp; Stats</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeMonument.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#060913]/90 border border-[#e5b869]/20 hover:border-[#e5b869]/50 transition-all flex flex-col justify-between"
                  >
                    <span className="text-[11px] text-stone-400 font-medium">{stat.label}</span>
                    <span className="text-sm sm:text-base font-bold text-white mt-1 font-['Outfit']">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source Citations & Report Inaccuracy Footer (Items 4 & 5) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e5b869]/15">
            <div className="flex items-center gap-2 text-stone-400 text-[11px] flex-wrap">
              <BookOpen className="w-3.5 h-3.5 text-[#e5b869] shrink-0" />
              <span className="font-semibold text-stone-300">Sources &amp; Citations:</span>
              <span className="text-stone-400 italic">
                {activeMonument.sources ? activeMonument.sources.join(' • ') : 'ASI Archives, UNESCO World Heritage Center'}
              </span>
            </div>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 text-[11px] font-semibold transition-all cursor-pointer"
              title="Report an inaccuracy or suggest a correction"
            >
              <Flag className="w-3.5 h-3.5 text-amber-400" />
              <span>Report an inaccuracy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Inaccuracy Modal */}
      <ReportInaccuracyModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        monumentName={activeMonument.name}
      />

      {/* 3D Museum Artifact Inspector Modal */}
      <ArtifactInspectorModal
        isOpen={isArtifactModalOpen}
        onClose={() => setIsArtifactModalOpen(false)}
        initialMonumentId={activeMonument.id}
        onSelectMonument={(id) => {
          if (onSelectMonument) onSelectMonument(id);
        }}
      />

      {/* Gamification & Quiz Modal */}
      <GamificationModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        points={points}
        onAddPoints={onAddPoints}
        unlockedBadges={unlockedBadges}
        onUnlockBadge={onUnlockBadge}
        currentMonumentId={activeMonument.id}
      />

      {/* Chronos Time Travel Warp Modal */}
      <TimeTravelModal
        isOpen={isTimeTravelModalOpen}
        onClose={() => setIsTimeTravelModalOpen(false)}
        onSelectMonument={(id) => {
          if (onSelectMonument) onSelectMonument(id);
        }}
      />

      {/* WebXR Augmented Reality Camera Modal */}
      <ARViewerModal
        isOpen={isARModalOpen}
        onClose={() => setIsARModalOpen(false)}
        monument={activeMonument}
        monumentGroup={monumentGroupRef.current}
      />
    </div>
  );
};
