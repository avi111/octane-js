import React, { useState } from 'react';
import { Eye, Info, Sparkles, AlertCircle, Zap, Layers, Monitor, Maximize2 } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide3MiddleManagerProps {
  soundEnabled: boolean;
}

export const Slide3MiddleManager: React.FC<Slide3MiddleManagerProps> = ({ soundEnabled }) => {
  const [activeZone, setActiveZone] = useState<'all' | 'left' | 'center' | 'right'>('all');

  const zones = [
    {
      id: 'all' as const,
      label: 'Full Metaphor Overview',
      enLabel: 'End-to-End Pipeline',
      desc: 'The complete journey: From rapid application data dispatches, through the stressed Virtual DOM middle manager, to the blocked user screen.'
    },
    {
      id: 'left' as const,
      label: '1. Application Workflow',
      enLabel: 'Incoming Data Updates',
      desc: 'Rapid state dispatches, continuous keystrokes, WebSocket events, and synthetic wrappers flooding the manager’s desk in real time.'
    },
    {
      id: 'center' as const,
      label: '2. Middle Manager: Virtual DOM',
      enLabel: 'Reconciliation Bottleneck',
      desc: 'Buried in stacks of paperwork (object tree allocations, deep diffing passes, Garbage Collection stalls). "I used to bring order!"'
    },
    {
      id: 'right' as const,
      label: '3. User Screen & Direct Solution',
      enLabel: "Direct-to-Screen Execution",
      desc: 'The user waits on an hourglass spinner. The frustrated engineer demands: "Just let it go directly to the screen!" — the core principle of Svelte, TSRX, and OctaneJS.'
    }
  ];

  const handleZoneClick = (zoneId: 'all' | 'left' | 'center' | 'right') => {
    setActiveZone(zoneId);
    playSound('switch', soundEnabled);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-4 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-2 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Visual Architectural Metaphor</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          The Virtual DOM as an Overloaded Middle Manager
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-mono mt-0.5">
          Why tree diffing became the bureaucratic bottleneck between application state and the user&apos;s screen
        </p>
      </div>

      {/* Main Image Showcase & Zone Selector */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch my-1">
        {/* Left 8 Cols: Framed Image */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-950/80 p-2.5 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
          <div className="relative flex-1 w-full h-full min-h-[220px] rounded-xl overflow-hidden bg-slate-900/60 flex items-center justify-center border border-slate-800/80">
            <img
              src="/assets/aistudio/Gemini_Generated_Image_wqfkn6wqfkn6wqfk_8dcc07ff.jpeg"
              alt="Middle Manager Virtual DOM Cartoon Illustration"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain max-h-[55vh] transition-transform duration-300 group-hover:scale-[1.01]"
            />

            {/* Zone Spotlight Overlays */}
            {activeZone === 'left' && (
              <div className="absolute inset-y-0 left-0 w-1/3 bg-cyan-500/10 border-r-2 border-cyan-400 pointer-events-none transition-all duration-300" />
            )}
            {activeZone === 'center' && (
              <div className="absolute inset-y-0 left-1/3 w-1/3 bg-rose-500/10 border-x-2 border-rose-500 pointer-events-none transition-all duration-300" />
            )}
            {activeZone === 'right' && (
              <div className="absolute inset-y-0 right-0 w-1/3 bg-emerald-500/10 border-l-2 border-emerald-400 pointer-events-none transition-all duration-300" />
            )}
          </div>

          <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-slate-400 shrink-0">
            <span>Illustration: The Middle Manager Virtual DOM</span>
            <span className="text-slate-400 hidden sm:inline">&quot;Just let it go directly to the screen!&quot;</span>
          </div>
        </div>

        {/* Right 4 Cols: Interactive Zone Callouts */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 flex flex-col justify-between">
          <div className="border-b border-slate-800 pb-2 mb-2 shrink-0">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-cyan-400" /> Interactive Zone Inspection:
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">Click any zone to examine the architectural metaphor</p>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto pr-1">
            {zones.map((z) => {
              const isSelected = activeZone === z.id;
              return (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => handleZoneClick(z.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-lg'
                      : 'border-slate-800/80 bg-slate-900/50 hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span>{z.label}</span>
                    <span className="text-[9px] font-mono text-slate-400">{z.enLabel}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                    {z.desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-cyan-300 bg-slate-900/80 p-2 rounded-lg shrink-0">
            <span className="font-bold block text-white mb-0.5">Core Architectural Takeaway:</span>
            In 2013, the Virtual DOM was hired to tame messy manual DOM updates. In 2026, it has become an overstaffed middle manager doing unnecessary paperwork.
          </div>
        </div>
      </div>

      {/* Footer Insight Banner */}
      <div className="mt-1 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center text-xs text-slate-300 font-mono shrink-0">
        <span className="text-emerald-400 font-bold">The Paradigm Shift:</span> Modern framework engineers ask: Why maintain an in-memory middle manager when an Ahead-Of-Time compiler can wire reactive state directly to DOM nodes in O(1) time?
      </div>
    </div>
  );
};
