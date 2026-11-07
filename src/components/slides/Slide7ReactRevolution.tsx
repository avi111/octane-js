import React, { useState } from 'react';
import { ArrowDownRight, Layers, Cpu, Sparkles, RefreshCw } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide7ReactRevolution: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [theme, setTheme] = useState<'cyan' | 'purple' | 'emerald'>('cyan');
  const [activeItems, setActiveItems] = useState<string[]>(['Dashboard', 'Inbox', 'Analytics']);

  const toggleTheme = (color: 'cyan' | 'purple' | 'emerald') => {
    setTheme(color);
    playSound('switch', soundEnabled);
  };

  return (
    <div className="flex flex-col justify-center w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-5 w-full">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Phase 03 // React Revolution
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
            React: Unidirectional Flow &amp; In-Memory Reconciliation
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Replacing two-way chaos with predictable downward state flow
          </p>
        </div>

        {/* Pure function formula */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900 border border-cyan-800/40 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-bold">The Core Paradigm:</span>
            <span className="text-cyan-300 font-bold bg-slate-950 px-2 py-0.5 rounded border border-cyan-700/60">
              UI = f(State)
            </span>
          </div>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Declarative Pure Functions of Application State
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <ArrowDownRight className="w-4 h-4 text-cyan-400" />
              One-Way Data Flow
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Data flows downward only (from State to UI). Any update requires dispatching an explicit event. This solved the domino effect and brought predictability to debugging.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              In-Memory Reconciliation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Creating lightweight abstract object trees in JS memory. The diffing algorithm compares snapshots in memory and only applies the minimal necessary diffs to the browser DOM.
            </p>
          </div>
        </div>

        {/* Interactive Reconciliation Visualizer */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="text-cyan-300 font-bold text-[11px]">
              Interactive VDOM Snapshot Diffing Test
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => toggleTheme('cyan')}
                className={`px-2 py-0.5 rounded text-[10px] cursor-pointer transition ${
                  theme === 'cyan' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
                }`}
              >
                State A
              </button>
              <button
                type="button"
                onClick={() => toggleTheme('purple')}
                className={`px-2 py-0.5 rounded text-[10px] cursor-pointer transition ${
                  theme === 'purple' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
                }`}
              >
                State B
              </button>
              <button
                type="button"
                onClick={() => toggleTheme('emerald')}
                className={`px-2 py-0.5 rounded text-[10px] cursor-pointer transition ${
                  theme === 'emerald' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
                }`}
              >
                State C
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block mb-1">State Snapshot</span>
              <code className="text-[10px] text-slate-300 block">
                {`{ theme: "${theme}", count: 3 }`}
              </code>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block mb-1">VDOM Diff Calc</span>
              <span className="text-[10px] text-amber-300 block">
                Diff: 1 attribute changed (theme class)
              </span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block mb-1">Target DOM Patch</span>
              <span className={`text-[10px] font-bold block ${
                theme === 'cyan' ? 'text-cyan-400' : theme === 'purple' ? 'text-purple-400' : 'text-emerald-400'
              }`}>
                classList.replace({theme})
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
          <span className="text-white font-bold">Historical Context:</span> When browser JS engines were slower and browser DOM implementations were inconsistent, the Virtual DOM was a major advantage.
        </div>
      </div>
    </div>
  );
};
