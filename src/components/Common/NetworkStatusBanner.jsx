import React, { useState, useEffect } from 'react';
import { WifiOff, SignalLow, Wifi, Zap, X, Download } from 'lucide-react';

export function NetworkStatusBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [effectiveType, setEffectiveType] = useState('4g');
  const [isDataSaver, setIsDataSaver] = useState(
    localStorage.getItem('hq_data_saver') === 'true'
  );
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Network Information API listener
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      const updateConnection = () => {
        setEffectiveType(conn.effectiveType || '4g');
        if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || conn.saveData) {
          setIsDataSaver(true);
          localStorage.setItem('hq_data_saver', 'true');
        }
      };
      updateConnection();
      conn.addEventListener('change', updateConnection);
    }

    // PWA Install Prompt Listener
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const toggleDataSaver = () => {
    const nextState = !isDataSaver;
    setIsDataSaver(nextState);
    localStorage.setItem('hq_data_saver', String(nextState));
  };

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User installed HeritageQuest PWA');
    }
    setDeferredPrompt(null);
  };

  // If online, high-speed connection, no PWA install available, and not data-saver, render subtle state
  const isSlowNetwork = effectiveType === '2g' || effectiveType === 'slow-2g' || effectiveType === '3g';

  if (isDismissed && isOnline && !isSlowNetwork && !deferredPrompt) {
    return null;
  }

  return (
    <div className="w-full bg-[#0d1322]/95 border-b border-[#dfba73]/30 px-3 py-1.5 backdrop-blur-md z-50 text-xs flex flex-wrap items-center justify-between gap-2 transition-all">
      <div className="flex items-center gap-2">
        {!isOnline ? (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold animate-pulse">
            <WifiOff className="w-3.5 h-3.5 text-amber-400" />
            Offline Mode Active
          </span>
        ) : isSlowNetwork ? (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 font-semibold">
            <SignalLow className="w-3.5 h-3.5 text-sky-400" />
            Low-Bandwidth ({effectiveType.toUpperCase()})
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            High-Speed Connected
          </span>
        )}

        <span className="text-stone-300 hidden sm:inline">
          {!isOnline
            ? 'All 3D tours, 20 languages & Acharya Guide work 100% without internet.'
            : isSlowNetwork
            ? 'Data-Saver optimized for low-network coverage.'
            : 'Pre-cached PWA: Works everywhere, even in remote heritage sites.'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Toggle Data Saver */}
        <button
          onClick={toggleDataSaver}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all border cursor-pointer ${
            isDataSaver
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
              : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:border-[#dfba73]/50'
          }`}
          title="Toggle low-bandwidth data saver mode"
        >
          <Zap className={`w-3 h-3 ${isDataSaver ? 'text-emerald-400 fill-emerald-400' : 'text-stone-400'}`} />
          <span>{isDataSaver ? 'Data-Saver ON' : 'Data-Saver OFF'}</span>
        </button>

        {/* PWA Install Button */}
        {deferredPrompt && (
          <button
            onClick={handleInstallPWA}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#dfba73] to-[#c25e36] text-[#090c15] font-bold text-[11px] shadow hover:brightness-110 transition-all cursor-pointer"
            title="Install HeritageQuest app on your phone or desktop"
          >
            <Download className="w-3 h-3" />
            <span>Install App</span>
          </button>
        )}

        <button
          onClick={() => setIsDismissed(true)}
          className="text-stone-400 hover:text-stone-200 p-0.5 cursor-pointer ml-1"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
