import React, { useState } from 'react';
import { AlertOctagon, Zap, Copy, Check, ShieldAlert, ArrowRight } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide8HookTerror: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [copiedReact, setCopiedReact] = useState<boolean>(false);
  const [copiedSvelte, setCopiedSvelte] = useState<boolean>(false);

  const reactCode = `// React: Hook Dependency Array Hell
const filtered = useMemo(() => {
  return items.filter(i => i.cat === cat);
}, [items, cat]); // Miss one? Stale closure!

const onClick = useCallback(() => {
  dispatch({ payload: filtered });
}, [filtered, dispatch]); // Cascade re-renders!`;

  const svelteCode = `// Svelte: Ahead-of-Time Reactive Tracking
let items = [], cat = 'all';

// The compiler tracks dependencies automatically:
$: filtered = items.filter(i => i.cat === cat);

// Zero hooks. Zero arrays. Zero V-DOM overhead.`;

  const handleCopy = (code: string, isReact: boolean) => {
    navigator.clipboard.writeText(code);
    if (isReact) {
      setCopiedReact(true);
      setTimeout(() => setCopiedReact(false), 2000);
    } else {
      setCopiedSvelte(true);
      setTimeout(() => setCopiedSvelte(false), 2000);
    }
    playSound('success', soundEnabled);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-5 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-1 shrink-0">
        <span className="text-xs md:text-sm font-mono font-bold text-amber-400 uppercase tracking-widest block">
          Pillar 03 // The Developer Experience Breakdown
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mt-0.5">
          Hook Terror &amp; The Svelte Rebellion
        </h2>
        <p className="text-xs md:text-sm text-slate-300 font-mono mt-0.5">
          When memoization arrays became a nightmare and Rich Harris declared: &ldquo;Virtual DOM is pure overhead&rdquo;
        </p>
      </div>

      {/* Side-by-Side Architectural Contrast (Clean, proportional heights) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1 min-h-0 my-1 items-stretch">
        {/* Left: React Hook Terror */}
        <div className="p-3.5 md:p-4 rounded-2xl bg-slate-950/90 border border-rose-500/50 flex flex-col justify-between shadow-[0_0_20px_rgba(244,63,94,0.08)]">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between border-b border-rose-900/50 pb-1.5">
              <h3 className="text-base md:text-lg font-black text-rose-400 font-mono flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                <span>React: Hook Terror &amp; useMemo</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                Manual Burden
              </span>
            </div>

            <ul className="space-y-1 text-xs md:text-sm text-slate-300 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong className="text-white">Dependency Array Fatigue:</strong> Manually micro-managing <code>[deps]</code> arrays.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong className="text-white">Stale Closures:</strong> One missing variable silently captures obsolete state.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong className="text-white">Defensive Coding:</strong> Writing boilerplate to protect the engine, not users.</span>
              </li>
            </ul>
          </div>

          {/* Compact Code Block */}
          <div className="relative mt-2 p-2.5 rounded-xl bg-slate-900/95 font-mono text-xs text-slate-300 border border-slate-800">
            <button
              type="button"
              onClick={() => handleCopy(reactCode, true)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] cursor-pointer"
            >
              {copiedReact ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedReact ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="overflow-x-auto leading-tight text-rose-200/90 font-mono text-xs">
              <code>{reactCode}</code>
            </pre>
          </div>
        </div>

        {/* Right: Svelte AOT Manifesto */}
        <div className="p-3.5 md:p-4 rounded-2xl bg-slate-950/90 border border-amber-500/50 flex flex-col justify-between shadow-[0_0_20px_rgba(245,158,11,0.08)]">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between border-b border-amber-900/50 pb-1.5">
              <h3 className="text-base md:text-lg font-black text-amber-300 font-mono flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Svelte: The Ahead-Of-Time Shift</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                Compiler Tracking
              </span>
            </div>

            <ul className="space-y-1 text-xs md:text-sm text-slate-300 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong className="text-white">Ahead-of-Time Analysis:</strong> Compiler automatically resolves dependency graphs.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong className="text-white">Virtual DOM Eliminated:</strong> Generates targeted vanilla JS for changed nodes only.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong className="text-white">The Dilemma:</strong> Abandoned JSX, cutting developers off from React’s ecosystem.</span>
              </li>
            </ul>
          </div>

          {/* Compact Code Block */}
          <div className="relative mt-2 p-2.5 rounded-xl bg-slate-900/95 font-mono text-xs text-slate-300 border border-slate-800">
            <button
              type="button"
              onClick={() => handleCopy(svelteCode, false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] cursor-pointer"
            >
              {copiedSvelte ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSvelte ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="overflow-x-auto leading-tight text-amber-200/90 font-mono text-xs">
              <code>{svelteCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Bottom Keynote Punchline */}
      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs md:text-sm text-slate-300 font-mono flex items-center justify-between shrink-0 mt-1">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">The Breakthrough Question:</strong> Can we achieve Svelte&apos;s zero-VDOM speed <span className="text-cyan-300 font-bold">while keeping React&apos;s JSX ecosystem</span>?
          </span>
        </div>
        <span className="text-purple-300 font-bold hidden sm:inline flex items-center gap-1 shrink-0">
          Answer: TSRX <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};


