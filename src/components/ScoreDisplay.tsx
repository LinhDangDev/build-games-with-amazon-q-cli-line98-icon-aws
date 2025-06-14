import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl shadow-lg">
      <div className="text-center">
        <p className="text-white/80 text-xs font-medium mb-0.5">Score</p>
        <p className="text-xl font-bold text-white drop-shadow-sm">
          {score.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ScoreDisplay;
