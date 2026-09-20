// HeritageQuest Three.js Architectural Monument Generators
// Procedurally constructs high-fidelity, architecturally distinct 3D models of India's 8 iconic monuments:
// 1. Taj Mahal (Agra)
// 2. Mysore Palace (Mysuru)
// 3. Konark Sun Temple (Konark)
// 4. Gateway of India (Mumbai)
// 5. Brihadisvara Temple (Thanjavur)
// 6. Sanchi Stupa (Sanchi)
// 7. Hawa Mahal (Jaipur)
// 8. Victoria Memorial (Kolkata)
// Equipped with materials, dynamic lighting presets, reflecting water

import * as THREE from 'three';

// Generates an interactive 3D hotspot pulsating beacon
export function createHotspotBeacon(color = 0xe5b869) {
  const group = new THREE.Group();
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    new THREE.MeshBasicMaterial({ color })
  );
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.18, 0.26, 24),
    new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
  );
  ring.rotation.x = Math.PI / 2;
  group.add(sphere, ring);
  return group;
}

// -----------------------------------------------------------------------------
// Procedural Canvas Texture & Normal Map Cache
// -----------------------------------------------------------------------------
const proceduralCache = {
  marble: null,
  marbleNormal: null,
  sandstoneRed: null,
  sandstonePink: null,
  sandstoneNormal: null,
  granite: null,
  graniteNormal: null,
  shadow: null
};

// Generates an authentic Makrana White Marble texture & normal map
export function getMarbleMaterial(options = {}) {
  const { color = 0xf5f3ea, roughness = 0.24, metalness = 0.04 } = options;
  if (!proceduralCache.marble) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Alabaster base
    ctx.fillStyle = '#faf8f2';
    ctx.fillRect(0, 0, 512, 512);

    // Translucent cloudiness
    for (let i = 0; i < 35; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = 40 + Math.random() * 80;
      const grad = ctx.createRadialGradient(x, y, 5, x, y, r);
      grad.addColorStop(0, 'rgba(235, 230, 218, 0.45)');
      grad.addColorStop(1, 'rgba(250, 248, 242, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Branching fine marble veins
    ctx.lineWidth = 1.3;
    for (let v = 0; v < 12; v++) {
      let x = Math.random() * 512;
      let y = Math.random() * 512;
      ctx.strokeStyle = v % 3 === 0 ? 'rgba(175, 160, 140, 0.4)' : 'rgba(190, 195, 205, 0.5)';
      ctx.beginPath();
      ctx.moveTo(x, y);
      const steps = 15 + Math.floor(Math.random() * 15);
      for (let s = 0; s < steps; s++) {
        x += (Math.random() - 0.45) * 28;
        y += (Math.random() - 0.4) * 26;
        ctx.lineTo(x, y);
        if (Math.random() > 0.72) {
          const bx = x + (Math.random() - 0.5) * 20;
          const by = y + (Math.random() - 0.5) * 20;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(bx, by);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y);
        }
      }
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    proceduralCache.marble = tex;

    // Normal Map Canvas
    const nCanvas = document.createElement('canvas');
    nCanvas.width = 256;
    nCanvas.height = 256;
    const nCtx = nCanvas.getContext('2d');
    nCtx.fillStyle = '#8080ff';
    nCtx.fillRect(0, 0, 256, 256);
    const imgData = nCtx.getImageData(0, 0, 256, 256);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 14;
      data[i] = Math.min(255, Math.max(0, 128 + noise));
      data[i + 1] = Math.min(255, Math.max(0, 128 + noise));
      data[i + 2] = 255;
    }
    nCtx.putImageData(imgData, 0, 0);
    const nTex = new THREE.CanvasTexture(nCanvas);
    nTex.wrapS = THREE.RepeatWrapping;
    nTex.wrapT = THREE.RepeatWrapping;
    nTex.repeat.set(3, 3);
    proceduralCache.marbleNormal = nTex;
  }

  return new THREE.MeshStandardMaterial({
    color,
    map: proceduralCache.marble,
    normalMap: proceduralCache.marbleNormal,
    normalScale: new THREE.Vector2(0.3, 0.3),
    roughness,
    metalness
  });
}

// Generates warm Rajasthani Red or Pink Sandstone texture & normal map
export function getSandstoneMaterial(isPink = false, options = {}) {
  const { color, roughness = 0.8, metalness = 0.04 } = options;
  const cacheKey = isPink ? 'sandstonePink' : 'sandstoneRed';
  if (!proceduralCache[cacheKey]) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const baseColor = isPink ? '#c86f66' : '#a8422b';
    const grainColor = isPink ? '#a2554d' : '#82301c';
    const lightColor = isPink ? '#de8a80' : '#bf543a';

    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 512, 512);

    // Horizontal sedimentary bedding layers
    for (let y = 0; y < 512; y += 16) {
      ctx.fillStyle = y % 32 === 0 ? lightColor : grainColor;
      ctx.globalAlpha = 0.24;
      ctx.fillRect(0, y + (Math.random() - 0.5) * 4, 512, 6 + Math.random() * 8);
    }
    ctx.globalAlpha = 1.0;

    // Granular sand speckles
    for (let i = 0; i < 2000; i++) {
      const gx = Math.random() * 512;
      const gy = Math.random() * 512;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(50, 20, 10, 0.28)' : 'rgba(255, 230, 210, 0.24)';
      ctx.fillRect(gx, gy, 1.5, 1.5);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    proceduralCache[cacheKey] = tex;
  }

  if (!proceduralCache.sandstoneNormal) {
    const nCanvas = document.createElement('canvas');
    nCanvas.width = 256;
    nCanvas.height = 256;
    const nCtx = nCanvas.getContext('2d');
    nCtx.fillStyle = '#8080ff';
    nCtx.fillRect(0, 0, 256, 256);
    const imgData = nCtx.getImageData(0, 0, 256, 256);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const grit = (Math.random() - 0.5) * 36;
      data[i] = Math.min(255, Math.max(0, 128 + grit));
      data[i + 1] = Math.min(255, Math.max(0, 128 + grit));
      data[i + 2] = 255;
    }
    nCtx.putImageData(imgData, 0, 0);
    const nTex = new THREE.CanvasTexture(nCanvas);
    nTex.wrapS = THREE.RepeatWrapping;
    nTex.wrapT = THREE.RepeatWrapping;
    nTex.repeat.set(3, 3);
    proceduralCache.sandstoneNormal = nTex;
  }

  return new THREE.MeshStandardMaterial({
    color: color || (isPink ? 0xdf8a88 : 0xa8422b),
    map: proceduralCache[cacheKey],
    normalMap: proceduralCache.sandstoneNormal,
    normalScale: new THREE.Vector2(0.5, 0.5),
    roughness,
    metalness
  });
}

