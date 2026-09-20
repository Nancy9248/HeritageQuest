import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Key,
  HelpCircle,
  Ticket,
  Clock,
  Shirt,
  Utensils,
  Navigation,
  Sparkles,
  Bot
} from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import { speechService } from '../../services/speechService';
import { heritageAudio } from '../../services/audioSynthesizer';
import { TRANSLATIONS } from '../../data/localization';
import { AcharyaAvatar } from './AcharyaAvatar';
import { ChatbotBubbleSkeleton } from '../Common/SkeletonLoader';
import {
  getLocalizedGuideInitialMessage,
  getLocalizedQuickActionChips
} from '../../data/multilingualGuideResponses';

export const AcharyaGuideDrawer = ({
  isOpen,
  onClose,
  currentMonument,
  userContext,
  currentLang = 'en',
  translations: propTranslations
}) => {
  const t = propTranslations || TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'acharya',
      text: getLocalizedGuideInitialMessage(currentLang, userContext.userName)
    }
  ]);

  // Update initial message when language changes
  useEffect(() => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'acharya',
        text: getLocalizedGuideInitialMessage(currentLang, userContext.userName)
      }
    ]);
  }, [currentLang]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(geminiService.getApiKey());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickActionChips = getLocalizedQuickActionChips(currentLang, currentMonument.name);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    heritageAudio.playSitarPluck(440);
    const userMsg = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const replyText = await geminiService.askHeritageAI({
        message: query,
        userContext,
        currentMonumentId: currentMonument.id,
        hostMode: 'guide',
        lang: currentLang
      });

      const guideMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'acharya',
        text: replyText
      };
      setMessages((prev) => [...prev, guideMsg]);

      // Speak answer matching the current language
      speechService.speak(replyText, currentLang, {
        rate: currentLang === 'en' ? 0.95 : 0.9,
        pitch: 1.0
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleSpeechRecognition = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechService.startListening(
        (transcript) => {
          setInputText(transcript);
          setIsListening(false);
          handleSendMessage(transcript);
        },
        (error) => {
          console.warn('STT Error:', error);
          setIsListening(false);
        },
        currentLang
      );
    }
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    geminiService.setApiKey(apiKeyInput);
    setShowSettings(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'acharya',
        text: apiKeyInput.trim()
          ? 'Shukriya! Live Google Gemini API connected. I can now provide boundless real-time generative insights.'
          : 'Reverted to the built-in offline Historical Knowledge Engine.'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-[#0f172a] border-l border-[#dfba73]/40 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 bg-[#090c15] border-b border-[#dfba73]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Illustrated Acharya Avatar with Volumetric Shading & Saffron Silk */}
              <AcharyaAvatar className="w-12 h-12" />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#090c15]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-[#dfba73] font-['Cinzel']">{t.acharyaTitle || 'Acharya Vidyadhar'}</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#dfba73]/20 text-[#dfba73] font-medium">{t.aiGuide || 'Local Guide'}</span>
              </div>
              <p className="text-[11px] text-stone-400">
                {t.guidingAt || 'Guiding you at'} <span className="text-stone-200 font-medium">{currentMonument.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg text-stone-400 hover:text-[#dfba73] hover:bg-[#1e293b] transition-colors cursor-pointer"
              title="Configure Gemini API Key"
              aria-label="Configure Gemini API Key"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-[#1e293b] transition-colors cursor-pointer"
              title={t.closeGuide || 'Close'}
              aria-label={t.closeGuide || 'Close guide drawer'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live AI API Key Settings Overlay Modal */}
        {showSettings && (
          <div className="p-4 bg-[#0c1322] border-b border-[#dfba73]/40 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#dfba73] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#dfba73]" />
                Live AI API Key Settings (Gemini / Claude)
              </span>
              <button
                onClick={() => setShowSettings(false)}
                className="text-stone-400 hover:text-white text-xs"
                aria-label="Close settings"
              >
                ✕
              </button>
            </div>
            <p className="text-stone-300 mb-2 leading-relaxed">
              HeritageQuest includes a rich offline knowledge base across 20 languages. To unlock unlimited real-time generative answers, paste your Gemini or Claude API key below:
            </p>
            <form onSubmit={handleSaveApiKey} className="flex gap-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy... or sk-ant-..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-[#090c15] border border-[#dfba73]/30 text-white text-xs focus:outline-none focus:border-[#dfba73]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#dfba73] to-[#c5a059] text-[#090c15] font-bold text-xs hover:brightness-110 cursor-pointer"
              >
                Save
              </button>
            </form>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-[#090c15] border-b border-[#dfba73]/15 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-thin">
          {quickActionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.query)}
              className="px-2.5 py-1 rounded-full bg-[#0f172a] hover:bg-[#1e293b] border border-[#dfba73]/25 text-[11px] text-stone-300 hover:text-[#dfba73] transition-colors cursor-pointer flex-shrink-0"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Chat Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-[#c25e36] to-[#a84c26] text-white rounded-br-none shadow-md'
                      : 'bg-[#090c15]/90 border border-[#dfba73]/30 text-stone-200 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                {!isUser && (
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <span className="text-[10px] text-stone-400 font-medium">{t.acharyaTitle || 'Acharya Vidyadhar'}</span>
                    <button
                      onClick={() => speechService.speak(msg.text, currentLang)}
                      className="text-stone-400 hover:text-[#dfba73] text-[10px] flex items-center gap-1 cursor-pointer"
                      title={t.listenNarration || 'Read aloud'}
                    >
                      <Volume2 className="w-3 h-3" />
                      {t.listen || 'Listen'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && <ChatbotBubbleSkeleton />}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 bg-[#090c15] border-t border-[#dfba73]/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-[#0f172a] text-stone-400 hover:text-[#dfba73] border-[#dfba73]/30'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Speak your question'}
              aria-label={isListening ? 'Stop voice input' : 'Speak your question'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.askPlaceholder || 'Ask about tickets, timings, dress code, local food...'}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0f172a] border border-[#dfba73]/30 text-white placeholder-stone-400 text-xs focus:outline-none focus:border-[#dfba73]"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#dfba73] to-[#c5a059] hover:brightness-110 disabled:opacity-40 text-[#090c15] transition-all cursor-pointer font-bold"
              aria-label="Send message to guide"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
