import { TimerProps } from '../types';
import './Timer.css';

const Timer: React.FC<TimerProps> = ({ elapsedTime }) => {
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <div className="timer-icon">⏱️</div>
      <div className="timer-value">{formatTime(elapsedTime)}</div>
    </div>
  );
};

export default Timer;
