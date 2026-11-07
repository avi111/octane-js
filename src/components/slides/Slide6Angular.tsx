import React, { useState } from 'react';
import { RefreshCw, Gauge, AlertTriangle, Play, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide6Angular: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [digestIteration, setDigestIteration] = useState<number>(0);
  const [isDigestRunning, setIsDigestRunning] = useState<boolean>(false);

  const runDigest = () => {
    if (isDigestRunning) return;
    setIsDigestRunning(true);
    setDigestIteration(0);
    playSound('step', soundEnabled);

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setDigestIteration(count);
      playSound('click', soundEnabled);
      if (count >= 10) {
        clearInterval(interval);
        setIsDigestRunning(false);
        playSound('alert', soundEnabled);
      }
    }, 180);
  };

  return (
    <div className="flex flex-col justify-center w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6 w-full">
        <div>
          <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
            Phase 02 // Framework Evolution
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
            Angular: Complete Framework &amp; The Domino Collapse
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            When end-to-end solutions hit scale limits: Digest cycles and cascading state mutations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <RefreshCw className="text-rose-400 w-5 h-5" />
            <h3 className="text-base font-bold text-white">The Domino Effect</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A change in Model A updated View A, which triggered Model B, updating View B. Circular dependency chains made it almost impossible to trace where bugs originated.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <Gauge className="text-amber-400 w-5 h-5" />
            <h3 className="text-base font-bold text-white">Heavy Digest Cycles</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Angular performed dirty-checking across watchers on direct DOM nodes. Large enterprise apps suffered noticeable latency due to heavy browser Layout and Reflow calculations.
            </p>
          </div>
        </div>

        {/* Interactive Digest Cycle Simulation */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span className="text-rose-400 font-bold text-[11px] flex items-center gap-1.5">
              <RefreshCw className={`w-3.5 h-3.5 ${isDigestRunning ? 'animate-spin' : ''}`} />
              $digest() TTL Dirty-Checking Simulation (Max 10 Iterations)
            </span>
            <button
              type="button"
              onClick={runDigest}
              disabled={isDigestRunning}
              className="px-2.5 py-1 rounded bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-[10px] font-bold flex items-center gap-1 transition cursor-pointer disabled:opacity-50"
            >
              <Play className="w-2.5 h-2.5" /> {isDigestRunning ? 'Iterating...' : 'Trigger $digest() Loop'}
            </button>
          </div>

          <div className="grid grid-cols-10 gap-1.5 mb-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`p-2 rounded text-center text-[10px] transition-all duration-200 border ${
                  digestIteration > i
                    ? digestIteration === 10 && i === 9
                      ? 'bg-rose-950 border-rose-500 text-rose-300 font-bold scale-105'
                      : 'bg-amber-950/60 border-amber-600/60 text-amber-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-600'
                }`}
              >
                Pass {i + 1}
              </div>
            ))}
          </div>

          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>
              {digestIteration === 0 && 'Ready: Click trigger to simulate dirty-checking iteration.'}
              {digestIteration > 0 && digestIteration < 10 && `Dirty checking active: Re-scanning 4,500 scope watchers... (${digestIteration}/10)`}
              {digestIteration === 10 && (
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Error: 10 $digest() iterations reached. Iteration limit exceeded (Infinite Loop)!
                </span>
              )}
            </span>
            <span className="text-slate-500">Watches: 4,500</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs text-rose-300 font-mono flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>
            Direct runtime DOM manipulations remained expensive; CPU bottlenecks grew exponentially with application scale.
          </span>
        </div>
      </div>
    </div>
  );
};
