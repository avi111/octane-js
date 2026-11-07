import React, { useState } from 'react';
import { Sparkles, Layers, Cpu, Monitor } from 'lucide-react';
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
      accent: 'cyan',
      icon: Layers,
      borderClass: 'border-cyan-500/40 hover:border-cyan-400',
      activeClass: 'border-cyan-400 bg-cyan-950/70 shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400',
      tagClass: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      textColor: 'text-cyan-300'
    },
    {
      id: 'center' as const,
      zoneName: 'center',
      phaseNum: '02',
      tag: 'MIDDLE MANAGER (V-DOM)',
      title: 'The Paperwork Bottleneck',
      accent: 'rose',
      icon: Cpu,
      borderClass: 'border-rose-500/40 hover:border-rose-400',
      activeClass: 'border-rose-400 bg-rose-950/70 shadow-[0_0_20px_rgba(244,63,94,0.25)] ring-1 ring-rose-400',
      tagClass: 'bg-rose-950 text-rose-300 border-rose-800',
      textColor: 'text-rose-300'
    },
    {
      id: 'right' as const,
      zoneName: 'right',
      phaseNum: '03',
      tag: 'THE USER’S SCREEN',
      title: 'Direct O(1) DOM Solution',
      accent: 'emerald',
      icon: Monitor,
      borderClass: 'border-emerald-500/40 hover:border-emerald-400',
      activeClass: 'border-emerald-400 bg-emerald-950/70 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400',
      tagClass: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      textColor: 'text-emerald-300'
    }
  ];

  const handleZoneClick = (zoneId: 'all' | 'left' | 'center' | 'right') => {
    setActiveZone((prev) => (prev === zoneId ? 'all' : zoneId));
    playSound('switch', soundEnabled);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-3 md:p-6 overflow-hidden text-left dir-ltr">
      {/* Title & Subtitle */}
      <div className="text-center mb-2 shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs md:text-sm font-mono text-cyan-300 mb-1">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Visual Architectural Metaphor</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
          The Virtual DOM as an Overloaded Middle Manager
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-mono mt-0.5">
          In 2013, the V-DOM brought order. In 2026, it is buried in redundant paperwork.
        </p>
      </div>

      {/* 30% / 70% Layout Container with ample vertical breathing room */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 md:gap-5 flex-1 min-h-0 my-1 items-stretch">
        {/* 30% Column: Compact, Clean Title Boxes (No description, No click comments) */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-2.5 h-full">
          <div className="space-y-2.5 flex-1 flex flex-col justify-center">
            {zones.map((z) => {
              const isSelected = activeZone === z.id;
              const Icon = z.icon;
              return (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => handleZoneClick(z.id)}
                  className={`w-full p-3 md:p-3.5 rounded-xl border transition-all duration-200 text-left cursor-pointer group shadow-md ${
                    isSelected
                      ? z.activeClass
                      : `border-slate-800 bg-slate-950/85 hover:bg-slate-900 ${z.borderClass}`
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold ${z.tagClass}`}>
                      STAGE {z.phaseNum}
                    </span>
                    <Icon className={`w-4 h-4 ${z.textColor}`} />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      {z.tag}
                    </span>
                    {/* Compact, Crisp Title */}
                    <h3 className="text-base md:text-lg font-black text-white font-mono mt-0.5 leading-snug group-hover:text-cyan-300 transition-colors">
                      {z.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Simple 1-line Metaphor Summary at bottom */}
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 shrink-0">
            <strong className="text-cyan-400">Metaphor:</strong> Why diff trees in memory? Mutate the real DOM directly.
          </div>
        </div>

        {/* 70% Column: Cartoon Illustration Prominently Filling the Space */}
        <div className="lg:col-span-7 relative h-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl flex items-center justify-center group">
          <img
            src="/assets/aistudio/Gemini_Generated_Image_wqfkn6wqfkn6wqfk_8dcc07ff.jpeg"
            alt="Middle Manager Virtual DOM Cartoon Illustration"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[64vh] transition-transform duration-300"
          />

          {/* Interactive Spotlight Overlays matching the 3 zones */}
          {activeZone === 'left' && (
            <div className="absolute inset-y-0 left-0 w-1/3 bg-cyan-500/20 border-r-4 border-cyan-400 pointer-events-none transition-all duration-300 flex items-start p-3">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-950/95 border border-cyan-400 text-cyan-200 font-mono text-xs font-bold shadow-xl">
                Stage 01: Application Workflow
              </span>
            </div>
          )}
          {activeZone === 'center' && (
            <div className="absolute inset-y-0 left-1/3 w-1/3 bg-rose-500/20 border-x-4 border-rose-500 pointer-events-none transition-all duration-300 flex items-start justify-center p-3">
              <span className="px-2.5 py-1 rounded-lg bg-rose-950/95 border border-rose-400 text-rose-200 font-mono text-xs font-bold shadow-xl">
                Stage 02: Middle Manager (V-DOM)
              </span>
            </div>
          )}
          {activeZone === 'right' && (
            <div className="absolute inset-y-0 right-0 w-1/3 bg-emerald-500/20 border-l-4 border-emerald-400 pointer-events-none transition-all duration-300 flex items-start justify-end p-3">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/95 border border-emerald-400 text-emerald-200 font-mono text-xs font-bold shadow-xl">
                Stage 03: The User&apos;s Screen
              </span>
            </div>
          )}

          {/* Top-Right Quick Toggle Pills */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-slate-950/85 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-800 text-[11px] font-mono shadow-lg">
            <button
              type="button"
              onClick={() => handleZoneClick('all')}
              className={`px-2 py-0.5 rounded cursor-pointer transition font-bold ${
                activeZone === 'all' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => handleZoneClick('left')}
              className={`px-2 py-0.5 rounded cursor-pointer transition font-bold ${
                activeZone === 'left' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Left
            </button>
            <button
              type="button"
              onClick={() => handleZoneClick('center')}
              className={`px-2 py-0.5 rounded cursor-pointer transition font-bold ${
                activeZone === 'center' ? 'bg-rose-500 text-white font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Center
            </button>
            <button
              type="button"
              onClick={() => handleZoneClick('right')}
              className={`px-2 py-0.5 rounded cursor-pointer transition font-bold ${
                activeZone === 'right' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Right
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
