import React, { useState, useEffect } from 'react';
import { Zap, RotateCcw, FastForward, CheckCircle2, AlertTriangle, Cpu, Layers } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide3Props {
  soundEnabled: boolean;
  isActive: boolean;
}

export const Slide3VirtualDOMTimeline: React.FC<Slide3Props> = ({ soundEnabled, isActive }) => {
  const [step, setStep] = useState<number>(1);

  const reactTimes = ["0 ms", "8 ms", "22 ms", "42 ms", "54 ms"];
  const compilerTimes = ["0 ms", "2 ms", "2 ms", "2 ms", "2 ms"];

  const handleNextStep = () => {
    setStep((prev) => {
      const next = prev >= 5 ? 1 : prev + 1;
      playSound('step', soundEnabled);
      return next;
    });
  };

  const handleReset = () => {
    setStep(1);
    playSound('click', soundEnabled);
  };

  // Keyboard shortcut listener for spacebar specifically on this slide
  useEffect(() => {
    if (!isActive) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handleNextStep();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isActive, soundEnabled]);

  const compilerStepActive = Math.min(step, 3);

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-5 overflow-hidden text-left dir-ltr">
      {/* Header with Integrated Stepper & Spacebar Controls (Never covers cards) */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-2 pb-1 border-b border-slate-800/80 mb-1">
        <div>
          <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest block">
            Pillar 02 // The Hidden Ceiling
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            The Hidden Ceiling of the Virtual DOM
          </h2>
          <p className="text-xs md:text-sm text-slate-300 font-mono">
            54ms in-memory reconciliation vs. 2ms compiled direct DOM mutation
          </p>
        </div>

        {/* Stepper Toolbar in Header */}
        <div className="flex items-center gap-2 font-mono shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="text-slate-400">Press</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-300 font-black text-[11px]">
              SPACE
            </span>
            <span className="text-slate-400">to step</span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            title="Reset Stepper"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/25 active:scale-95"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Step {step}/5</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: React Track + Compiler Track + 3 Bottlenecks */}
      <div className="flex-1 min-h-0 flex flex-col justify-around my-1 space-y-2">
        {/* React Track (54ms) */}
        <div className="p-3 md:p-3.5 rounded-xl border border-rose-500/50 bg-slate-950/90 shadow-[0_0_20px_rgba(244,63,94,0.08)]">
          <div className="flex items-center justify-between mb-1.5">
            <div>
              <span className="text-sm md:text-base font-bold text-rose-400 font-mono">
                React Virtual DOM (Runtime Reconciliation)
              </span>
              <p className="text-[11px] md:text-xs text-slate-400">
                Component function re-execution, object tree allocation, recursive tree diffing
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono uppercase font-semibold">
                Latency
              </span>
              <span className="text-xl md:text-2xl font-black font-mono text-rose-400 tabular-nums">
                {reactTimes[step - 1]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1.5 font-mono">
            {/* Step 1 */}
            <div
              className={`p-2 rounded-lg border transition-all duration-200 ${
                step >= 1
                  ? 'border-rose-500 bg-rose-950/60 shadow-md scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/50 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-white block">1. State Change</span>
              <span className="text-[10px] text-slate-300 block truncate">setState()</span>
              <span className="text-[10px] text-rose-300 font-bold block mt-1">+0 ms</span>
            </div>

            {/* Step 2 */}
            <div
              className={`p-2 rounded-lg border transition-all duration-200 ${
                step >= 2
                  ? 'border-rose-500 bg-rose-950/60 shadow-md scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/50 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-white block">2. Re-render</span>
              <span className="text-[10px] text-slate-300 block truncate">Run function</span>
              <span className="text-[10px] text-rose-300 font-bold block mt-1">+8 ms</span>
            </div>

            {/* Step 3 */}
            <div
              className={`p-2 rounded-lg border transition-all duration-200 ${
                step >= 3
                  ? 'border-rose-500 bg-rose-950/60 shadow-md scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/50 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-white block">3. Build Tree</span>
              <span className="text-[10px] text-slate-300 block truncate">Allocate nodes</span>
              <span className="text-[10px] text-rose-300 font-bold block mt-1">+22 ms</span>
            </div>

            {/* Step 4 */}
            <div
              className={`p-2 rounded-lg border transition-all duration-200 ${
                step >= 4
                  ? 'border-rose-500 bg-rose-950/60 shadow-md scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/50 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-white block">4. Diffing</span>
              <span className="text-[10px] text-slate-300 block truncate">O(t) compare</span>
              <span className="text-[10px] text-rose-300 font-bold block mt-1">+42 ms</span>
            </div>

            {/* Step 5 */}
            <div
              className={`p-2 rounded-lg border transition-all duration-200 ${
                step >= 5
                  ? 'border-rose-500 bg-rose-950/60 shadow-md scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/50 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-white block">5. Patch DOM</span>
              <span className="text-[10px] text-slate-300 block truncate">Browser repaint</span>
              <span className="text-[10px] text-rose-300 font-black block mt-1">54 ms Total</span>
            </div>
          </div>
        </div>

        {/* Compiler Track (2ms) */}
        <div className="p-3 md:p-3.5 rounded-xl border border-emerald-500/50 bg-slate-950/90 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
          <div className="flex items-center justify-between mb-1.5">
            <div>
              <span className="text-sm md:text-base font-bold text-emerald-400 font-mono">
                Compiler-First Direct DOM (OctaneJS / TSRX / Svelte)
              </span>
              <p className="text-[11px] md:text-xs text-slate-400">
                Zero intermediate Virtual DOM: Ahead-Of-Time compiler binds state directly to DOM pointers
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono uppercase font-semibold">
                Latency
              </span>
              <span className="text-xl md:text-2xl font-black font-mono text-emerald-400 tabular-nums">
                {compilerTimes[step - 1]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono">
            {/* Step 1 */}
            <div
              className={`p-2 rounded-lg border transition-all duration-200 ${
                compilerStepActive >= 1
                  ? 'border-emerald-500 bg-emerald-950/60 shadow-md scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/50 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-white block">1. Signal Change</span>
              <span className="text-[10px] text-slate-300 block truncate">Direct value mutation</span>
              <span className="text-[10px] text-emerald-300 font-bold block mt-1">⚡ 0 ms</span>
            </div>

            {/* Step 2 */}
            <div
              className={`p-2 rounded-lg border transition-all duration-200 ${
                compilerStepActive >= 2
                  ? 'border-emerald-500 bg-emerald-950/60 shadow-md scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/50 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-white block">2. Pinpoint Update</span>
              <span className="text-[10px] text-slate-300 block truncate">O(1) compiled pointer update</span>
              <span className="text-[10px] text-emerald-300 font-bold block mt-1">⚡ 2 ms</span>
            </div>

            {/* Step 3 */}
            <div
              className={`p-2 rounded-lg border transition-all duration-200 ${
                compilerStepActive >= 3
                  ? 'border-emerald-500 bg-emerald-950/60 shadow-md scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/50 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-white flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">UI Rendered</span>
              </span>
              <span className="text-[10px] text-slate-300 block truncate">Instant paint</span>
              <span className="text-[10px] text-emerald-300 font-black block mt-1">⚡ 2 ms (27x Faster)</span>
            </div>
          </div>
        </div>

        {/* 3 Major Bottleneck Cards (Clean, legible, zero overflow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-rose-900/60">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs md:text-sm mb-1">
              <Cpu className="w-4 h-4 shrink-0" />
              <span>Garbage Collection Freezes</span>
            </div>
            <p className="text-[11px] md:text-xs text-slate-300 leading-snug">
              Creating thousands of temporary objects per keystroke triggers Stop-The-World browser GC pauses.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-900/60">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs md:text-sm mb-1">
              <Layers className="w-4 h-4 shrink-0" />
              <span>O(t) Subtree Traversal</span>
            </div>
            <p className="text-[11px] md:text-xs text-slate-300 leading-snug">
              Diffing cost scales with the size of the subtree (t) rather than the single value that changed.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-900/60">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs md:text-sm mb-1">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Synthetic Event Tax</span>
            </div>
            <p className="text-[11px] md:text-xs text-slate-300 leading-snug">
              Wrapping native events in abstraction layers adds memory churn and input lag on rapid user events.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between shrink-0 mt-1">
        <span className="text-emerald-400 font-bold flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Verdict: At scale, in-memory tree reconciliation becomes the primary CPU &amp; GC bottleneck.</span>
        </span>
        <span className="text-slate-400 hidden sm:inline">Use SPACEBAR or Next button above</span>
      </div>
    </div>
  );
};


