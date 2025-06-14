import { LeaderboardProps } from '../types';

const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-3">
      {scores.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No scores yet. Play a game to be the first!</p>
      ) : (
        scores.map((score, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-200"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </span>
              <div>
                <span className="font-semibold text-gray-700">{score.name}</span>
                <div className="text-xs text-gray-500">
                  {formatTime(score.time)} • {formatDate(score.date)}
                </div>
              </div>
            </div>
            <span className="font-bold text-orange-600">{score.score.toLocaleString()}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Leaderboard;