// Generates Ancient Chiseled Temple Granite / Basalt Masonry texture & normal map
export function getGraniteMaterial(color = 0x827768, roughness = 0.84, metalness = 0.06) {
  if (!proceduralCache.granite) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#7a7063';
    ctx.fillRect(0, 0, 512, 512);

    // Stone masonry coursing
    ctx.strokeStyle = '#423b32';
    ctx.lineWidth = 2;
    const blockSize = 64;
    for (let y = 0; y <= 512; y += blockSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();

      const offset = (y / blockSize) % 2 === 0 ? 0 : blockSize / 2;
      for (let x = offset; x <= 512; x += blockSize) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + blockSize);
        ctx.stroke();
      }
    }

    // Weathered stone pitting & minerals
    for (let i = 0; i < 2800; i++) {
      const px = Math.random() * 512;
      const py = Math.random() * 512;
      const crystal = Math.random();
      if (crystal < 0.35) {
        ctx.fillStyle = 'rgba(235, 225, 210, 0.38)';
      } else if (crystal < 0.7) {
        ctx.fillStyle = 'rgba(35, 30, 25, 0.48)';
      } else {
        ctx.fillStyle = 'rgba(175, 145, 125, 0.32)';
      }
      ctx.fillRect(px, py, 2, 2);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    proceduralCache.granite = tex;

    // Normal Map with Mortar Grooves
    const nCanvas = document.createElement('canvas');
    nCanvas.width = 256;
    nCanvas.height = 256;
    const nCtx = nCanvas.getContext('2d');
    nCtx.fillStyle = '#8080ff';
    nCtx.fillRect(0, 0, 256, 256);
    nCtx.strokeStyle = '#5a5aa8';
    nCtx.lineWidth = 3;
    for (let y = 0; y <= 256; y += 32) {
      nCtx.beginPath();
      nCtx.moveTo(0, y);
      nCtx.lineTo(256, y);
      nCtx.stroke();
      const off = (y / 32) % 2 === 0 ? 0 : 16;
      for (let x = off; x <= 256; x += 32) {
        nCtx.beginPath();
        nCtx.moveTo(x, y);
        nCtx.lineTo(x, y + 32);
        nCtx.stroke();
      }
    }
    const nTex = new THREE.CanvasTexture(nCanvas);
    nTex.wrapS = THREE.RepeatWrapping;
    nTex.wrapT = THREE.RepeatWrapping;
    nTex.repeat.set(3, 3);
    proceduralCache.graniteNormal = nTex;
  }

  return new THREE.MeshStandardMaterial({
    color,
    map: proceduralCache.granite,
    normalMap: proceduralCache.graniteNormal,
    normalScale: new THREE.Vector2(0.65, 0.65),
    roughness,
    metalness
  });
}

