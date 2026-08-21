class SpeechManager {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.isSpeaking = false;
    this.audioContext = null;
    this.isUnlocked = false;

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  // User gesture unlock for browser audio policy
  unlockAudio() {
    if (!this.isUnlocked && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }
      }
      if (this.synth && this.synth.resume) {
        this.synth.resume();
      }
      this.isUnlocked = true;
    }
  }

  speak(text, langCode = 'en-US', onStart = () => {}, onEnd = () => {}) {
    this.unlockAudio();

    if (!text || !text.trim()) return;

    if (!this.synth) {
      this.proceduralVoiceFallback(text, onStart, onEnd);
      return;
    }

    this.stop();

    // Split long text into smaller natural sentences if needed
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;

    // Language lookup
    const targetLang = langCode.toLowerCase().split('-')[0];
    this.loadVoices();
    
    const matchingVoice = this.voices.find((v) =>
      v.lang.toLowerCase().startsWith(targetLang)
    );

    if (matchingVoice) {
      utterance.voice = matchingVoice;
      utterance.lang = matchingVoice.lang;
    } else {
      utterance.lang = langCode;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Web Speech Synthesis notice:', e);
      this.isSpeaking = false;
      // Fallback to procedural synth if WebSpeech fails
      this.proceduralVoiceFallback(text, onStart, onEnd);
    };

    this.synth.speak(utterance);
  }

  // Procedural Web Audio voice simulator fallback if browser speech synth is unavailable or restricted
  proceduralVoiceFallback(text, onStart, onEnd) {
    onStart();
    this.isSpeaking = true;

    if (this.audioContext) {
      const duration = Math.min(Math.max(text.length * 0.06, 2), 8);
      const now = this.audioContext.currentTime;

      // Create gentle formants sound
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(320, now + duration * 0.3);
      osc.frequency.linearRampToValueAtTime(240, now + duration);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start(now);
      osc.stop(now + duration);

      setTimeout(() => {
        this.isSpeaking = false;
        onEnd();
      }, duration * 1000);
    } else {
      setTimeout(() => {
        this.isSpeaking = false;
        onEnd();
      }, 3000);
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
  }
}

export const speechManager = new SpeechManager();
