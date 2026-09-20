// HeritageQuest AI Service
// Dual-Engine: Live AI API (Google Gemini / Anthropic Claude) + Offline Multilingual Heritage Intelligence Engine
// Ensures all questions & answers (Chatbot Acharya and Sovereign Hosts) are delivered in the visitor's preferred language

import { MONUMENTS } from '../data/monumentsData';
import { getGreetingForMonument } from '../data/multilingualGreetings';
import { getLocalizedHostDialogues } from '../data/multilingualHostDialogues';
import { getLocalizedGuideAnswer } from '../data/multilingualGuideResponses';

const LANG_NAMES = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil',
  te: 'Telugu',
  bn: 'Bengali',
  mr: 'Marathi',
  gu: 'Gujarati',
  kn: 'Kannada',
  ml: 'Malayalam',
  pa: 'Punjabi',
  or: 'Odia',
  fr: 'French',
  de: 'German',
  es: 'Spanish',
  ja: 'Japanese',
  it: 'Italian',
  ru: 'Russian',
  ar: 'Arabic',
  zh: 'Mandarin Chinese',
  ko: 'Korean'
};

class GeminiHeritageService {
  constructor() {
    this.apiKey = localStorage.getItem('hq_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  setApiKey(key) {
    this.apiKey = key.trim();
    if (this.apiKey) {
      localStorage.setItem('hq_gemini_api_key', this.apiKey);
    } else {
      localStorage.removeItem('hq_gemini_api_key');
    }
  }

  getApiKey() {
    return this.apiKey;
  }

  // Generate reply either from live AI API (Gemini/Claude) or robust historical knowledge engine in user's preferred language
  async askHeritageAI({ message, userContext, currentMonumentId, hostMode = 'guide', lang = 'en' }) {
    const currentMonument = MONUMENTS.find((m) => m.id === currentMonumentId) || MONUMENTS[0];
    const targetLang = lang || userContext?.lang || 'en';
    const langName = LANG_NAMES[targetLang] || 'English';

    // If AI API Key is provided, call live API (Anthropic Claude or Google Gemini) with strict language instruction
    if (this.apiKey) {
      try {
        const langDirective =
          targetLang !== 'en'
            ? `CRITICAL MULTILINGUAL MANDATE: The user's chosen language is ${langName} (${targetLang}). You MUST answer fully and fluently in ${langName}. Do NOT respond in English.`
            : 'Respond in natural, expressive English.';

        const duo = currentMonument.historicalDuo;
        const hostTitleStr = duo
          ? `${duo.maleHost.name} (${duo.maleHost.title}) and ${duo.femaleHost.name} (${duo.femaleHost.title})`
          : `${currentMonument.historicalHost.name}, ${currentMonument.historicalHost.title}`;

        const systemPrompt =
          hostMode === 'historical'
            ? `You are the historical co-host duo ${hostTitleStr}. You are speaking directly to a time-traveling visitor named ${userContext.userName || 'Traveler'} from ${userContext.country || 'a distant land'}. Speak in first-person royal, dignified, or scholarly cadence from the era of ${currentMonument.era}. Immerse them in your world with historical accuracy, emotion, and architectural insights. ${langDirective}`
            : `You are Acharya Vidyadhar, a wise, warm, and highly practical modern Indian cultural escort and ASI archaeological scholar. You are guiding ${userContext.userName || 'Traveler'} from ${userContext.country || 'abroad'} at ${currentMonument.name}. You help with practical logistics (tickets, timings, dress codes, street food, transport, secrets) and bridge ancient knowledge with modern travel ease. ${langDirective}`;

        const userPrompt = `Visitor Question: "${message}"
Answer concisely (within 2-4 sentences), rich in cultural depth and warmth.`;

        let response;
        if (this.apiKey.startsWith('sk-ant-')) {
          // Anthropic Claude API Call
          response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': this.apiKey,
              'anthropic-version': '2023-06-01',
              'dangerously-allow-browser': 'true'
            },
            body: JSON.stringify({
              model: 'claude-3-5-sonnet-20241022',
              max_tokens: 300,
              system: systemPrompt,
              messages: [{ role: 'user', content: userPrompt }]
            })
          });
          if (response.ok) {
            const data = await response.json();
            const reply = data.content?.[0]?.text;
            if (reply) return reply;
          }
        } else {
          // Google Gemini API Call
          response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: `${systemPrompt}

${userPrompt}` }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
              })
            }
          );
          if (response.ok) {
            const data = await response.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) return reply;
          }
        }
      } catch (err) {
        console.warn('Live AI API call failed, falling back to local historical engine:', err);
      }
    }

    // Offline Expert Knowledge Engine (Fully localized across 20 languages)
    return this.getOfflineHistoricalResponse(message, currentMonument, userContext, hostMode, targetLang);
  }

  getOfflineHistoricalResponse(query, monument, user, hostMode, targetLang = 'en') {
    const q = (query || '').toLowerCase();
    const userName = user?.userName || 'Traveler';

    // 1. If speaking with the Time-Travel Historical Sovereign
    if (hostMode === 'historical') {
      const host = monument.historicalHost;
      const dialogues = getLocalizedHostDialogues(monument.id, targetLang);

      // Question 1: Secrets / Acoustics / Dome / Wheels / Time
      if (
        q.includes('secret') ||
        q.includes('acoustic') ||
        q.includes('sound') ||
        q.includes('dome') ||
        q.includes('wheel') ||
        q.includes('turn') ||
        q.includes('sundial') ||
        q.includes('light') ||
        q.includes('fountain') ||
        q.includes('spike') ||
        q.includes('top')
      ) {
        return dialogues[0]?.response || host.dialogueOptions[0]?.response;
      }

      // Question 2: Construction / Architecture / Minarets / Stones / Earthquake / Artists / Frescoes
      if (
        q.includes('built') ||
        q.includes('how') ||
        q.includes('stone') ||
        q.includes('carv') ||
        q.includes('artist') ||
        q.includes('earthquake') ||
        q.includes('minaret') ||
        q.includes('musical') ||
        q.includes('pillar') ||
        q.includes('magnet') ||
        q.includes('fresco') ||
        q.includes('monk') ||
        q.includes('ravana')
      ) {
        return dialogues[1]?.response || host.dialogueOptions[1]?.response;
      }

      // Question 3: Gemstones / Glory / Bazaars / History / War / Sovereignty / British / Empire
      if (
        q.includes('gem') ||
        q.includes('jewel') ||
        q.includes('history') ||
        q.includes('war') ||
        q.includes('glory') ||
        q.includes('time') ||
        q.includes('why') ||
        q.includes('throne') ||
        q.includes('bazaar') ||
        q.includes('maratha') ||
        q.includes('british') ||
        q.includes('destroy')
      ) {
        return dialogues[2]?.response || host.dialogueOptions[2]?.response;
      }

      // Self-Introduction
      if (q.includes('who are you') || q.includes('introduce') || q.includes('name') || q.includes('आप कौन') || q.includes('யார்')) {
        const greeting = getGreetingForMonument(monument.id, targetLang);
        return greeting || `I am ${host.name}, ${host.title}. Through the river of time, you stand in my era.`;
      }

      // Default Historical Host Greeting in preferred language
      const fallbackGreeting = getGreetingForMonument(monument.id, targetLang);
      if (fallbackGreeting) return fallbackGreeting;

      return `Welcome, ${userName}! In this era of ${monument.era}, we fashioned ${monument.name} not merely as stone, but as a living testament to human vision and divine devotion. What aspects of our imperial craft wish thee to uncover?`;
    }

    // 2. If speaking with Acharya Vidyadhar (The Modern Local Guide)
    // Identify topic category
    if (q.includes('ticket') || q.includes('price') || q.includes('cost') || q.includes('entry') || q.includes('fee') || q.includes('टिकट') || q.includes('டிக்கெட்')) {
      return getLocalizedGuideAnswer('ticket', monument, user, targetLang);
    }

    if (q.includes('time') || q.includes('hour') || q.includes('when') || q.includes('open') || q.includes('close') || q.includes('समय') || q.includes('நேரம்')) {
      return getLocalizedGuideAnswer('timings', monument, user, targetLang);
    }

    if (q.includes('dress') || q.includes('wear') || q.includes('cloth') || q.includes('etiquette') || q.includes('rule') || q.includes('shoes') || q.includes('camera') || q.includes('कपड़े') || q.includes('आடை')) {
      return getLocalizedGuideAnswer('dress', monument, user, targetLang);
    }

    if (q.includes('food') || q.includes('eat') || q.includes('dish') || q.includes('restaurant') || q.includes('sweet') || q.includes('भोजन') || q.includes('உணவு') || q.includes('खाना')) {
      return getLocalizedGuideAnswer('food', monument, user, targetLang);
    }

    if (q.includes('reach') || q.includes('transit') || q.includes('metro') || q.includes('station') || q.includes('airport') || q.includes('cab') || q.includes('bus') || q.includes('पहुँच') || q.includes('போக்குவரத்து')) {
      return getLocalizedGuideAnswer('transit', monument, user, targetLang);
    }

    if (q.includes('vasudhaiva') || q.includes('kutumbakam') || q.includes('family') || q.includes('theme') || q.includes('वसुधैव')) {
      return getLocalizedGuideAnswer('vasudhaiva', monument, user, targetLang);
    }

    return getLocalizedGuideAnswer('general', monument, user, targetLang);
  }
}

export const geminiService = new GeminiHeritageService();
