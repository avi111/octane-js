import React, { useState } from 'react';
import { ArrowDownRight, RefreshCw, Layers, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide5VirtualDOMAdvantages: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [selectedAdvantage, setSelectedAdvantage] = useState<number | null>(null);

  const advantages = [
    {
      id: 1,
      num: "01",
      title: "Unidirectional Flow",
      subtitle: "Better Debuggability",
      accent: "cyan",
      borderColor: "border-cyan-500/50 hover:border-cyan-400",
      bgColor: "bg-cyan-950/40 hover:bg-cyan-950/60",
      badgeBg: "bg-cyan-950 text-cyan-300 border-cyan-800",
      textColor: "text-cyan-400",
      icon: ArrowDownRight,
      headline: "Predictable Top-Down State Flow (Parent → Child)"
    },
    {
      id: 2,
      num: "02",
      title: "Avoiding Digest Cycle",
      subtitle: "Faster App & Linear Renders",
      accent: "emerald",
      borderColor: "border-emerald-500/50 hover:border-emerald-400",
      bgColor: "bg-emerald-950/40 hover:bg-emerald-950/60",
      badgeBg: "bg-emerald-950 text-emerald-300 border-emerald-800",
      textColor: "text-emerald-400",
      icon: RefreshCw,
      headline: "Zero Angular 1.x Cascading Dirty-Checking Loops"
    },
    {
      id: 3,
      num: "03",
      title: "Synthetic Events",
      subtitle: "Unifying Browser Quirks",
      accent: "purple",
      borderColor: "border-purple-500/50 hover:border-purple-400",
      bgColor: "bg-purple-950/40 hover:bg-purple-950/60",
      badgeBg: "bg-purple-950 text-purple-300 border-purple-800",
      textColor: "text-purple-400",
      icon: Layers,
      headline: "Cross-Browser Normalization & Root Delegation"
    },
    {
      id: 4,
      num: "04",
      title: "UI = f(State)",
      subtitle: "Components as Pure Functions",
      accent: "amber",
      borderColor: "border-amber-500/50 hover:border-amber-400",
      bgColor: "bg-amber-950/40 hover:bg-amber-950/60",
      badgeBg: "bg-amber-950 text-amber-300 border-amber-800",
      textColor: "text-amber-400",
      icon: Sparkles,
      headline: "Declarative Mental Model: Pass State In, Get UI Out"
    }
  ];

  return (
    <div className="flex flex-col justify-between w-full h-full p-3 md:p-6 overflow-hidden text-left dir-ltr">
      {/* Header */}
      <div className="text-center mb-2 md:mb-3 shrink-0">
        <span className="text-xs md:text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest block">
          Pillar 01 // The Virtual DOM Revolution
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-0.5">
          Why React Won: The 4 Breakthroughs of the Virtual DOM
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-mono mt-0.5">
          Before examining the scale ceiling, why did the V-DOM bring order to the chaotic web in 2013?
        </p>
      </div>

      {/* 4 Proportionate Advantage Cards (Stays comfortably inside viewport with zero overflow) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1 min-h-0 my-1 items-stretch">
        {advantages.map((adv) => {
          const Icon = adv.icon;
          const isSelected = selectedAdvantage === adv.id;
          return (
            <div
              key={adv.id}
              onClick={() => {
                setSelectedAdvantage(isSelected ? null : adv.id);
                playSound('switch', soundEnabled);
              }}
              className={`p-4 md:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-xl backdrop-blur-md ${adv.borderColor} ${adv.bgColor} ${
                isSelected ? 'ring-2 ring-cyan-400 scale-[1.01]' : 'hover:scale-[1.01]'
              }`}
            >
              {/* Card Top: Badges & Icon */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] md:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${adv.badgeBg}`}>
                  BREAKTHROUGH {adv.num}
                </span>
                <div className="p-2 rounded-xl bg-slate-900/90 text-white border border-slate-800 shadow group-hover:scale-105 transition-transform">
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${adv.textColor}`} />
                </div>
              </div>

              {/* Title and Subtitle with ample headroom */}
              <div className="my-auto py-2 space-y-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight group-hover:text-cyan-300 transition-colors">
                  {adv.num}. {adv.title}
                </h3>
                <div className={`text-sm sm:text-base md:text-lg font-bold font-mono ${adv.textColor}`}>
                  {adv.subtitle}
                </div>
              </div>

              {/* Short 1-Line Key Takeaway */}
              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-xs sm:text-sm font-semibold text-slate-300 font-mono">
                  {adv.headline}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
