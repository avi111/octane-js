import React, { useState } from 'react';
import { Cpu, Layers, AlertTriangle, RefreshCw, Play, Zap } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide3Props {
  soundEnabled: boolean;
  isActive: boolean;
}

export const Slide3VirtualDOMTimeline: React.FC<Slide3Props> = ({ soundEnabled }) => {
  const [treeSize, setTreeSize] = useState<'medium' | 'large' | 'enterprise'>('medium');
  const [isDiffing, setIsDiffing] = useState<boolean>(false);

  const simulationData = {
    medium: {
      nodes: 1250,
      allocations: "1,250 Objects",
      comparisons: "1,250 Diffs",
      gcGarbage: "185 KB Heap Churn",
      domUpdates: "1 Text Node",
      diffTime: "18 ms",
      efficiency: "0.08%"
    },
    large: {
      nodes: 5400,
      allocations: "5,400 Objects",
      comparisons: "5,400 Diffs",
      gcGarbage: "820 KB Heap Churn",
      domUpdates: "1 Text Node",
      diffTime: "46 ms",
      efficiency: "0.018%"
    },
    enterprise: {
      nodes: 18000,
      allocations: "18,000 Objects",
      comparisons: "18,000 Diffs",
      gcGarbage: "2.8 MB Heap Churn",
      domUpdates: "1 Text Node",
      diffTime: "112 ms (Frame Drop)",
      efficiency: "0.005%"
    }
  };

  const current = simulationData[treeSize];

  const handleTriggerReconcile = () => {
    setIsDiffing(true);
    playSound('step', soundEnabled);
    setTimeout(() => {
      setIsDiffing(false);
      playSound('success', soundEnabled);
    }, 600);
  };

  const handleSelectSize = (size: 'medium' | 'large' | 'enterprise') => {
    setTreeSize(size);
    playSound('switch', soundEnabled);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2.5 md:p-5 overflow-hidden text-left dir-ltr">
      {/* Header */}
      <div className="shrink-0 mb-1.5 md:mb-2 pb-1.5 border-b border-slate-800/80">
        <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest block">
          Pillar 02 // The Hidden Ceiling
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-0.5">
          The Hidden Overhead of Runtime Reconciliation
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-mono mt-0.5">
          Why in-memory tree diffing becomes an architectural bottleneck as application scale grows
        </p>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 flex-1 min-h-0 my-1 items-stretch">
        {/* Left Column (5 Cols): The 3 Overhead Boxes (No Long Descriptions - Ultra Clean & No Overflow) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-2.5 h-full">
          {/* Overhead 1: Garbage Collection */}
          <div className="p-3.5 md:p-4 rounded-2xl border border-rose-500/50 bg-slate-950/90 shadow-md flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                OVERHEAD 01 • MEMORY HEAP
              </span>
              <div className="p-1.5 rounded-lg bg-slate-900 text-rose-400 border border-slate-800">
                <Cpu className="w-4 h-4" />
              </div>
            </div>

            <div className="my-auto py-1.5">
              <h3 className="text-lg md:text-xl font-black text-white leading-tight font-mono">
                Garbage Collection Freezes
              </h3>
              <p className="text-xs font-mono text-rose-300 mt-1 font-semibold">
                Thousands of ephemeral tree nodes force Stop-The-World browser GC pauses.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-rose-400 flex items-center gap-1.5">
              <span>⚠️ Drops frames below 60fps on keystrokes</span>
            </div>
          </div>

          {/* Overhead 2: O(t) Subtree Traversal */}
          <div className="p-3.5 md:p-4 rounded-2xl border border-amber-500/50 bg-slate-950/90 shadow-md flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                OVERHEAD 02 • ALGORITHMIC LIMIT
              </span>
              <div className="p-1.5 rounded-lg bg-slate-900 text-amber-400 border border-slate-800">
                <Layers className="w-4 h-4" />
              </div>
            </div>

            <div className="my-auto py-1.5">
              <h3 className="text-lg md:text-xl font-black text-white leading-tight font-mono">
                O(t) Subtree Traversal
              </h3>
              <p className="text-xs font-mono text-amber-300 mt-1 font-semibold">
                Cost scales with total subtree size (t), not with the 1 changed value.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-amber-400 flex items-center gap-1.5">
              <span>⚠️ Updating 1 badge diffs thousands of sibling nodes</span>
            </div>
          </div>

          {/* Overhead 3: Synthetic Event & Wrapper Tax */}
          <div className="p-3.5 md:p-4 rounded-2xl border border-cyan-500/50 bg-slate-950/90 shadow-md flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                OVERHEAD 03 • WRAPPER TAX
              </span>
              <div className="p-1.5 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>

            <div className="my-auto py-1.5">
              <h3 className="text-lg md:text-xl font-black text-white leading-tight font-mono">
                Synthetic Event Wrapper Tax
              </h3>
              <p className="text-xs font-mono text-cyan-300 mt-1 font-semibold">
                Wrapping native events creates allocation churn on every mouse move and scroll.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
              <span>⚠️ Noticeable input latency on data-dense tables</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Live Demonstration (Streamlined & Non-Overflowing) */}
        <div className="lg:col-span-7 rounded-2xl border border-purple-500/50 bg-slate-950/95 p-3.5 md:p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Header of Demonstration */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
                Reconciliation Simulator
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold hidden sm:inline">
                Diffing Tax
              </span>
            </div>

            {/* Scale Selector */}
            <div className="flex items-center gap-1 font-mono text-xs shrink-0">
              <button
                type="button"
                onClick={() => handleSelectSize('medium')}
                className={`px-2 py-0.5 rounded-md font-bold cursor-pointer transition text-[11px] ${
                  treeSize === 'medium' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                1.2k Nodes
              </button>
              <button
                type="button"
                onClick={() => handleSelectSize('large')}
                className={`px-2 py-0.5 rounded-md font-bold cursor-pointer transition text-[11px] ${
                  treeSize === 'large' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                5.4k Nodes
              </button>
              <button
                type="button"
                onClick={() => handleSelectSize('enterprise')}
                className={`px-2 py-0.5 rounded-md font-bold cursor-pointer transition text-[11px] ${
                  treeSize === 'enterprise' ? 'bg-rose-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                18k Nodes
              </button>
            </div>
          </div>

          {/* Trigger Bar */}
          <div className="my-1.5 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2 shrink-0 font-mono text-xs">
            <span className="text-slate-300 truncate">
              Trigger: <strong className="text-white">1 value change</strong> (<code>count++</code>)
            </span>

            <button
              type="button"
              onClick={handleTriggerReconcile}
              disabled={isDiffing}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow ${
                isDiffing
                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30 active:scale-95'
              }`}
            >
              {isDiffing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isDiffing ? 'Diffing Subtree...' : 'Simulate 1 State Update'}</span>
            </button>
          </div>

          {/* 4 Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-1 shrink-0 font-mono">
            <div className={`p-2.5 rounded-xl border transition-all ${isDiffing ? 'border-rose-400 bg-rose-950/50 scale-[1.02]' : 'border-slate-800 bg-slate-900/60'}`}>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Allocated</span>
              <span className="text-sm md:text-base font-black text-rose-400 block mt-0.5">{current.allocations}</span>
            </div>

            <div className={`p-2.5 rounded-xl border transition-all ${isDiffing ? 'border-amber-400 bg-amber-950/50 scale-[1.02]' : 'border-slate-800 bg-slate-900/60'}`}>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Diff Checks</span>
              <span className="text-sm md:text-base font-black text-amber-400 block mt-0.5">{current.comparisons}</span>
            </div>

            <div className={`p-2.5 rounded-xl border transition-all ${isDiffing ? 'border-purple-400 bg-purple-950/50 scale-[1.02]' : 'border-slate-800 bg-slate-900/60'}`}>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">GC Garbage</span>
              <span className="text-sm md:text-base font-black text-purple-300 block mt-0.5">{current.gcGarbage}</span>
            </div>

            <div className="p-2.5 rounded-xl border border-emerald-500/50 bg-emerald-950/40">
              <span className="text-[10px] text-emerald-400 block uppercase font-bold">Actual Work</span>
              <span className="text-sm md:text-base font-black text-emerald-300 block mt-0.5">{current.domUpdates}</span>
            </div>
          </div>

          {/* Visual Mini Subtree Scan Graphic */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 my-1 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono pb-1.5 border-b border-slate-800/80">
              <span className="text-slate-400 font-semibold text-[11px]">Subtree Traversal Map</span>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-rose-400 font-bold">99.9% Redundant Diffing</span>
                <span className="text-emerald-400 font-bold">• 1 Real Target</span>
              </div>
            </div>

            {/* Compact Graphic Representation of Nodes */}
            <div className="my-auto py-2">
              <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-md mx-auto">
                {Array.from({ length: 28 }).map((_, i) => {
                  const isTarget = i === 17;
                  return (
                    <div
                      key={i}
                      className={`h-4 rounded transition-all duration-300 flex items-center justify-center text-[8px] font-mono font-bold ${
                        isTarget
                          ? 'w-9 bg-emerald-500 text-slate-950 ring-2 ring-emerald-300 scale-110 shadow-md'
                          : isDiffing
                          ? 'w-6 bg-rose-500/70 text-rose-100 border border-rose-400 animate-pulse'
                          : 'w-6 bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {isTarget ? 'TARGET' : `n${i + 1}`}
                    </div>
                  );
                })}
              </div>
              <p className="text-center font-mono text-[10px] text-slate-400 mt-1.5">
                {isDiffing ? (
                  <span className="text-amber-400 font-bold">⚠️ Scanning 28 nodes in memory to update 1 leaf node...</span>
                ) : (
                  <span>Re-evaluates every branch just to mutate the single green target.</span>
                )}
              </p>
            </div>

            {/* Benchmark Footer inside Demonstration */}
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] flex items-center justify-between shrink-0">
              <span className="text-rose-400 font-semibold">
                React Diff Latency: <strong>{current.diffTime}</strong>
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Direct DOM: <strong>0.1 ms (No Diffing)</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