// Generates a soft radial ambient occlusion contact shadow ground plane
export function createContactShadow(width = 14, depth = 14, opacity = 0.65) {
  if (!proceduralCache.shadow) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
    grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.55)');
    grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const tex = new THREE.CanvasTexture(canvas);
    proceduralCache.shadow = tex;
  }

  const planeGeo = new THREE.PlaneGeometry(width, depth);
  const planeMat = new THREE.MeshBasicMaterial({
    map: proceduralCache.shadow,
    transparent: true,
    opacity,
    depthWrite: false
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.02;
  return mesh;
}

export function createMonument3D(monumentId) {
  const group = new THREE.Group();
  group.name = monumentId;

  switch (monumentId) {
    case 'taj-mahal':
      buildTajMahal(group);
      break;
    case 'mysore-palace':
      buildMysorePalace(group);
      break;
    case 'konark-sun-temple':
    case 'konark-sun':
      buildKonarkSunTemple(group);
      break;
    case 'gateway-of-india':
      buildGatewayOfIndia(group);
      break;
    case 'brihadisvara-temple':
    case 'brihadisvara':
      buildBrihadisvaraTemple(group);
      break;
    case 'sanchi-stupa':
      buildSanchiStupa(group);
      break;
    case 'hawa-mahal':
      buildHawaMahal(group);
      break;
    case 'victoria-memorial':
      buildVictoriaMemorial(group);
      break;
    default:
      buildTajMahal(group);
      break;
  }

  return group;
}

// -----------------------------------------------------------------------------
// 1. TAJ MAHAL (Agra, Uttar Pradesh) - Pure White Makrana Marble Masterpiece
// -----------------------------------------------------------------------------
function buildTajMahal(group) {
  // Ambient occlusion ground contact shadow
  group.add(createContactShadow(20, 20, 0.75));

  const marbleMat = getMarbleMaterial({ color: 0xfaf8f2, roughness: 0.22 });
  const marblePlinthMat = getMarbleMaterial({ color: 0xe8e4dc, roughness: 0.32 });
  const goldFinialMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.2, metalness: 0.88 });
  const redSandstoneMat = getSandstoneMaterial(false, { color: 0xa8422b, roughness: 0.78 });
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.1, metalness: 0.7, opacity: 0.85, transparent: true });

  // Red Sandstone Vast Terrace Sub-Plinth
  const subPlinth = new THREE.Mesh(new THREE.BoxGeometry(15, 0.4, 15), redSandstoneMat);
  subPlinth.position.y = -0.2;
  subPlinth.receiveShadow = true;
  group.add(subPlinth);

  // White Marble Main Plinth (Square with chamfered corners)
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.9, 9.5), marblePlinthMat);
  plinth.position.y = 0.45;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Main Mausoleum Block (Chamfered octagonal cube)
  const mainCube = new THREE.Mesh(new THREE.BoxGeometry(4.8, 3.2, 4.8), marbleMat);
  mainCube.position.y = 2.5;
  mainCube.castShadow = true;
  mainCube.receiveShadow = true;
  group.add(mainCube);

  // Chamfered corner piers to give authentic octagonal profile
  const cornerMat = getMarbleMaterial({ color: 0xede9de, roughness: 0.28 });
  const corners = [
    [-2.2, 2.5, -2.2],
    [2.2, 2.5, -2.2],
    [-2.2, 2.5, 2.2],
    [2.2, 2.5, 2.2]
  ];
  corners.forEach(([cx, cy, cz]) => {
    const cMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 3.25, 1.0), cornerMat);
    cMesh.position.set(cx, cy, cz);
    cMesh.rotation.y = Math.PI / 4;
    group.add(cMesh);
  });

  // Four Grand Recessed Pishtaq Arches with dark calligraphy frame
  const archMat = new THREE.MeshStandardMaterial({ color: 0x1f1f24, roughness: 0.85 });
  const archBorderMat = getMarbleMaterial({ color: 0x3b3b44, roughness: 0.5 });
  const archFrames = [
    { pos: [0, 2.3, 2.43], rot: [0, 0, 0] },
    { pos: [0, 2.3, -2.43], rot: [0, Math.PI, 0] },
    { pos: [2.43, 2.3, 0], rot: [0, Math.PI / 2, 0] },
    { pos: [-2.43, 2.3, 0], rot: [0, -Math.PI / 2, 0] }
  ];
  archFrames.forEach((a) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.4, 0.08), archMat);
    frame.position.set(...a.pos);
    frame.rotation.set(...a.rot);
    const border = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.6, 0.04), archBorderMat);
    border.position.set(a.pos[0], a.pos[1], a.pos[2] * 0.99);
    border.rotation.set(...a.rot);
    group.add(border, frame);
  });

  // High Cylindrical Drum for Main Dome
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.7, 0.9, 32), marbleMat);
  drum.position.y = 4.5;
  drum.castShadow = true;
  group.add(drum);

  // Monumental Bulbous Onion Dome with Fluted Neck Collar
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.85, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.72), marbleMat);
  dome.position.y = 4.9;
  dome.scale.set(1.0, 1.25, 1.0);
  dome.castShadow = true;
  group.add(dome);

  // Fluted Lotus Petal Neck Collar at dome base
  const domeCollar = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.08, 12, 32), marblePlinthMat);
  domeCollar.position.y = 4.45;
  domeCollar.rotation.x = Math.PI / 2;
  group.add(domeCollar);

  // Gilded Finial with Islamic Moon & Kalasha Motif
  const finialPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 1.4, 16), goldFinialMat);
  finialPole.position.y = 7.0;
  const finialBall = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), goldFinialMat);
  finialBall.position.y = 7.5;
  group.add(finialPole, finialBall);

  // Four Symmetrical Domed Chattris flanking the Main Dome
  const chattriCoords = [
    [-1.6, 1.6],
    [1.6, 1.6],
    [-1.6, -1.6],
    [1.6, -1.6]
  ];
  chattriCoords.forEach(([cx, cz]) => {
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.8, 8), marbleMat);
      pillar.position.set(cx + Math.cos(angle) * 0.35, 4.5, cz + Math.sin(angle) * 0.35);
      group.add(pillar);
    }
    const cDome = new THREE.Mesh(new THREE.SphereGeometry(0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), marbleMat);
    cDome.position.set(cx, 4.9, cz);
    const cFinial = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.4, 8), goldFinialMat);
    cFinial.position.set(cx, 5.35, cz);
    group.add(cDome, cFinial);
  });

  // Four Outward-Tilted Minarets at Plinth Corners
  const minaretOffsets = [
    [-3.8, -3.8],
    [3.8, -3.8],
    [-3.8, 3.8],
    [3.8, 3.8]
  ];
  minaretOffsets.forEach(([mx, mz]) => {
    const minaretGroup = new THREE.Group();
    const shaft1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 2.2, 16), marbleMat);
    shaft1.position.y = 1.1;
    const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.1, 16), marblePlinthMat);
    b1.position.y = 2.2;
    const shaft2 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 2.0, 16), marbleMat);
    shaft2.position.y = 3.2;
    const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.1, 16), marblePlinthMat);
    b2.position.y = 4.2;
    const shaft3 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.23, 1.4, 16), marbleMat);
    shaft3.position.y = 4.9;

    const mCupola = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), marbleMat);
    mCupola.position.y = 5.75;
    const mFinial = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.35, 8), goldFinialMat);
    mFinial.position.y = 6.05;

    minaretGroup.add(shaft1, b1, shaft2, b2, shaft3, mCupola, mFinial);
    minaretGroup.position.set(mx, 0.9, mz);
    minaretGroup.rotation.z = -Math.sign(mx) * 0.035;
    minaretGroup.rotation.x = Math.sign(mz) * 0.035;
    group.add(minaretGroup);
  });

  // Long Charbagh Water Canal (Hauz-i-Kausar) in front
  const canal = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 5.0), waterMat);
  canal.position.set(0, 0.05, 5.2);
  group.add(canal);

  const border1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 5.0), redSandstoneMat);
  border1.position.set(-1.0, 0.1, 5.2);
  const border2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 5.0), redSandstoneMat);
  border2.position.set(1.0, 0.1, 5.2);
  group.add(border1, border2);

  // Cypress trees along canal
  const treeMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.9 });
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3825, roughness: 0.9 });
  [-1.4, 1.4].forEach((tx) => {
    [3.5, 5.2, 6.8].forEach((tz) => {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.5, 6), trunkMat);
      trunk.position.set(tx, 0.25, tz);
      const foliage = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.2, 8), treeMat);
      foliage.position.set(tx, 1.0, tz);
      group.add(trunk, foliage);
    });
  });
}

