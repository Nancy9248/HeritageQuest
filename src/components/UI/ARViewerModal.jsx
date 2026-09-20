import React, { useEffect, useState } from 'react';
import { X, Sparkles, Glasses, Smartphone, Info, RefreshCw } from 'lucide-react';
import { exportMonumentToGLB, getCachedGLB } from '../../services/gltfExporterService';

export function ARViewerModal({ isOpen, onClose, monument, monumentGroup }) {
  const [glbUrl, setGlbUrl] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);
  const [modelViewerLoaded, setModelViewerLoaded] = useState(
    typeof window !== 'undefined' && Boolean(window.customElements && window.customElements.get('model-viewer'))
  );

  // 1. Ensure <model-viewer> web component script is loaded
  useEffect(() => {
    if (!modelViewerLoaded && typeof document !== 'undefined') {
      const existingScript = document.querySelector('script[src*="model-viewer"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
        script.onload = () => setModelViewerLoaded(true);
        document.head.appendChild(script);
      } else {
        setModelViewerLoaded(true);
      }
    }
  }, [modelViewerLoaded]);

  // 2. Generate/Retrieve GLB Blob when modal opens
  useEffect(() => {
    if (isOpen && monument && monumentGroup) {
      const cached = getCachedGLB(monument.id);
      if (cached) {
        setGlbUrl(cached);
        setIsExporting(false);
      } else {
        setIsExporting(true);
        setExportError(null);
        exportMonumentToGLB(monument.id, monumentGroup)
          .then((url) => {
            setGlbUrl(url);
            setIsExporting(false);
          })
          .catch((err) => {
            console.error('AR GLB Export Failed:', err);
            setExportError('Failed to generate 3D GLB model for AR viewing');
            setIsExporting(false);
          });
      }
    }
  }, [isOpen, monument, monumentGroup]);

  if (!isOpen || !monument) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#060913] border-2 border-[#dfba73]/60 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden max-h-[95vh] h-[85vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#dfba73]/25 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#dfba73] to-[#c25e36] text-[#060913]">
              <Glasses className="w-5 h-5 font-bold animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-bold font-['Cinzel'] text-white">
                  {monument.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#dfba73]/20 border border-[#dfba73]/40 text-[#dfba73] font-bold">
                  WebXR Augmented Reality
                </span>
              </div>
              <p className="text-xs text-stone-300">
                {monument.state} • {monument.era}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close AR mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central <model-viewer> Viewport */}
        <div className="flex-1 relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0b1120] to-[#060913] border border-[#dfba73]/20 my-3 flex items-center justify-center">
          {isExporting ? (
            <div className="flex flex-col items-center gap-3 text-stone-300 py-16 text-xs">
              <Sparkles className="w-8 h-8 text-[#dfba73] animate-spin" />
              <span className="font-bold text-[#dfba73] text-sm">Converting 3D Model for WebXR AR...</span>
              <span className="text-stone-400 text-[11px]">Compiling procedural geometry into binary GLB format...</span>
            </div>
          ) : exportError ? (
            <div className="flex flex-col items-center gap-2 text-amber-400 text-xs p-6 text-center">
              <Info className="w-6 h-6" />
              <span>{exportError}</span>
              <button
                onClick={() => {
                  setIsExporting(true);
                  setExportError(null);
                  exportMonumentToGLB(monument.id, monumentGroup)
                    .then((url) => {
                      setGlbUrl(url);
                      setIsExporting(false);
                    })
                    .catch((err) => {
                      setExportError(err.message);
                      setIsExporting(false);
                    });
                }}
                className="mt-2 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#dfba73]/20 border border-[#dfba73]/40 text-[#dfba73] font-bold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Conversion</span>
              </button>
            </div>
          ) : glbUrl ? (
            <model-viewer
              src={glbUrl}
              alt={`Interactive 3D AR model of ${monument.name}`}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              touch-action="pan-y"
              auto-rotate
              shadow-intensity="1.5"
              exposure="1.0"
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
            >
              {/* Fallback button rendered by <model-viewer> on AR devices */}
              <button
                slot="ar-button"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#c25e36] text-[#060913] font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 hover:scale-105 transition-all cursor-pointer border border-[#dfba73]"
              >
                <Smartphone className="w-4 h-4" />
                <span>View in Your Space (AR)</span>
              </button>
            </model-viewer>
          ) : null}
        </div>

        {/* Footer & AR Instructions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dfba73]/25 pt-3 text-xs">
          <div className="flex items-center gap-2 text-stone-300 text-[11px]">
            <Smartphone className="w-4 h-4 text-[#dfba73] shrink-0" />
            <span>
              <strong>AR Device Mode:</strong> Tap <em>"View in Your Space"</em> to project {monument.name} onto your floor or table using Google Scene Viewer / Apple Quick Look.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold cursor-pointer"
          >
            Close AR Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
