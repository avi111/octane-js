import React, { useState } from 'react';
import { ShieldAlert, RefreshCw, Check, Copy, AlertTriangle, ArrowRight } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide8HookTerror: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const memoCode = `// 1. Fighting V-DOM Cascading Re-Renders
function Dashboard({ items, query }) {
  // useMemo: Caches expensive computation results
  const sorted = useMemo(() => {
    return heavySort(items, query);
  }, [items, query]); // <-- Shallow Object.is check

  // useCallback: Caches function instance identity
  const onSelect = useCallback((id) => {
    dispatch({ type: 'SELECT', id });
  }, []); // Stable reference for memoized children
}`;

  const terrorCode = `// 2. The Strict Regime & Catch-22 Trap
function FilterPanel({ filters, onSearch }) {
  useEffect(() => {
    fetchResults(filters);
  }, []); // BUG: Stale closure! Reads initial 'filters' forever

  // The Catch-22:
  // Adding [filters] causes an INFINITE RE-RENDER LOOP
  // unless parent also wraps 'filters' in useMemo!
}`;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    playSound('success', soundEnabled);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2.5 md:p-5 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-1 shrink-0">
        <span className="text-xs md:text-sm font-mono font-bold text-amber-400 uppercase tracking-widest block">
          Pillar 02 // Developer Experience Breakdown
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-0.5">
          The &ldquo;Dependency Terror&rdquo;: useMemo, useCallback &amp; The Strict Regime
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-mono mt-0.5">
          How fighting Virtual DOM re-renders created a strict dependency prison—and sparked Svelte&apos;s rebellion
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1 min-h-0 my-1 items-stretch">
        {/* Left Column: Minimizing Re-renders */}
        <div className="p-3 md:p-3.5 rounded-2xl bg-slate-950/90 border border-cyan-500/50 flex flex-col justify-between shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-cyan-900/50 shrink-0">
            <h3 className="text-sm md:text-base font-black text-cyan-300 font-mono flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>1. Minimizing Re-renders: useMemo &amp; useCallback</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              Runtime Caching
            </span>
          </div>

          {/* Small Explanation Boxes Side by Side */}
          <div className="grid grid-cols-2 gap-2 my-1.5 shrink-0 font-mono">
            <div className="p-2 rounded-xl bg-slate-900/95 border border-slate-800">
              <span className="text-[10px] text-cyan-400 uppercase font-bold block">The Re-render Tax</span>
              <p className="text-[11px] md:text-xs text-slate-200 mt-0.5 font-medium leading-snug">
                Every render reallocates all functions &amp; objects, triggering child diffing.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/95 border border-slate-800">
              <span className="text-[10px] text-cyan-400 uppercase font-bold block">What are [deps]?</span>
              <p className="text-[11px] md:text-xs text-slate-200 mt-0.5 font-medium leading-snug">
                <code>Object.is</code> equality array telling React when to recompute or reuse cache.
              </p>
            </div>
          </div>

          {/* Code Box: Reduced by 1-2 steps to text-xs sm:text-sm with leading-snug */}
          <div className="relative flex-1 rounded-xl bg-slate-900/95 p-3 font-mono text-xs sm:text-sm leading-snug text-cyan-200 border border-slate-800 flex flex-col justify-center shadow-inner">
            <button
              type="button"
              onClick={() => handleCopy(memoCode, 'memo')}
              className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
            >
              {copiedCode === 'memo' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode === 'memo' ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="overflow-x-auto">
              <code>{memoCode}</code>
            </pre>
          </div>
        </div>

        {/* Right Column: The Dependency Terror */}
        <div className="p-3 md:p-3.5 rounded-2xl bg-slate-950/90 border border-rose-500/50 flex flex-col justify-between shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-rose-900/50 shrink-0">
            <h3 className="text-sm md:text-base font-black text-rose-400 font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
              <span>2. The Strict Regime That Sparked Svelte</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
              The Catch-22
            </span>
          </div>

          {/* Small Explanation Boxes Side by Side */}
          <div className="grid grid-cols-2 gap-2 my-1.5 shrink-0 font-mono">
            <div className="p-2 rounded-xl bg-slate-900/95 border border-slate-800">
              <span className="text-[10px] text-rose-400 uppercase font-bold block">The Catch-22 Trap</span>
              <p className="text-[11px] md:text-xs text-slate-200 mt-0.5 font-medium leading-snug">
                Miss a dep = stale closure bug. Include an object = infinite re-render loop.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/95 border border-slate-800">
              <span className="text-[10px] text-emerald-400 uppercase font-bold block">Svelte&apos;s Rebellion</span>
              <p className="text-[11px] md:text-xs text-slate-200 mt-0.5 font-medium leading-snug">
                Declared V-DOM bad practice: AOT compiler tracks reactive dependencies automatically.
              </p>
            </div>
          </div>

          {/* Code Box: Reduced by 1-2 steps to text-xs sm:text-sm with leading-snug */}
          <div className="relative flex-1 rounded-xl bg-slate-900/95 p-3 font-mono text-xs sm:text-sm leading-snug text-rose-200 border border-slate-800 flex flex-col justify-center shadow-inner">
            <button
              type="button"
              onClick={() => handleCopy(terrorCode, 'terror')}
              className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
            >
              {copiedCode === 'terror' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode === 'terror' ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="overflow-x-auto">
              <code>{terrorCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Bottom Key Takeaway */}
      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs md:text-sm font-mono text-slate-300 flex items-center justify-between shrink-0 mt-1">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">The Dilemma:</strong> React forced human engineers to manually police dependencies. Svelte proved compilers can do it for free.
          </span>
        </div>
        <span className="text-emerald-400 font-bold hidden sm:inline flex items-center gap-1 shrink-0">
          Next: Svelte&apos;s Manifesto <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