// -----------------------------------------------------------------------------
// 2. MYSORE PALACE (Mysuru, Karnataka) - Indo-Saracenic Royal Residence
// -----------------------------------------------------------------------------
function buildMysorePalace(group) {
  // Ambient occlusion ground contact shadow
  group.add(createContactShadow(18, 14, 0.7));

  const graniteMat = getGraniteMaterial(0x828892, 0.72);
  const graniteDarkMat = getGraniteMaterial(0x5a606a, 0.82);
  const goldDomeMat = new THREE.MeshStandardMaterial({ color: 0xe5b869, metalness: 0.85, roughness: 0.22 });
  const pinkMarbleMat = getSandstoneMaterial(true, { color: 0xdf8a88, roughness: 0.38 });
  const goldTrimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.88, roughness: 0.18 });
  const archMat = new THREE.MeshStandardMaterial({ color: 0x22262d, roughness: 0.9 });
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xfff3a8 });

  // Base Plinth
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(14, 0.6, 8.5), graniteDarkMat);
  plinth.position.y = 0.3;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Main 3-Tiered Facade Wings (Left & Right)
  const mainBlock = new THREE.Mesh(new THREE.BoxGeometry(11.5, 2.8, 4.8), graniteMat);
  mainBlock.position.set(0, 2.0, 0);
  mainBlock.castShadow = true;
  mainBlock.receiveShadow = true;
  group.add(mainBlock);

  // Arched Colonnade Front Verandah (Gombe Thotti / Durbar Hall Arches)
  for (let x = -4.5; x <= 4.5; x += 1.5) {
    if (Math.abs(x) < 1.0) continue;
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 2.2, 8), graniteDarkMat);
    pillar.position.set(x, 1.7, 2.5);
    group.add(pillar);

    const arch = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.2), goldTrimMat);
    arch.position.set(x, 2.9, 2.5);
    group.add(arch);
  }

  // Central Grand Entrance Arch
  const portal = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 0.4), archMat);
  portal.position.set(0, 1.9, 2.45);
  group.add(portal);

  // Magnificent 145-foot Central Gilded Tower (5 tiers)
  const t1 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 3.2), graniteMat);
  t1.position.set(0, 4.0, 0.2);
  const t2 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.0, 2.6), graniteMat);
  t2.position.set(0, 5.1, 0.2);
  const t3 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.8, 2.0), graniteMat);
  t3.position.set(0, 6.0, 0.2);
  group.add(t1, t2, t3);

  // Central Golden Dome atop the main tower
  const centralDome = new THREE.Mesh(new THREE.SphereGeometry(1.25, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.65), goldDomeMat);
  centralDome.position.set(0, 6.7, 0.2);
  centralDome.scale.set(1.0, 1.3, 1.0);
  const centralFinial = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.0, 12), goldTrimMat);
  centralFinial.position.set(0, 8.2, 0.2);
  group.add(centralDome, centralFinial);

  // 4 Corner Towers with Pink Marble Domes
  const cornerTowers = [
    [-5.6, -2.2],
    [5.6, -2.2],
    [-5.6, 2.2],
    [5.6, 2.2]
  ];
  cornerTowers.forEach(([cx, cz]) => {
    const towerShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.75, 4.2, 16), graniteMat);
    towerShaft.position.set(cx, 2.7, cz);
    const towerBalcony = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.2, 16), goldTrimMat);
    towerBalcony.position.set(cx, 4.8, cz);
    const pinkDome = new THREE.Mesh(new THREE.SphereGeometry(0.75, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.6), pinkMarbleMat);
    pinkDome.position.set(cx, 5.2, cz);
    pinkDome.scale.set(1.0, 1.25, 1.0);
    const pFinial = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.6, 8), goldTrimMat);
    pFinial.position.set(cx, 6.1, cz);
    group.add(towerShaft, towerBalcony, pinkDome, pFinial);
  });

  // Chattris on roofline
  [-2.8, 2.8].forEach((rx) => {
    const rChattri = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.6), goldDomeMat);
    rChattri.position.set(rx, 3.8, 2.2);
    group.add(rChattri);
  });

  // Famous Mysore Palace Night Illumination Bulbs
  for (let lx = -5.2; lx <= 5.2; lx += 0.6) {
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), lightMat);
    bulb.position.set(lx, 3.45, 2.5);
    group.add(bulb);
  }

  // Palace Courtyard Lawn
  const lawnMat = new THREE.MeshStandardMaterial({ color: 0x1e3a24, roughness: 0.9 });
  const lawn = new THREE.Mesh(new THREE.BoxGeometry(14, 0.1, 4), lawnMat);
  lawn.position.set(0, 0.1, 4.5);
  group.add(lawn);
}

