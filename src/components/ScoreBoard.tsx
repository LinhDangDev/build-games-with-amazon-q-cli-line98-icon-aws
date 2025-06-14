import { ScoreBoardProps } from '../types';
import Timer from './Timer';
import './ScoreBoard.css';

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, elapsedTime, onReset }) => {
  return (
    <div className="score-board">
      <div className="score-container">
        <div className="score-label">Score:</div>
        <div className="score-value">{score}</div>
      </div>
      <Timer elapsedTime={elapsedTime} />
      <button className="reset-button" onClick={onReset} title="Reset Game">
        Reset Game
      </button>
    </div>
  );
};

export default ScoreBoard;
