import React, { useState } from 'react';
import { LayoutGrid, X, Search, CheckCircle } from 'lucide-react';
import { SlideMeta } from '../types/presentation';

interface OverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  slides: SlideMeta[];
  onSelectSlide: (n: number) => void;
}

export const OverviewModal: React.FC<OverviewModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
  slides,
  onSelectSlide,
}) => {
  const [search, setSearch] = useState<string>('');

  if (!isOpen) return null;

  const filteredSlides = slides.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      (s.phase && s.phase.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-center items-center p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="max-w-5xl w-full flex flex-col max-h-[85vh] bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm md:text-base font-bold font-mono text-white">
              All Slides Overview
            </h3>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              (Press O or Esc to Close)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick search */}
            <div className="relative w-44 md:w-56">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search slides..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <button
              type="button"
              onClick={onClose}
              title="Close overview"
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid of slides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto p-1 my-3 flex-1">
          {filteredSlides.map((s) => {
            const isActive = s.id === currentSlide;
            return (
              <div
                key={s.id}
                onClick={() => {
                  onSelectSlide(s.id);
                  onClose();
                }}
                className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between group ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                      #{s.id.toString().padStart(2, '0')}
                    </span>
                    {isActive ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" /> ACTIVE
                      </span>
                    ) : (
                      s.phase && (
                        <span className="text-[8px] font-mono text-slate-500 uppercase truncate max-w-[120px]">
                          {s.phase}
                        </span>
                      )
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-2 leading-snug">
                    {s.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-normal font-mono">
                    {s.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-2.5 pt-1.5 border-t border-slate-800/80">
                  {s.tags.slice(0, 2).map((t, tidx) => (
                    <span
                      key={tidx}
                      className="text-[9px] font-mono text-slate-400 bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filteredSlides.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            No slides matched &quot;{search}&quot;.
          </div>
        )}
      </div>
    </div>
  );
};
