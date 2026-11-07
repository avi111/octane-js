import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Check, Copy, ArrowRight, Flame, Scale } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide8DependencyTerror: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const terrorCode = `function SearchPanel({ filters, onResults }) {
  useEffect(() => {
    api.searchUsers(filters).then(onResults);
  }, [filters, onResults]); 

  // 🚨 THE CATCH-22 TRAP:
  // 1. Omit [filters]: ESLint error + Stale Closure bug!
  // 2. Add [filters]: Parent creates new object on each render,
  //    triggering an Infinite Loop that freezes the browser!
  // 3. Fix: Parent must wrap in useMemo -> viral memoization!
}`;

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
        <span className="text-[11px] sm:text-xs font-mono font-bold text-rose-400 uppercase tracking-widest block">
          Pillar 02 // The Breaking Point
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mt-0.5">
          The &ldquo;Dependency Terror&rdquo;: The Authoritarian Strict Regime
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-mono mt-0.5">
          Stale closures, infinite loops, and the architectural crisis that sparked Svelte
        </p>
      </div>

      {/* 2-Column Layout: Left (Explanation Boxes) | Right (Enlarged Code Example) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 md:gap-4 flex-1 min-h-0 my-1 items-stretch">
        {/* Left Side (5 Cols): 3 Compact Explanation Boxes (Guaranteed No Overflow) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-2 min-h-0 h-full">
          {/* Box 1: Exhaustive-Deps Regime */}
          <div className="p-2.5 sm:p-3 rounded-xl border border-rose-500/40 bg-slate-950/90 shadow-md flex-1 min-h-0 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                AUTHORITARIAN LINTERS
              </span>
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <h3 className="text-sm sm:text-base font-black text-white font-mono mt-0.5">
              The exhaustive-deps Regime
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-mono leading-snug">
              ESLint rules strictly enforce every referenced variable into <code>[deps]</code>. Disabling the rule risks stale closures in production.
            </p>
          </div>

          {/* Box 2: The Catch-22 Trap */}
          <div className="p-2.5 sm:p-3 rounded-xl border border-amber-500/40 bg-slate-950/90 shadow-md flex-1 min-h-0 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                THE CATCH-22 TRAP
              </span>
              <Scale className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h3 className="text-sm sm:text-base font-black text-white font-mono mt-0.5">
              Stale Closures vs. Loops
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-mono leading-snug">
              Adding object dependencies triggers infinite render loops unless the parent component memoizes every prop recursively.
            </p>
          </div>

          {/* Box 3: The Catalyst for Svelte */}
          <div className="p-2.5 sm:p-3 rounded-xl border border-emerald-500/40 bg-slate-950/90 shadow-md flex-1 min-h-0 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                THE SVELTE SPARK
              </span>
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <h3 className="text-sm sm:text-base font-black text-white font-mono mt-0.5">
              Virtual DOM as Bad Practice
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-mono leading-snug">
              Rich Harris declared the V-DOM an architectural mistake: Svelte showed that AOT compilers track state without runtime hooks.
            </p>
          </div>
        </div>

        {/* Right Side (7 Cols): Clean Enlarged Code Card */}
        <div className="lg:col-span-7 rounded-2xl border border-rose-500/50 bg-slate-950/95 p-3 sm:p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-rose-900/50 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-widest">
                Code Trap Demonstration
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                The Dependency Prison
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(terrorCode, 'terror')}
              className="px-2.5 py-1 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition cursor-pointer bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {copiedCode === 'terror' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'terror' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Clean Code Box with Zero Text Overlap */}
          <div className="flex-1 min-h-0 my-2 bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 flex items-center overflow-auto">
            <pre className="w-full font-mono text-xs sm:text-[13px] md:text-sm leading-relaxed text-rose-200">
              <code>{terrorCode}</code>
            </pre>
          </div>

          {/* Bottom Card Summary */}
          <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300 flex items-center justify-between shrink-0">
            <span className="text-rose-400 font-semibold truncate">
              The Reality: Developers forced to manually audit dependency arrays by hand.
            </span>
            <span className="text-slate-400 shrink-0 ml-2">Slide 8 of 14</span>
          </div>
        </div>
      </div>

      {/* Bottom Key Takeaway linking directly to Slide 9 */}
      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-[13px] font-mono text-slate-300 flex items-center justify-between shrink-0 mt-1">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">The Turning Point:</strong> Dependency friction proved the V-DOM re-rendering model had reached its limits.
          </span>
        </div>
        <span className="text-emerald-400 font-bold hidden sm:inline flex items-center gap-1 shrink-0">
          Next: Svelte&apos;s Manifesto <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
