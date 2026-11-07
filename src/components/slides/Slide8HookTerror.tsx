import React, { useState } from 'react';
import { ShieldAlert, Sparkles, Check, Copy, AlertTriangle, Layers, ArrowRight } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide8HookTerror: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const promiseCode = `// The Promise: Clean Functional Components
function UserProfile({ userId }) {
  // State without classes or 'this' binding:
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return <div>Hello, {user?.name}</div>;
}`;

  const terrorCode = `// The Flaw: Linked List Sequential Order
function BadComponent({ isLoggedIn }) {
  if (isLoggedIn) {
    // FATAL RUNTIME CRASH!
    // Hook called conditionally:
    const data = useUserData(); 
    // Breaks linked list pointer alignment!
  }
  // Error: Rendered fewer hooks than expected.
}`;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    playSound('success', soundEnabled);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-5 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-1 shrink-0">
        <span className="text-xs md:text-sm font-mono font-bold text-amber-400 uppercase tracking-widest block">
          Pillar 02 // Developer Experience Breakdown
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mt-0.5">
          Understanding React Hooks: The Promise &amp; The &ldquo;Hook Terror&rdquo;
        </h2>
        <p className="text-xs md:text-sm text-slate-300 font-mono mt-0.5">
          Why storing hooks in a sequential linked list turned functional simplicity into a developer minefield
        </p>
      </div>

      {/* 2-Column Balanced Grid: The Promise vs The Terror */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1 min-h-0 my-1 items-stretch">
        {/* Left Column: What Hooks Are (The Revolutionary Promise) */}
        <div className="p-3.5 md:p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/50 flex flex-col justify-between shadow-[0_0_20px_rgba(6,182,212,0.08)]">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between border-b border-cyan-900/50 pb-1.5">
              <h3 className="text-base md:text-lg font-black text-cyan-300 font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>1. What Hooks Are: The Promise</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                React 16.8 (2019)
              </span>
            </div>

            <ul className="space-y-1 text-xs md:text-sm text-slate-300 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong className="text-white">Death of Class Components:</strong> Removed confusing <code>this</code> bindings and boilerplate lifecycle methods.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong className="text-white">Stateful Functions:</strong> <code>useState</code> &amp; <code>useEffect</code> allow functional components to own reactive state.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong className="text-white">Composable Logic:</strong> Replaced bloated HOC wrappers with custom hooks (e.g. <code>useAuth()</code>).</span>
              </li>
            </ul>
          </div>

          {/* Clean Code Snippet */}
          <div className="relative mt-2 p-2.5 rounded-xl bg-slate-900/95 font-mono text-xs text-slate-300 border border-slate-800">
            <button
              type="button"
              onClick={() => handleCopy(promiseCode, 'promise')}
              className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] cursor-pointer"
            >
              {copiedCode === 'promise' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode === 'promise' ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="overflow-x-auto leading-tight text-cyan-200/90 font-mono text-xs">
              <code>{promiseCode}</code>
            </pre>
          </div>
        </div>

        {/* Right Column: Why Strict Arrangement Causes Terror */}
        <div className="p-3.5 md:p-4 rounded-2xl bg-slate-950/90 border border-rose-500/50 flex flex-col justify-between shadow-[0_0_20px_rgba(244,63,94,0.08)]">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between border-b border-rose-900/50 pb-1.5">
              <h3 className="text-base md:text-lg font-black text-rose-400 font-mono flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                <span>2. The Linked List &amp; &ldquo;Hook Terror&rdquo;</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                The Strict Prison
              </span>
            </div>

            <ul className="space-y-1 text-xs md:text-sm text-slate-300 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong className="text-white">Sequential Linked List:</strong> React identifies hooks by sequential invocation order, NOT by variable name.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong className="text-white">Strict Rules of Hooks:</strong> Calling a hook in an <code>if</code> condition or loop breaks index pointers and crashes the app.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong className="text-white">Dependency Array Fatigue:</strong> One missed item in <code>[deps]</code> triggers stale closures or infinite renders.</span>
              </li>
            </ul>
          </div>

          {/* Clean Code Snippet */}
          <div className="relative mt-2 p-2.5 rounded-xl bg-slate-900/95 font-mono text-xs text-slate-300 border border-slate-800">
            <button
              type="button"
              onClick={() => handleCopy(terrorCode, 'terror')}
              className="absolute top-2 right-2 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px] cursor-pointer"
            >
              {copiedCode === 'terror' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode === 'terror' ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="overflow-x-auto leading-tight text-rose-200/90 font-mono text-xs">
              <code>{terrorCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Bottom Key Takeaway */}
      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs md:text-sm text-slate-300 font-mono flex items-center justify-between shrink-0 mt-1">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">The Dilemma:</strong> To maintain the illusion of simple functions, React forced developers to police array dependencies manually.
          </span>
        </div>
        <span className="text-emerald-400 font-bold hidden sm:inline flex items-center gap-1 shrink-0">
          Next: Svelte&apos;s Rebellion <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};



