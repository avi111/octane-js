import React, { useState } from 'react';
import { Quote, Zap, Cpu, Box, Flame, CheckCircle2, ArrowRight, Code } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide7SveltePrecompile: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<'source' | 'compiled'>('source');

  const svelteSource = `// 1. What You Write (Clean Language Syntax)
<script>
  let count = 0;
  // Compiler tracks dependencies automatically:
  $: double = count * 2;
</script>

<button on:click={() => count++}>
  Count: {count} | Double: {double}
</button>`;

  const compiledOutput = `// 2. What Runs in the Browser (AOT Output)
function update() {
  // Direct microscopic pointer update in 0.1ms:
  count_node.data = count;
  double_node.data = count * 2;
  // Zero V-DOM trees. Zero diffing algorithms. Zero GC pauses!
}`;

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-5 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="text-center mb-1 shrink-0">
        <span className="text-xs md:text-sm font-mono font-bold text-emerald-400 uppercase tracking-widest block">
          Pillar 03 // The Compiler Rebellion
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mt-0.5">
          Svelte&apos;s Rebellion: &ldquo;Virtual DOM Is Bad — Pre-Compile Instead&rdquo;
        </h2>
        <p className="text-xs md:text-sm text-slate-300 font-mono mt-0.5">
          Rich Harris&apos; manifesto: Eliminating the middle manager through Ahead-of-Time compilation
        </p>
      </div>

      {/* Main Hero Quote Banner */}
      <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-950 to-emerald-950/70 border border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.12)] shrink-0 my-1 relative overflow-hidden">
        <div className="flex items-start gap-3 max-w-4xl mx-auto">
          <Quote className="w-8 h-8 text-amber-400 shrink-0 opacity-80 mt-1" />
          <div className="space-y-1">
            <blockquote className="text-sm sm:text-base md:text-lg font-bold text-white leading-snug font-sans">
              &ldquo;Virtual DOM is not fast. Virtual DOM is pure overhead. It is much better to pre-compile your UI into surgical direct DOM mutations.&rdquo;
            </blockquote>
            <p className="text-xs font-mono text-amber-300">
              — <strong>Rich Harris</strong> (Creator of Svelte &amp; Rollup)
            </p>
          </div>
        </div>
      </div>

      {/* 4 Summarized Advantages of Pre-Compiling (Descriptions removed for clean presentation) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 my-1 flex-1 min-h-0 items-stretch font-mono">
        {/* Advantage 1 */}
        <div className="p-3 md:p-4 rounded-xl bg-slate-950/85 border border-emerald-500/50 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-1.5">
              <span>ADVANTAGE 01</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-base md:text-lg font-black text-white font-mono leading-tight">
              Zero Virtual DOM
            </h4>
          </div>
          <span className="text-xs text-emerald-300 font-bold block pt-2 mt-2 border-t border-slate-800/80">
            ⚡ 2ms direct mutation
          </span>
        </div>

        {/* Advantage 2 */}
        <div className="p-3 md:p-4 rounded-xl bg-slate-950/85 border border-cyan-500/50 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-cyan-400 mb-1.5">
              <span>ADVANTAGE 02</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <h4 className="text-base md:text-lg font-black text-white font-mono leading-tight">
              Auto Dependencies
            </h4>
          </div>
          <span className="text-xs text-cyan-300 font-bold block pt-2 mt-2 border-t border-slate-800/80">
            ✓ Zero stale closures
          </span>
        </div>

        {/* Advantage 3 */}
        <div className="p-3 md:p-4 rounded-xl bg-slate-950/85 border border-purple-500/50 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-purple-400 mb-1.5">
              <span>ADVANTAGE 03</span>
              <Box className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="text-base md:text-lg font-black text-white font-mono leading-tight">
              Tiny Bundles
            </h4>
          </div>
          <span className="text-xs text-purple-300 font-bold block pt-2 mt-2 border-t border-slate-800/80">
            📦 Instant first paint
          </span>
        </div>

        {/* Advantage 4 */}
        <div className="p-3 md:p-4 rounded-xl bg-slate-950/85 border border-rose-500/50 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-rose-400 mb-1.5">
              <span>ADVANTAGE 04</span>
              <Flame className="w-4 h-4 text-rose-400" />
            </div>
            <h4 className="text-base md:text-lg font-black text-white font-mono leading-tight">
              Zero GC Freezes
            </h4>
          </div>
          <span className="text-xs text-rose-300 font-bold block pt-2 mt-2 border-t border-slate-800/80">
            🛡️ Smooth 60fps scrolling
          </span>
        </div>
      </div>

      {/* Interactive Compiler Inspector Tab */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs shrink-0 my-1">
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold text-[11px]">Compiler Inspector:</span>
            <button
              type="button"
              onClick={() => { setActiveTab('source'); playSound('switch', soundEnabled); }}
              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                activeTab === 'source' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Developer Source Code
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('compiled'); playSound('switch', soundEnabled); }}
              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                activeTab === 'compiled' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Pre-Compiled AOT Output
            </button>
          </div>
          <span className="text-[10px] text-emerald-400 hidden sm:inline">
            AOT eliminates in-memory diffing
          </span>
        </div>

        <pre className="overflow-x-auto text-xs leading-snug p-2 rounded bg-slate-900/90 text-slate-200">
          <code>{activeTab === 'source' ? svelteSource : compiledOutput}</code>
        </pre>
      </div>

      {/* Bottom Takeaway */}
      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs md:text-sm text-slate-300 font-mono flex items-center justify-between shrink-0 mt-1">
        <span className="flex items-center gap-2 text-emerald-400 font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Core Takeaway: Why diff trees at 60fps in the browser when a compiler can know the exact mutations at build time?</span>
        </span>
        <span className="text-purple-300 font-bold hidden sm:inline flex items-center gap-1 shrink-0">
          Next: Dominic Gannaway &amp; TSRX <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
