import React, { useState } from 'react';
import { soundEngine } from '../../utils/audio';

export default function AIGuideModal({ site, onClose, onSpeak, t }) {
  const [messages, setMessages] = useState([
    {
      sender: 'guide',
      text: `Namaste! Ask me anything about ${site.name}, its construction, architectural secrets, or legends.`
    }
  ]);
  const [input, setInput] = useState('');

  const suggestedQuestions = [
    `Why was ${site.name} built here?`,
    `What architectural style is ${site.name}?`,
    `Tell me a hidden story or legend about ${site.name}.`
  ];

  const handleSend = (questionText) => {
    const textToSend = questionText || input;
    if (!textToSend.trim()) return;

    soundEngine.playClick();

    const userMsg = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Generate contextual response
    setTimeout(() => {
      let reply = '';
      const q = textToSend.toLowerCase();

      if (q.includes('why') || q.includes('built') || q.includes('reason')) {
        reply = `${site.name} was commissioned in ${site.eraBuilt} as a grand statement of power, cultural heritage, and architectural excellence. ${site.shortDescription}`;
      } else if (q.includes('style') || q.includes('architecture') || q.includes('material')) {
        reply = `${site.name} exhibits classic ${site.architectureStyle}. ${site.longDescription.slice(0, 180)}...`;
      } else if (q.includes('legend') || q.includes('story') || q.includes('hidden')) {
        reply = `A famous legend surrounding ${site.name} claims that ${site.chapters[site.chapters.length - 1]?.summary || 'hidden passages connected the site to nearby rivers'}.`;
      } else {
        reply = `Fascinating question! ${site.name} (${site.location}) stands as an enduring masterpiece of ${site.architectureStyle}. Every stone holds generations of historical memory!`;
      }

      setMessages((prev) => [...prev, { sender: 'guide', text: reply }]);
      onSpeak(reply);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-xl w-full h-[520px] glass-panel rounded-3xl p-6 border border-heritage-gold/50 shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-heritage-gold/20 flex items-center justify-center text-xl">
              👳🏽‍♂️
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-heritage-lightgold">
                {t.askGuide} — {site.name}
              </h2>
              <div className="text-[10px] text-gray-400">
                AI Historical Knowledge Assistant
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl p-3.5 text-xs md:text-sm font-serif ${
                  msg.sender === 'user'
                    ? 'bg-heritage-gold text-heritage-navy font-bold rounded-br-none'
                    : 'glass-card text-heritage-sand border border-heritage-gold/30 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Quick Questions */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3 py-1 rounded-full glass-card text-[11px] text-heritage-lightgold border border-white/10 whitespace-nowrap hover:border-heritage-gold transition-colors shrink-0"
            >
              💡 {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your historical guide a question..."
            className="flex-1 bg-black/50 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-heritage-gold"
          />
          <button
            onClick={() => handleSend()}
            className="px-5 py-2.5 rounded-xl bg-heritage-gold text-heritage-navy font-serif font-bold text-xs hover:scale-105 transition-all"
          >
            Send ➔
          </button>
        </div>
      </div>
    </div>
  );
}
