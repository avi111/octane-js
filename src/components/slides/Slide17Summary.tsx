import React from 'react';
import { Flag, Sparkles, CheckCircle2, ArrowRight, Zap, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
  onJumpToSlide?: (slideId: number) => void;
}

export const Slide17Summary: React.FC<SlideProps> = ({ soundEnabled, onJumpToSlide }) => {
  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-6 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-1 shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs md:text-sm font-mono text-cyan-300 mb-1">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Keynote Synthesis // Architecture Arc</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          The Reactive Architecture Evolution
        </h2>
        <p className="text-sm md:text-base text-slate-300 font-mono mt-0.5">
          Connecting the dots: From imperative DOM queries to Ahead-of-Time compiled direct mutation
        </p>
      </div>

      {/* Main Grand Box: The Core Keynote Thesis */}
      <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-purple-950/60 to-slate-950 border border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.18)] text-center my-1 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-xs md:text-sm font-bold uppercase tracking-wider">
            <Flag className="w-4 h-4 text-cyan-400" />
            <span>The Reactive Architecture Thesis</span>
          </div>
          <blockquote className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-snug tracking-tight font-sans">
            &ldquo;The future of frontend combines the <span className="text-cyan-300">developer familiarity of React</span>, the <span className="text-purple-300">clean syntax of TSRX</span>, and the <span className="text-emerald-400">raw O(1) speed of OctaneJS</span>.&rdquo;
          </blockquote>
          <p className="text-xs md:text-sm text-slate-400 font-mono">
            Presented by Avi Levkovich • Reimagining React Without the Virtual DOM
          </p>
        </div>
      </div>

      {/* 4 Architectural Eras Grid with BIG Typography */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-auto py-1">
        {/* Era 1 */}
        <div className="p-4 rounded-2xl bg-slate-950/85 border border-rose-500/40 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-rose-400 mb-1">
              <span>ERA 01 // 2008</span>
              <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-[10px]">Desync Chaos</span>
            </div>
            <h4 className="text-sm md:text-base font-black text-white font-mono">Imperative DOM</h4>
            <p className="text-xs md:text-sm text-slate-300 mt-1 leading-snug">
              jQuery selectors and two-way binding cascades created untraceable domino loops and chronic UI drift.
            </p>
          </div>
          <span className="text-xs font-mono text-rose-400 font-bold block pt-1.5 border-t border-slate-800">
            Fix: Unidirectional Data Flow
          </span>
        </div>

        {/* Era 2 */}
        <div className="p-4 rounded-2xl bg-slate-950/85 border border-cyan-500/40 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-400 mb-1">
              <span>ERA 02 // 2013</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px]">Predictability</span>
            </div>
            <h4 className="text-sm md:text-base font-black text-white font-mono">Virtual DOM Era</h4>
            <p className="text-xs md:text-sm text-slate-300 mt-1 leading-snug">
              React restored sanity with UI = f(State), tree snapshots, and pure one-way events.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-300 font-bold block pt-1.5 border-t border-slate-800">
            Ceiling: O(t) diffing &amp; GC freezes
          </span>
        </div>

        {/* Era 3 */}
        <div className="p-4 rounded-2xl bg-slate-950/85 border border-amber-500/40 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400 mb-1">
              <span>ERA 03 // 2019</span>
              <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-[10px]">The Rebellion</span>
            </div>
            <h4 className="text-sm md:text-base font-black text-white font-mono">Svelte &amp; Hook Terror</h4>
            <p className="text-xs md:text-sm text-slate-300 mt-1 leading-snug">
              Rich Harris called out V-DOM overhead while React developers struggled with memoization arrays.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-300 font-bold block pt-1.5 border-t border-slate-800">
            Dilemma: Loss of React ecosystem
          </span>
        </div>

        {/* Era 4 */}
        <div className="p-4 rounded-2xl bg-slate-950/85 border border-emerald-500/50 flex flex-col justify-between space-y-2 shadow-lg shadow-emerald-950/30">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400 mb-1">
              <span>ERA 04 // 2026+</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px]">The Frontier</span>
            </div>
            <h4 className="text-sm md:text-base font-black text-white font-mono">TSRX &amp; OctaneJS</h4>
            <p className="text-xs md:text-sm text-slate-300 mt-1 leading-snug">
              Dominic Gannaway&apos;s statement compiler, hoisted hooks, template cloning, and constant-time O(1) mutations.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-300 font-black block pt-1.5 border-t border-slate-800">
            Result: Familiar JSX + O(1) speed
          </span>
        </div>
      </div>

      {/* Footer Key Takeaway */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs md:text-sm flex items-center justify-between text-slate-300 shrink-0 mt-1">
        <span className="flex items-center gap-2 text-emerald-400 font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Zero Rewrite Risk: Adopt incrementally with &lt;OctaneCompat&gt; and &lt;ReactCompat&gt;</span>
        </span>
        <span className="text-slate-400 hidden sm:inline">Press Next for Closing Title</span>
      </div>
    </div>
  );
};