// -----------------------------------------------------------------------------
// 3. KONARK SUN TEMPLE (Konark, Odisha) - Colossal Stone Chariot of Surya
// -----------------------------------------------------------------------------
function buildKonarkSunTemple(group) {
  // Ambient occlusion ground contact shadow
  group.add(createContactShadow(18, 16, 0.72));

  const khondaliteMat = getGraniteMaterial(0x93785b, 0.82);
  const darkStoneMat = getGraniteMaterial(0x6e563d, 0.88);
  const wheelRimMat = getGraniteMaterial(0x7a6348, 0.8);
  const goldFinialMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.25, metalness: 0.82 });

  // High Stepped Plinth (The Chariot Platform)
  const basePlinth = new THREE.Mesh(new THREE.BoxGeometry(12, 0.6, 9), darkStoneMat);
  basePlinth.position.y = 0.3;
  basePlinth.receiveShadow = true;
  group.add(basePlinth);

  const midPlinth = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.8, 7.8), khondaliteMat);
  midPlinth.position.y = 0.9;
  midPlinth.castShadow = true;
  group.add(midPlinth);

  // 24 Carved Astronomical Stone Wheels
  const wheelPositions = [];
  for (let z = -3.0; z <= 3.0; z += 1.2) wheelPositions.push([-5.35, 0.9, z, Math.PI / 2]);
  for (let z = -3.0; z <= 3.0; z += 1.2) wheelPositions.push([5.35, 0.9, z, -Math.PI / 2]);

  wheelPositions.forEach(([wx, wy, wz, rotY]) => {
    const wheelGroup = new THREE.Group();
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.08, 12, 24), wheelRimMat);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.18, 12), darkStoneMat);
    hub.rotation.x = Math.PI / 2;
    wheelGroup.add(rim, hub);

    for (let s = 0; s < 8; s++) {
      const angle = (s * Math.PI) / 4;
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.0, 6), wheelRimMat);
      spoke.rotation.z = angle;
      wheelGroup.add(spoke);
    }
    wheelGroup.position.set(wx, wy, wz);
    wheelGroup.rotation.y = rotY;
    group.add(wheelGroup);
  });

  // 7 Galloping Stone Horses pulling the Chariot forward
  const horseMat = new THREE.MeshStandardMaterial({ color: 0x8a7055, roughness: 0.8 });
  const horseX = [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4];
  horseX.forEach((hx) => {
    const horse = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.35, 0.9), horseMat);
    body.rotation.x = -0.3;
    body.position.y = 0.5;
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.25), horseMat);
    neck.position.set(0, 0.8, 0.35);
    neck.rotation.x = 0.35;
    const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.6, 6), horseMat);
    leg1.position.set(-0.1, 0.25, 0.45);
    leg1.rotation.x = -0.4;
    const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.6, 6), horseMat);
    leg2.position.set(0.1, 0.25, 0.45);
    leg2.rotation.x = -0.3;
    horse.add(body, neck, leg1, leg2);
    horse.position.set(hx, 0.2, 4.8);
    group.add(horse);
  });

  // Massive Jagamohana (Pyramidal Assembly Hall Porch)
  const tier1 = new THREE.Mesh(new THREE.BoxGeometry(6.2, 1.2, 6.2), khondaliteMat);
  tier1.position.y = 1.9;
  const cornice1 = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.25, 6.6), darkStoneMat);
  cornice1.position.y = 2.55;

  const tier2 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.1, 4.8), khondaliteMat);
  tier2.position.y = 3.2;
  const cornice2 = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.22, 5.2), darkStoneMat);
  cornice2.position.y = 3.8;

  const tier3 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.0, 3.6), khondaliteMat);
  tier3.position.y = 4.4;
  group.add(tier1, cornice1, tier2, cornice2, tier3);

  // Colossal Ribbed Amalaka Stone Disc & Kalasha
  const amalaka = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.6, 24), darkStoneMat);
  amalaka.position.y = 5.2;
  const kalasha = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), khondaliteMat);
  kalasha.position.y = 5.75;
  const apex = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.8, 12), goldFinialMat);
  apex.position.y = 6.4;
  group.add(amalaka, kalasha, apex);

  // Entrance Portico Stairs facing East
  const stairs = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.8, 2.0), darkStoneMat);
  stairs.position.set(0, 0.7, 4.0);
  group.add(stairs);

  // Natya Mandapa (Hall of Dance) Pillared Pavilion in front
  [-2.2, 2.2].forEach((px) => {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 1.8, 8), khondaliteMat);
    pillar.position.set(px, 1.2, 5.8);
    group.add(pillar);
  });
}

