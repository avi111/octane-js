import React, { useState } from 'react';
import { Eye, Sparkles, ArrowRight, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide3MiddleManagerProps {
  soundEnabled: boolean;
}

export const Slide3MiddleManager: React.FC<Slide3MiddleManagerProps> = ({ soundEnabled }) => {
  const [activeZone, setActiveZone] = useState<'all' | 'left' | 'center' | 'right'>('all');

  const zones = [
    {
      id: 'left' as const,
      zoneName: 'left',
      phaseNum: '01',
      tag: 'APPLICATION WORKFLOW',
      title: 'Incoming Data Flood',
      desc: 'Rapid state dispatches, continuous keystrokes, and synthetic event objects flooding the manager’s desk.',
      accent: 'cyan',
      borderClass: 'border-cyan-500/50',
      activeClass: 'border-cyan-400 bg-cyan-950/70 shadow-[0_0_25px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400',
      tagClass: 'bg-cyan-950 text-cyan-300 border-cyan-800'
    },
    {
      id: 'center' as const,
      zoneName: 'center',
      phaseNum: '02',
      tag: 'MIDDLE MANAGER (V-DOM)',
      title: 'The Paperwork Bottleneck',
      desc: 'Buried in stacks of paperwork: tree re-creation, recursive diffing passes, and Garbage Collection pauses.',
      accent: 'rose',
      borderClass: 'border-rose-500/50',
      activeClass: 'border-rose-400 bg-rose-950/70 shadow-[0_0_25px_rgba(244,63,94,0.3)] ring-1 ring-rose-400',
      tagClass: 'bg-rose-950 text-rose-300 border-rose-800'
    },
    {
      id: 'right' as const,
      zoneName: 'right',
      phaseNum: '03',
      tag: 'THE USER’S SCREEN',
      title: 'Direct O(1) DOM Solution',
      desc: 'The user waits on an hourglass spinner. The modern engineer demands: "Just let data go directly to the screen!"',
      accent: 'emerald',
      borderClass: 'border-emerald-500/50',
      activeClass: 'border-emerald-400 bg-emerald-950/70 shadow-[0_0_25px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400',
      tagClass: 'bg-emerald-950 text-emerald-300 border-emerald-800'
    }
  ];

  const handleZoneClick = (zoneId: 'all' | 'left' | 'center' | 'right') => {
    setActiveZone((prev) => (prev === zoneId ? 'all' : zoneId));
    playSound('switch', soundEnabled);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-6 overflow-hidden text-left dir-ltr">
      {/* Title & Subtitle */}
      <div className="text-center mb-1 shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs md:text-sm font-mono text-cyan-300 mb-1">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Visual Architectural Metaphor</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          The Virtual DOM as an Overloaded Middle Manager
        </h2>
        <p className="text-sm md:text-base text-slate-300 font-mono mt-0.5">
          In 2013, the V-DOM brought order. In 2026, it is buried in redundant paperwork.
        </p>
      </div>

      {/* Main Hero Cartoon Image Container (Spans full width, fills room cleanly) */}
      <div className="flex-1 min-h-0 w-full relative my-1.5 flex items-center justify-center">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl flex items-center justify-center group">
          <img
            src="/assets/aistudio/Gemini_Generated_Image_wqfkn6wqfkn6wqfk_8dcc07ff.jpeg"
            alt="Middle Manager Virtual DOM Cartoon Illustration"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[50vh] transition-transform duration-300"
          />

          {/* Spotlight Overlays matching the 3 zones */}
          {activeZone === 'left' && (
            <div className="absolute inset-y-0 left-0 w-1/3 bg-cyan-500/15 border-r-2 border-cyan-400 pointer-events-none transition-all duration-300 flex items-start p-3">
              <span className="px-2.5 py-1 rounded bg-cyan-950/90 border border-cyan-400 text-cyan-200 font-mono text-xs font-bold shadow-lg">
                Focus: Incoming Workflow
              </span>
            </div>
          )}
          {activeZone === 'center' && (
            <div className="absolute inset-y-0 left-1/3 w-1/3 bg-rose-500/15 border-x-2 border-rose-500 pointer-events-none transition-all duration-300 flex items-start justify-center p-3">
              <span className="px-2.5 py-1 rounded bg-rose-950/90 border border-rose-400 text-rose-200 font-mono text-xs font-bold shadow-lg">
                Focus: The V-DOM Desk
              </span>
            </div>
          )}
          {activeZone === 'right' && (
            <div className="absolute inset-y-0 right-0 w-1/3 bg-emerald-500/15 border-l-2 border-emerald-400 pointer-events-none transition-all duration-300 flex items-start justify-end p-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950/90 border border-emerald-400 text-emerald-200 font-mono text-xs font-bold shadow-lg">
                Focus: Direct to Screen
              </span>
            </div>
          )}

          {/* Quick zone switcher overlay at top-right */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-xl border border-slate-800 text-[11px] font-mono">
            <span className="text-slate-400 hidden sm:inline">Highlight:</span>
            <button
              type="button"
              onClick={() => handleZoneClick('all')}
              className={`px-2 py-0.5 rounded cursor-pointer transition ${
                activeZone === 'all' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => handleZoneClick('left')}
              className={`px-2 py-0.5 rounded cursor-pointer transition ${
                activeZone === 'left' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Left
            </button>
            <button
              type="button"
              onClick={() => handleZoneClick('center')}
              className={`px-2 py-0.5 rounded cursor-pointer transition ${
                activeZone === 'center' ? 'bg-rose-500 text-white font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Center
            </button>
            <button
              type="button"
              onClick={() => handleZoneClick('right')}
              className={`px-2 py-0.5 rounded cursor-pointer transition ${
                activeZone === 'right' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Right
            </button>
          </div>
        </div>
      </div>

      {/* 3 Non-Overlapping Stage Cards directly beneath the cartoon columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 shrink-0 mt-1">
        {zones.map((z) => {
          const isSelected = activeZone === z.id;
          return (
            <div
              key={z.id}
              onClick={() => handleZoneClick(z.id)}
              className={`p-3 md:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? z.activeClass
                  : 'border-slate-800 bg-slate-950/85 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                  <span className={`px-2 py-0.5 rounded border ${z.tagClass} text-[10px]`}>
                    STAGE {z.phaseNum}
                  </span>
                  <span className="text-slate-400 text-[11px] uppercase tracking-wider">{z.tag}</span>
                </div>
                <h3 className="text-sm md:text-base font-black text-white font-mono mt-1">
                  {z.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-snug mt-1 font-sans">
                  {z.desc}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className={isSelected ? 'text-white font-bold' : 'text-slate-400'}>
                  {isSelected ? '● Zone Active' : 'Click to spotlight zone'}
                </span>
                <span className="text-slate-500">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Concise Bottom Keynote Insight Banner */}
      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center text-xs md:text-sm text-slate-300 font-mono shrink-0 mt-2">
        <strong className="text-cyan-400">The Keynote Insight:</strong> In 2013, the Virtual DOM was hired to tame manual updates. In 2026, compiler-first architectures cut out the middle manager so state mutates the DOM directly in O(1) time.
      </div>
    </div>
  );
};

