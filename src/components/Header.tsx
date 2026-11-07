import React from 'react';
import { Cpu, LayoutGrid, Maximize2, Minimize2, Volume2, VolumeX, FileText } from 'lucide-react';

interface HeaderProps {
  currentSlide: number;
  totalSlides: number;
  slideTitle: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenOverview: () => void;
  onToggleNotes: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  totalSlides,
  slideTitle,
  soundEnabled,
  onToggleSound,
  onOpenOverview,
  onToggleNotes,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <header className="relative z-20 px-4 md:px-6 py-2.5 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md flex items-center justify-between shrink-0">
      <div className="flex items-center space-x-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
          <Cpu className="w-4 h-4 text-slate-950" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2 truncate">
            <span>Reimagining React Without the Virtual DOM</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 hidden sm:inline">
              Avi Levkovich
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-mono truncate">
            Slide {currentSlide} of {totalSlides}: {slideTitle}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-1.5 md:space-x-2 shrink-0">
        {/* Sound toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          title={soundEnabled ? "Mute interface sounds" : "Enable interface sounds"}
          className={`p-1.5 w-8 h-8 rounded-lg border text-xs transition flex items-center justify-center cursor-pointer ${
            soundEnabled
              ? 'border-cyan-800 bg-cyan-950/40 text-cyan-300'
              : 'border-slate-800 bg-slate-900/60 text-slate-500 hover:text-slate-300'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Presenter Notes toggle */}
        <button
          type="button"
          onClick={onToggleNotes}
          title="Speaker Notes & Architectural Deep Dive"
          className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs font-mono transition flex items-center gap-1.5 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden md:inline">Notes</span>
        </button>

        {/* Overview toggle */}
        <button
          type="button"
          onClick={onOpenOverview}
          title="View All Slides (O)"
          className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs font-mono transition flex items-center gap-1.5 cursor-pointer"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Overview (O)</span>
        </button>

        {/* Fullscreen toggle */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
          className="p-1.5 w-8 h-8 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs transition flex items-center justify-center cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
