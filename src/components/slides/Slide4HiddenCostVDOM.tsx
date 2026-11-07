import React, { useState } from 'react';
import { Network, Flame, Zap, ChevronLeft, ChevronRight, Sliders, Cpu, Activity } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide4Props {
  soundEnabled: boolean;
}

export const Slide4HiddenCostVDOM: React.FC<Slide4Props> = ({ soundEnabled }) => {
  const [currentDemo, setCurrentDemo] = useState<number>(0);

  // Sub-demo 1 state
  const [jitterText, setJitterText] = useState<string>('');
  const [wrapperCount, setWrapperCount] = useState<number>(0);
  const [frameLag, setFrameLag] = useState<number>(0.4);

  // Sub-demo 2 state
  const [heapVal, setHeapVal] = useState<string>('14.2 MB');
  const [pauseVal, setPauseVal] = useState<string>('0 ms');
  const [isGCing, setIsGCing] = useState<boolean>(false);

  // Sub-demo 3 state
  const [sliderVal, setSliderVal] = useState<number>(50);

  const demoTitles = [
    "Demo 1 of 3: Keystroke Lag",
    "Demo 2 of 3: Garbage Collection Spike",
    "Demo 3 of 3: Continuous Slider & O(t)"
  ];

  const handleJitterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setJitterText(val);
    const count = val.length * 4;
    setWrapperCount(count);
    const lag = +(0.4 + (count % 12) * 0.35).toFixed(1);
    setFrameLag(lag);
    playSound('click', soundEnabled);
  };

  const simulateGC = () => {
    if (isGCing) return;
    setIsGCing(true);
    playSound('alert', soundEnabled);
    setHeapVal('26.8 MB (+88%)');
    setPauseVal('32.4 ms (STW Pause)');

    setTimeout(() => {
      setHeapVal('15.1 MB (Cleaned)');
      setPauseVal('0 ms');
      setIsGCing(false);
      playSound('success', soundEnabled);
    }, 2000);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderVal(val);
    playSound('click', soundEnabled);
  };

  const nodeCount = Math.floor(1000 + sliderVal * 15);
  const reactDiffTime = (8 + (sliderVal % 10) * 1.4).toFixed(1);

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-4 overflow-hidden">
      {/* Header */}
      <div className="mb-1 shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-cyan-300 tracking-tight">
            The Hidden Cost of Virtual DOM Reconciliation
          </h2>
          <p className="text-[11px] md:text-xs text-slate-400">
            Abstraction Overhead at Scale: From Garbage Collection spikes to O(t) subtree stalls
          </p>
        </div>
        <div className="flex items-center space-x-1.5 font-mono text-[11px]">
          <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 font-bold">
            GC Overhead
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-bold">
            O(t) Traversal
          </span>
        </div>
      </div>

      {/* 60% / 40% Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0 items-stretch my-1">
        {/* 60% Left Column: Cyber VDOM Tree */}
        <div className="lg:col-span-7 rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-3 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-cyan-900/30 pb-1.5 shrink-0">
            <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-cyan-400" /> Virtual DOM Memory Tree Architecture
            </span>
            <span className="text-[10px] font-mono text-slate-400">Red Sparks = Bottlenecks</span>
          </div>

          {/* Diagram Visual */}
          <div className="relative flex-1 min-h-[220px] flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 240" preserveAspectRatio="none">
              <path d="M 250 35 L 140 85 M 250 35 L 360 85" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
              <path d="M 140 105 L 80 155 M 140 105 L 200 155" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5" />
              <path d="M 360 105 L 300 155 M 360 105 L 420 155" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5" />
              <path d="M 250 105 L 250 195" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" className="flow-line" />
            </svg>

            {/* Tree Nodes */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-lg bg-cyan-950 border border-cyan-400 text-xs font-mono text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              Root Component
            </div>

            <div className="absolute top-16 left-16 px-3 py-1 rounded bg-slate-900 border border-cyan-500/60 text-[11px] font-mono text-slate-200">
              Subtree A
            </div>
            <div className="absolute top-16 right-16 px-3 py-1 rounded bg-slate-900 border border-cyan-500/60 text-[11px] font-mono text-slate-200">
              Subtree B
            </div>

            {/* Hotspots with animations */}
            <div className="vdom-hotspot absolute top-14 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-rose-600/40 border-2 border-rose-500 flex items-center justify-center shadow-lg shadow-rose-600/50">
              <Flame className="w-3.5 h-3.5 text-rose-300" />
            </div>
            <div className="vdom-hotspot absolute top-20 right-28 w-6 h-6 rounded-full bg-rose-600/40 border border-rose-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-rose-300" />
            </div>
            <div className="vdom-hotspot absolute bottom-16 right-16 w-6 h-6 rounded-full bg-rose-600/40 border border-rose-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-rose-300" />
            </div>

            {/* Leaf Nodes */}
            <div className="absolute bottom-16 left-4 flex space-x-1.5">
              <div className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[9px] font-mono text-slate-300">Node</div>
              <div className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[9px] font-mono text-slate-300">Node</div>
            </div>

            <div className="absolute bottom-16 right-4 flex space-x-1.5">
              <div className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[9px] font-mono text-slate-300">Node</div>
              <div className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[9px] font-mono text-slate-300">Node</div>
            </div>

            {/* Real DOM Target */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-xl bg-slate-900 border-2 border-slate-600 text-xs font-mono font-bold text-white shadow-lg">
              UI (Real DOM)
            </div>
          </div>

          {/* Callout Grid */}
          <div className="grid grid-cols-2 gap-2 mt-1 shrink-0 font-mono text-[10px]">
            <div className="p-2 rounded bg-slate-900/90 border border-cyan-800/40">
              <strong className="text-cyan-300 block mb-0.5">Synthetic Events:</strong>
              <span className="text-slate-400">Wrappers created per keystroke; strains browser garbage collector.</span>
            </div>
            <div className="p-2 rounded bg-slate-900/90 border border-rose-900/40">
              <strong className="text-rose-400 block mb-0.5">Garbage Collection:</strong>
              <span className="text-slate-400">Massive object allocation causes micro-freezes during typing and scrolling.</span>
            </div>
            <div className="p-2 rounded bg-slate-900/90 border border-rose-900/40">
              <strong className="text-rose-400 block mb-0.5">O(t) Complexity:</strong>
              <span className="text-slate-400">CPU cost scales with tree size (t) instead of pinpoint changes.</span>
            </div>
            <div className="p-2 rounded bg-slate-900/90 border border-cyan-800/40">
              <strong className="text-cyan-300 block mb-0.5">Diffing Overhead:</strong>
              <span className="text-slate-400">Scanning in-memory snapshots before dispatching minimal browser updates.</span>
            </div>
          </div>
        </div>

        {/* 40% Right Column: Interactive Mini-Deck */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 shrink-0">
            <div className="flex items-center space-x-1">
              {[0, 1, 2].map((idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentDemo === idx ? 'bg-cyan-400' : 'bg-slate-700'
                  }`}
                />
              ))}
              <span className="text-[11px] font-mono text-slate-300 ml-1 font-bold">Interactive Demos</span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => {
                  setCurrentDemo((prev) => (prev + 2) % 3);
                  playSound('switch', soundEnabled);
                }}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-[10px] cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentDemo((prev) => (prev + 1) % 3);
                  playSound('switch', soundEnabled);
                }}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-[10px] cursor-pointer"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Demo Panes */}
          <div className="flex-1 min-h-[220px] flex flex-col justify-center my-2">
            {/* Sub-Demo 1: Keystroke Lag */}
            {currentDemo === 0 && (
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <Activity className="w-3 h-3" /> Demo 1: Keystroke Jitter
                  </span>
                  <span className="text-slate-500 text-[10px]">Synthetic Event Overhead</span>
                </div>
                <input
                  type="text"
                  value={jitterText}
                  onChange={handleJitterInput}
                  placeholder="Type rapidly to simulate synthetic event pileup..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">Synthetic Wrappers</span>
                    <span className="text-rose-400 font-bold text-sm tabular-nums">{wrapperCount} objects</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">Frame Latency Spike</span>
                    <span className="text-amber-400 font-bold text-sm tabular-nums">~{frameLag} ms</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Each keystroke triggers synthetic event allocations, GC pressure, and deep tree diffing before repainting.
                </p>
              </div>
            )}

            {/* Sub-Demo 2: GC Spike */}
            {currentDemo === 1 && (
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Demo 2: Garbage Collection Spike
                  </span>
                  <span className="text-slate-500 text-[10px]">Memory Allocation Thrash</span>
                </div>
                <button
                  type="button"
                  onClick={simulateGC}
                  disabled={isGCing}
                  className="w-full py-2 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 font-bold text-xs transition cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {isGCing ? 'Allocating & Collecting...' : 'Allocate 1,000 VDOM Nodes'}
                </button>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">Heap Memory Spike</span>
                    <span className="text-amber-400 font-bold text-sm tabular-nums">{heapVal}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">Browser GC Pause</span>
                    <span className="text-rose-400 font-bold text-sm tabular-nums">{pauseVal}</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Full-tree allocations flood the JS heap, causing the browser to pause execution while the garbage collector cleans up discarded tree nodes.
                </p>
              </div>
            )}

            {/* Sub-Demo 3: Slider Choke */}
            {currentDemo === 2 && (
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Sliders className="w-3 h-3" /> Demo 3: Continuous Slider &amp; O(t)
                  </span>
                  <span className="text-slate-500 text-[10px]">Diffing vs Compiled Mutation</span>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Drag Slider:</span>
                    <span className="text-cyan-300 font-bold tabular-nums">{sliderVal}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={handleSliderChange}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-slate-900 border border-rose-900/40">
                    <span className="text-slate-500 block">React VDOM Diff</span>
                    <span className="text-rose-400 font-bold text-sm tabular-nums">~{reactDiffTime} ms</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-emerald-900/40">
                    <span className="text-slate-500 block">Compiled AOT</span>
                    <span className="text-emerald-400 font-bold text-sm tabular-nums">~0.1 ms</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  Diffing Cost: O({nodeCount} nodes) vs O(1) single compiled pointer
                </p>
              </div>
            )}
          </div>

          {/* Mini-Deck Footer Navigation */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono shrink-0">
            <span className="text-slate-400">{demoTitles[currentDemo]}</span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentDemo(idx);
                    playSound('switch', soundEnabled);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] cursor-pointer transition ${
                    currentDemo === idx
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Insight */}
      <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-400 font-mono shrink-0">
        <span className="text-rose-400 font-bold">Scale Problem:</span> At scale, the abstraction designed to speed up updates became the primary CPU &amp; GC bottleneck.
      </div>
    </div>
  );
};
