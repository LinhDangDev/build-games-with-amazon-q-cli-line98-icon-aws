import { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Leaderboard from './components/Leaderboard';
import { PlayerScore } from './types';
import useSound from './hooks/useSound';
import Card from './components/Card';
import Button from './components/Button';
import ScoreDisplay from './components/ScoreDisplay';
import GameTimer from './components/GameTimer';
import { Trophy, RotateCcw } from 'lucide-react';
import backgroundImage from './assets/images/background.jpg';

function App() {
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const { playSound } = useSound();

  // Load scores from localStorage on component mount
  useEffect(() => {
    const savedScores = localStorage.getItem('aws-line98-scores');
    if (savedScores) {
      try {
        setScores(JSON.parse(savedScores));
      } catch (error) {
        console.error('Error parsing saved scores:', error);
        localStorage.removeItem('aws-line98-scores');
      }
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && !isGameOver) {
      interval = window.setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isGameOver]);

  const handleScoreUpdate = (points: number) => {
    // Only add points if greater than 0
    if (points > 0) {
      setScore(prevScore => prevScore + points);
      playSound('score');
    }

    // Start the timer regardless of points value
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    setIsRunning(false);
    playSound('gameOver');
  };

  const resetGame = () => {
    setScore(0);
    setElapsedTime(0);
    setIsGameOver(false);
    setIsRunning(false);
  };

  const saveScore = (playerName: string) => {
    const newScore: PlayerScore = {
      name: playerName,
      score,
      time: elapsedTime,
      date: new Date().toISOString()
    };

    const updatedScores = [...scores, newScore].sort((a, b) => b.score - a.score);
    setScores(updatedScores);

    // Save to localStorage
    try {
      localStorage.setItem('aws-line98-scores', JSON.stringify(updatedScores));
    } catch (error) {
      console.error('Error saving scores to localStorage:', error);
    }

    // Show leaderboard after saving
    setShowLeaderboard(true);
  };

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/70 via-purple-400/70 to-orange-400/70"></div>

      <div className="w-full max-w-5xl mx-auto px-4 py-4 relative z-10">
        {/* Main Game Interface Card */}
        <Card className="bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 p-4 shadow-2xl border-0 rounded-3xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Game Title */}
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                AWS
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-white/90 -mt-2">
                Line
              </h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg -mt-2">
                98
              </h3>
            </div>

            {/* Game Controls */}
            <div className="flex flex-wrap justify-center lg:justify-end items-center gap-3">
              {/* Show Leaderboard Button */}
              <Button
                onClick={toggleLeaderboard}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Trophy size={16} />
                {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
              </Button>

              {/* Score Display */}
              <ScoreDisplay score={score} />

              {/* Timer */}
              <GameTimer time={elapsedTime} isRunning={isRunning} />

              {/* Reset Game Button */}
              <Button
                onClick={resetGame}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Reset Game
              </Button>
            </div>
          </div>
        </Card>

        {/* Leaderboard */}
        {showLeaderboard && (
          <Card className="mt-4 bg-white/95 backdrop-blur-sm p-4 rounded-3xl shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={24} />
                Leaderboard
              </h3>
              <Button
                onClick={toggleLeaderboard}
                variant="outline"
                className="rounded-full"
              >
                Close
              </Button>
            </div>
            <Leaderboard scores={scores} />
          </Card>
        )}

        {/* Game Content */}
        {!showLeaderboard && (
          <Card className="mt-4 bg-white/10 backdrop-blur-sm p-2 rounded-3xl shadow-2xl border border-white/20">
            {isGameOver ? (
              <GameOver
                score={score}
                elapsedTime={elapsedTime}
                onRestart={resetGame}
                onSaveScore={saveScore}
              />
            ) : (
              <GameBoard
                onScoreUpdate={handleScoreUpdate}
                onGameOver={handleGameOver}
                onReset={resetGame}
                elapsedTime={elapsedTime}
              />
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
