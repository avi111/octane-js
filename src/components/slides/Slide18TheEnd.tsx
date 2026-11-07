import React from 'react';
import { RotateCcw, LayoutGrid, Film, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide18Props {
  soundEnabled: boolean;
  onRewind: () => void;
  onOpenOverview: () => void;
}

export const Slide18TheEnd: React.FC<Slide18Props> = ({ soundEnabled, onRewind, onOpenOverview }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center p-4 md:p-8 overflow-hidden bg-[#0a0806] text-[#e8ded1] font-serif select-none dir-ltr">
      {/* Film Grain & Vignette Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(40,32,24,0.15)_0%,rgba(6,5,4,0.95)_80%)] z-10" />
      
      {/* Vintage Projector Scratch Lines */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-[#d4c3b3]/15 scratch-line pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-1/3 w-[1px] bg-[#d4c3b3]/10 scratch-line pointer-events-none z-10" style={{ animationDelay: '0.18s' }} />

      {/* Decorative Ornate Vintage Frame */}
      <div className="relative z-20 w-full h-full max-w-4xl max-h-[82vh] border-4 border-[#b89f82]/60 rounded-xl p-4 md:p-8 flex flex-col justify-between items-center shadow-[inset_0_0_80px_rgba(0,0,0,0.95)] vintage-film bg-[#0f0d0a]/70">
        
        {/* Inner Art Deco Inset Border */}
        <div className="absolute inset-3 border border-[#b89f82]/30 pointer-events-none rounded-lg flex flex-col justify-between p-2">
          {/* Corner Deco Flourishes */}
          <div className="flex justify-between text-[#b89f82]/50 text-xs font-mono">
            <span>◆ ━</span>
            <span>━ ◆</span>
          </div>
          <div className="flex justify-between text-[#b89f82]/50 text-xs font-mono">
            <span>◆ ━</span>
            <span>━ ◆</span>
          </div>
        </div>

        {/* Vintage Top Banner */}
        <div className="text-center pt-2 shrink-0">
          <div className="flex items-center justify-center gap-2 text-[#cbb59d] text-xs md:text-sm tracking-[0.35em] uppercase font-mono font-medium">
            <span>★</span>
            <span>A Reactive Architecture Production</span>
            <span>★</span>
          </div>
          <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#b89f82]/50 to-transparent mx-auto mt-2" />
        </div>

        {/* Center Grand "The End" */}
        <div className="text-center my-auto space-y-4 py-4">
          <div className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-[#9c8974] font-mono">
            Reimagining React Without the Virtual DOM
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-widest text-[#f5ede2] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] italic">
            The End
          </h1>

          <div className="text-sm md:text-base text-[#b89f82] tracking-[0.3em] font-serif uppercase">
            ~ Fin ~
          </div>

          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#b89f82]/60 to-transparent mx-auto" />

          {/* Credits */}
          <div className="space-y-1 pt-1 font-serif">
            <div className="text-xs text-[#9c8974] uppercase tracking-widest font-mono">
              Presented &amp; Directed By
            </div>
            <div className="text-xl md:text-2xl font-bold text-[#f5ede2] tracking-wider">
              Avi Levkovich
            </div>
          </div>
        </div>

        {/* Vintage Footer & Replay Action */}
        <div className="w-full text-center pb-2 shrink-0 space-y-3">
          <div className="text-[11px] text-[#9c8974] font-mono tracking-widest uppercase">
            Thank you for attending • Questions &amp; Open Discussion
          </div>

          <div className="flex items-center justify-center gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                playSound('step', soundEnabled);
                onRewind();
              }}
              className="px-4 py-2 rounded-lg bg-[#241e17] hover:bg-[#332a21] border border-[#b89f82]/50 text-[#e8ded1] transition flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#d4c3b3]" />
              <span>Rewind to Beginning (Slide 1)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound('switch', soundEnabled);
                onOpenOverview();
              }}
              className="px-4 py-2 rounded-lg bg-[#241e17] hover:bg-[#332a21] border border-[#b89f82]/50 text-[#e8ded1] transition flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#d4c3b3]" />
              <span>Overview (O)</span>
            </button>
          </div>

          <div className="text-[10px] text-[#6b5d4f] font-mono tracking-widest pt-1">
            MMXXVI • ALL PRINTS PRESERVED • O(1) RUNTIME
          </div>
        </div>
      </div>
    </div>
  );
};
