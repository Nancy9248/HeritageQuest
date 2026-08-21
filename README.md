# 🏛️ HeritageQuest — Immersive 3D VR/AR Heritage Tourism Experience

> *"Vasudhaiva Kutumbakam — The World Is One Family. Every culture has a story. Every monument holds a memory. Welcome to HeritageQuest."*

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-gold?style=for-the-badge&logo=github)](https://nancy9248.github.io/HeritageQuest/)
[![Built with Three.js](https://img.shields.io/badge/3D_Engine-Three.js-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Built with React](https://img.shields.io/badge/Frontend-React_18-blue?style=for-the-badge&logo=react)](https://react.dev/)

**HeritageQuest** is a 3D web-based **Heritage Tourism experience** that allows tourists to **experience history instead of simply reading about it**. Guided by a realistic 3D AI historical host avatar, users explore detailed 3D monuments, travel through time across centuries, inspect 360° historical artifacts, ask contextual historical questions, discover hidden stories, and test their knowledge with interactive quizzes.

---

## 🌐 Live Web Application

Experience HeritageQuest directly in your browser without requiring any VR headset:
👉 **[https://nancy9248.github.io/HeritageQuest/](https://nancy9248.github.io/HeritageQuest/)**

---

## ✨ Key Features

### 1. 🌏 Opening Experience — "Vasudhaiva Kutumbakam"
- 3D particle Earth globe with global connection nodes and an ancient Indian mandala aura.
- Cinematic transition from space into India and the user's nearest heritage site.

### 2. 🌐 Multilingual AI Narration
- **7 Languages Supported**: English (`en`), Hindi (`hi`), Marathi (`mr`), Sanskrit (`sa`), Spanish (`es`), French (`fr`), Japanese (`ja`).
- **Dynamic Speech Engine**: Web Speech API voice synthesis + fallback procedural Web Audio vocal synthesizer, accompanied by live synchronized subtitles.

### 3. 📍 GPS & Real-Time Heritage Site Detection
- **Haversine Distance Matrix**: Uses browser geolocation (`navigator.geolocation`) to calculate live distance to 6 Indian heritage monuments:
  1. 🏛️ **Shaniwar Wada** (Pune, Maharashtra) — 1732 Peshwa Fortification & Dilli Darwaza.
  2. ⛰️ **Ellora Caves (Kailasa Temple)** (Verul, Maharashtra) — Monolithic 8th-century Dravidian rock excavation.
  3. 🕌 **Taj Mahal** (Agra, Uttar Pradesh) — 1632 White Marble Mausoleum & Pietra Dura gem inlays.
  4. 🎨 **Ajanta Caves** (Chhatrapati Sambhajinagar, Maharashtra) — Ancient rock-cut Chaitya halls & murals.
  5. 🏰 **Red Fort** (Old Delhi) — Sandstone ramparts & Lahori Gate.
  6. 🌊 **Gateway of India** (Mumbai, Maharashtra) — Basalt triumphal arch on the Arabian Sea.

### 4. 🏛️ Interactive 3D WebGL Heritage Environments
- High-fidelity 3D PBR procedural architecture models with custom stone/brick roughness, domed chhatris, lotus motifs, and reflecting pools.
- **Lighting Controls**: Toggle between *Daylight*, *Golden Hour*, and *Night Stars/Moonlight*.
- 360° Orbit, pan, zoom, and camera fly-to transitions.

### 5. 👳🏽‍♂️ 3D AI Historical Host Avatar
- Animated 3D guide avatar with gesture animations, head tilts, lip-sync speaking states, and audio narration controls.
- Top-left **`← Back`** button for returning to site selection at any time.

### 6. ⏳ Travel Through Time
- Time warp particle vortex allowing tourists to shift eras between:
  - *Present Day*
  - *Pristine Golden Era* (e.g., 1740 Peshwa timber palace, 760 CE Rashtrakuta carving)
  - *Key Historical Events* (e.g., 1828 Great Fire, 1948 British Troop Exit)

### 7. 🔍 3D Hotspots & 360° Artifact Inspector
- Interactive 3D diamond beacons positioned over architectural features.
- Inspect 360° rotating 3D historical relics (Maratha Khanda Sword, Terracotta Aqueduct Tiles, Royal Copper Seals, Marble Tiles, Gold Coins).

### 8. 💬 "Ask the Guide" AI Assistant
- Contextual Q&A assistant modal pre-loaded with site folklore, construction facts, and architectural secrets.

### 9. 🗺️ Interactive Minimap & "Navigate Me"
- 2D/3D Minimap overlay showing tourist position, monument core, and POI markers.
- **Navigate Me**: Highlights directional 3D path toward chosen points of interest.

### 10. 🏆 Gamification & Heritage Challenge Quizzes
- **Heritage Points**: Earn points for site exploration, hotspot clicks, time warps, and quizzes.
- **Collectible Badges**: *History Explorer*, *Architecture Expert*, *Secret Finder*, *Heritage Navigator*, *Time Traveler*.
- Interactive chapter quizzes with celebratory confetti bursts (`canvas-confetti`).

### 11. 🥽 WebXR & VR/AR Readiness
- Simulated stereoscopic SBS mode for mobile cardboards and WebXR hardware compatibility.

---

## 🛠️ Tech Stack & Libraries

- **Frontend Core**: React 18, Vite 5
- **3D Graphics Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling & UI**: Tailwind CSS, Lucide Icons, Glassmorphism
- **Audio & Voice**: Web Audio API, Web Speech API (`SpeechSynthesis`)
- **Effects**: `canvas-confetti`
- **Deployment**: GitHub Pages (`gh-pages`)

---

## 💻 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nancy9248/HeritageQuest.git
   cd HeritageQuest
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000/` in your browser.

---

## 🚀 How to Deploy to GitHub Pages

To build and deploy your changes live to GitHub Pages:
```bash
npm run deploy
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
