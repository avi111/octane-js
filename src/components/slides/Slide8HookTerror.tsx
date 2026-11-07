import React, { useState } from 'react';
import { AlertOctagon, Zap, Copy, Check, ShieldAlert } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide8HookTerror: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<'react' | 'svelte'>('react');
  const [copied, setCopied] = useState<boolean>(false);

  const reactCode = `// React Hook Dependency Nightmare
const filteredItems = useMemo(() => {
  return items.filter(item => item.category === selectedCategory);
}, [items, selectedCategory]); // Miss one dependency? Stale closure bug!

const handleClick = useCallback(() => {
  dispatch({ type: 'UPDATE', payload: filteredItems });
}, [filteredItems, dispatch]); // Cascade re-renders everywhere!`;

  const svelteCode = `// Svelte Ahead-of-Time Reactive Variable
let items = [];
let selectedCategory = 'all';

// Compiler automatically tracks dependencies!
$: filteredItems = items.filter(i => i.category === selectedCategory);
// Zero hooks, zero dependency arrays, pure language syntax.`;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    playSound('success', soundEnabled);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col justify-center w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-5 w-full">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            Phase 04 // The Resistance
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
            Hook Terror &amp; The Svelte Rebellion
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            When memoization arrays became a nightmare and Rich Harris declared: &quot;Virtual DOM is pure overhead&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              &quot;Hook Terror&quot; in React
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              To suppress unnecessary re-renders, developers had to manually manage <code>useMemo</code>, <code>useCallback</code>, and strict dependency arrays. One missed dependency caused stale closures or crashes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Svelte&apos;s AOT Manifesto
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              An Ahead-of-Time compiler that knows the UI structure at build time and generates direct DOM mutation code, completely bypassing the Virtual DOM.
            </p>
          </div>
        </div>

        {/* Code comparison panel */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('react');
                  playSound('switch', soundEnabled);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer ${
                  activeTab === 'react'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                React Memoization Hell
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('svelte');
                  playSound('switch', soundEnabled);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer ${
                  activeTab === 'svelte'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Svelte Compiler Tracking
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(activeTab === 'react' ? reactCode : svelteCode)}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] transition cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <pre className="text-slate-300 overflow-x-auto p-2 leading-relaxed text-[11px] bg-slate-900/70 rounded">
            <code>{activeTab === 'react' ? reactCode : svelteCode}</code>
          </pre>
        </div>

        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 text-xs text-amber-300 font-mono flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            <strong className="text-white">The Dilemma:</strong> Svelte dropped JSX and required non-standard syntax, cutting developers off from the massive React component ecosystem.
          </span>
        </div>
      </div>
    </div>
  );
};
