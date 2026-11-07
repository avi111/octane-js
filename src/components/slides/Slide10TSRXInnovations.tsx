import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide10TSRXInnovations: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    playSound('success', soundEnabled);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeSnippets = {
    pane0React: `function UserList({ users, isLoading }) {
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
}`,
    pane0Tsrx: `component UserList({ users, isLoading }) {
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
}`,
    pane1React: `function UserProfile({ userId }) {
  if (userId) {
    // FATAL RUNTIME CRASH in React!
    // Hook called conditionally violates Hook Order:
    const data = useFetchUser(userId);
    return <h1>Hello, {data.name}</h1>;
  }
  return <p>Sign in required</p>;
}
// Error: Rendered fewer hooks than expected.`,
    pane1Tsrx: `component UserProfile({ userId }) {
  <div>
    @if (userId) {
      // 100% Valid & Legal in TSRX!
      // Compiler hoists hook with conditional guard:
      const data = useFetchUser(userId);
      <h1>Hello, {data.name}</h1>;
    } @else {
      <p>Sign in required</p>;
    }
  </div>
}`,
    pane2React: `// React CSS Friction: Runtime or Scattered Files
// 1. CSS-in-JS (styled-components / emotion):
//    Heavy runtime string parser & <style> tag injection.
// 2. CSS Modules:
//    Requires separate .module.css files & manual imports.

export function Button({ children }) {
  return <button className={styles.btn}>{children}</button>;
}`,
    pane2Tsrx: `component PrimaryButton({ text }) {
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
}`,
    pane3React: `// React Error & Loading Handling:
// Requires legacy 1990s Class Components with componentDidCatch()
// Combining Suspense + ErrorBoundary creates wrapper soup:
<ErrorBoundary fallback={<ErrorAlert />}>
  <Suspense fallback={<SkeletonLoader />}>
    <LiveFeed />
  </Suspense>
</ErrorBoundary>`,
    pane3Tsrx: `component AnalyticsDashboard() {
  <div>
    @try {
      <LiveRevenueFeed />
    } @pending {
      <SkeletonLoader />
    } @catch (err) {
      <Alert message={err.message} />
    }
  </div>
}`
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2.5 sm:p-4 md:p-5 overflow-hidden text-left dir-ltr">
      {/* 1. ROW 1: "Dominic Gannaway & TSRX Innovations" Title in a Row */}
      <div className="shrink-0 pb-1.5 border-b border-slate-800/80">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
              Pillar 03 // The Language Revolution
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 font-bold">
              By Dominic Gannaway (React &amp; Svelte Core)
            </span>
          </div>
          <span className="text-xs font-mono text-purple-400 font-bold hidden sm:inline">
            Slide 10 of 14
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
          Dominic Gannaway &amp; TSRX Innovations
        </h2>
      </div>

      {/* 2. ROW 2: Under that, the 4 buttons */}
      <div className="shrink-0 my-1.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto font-mono">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleTabClick(idx)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition whitespace-nowrap cursor-pointer ${
              activeTab === idx
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] ring-1 ring-purple-400'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. ROW 3: Under that, the examples (taking full remaining height so all code is 100% visible) */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col justify-between my-0.5">
        {/* PANE 0: Control Flow */}
        {activeTab === 0 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0 items-stretch">
            {/* Left: Classic React JSX */}
            <div className="rounded-xl border border-rose-500/40 p-3 sm:p-3.5 bg-slate-950/95 flex flex-col justify-between shadow-xl min-h-0">
              <div className="flex items-center justify-between pb-1.5 border-b border-rose-900/50 shrink-0">
                <span className="text-xs sm:text-sm font-bold text-rose-300 font-mono">Classic React JSX (Expressions Only)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold">
                  Ternary &amp; Map Boilerplate
                </span>
              </div>
              <div className="relative my-1.5 rounded-lg bg-slate-900/90 p-2.5 sm:p-3 font-mono text-[11px] sm:text-xs md:text-[13px] leading-snug sm:leading-relaxed text-slate-300 border border-slate-800 flex-1 min-h-0 flex items-center overflow-auto">
                <button
                  type="button"
                  onClick={() => handleCopy(codeSnippets.pane0React, 'p0r')}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800"
                >
                  {copiedCode === 'p0r' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'p0r' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="w-full">
                  <code>{codeSnippets.pane0React}</code>
                </pre>
              </div>
              <div className="text-[11px] sm:text-xs text-rose-400 font-mono shrink-0 flex items-center gap-1.5 pt-1 border-t border-slate-900">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Deeply nested ternaries, awkward syntax, mandatory manual keys.</span>
              </div>
            </div>

            {/* Right: TSRX Native Control Flow */}
            <div className="rounded-xl border border-emerald-500/50 p-3 sm:p-3.5 bg-slate-950/95 flex flex-col justify-between shadow-xl min-h-0">
              <div className="flex items-center justify-between pb-1.5 border-b border-emerald-900/50 shrink-0">
                <span className="text-xs sm:text-sm font-bold text-emerald-300 font-mono">TSRX Native Directives (Statements)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  Clean Language Syntax
                </span>
              </div>
              <div className="relative my-1.5 rounded-lg bg-slate-900/90 p-2.5 sm:p-3 font-mono text-[11px] sm:text-xs md:text-[13px] leading-snug sm:leading-relaxed text-emerald-200 border border-slate-800 flex-1 min-h-0 flex items-center overflow-auto">
                <button
                  type="button"
                  onClick={() => handleCopy(codeSnippets.pane0Tsrx, 'p0t')}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800"
                >
                  {copiedCode === 'p0t' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'p0t' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="w-full">
                  <code>{codeSnippets.pane0Tsrx}</code>
                </pre>
              </div>
              <div className="text-[11px] sm:text-xs text-emerald-300 font-mono shrink-0 flex items-center gap-1.5 pt-1 border-t border-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span>Compiler generates optimal DOM mutations without keys or wrapping arrays.</span>
              </div>
            </div>
          </div>
        )}

        {/* PANE 1: Breaking Hooks Rules */}
        {activeTab === 1 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0 items-stretch">
            {/* Left: React Rules of Hooks */}
            <div className="rounded-xl border border-rose-500/40 p-3 sm:p-3.5 bg-slate-950/95 flex flex-col justify-between shadow-xl min-h-0">
              <div className="flex items-center justify-between pb-1.5 border-b border-rose-900/50 shrink-0">
                <span className="text-xs sm:text-sm font-bold text-rose-300 font-mono">React: Rules of Hooks Jail</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold">
                  Fatal Runtime Crash
                </span>
              </div>
              <div className="relative my-1.5 rounded-lg bg-slate-900/90 p-2.5 sm:p-3 font-mono text-[11px] sm:text-xs md:text-[13px] leading-snug sm:leading-relaxed text-slate-300 border border-slate-800 flex-1 min-h-0 flex items-center overflow-auto">
                <button
                  type="button"
                  onClick={() => handleCopy(codeSnippets.pane1React, 'p1r')}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800"
                >
                  {copiedCode === 'p1r' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'p1r' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="w-full">
                  <code>{codeSnippets.pane1React}</code>
                </pre>
              </div>
              <div className="text-[11px] sm:text-xs text-rose-400 font-mono shrink-0 flex items-center gap-1.5 pt-1 border-t border-slate-900">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>React relies on fixed call order to match linked-list hook state.</span>
              </div>
            </div>

            {/* Right: TSRX Compiler Hoisting */}
            <div className="rounded-xl border border-purple-500/50 p-3 sm:p-3.5 bg-slate-950/95 flex flex-col justify-between shadow-xl min-h-0">
              <div className="flex items-center justify-between pb-1.5 border-b border-purple-900/50 shrink-0">
                <span className="text-xs sm:text-sm font-bold text-purple-300 font-mono">TSRX: Compiler Hoisting</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                  100% Legal Code
                </span>
              </div>
              <div className="relative my-1.5 rounded-lg bg-slate-900/90 p-2.5 sm:p-3 font-mono text-[11px] sm:text-xs md:text-[13px] leading-snug sm:leading-relaxed text-purple-200 border border-slate-800 flex-1 min-h-0 flex items-center overflow-auto">
                <button
                  type="button"
                  onClick={() => handleCopy(codeSnippets.pane1Tsrx, 'p1t')}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800"
                >
                  {copiedCode === 'p1t' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'p1t' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="w-full">
                  <code>{codeSnippets.pane1Tsrx}</code>
                </pre>
              </div>
              <div className="text-[11px] sm:text-xs text-purple-300 font-mono shrink-0 flex items-center gap-1.5 pt-1 border-t border-slate-900">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>TSRX hoists hook initialization to root with conditional guards at build time.</span>
              </div>
            </div>
          </div>
        )}

        {/* PANE 2: Scoped CSS */}
        {activeTab === 2 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0 items-stretch">
            {/* Left: React CSS Friction */}
            <div className="rounded-xl border border-slate-800 p-3 sm:p-3.5 bg-slate-950/95 flex flex-col justify-between shadow-xl min-h-0">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 shrink-0">
                <span className="text-xs sm:text-sm font-bold text-slate-200 font-mono">React CSS Friction</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700 font-bold">
                  Runtime Bloat
                </span>
              </div>
              <div className="relative my-1.5 rounded-lg bg-slate-900/90 p-2.5 sm:p-3 font-mono text-[11px] sm:text-xs md:text-[13px] leading-snug sm:leading-relaxed text-slate-300 border border-slate-800 flex-1 min-h-0 flex items-center overflow-auto">
                <button
                  type="button"
                  onClick={() => handleCopy(codeSnippets.pane2React, 'p2r')}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800"
                >
                  {copiedCode === 'p2r' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'p2r' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="w-full">
                  <code>{codeSnippets.pane2React}</code>
                </pre>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-mono shrink-0 pt-1 border-t border-slate-900">
                Friction: Developers chose between heavy runtime CSS-in-JS or scattered files.
              </div>
            </div>

            {/* Right: TSRX Single-File Scoped CSS */}
            <div className="rounded-xl border border-cyan-500/50 p-3 sm:p-3.5 bg-slate-950/95 flex flex-col justify-between shadow-xl min-h-0">
              <div className="flex items-center justify-between pb-1.5 border-b border-cyan-900/50 shrink-0">
                <span className="text-xs sm:text-sm font-bold text-cyan-300 font-mono">TSRX Single-File Scoped CSS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  Zero Runtime Overhead
                </span>
              </div>
              <div className="relative my-1.5 rounded-lg bg-slate-900/90 p-2.5 sm:p-3 font-mono text-[11px] sm:text-xs md:text-[13px] leading-snug sm:leading-relaxed text-cyan-200 border border-slate-800 flex-1 min-h-0 flex items-center overflow-auto">
                <button
                  type="button"
                  onClick={() => handleCopy(codeSnippets.pane2Tsrx, 'p2t')}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800"
                >
                  {copiedCode === 'p2t' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'p2t' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="w-full">
                  <code>{codeSnippets.pane2Tsrx}</code>
                </pre>
              </div>
              <div className="text-[11px] sm:text-xs text-cyan-300 font-mono shrink-0 flex items-center gap-1.5 pt-1 border-t border-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Compiler generates unique scoped hash classes with zero JS runtime.</span>
              </div>
            </div>
          </div>
        )}

        {/* PANE 3: Async & Error Boundaries */}
        {activeTab === 3 && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0 items-stretch">
            {/* Left: React Error Boundaries */}
            <div className="rounded-xl border border-slate-800 p-3 sm:p-3.5 bg-slate-950/95 flex flex-col justify-between shadow-xl min-h-0">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 shrink-0">
                <span className="text-xs sm:text-sm font-bold text-slate-200 font-mono">React Error Boundaries</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700 font-bold">
                  Legacy Classes
                </span>
              </div>
              <div className="relative my-1.5 rounded-lg bg-slate-900/90 p-2.5 sm:p-3 font-mono text-[11px] sm:text-xs md:text-[13px] leading-snug sm:leading-relaxed text-slate-300 border border-slate-800 flex-1 min-h-0 flex items-center overflow-auto">
                <button
                  type="button"
                  onClick={() => handleCopy(codeSnippets.pane3React, 'p3r')}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800"
                >
                  {copiedCode === 'p3r' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'p3r' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="w-full">
                  <code>{codeSnippets.pane3React}</code>
                </pre>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-mono shrink-0 pt-1 border-t border-slate-900">
                Boilerplate overload: Class components &amp; nested Suspense wrappers.
              </div>
            </div>

            {/* Right: TSRX Language Directives */}
            <div className="rounded-xl border border-amber-500/50 p-3 sm:p-3.5 bg-slate-950/95 flex flex-col justify-between shadow-xl min-h-0">
              <div className="flex items-center justify-between pb-1.5 border-b border-amber-900/50 shrink-0">
                <span className="text-xs sm:text-sm font-bold text-amber-300 font-mono">TSRX Directives (@try / @pending)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                  Built-in Statements
                </span>
              </div>
              <div className="relative my-1.5 rounded-lg bg-slate-900/90 p-2.5 sm:p-3 font-mono text-[11px] sm:text-xs md:text-[13px] leading-snug sm:leading-relaxed text-amber-200 border border-slate-800 flex-1 min-h-0 flex items-center overflow-auto">
                <button
                  type="button"
                  onClick={() => handleCopy(codeSnippets.pane3Tsrx, 'p3t')}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800"
                >
                  {copiedCode === 'p3t' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'p3t' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="w-full">
                  <code>{codeSnippets.pane3Tsrx}</code>
                </pre>
              </div>
              <div className="text-[11px] sm:text-xs text-amber-300 font-mono shrink-0 flex items-center gap-1.5 pt-1 border-t border-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Unified error and loading states baked directly into the compiler.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sleek Minimal Takeaway Strip */}
      <div className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center justify-between mt-1">
        <span className="text-purple-300 font-semibold truncate">
          Core Advantage: TSRX compiler translates native statements into surgical zero-overhead DOM mutations.
        </span>
        <span className="text-cyan-400 font-bold shrink-0 ml-2 hidden sm:inline">
          Next: OctaneJS O(1) Architecture →
        </span>
      </div>
    </div>
  );
};