// -----------------------------------------------------------------------------
// 4. GATEWAY OF INDIA (Mumbai, Maharashtra) - Basalt Triumphal Waterfront Arch
// -----------------------------------------------------------------------------
function buildGatewayOfIndia(group) {
  // Ambient occlusion ground contact shadow
  group.add(createContactShadow(16, 14, 0.68));

  const yellowBasaltMat = getGraniteMaterial(0xc8a265, 0.72);
  const darkBasaltMat = getGraniteMaterial(0x9b7a48, 0.82);
  const jaliMat = new THREE.MeshStandardMaterial({ color: 0x3d3120, roughness: 0.9 });
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x1a365d, roughness: 0.15, metalness: 0.6, opacity: 0.9, transparent: true });

  // Arabian Sea Water Body on Harbour side
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(16, 6), waterMat);
  sea.rotation.x = -Math.PI / 2;
  sea.position.set(0, -0.05, -3.8);
  group.add(sea);

  // Apollo Bunder Seafront Stone Promenade Plinth
  const promenade = new THREE.Mesh(new THREE.BoxGeometry(13, 0.6, 9.5), darkBasaltMat);
  promenade.position.y = 0.3;
  promenade.receiveShadow = true;
  group.add(promenade);

  // Steps descending into the Arabian Sea
  const seaSteps = new THREE.Mesh(new THREE.BoxGeometry(8, 0.3, 1.5), darkBasaltMat);
  seaSteps.position.set(0, 0.15, -4.2);
  group.add(seaSteps);

  // Monumental Main Arch Block
  const mainPiers = new THREE.Mesh(new THREE.BoxGeometry(8.2, 5.0, 3.4), yellowBasaltMat);
  mainPiers.position.y = 3.1;
  mainPiers.castShadow = true;
  group.add(mainPiers);

  // Soaring 83-foot Central Triumphal Archway
  const centralArchway = new THREE.Mesh(new THREE.BoxGeometry(3.0, 3.8, 3.6), jaliMat);
  centralArchway.position.set(0, 2.5, 0);
  group.add(centralArchway);

  // Flanking Side Arches
  [-3.0, 3.0].forEach((sx) => {
    const sideArch = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.8, 3.5), jaliMat);
    sideArch.position.set(sx, 2.0, 0);
    group.add(sideArch);
  });

  // Intricate Pierced Stone Jali Lattices
  const jaliScreen = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.9, 0.1), darkBasaltMat);
  jaliScreen.position.set(0, 4.4, 1.72);
  group.add(jaliScreen);

  // Grand Attic & Inscription Parapet atop the arch
  const attic = new THREE.Mesh(new THREE.BoxGeometry(8.6, 1.2, 3.6), yellowBasaltMat);
  attic.position.y = 6.2;
  group.add(attic);

  // 4 Corner Turrets with Fluted Minarets & Domed Chattris
  const cornerTurrets = [
    [-4.1, -1.7],
    [4.1, -1.7],
    [-4.1, 1.7],
    [4.1, 1.7]
  ];
  cornerTurrets.forEach(([tx, tz]) => {
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 6.6, 8), darkBasaltMat);
    shaft.position.set(tx, 3.9, tz);
    const balcony = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.2, 8), yellowBasaltMat);
    balcony.position.set(tx, 6.9, tz);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.6), yellowBasaltMat);
    dome.position.set(tx, 7.3, tz);
    const finial = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.5, 8), darkBasaltMat);
    finial.position.set(tx, 7.8, tz);
    group.add(shaft, balcony, dome, finial);
  });
}

// -----------------------------------------------------------------------------
// 5. BRIHADISVARA TEMPLE (Thanjavur, Tamil Nadu) - Monolithic Chola Granite Vimana
// -----------------------------------------------------------------------------
function buildBrihadisvaraTemple(group) {
  // Ambient occlusion ground contact shadow
  group.add(createContactShadow(18, 15, 0.72));

  const graniteMat = getGraniteMaterial(0x8b7d6b, 0.82);
  const darkGraniteMat = getGraniteMaterial(0x5e5346, 0.88);
  const goldFinialMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.88, roughness: 0.18 });

  // Wide Granite Plinth
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(14, 0.8, 9), darkGraniteMat);
  plinth.position.y = 0.4;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Sanctum Square Base
  const sanctumBase = new THREE.Mesh(new THREE.BoxGeometry(6.2, 2.2, 6.2), graniteMat);
  sanctumBase.position.set(-2.5, 1.9, 0);
  sanctumBase.castShadow = true;
  group.add(sanctumBase);

  // Soaring 16-Tiered Pyramidal Vimana Tower
  const vimanaGroup = new THREE.Group();
  const tiers = 14;
  const baseWidth = 5.8;
  const topWidth = 1.6;
  const heightStep = 0.42;

  for (let i = 0; i < tiers; i++) {
    const t = i / (tiers - 1);
    const w = baseWidth * (1 - t) + topWidth * t;
    const tierMesh = new THREE.Mesh(new THREE.BoxGeometry(w, heightStep, w), graniteMat);
    tierMesh.position.y = 3.0 + i * heightStep;
    vimanaGroup.add(tierMesh);

    if (i % 2 === 0) {
      const cornice = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.1, w + 0.2), darkGraniteMat);
      cornice.position.y = 3.0 + i * heightStep + heightStep * 0.5;
      vimanaGroup.add(cornice);
    }
  }
  vimanaGroup.position.x = -2.5;
  group.add(vimanaGroup);

  // Monolithic 80-Ton Single Granite Kumbam Capstone
  const kumbam = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6), darkGraniteMat);
  kumbam.position.set(-2.5, 8.8, 0);
  kumbam.scale.set(1.1, 0.9, 1.1);
  group.add(kumbam);

  // Golden Stupi Finial
  const stupi = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.25, 1.1, 12), goldFinialMat);
  stupi.position.set(-2.5, 9.7, 0);
  const stupiSpire = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.6, 8), goldFinialMat);
  stupiSpire.position.set(-2.5, 10.3, 0);
  group.add(stupi, stupiSpire);

  // Pillared Ardha-Mandapa and Maha-Mandapa Halls
  const mandapa = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1.8, 4.2), graniteMat);
  mandapa.position.set(2.0, 1.7, 0);
  const mRoof = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.3, 4.5), darkGraniteMat);
  mRoof.position.set(2.0, 2.7, 0);
  group.add(mandapa, mRoof);

  // Monolithic Nandi Mandapa Pavilion
  const nandiPavilion = new THREE.Group();
  const nPillars = [
    [-0.7, -0.7],
    [0.7, -0.7],
    [-0.7, 0.7],
    [0.7, 0.7]
  ];
  nPillars.forEach(([px, pz]) => {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.2, 8), darkGraniteMat);
    pillar.position.set(px, 0.6, pz);
    nandiPavilion.add(pillar);
  });
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.3, 1.9), graniteMat);
  canopy.position.y = 1.3;
  const nandiBody = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.45, 1.1), darkGraniteMat);
  nandiBody.position.set(0, 0.35, 0);
  const nandiHump = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), darkGraniteMat);
  nandiHump.position.set(0, 0.6, -0.1);
  nandiPavilion.add(canopy, nandiBody, nandiHump);

  nandiPavilion.position.set(5.5, 0.8, 0);
  group.add(nandiPavilion);
}

