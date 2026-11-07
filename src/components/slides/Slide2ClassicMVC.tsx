import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, GitFork, Play, RotateCcw, ShieldCheck, Zap, AlertTriangle, RefreshCw, Pause } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface Slide2Props {
  soundEnabled: boolean;
}

export const Slide2ClassicMVC: React.FC<Slide2Props> = ({ soundEnabled }) => {
  const [cascadeStep, setCascadeStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const [dominoLogs, setDominoLogs] = useState<string[]>([
    "• Idle: Ready to simulate cascading model updates. Click 'Trigger Cascade' to trace the vortex."
  ]);
  const [oneWayLogs, setOneWayLogs] = useState<string[]>([
    "• Event sent → State mutated → Single pass VDOM diff → Target DOM node updated cleanly."
  ]);
  const [oneWayStep, setOneWayStep] = useState<number>(0);
  const [oneWayCount, setOneWayCount] = useState<number>(0);

  const cascadeStepsData = [
    {
      step: 1,
      title: "Step 1: User types in View A → Model A mutated",
      desc: "User inputs text in View A. The model listener fires immediately to update Model A state.",
      activeNodes: ['viewA', 'modelA'],
      logText: "View A (Input Event) → Model A state mutated."
    },
    {
      step: 2,
      title: "Step 2: Model A listener fires → Controller mutates Model B",
      desc: "Model A's change triggers Controller listener, which imperatively mutates Model B behind the scenes.",
      activeNodes: ['modelA', 'controller', 'modelB'],
      logText: "Model A listener → Controller mutates Model B state."
    },
    {
      step: 3,
      title: "Step 3: Model B update forces View B re-render → triggers Controller B",
      desc: "Model B emits a change event, causing View B to re-render, which in turn triggers Controller B handlers.",
      activeNodes: ['modelB', 'viewB', 'controllerB'],
      logText: "Model B mutation → View B re-rendered → Controller B listener triggered."
    },
    {
      step: 4,
      title: "Step 4: Vortex Formed! Controller C syncs back to Model A",
      desc: "View B's re-render triggers Controller C, which attempts to synchronize data back into Model A! Circular dependency loop!",
      activeNodes: ['viewB', 'controllerC', 'modelA', 'controller'],
      logText: "Vortex Loop: Controller C attempts sync back to Model A! Source of change lost in binding mesh!"
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
      }, 1500);
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
    setDominoLogs(["• Idle: Ready to simulate cascading model updates. Click 'Trigger Cascade' to trace the vortex."]);
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

    // Animate downward step through nodes
    setTimeout(() => setOneWayStep(2), 250);
    setTimeout(() => setOneWayStep(3), 500);
    setTimeout(() => setOneWayStep(0), 1200);
  };

  const resetOneWay = () => {
    setOneWayCount(0);
    setOneWayStep(0);
    setOneWayLogs(["• Event sent → State mutated → Single pass VDOM diff → Target DOM node updated cleanly."]);
    playSound('click', soundEnabled);
  };

  // Node highlight helpers
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
      return 'border-rose-400 bg-rose-950 text-white font-bold scale-110 ring-2 ring-rose-500 shadow-[0_0_22px_rgba(244,63,94,0.8)] z-20';
    }
    return 'border-slate-800 bg-slate-950/60 text-slate-500 opacity-35 scale-95 transition-all duration-300';
  };

  // Active step info
  const activeStepInfo = cascadeStep > 0 ? cascadeStepsData[cascadeStep - 1] : null;

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-4 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-2 shrink-0">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Classic MVC vs. One-Way Data Flow
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-mono mt-0.5">
          Why Facebook abandoned bidirectional binding to stop the cascading Domino Effect
        </p>
      </div>

      {/* 50 / 50 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0 items-stretch">
        {/* Left: Classic MVC Architecture with Highlighted Cascade */}
        <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-4 flex flex-col justify-between shadow-[0_0_25px_rgba(168,85,247,0.06)] relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 shrink-0">
            <div>
              <h3 className="text-base font-bold text-purple-300 font-mono flex items-center gap-2">
                <GitFork className="w-4 h-4 text-purple-400" />
                Classic MVC Architecture
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-rose-400">
                Complex Binding Flow • Domino Cascade Vortex
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {cascadeStep > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-600 font-bold animate-pulse">
                  Step {cascadeStep}/4
                </span>
              )}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                Bidirectional Mesh
              </span>
            </div>
          </div>

          {/* Active Step Banner */}
          <div className="my-1.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 animate-ping"></span>
              <span className="text-rose-300 font-bold truncate text-[11px]">
                {activeStepInfo ? activeStepInfo.title : "Ready: Trigger cascade to trace active chain"}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono shrink-0 hidden sm:inline">
              {activeStepInfo ? "Active Nodes Glowing" : "Idle"}
            </span>
          </div>

          {/* Complex Mesh SVG with Active Line Lighting */}
          <div className="relative flex-1 min-h-[180px] flex items-center justify-center my-1">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
              {/* Line 1: View A to Model A (Top) */}
              <line
                x1="80"
                y1="50"
                x2="320"
                y2="50"
                stroke={cascadeStep === 1 ? "#f43f5e" : "#475569"}
                strokeWidth={cascadeStep === 1 ? "3" : "1.5"}
                className={cascadeStep === 1 ? "flow-line" : ""}
                opacity={cascadeStep === 1 ? 1 : 0.3}
              />

              {/* Line 2: Model A to Controller */}
              <line
                x1="80"
                y1="50"
                x2="200"
                y2="100"
                stroke={cascadeStep === 2 ? "#f43f5e" : "#475569"}
                strokeWidth={cascadeStep === 2 ? "3" : "1.5"}
                className={cascadeStep === 2 ? "flow-line" : ""}
                opacity={cascadeStep === 2 ? 1 : 0.3}
              />

              {/* Line 3: Controller to Model B */}
              <line
                x1="40"
                y1="100"
                x2="200"
                y2="100"
                stroke={cascadeStep === 2 ? "#f43f5e" : "#475569"}
                strokeWidth={cascadeStep === 2 ? "3" : "1.5"}
                className={cascadeStep === 2 ? "flow-line" : ""}
                opacity={cascadeStep === 2 ? 1 : 0.3}
              />

              {/* Line 4: Model B to View B */}
              <line
                x1="40"
                y1="100"
                x2="320"
                y2="150"
                stroke={cascadeStep === 3 ? "#f43f5e" : "#475569"}
                strokeWidth={cascadeStep === 3 ? "3" : "1.5"}
                className={cascadeStep === 3 ? "flow-line" : ""}
                opacity={cascadeStep === 3 ? 1 : 0.3}
              />

              {/* Line 5: Controller B to View B */}
              <line
                x1="360"
                y1="100"
                x2="320"
                y2="150"
                stroke={cascadeStep === 3 ? "#f43f5e" : "#475569"}
                strokeWidth={cascadeStep === 3 ? "3" : "1.5"}
                className={cascadeStep === 3 ? "flow-line" : ""}
                opacity={cascadeStep === 3 ? 1 : 0.3}
              />

              {/* Line 6: View B to Controller C */}
              <line
                x1="320"
                y1="150"
                x2="80"
                y2="150"
                stroke={cascadeStep === 4 ? "#f43f5e" : "#475569"}
                strokeWidth={cascadeStep === 4 ? "3" : "1.5"}
                className={cascadeStep === 4 ? "flow-line" : ""}
                opacity={cascadeStep === 4 ? 1 : 0.3}
              />

              {/* Line 7: Controller C back to Model A (VORTEX LOOP) */}
              <line
                x1="80"
                y1="150"
                x2="80"
                y2="50"
                stroke={cascadeStep === 4 ? "#f43f5e" : "#475569"}
                strokeWidth={cascadeStep === 4 ? "3.5" : "1.5"}
                className={cascadeStep === 4 ? "flow-line" : ""}
                opacity={cascadeStep === 4 ? 1 : 0.3}
              />

              {/* Cross mesh secondary lines */}
              <line x1="320" y1="50" x2="200" y2="100" stroke="#475569" strokeWidth="1" opacity="0.2" />
              <line x1="320" y1="50" x2="320" y2="150" stroke="#475569" strokeWidth="1" opacity="0.2" />
              <line x1="80" y1="150" x2="200" y2="100" stroke="#475569" strokeWidth="1" opacity="0.2" />
            </svg>

            {/* Nodes with Dynamic Highlights */}
            {/* Model A */}
            <div
              className={`absolute top-3 left-8 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 ${getNodeClasses(
                'modelA'
              )}`}
            >
              Model A
              {isNodeActive('modelA') && (
                <span className="absolute -top-2 -right-1 px-1 py-0.2 rounded bg-rose-600 text-[8px] font-bold text-white shadow animate-bounce">
                  MUTATING
                </span>
              )}
            </div>

            {/* View A */}
            <div
              className={`absolute top-3 right-8 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 ${getNodeClasses(
                'viewA'
              )}`}
            >
              View A
              {isNodeActive('viewA') && (
                <span className="absolute -top-2 -right-1 px-1 py-0.2 rounded bg-rose-600 text-[8px] font-bold text-white shadow animate-bounce">
                  INPUT
                </span>
              )}
            </div>

            {/* Controller (Center Hub) */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-xl border-2 text-xs font-mono font-bold transition-all duration-300 ${
                isNodeActive('controller')
                  ? 'border-rose-400 bg-rose-950 text-white scale-110 shadow-[0_0_30px_rgba(244,63,94,0.9)] z-20 ring-2 ring-rose-500 animate-pulse'
                  : cascadeStep === 0
                  ? 'border-purple-500 bg-purple-950/80 text-white'
                  : 'border-slate-800 bg-slate-950/60 text-slate-500 opacity-40 scale-95'
              }`}
            >
              Controller Hub
              {isNodeActive('controller') && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded bg-rose-600 text-[8px] font-bold text-white shadow whitespace-nowrap">
                  ROUTING CASCADE
                </span>
              )}
            </div>

            {/* Model B */}
            <div
              className={`absolute top-1/2 left-2 -translate-y-1/2 px-2.5 py-1 rounded-lg border text-[10px] font-mono transition-all duration-300 ${getNodeClasses(
                'modelB'
              )}`}
            >
              Model B
              {isNodeActive('modelB') && (
                <span className="absolute -top-2 -right-1 px-1 py-0.2 rounded bg-rose-600 text-[8px] font-bold text-white shadow animate-bounce">
                  MUTATING
                </span>
              )}
            </div>

            {/* Controller B */}
            <div
              className={`absolute top-1/2 right-2 -translate-y-1/2 px-2.5 py-1 rounded-lg border text-[10px] font-mono transition-all duration-300 ${getNodeClasses(
                'controllerB'
              )}`}
            >
              Controller B
              {isNodeActive('controllerB') && (
                <span className="absolute -top-2 -right-1 px-1 py-0.2 rounded bg-rose-600 text-[8px] font-bold text-white shadow">
                  LISTENER
                </span>
              )}
            </div>

            {/* Controller C */}
            <div
              className={`absolute bottom-3 left-8 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 ${getNodeClasses(
                'controllerC'
              )}`}
            >
              Controller C
              {isNodeActive('controllerC') && (
                <span className="absolute -top-2 -right-1 px-1 py-0.2 rounded bg-rose-600 text-[8px] font-bold text-white shadow animate-bounce">
                  SYNC LOOP
                </span>
              )}
            </div>

            {/* View B */}
            <div
              className={`absolute bottom-3 right-8 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 ${getNodeClasses(
                'viewB'
              )}`}
            >
              View B
              {isNodeActive('viewB') && (
                <span className="absolute -top-2 -right-1 px-1 py-0.2 rounded bg-rose-600 text-[8px] font-bold text-white shadow animate-bounce">
                  RE-RENDERING
                </span>
              )}
            </div>

            {/* Labels */}
            <span className="absolute top-0.5 text-[9px] font-mono text-rose-400 bg-slate-950 px-2 py-0.5 rounded border border-rose-900/80">
              {cascadeStep === 4 ? "CIRCULAR LOOP CLOSED!" : "DATA BINDING CYCLE"}
            </span>
            <span className="absolute bottom-0.5 text-[9px] font-mono text-rose-400 bg-slate-950 px-2 py-0.5 rounded border border-rose-900/80">
              {cascadeStep > 0 ? `CASCADE VORTEX IN MOTION (${cascadeStep}/4)` : "COMPLEX BINDING FLOW"}
            </span>
          </div>

          {/* Interactive Controls & Log */}
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 shrink-0 font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[11px] font-bold">
                Trace Cascade Vortex Step-by-Step:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleStepCascade}
                  className="px-2.5 py-1 rounded bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-[10px] font-bold transition cursor-pointer flex items-center gap-1 active:scale-95"
                >
                  <Play className="w-2.5 h-2.5" /> Next Cascade Step ({cascadeStep}/4)
                </button>
                <button
                  type="button"
                  onClick={toggleAutoPlay}
                  title={isAutoPlaying ? "Pause continuous loop" : "Auto-run cascade vortex"}
                  className={`px-2 py-1 rounded border text-[10px] font-bold transition cursor-pointer flex items-center gap-1 ${
                    isAutoPlaying
                      ? 'bg-amber-600/30 text-amber-300 border-amber-500/50'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  {isAutoPlaying ? <Pause className="w-2.5 h-2.5" /> : <RefreshCw className="w-2.5 h-2.5" />}
                  <span className="hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Auto'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetDomino}
                  title="Reset cascade"
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white text-[10px] transition cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 font-mono space-y-1 h-16 overflow-y-auto pr-1">
              {dominoLogs.map((log, idx) => (
                <div key={idx} className={idx === 0 ? 'text-slate-400' : 'text-rose-400'}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: React One-Way Data Flow (with Complementary Highlight) */}
        <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/70 p-4 flex flex-col justify-between shadow-[0_0_25px_rgba(6,182,212,0.06)] relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-cyan-900/30 pb-2 shrink-0">
            <div>
              <h3 className="text-base font-bold text-cyan-300 font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                One-Way Data Flow (React)
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-cyan-400">
                Strictly Downward • Explicit Events
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Predictable
            </span>
          </div>

          {/* Clean Loop Diagram with Dynamic Execution Flow */}
          <div className="relative flex-1 min-h-[180px] flex items-center justify-center my-2">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
              <line
                x1="200"
                y1="45"
                x2="200"
                y2="85"
                stroke="#06b6d4"
                strokeWidth={oneWayStep === 1 ? "3" : "2"}
                className={oneWayStep === 1 ? "flow-line" : ""}
              />
              <line
                x1="200"
                y1="125"
                x2="200"
                y2="155"
                stroke="#06b6d4"
                strokeWidth={oneWayStep === 2 ? "3" : "2"}
                className={oneWayStep === 2 ? "flow-line" : ""}
              />
              <line x1="270" y1="105" x2="310" y2="105" stroke="#06b6d4" strokeWidth="2" />
              <line x1="330" y1="85" x2="330" y2="35" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" />
              <line x1="330" y1="35" x2="240" y2="35" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" />
            </svg>

            {/* Nodes */}
            <div
              className={`absolute top-2 px-6 py-2 rounded-xl border-2 text-xs font-mono font-bold transition-all duration-300 ${
                oneWayStep === 1
                  ? 'border-cyan-400 bg-cyan-950 text-white scale-105 shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                  : 'bg-slate-900 border-cyan-500/60 text-cyan-200 shadow'
              }`}
            >
              State
            </div>

            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-7 py-3 rounded-2xl border-2 text-sm font-mono font-black text-white transition-all duration-300 ${
                oneWayStep === 2
                  ? 'bg-cyan-950 border-cyan-300 scale-105 shadow-[0_0_30px_rgba(6,182,212,0.7)]'
                  : 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
              }`}
            >
              Virtual DOM
            </div>

            <div
              className={`absolute bottom-2 px-6 py-2 rounded-xl border-2 text-xs font-mono font-bold transition-all duration-300 ${
                oneWayStep === 3
                  ? 'border-emerald-400 bg-emerald-950 text-white scale-105 shadow-[0_0_20px_rgba(16,185,129,0.6)]'
                  : 'bg-slate-900 border-cyan-500/60 text-cyan-200 shadow'
              }`}
            >
              UI
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
              DOM
            </div>

            <span className="absolute top-12 left-12 text-[9px] font-mono text-cyan-400 flex items-center gap-1">
              STATE MUTATION <ArrowDown className="w-2.5 h-2.5 inline" />
            </span>
            <span className="absolute bottom-12 left-12 text-[9px] font-mono text-cyan-400 flex items-center gap-1">
              DIFFING ALGORITHM <ArrowDown className="w-2.5 h-2.5 inline" />
            </span>
            <span className="absolute top-2 right-12 text-[9px] font-mono text-slate-400">
              EXPLICIT EVENT ↑
            </span>
          </div>

          {/* Interactive Demonstration */}
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 shrink-0 font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[11px] font-bold">Unidirectional Flow:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={dispatchOneWay}
                  className="px-2 py-1 rounded bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 text-[10px] transition cursor-pointer flex items-center gap-1 active:scale-95"
                >
                  <Zap className="w-2.5 h-2.5" /> Dispatch Explicit Event
                </button>
                <button
                  type="button"
                  onClick={resetOneWay}
                  title="Clear log"
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white text-[10px] transition cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
            <div className="text-[10px] text-cyan-300/90 font-mono space-y-1 h-16 overflow-y-auto pr-1">
              {oneWayLogs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Key Takeaway */}
      <div className="mt-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-400 font-mono shrink-0">
        <span className="text-rose-400 font-bold">The Problem:</span> Two-way binding produced uncontrollable domino loops. <span className="text-cyan-400 font-bold">The Fix:</span> React made flow one-way, restoring predictability at the cost of new diffing overhead.
      </div>
    </div>
  );
};
