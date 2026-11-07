import React, { useState, useEffect } from 'react';
import { Zap, RotateCcw, FastForward, CheckCircle2 } from 'lucide-react';
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
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-4 overflow-hidden">
      <div className="text-center mb-2 shrink-0">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Virtual DOM Overhead vs. Compiler-First Execution
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-mono mt-1">
          Timeline breakdown of UI update lifecycle &amp; runtime latency • Press{' '}
          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold border border-slate-700">
            SPACEBAR
          </span>{' '}
          to step
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-around min-h-0 space-y-3">
        {/* React Track */}
        <div className="p-3 md:p-4 rounded-2xl border border-rose-500/40 bg-slate-950/80 shadow-[0_0_20px_rgba(244,63,94,0.08)]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-base font-bold text-rose-300 font-mono">
                React (Virtual DOM Runtime)
              </span>
              <p className="text-[11px] text-slate-400">
                Heavy runtime overhead: re-creating VDOM trees &amp; tree diffing algorithm
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 block font-mono uppercase">
                Cumulative Latency
              </span>
              <span className="text-lg md:text-xl font-bold font-mono text-rose-400 tabular-nums">
                {reactTimes[step - 1]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 font-mono">
            {/* Step 1 */}
            <div
              className={`p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                step >= 1
                  ? 'border-rose-500/80 bg-rose-950/40 shadow-lg shadow-rose-950/50 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-white block">1. State Change</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Trigger setState</span>
              <span className="text-[10px] text-rose-400 font-bold block mt-2">+0ms cumulative</span>
            </div>

            {/* Step 2 */}
            <div
              className={`p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                step >= 2
                  ? 'border-rose-500/80 bg-rose-950/40 shadow-lg shadow-rose-950/50 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-slate-200 block">2. Re-render</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Execute function</span>
              <span className="text-[10px] text-rose-400 font-bold block mt-2">+8ms cumulative</span>
            </div>

            {/* Step 3 */}
            <div
              className={`p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                step >= 3
                  ? 'border-rose-500/80 bg-rose-950/40 shadow-lg shadow-rose-950/50 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-slate-200 block">3. Build VDOM</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Allocate object tree</span>
              <span className="text-[10px] text-rose-400 font-bold block mt-2">+22ms cumulative</span>
            </div>

            {/* Step 4 */}
            <div
              className={`p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                step >= 4
                  ? 'border-rose-500/80 bg-rose-950/40 shadow-lg shadow-rose-950/50 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-slate-200 block">4. Diffing</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Compare old vs new</span>
              <span className="text-[10px] text-rose-400 font-bold block mt-2">+42ms cumulative</span>
            </div>

            {/* Step 5 */}
            <div
              className={`p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                step >= 5
                  ? 'border-rose-500/80 bg-rose-950/40 shadow-lg shadow-rose-950/50 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-slate-200 block">5. Patch DOM</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Apply DOM mutations</span>
              <span className="text-[10px] text-rose-400 font-bold block mt-2">+54ms cumulative</span>
            </div>
          </div>
        </div>

        {/* Compiler Track */}
        <div className="p-3 md:p-4 rounded-2xl border border-emerald-500/40 bg-slate-950/80 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-base font-bold text-emerald-300 font-mono">
                Compiler-First (TSRX / OctaneJS / Svelte)
              </span>
              <p className="text-[11px] text-slate-400">
                Zero VDOM overhead: AOT compiler binds state changes directly to DOM nodes
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 block font-mono uppercase">
                Cumulative Latency
              </span>
              <span className="text-lg md:text-xl font-bold font-mono text-emerald-400 tabular-nums">
                {compilerTimes[step - 1]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono">
            {/* Step 1 */}
            <div
              className={`p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                compilerStepActive >= 1
                  ? 'border-emerald-500/80 bg-emerald-950/40 shadow-lg shadow-emerald-950/50 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-white block">1. State Change</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Signal update</span>
              <span className="text-[10px] text-emerald-400 font-bold block mt-2">⚡ 0ms execution</span>
            </div>

            {/* Step 2 */}
            <div
              className={`p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                compilerStepActive >= 2
                  ? 'border-emerald-500/80 bg-emerald-950/40 shadow-lg shadow-emerald-950/50 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-slate-200 block">2. Direct DOM Update</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Compiled pinpoint mutation</span>
              <span className="text-[10px] text-emerald-400 font-bold block mt-2">⚡ 2ms execution</span>
            </div>

            {/* Step 3 */}
            <div
              className={`p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                compilerStepActive >= 3
                  ? 'border-emerald-500/80 bg-emerald-950/40 shadow-lg shadow-emerald-950/50 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 opacity-40'
              }`}
            >
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> DONE
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">UI updated instantly</span>
              <span className="text-[10px] text-emerald-400 font-bold block mt-2">⚡ 2ms total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Benchmark Bar */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs shrink-0 mt-2">
        <span className="text-emerald-400 font-bold flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          27x Faster Execution • Eliminates Garbage Collection &amp; Reconciliation Overhead
        </span>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          <button
            type="button"
            onClick={handleNextStep}
            className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-[11px] transition flex items-center gap-1 cursor-pointer shadow-lg shadow-cyan-600/30 active:scale-95"
          >
            <FastForward className="w-3 h-3" /> Next Step (Step {step}/5)
          </button>
        </div>
      </div>
    </div>
  );
};
