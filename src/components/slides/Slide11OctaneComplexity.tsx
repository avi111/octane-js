import React, { useState } from 'react';
import { Waves, Zap, Cpu, Play, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide11OctaneComplexity: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [treeSize, setTreeSize] = useState<number>(1000);

  const reactTime = (treeSize * 0.015).toFixed(1);
  const octaneTime = "0.1";

  const handleSizeChange = (size: number) => {
    setTreeSize(size);
    playSound('click', soundEnabled);
  };

  return (
    <div className="flex flex-col justify-center w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-5 w-full">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Phase 06 // The Algorithmic Shift
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
            OctaneJS: From O(t) Tree Traversal to O(1) Direct Mutation
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Eliminating the Diff entirely: Clone-based static templates and parallel data fetching
          </p>
        </div>

        {/* Big O Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 text-center space-y-2">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
              Classic React Diffing
            </span>
            <div className="text-5xl font-black text-rose-500 font-mono">O(t)</div>
            <p className="text-xs text-slate-300">
              CPU cost scales with the size of the subtree (t). React traverses and re-evaluates all child nodes recursively.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-center space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              OctaneJS Direct Mutation
            </span>
            <div className="text-5xl font-black text-emerald-400 font-mono">O(1)</div>
            <p className="text-xs text-slate-300">
              AOT compiler produces direct memory access paths to dynamic nodes only. Static skeletons are duplicated in one operation via <code>cloneNode</code>.
            </p>
          </div>
        </div>

        {/* Interactive Big-O Benchmark */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
            <span className="text-cyan-300 font-bold text-[11px] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Interactive Subtree Scaling Benchmark
            </span>
            <div className="flex items-center gap-1">
              {[100, 1000, 5000, 20000].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleSizeChange(sz)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                    treeSize === sz
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  t = {sz.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-2.5 rounded bg-slate-900/80 border border-rose-900/40">
              <span className="text-[10px] text-slate-400 block mb-0.5">React O(t) Diffing Time</span>
              <span className="text-2xl font-bold text-rose-400 tabular-nums">~{reactTime} ms</span>
              <span className="text-[9px] text-slate-500 block mt-1">Re-evaluates every child pointer</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900/80 border border-emerald-900/40">
              <span className="text-[10px] text-slate-400 block mb-0.5">OctaneJS O(1) Compiled Mutation</span>
              <span className="text-2xl font-bold text-emerald-400 tabular-nums">{octaneTime} ms</span>
              <span className="text-[9px] text-slate-500 block mt-1">Constant time regardless of subtree size</span>
            </div>
          </div>
        </div>

        {/* Parallel data fetching callout */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
          <div className="text-cyan-400 font-bold text-[11px] flex items-center gap-2">
            <Waves className="w-4 h-4 text-cyan-400" /> Eliminating Asynchronous Network Waterfalls
          </div>
          <p className="text-slate-300 leading-relaxed text-xs">
            In React, asynchronous loading with <code>use()</code> creates serial waterfalls unless developers manually orchestrate <code>Promise.all</code> outside components. In Octane, the compiler determines variable independence at build time and executes fetch requests concurrently in the network warmup stage.
          </p>
        </div>
      </div>
    </div>
  );
};
