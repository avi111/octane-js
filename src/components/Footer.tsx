import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SlideMeta } from '../types/presentation';
import { KeynoteTimer } from './KeynoteTimer';

interface FooterProps {
  currentSlide: number;
  totalSlides: number;
  slides: SlideMeta[];
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (n: number) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentSlide,
  totalSlides,
  slides,
  onPrev,
  onNext,
  onSelectSlide,
}) => {
  return (
    <footer className="relative z-20 px-3 md:px-6 py-2 border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md flex items-center justify-between text-xs text-slate-400 font-mono shrink-0">
      {/* Left side: 10m Decreasing Countdown Timer & Slide count */}
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        <KeynoteTimer initialSeconds={600} />

        <div className="flex items-center space-x-1.5 hidden sm:flex">
          <span>
            Slide <span className="text-white font-bold">{currentSlide}</span> of{' '}
            <span className="text-slate-300">{totalSlides}</span>
          </span>
          <span className="text-slate-600 hidden lg:inline">•</span>
          <span className="hidden lg:inline text-slate-500">
            ← → or Space
          </span>
        </div>
      </div>

      {/* Center: Slide Dots / Indicators */}
      <div className="flex items-center space-x-1.5 overflow-x-auto max-w-[40vw] py-1 px-1">
        {slides.map((s) => {
          const isActive = s.id === currentSlide;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelectSlide(s.id)}
              title={`Slide ${s.id}: ${s.title}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-5 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          );
        })}
      </div>

      {/* Right side: Prev / Next Buttons */}
      <div className="flex items-center space-x-2 shrink-0">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentSlide <= 1}
          title="Previous Slide (←)"
          className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 transition flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={currentSlide >= totalSlides}
          title="Next Slide (→)"
          className="px-2.5 py-1 rounded-lg border border-cyan-500/40 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 transition flex items-center gap-1 font-bold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
