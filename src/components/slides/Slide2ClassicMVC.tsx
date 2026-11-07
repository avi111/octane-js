import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, GitFork, Play, RotateCcw, ShieldCheck, Zap, Pause, RefreshCw } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide2ClassicMVC: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [cascadeStep, setCascadeStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const [dominoLogs, setDominoLogs] = useState<string[]>([
    "• Idle: Ready to simulate cascading model updates. Click 'Next Step' to trace the vortex."
  ]);
  const [oneWayLogs, setOneWayLogs] = useState<string[]>([
    "• Event sent → Pure State mutation → Single-pass VDOM diff → Target DOM node updated cleanly."
  ]);
  const [oneWayStep, setOneWayStep] = useState<number>(0);
  const [oneWayCount, setOneWayCount] = useState<number>(0);

  const cascadeStepsData = [
    {
      step: 1,
      title: "Step 1: User types in View A → Model A mutated",
      activeNodes: ['viewA', 'modelA'],
      logText: "View A (Input Event) → Model A state mutated."
    },
    {
      step: 2,
      title: "Step 2: Model A listener fires → Controller mutates Model B",
      activeNodes: ['modelA', 'controller', 'modelB'],
      logText: "Model A listener → Controller mutates Model B state."
    },
    {
      step: 3,
      title: "Step 3: Model B update forces View B re-render → triggers Controller B",
      activeNodes: ['modelB', 'viewB', 'controllerB'],
      logText: "Model B mutation → View B re-rendered → Controller B listener triggered."
    },
    {
      step: 4,
      title: "Step 4: Vortex Loop! Controller C syncs back to Model A!",
      activeNodes: ['viewB', 'controllerC', 'modelA', 'controller'],
      logText: "VORTEX LOOP: Controller C mutates Model A again! Source of change lost in binding mesh!"
    }
  ];

  const handleStepCascade = () => {
    setCascadeStep((prev) => {
      const next = (prev % 4) + 1;
      const stepInfo = cascadeStepsData[next - 1];
      setDominoLogs((logs) => [
        ...logs,
        `[#${next}] ${stepInfo.logText}`
      ]);
      if (next === 4) {
        playSound('alert', soundEnabled);
      } else {
        playSound('step', soundEnabled);
      }
      return next;
    });
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      setIsAutoPlaying(false);
      playSound('click', soundEnabled);
    } else {
      setIsAutoPlaying(true);
      playSound('step', soundEnabled);
      handleStepCascade();
      autoPlayRef.current = setInterval(() => {
        handleStepCascade();
      }, 1400);
    }
  };

  useEffect(() => {
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const resetDomino = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setIsAutoPlaying(false);
    setCascadeStep(0);
    setDominoLogs(["• Idle: Ready to simulate cascading model updates. Click 'Next Step' to trace the vortex."]);
    playSound('click', soundEnabled);
  };

  const dispatchOneWay = () => {
    const nextCount = oneWayCount + 1;
    setOneWayCount(nextCount);
    setOneWayStep(1);
    playSound('step', soundEnabled);

    setOneWayLogs((prev) => [
      ...prev,
      `• Event [Action_#${nextCount}] → Pure state mutation → VDOM diff snapshot → Real DOM patched cleanly.`
    ]);

    setTimeout(() => setOneWayStep(2), 250);
    setTimeout(() => setOneWayStep(3), 500);
    setTimeout(() => setOneWayStep(0), 1200);
  };

  const resetOneWay = () => {
    setOneWayCount(0);
    setOneWayStep(0);
    setOneWayLogs(["• Event sent → Pure State mutation → Single-pass VDOM diff → Target DOM node updated cleanly."]);
    playSound('click', soundEnabled);
  };

  const isNodeActive = (nodeName: string) => {
    if (cascadeStep === 0) return false;
    const currentStepInfo = cascadeStepsData[cascadeStep - 1];
    return currentStepInfo?.activeNodes.includes(nodeName);
  };

  const getNodeClasses = (nodeName: string) => {
    const active = isNodeActive(nodeName);
    if (cascadeStep === 0) {
      return 'border-purple-500/40 bg-slate-900 text-purple-200 opacity-90';
    }
    if (active) {
      return 'border-rose-400 bg-rose-950 text-white font-bold scale-110 ring-2 ring-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.9)] z-20';
    }
    return 'border-slate-800 bg-slate-950/60 text-slate-500 opacity-35 scale-95 transition-all duration-300';
  };

  const activeStepInfo = cascadeStep > 0 ? cascadeStepsData[cascadeStep - 1] : null;

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-5 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-2 shrink-0">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          From Pre-React Chaos to the One-Way Revolution
        </h2>
        <p className="text-sm md:text-base text-slate-300 font-mono mt-0.5">
          How two-way binding domino loops led to React&apos;s unidirectional breakthrough
        </p>
      </div>

      {/* 50 / 50 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0 items-stretch">
        {/* Left: Classic MVC Architecture with Highlighted Cascade */}
        <div className="rounded-2xl border border-purple-500/40 bg-slate-950/80 p-4 flex flex-col justify-between shadow-[0_0_25px_rgba(168,85,247,0.08)] relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-purple-900/40 pb-2 shrink-0">
            <div>
              <h3 className="text-lg font-bold text-purple-300 font-mono flex items-center gap-2">
                <GitFork className="w-5 h-5 text-purple-400" />
                Pre-React: The Domino Cascade
              </h3>
              <p className="text-xs uppercase font-mono tracking-wider text-rose-400 font-semibold">
                Two-Way Binding Mesh • Untraceable Loops
              </p>
            </div>

            <div className="flex items-center gap-2">
              {cascadeStep > 0 && (
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-600 font-bold animate-pulse">
                  Step {cascadeStep}/4
                </span>
              )}
            </div>
          </div>

          {/* Active Step Banner */}
          <div className="my-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 animate-ping"></span>
              <span className="text-rose-300 font-bold truncate text-xs">
                {activeStepInfo ? activeStepInfo.title : "Click 'Next Step' to trace the domino chain"}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono shrink-0 hidden sm:inline">
              {activeStepInfo ? "Active Nodes Glowing" : "Ready"}
            </span>
          </div>

          {/* Complex Mesh SVG */}
          <div className="relative flex-1 min-h-[170px] flex items-center justify-center my-1">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
              <line x1="80" y1="45" x2="320" y2="45" stroke={cascadeStep === 1 ? "#f43f5e" : "#475569"} strokeWidth={cascadeStep === 1 ? "3.5" : "1.5"} opacity={cascadeStep === 1 ? 1 : 0.25} />
              <line x1="80" y1="45" x2="200" y2="100" stroke={cascadeStep === 2 ? "#f43f5e" : "#475569"} strokeWidth={cascadeStep === 2 ? "3.5" : "1.5"} opacity={cascadeStep === 2 ? 1 : 0.25} />
              <line x1="40" y1="100" x2="200" y2="100" stroke={cascadeStep === 2 ? "#f43f5e" : "#475569"} strokeWidth={cascadeStep === 2 ? "3.5" : "1.5"} opacity={cascadeStep === 2 ? 1 : 0.25} />
              <line x1="40" y1="100" x2="320" y2="155" stroke={cascadeStep === 3 ? "#f43f5e" : "#475569"} strokeWidth={cascadeStep === 3 ? "3.5" : "1.5"} opacity={cascadeStep === 3 ? 1 : 0.25} />
              <line x1="360" y1="100" x2="320" y2="155" stroke={cascadeStep === 3 ? "#f43f5e" : "#475569"} strokeWidth={cascadeStep === 3 ? "3.5" : "1.5"} opacity={cascadeStep === 3 ? 1 : 0.25} />
              <line x1="320" y1="155" x2="80" y2="155" stroke={cascadeStep === 4 ? "#f43f5e" : "#475569"} strokeWidth={cascadeStep === 4 ? "3.5" : "1.5"} opacity={cascadeStep === 4 ? 1 : 0.25} />
              <line x1="80" y1="155" x2="80" y2="45" stroke={cascadeStep === 4 ? "#f43f5e" : "#475569"} strokeWidth={cascadeStep === 4 ? "4" : "1.5"} opacity={cascadeStep === 4 ? 1 : 0.25} />
            </svg>

            {/* Nodes */}
            <div className={`absolute top-2 left-6 px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 ${getNodeClasses('modelA')}`}>
              Model A
            </div>
            <div className={`absolute top-2 right-6 px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 ${getNodeClasses('viewA')}`}>
              View A
            </div>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl border-2 text-xs font-mono font-bold transition-all duration-300 ${isNodeActive('controller') ? 'border-rose-400 bg-rose-950 text-white scale-110 shadow-[0_0_30px_rgba(244,63,94,0.9)] z-20 ring-2 ring-rose-500' : 'border-purple-500 bg-purple-950/80 text-white'}`}>
              Controller Hub
            </div>
            <div className={`absolute top-1/2 left-1 -translate-y-1/2 px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all duration-300 ${getNodeClasses('modelB')}`}>
              Model B
            </div>
            <div className={`absolute top-1/2 right-1 -translate-y-1/2 px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all duration-300 ${getNodeClasses('controllerB')}`}>
              Controller B
            </div>
            <div className={`absolute bottom-2 left-6 px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 ${getNodeClasses('controllerC')}`}>
              Controller C
            </div>
            <div className={`absolute bottom-2 right-6 px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 ${getNodeClasses('viewB')}`}>
              View B
            </div>
          </div>

          {/* Interactive Controls & Log */}
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 shrink-0 font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 text-xs font-bold">
                Trace Cascade Step-by-Step:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStepCascade}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-bold transition cursor-pointer flex items-center gap-1 active:scale-95"
                >
                  <Play className="w-3 h-3" /> Next Step ({cascadeStep}/4)
                </button>
                <button
                  type="button"
                  onClick={toggleAutoPlay}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                    isAutoPlaying ? 'bg-amber-600/30 text-amber-300 border-amber-500/50' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
                  <span className="hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Auto'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetDomino}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-300 font-mono space-y-1 h-14 overflow-y-auto pr-1">
              {dominoLogs.map((log, idx) => (
                <div key={idx} className={idx === 0 ? 'text-slate-400' : 'text-rose-400 font-medium'}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: React One-Way Data Flow */}
        <div className="rounded-2xl border border-cyan-500/40 bg-slate-950/80 p-4 flex flex-col justify-between shadow-[0_0_25px_rgba(6,182,212,0.08)] relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2 shrink-0">
            <div>
              <h3 className="text-lg font-bold text-cyan-300 font-mono flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                React Revolution: Unidirectional Flow
              </h3>
              <p className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
                UI = f(State) • Single Downward Pass
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              Predictable
            </span>
          </div>

          {/* Clean Loop Diagram with Flow */}
          <div className="relative flex-1 min-h-[170px] flex items-center justify-center my-1">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
              <line x1="200" y1="45" x2="200" y2="85" stroke="#06b6d4" strokeWidth={oneWayStep === 1 ? "4" : "2"} />
              <line x1="200" y1="125" x2="200" y2="155" stroke="#06b6d4" strokeWidth={oneWayStep === 2 ? "4" : "2"} />
              <line x1="270" y1="105" x2="310" y2="105" stroke="#06b6d4" strokeWidth="2" />
              <line x1="330" y1="85" x2="330" y2="35" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" />
              <line x1="330" y1="35" x2="240" y2="35" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" />
            </svg>

            {/* Nodes (BIGGER TEXT) */}
            <div className={`absolute top-2 px-6 py-2 rounded-xl border-2 text-xs font-mono font-bold transition-all duration-300 ${oneWayStep === 1 ? 'border-cyan-400 bg-cyan-950 text-white scale-110 shadow-lg' : 'bg-slate-900 border-cyan-500/60 text-cyan-200'}`}>
              State
            </div>

            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-7 py-3 rounded-2xl border-2 text-sm font-mono font-black text-white transition-all duration-300 ${oneWayStep === 2 ? 'bg-cyan-950 border-cyan-300 scale-110 shadow-2xl' : 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)]'}`}>
              Virtual DOM
            </div>

            <div className={`absolute bottom-2 px-6 py-2 rounded-xl border-2 text-xs font-mono font-bold transition-all duration-300 ${oneWayStep === 3 ? 'border-emerald-400 bg-emerald-950 text-white scale-110 shadow-lg' : 'bg-slate-900 border-cyan-500/60 text-cyan-200'}`}>
              Real DOM
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
              User Event
            </div>
          </div>

          {/* Interactive Demonstration */}
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 shrink-0 font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 text-xs font-bold">Unidirectional Dispatch:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={dispatchOneWay}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition cursor-pointer flex items-center gap-1 active:scale-95"
                >
                  <Zap className="w-3 h-3" /> Dispatch Explicit Event
                </button>
                <button
                  type="button"
                  onClick={resetOneWay}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="text-xs text-cyan-300/90 font-mono space-y-1 h-14 overflow-y-auto pr-1">
              {oneWayLogs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Key Takeaway */}
      <div className="mt-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center text-xs md:text-sm text-slate-300 font-mono shrink-0">
        <span className="text-rose-400 font-bold">The Problem:</span> Bidirectional binding produced circular domino loops. <span className="text-cyan-400 font-bold">The Breakthrough:</span> React made data flow strictly downward, restoring predictability at the cost of new V-DOM overhead.
      </div>
    </div>
  );
};
