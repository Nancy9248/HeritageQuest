// HeritageQuest Web Audio API Meditative Soundscape Synthesizer
// Provides authentic regional ambient instruments per monument, soft Saraswati Veena, and resonant temple bells

// Configurable Ambient Track Settings (Issue 3)
// Swapping the ambient audio track or changing loop length is a single-line configuration change:
export const AMBIENT_AUDIO_CONFIG = {
  trackUrl: '/assets/audio/heritage_ambient.mp3', // Path to replacement licensed audio track
  loopDuration: 90, // Loop duration in seconds (60-90s+)
  instrumentName: 'Imperial Classical Raga Ensemble (Sitar, Sarangi, Veena & Bansuri)'
};

class HeritageAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.hasPlayedIntro = false;
    this.currentMonumentId = 'taj-mahal';
    this.loopTimeout = null;
    this.activeNodes = [];
    this.audioElement = null;
    this.initAudioElement();
  }

  initAudioElement() {
    if (typeof window !== 'undefined' && AMBIENT_AUDIO_CONFIG.trackUrl) {
      this.audioElement = new Audio();
      this.audioElement.src = AMBIENT_AUDIO_CONFIG.trackUrl;
      this.audioElement.loop = true;
      this.audioElement.volume = 0.25;
      this.audioElement.onerror = () => {
        // Procedural synthesis handles audio if mp3 is not present
      };
    }
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopMonumentAmbient();
    } else {
      this.playMonumentAmbient(this.currentMonumentId);
    }
    return this.isMuted;
  }

  // ---------------------------------------------------------------------------
  // Core Ambient Instrument Player
  // ---------------------------------------------------------------------------
  playMonumentAmbient(monumentId = 'taj-mahal') {
    this.currentMonumentId = monumentId;
    if (this.isMuted) return;
    this.init();
    this.stopMonumentAmbient();

    const playSequence = () => {
      if (this.isMuted) return;

      switch (this.currentMonumentId) {
        case 'taj-mahal':
          this.playSitarSarangiPhrase();
          break;
        case 'mysore-palace':
          this.playVeenaCarnaticPhrase();
          break;
        case 'konark-sun-temple':
          this.playOdissiBansuriMardalaPhrase();
          break;
        case 'gateway-of-india':
          this.playJalTarangHarmoniumPhrase();
          break;
        case 'brihadisvara-temple':
          this.playNadaswaramMridangamPhrase();
          break;
        case 'sanchi-stupa':
          this.playSingingBowlFlutePhrase();
          break;
        case 'hawa-mahal':
          this.playRavanahathaAlgozaPhrase();
          break;
        case 'victoria-memorial':
          this.playEsrajSarodPhrase();
          break;
        default:
          this.playSoftVeenaIntro();
      }

      // Schedule next gentle phrase in a low-volume loop (every 10-14 seconds)
      this.loopTimeout = setTimeout(playSequence, 11000);
    };

    playSequence();
  }

  stopMonumentAmbient() {
    if (this.loopTimeout) {
      clearTimeout(this.loopTimeout);
      this.loopTimeout = null;
    }
  }

  // ---------------------------------------------------------------------------
  // 1. Taj Mahal (Agra): Sitar & Sarangi (Hindustani Classical in Raag Yaman)
  // ---------------------------------------------------------------------------
  playSitarSarangiPhrase() {
    const notes = [293.66, 329.63, 369.99, 440.0, 493.88]; // D4, E4, F#4, A4, B4
    const times = [0.1, 0.9, 1.8, 2.7, 3.8];

    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.playPluckedString(freq, 'sitar', 2.2);
      }, times[idx] * 1000);
    });

    // Gentle Sarangi sympathetic drone in background
    setTimeout(() => {
      if (!this.isMuted) this.playBowedString(220.0, 4.5, 0.02); // A3 drone
    }, 400);
  }

  // ---------------------------------------------------------------------------
  // 2. Mysore Palace: Saraswati Veena (Carnatic Court in Raag Kalyani)
  // ---------------------------------------------------------------------------
  playVeenaCarnaticPhrase() {
    const notes = [261.63, 329.63, 392.0, 440.0, 523.25]; // Sa, Ga, Pa, Dha, Sa
    const times = [0.1, 0.8, 1.6, 2.4, 3.4];

    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.pluckVeenaString(freq, 2.4);
      }, times[idx] * 1000);
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Konark Sun Temple: Mardala & Odissi Bansuri (Bamboo Flute)
  // ---------------------------------------------------------------------------
  playOdissiBansuriMardalaPhrase() {
    const fluteNotes = [392.0, 440.0, 523.25, 587.33]; // G4, A4, C5, D5
    const times = [0.1, 1.0, 2.0, 3.2];

    fluteNotes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.playBambooFlute(freq, 1.8);
      }, times[idx] * 1000);
    });

    // Deep Mardala soft resonance tap
    setTimeout(() => {
      if (!this.isMuted) this.playPercussionTone(110.0, 1.2, 0.035);
    }, 200);
    setTimeout(() => {
      if (!this.isMuted) this.playPercussionTone(165.0, 0.9, 0.025);
    }, 2200);
  }

  // ---------------------------------------------------------------------------
  // 4. Gateway of India: Jal Tarang & Harmonium (Acoustic Water Chimes & Reed)
  // ---------------------------------------------------------------------------
  playJalTarangHarmoniumPhrase() {
    const chimeNotes = [523.25, 587.33, 659.25, 783.99, 880.0]; // C5, D5, E5, G5, A5
    const times = [0.1, 0.7, 1.4, 2.2, 3.0];

    chimeNotes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.playJalTarangBowl(freq, 2.0);
      }, times[idx] * 1000);
    });

    // Soft harmonium reed drone
    setTimeout(() => {
      if (!this.isMuted) this.playHarmoniumDrone(261.63, 4.0);
    }, 500);
  }

  // ---------------------------------------------------------------------------
  // 5. Brihadisvara Temple: Nadaswaram & Mridangam (Chola Mangala Isai)
  // ---------------------------------------------------------------------------
  playNadaswaramMridangamPhrase() {
    const nadaNotes = [349.23, 392.0, 440.0, 523.25]; // F4, G4, A4, C5
    const times = [0.1, 1.1, 2.2, 3.4];

    nadaNotes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.playDoubleReed(freq, 2.0);
      }, times[idx] * 1000);
    });

    // Mridangam low resonant thoppi
    setTimeout(() => {
      if (!this.isMuted) this.playPercussionTone(82.4, 1.5, 0.04);
    }, 150);
  }

  // ---------------------------------------------------------------------------
  // 6. Sanchi Stupa: Tibetan/Buddhist Singing Bowl & Meditative Bansuri
  // ---------------------------------------------------------------------------
  playSingingBowlFlutePhrase() {
    // Reverberant brass singing bowl strike with harmonics
    this.playSingingBowl(216.0, 5.5);

    // Meditative breath-like bamboo flute
    setTimeout(() => {
      if (!this.isMuted) this.playBambooFlute(432.0, 3.0);
    }, 1500);
    setTimeout(() => {
      if (!this.isMuted) this.playBambooFlute(384.0, 3.5);
    }, 3800);
  }

  // ---------------------------------------------------------------------------
  // 7. Hawa Mahal: Ravanahatha & Algoza (Rajasthani Rajput Court)
  // ---------------------------------------------------------------------------
  playRavanahathaAlgozaPhrase() {
    const notes = [293.66, 329.63, 392.0, 440.0, 587.33];
    const times = [0.1, 0.8, 1.7, 2.6, 3.6];

    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.playBowedString(freq, 1.6, 0.03);
      }, times[idx] * 1000);
    });

    // Twin algoza wind chime
    setTimeout(() => {
      if (!this.isMuted) this.playBambooFlute(587.33, 2.5);
    }, 1200);
  }

  // ---------------------------------------------------------------------------
  // 8. Victoria Memorial: Esraj & Sarod (Bengal Renaissance Classical)
  // ---------------------------------------------------------------------------
  playEsrajSarodPhrase() {
    // Sarod metallic plucked notes
    const sarodNotes = [220.0, 261.63, 329.63, 392.0];
    const times = [0.1, 1.0, 2.0, 3.0];

    sarodNotes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.playPluckedString(freq, 'sarod', 1.8);
      }, times[idx] * 1000);
    });

    // Melodious bowed Esraj sustain
    setTimeout(() => {
      if (!this.isMuted) this.playBowedString(329.63, 4.0, 0.025);
    }, 800);
  }

  // ---------------------------------------------------------------------------
  // Synthesis Engine Primitives (Web Audio API)
  // ---------------------------------------------------------------------------

  playPluckedString(freq, style = 'sitar', duration = 2.0) {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = style === 'sitar' ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq * 0.98, now);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.08);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 2.2, now);
      filter.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {}
  }

  playBowedString(freq, duration = 3.0, targetGain = 0.025) {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 3.0, now);
      filter.Q.setValueAtTime(2.0, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(targetGain, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {}
  }

  playBambooFlute(freq, duration = 2.5) {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const breath = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      breath.type = 'triangle';
      breath.frequency.setValueAtTime(freq * 2.0, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 1.8, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      breath.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      breath.start(now);
      osc.stop(now + duration + 0.1);
      breath.stop(now + duration + 0.1);
    } catch (e) {}
  }

  playJalTarangBowl(freq, duration = 2.0) {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {}
  }

  playHarmoniumDrone(freq, duration = 4.0) {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(freq * 1.002, now); // slight chorus detune

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.018, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration + 0.1);
      osc2.stop(now + duration + 0.1);
    } catch (e) {}
  }

  playDoubleReed(freq, duration = 2.0) {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.6, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {}
  }

  playSingingBowl(freq, duration = 5.0) {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const partials = [freq, freq * 2.76, freq * 5.4];
      const gains = [0.035, 0.015, 0.008];

      partials.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(gains[idx], now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.2);
      });
    } catch (e) {}
  }

  playPercussionTone(freq, duration = 1.0, peakGain = 0.03) {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq * 1.5, now);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.06);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(peakGain, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {}
  }

  // Single plucked acoustic Veena string with wooden body formant filter
  pluckVeenaString(freq, duration = 1.6) {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const bodyFilter = this.ctx.createBiquadFilter();
      const gainNode = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq * 0.96, now);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.09);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 0.5, now);

      bodyFilter.type = 'bandpass';
      bodyFilter.frequency.setValueAtTime(freq * 1.5, now);
      bodyFilter.Q.setValueAtTime(3.2, now);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.035, now + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(bodyFilter);
      subOsc.connect(bodyFilter);
      bodyFilter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + duration + 0.1);
      subOsc.stop(now + duration + 0.1);
    } catch (e) {}
  }

  // Resonant Indian Temple Bell (Soft Gham chime)
  playTempleBell() {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const partials = [440, 880, 1320];
      const decays = [2.2, 1.4, 0.9];

      partials.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.04 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + decays[i]);
      });
    } catch (e) {}
  }

  playSoftVeenaIntro() {
    this.playVeenaCarnaticPhrase();
  }

  playGeofenceTrigger() {
    this.pluckVeenaString(523.25, 1.2);
  }

  playSitarPluck(freq = 440) {
    this.pluckVeenaString(freq, 1.2);
  }

  startAmbientDrone() {
    this.playMonumentAmbient(this.currentMonumentId);
  }

  stopAmbientDrone() {
    this.stopMonumentAmbient();
  }
}

export const heritageAudio = new HeritageAudioSynthesizer();
