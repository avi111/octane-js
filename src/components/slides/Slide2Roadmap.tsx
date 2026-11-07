import React, { useState } from 'react';
import { Compass, AlertTriangle, Zap, Flag, ArrowRight, FolderOpen, CheckCircle2 } from 'lucide-react';
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
      drawerNum: "PILLAR 01",
      pillar: "Context",
      title: "Where We Came From",
      subtitle: "jQuery Desync & The React Revolution",
      accent: "cyan",
      borderColor: "border-cyan-500/40",
      bgColor: "bg-cyan-950/30",
      textColor: "text-cyan-300",
      icon: Compass,
      targetSlide: 4,
      targetSlideText: "Jump to Slide 4 (Context)",
      points: [
        "Imperative DOM queries created chronic desync between UI and memory.",
        "Two-way binding loops in Knockout & Angular caused cascading domino crashes.",
        "React introduced one-way data flow and UI = f(State) in 2013 to restore sanity."
      ]
    },
    {
      id: 2,
      drawerNum: "PILLAR 02",
      pillar: "The Ceiling",
      title: "Why the V-DOM Stalls",
      subtitle: "54ms Diffing, GC Freezes & Hook Terror",
      accent: "rose",
      borderColor: "border-rose-500/40",
      bgColor: "bg-rose-950/30",
      textColor: "text-rose-300",
      icon: AlertTriangle,
      targetSlide: 5,
      targetSlideText: "Jump to Slide 5 (The Ceiling)",
      points: [
        "Every keystroke allocates temporary object trees and synthetic event wrappers.",
        "Garbage Collection pauses cause frame drops while O(t) diffing scales with tree size.",
        "'Hook Terror': Developers forced to manually audit useMemo and useCallback arrays."
      ]
    },
    {
      id: 3,
      drawerNum: "PILLAR 03",
      pillar: "The Solution",
      title: "Direct DOM Revolution",
      subtitle: "Svelte, Dominic Gannaway's TSRX & OctaneJS O(1)",
      accent: "purple",
      borderColor: "border-purple-500/40",
      bgColor: "bg-purple-950/30",
      textColor: "text-purple-300",
      icon: Zap,
      targetSlide: 7,
      targetSlideText: "Jump to Slide 7 (TSRX & Octane)",
      points: [
        "Svelte proved that the Virtual DOM is not an architectural necessity.",
        "TSRX brings compiler statements (@if, @for) and hoists hooks out of rigid rules.",
        "OctaneJS shifts algorithmic complexity from O(t) tree diffing to O(1) direct mutation."
      ]
    },
    {
      id: 4,
      drawerNum: "PILLAR 04",
      pillar: "Adoption",
      title: "How to Apply Tomorrow",
      subtitle: "Incremental Adoption via OctaneCompat & ReactCompat",
      accent: "emerald",
      borderColor: "border-emerald-500/40",
      bgColor: "bg-emerald-950/30",
      textColor: "text-emerald-300",
      icon: Flag,
      targetSlide: 9,
      targetSlideText: "Jump to Slide 9 (Adoption)",
      points: [
        "Zero greenfield rewrite risk: Isolate high-frequency bottlenecks with OctaneCompat.",
        "Preserve existing ecosystem: Run legacy React charts & canvases inside ReactCompat.",
        "Best of both worlds: Familiar JSX developer ergonomics with raw compiled O(1) speed."
      ]
    }
  ];

  const current = drawers.find((d) => d.id === selectedDrawer) || drawers[0];

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-5 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-2 shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 mb-1">
          <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>The 10-Minute Roadmap // 4 Strategic Pillars</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Four Pillars of Reactive Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-300 font-mono mt-0.5">
          From Pre-React DOM Chaos to Direct O(1) Mutation in 10 Minutes
        </p>
      </div>

      {/* 4 Large Drawers Row */}
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
              className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? `${d.borderColor} ${d.bgColor} shadow-xl scale-[1.02] ring-2 ring-cyan-500/50`
                  : 'border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400">
                  {d.drawerNum} • {d.pillar}
                </span>
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-slate-900 text-white shadow' : 'bg-slate-950 text-slate-400 group-hover:text-slate-200'}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {d.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {d.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className={isSelected ? d.textColor : 'text-slate-400'}>
                  {isSelected ? 'Active Focus' : 'Click to inspect'}
                </span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1' : 'text-slate-600'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Drawer Spotlight Card (BIG READABLE TEXT) */}
      <div className={`flex-1 rounded-2xl border ${current.borderColor} ${current.bgColor} p-4 md:p-6 flex flex-col justify-between min-h-0 relative overflow-hidden backdrop-blur-sm shadow-2xl`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-white shadow-lg">
              <current.icon className={`w-6 h-6 ${current.textColor}`} />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                {current.drawerNum} • {current.pillar}
              </span>
              <h4 className="text-lg md:text-xl font-black text-white mt-1">{current.title} &mdash; {current.subtitle}</h4>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click', soundEnabled);
              onJumpToSlide(current.targetSlide);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-600/30 cursor-pointer active:scale-95 shrink-0"
          >
            <span>{current.targetSlideText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Big High-Impact Bullet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-auto py-2">
          {current.points.map((point, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/85 border border-slate-800/90 space-y-2 flex flex-col justify-between shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">Key Takeaway</span>
              </div>
              <p className="text-sm md:text-base text-slate-100 leading-relaxed font-sans font-medium">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* Takeaway footer bar */}
        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <span className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Succinct 4-Pillar Keynote Progression</span>
          </span>
          <span className="hidden sm:inline text-slate-400">Press Space or Next to inspect the V-DOM Middle Manager metaphor</span>
        </div>
      </div>
    </div>
  );
};
