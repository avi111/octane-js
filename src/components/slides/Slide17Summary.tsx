import React from 'react';
import { Flag, Sparkles, CheckCircle2, ArrowRight, Zap, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
  onJumpToSlide?: (slideId: number) => void;
}

export const Slide17Summary: React.FC<SlideProps> = ({ soundEnabled, onJumpToSlide }) => {
  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-4 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-2 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Keynote Synthesis // Final Architecture Summary</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          The Reactive Architecture Evolution Summary
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-mono mt-0.5">
          Connecting the dots: From imperative DOM queries to Ahead-of-Time compiled direct mutation
        </p>
      </div>

      {/* Main Grand Box: The Core Keynote Thesis */}
      <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-purple-950/50 to-slate-950 border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.15)] text-center my-1 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Flag className="w-4 h-4 text-cyan-400" />
            <span>The Reactive Architecture Thesis</span>
          </div>
          <blockquote className="text-base sm:text-xl md:text-2xl font-bold text-white leading-snug tracking-tight font-sans">
            &ldquo;The future of frontend combines the <span className="text-cyan-300">developer familiarity of React</span>, the <span className="text-purple-300">clean syntax of TSRX</span>, and the <span className="text-emerald-400">raw O(1) performance of OctaneJS</span>.&rdquo;
          </blockquote>
          <p className="text-xs text-slate-400 font-mono">
            Presented by Avi Levkovich • Reimagining React Without the Virtual DOM
          </p>
        </div>
      </div>

      {/* 4 Architectural Eras Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-auto py-1">
        {/* Era 1 */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-rose-500/30 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-rose-400 mb-1">
              <span>ERA 01 // 2008</span>
              <span className="px-1.5 py-0.2 rounded bg-rose-950 border border-rose-800">Desync Chaos</span>
            </div>
            <h4 className="text-xs font-bold text-white">Manual Imperative DOM</h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              jQuery selectors and two-way binding cascades created untraceable domino loops and chronic UI drift.
            </p>
          </div>
          <span className="text-[10px] font-mono text-rose-400/90 font-semibold block pt-1 border-t border-slate-800">
            Fix: Unidirectional Flow
          </span>
        </div>

        {/* Era 2 */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-cyan-500/30 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-cyan-400 mb-1">
              <span>ERA 02 // 2013</span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-800">Predictability</span>
            </div>
            <h4 className="text-xs font-bold text-white">Virtual DOM &amp; Snapshots</h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              React tamed the chaos by introducing UI = f(State), lightweight tree snapshots, and pure one-way events.
            </p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400/90 font-semibold block pt-1 border-t border-slate-800">
            Limitation: O(t) diffing &amp; GC
          </span>
        </div>

        {/* Era 3 */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-amber-500/30 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-400 mb-1">
              <span>ERA 03 // 2019</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-950 border border-amber-800">The Resistance</span>
            </div>
            <h4 className="text-xs font-bold text-white">Svelte &amp; Hook Terror</h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Rich Harris called out VDOM overhead while developers struggled with strict useMemo dependency arrays.
            </p>
          </div>
          <span className="text-[10px] font-mono text-amber-400/90 font-semibold block pt-1 border-t border-slate-800">
            Dilemma: Loss of React ecosystem
          </span>
        </div>

        {/* Era 4 */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-emerald-500/40 flex flex-col justify-between space-y-2 shadow-lg shadow-emerald-950/20">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-emerald-400 mb-1">
              <span>ERA 04 // 2026+</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800">The Frontier</span>
            </div>
            <h4 className="text-xs font-bold text-white">TSRX &amp; OctaneJS O(1)</h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Dominic Gannaway&apos;s statement compiler, hoisted hooks, template cloning, and constant-time direct mutation.
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400/90 font-semibold block pt-1 border-t border-slate-800">
            Result: Familiar JSX + O(1) speed
          </span>
        </div>
      </div>

      {/* Footer Insight Banner */}
      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs flex items-center justify-between text-slate-400 shrink-0 mt-1">
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero Greenfield Risk: Adopt incrementally with OctaneCompat and ReactCompat</span>
        </span>
        <span className="text-slate-500 hidden sm:inline">Press Space or Next for the Closing Title</span>
      </div>
    </div>
  );
};
