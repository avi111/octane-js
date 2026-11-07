import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

interface KeynoteTimerProps {
  initialSeconds?: number;
  onTimeEnd?: () => void;
}

export const KeynoteTimer: React.FC<KeynoteTimerProps> = ({
  initialSeconds = 600, // 10 minutes
  onTimeEnd,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(true); // Auto-starts for the 10-minute presentation

  useEffect(() => {
    if (!isRunning) return;
    if (secondsLeft <= 0) {
      if (onTimeEnd) onTimeEnd();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, onTimeEnd]);

  const toggleTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRunning((prev) => !prev);
  };

  const resetTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSecondsLeft(initialSeconds);
    setIsRunning(false);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Color coding based on remaining time
  let colorClasses = 'text-cyan-300 border-cyan-800/80 bg-cyan-950/40';
  let badgeColor = 'bg-cyan-400';
  if (secondsLeft <= 60) {
    colorClasses = 'text-rose-400 border-rose-600/80 bg-rose-950/60 animate-pulse';
    badgeColor = 'bg-rose-500';
  } else if (secondsLeft <= 180) {
    colorClasses = 'text-amber-300 border-amber-600/80 bg-amber-950/50';
    badgeColor = 'bg-amber-400';
  }

  return (
    <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border font-mono text-xs transition-colors shadow-md ${colorClasses}`}>
      <span className={`w-2 h-2 rounded-full ${badgeColor} ${isRunning ? 'animate-ping' : ''}`} />
      
      <Timer className="w-3.5 h-3.5 shrink-0" />
      
      <span className="font-bold tracking-wider text-sm tabular-nums">
        {formattedTime}
      </span>

      <span className="text-[10px] text-slate-400 uppercase hidden md:inline">
        / 10m
      </span>

      <div className="flex items-center space-x-0.5 ml-1 pl-1 border-l border-slate-700/60">
        <button
          type="button"
          onClick={toggleTimer}
          title={isRunning ? "Pause Countdown" : "Start Countdown"}
          className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
        >
          {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>

        <button
          type="button"
          onClick={resetTimer}
          title="Reset to 10:00"
          className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
