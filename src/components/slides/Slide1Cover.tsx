import React from 'react';
import { Play, Sparkles, User, Layers, ArrowRight, ShieldCheck, Zap, GitBranch, Terminal, Clock } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide1CoverProps {
  soundEnabled: boolean;
  onStart: () => void;
  onJumpToSlide: (id: number) => void;
}

export const Slide1Cover: React.FC<Slide1CoverProps> = ({ soundEnabled, onStart, onJumpToSlide }) => {
  return (
    <div className="flex flex-col justify-between w-full h-full p-4 md:p-8 overflow-hidden relative select-none dir-ltr text-left">
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
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Executive Keynote
          </span>
          <span className="text-slate-600 font-mono text-sm hidden sm:inline">•</span>
          <span className="text-slate-300 font-mono text-xs hidden sm:inline flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> 10-Minute Architecture Briefing
          </span>
        </div>

        <div className="text-xs font-mono text-slate-300 flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>11 Streamlined Slides</span>
        </div>
      </div>

      {/* Hero Core Title & Presenter Lockup (VERY BIG TEXT) */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5 my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs md:text-sm text-cyan-300 font-mono shadow-inner">
          <Terminal className="w-4 h-4 text-purple-400" />
          <span>From Virtual DOM In-Memory Diffing to Direct O(1) DOM Mutation</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
          Reimagining React <br />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
            Without the Virtual DOM
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans font-normal">
          A 10-minute deep-dive on the reactive architecture evolution: why the V-DOM middle manager is reaching its limits, and how Svelte, TSRX, and OctaneJS deliver compiled direct DOM mutation.
        </p>

        {/* Presenter Card */}
        <div className="inline-flex items-center gap-4 p-3 pr-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-cyan-500/20">
            AL
          </div>
          <div className="text-left font-mono">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Keynote Speaker</div>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span>Avi Levkovich</span>
              <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 font-bold">Keynote</span>
            </div>
          </div>
        </div>

        {/* Primary Start CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              playSound('step', soundEnabled);
              onStart();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-base font-mono flex items-center justify-center gap-2.5 transition shadow-xl shadow-cyan-500/25 active:scale-95 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Keynote (Space or Click)</span>
          </button>
        </div>
      </div>

      {/* Agenda Quick-Jump Highlights */}
      <div className="relative z-10 shrink-0 pt-3 border-t border-slate-800/80">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
          <button
            type="button"
            onClick={() => onJumpToSlide(2)}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition text-left cursor-pointer group"
          >
            <div className="text-[10px] text-cyan-400 font-bold uppercase mb-0.5">01. Overview</div>
            <div className="text-xs text-slate-200 font-semibold truncate">4-Pillar Roadmap</div>
            <div className="text-[10px] text-slate-400">Slide 2</div>
          </button>

          <button
            type="button"
            onClick={() => onJumpToSlide(4)}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition text-left cursor-pointer group"
          >
            <div className="text-[10px] text-rose-400 font-bold uppercase mb-0.5">02. Context</div>
            <div className="text-xs text-slate-200 font-semibold truncate">jQuery &amp; MVC to React</div>
            <div className="text-[10px] text-slate-400">Slide 4</div>
          </button>

          <button
            type="button"
            onClick={() => onJumpToSlide(5)}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition text-left cursor-pointer group"
          >
            <div className="text-[10px] text-amber-400 font-bold uppercase mb-0.5">03. The Ceiling</div>
            <div className="text-xs text-slate-200 font-semibold truncate">54ms Diff &amp; Hook Terror</div>
            <div className="text-[10px] text-slate-400">Slide 5</div>
          </button>

          <button
            type="button"
            onClick={() => onJumpToSlide(8)}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition text-left cursor-pointer group"
          >
            <div className="text-[10px] text-emerald-400 font-bold uppercase mb-0.5">04. The Solution</div>
            <div className="text-xs text-slate-200 font-semibold truncate">TSRX &amp; OctaneJS O(1)</div>
            <div className="text-[10px] text-slate-400">Slide 8</div>
          </button>
        </div>
      </div>
    </div>
  );
};
