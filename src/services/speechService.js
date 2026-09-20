// HeritageQuest Web Speech API Service
// Provides natural, high-fidelity neural speech synthesis across 20 Indian and global languages
// Eliminates robotic SAPI 5 distortion by prioritizing Natural/Online/Neural browser voice models

class HeritageSpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.isSpeaking = false;
    this.recognition = null;
    this.englishAccent = 'us'; // 'us', 'uk', 'in'
    this.initVoices();
    this.initRecognition();
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      this.voices = this.synth.getVoices();
    };
    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  initRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  // Comprehensive 20-language BCP 47 language code mapping
  getSpeechLangCode(lang = 'en') {
    const map = {
      en: this.englishAccent === 'uk' ? 'en-GB' : this.englishAccent === 'in' ? 'en-IN' : 'en-US',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      bn: 'bn-IN',
      mr: 'mr-IN', // Marathi
      gu: 'gu-IN', // Gujarati
      kn: 'kn-IN', // Kannada
      ml: 'ml-IN', // Malayalam
      pa: 'pa-IN', // Punjabi
      or: 'or-IN', // Odia
      fr: 'fr-FR',
      de: 'de-DE',
      es: 'es-ES',
      ja: 'ja-JP',
      ru: 'ru-RU',
      ar: 'ar-SA',
      zh: 'zh-CN',
      it: 'it-IT',
      ko: 'ko-KR'
    };
    return map[lang] || 'en-US';
  }

  setEnglishAccent(accent = 'us') {
    this.englishAccent = accent;
  }

  // Pre-process text for natural, smooth phonetic delivery without robotic stumbles
  normalizePronunciation(text, lang = 'en') {
    if (!text) return '';
    let processed = text;

    if (lang === 'en') {
      // Expand abbreviations and polish strings for natural English TTS
      processed = processed
        .replace(/\bBCE\b/g, 'Before Common Era')
        .replace(/\bCE\b/g, 'Common Era')
        .replace(/\bUNESCO\b/g, 'Unesco')
        .replace(/\bkm\b/g, 'kilometers')
        .replace(/\b(\d+)\s*m\b/g, '$1 meters')
        .replace(/\bXP\b/g, 'experience points')
        .replace(/["""]/g, '')
        .replace(/—/g, ', ')
        .replace(/•/g, ', ');
    }

    return processed;
  }

  // Sacred Vasudhaiva Kutumbakam Recital
  speakVasudhaiva(onEnd) {
    if (!this.synth) return;
    this.stop();

    if (!this.voices || this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }

    // Sacred phrase with both authentic Sanskrit and universal English translation
    const phrase = "Vasudhaiva Kutumbakam. The World Is One Family.";
    
    // Look for best melodious voice (Hindi or natural English)
    const hindiVoice = this.voices.find(v => v.lang.toLowerCase().startsWith('hi'));
    const naturalVoice = this.findBestEnglishVoice();

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.voice = hindiVoice || naturalVoice;
    utterance.lang = hindiVoice ? 'hi-IN' : 'en-US';
    utterance.rate = 0.88; // Reverent, majestic cadence
    utterance.pitch = 1.02;

    utterance.onstart = () => { this.isSpeaking = true; };
    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };
    utterance.onerror = () => { this.isSpeaking = false; };

    this.synth.speak(utterance);
  }

  // Find the highest-quality natural, human-sounding English voice available in the browser
  findBestEnglishVoice(gender = null) {
    if (!this.voices || this.voices.length === 0) return null;

    const enVoices = this.voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    if (enVoices.length === 0) return null;

    // If gender preference specified, try finding matching gender voice
    if (gender === 'female') {
      const femaleCandidates = ['female', 'zira', 'jenny', 'aria', 'samantha', 'karen', 'victoria', 'hazel', 'susan', 'cather', 'eva', 'sonia', 'priya', 'neerja', 'swara'];
      const fMatch = enVoices.find(v => {
        const n = v.name.toLowerCase();
        return femaleCandidates.some(c => n.includes(c));
      });
      if (fMatch) return fMatch;
    } else if (gender === 'male') {
      const maleCandidates = ['male', 'david', 'guy', 'daniel', 'george', 'mark', 'richard', 'ravi', 'madhav', 'prabhat'];
      const mMatch = enVoices.find(v => {
        const n = v.name.toLowerCase();
        return maleCandidates.some(c => n.includes(c));
      });
      if (mMatch) return mMatch;
    }

    // Tier 1: Modern Neural / Online / Natural Voices (Edge & Chrome Natural)
    const neuralVoice = enVoices.find(v => {
      const name = v.name.toLowerCase();
      return (
        name.includes('natural') ||
        name.includes('online') ||
        name.includes('neural') ||
        name.includes('jenny') ||
        name.includes('aria') ||
        name.includes('guy')
      );
    });
    if (neuralVoice) return neuralVoice;

    // Tier 2: High-Quality Google Studio & Apple Voices
    const googleAppleVoice = enVoices.find(v => {
      const name = v.name.toLowerCase();
      return (
        name.includes('google us english') ||
        name.includes('google uk english female') ||
        name.includes('google uk english male') ||
        name.includes('samantha') ||
        name.includes('karen') ||
        name.includes('victoria') ||
        name.includes('daniel')
      );
    });
    if (googleAppleVoice) return googleAppleVoice;

    // Tier 3: Any non-robotic standard voice (explicitly avoiding old Windows SAPI5 'Desktop' robotic voices)
    const nonDesktopVoice = enVoices.find(v => !v.name.toLowerCase().includes('desktop'));
    if (nonDesktopVoice) return nonDesktopVoice;

    // Fallback: standard locale match
    return enVoices[0];
  }

  speak(text, lang = 'en', options = {}) {
    if (!this.synth || !text) return;
    this.stop();

    if (!this.voices || this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }

    const cleanText = this.normalizePronunciation(text, lang);
    const targetLangCode = this.getSpeechLangCode(lang);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = targetLangCode;
    utterance.rate = options.rate || (lang === 'en' ? 0.94 : 0.90);
    
    // Gender-aware pitch modulation: deeper authoritative resonance for male, melodious clarity for female
    if (options.pitch !== undefined) {
      utterance.pitch = options.pitch;
    } else if (options.gender === 'female') {
      utterance.pitch = 1.15;
    } else if (options.gender === 'male') {
      utterance.pitch = 0.88;
    } else {
      utterance.pitch = 1.0;
    }

    // Intelligent native voice matching with accent affinity & gender precision
    if (this.voices && this.voices.length > 0) {
      const prefix = targetLangCode.split('-')[0].toLowerCase();

      // Find exact locale match (e.g. hi-IN, ta-IN, fr-FR, te-IN, bn-IN, mr-IN)
      const exactCandidates = this.voices.filter(
        v => v.lang.toLowerCase().replace('_', '-') === targetLangCode.toLowerCase()
      );
      const prefixCandidates = this.voices.filter(
        v => v.lang.toLowerCase().startsWith(prefix)
      );

      const pool = exactCandidates.length > 0 ? exactCandidates : prefixCandidates;

      if (pool.length > 0) {
        if (options.gender === 'female') {
          const femaleKeywords = ['female', 'woman', 'kalpana', 'swara', 'shruti', 'ananya', 'neerja', 'heera', 'zira', 'samantha', 'aria', 'jenny', 'hortense', 'laura', 'victoria', 'karen', 'sonia'];
          const fMatch = pool.find(v => {
            const n = v.name.toLowerCase();
            return femaleKeywords.some(k => n.includes(k));
          });
          utterance.voice = fMatch || pool[0];
          utterance.pitch = options.pitch || (fMatch ? 1.08 : 1.20); // Boost pitch if fallback voice used
        } else if (options.gender === 'male') {
          const maleKeywords = ['male', 'man', 'madhav', 'prabhat', 'rishi', 'valluvar', 'david', 'thomas', 'jorge', 'guy', 'mark', 'richard', 'george', 'daniel'];
          const mMatch = pool.find(v => {
            const n = v.name.toLowerCase();
            return maleKeywords.some(k => n.includes(k));
          });
          utterance.voice = mMatch || pool[0];
          utterance.pitch = options.pitch || (mMatch ? 0.95 : 0.82); // Lower pitch if fallback voice used
        } else {
          utterance.voice = pool[0];
        }
      } else {
        // Fallback for languages without native browser voice (e.g. kn, ml, or, pa)
        const isIndic = ['kn', 'ml', 'or', 'pa', 'gu', 'mr', 'te', 'ta', 'hi', 'bn'].includes(prefix);
        if (isIndic) {
          const hindiVoices = this.voices.filter(v => v.lang.toLowerCase().startsWith('hi'));
          if (hindiVoices.length > 0) {
            if (options.gender === 'female') {
              const fH = hindiVoices.find(v => v.name.toLowerCase().includes('swara') || v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('female'));
              utterance.voice = fH || hindiVoices[0];
              utterance.pitch = 1.18;
            } else {
              const mH = hindiVoices.find(v => v.name.toLowerCase().includes('madhav') || v.name.toLowerCase().includes('prabhat') || v.name.toLowerCase().includes('male'));
              utterance.voice = mH || hindiVoices[0];
              utterance.pitch = 0.85;
            }
          }
        }
        if (!utterance.voice) {
          const bestEn = this.findBestEnglishVoice(options.gender);
          if (bestEn) {
            utterance.voice = bestEn;
            utterance.pitch = options.gender === 'female' ? 1.15 : 0.88;
          }
        }
      }
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      if (options.onError) options.onError(e);
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
      this.isSpeaking = false;
    }
  }

  startListening(onResult, onError, lang = 'en') {
    if (!this.recognition) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return;
    }
    try {
      this.recognition.lang = this.getSpeechLangCode(lang);
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onResult) onResult(transcript);
      };
      this.recognition.onerror = (event) => {
        if (onError) onError(event.error);
      };
      this.recognition.start();
    } catch (e) {
      if (onError) onError(e.message);
    }
  }

  stopListening() {
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
  }
}

export const speechService = new HeritageSpeechService();