// -----------------------------------------------------------------------------
// 6. SANCHI STUPA (Sanchi, Madhya Pradesh) - Ancient Mauryan Hemispherical Dome
// -----------------------------------------------------------------------------
function buildSanchiStupa(group) {
  // Ambient occlusion ground contact shadow
  group.add(createContactShadow(15, 15, 0.68));

  const sandstoneMat = getSandstoneMaterial(false, { color: 0xc49b71, roughness: 0.82 });
  const darkSandstoneMat = getSandstoneMaterial(false, { color: 0x96734e, roughness: 0.86 });
  const stoneBalustradeMat = getSandstoneMaterial(false, { color: 0xaa835b, roughness: 0.78 });
  const harmikaMat = getSandstoneMaterial(false, { color: 0x7c5d3d, roughness: 0.85 });

  // Circular Base Platform (Medhi)
  const medhi = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.4, 1.1, 48), darkSandstoneMat);
  medhi.position.y = 0.55;
  medhi.receiveShadow = true;
  group.add(medhi);

  // Circumambulation Balustrade Railing (Vedika)
  const vedika = new THREE.Mesh(new THREE.CylinderGeometry(5.3, 5.3, 0.6, 48, 1, true), stoneBalustradeMat);
  vedika.position.y = 1.35;
  group.add(vedika);

  // Monumental Hemispherical Anda Dome
  const anda = new THREE.Mesh(new THREE.SphereGeometry(4.2, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.5), sandstoneMat);
  anda.position.y = 1.1;
  anda.scale.set(1.0, 0.85, 1.0);
  anda.castShadow = true;
  group.add(anda);

  // Square Harmika Railing
  const harmika = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 1.6), harmikaMat);
  harmika.position.y = 4.7;
  group.add(harmika);

  // Three-Tiered Royal Chhatra Spire
  const spireRod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.8, 8), darkSandstoneMat);
  spireRod.position.y = 5.6;
  group.add(spireRod);

  [5.2, 5.7, 6.2].forEach((cy, idx) => {
    const discRadius = 0.85 - idx * 0.18;
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(discRadius, discRadius + 0.05, 0.1, 16), sandstoneMat);
    disc.position.y = cy;
    group.add(disc);
  });

  // Four Carved Torana Gateways (North, South, East, West)
  const toranaAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  toranaAngles.forEach((angle) => {
    const torana = new THREE.Group();
    const pillarDist = 0.9;
    [-pillarDist, pillarDist].forEach((px) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.24, 3.2, 0.24), darkSandstoneMat);
      p.position.set(px, 1.6, 0);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.3, 0.35), sandstoneMat);
      cap.position.set(px, 3.3, 0);
      torana.add(p, cap);
    });

    [2.6, 3.0, 3.4].forEach((ay) => {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.18, 0.2), sandstoneMat);
      beam.position.set(0, ay, 0);
      [-1.3, 1.3].forEach((bx) => {
        const scroll = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.22, 12), darkSandstoneMat);
        scroll.rotation.x = Math.PI / 2;
        scroll.position.set(bx, ay, 0);
        torana.add(scroll);
      });
      torana.add(beam);
    });

    const chakra = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.05, 8, 16), stoneBalustradeMat);
    chakra.position.set(0, 3.8, 0);
    torana.add(chakra);

    torana.position.set(Math.sin(angle) * 5.6, 0, Math.cos(angle) * 5.6);
    torana.rotation.y = angle;
    group.add(torana);
  });
}

// -----------------------------------------------------------------------------
// 7. HAWA MAHAL (Jaipur, Rajasthan) - 5-Tier Pink Sandstone Honeycomb Palace
// -----------------------------------------------------------------------------
function buildHawaMahal(group) {
  // Ambient occlusion ground contact shadow
  group.add(createContactShadow(15, 10, 0.65));

  const pinkSandstoneMat = getSandstoneMaterial(true, { color: 0xd9755f, roughness: 0.76 });
  const redSandstoneMat = getSandstoneMaterial(false, { color: 0xb54d38, roughness: 0.82 });
  const whiteTrimMat = new THREE.MeshStandardMaterial({ color: 0xfff0ea, roughness: 0.35 });
  const jaliDarkMat = new THREE.MeshStandardMaterial({ color: 0x3d1a15, roughness: 0.95 });

  // Base Plinth
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(11, 0.6, 4.5), redSandstoneMat);
  plinth.position.y = 0.3;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Five Ascending Pyramidal Tiers
  const tierConfigs = [
    { width: 9.6, height: 1.8, y: 1.5, z: 0.0, jharokhas: 9 },
    { width: 8.0, height: 1.6, y: 3.2, z: -0.15, jharokhas: 7 },
    { width: 6.4, height: 1.5, y: 4.75, z: -0.3, jharokhas: 5 },
    { width: 4.8, height: 1.3, y: 6.15, z: -0.45, jharokhas: 4 },
    { width: 3.2, height: 1.2, y: 7.4, z: -0.6, jharokhas: 3 }
  ];

  tierConfigs.forEach((tier) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(tier.width, tier.height, 0.6), pinkSandstoneMat);
    wall.position.set(0, tier.y, tier.z);
    group.add(wall);

    const step = tier.width / (tier.jharokhas + 1);
    for (let j = 1; j <= tier.jharokhas; j++) {
      const jx = -tier.width / 2 + j * step;
      const jharokhaGroup = new THREE.Group();

      const bay = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.3, 0.8, 6, 1, false, 0, Math.PI), pinkSandstoneMat);
      bay.position.set(0, 0, 0.3);
      bay.rotation.y = Math.PI / 2;

      const windowScreen = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.45, 0.05), jaliDarkMat);
      windowScreen.position.set(0, 0, 0.42);

      const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.34, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), whiteTrimMat);
      canopy.position.set(0, 0.45, 0.3);
      canopy.scale.set(1.0, 1.4, 1.0);

      const finial = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.2, 6), whiteTrimMat);
      finial.position.set(0, 0.85, 0.3);

      jharokhaGroup.add(bay, windowScreen, canopy, finial);
      jharokhaGroup.position.set(jx, tier.y, tier.z);
      group.add(jharokhaGroup);
    }

    const cornice = new THREE.Mesh(new THREE.BoxGeometry(tier.width + 0.3, 0.12, 0.85), whiteTrimMat);
    cornice.position.set(0, tier.y + tier.height / 2, tier.z);
    group.add(cornice);
  });

  [-1.2, 0, 1.2].forEach((cx) => {
    const topFinial = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.7, 8), whiteTrimMat);
    topFinial.position.set(cx, 8.35, -0.6);
    group.add(topFinial);
  });

  const streetMat = new THREE.MeshStandardMaterial({ color: 0x52433d, roughness: 0.9 });
  const street = new THREE.Mesh(new THREE.BoxGeometry(12, 0.1, 3.5), streetMat);
  street.position.set(0, 0.05, 2.8);
  group.add(street);
}

