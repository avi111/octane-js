import React, { useState } from 'react';
import { Sparkles, Cpu, ShieldCheck, Palette, Copy, Check, UserCheck } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide9DominicGannaway: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const tsrxCode = `export default component UserCard({ id }) {
  const data = useFetch(\`/api/users/\${id}\`);

  // Conditional return before hooks? Allowed!
  if (!data) return <Skeleton />;

  @{
    <div class="card">
      <h3>{data.name}</h3>
    </div>
    <style>
      .card { 
        padding: 1.5rem; 
        border-radius: 8px; 
        background: #0f172a; 
      }
    </style>
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(tsrxCode);
    setCopied(true);
    playSound('success', soundEnabled);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col justify-center w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-5 w-full">
        <div>
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" /> Phase 05 // The Architect
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
            Dominic Gannaway &amp; TSRX
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Former React and Svelte core team member creating a TypeScript Superset combining compiler speed with familiar JSX
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-purple-300 font-mono flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> Compiler-Inferred Dependencies
              </div>
              <div className="text-xs text-slate-300">
                No more dependency arrays: static analysis determines dependencies at build time automatically.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-purple-300 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Freedom from Rules of Hooks
              </div>
              <div className="text-xs text-slate-300">
                Call hooks inside conditions, loops, and after early returns without crashing or breaking linked lists.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-purple-300 font-mono flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-cyan-400" /> Native Directives &amp; Scoped CSS
              </div>
              <div className="text-xs text-slate-300">
                Direct if/else, for loops, and built-in scoped style tags via @&#123;&#125; syntactic sugar.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs relative">
            <div className="flex items-center justify-between text-purple-300 border-b border-slate-800 pb-1 mb-2 text-[11px] font-bold">
              <span>TSRX COMPONENT SYNTAX</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] transition cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="text-slate-300 overflow-x-auto leading-relaxed text-[11px] p-1">
              <code>{tsrxCode}</code>
            </pre>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/40 text-xs text-purple-200 font-mono flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span>
            <strong className="text-white">The Synthesis:</strong> TSRX preserves the JSX mental model that developers love while providing Svelte-like compile-time execution and performance.
          </span>
        </div>
      </div>
    </div>
  );
};
