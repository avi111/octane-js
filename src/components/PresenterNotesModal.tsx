import React from 'react';
import { FileText, X, CheckCircle2, ArrowRight, Lightbulb, Keyboard } from 'lucide-react';
import { SlideMeta } from '../types/presentation';

interface PresenterNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlideData: SlideMeta;
  nextSlideData?: SlideMeta;
  onGoToNext: () => void;
}

export const PresenterNotesModal: React.FC<PresenterNotesModalProps> = ({
  isOpen,
  onClose,
  currentSlideData,
  nextSlideData,
  onGoToNext,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-slate-950 border-l border-slate-800 p-5 flex flex-col justify-between shadow-2xl relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold font-mono text-white">Presenter Talking Points</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Slide Info */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 font-bold block">
              SLIDE #{currentSlideData.id.toString().padStart(2, '0')} • {currentSlideData.phase || 'OVERVIEW'}
            </span>
            <h4 className="text-sm font-bold text-white">{currentSlideData.title}</h4>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{currentSlideData.subtitle}</p>
          </div>

          {/* Key Talking Points */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Speaker Guidance &amp; Insights
            </span>
            <div className="space-y-2.5">
              {currentSlideData.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="w-4 h-4 rounded-full bg-purple-950 border border-purple-700 text-purple-300 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Slide Preview */}
          {nextSlideData && (
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Up Next: Slide #{nextSlideData.id}
              </span>
              <p className="text-xs font-semibold text-slate-200">{nextSlideData.title}</p>
              <button
                type="button"
                onClick={() => {
                  onGoToNext();
                  onClose();
                }}
                className="w-full py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Advance to Next Slide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Keyboard Cheat Sheet */}
        <div className="pt-4 border-t border-slate-800/80 mt-4 text-[11px] font-mono text-slate-400 space-y-1.5">
          <div className="flex items-center gap-1 text-slate-300 font-bold mb-1">
            <Keyboard className="w-3.5 h-3.5 text-slate-400" /> Keyboard Shortcuts
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <div><span className="text-white font-bold">← / →</span> : Prev / Next</div>
            <div><span className="text-white font-bold">Space</span> : Step / Next</div>
            <div><span className="text-white font-bold">O</span> : Slides Overview</div>
            <div><span className="text-white font-bold">F</span> : Fullscreen</div>
          </div>
        </div>
      </div>
    </div>
  );
};
