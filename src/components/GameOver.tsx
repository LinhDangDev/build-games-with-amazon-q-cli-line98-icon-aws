import { useState } from 'react';
import { GameOverProps } from '../types';
import { Trophy, Clock, RotateCcw } from 'lucide-react';
import Button from './Button';

const GameOver: React.FC<GameOverProps> = ({ score, elapsedTime, onRestart, onSaveScore }) => {
  const [playerName, setPlayerName] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSaveScore = () => {
    if (playerName.trim()) {
      onSaveScore(playerName.trim());
      setIsSaved(true);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto py-8 px-4">
      <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
        <Trophy className="w-12 h-12 text-orange-500" />
      </div>

      <h2 className="text-4xl font-bold text-white mb-8 text-center">Game Over</h2>

      <div className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/30">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="text-orange-400" size={20} />
            <span className="text-white/80">Final Score</span>
          </div>
          <span className="text-2xl font-bold text-white">{score.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="text-orange-400" size={20} />
            <span className="text-white/80">Time</span>
          </div>
          <span className="text-xl font-mono text-white">{formatTime(elapsedTime)}</span>
        </div>
      </div>

      {!isSaved && (
        <div className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/30">
          <h3 className="text-xl font-semibold text-white mb-4">Save Your Score</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={15}
              className="flex-1 px-4 py-2 bg-white/30 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <Button
              onClick={handleSaveScore}
              disabled={!playerName.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Save
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={onRestart}
        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 w-full justify-center"
      >
        <RotateCcw size={20} />
        Play Again
      </Button>
    </div>
  );
};

export default GameOver;
