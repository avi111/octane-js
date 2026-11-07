import React, { useState } from 'react';
import { Flag, ArrowLeftRight, Check, Copy, Sparkles, Layers } from 'lucide-react';
import { playSound } from '../../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide13MigrationStrategy: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [copiedOctane, setCopiedOctane] = useState<boolean>(false);
  const [copiedReact, setCopiedReact] = useState<boolean>(false);

  const octaneCompatCode = `<OctaneCompat>
  {/* Runs pure compiled O(1) inside standard React tree */}
  <HighPerfDataGrid rows={data} virtualized={true} />
</OctaneCompat>`;

  const reactCompatCode = `<ReactCompat>
  {/* Mounts classic React component inside Octane application */}
  <LegacyThreeJsCanvas options={opts} />
</ReactCompat>`;

  const copyCode = (code: string, isOctane: boolean) => {
    navigator.clipboard.writeText(code);
    if (isOctane) {
      setCopiedOctane(true);
      setTimeout(() => setCopiedOctane(false), 2000);
    } else {
      setCopiedReact(true);
      setTimeout(() => setCopiedReact(false), 2000);
    }
    playSound('success', soundEnabled);
  };

  return (
    <div className="flex flex-col justify-center w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6 w-full">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5" /> Phase 08 // Pragmatic Adoption
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
            Incremental Migration &amp; Compatibility Wrappers
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Zero all-or-nothing risk: Bridge legacy React codebases and modern Octane pipelines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* OctaneCompat */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-cyan-300 font-mono text-sm">OctaneCompat</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  In React Apps
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Embed blazing-fast Octane components inside an existing React app. Accelerates critical performance bottlenecks without rewriting the entire codebase.
              </p>
            </div>

            <div className="relative p-2.5 rounded bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800">
              <button
                type="button"
                onClick={() => copyCode(octaneCompatCode, true)}
                className="absolute top-2 right-2 text-slate-400 hover:text-white transition cursor-pointer"
              >
                {copiedOctane ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
              <pre className="overflow-x-auto">
                <code>{octaneCompatCode}</code>
              </pre>
            </div>
          </div>

          {/* ReactCompat */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-purple-300 font-mono text-sm">ReactCompat</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                  In Octane Apps
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Retain complex third-party React libraries (charts, 3D canvases, date-pickers) inside an Octane app, maintaining full ecosystem access.
              </p>
            </div>

            <div className="relative p-2.5 rounded bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800">
              <button
                type="button"
                onClick={() => copyCode(reactCompatCode, false)}
                className="absolute top-2 right-2 text-slate-400 hover:text-white transition cursor-pointer"
              >
                {copiedReact ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
              <pre className="overflow-x-auto">
                <code>{reactCompatCode}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Closing Grand Takeaway */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-slate-950 border border-slate-800 text-center font-mono text-xs text-slate-300 space-y-1">
          <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold">
            <Flag className="w-4 h-4 text-cyan-400" />
            <span>The Reactive Architecture Evolution Summary</span>
          </div>
          <p className="text-slate-400 text-xs">
            The future of frontend combines the developer familiarity of React, the clean syntax of TSRX, and the raw O(1) performance of OctaneJS.
          </p>
        </div>
      </div>
    </div>
  );
};
