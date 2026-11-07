import React, { useState } from 'react';
import { Waves, Zap, Cpu, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide11OctaneComplexity: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [treeSize, setTreeSize] = useState<number>(5000);

  const reactTime = (treeSize * 0.015).toFixed(1);
  const octaneTime = "0.1";

  const handleSizeChange = (size: number) => {
    setTreeSize(size);
    playSound('click', soundEnabled);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-6 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-1 shrink-0">
        <span className="text-xs md:text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest block">
          Pillar 03 // The Algorithmic Shift
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-0.5">
          OctaneJS: From O(t) Tree Traversal to O(1) Direct Mutation
        </h2>
        <p className="text-sm md:text-base text-slate-300 font-mono mt-1">
          Eliminating the diff entirely: Clone-based static templates and parallel data fetching
        </p>
      </div>

      {/* Giant Big-O Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0 my-1 items-stretch">
        {/* Left: React O(t) */}
        <div className="p-4 md:p-6 rounded-2xl bg-slate-950/85 border border-rose-500/50 flex flex-col justify-between shadow-[0_0_25px_rgba(244,63,94,0.08)]">
          <div>
            <div className="flex items-center justify-between border-b border-rose-900/50 pb-2 mb-2">
              <span className="text-xs md:text-sm font-mono font-bold text-rose-400 uppercase tracking-widest">
                Classic React Tree Diffing
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold">
                Recursive Walk
              </span>
            </div>
            <div className="text-6xl md:text-7xl font-black text-rose-500 font-mono my-2 tracking-tight">
              O(t)
            </div>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              CPU diffing cost scales directly with the size of the component subtree <strong className="text-white">(t)</strong>. React re-traverses and allocates objects across every child component.
            </p>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-rose-950 text-xs font-mono text-rose-300">
            • 10,000 nodes = ~150 ms UI freeze during rapid user interactions.
          </div>
        </div>

        {/* Right: OctaneJS O(1) */}
        <div className="p-4 md:p-6 rounded-2xl bg-slate-950/85 border border-emerald-500/50 flex flex-col justify-between shadow-[0_0_25px_rgba(16,185,129,0.1)]">
          <div>
            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-2 mb-2">
              <span className="text-xs md:text-sm font-mono font-bold text-emerald-400 uppercase tracking-widest">
                OctaneJS Direct Mutation
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                Constant Time
              </span>
            </div>
            <div className="text-6xl md:text-7xl font-black text-emerald-400 font-mono my-2 tracking-tight">
              O(1)
            </div>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              AOT compiler builds direct memory pointers to dynamic bindings only. Static skeletons are instantiated once via native <code className="text-cyan-300 font-mono font-bold">cloneNode</code>.
            </p>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-emerald-950 text-xs font-mono text-emerald-300">
            • 10,000 nodes or 1 node = Exactly 0.1 ms pinpoint direct DOM mutation.
          </div>
        </div>
      </div>

      {/* Interactive Scaling Benchmark & Waterfall Elimination */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 shrink-0 my-1 font-mono">
        {/* Subtree Benchmark Controls (7 cols) */}
        <div className="lg:col-span-7 p-3 md:p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan-300 font-bold text-xs md:text-sm flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Live Subtree Benchmark:
            </span>
            <div className="flex items-center gap-1.5">
              {[500, 2000, 5000, 20000].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleSizeChange(sz)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition ${
                    treeSize === sz
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  t = {sz.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-rose-900/40">
              <span className="text-xs text-slate-400 block mb-0.5">React O(t) Diff Time</span>
              <span className="text-2xl md:text-3xl font-black text-rose-400 tabular-nums">~{reactTime} ms</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Linear slowdown</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-emerald-900/40">
              <span className="text-xs text-slate-400 block mb-0.5">OctaneJS O(1) Time</span>
              <span className="text-2xl md:text-3xl font-black text-emerald-400 tabular-nums">{octaneTime} ms</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Constant 60fps</span>
            </div>
          </div>
        </div>

        {/* Parallel Async Fetching (5 cols) */}
        <div className="lg:col-span-5 p-3 md:p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="text-cyan-300 font-bold text-xs md:text-sm flex items-center gap-1.5 mb-1">
            <Waves className="w-4 h-4 text-cyan-400" />
            Zero Async Waterfalls
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-snug">
            React <code className="text-amber-300 font-bold">use()</code> triggers serial waterfalls unless manually orchestrated. Octane&apos;s compiler statically maps promises and fetches concurrently in network warmup.
          </p>
          <div className="text-[10px] text-cyan-400 font-mono mt-1 pt-1 border-t border-slate-800">
            ⚡ All parallel data arrives before the component begins its first paint.
          </div>
        </div>
      </div>
    </div>
  );
};

