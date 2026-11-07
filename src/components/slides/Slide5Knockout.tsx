import React, { useState } from 'react';
import { Copy, Check, Plus, Minus, Layers, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide5Knockout: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [demoCount, setDemoCount] = useState<number>(3);

  const codeSnippet = `<!-- Declarative View binding -->
<p>Count: <span data-bind="text: count"></span></p>
<button data-bind="click: increment">+1</button>

// ViewModel logic
function AppViewModel() {
  this.count = ko.observable(0);
  this.increment = () => this.count(this.count() + 1);
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    playSound('success', soundEnabled);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col justify-center w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-5 w-full">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Phase 01 // 2010 Breakthrough
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
            Knockout.js: Two-Way Data Binding &amp; MVVM
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Created by Steve Sanderson to solve jQuery desync bugs and introduce declarative programming
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-white">Declarative vs. Imperative</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instead of writing <em>how</em> to select elements, calculate values, and push HTML strings back, developers declared <em>what</em> should be displayed.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-white">MVVM Architecture</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clean separation between business logic (Model), presentation markup (View), and reactive observable state (ViewModel).
            </p>
          </div>
        </div>

        {/* Code & Interactive preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          <div className="lg:col-span-8 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs relative">
            <div className="flex items-center justify-between text-cyan-400 border-b border-slate-800 pb-1 mb-2 text-[11px] font-bold">
              <span>KNOCKOUT DECLARATIVE BINDING SYNTAX</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] transition cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="text-slate-300 overflow-x-auto leading-relaxed text-[11px]">
              <code>{codeSnippet}</code>
            </pre>
          </div>

          <div className="lg:col-span-4 p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between font-mono text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] border-b border-slate-800 pb-1">
              <Sparkles className="w-3.5 h-3.5" /> Live Observable View
            </div>
            <div className="my-auto text-center py-2">
              <span className="text-[10px] text-slate-400 block mb-1">data-bind=&quot;text: count&quot;</span>
              <span className="text-3xl font-black text-emerald-400 tabular-nums">{demoCount}</span>
              <div className="flex items-center justify-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDemoCount((c) => Math.max(0, c - 1));
                    playSound('click', soundEnabled);
                  }}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDemoCount((c) => c + 1);
                    playSound('click', soundEnabled);
                  }}
                  className="px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 transition"
                >
                  <Plus className="w-3 h-3" /> ko.observable()
                </button>
              </div>
            </div>
            <div className="text-[9px] text-slate-400 text-center">
              View updates instantly on observable mutation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
