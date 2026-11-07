import React, { useState } from 'react';
import { Compass, AlertTriangle, Zap, Flag, ArrowRight, Layers, Sparkles, FolderOpen, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide2RoadmapProps {
  soundEnabled: boolean;
  onJumpToSlide: (slideId: number) => void;
}

export const Slide2Roadmap: React.FC<Slide2RoadmapProps> = ({ soundEnabled, onJumpToSlide }) => {
  const [selectedDrawer, setSelectedDrawer] = useState<number>(1);

  const drawers = [
    {
      id: 1,
      drawerNum: "Drawer 1",
      pillar: "Context",
      title: "Where Did We Come From?",
      subtitle: "The jQuery Chaos & The React Revolution",
      accent: "cyan",
      borderColor: "border-cyan-500/40",
      bgColor: "bg-cyan-950/20",
      textColor: "text-cyan-300",
      icon: Compass,
      targetSlide: 4,
      targetSlideText: "Jump to Slide 4: State Architecture",
      points: [
        "The pain of imperative jQuery: Manual DOM queries and DOM mutations created chronic state desynchronization.",
        "Early MVC breakdowns: Two-way binding cycles in Knockout and AngularJS triggered cascading domino loops.",
        "React's 2013 breakthrough: Introducing unidirectional data flow and establishing UI as a pure function: UI = f(State)."
      ]
    },
    {
      id: 2,
      drawerNum: "Drawer 2",
      pillar: "Challenge",
      title: "Why the Virtual DOM Stalls at Scale",
      subtitle: "CPU/Memory Overhead & Hook Terror",
      accent: "rose",
      borderColor: "border-rose-500/40",
      bgColor: "bg-rose-950/20",
      textColor: "text-rose-300",
      icon: AlertTriangle,
      targetSlide: 6,
      targetSlideText: "Jump to Slide 6: VDOM Timeline Cost",
      points: [
        "Massive heap allocations: Keystrokes allocate temporary object trees, wrappers, and synthetic events.",
        "Garbage Collection thrash causes micro-stalls, while tree diffing incurs O(t) algorithmic overhead proportional to tree size.",
        "'Hook Terror': Developers forced to manually audit useMemo and useCallback dependency arrays to prevent render loops."
      ]
    },
    {
      id: 3,
      drawerNum: "Drawer 3",
      pillar: "Outcome",
      title: "The Next Generation",
      subtitle: "Eliminating the V-DOM for Direct DOM Mutation",
      accent: "purple",
      borderColor: "border-purple-500/40",
      bgColor: "bg-purple-950/20",
      textColor: "text-purple-300",
      icon: Zap,
      targetSlide: 11,
      targetSlideText: "Jump to Slide 11: Hook Terror & Svelte",
      points: [
        "Ahead-Of-Time compilers: Svelte demonstrated that the Virtual DOM abstraction is pure runtime overhead.",
        "Dominic Gannaway & TSRX: Native language directives (@if, @for), compiler hoisting, and abolition of the Rules of Hooks.",
        "OctaneJS complexity breakthrough: Transforming O(t) subtree diffing into O(1) constant-time direct DOM mutation via template cloning."
      ]
    },
    {
      id: 4,
      drawerNum: "Drawer 4",
      pillar: "Meaning",
      title: "How Do We Implement Tomorrow Morning?",
      subtitle: "Incremental Migration Without Full Rewrites",
      accent: "emerald",
      borderColor: "border-emerald-500/40",
      bgColor: "bg-emerald-950/20",
      textColor: "text-emerald-300",
      icon: Flag,
      targetSlide: 16,
      targetSlideText: "Jump to Slide 16: Migration Wrappers",
      points: [
        "Zero all-or-nothing rewrite risk: Deploy OctaneCompat to accelerate critical high-frequency UI bottlenecks inside existing React apps.",
        "Ecosystem preservation: Deploy ReactCompat to host complex third-party React libraries (charts, 3D canvases) inside modern Octane apps.",
        "The modern consensus: Combining the familiar developer ergonomics of React with raw compiled O(1) performance."
      ]
    }
  ];

  const current = drawers.find((d) => d.id === selectedDrawer) || drawers[0];

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-4 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-2 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 mb-1">
          <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>The Keynote Roadmap // Four Architectural Pillars</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Four Core Drawers of Reactive Architecture
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-mono mt-0.5">
          From Imperative Selectors and V-DOM Overhead to Fine-Grained Signals, TSRX, and OctaneJS
        </p>
      </div>

      {/* 4 Drawers Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-2 shrink-0">
        {drawers.map((d) => {
          const Icon = d.icon;
          const isSelected = selectedDrawer === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                setSelectedDrawer(d.id);
                playSound('switch', soundEnabled);
              }}
              className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? `${d.borderColor} ${d.bgColor} shadow-lg shadow-black/50 scale-[1.02] ring-1 ring-cyan-500/50`
                  : 'border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/90 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                  {d.drawerNum} • {d.pillar}
                </span>
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-slate-900 text-white' : 'bg-slate-950 text-slate-400 group-hover:text-slate-200'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                  {d.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {d.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                <span className={isSelected ? d.textColor : 'text-slate-500'}>
                  {isSelected ? 'Selected (Active)' : 'Click to inspect'}
                </span>
                <ArrowRight className={`w-3 h-3 transition-transform ${isSelected ? 'translate-x-0.5' : 'text-slate-600'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Drawer Deep-Dive Spotlight Card */}
      <div className={`flex-1 rounded-2xl border ${current.borderColor} ${current.bgColor} p-4 md:p-5 flex flex-col justify-between min-h-0 relative overflow-hidden backdrop-blur-sm shadow-xl`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-white shadow">
              <current.icon className={`w-5 h-5 ${current.textColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  {current.drawerNum}: {current.pillar}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden md:inline">{current.subtitle}</span>
              </div>
              <h4 className="text-base md:text-lg font-bold text-white mt-0.5">{current.title}</h4>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click', soundEnabled);
              onJumpToSlide(current.targetSlide);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 transition shadow-lg shadow-cyan-600/30 cursor-pointer active:scale-95 shrink-0"
          >
            <span>{current.targetSlideText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Detailed bullet list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-auto py-2">
          {current.points.map((point, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">Key Takeaway</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* Takeaway footer bar */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Structured progression: Problem &rarr; Bottleneck &rarr; Architecture &rarr; Migration</span>
          </span>
          <span className="hidden sm:inline text-slate-500">Press Space or Next to inspect the Middle Manager illustration</span>
        </div>
      </div>
    </div>
  );
};
