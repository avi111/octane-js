import React from 'react';
import { Play, Sparkles, User, Layers, ArrowRight, ShieldCheck, Zap, GitBranch, Terminal } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide1CoverProps {
  soundEnabled: boolean;
  onStart: () => void;
  onJumpToSlide: (id: number) => void;
}

export const Slide1Cover: React.FC<Slide1CoverProps> = ({ soundEnabled, onStart, onJumpToSlide }) => {
  return (
    <div className="flex flex-col justify-between w-full h-full p-4 md:p-6 overflow-hidden relative">
      {/* Background Decorative Ambient Glow & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl glow-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl glow-pulse" style={{ animationDelay: '1.5s' }} />
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Top Header Eyebrow */}
      <div className="relative z-10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-800/80 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Architectural Keynote
          </span>
          <span className="text-slate-500 font-mono text-xs hidden sm:inline">•</span>
          <span className="text-slate-400 font-mono text-xs hidden sm:inline">Frontend Systems Evolution</span>
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>16 Interactive Slides</span>
        </div>
      </div>

      {/* Hero Core Title & Presenter Lockup */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-mono shadow-inner">
          <Terminal className="w-3.5 h-3.5 text-purple-400" />
          <span>From Runtime Reconciliation to AOT Direct Memory Mutation</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Reimagining React <br />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
            Without the Virtual DOM
          </span>
        </h1>

        <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
          The comprehensive reactive architecture evolution: examining the limits of tree reconciliation, the cost of synthetic events, and the rise of Dominic Gannaway&apos;s TSRX and OctaneJS.
        </p>

        {/* Presenter Card */}
        <div className="inline-flex items-center gap-3 p-2 pr-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-xl backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-cyan-500/20">
            AL
          </div>
          <div className="text-left font-mono">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Keynote Presenter</div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Avi Levkovich</span>
              <span className="text-[10px] text-cyan-300 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800">Speaker</span>
            </div>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              playSound('step', soundEnabled);
              onStart();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm font-mono flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Presentation (Space / Next)</span>
          </button>
        </div>
      </div>

      {/* Agenda Quick-Jump Highlights */}
      <div className="relative z-10 shrink-0 pt-2 border-t border-slate-800/80">
        <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2 flex items-center justify-between">
          <span>Agenda &amp; Key Architectural Chapters:</span>
          <span className="text-slate-500 hidden sm:inline">Click any chapter to jump directly</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          {/* Chapter 1 */}
          <button
            type="button"
            onClick={() => onJumpToSlide(4)}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[10px] text-rose-400 font-bold mb-0.5">
              <span>01. The Desync Chaos</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[11px] text-slate-200 font-semibold truncate">jQuery &amp; MVC Dominoes</div>
            <div className="text-[9px] text-slate-400">Slides 4–5</div>
          </button>

          {/* Chapter 2 */}
          <button
            type="button"
            onClick={() => onJumpToSlide(6)}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold mb-0.5">
              <span>02. VDOM Bottlenecks</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[11px] text-slate-200 font-semibold truncate">54ms Diff &amp; GC Spikes</div>
            <div className="text-[9px] text-slate-400">Slides 6–7</div>
          </button>

          {/* Chapter 3 */}
          <button
            type="button"
            onClick={() => onJumpToSlide(11)}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[10px] text-purple-400 font-bold mb-0.5">
              <span>03. Svelte &amp; TSRX</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[11px] text-slate-200 font-semibold truncate">Dominic Gannaway&apos;s Bridge</div>
            <div className="text-[9px] text-slate-400">Slides 11–13</div>
          </button>

          {/* Chapter 4 */}
          <button
            type="button"
            onClick={() => onJumpToSlide(14)}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold mb-0.5">
              <span>04. OctaneJS O(1)</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[11px] text-slate-200 font-semibold truncate">Clone Templates &amp; Interop</div>
            <div className="text-[9px] text-slate-400">Slides 14–16</div>
          </button>
        </div>
      </div>
    </div>
  );
};
