import React, { useState } from 'react';
import { AlertTriangle, Zap, RefreshCw, Lock, AlertCircle, FileCode } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide1Props {
  soundEnabled: boolean;
}

export const Slide1StateManagement: React.FC<Slide1Props> = ({ soundEnabled }) => {
  const [driftCount, setDriftCount] = useState<number>(0);
  const [twoWayText, setTwoWayText] = useState<string>('Steve Sanderson');

  const triggerDrift = () => {
    const nextCount = driftCount + 1;
    setDriftCount(nextCount);
    if (nextCount % 2 === 1) {
      playSound('alert', soundEnabled);
    } else {
      playSound('success', soundEnabled);
    }
  };

  const isDesynced = driftCount % 2 === 1;
  const jsValue = 100 + Math.floor((driftCount + 1) / 2) * 25;
  const domValue = isDesynced ? 100 : jsValue;

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-4 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-3 shrink-0">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          State Management Architecture
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-mono mt-1">
          The paradigm shift from manual DOM manipulation to automatic synchronisation
        </p>
      </div>

      {/* 50 / 50 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0 items-stretch">
        {/* Left: jQuery / Vanilla JS */}
        <div className="rounded-2xl border border-rose-500/30 bg-slate-950/70 p-4 flex flex-col justify-between shadow-[0_0_25px_rgba(244,63,94,0.06)] relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-rose-900/30 pb-2 shrink-0">
            <div>
              <h3 className="text-base font-bold text-rose-300 font-mono flex items-center gap-2">
                <FileCode className="w-4 h-4 text-rose-400" />
                jQuery / Vanilla JS
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-rose-400/80">
                Manual &amp; Unpredictable
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
              Circa 2008
            </span>
          </div>

          {/* Diagram Visual */}
          <div className="relative flex-1 min-h-[170px] flex items-center justify-center my-2">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
              <line x1="80" y1="40" x2="320" y2="40" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" />
              <line x1="80" y1="160" x2="320" y2="160" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" />
              <line x1="80" y1="40" x2="80" y2="160" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" />
              <line x1="320" y1="40" x2="320" y2="160" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" />
              <line x1="80" y1="40" x2="320" y2="160" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.3" />
              <line x1="80" y1="160" x2="320" y2="40" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.3" />
            </svg>

            {/* Nodes */}
            <div className="absolute top-2 left-4 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 shadow">
              DOM Selectors
            </div>
            <div className="absolute top-2 right-4 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 shadow">
              Event Listeners
            </div>
            <div className="absolute bottom-2 left-4 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 shadow">
              UI Inputs
            </div>
            <div className="absolute bottom-2 right-4 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 shadow">
              Memory State
            </div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
              JS Objects
            </div>

            {/* Warning Badges */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-rose-950/90 border border-rose-700 text-[9px] font-mono text-rose-300 font-bold flex items-center gap-1 shadow">
              <AlertTriangle className="w-2.5 h-2.5" /> Sync Error
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-rose-950/90 border border-rose-600 text-[10px] font-mono text-rose-300 font-bold flex items-center gap-1 shadow-lg shadow-rose-950">
              <Zap className="w-3 h-3" /> Broken Loop
            </div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-rose-950/90 border border-rose-700 text-[9px] font-mono text-rose-300 font-bold flex items-center gap-1 shadow">
              <AlertTriangle className="w-2.5 h-2.5" /> Data Drift
            </div>
          </div>

          {/* Interactive Demonstration */}
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 shrink-0 font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[11px]">Interactive Desync Bug Simulation:</span>
              <button
                type="button"
                onClick={triggerDrift}
                className="px-2 py-1 rounded bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-[10px] transition cursor-pointer active:scale-95"
              >
                {isDesynced ? 'Sync DOM with State' : 'Trigger Desync Bug'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">DOM Value (UI Rendered)</span>
                <span className={`font-bold text-sm tabular-nums ${isDesynced ? 'text-rose-400' : 'text-amber-400'}`}>
                  ${domValue}
                </span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">Memory State (JS Variable)</span>
                <span className="text-emerald-400 font-bold text-sm tabular-nums">${jsValue}</span>
              </div>
            </div>
            {isDesynced && (
              <div className="mt-2 text-[10px] text-rose-400 font-mono flex items-center gap-1.5 animate-pulse">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>State drift detected! Manual DOM push failed: UI is now displaying stale data ($100 vs ${jsValue}).</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Two-Way Binding */}
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/70 p-4 flex flex-col justify-between shadow-[0_0_25px_rgba(16,185,129,0.06)] relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-emerald-900/30 pb-2 shrink-0">
            <div>
              <h3 className="text-base font-bold text-emerald-300 font-mono flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                Two-Way Binding
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-emerald-400/80">
                Automated &amp; Synchronised
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              Knockout / Angular
            </span>
          </div>

          {/* Diagram Visual */}
          <div className="relative flex-1 min-h-[170px] flex items-center justify-center my-2">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path d="M 120 70 C 200 10, 200 10, 280 70" fill="none" stroke="#10b981" strokeWidth="2" className="flow-line" />
              <path d="M 280 130 C 200 190, 200 190, 120 130" fill="none" stroke="#10b981" strokeWidth="2" className="flow-line" />
            </svg>

            <div className="absolute left-6 w-36 h-20 rounded-xl bg-emerald-950/50 border-2 border-emerald-500/70 flex flex-col items-center justify-center text-center shadow-lg shadow-emerald-950/40">
              <span className="text-xs font-bold text-white font-mono">UI Inputs</span>
              <span className="text-[10px] text-emerald-400 font-mono">(View)</span>
            </div>

            <div className="absolute right-6 w-36 h-20 rounded-xl bg-emerald-950/50 border-2 border-emerald-500/70 flex flex-col items-center justify-center text-center shadow-lg shadow-emerald-950/40">
              <span className="text-xs font-bold text-white font-mono">Memory State</span>
              <span className="text-[10px] text-emerald-400 font-mono">(Model)</span>
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-600 text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1 shadow">
              <Lock className="w-2.5 h-2.5" /> Real-Time Sync
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-600 text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1 shadow">
              <Lock className="w-2.5 h-2.5" /> Automatic Update
            </div>
          </div>

          {/* Interactive Demonstration */}
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 shrink-0 font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[11px]">Live Continuous Reactive Loop:</span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Auto-synced
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <div>
                <label className="text-[9px] text-slate-500 block mb-1">Type in View Input:</label>
                <input
                  type="text"
                  value={twoWayText}
                  onChange={(e) => {
                    setTwoWayText(e.target.value);
                    playSound('click', soundEnabled);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  placeholder="Type anything..."
                />
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-[9px] text-slate-500 block">Synchronised Model:</span>
                <span className="text-emerald-400 font-bold text-xs truncate block">
                  &quot;{twoWayText}&quot;
                </span>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-emerald-400/90 font-mono flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Continuous Reactive Loop: Eliminates manual DOM pushing entirely.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Key Takeaway */}
      <div className="mt-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-400 font-mono shrink-0">
        <span className="text-cyan-400 font-bold">Key Insight:</span> Knockout.js introduced declarative MVVM to solve the desynchronisation nightmare of manual jQuery selectors.
      </div>
    </div>
  );
};
