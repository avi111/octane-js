import React from 'react';
import { Compass, AlertTriangle, Zap, Flag, ArrowRight, FolderOpen } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide2RoadmapProps {
  soundEnabled: boolean;
  onJumpToSlide: (slideId: number) => void;
}

export const Slide2Roadmap: React.FC<Slide2RoadmapProps> = ({ soundEnabled, onJumpToSlide }) => {
  const pillars = [
    {
      id: 1,
      drawerNum: "PILLAR 01",
      pillar: "Context",
      title: "Where We Came From?",
      subtitle: "jQuery Desync & The React Revolution",
      accent: "cyan",
      borderColor: "border-cyan-500/50 hover:border-cyan-400",
      bgColor: "bg-cyan-950/40 hover:bg-cyan-950/60",
      badgeBg: "bg-cyan-950 text-cyan-300 border-cyan-800",
      textColor: "text-cyan-400",
      btnBg: "bg-cyan-500 hover:bg-cyan-400 text-slate-950",
      icon: Compass,
      targetSlide: 4,
      targetSlideText: "Slide 4"
    },
    {
      id: 2,
      drawerNum: "PILLAR 02",
      pillar: "The Ceiling",
      title: "Why the V-DOM Stalls",
      subtitle: "54ms Diffing, GC Freezes & Hook Terror",
      accent: "rose",
      borderColor: "border-rose-500/50 hover:border-rose-400",
      bgColor: "bg-rose-950/40 hover:bg-rose-950/60",
      badgeBg: "bg-rose-950 text-rose-300 border-rose-800",
      textColor: "text-rose-400",
      btnBg: "bg-rose-500 hover:bg-rose-400 text-slate-950",
      icon: AlertTriangle,
      targetSlide: 6,
      targetSlideText: "Slide 6"
    },
    {
      id: 3,
      drawerNum: "PILLAR 03",
      pillar: "The Solution",
      title: "Direct DOM Revolution",
      subtitle: "Svelte, Dominic Gannaway's TSRX & OctaneJS O(1)",
      accent: "purple",
      borderColor: "border-purple-500/50 hover:border-purple-400",
      bgColor: "bg-purple-950/40 hover:bg-purple-950/60",
      badgeBg: "bg-purple-950 text-purple-300 border-purple-800",
      textColor: "text-purple-400",
      btnBg: "bg-purple-500 hover:bg-purple-400 text-slate-950",
      icon: Zap,
      targetSlide: 8,
      targetSlideText: "Slide 8"
    },
    {
      id: 4,
      drawerNum: "PILLAR 04",
      pillar: "Adoption",
      title: "How to Apply Tomorrow",
      subtitle: "Incremental Adoption via OctaneCompat & ReactCompat",
      accent: "emerald",
      borderColor: "border-emerald-500/50 hover:border-emerald-400",
      bgColor: "bg-emerald-950/40 hover:bg-emerald-950/60",
      badgeBg: "bg-emerald-950 text-emerald-300 border-emerald-800",
      textColor: "text-emerald-400",
      btnBg: "bg-emerald-500 hover:bg-emerald-400 text-slate-950",
      icon: Flag,
      targetSlide: 11,
      targetSlideText: "Slide 11"
    }
  ];

  return (
    <div className="flex flex-col justify-between w-full h-full p-3 md:p-6 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-2 md:mb-3 shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 mb-1 shadow-sm">
          <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>The 10-Minute Roadmap // 4 Strategic Pillars</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
          Four Pillars of Reactive Architecture
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-mono mt-0.5">
          From Pre-React DOM Chaos to Direct O(1) Mutation in 10 Minutes
        </p>
      </div>

      {/* 4 Proportionate Pillar Boxes (Clean Titles, No Bullets, No Overlap) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 flex-1 min-h-0 my-2 items-stretch">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              onClick={() => {
                playSound('click', soundEnabled);
                onJumpToSlide(p.targetSlide);
              }}
              className={`p-4 md:p-5 lg:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative shadow-xl backdrop-blur-md cursor-pointer group hover:scale-[1.01] ${p.borderColor} ${p.bgColor}`}
            >
              {/* Top Header: Badge + Icon */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] md:text-xs font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${p.badgeBg}`}>
                  {p.drawerNum} • {p.pillar}
                </span>
                <div className="p-2 rounded-xl bg-slate-900/90 text-white border border-slate-800 shadow group-hover:scale-105 transition-transform">
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${p.textColor}`} />
                </div>
              </div>

              {/* Big, Clean Title & Subtitle with plenty of vertical headroom */}
              <div className="my-auto py-3 space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-cyan-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-medium text-slate-300 leading-snug">
                  {p.subtitle}
                </p>
              </div>

              {/* Action Button at bottom */}
              <div className="pt-3 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound('click', soundEnabled);
                    onJumpToSlide(p.targetSlide);
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold font-mono text-xs md:text-sm flex items-center justify-center gap-2 transition shadow-lg cursor-pointer active:scale-95 ${p.btnBg}`}
                >
                  <span>Go to {p.targetSlideText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