// -----------------------------------------------------------------------------
// 8. VICTORIA MEMORIAL (Kolkata, West Bengal) - White Marble Neoclassical Palace
// -----------------------------------------------------------------------------
function buildVictoriaMemorial(group) {
  // Ambient occlusion ground contact shadow
  group.add(createContactShadow(18, 16, 0.72));

  const marbleMat = getMarbleMaterial({ color: 0xf5f6f8, roughness: 0.22 });
  const marbleDarkMat = getMarbleMaterial({ color: 0xd6dadf, roughness: 0.35 });
  const bronzeMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.88, roughness: 0.25 });
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.1, metalness: 0.6, opacity: 0.85, transparent: true });

  const plinth = new THREE.Mesh(new THREE.BoxGeometry(14, 0.7, 9.5), marbleDarkMat);
  plinth.position.y = 0.35;
  plinth.receiveShadow = true;
  group.add(plinth);

  const centerBlock = new THREE.Mesh(new THREE.BoxGeometry(5.4, 2.8, 5.0), marbleMat);
  centerBlock.position.set(0, 2.1, 0);
  centerBlock.castShadow = true;
  group.add(centerBlock);

  [-4.2, 4.2].forEach((wx) => {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.2, 4.0), marbleMat);
    wing.position.set(wx, 1.8, 0);
    wing.castShadow = true;
    group.add(wing);

    for (let c = -1.2; c <= 1.2; c += 0.8) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 2.0, 12), marbleMat);
      col.position.set(wx + c, 1.7, 2.1);
      group.add(col);
    }
    const wingPediment = new THREE.Mesh(new THREE.ConeGeometry(1.6, 0.6, 4), marbleDarkMat);
    wingPediment.rotation.y = Math.PI / 4;
    wingPediment.position.set(wx, 3.1, 2.0);
    group.add(wingPediment);
  });

  for (let c = -1.8; c <= 1.8; c += 0.9) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 2.6, 12), marbleMat);
    col.position.set(c, 2.0, 2.65);
    group.add(col);
  }
  const pediment = new THREE.Mesh(new THREE.ConeGeometry(2.4, 0.9, 4), marbleDarkMat);
  pediment.rotation.y = Math.PI / 4;
  pediment.position.set(0, 3.75, 2.55);
  group.add(pediment);

  const drum = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.0, 1.2, 32), marbleDarkMat);
  drum.position.y = 4.1;
  group.add(drum);

  const mainDome = new THREE.Mesh(new THREE.SphereGeometry(2.1, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65), marbleMat);
  mainDome.position.y = 4.6;
  mainDome.scale.set(1.0, 1.25, 1.0);
  mainDome.castShadow = true;
  group.add(mainDome);

  const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.9, 16), marbleMat);
  lantern.position.y = 7.1;
  group.add(lantern);

  // Rotating Bronze Angel of Victory
  const angelGroup = new THREE.Group();
  const angelBody = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.7, 8), bronzeMat);
  angelBody.position.y = 0.35;
  const wing1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.3, 0.04), bronzeMat);
  wing1.position.set(-0.32, 0.5, 0);
  wing1.rotation.z = 0.4;
  const wing2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.3, 0.04), bronzeMat);
  wing2.position.set(0.32, 0.5, 0);
  wing2.rotation.z = -0.4;
  const trumpet = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.4, 8), bronzeMat);
  trumpet.rotation.z = -Math.PI / 3;
  trumpet.position.set(0.22, 0.7, 0);
  angelGroup.add(angelBody, wing1, wing2, trumpet);

  angelGroup.position.set(0, 7.6, 0);
  group.add(angelGroup);

  const cornerDomes = [
    [-2.2, -2.0],
    [2.2, -2.0],
    [-2.2, 2.0],
    [2.2, 2.0]
  ];
  cornerDomes.forEach(([cx, cz]) => {
    const sDome = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6), marbleMat);
    sDome.position.set(cx, 3.8, cz);
    sDome.scale.set(1.0, 1.2, 1.0);
    const sFinial = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.4, 8), marbleDarkMat);
    sFinial.position.set(cx, 4.55, cz);
    group.add(sDome, sFinial);
  });

  const pool = new THREE.Mesh(new THREE.BoxGeometry(7, 0.1, 2.8), waterMat);
  pool.position.set(0, 0.1, 4.6);
  group.add(pool);
}
