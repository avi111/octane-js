import React, { useState } from 'react';
import { Layers, AlertTriangle, CheckCircle2, ShieldCheck, Code, Copy, Check, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide10TSRXInnovations: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    "1. Control Flow (@if / @for)",
    "2. Hoisted Hooks (No Rules)",
    "3. Scoped CSS (Zero Runtime)",
    "4. Boundaries (@try / @pending)"
  ];

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    playSound('switch', soundEnabled);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-6 overflow-hidden text-left dir-ltr">
      {/* Header & Tabs */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm font-mono font-bold text-purple-400 uppercase tracking-widest">
              Pillar 03 // The Language Revolution
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 font-bold hidden sm:inline">
              By Dominic Gannaway (React &amp; Svelte Core)
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-0.5">
            Dominic Gannaway &amp; TSRX Innovations
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-mono mt-0.5">
            Bringing native statements, compiler-hoisted hooks, and zero-runtime CSS into TypeScript JSX
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0 font-mono">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleTabClick(idx)}
              className={`px-3 py-1.5 text-xs md:text-sm rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-105'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panes */}
      <div className="flex-1 min-h-0 my-1 overflow-hidden flex flex-col justify-between">
        {/* PANE 1: Control Flow */}
        {activeTab === 0 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0 items-stretch">
            {/* Left: Classic React (JSX) */}
            <div className="rounded-2xl border border-rose-500/40 p-4 bg-slate-950/85 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-rose-900/50 shrink-0">
                <span className="text-sm md:text-base font-bold text-rose-300 font-mono">Classic React JSX (Expressions Only)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
                  Ternary &amp; Map Boilerplate
                </span>
              </div>
              <div className="flex-1 my-2 overflow-auto rounded-xl bg-slate-900/90 p-3 font-mono text-xs md:text-sm leading-relaxed text-slate-300">
                <pre>
                  <code>
{`function UserList({ users, isLoading }) {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : users.length === 0 ? (
        <Empty />
      ) : (
        <ul>
          {users.map(u => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`}
                  </code>
                </pre>
              </div>
              <div className="text-xs text-rose-400 font-mono shrink-0 flex items-center gap-1.5 pt-1">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Deeply nested ternaries, awkward syntax, mandatory manual keys.</span>
              </div>
            </div>

            {/* Right: TSRX Native Control Flow */}
            <div className="rounded-2xl border border-emerald-500/50 p-4 bg-slate-950/85 flex flex-col justify-between overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.1)]">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-900/50 shrink-0">
                <span className="text-sm md:text-base font-bold text-emerald-300 font-mono">TSRX Native Directives (Statements)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Clean Language Syntax
                </span>
              </div>
              <div className="flex-1 my-2 overflow-auto rounded-xl bg-slate-900/90 p-3 font-mono text-xs md:text-sm leading-relaxed text-emerald-200">
                <pre>
                  <code>
{`component UserList({ users, isLoading }) {
  <div>
    @if (isLoading) {
      <Spinner />
    } @else if (users.length === 0) {
      <Empty />
    } @else {
      <ul>
        @for (let u of users) {
          <li>{u.name}</li>
        }
      </ul>
    }
  </div>
}`}
                  </code>
                </pre>
              </div>
              <div className="text-xs text-emerald-300 font-mono shrink-0 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Compiler generates optimal DOM mutations without keys or wrapping arrays.</span>
              </div>
            </div>
          </div>
        )}

        {/* PANE 2: Breaking Hooks Rules */}
        {activeTab === 1 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0 items-stretch">
            <div className="rounded-2xl border border-rose-500/40 p-4 bg-slate-950/85 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-rose-900/50 shrink-0">
                <span className="text-sm md:text-base font-bold text-rose-300 font-mono">React: Rules of Hooks Jail</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
                  Fatal Runtime Crash
                </span>
              </div>
              <div className="flex-1 my-2 overflow-auto rounded-xl bg-slate-900/90 p-3 font-mono text-xs md:text-sm leading-relaxed text-slate-300">
                <pre>
                  <code>
{`function UserProfile({ userId }) {
  if (userId) {
    // FATAL CRASH in React!
    // Hook called conditionally:
    const data = useFetchUser(userId);
    return <h1>Hello, {data.name}</h1>;
  }
  return <p>Sign in required</p>;
}
// Error: Rendered fewer hooks than expected.`}
                  </code>
                </pre>
              </div>
              <div className="text-xs text-rose-400 font-mono shrink-0 pt-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>React relies on fixed call order to match linked-list hook state.</span>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-500/50 p-4 bg-slate-950/85 flex flex-col justify-between overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.1)]">
              <div className="flex items-center justify-between pb-2 border-b border-purple-900/50 shrink-0">
                <span className="text-sm md:text-base font-bold text-purple-300 font-mono">TSRX: Compiler Hoisting</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  100% Legal Code
                </span>
              </div>
              <div className="flex-1 my-2 overflow-auto rounded-xl bg-slate-900/90 p-3 font-mono text-xs md:text-sm leading-relaxed text-purple-200">
                <pre>
                  <code>
{`component UserProfile({ userId }) {
  <div>
    @if (userId) {
      // Completely valid in TSRX!
      const data = useFetchUser(userId);
      <h1>Hello, {data.name}</h1>;
    } @else {
      <p>Sign in required</p>;
    }
  </div>
}`}
                  </code>
                </pre>
              </div>
              <div className="text-xs text-purple-300 font-mono shrink-0 pt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Build-time hoisting: TSRX moves hook initialization to root with conditional guards.</span>
              </div>
            </div>
          </div>
        )}

        {/* PANE 3: Scoped CSS */}
        {activeTab === 2 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0 items-stretch">
            <div className="rounded-2xl border border-slate-800 p-4 bg-slate-950/85 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 shrink-0">
                <span className="text-sm md:text-base font-bold text-slate-200 font-mono">React CSS Friction</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                  Runtime Bloat
                </span>
              </div>
              <div className="space-y-3 text-xs md:text-sm text-slate-300 my-auto">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-rose-400 block mb-1 text-sm">CSS-in-JS (Styled-Components / Emotion):</strong>
                  <span className="text-slate-300">Parses strings at runtime and injects <code>&lt;style&gt;</code> tags on every animation frame.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-amber-400 block mb-1 text-sm">CSS Modules:</strong>
                  <span className="text-slate-300">Requires separate files, fragmented folder structures, and manual imports.</span>
                </div>
              </div>
              <div className="text-xs text-slate-400 font-mono shrink-0 pt-1">
                Friction: Developers chose between slow runtimes or scattered files.
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-500/50 p-4 bg-slate-950/85 flex flex-col justify-between overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.1)]">
              <div className="flex items-center justify-between pb-2 border-b border-cyan-900/50 shrink-0">
                <span className="text-sm md:text-base font-bold text-cyan-300 font-mono">TSRX Single-File Scoped CSS</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Zero Runtime Overhead
                </span>
              </div>
              <div className="flex-1 my-2 overflow-auto rounded-xl bg-slate-900/90 p-3 font-mono text-xs md:text-sm leading-relaxed text-cyan-200">
                <pre>
                  <code>
{`component PrimaryButton({ text }) {
  <button class="btn">
    {text}
  </button>

  <style>
    .btn {
      background: #0284c7;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
    }
  </style>
}`}
                  </code>
                </pre>
              </div>
              <div className="text-xs text-cyan-300 font-mono shrink-0 pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Compiler generates unique hash classes (e.g. <code>.btn_8f2a</code>) with zero JS runtime.</span>
              </div>
            </div>
          </div>
        )}

        {/* PANE 4: Async & Error Boundaries */}
        {activeTab === 3 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0 items-stretch">
            <div className="rounded-2xl border border-slate-800 p-4 bg-slate-950/85 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 shrink-0">
                <span className="text-sm md:text-base font-bold text-slate-200 font-mono">React Error Boundaries</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                  Legacy Classes
                </span>
              </div>
              <div className="space-y-3 text-xs md:text-sm text-slate-300 my-auto">
                <p className="leading-relaxed">
                  React still requires 1990s-style <strong>Class Components</strong> with <code>componentDidCatch()</code> to handle runtime render crashes.
                </p>
                <p className="leading-relaxed text-slate-400">
                  Combining Suspense with Error Boundaries creates deeply nested JSX wrapper trees.
                </p>
              </div>
              <div className="text-xs text-slate-400 font-mono shrink-0 pt-1">
                Boilerplate overload for everyday asynchronous UI states.
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/50 p-4 bg-slate-950/85 flex flex-col justify-between overflow-hidden shadow-[0_0_25px_rgba(245,158,11,0.1)]">
              <div className="flex items-center justify-between pb-2 border-b border-amber-900/50 shrink-0">
                <span className="text-sm md:text-base font-bold text-amber-300 font-mono">TSRX Language Directives (@try / @pending)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Built-in Statements
                </span>
              </div>
              <div className="flex-1 my-2 overflow-auto rounded-xl bg-slate-900/90 p-3 font-mono text-xs md:text-sm leading-relaxed text-amber-200">
                <pre>
                  <code>
{`component AnalyticsDashboard() {
  <div>
    @try {
      <LiveRevenueFeed />
    } @pending {
      <SkeletonLoader />
    } @catch (err) {
      <Alert message={err.message} />
    }
  </div>
}`}
                  </code>
                </pre>
              </div>
              <div className="text-xs text-amber-300 font-mono shrink-0 pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Unified error and loading states baked directly into the compiler.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Matrix */}
      <div className="shrink-0 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs md:text-sm font-mono mt-1">
        <div className="grid grid-cols-4 gap-2 text-center text-slate-300 divide-x divide-slate-800">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Syntax Model</span>
            <strong className="text-white">Statements vs Expressions</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Loops &amp; Conditions</span>
            <strong className="text-emerald-400">@if, @for Directives</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Hooks Rules</span>
            <strong className="text-purple-300">Hoisted &amp; Unrestricted</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Compiler Targets</span>
            <strong className="text-cyan-400">React • Octane • Solid</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

