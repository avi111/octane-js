import React, { useState } from 'react';
import { RefreshCw, Check, Copy, ArrowRight, Zap, Layers, Cpu } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide7MemoCallback: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const memoCode = `// 1. useMemo: Cache Expensive Computation
const processed = useMemo(() => {
  return heavyCalculation(rawData, filterQuery);
}, [rawData, filterQuery]); // Recomputes only when deps change

// 2. useCallback: Preserve Function Reference Identity
const handleSelect = useCallback((itemId) => {
  dispatch({ type: 'SELECT_ROW', id: itemId });
}, []); // Stable pointer: stops <DataTable> from re-rendering

return <DataTable data={processed} onSelect={handleSelect} />;`;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    playSound('success', soundEnabled);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2.5 sm:p-4 md:p-5 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="shrink-0 mb-1 sm:mb-2 pb-1.5 border-b border-slate-800/80">
        <span className="text-[11px] sm:text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
          Pillar 02 // Developer Experience Breakdown
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mt-0.5">
          Minimizing Re-Renders: useMemo &amp; useCallback
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-mono mt-0.5">
          Why top-down function re-execution forced React into manual reference caching
        </p>
      </div>

      {/* 2-Column Layout: Left (3 Explanation Boxes) | Right (Enlarged Code Example) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 md:gap-4 flex-1 min-h-0 my-1 items-stretch">
        {/* Left Side (5 Cols): 3 Compact Explanation Boxes (Guaranteed No Overflow) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-2 min-h-0 h-full">
          {/* Box 1 */}
          <div className="p-2.5 sm:p-3 rounded-xl border border-cyan-500/40 bg-slate-950/90 shadow-md flex-1 min-h-0 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                THE RE-RENDER PROBLEM
              </span>
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <h3 className="text-sm sm:text-base font-black text-white font-mono mt-0.5">
              Function Re-Execution Tax
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-mono leading-snug">
              Every state change re-executes component functions, reallocating inline closures and objects with new memory references.
            </p>
          </div>

          {/* Box 2 */}
          <div className="p-2.5 sm:p-3 rounded-xl border border-sky-500/40 bg-slate-950/90 shadow-md flex-1 min-h-0 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                CASCADING RE-RENDERS
              </span>
              <Layers className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <h3 className="text-sm sm:text-base font-black text-white font-mono mt-0.5">
              Breaking React.memo
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-mono leading-snug">
              Passing new object or function references into children invalidates <code>React.memo</code>, triggering cascading subtree diffs.
            </p>
          </div>

          {/* Box 3 */}
          <div className="p-2.5 sm:p-3 rounded-xl border border-purple-500/40 bg-slate-950/90 shadow-md flex-1 min-h-0 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                WHAT ARE DEPENDENCIES?
              </span>
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <h3 className="text-sm sm:text-base font-black text-white font-mono mt-0.5">
              Shallow [deps] Equality
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-mono leading-snug">
              React runs shallow <code>Object.is</code> equality checks across renders to determine whether to reuse cached results or recompute.
            </p>
          </div>
        </div>

        {/* Right Side (7 Cols): Clean Enlarged Code Card */}
        <div className="lg:col-span-7 rounded-2xl border border-cyan-500/50 bg-slate-950/95 p-3 sm:p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-cyan-900/50 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                Code Demonstration
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                useMemo &amp; useCallback
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(memoCode, 'memo')}
              className="px-2.5 py-1 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition cursor-pointer bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {copiedCode === 'memo' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode === 'memo' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Clean Code Box with Zero Text Overlap */}
          <div className="flex-1 min-h-0 my-2 bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 flex items-center overflow-auto">
            <pre className="w-full font-mono text-xs sm:text-[13px] md:text-sm leading-relaxed text-cyan-200">
              <code>{memoCode}</code>
            </pre>
          </div>

          {/* Bottom Card Summary */}
          <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300 flex items-center justify-between shrink-0">
            <span className="text-cyan-300 font-semibold truncate">
              Goal: Stabilize references to avoid unneeded child component diffing.
            </span>
            <span className="text-slate-400 shrink-0 ml-2">Slide 7 of 14</span>
          </div>
        </div>
      </div>

      {/* Bottom Key Takeaway linking directly to Slide 8 */}
      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-[13px] font-mono text-slate-300 flex items-center justify-between shrink-0 mt-1">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong className="text-white">The Catch:</strong> To prevent re-renders, developers were forced into manual dependency array management.
          </span>
        </div>
        <span className="text-rose-400 font-bold hidden sm:inline flex items-center gap-1 shrink-0">
          Next: The Dependency Terror <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
