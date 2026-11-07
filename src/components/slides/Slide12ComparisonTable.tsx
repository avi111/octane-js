import React, { useState } from 'react';
import { Table, Check, X, Shield, Cpu, ArrowLeftRight, Copy } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide12ComparisonTable: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [highlightCol, setHighlightCol] = useState<'all' | 'classic' | 'octane'>('octane');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const rows = [
    {
      feature: "Virtual DOM",
      classic: "Active (Runtime tree diff)",
      classicClass: "text-rose-400 font-bold",
      octane: "Completely Eliminated (Direct AOT DOM)",
      octaneClass: "text-emerald-400 font-black"
    },
    {
      feature: "Rules of Hooks",
      classic: "Strict order enforced (crash in @if)",
      classicClass: "text-rose-400",
      octane: "Compiler Hoisting (Allowed in conditions & loops)",
      octaneClass: "text-emerald-400 font-bold"
    },
    {
      feature: "Event System",
      classic: "Heavy SyntheticEvent object wrappers",
      classicClass: "text-amber-400",
      octane: "Native direct DOM events (Zero GC pressure)",
      octaneClass: "text-emerald-400 font-bold"
    },
    {
      feature: "Diffing Complexity",
      classic: "O(t) scales with component subtree",
      classicClass: "text-rose-400",
      octane: "O(1) constant time pinpoint mutation",
      octaneClass: "text-emerald-400 font-black"
    },
    {
      feature: "JSX Control Flow",
      classic: "Expressions (Nested ternaries & .map)",
      classicClass: "text-slate-400",
      octane: "Native Statements (@if, @for, @try, @pending)",
      octaneClass: "text-emerald-400 font-bold"
    }
  ];

  const octaneCompatCode = `<OctaneCompat>
  {/* Runs pure compiled O(1) inside standard React tree */}
  <HighPerfDataGrid rows={data} />
</OctaneCompat>`;

  const reactCompatCode = `<ReactCompat>
  {/* Mounts classic React library inside Octane app */}
  <LegacyThreeJsCanvas options={opts} />
</ReactCompat>`;

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    playSound('success', soundEnabled);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 md:p-6 overflow-hidden text-left dir-ltr">
      {/* Title */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
        <div>
          <span className="text-xs md:text-sm font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            Pillar 04 // Architecture Comparison &amp; Practical Adoption
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-0.5">
            Architecture Matrix &amp; Incremental Adoption
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-mono mt-0.5">
            Zero all-or-nothing risk: Accelerating existing React codebases without total rewrites
          </p>
        </div>

        {/* Highlight Filter */}
        <div className="flex items-center space-x-1.5 font-mono text-xs shrink-0">
          <span className="text-slate-400 hidden sm:inline">Highlight:</span>
          <button
            type="button"
            onClick={() => { setHighlightCol('all'); playSound('switch', soundEnabled); }}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              highlightCol === 'all' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-900 border border-slate-800 text-slate-400'
            }`}
          >
            All Columns
          </button>
          <button
            type="button"
            onClick={() => { setHighlightCol('octane'); playSound('switch', soundEnabled); }}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-bold ${
              highlightCol === 'octane' ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/30' : 'bg-slate-900 border border-slate-800 text-slate-400'
            }`}
          >
            OctaneJS + TSRX
          </button>
        </div>
      </div>

      {/* Main Content: Comparison Table (Top) + Adoption Bridges (Bottom) */}
      <div className="flex-1 min-h-0 flex flex-col justify-around my-1 space-y-2">
        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/85 shadow-2xl">
          <table className="w-full text-left font-mono text-xs md:text-sm text-slate-300">
            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-3 md:p-3.5 font-bold">Architecture Pillar</th>
                <th className={`p-3 md:p-3.5 ${highlightCol === 'classic' ? 'bg-rose-950/50 text-rose-300' : 'text-slate-400'}`}>
                  Classic React (Virtual DOM)
                </th>
                <th className={`p-3 md:p-3.5 font-black ${highlightCol === 'octane' ? 'bg-cyan-950/80 text-cyan-300' : 'text-cyan-400'}`}>
                  OctaneJS + TSRX (Direct O(1) DOM)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition">
                  <td className="p-2.5 md:p-3 font-bold text-white whitespace-nowrap">{row.feature}</td>
                  <td className={`p-2.5 md:p-3 ${row.classicClass} ${highlightCol === 'classic' ? 'bg-rose-950/20' : ''}`}>
                    {row.classic}
                  </td>
                  <td className={`p-2.5 md:p-3 ${row.octaneClass} ${highlightCol === 'octane' ? 'bg-cyan-950/40' : ''}`}>
                    {row.octane}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2 Practical Adoption Bridges: OctaneCompat & ReactCompat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
          {/* OctaneCompat */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-800/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800">
                <span className="font-bold text-cyan-300 text-xs md:text-sm flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  &lt;OctaneCompat&gt;
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  Inside React Apps
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-snug">
                Drop high-frequency components into existing React apps. Accelerates bottlenecks without full rewrites.
              </p>
            </div>
            <div className="relative mt-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-cyan-300/90">
              <button
                type="button"
                onClick={() => copySnippet(octaneCompatCode, 'octane')}
                className="absolute top-1.5 right-1.5 text-slate-400 hover:text-white transition cursor-pointer text-[10px]"
              >
                {copiedCode === 'octane' ? 'Copied!' : 'Copy'}
              </button>
              <pre className="overflow-x-auto"><code>{octaneCompatCode}</code></pre>
            </div>
          </div>

          {/* ReactCompat */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-800/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800">
                <span className="font-bold text-purple-300 text-xs md:text-sm flex items-center gap-1.5">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-purple-400" />
                  &lt;ReactCompat&gt;
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                  Inside Octane Apps
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-snug">
                Mount complex third-party React libraries (3D canvases, charts, date-pickers) directly inside Octane.
              </p>
            </div>
            <div className="relative mt-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-purple-300/90">
              <button
                type="button"
                onClick={() => copySnippet(reactCompatCode, 'react')}
                className="absolute top-1.5 right-1.5 text-slate-400 hover:text-white transition cursor-pointer text-[10px]"
              >
                {copiedCode === 'react' ? 'Copied!' : 'Copy'}
              </button>
              <pre className="overflow-x-auto"><code>{reactCompatCode}</code></pre>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Takeaway */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs md:text-sm text-slate-300 font-mono text-center shrink-0 mt-1">
        <span className="text-emerald-400 font-bold">Migration Rule:</span> Start with your application&apos;s heaviest bottleneck component, wrap it with <code className="text-cyan-300 font-bold">&lt;OctaneCompat&gt;</code>, and gain immediate O(1) performance.
      </div>
    </div>
  );
};

