import React, { useState } from 'react';
import { Table, Check, X, Shield, Cpu } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide12ComparisonTable: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [highlightCol, setHighlightCol] = useState<'all' | 'classic' | 'compiler' | 'octane'>('all');

  const rows = [
    {
      feature: "Virtual DOM",
      classic: "Active (Runtime tree diff)",
      classicClass: "text-rose-300",
      compiler: "Active (Retained in memory)",
      compilerClass: "text-amber-300",
      octane: "Completely Eliminated (Direct AOT DOM)",
      octaneClass: "text-emerald-400 font-bold"
    },
    {
      feature: "Rules of Hooks",
      classic: "Strictly enforced",
      classicClass: "text-rose-300",
      compiler: "Strictly enforced",
      compilerClass: "text-amber-300",
      octane: "Removed (Allowed in conditions & loops)",
      octaneClass: "text-emerald-400 font-bold"
    },
    {
      feature: "Event System",
      classic: "Heavy SyntheticEvent wrappers",
      classicClass: "text-rose-300",
      compiler: "Heavy SyntheticEvent wrappers",
      compilerClass: "text-amber-300",
      octane: "Native direct DOM events",
      octaneClass: "text-emerald-400 font-bold"
    },
    {
      feature: "Dependencies",
      classic: "Manual & error-prone arrays",
      classicClass: "text-rose-300",
      compiler: "Auto-managed memoization",
      compilerClass: "text-cyan-300",
      octane: "Statically resolved at build time",
      octaneClass: "text-emerald-400 font-bold"
    },
    {
      feature: "Rendering Syntax",
      classic: "Expression-only (Ternaries, .map)",
      classicClass: "text-slate-400",
      compiler: "Expression-only (Ternaries, .map)",
      compilerClass: "text-slate-400",
      octane: "Statement-based (@if, @for, @try)",
      octaneClass: "text-emerald-400 font-bold"
    }
  ];

  return (
    <div className="flex flex-col justify-center w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-4 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5" /> Phase 07 // Architecture Matrix
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              Comprehensive Framework Comparison
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-0.5">
              As presented in the foundational document: Evolution across paradigms
            </p>
          </div>

          <div className="flex items-center space-x-1 font-mono text-[11px]">
            <span className="text-slate-400 text-[10px] mr-1 hidden sm:inline">Highlight:</span>
            <button
              type="button"
              onClick={() => { setHighlightCol('all'); playSound('switch', soundEnabled); }}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${highlightCol === 'all' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-900 text-slate-400'}`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => { setHighlightCol('octane'); playSound('switch', soundEnabled); }}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${highlightCol === 'octane' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-900 text-slate-400'}`}
            >
              OctaneJS + TSRX
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 shadow-2xl">
          <table className="w-full text-left font-mono text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Feature</th>
                <th className={`p-3 ${highlightCol === 'classic' ? 'bg-rose-950/40 text-rose-300' : ''}`}>Classic React</th>
                <th className={`p-3 ${highlightCol === 'compiler' ? 'bg-amber-950/40 text-amber-300' : ''}`}>React Compiler (Meta)</th>
                <th className={`p-3 font-bold ${highlightCol === 'octane' ? 'bg-cyan-950/70 text-cyan-300' : 'text-cyan-400'}`}>
                  OctaneJS + TSRX
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="p-3 font-bold text-white whitespace-nowrap">{row.feature}</td>
                  <td className={`p-3 ${row.classicClass} ${highlightCol === 'classic' ? 'bg-rose-950/20' : ''}`}>
                    {row.classic}
                  </td>
                  <td className={`p-3 ${row.compilerClass} ${highlightCol === 'compiler' ? 'bg-amber-950/20' : ''}`}>
                    {row.compiler}
                  </td>
                  <td className={`p-3 ${row.octaneClass} ${highlightCol === 'octane' ? 'bg-cyan-950/30' : ''}`}>
                    {row.octane}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono text-center">
          <strong className="text-cyan-400">Verdict:</strong> OctaneJS + TSRX delivers the familiar React mental model with true compiled O(1) performance.
        </div>
      </div>
    </div>
  );
};
