import React, { useState } from 'react';
import { Layers, AlertTriangle, CheckCircle2, ShieldCheck, Code, Copy, Check } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide10TSRXInnovations: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const tabs = [
    "1. Control Flow",
    "2. Breaking Hooks Rules",
    "3. Scoped CSS",
    "4. Async & Error Boundaries"
  ];

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    playSound('switch', soundEnabled);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    playSound('success', soundEnabled);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-4 overflow-hidden">
      {/* Header & Tabs */}
      <div className="mb-1 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-purple-300 tracking-tight flex items-center gap-2">
            <span>TSRX Innovations: Beyond JSX • Statement-Based Rendering</span>
          </h2>
          <p className="text-[11px] md:text-xs text-slate-400">
            Dominic Gannaway&apos;s TypeScript Render Extension: replacing awkward expressions with native compiler directives
          </p>
        </div>
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleTabClick(idx)}
              className={`px-2.5 py-1 text-[11px] rounded font-mono font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
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
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0 items-stretch">
            {/* Left: Classic React (JSX) */}
            <div className="rounded-xl border border-rose-500/30 p-3 bg-slate-950/70 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-1.5 border-b border-rose-900/40 shrink-0">
                <span className="text-xs font-bold text-rose-300 font-mono">Classic React (JSX Expressions)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
                  Ternary &amp; Map Tricks
                </span>
              </div>
              <div className="flex-1 my-1.5 overflow-auto rounded bg-slate-900/90 p-2 font-mono text-[11px] leading-relaxed text-slate-300">
                <pre>
                  <code>
{`function MyComponent({ items, isLoading }) {
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items to show</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`}
                  </code>
                </pre>
              </div>
              <div className="text-[10px] text-rose-400/90 font-mono shrink-0 flex items-center gap-1.5 pt-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                <span>Unreadable nested ternaries, manual return statement, mandatory key attributes.</span>
              </div>
            </div>

            {/* Right: TSRX Native Control Flow */}
            <div className="rounded-xl border border-emerald-500/40 p-3 bg-slate-950/70 flex flex-col justify-between overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.08)]">
              <div className="flex items-center justify-between pb-1.5 border-b border-emerald-900/40 shrink-0">
                <span className="text-xs font-bold text-emerald-300 font-mono">TSRX (Native Statements)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Clean Compiler Directives
                </span>
              </div>
              <div className="flex-1 my-1.5 overflow-auto rounded bg-slate-900/90 p-2 font-mono text-[11px] leading-relaxed text-slate-300">
                <pre>
                  <code>
{`component MyComponent({ items, isLoading }) {
  <div>
    @if (isLoading) {
      <p>Loading...</p>
    } @else if (items.length === 0) {
      <p>No items to show</p>
    } @else {
      <ul>
        @for (let item of items) {
          <li>{item.name}</li>
        }
      </ul>
    }
  </div>
}`}
                  </code>
                </pre>
              </div>
              <div className="text-[10px] text-emerald-300 font-mono shrink-0 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span>Implicit root return, native statements, compiler-optimized looping without manual keys.</span>
              </div>
            </div>
          </div>
        )}

        {/* PANE 2: Breaking Hooks Rules */}
        {activeTab === 1 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0 items-stretch">
            <div className="rounded-xl border border-rose-500/30 p-3 bg-slate-950/70 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-1.5 border-b border-rose-900/40 shrink-0">
                <span className="text-xs font-bold text-rose-300 font-mono">React: Forbidden Inside Conditions!</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
                  Fatal Runtime Error
                </span>
              </div>
              <div className="flex-1 my-1.5 overflow-auto rounded bg-slate-900/90 p-2 font-mono text-[11px] leading-relaxed text-slate-300">
                <pre>
                  <code>
{`function UserProfile({ userId }) {
  if (userId) {
    // CRASH! React Hook called conditionally:
    const data = useFetchUser(userId);
    return <p>Hello, {data.name}</p>;
  }
  return <p>Please log in</p>;
}
// Error: Rendered fewer hooks than expected!`}
                  </code>
                </pre>
              </div>
              <div className="text-[10px] text-rose-400 font-mono shrink-0 pt-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>React requires static hook order across renders to track internal linked lists.</span>
              </div>
            </div>

            <div className="rounded-xl border border-purple-500/40 p-3 bg-slate-950/70 flex flex-col justify-between overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.1)]">
              <div className="flex items-center justify-between pb-1.5 border-b border-purple-900/40 shrink-0">
                <span className="text-xs font-bold text-purple-300 font-mono">TSRX: Compiler Hoisting</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  100% Valid Code
                </span>
              </div>
              <div className="flex-1 my-1.5 overflow-auto rounded bg-slate-900/90 p-2 font-mono text-[11px] leading-relaxed text-slate-300">
                <pre>
                  <code>
{`component UserProfile({ userId }) {
  <div>
    @if (userId) {
      // Completely legal in TSRX!
      const data = useFetchUser(userId);
      <p>Hello, {data.name}</p>;
    } @else {
      <p>Please log in</p>;
    }
  </div>
}`}
                  </code>
                </pre>
              </div>
              <div className="text-[10px] text-purple-300 font-mono shrink-0 pt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span><strong className="text-white">Smart Compiler Secret:</strong> TSRX hoists hooks to component root at build time, ensuring valid invocation order.</span>
              </div>
            </div>
          </div>
        )}

        {/* PANE 3: Scoped CSS */}
        {activeTab === 2 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0 items-stretch">
            <div className="rounded-xl border border-slate-800 p-3 bg-slate-950/70 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 shrink-0">
                <span className="text-xs font-bold text-slate-200 font-mono">React Styling Pain</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                  External Overhead
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-300 my-auto">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <strong className="text-rose-400 block mb-0.5">CSS-in-JS (Styled-Components / Emotion):</strong>
                  <span className="text-[11px] text-slate-400">Adds runtime string parsing and dynamic style tag injection overhead on every frame.</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <strong className="text-amber-400 block mb-0.5">CSS Modules:</strong>
                  <span className="text-[11px] text-slate-400">Requires separate <code>.module.css</code> files, cluttered imports, and manual class joining.</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 font-mono shrink-0 pt-1">
                Result: Developer friction or runtime performance penalties.
              </div>
            </div>

            <div className="rounded-xl border border-cyan-500/40 p-3 bg-slate-950/70 flex flex-col justify-between overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.08)]">
              <div className="flex items-center justify-between pb-1.5 border-b border-cyan-900/40 shrink-0">
                <span className="text-xs font-bold text-cyan-300 font-mono">TSRX Single-File Scoped CSS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Zero Runtime Cost
                </span>
              </div>
              <div className="flex-1 my-1.5 overflow-auto rounded bg-slate-900/90 p-2 font-mono text-[11px] leading-relaxed text-slate-300">
                <pre>
                  <code>
{`component StyledButton({ text }) {
  <button class="btn">
    {text}
  </button>

  <style>
    .btn {
      background-color: #0070f3;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
    }
  </style>
}`}
                  </code>
                </pre>
              </div>
              <div className="text-[10px] text-cyan-300 font-mono shrink-0 pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Compiler automatically hashes classes (e.g. <code>.btn_x82a</code>), preventing leaks with 0 extra runtime payload.</span>
              </div>
            </div>
          </div>
        )}

        {/* PANE 4: Async & Error Boundaries */}
        {activeTab === 3 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0 items-stretch">
            <div className="rounded-xl border border-slate-800 p-3 bg-slate-950/70 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 shrink-0">
                <span className="text-xs font-bold text-slate-200 font-mono">React Suspense &amp; Error Boundaries</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                  Class Components
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-300 my-auto">
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  In standard React, catching runtime render errors requires writing archaic <strong>Class Components</strong> with <code>componentDidCatch</code> or importing third-party libraries.
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Pairing Suspense fallback with Error Boundary fallback leads to deeply nested wrapper pyramids in JSX.
                </p>
              </div>
              <div className="text-[10px] text-slate-400 font-mono shrink-0 pt-1">
                Cumbersome boilerplate for basic asynchronous robustness.
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/40 p-3 bg-slate-950/70 flex flex-col justify-between overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.08)]">
              <div className="flex items-center justify-between pb-1.5 border-b border-amber-900/40 shrink-0">
                <span className="text-xs font-bold text-amber-300 font-mono">TSRX Native Boundaries (@try / @catch / @pending)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  Language Level
                </span>
              </div>
              <div className="flex-1 my-1.5 overflow-auto rounded bg-slate-900/90 p-2 font-mono text-[11px] leading-relaxed text-slate-300">
                <pre>
                  <code>
{`component Dashboard() {
  <div>
    @try {
      <SuspensefulWidget />
    } @pending {
      <p>Loading dashboard metrics...</p>
    } @catch (error) {
      <p>Failed to load component: {error.message}</p>
    }
  </div>
}`}
                  </code>
                </pre>
              </div>
              <div className="text-[10px] text-amber-300 font-mono shrink-0 pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Combines Error Boundaries &amp; Suspense into intuitive, statement-driven language constructs.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Matrix Summary Comparison Table */}
      <div className="shrink-0 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-[10px] font-mono mt-1 overflow-x-auto">
        <div className="grid grid-cols-4 gap-2 text-center text-slate-300 divide-x divide-slate-800">
          <div>
            <span className="text-slate-500 block text-[9px] uppercase">Core Paradigm</span>
            <strong className="text-white">Statements vs Expressions</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[9px] uppercase">Conditionals &amp; Loops</span>
            <strong className="text-emerald-400">@if, @else, @for Directives</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[9px] uppercase">Hooks Freedom</span>
            <strong className="text-purple-300">Hoisted &amp; Allowed Everywhere</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[9px] uppercase">Compilation Targets</span>
            <strong className="text-cyan-400">React • Octane • Solid • Vue</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
