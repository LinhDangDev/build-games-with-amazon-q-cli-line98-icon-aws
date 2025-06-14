import React from 'react';
import { Timer } from 'lucide-react';

interface GameTimerProps {
  time: number;
  isRunning: boolean;
}

const GameTimer: React.FC<GameTimerProps> = ({ time, isRunning }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
      <Timer className={`text-white ${isRunning ? 'animate-pulse' : ''}`} size={16} />
      <p className="text-xl font-bold text-white drop-shadow-sm font-mono">
        {formatTime(time)}
      </p>
    </div>
  );
};

export default GameTimer;
