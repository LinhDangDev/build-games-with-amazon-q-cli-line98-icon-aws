// Game types
export interface Icon {
  id: number;
  src: string;
  name: string;
}

export interface Cell {
  row: number;
  col: number;
}

export interface PlayerScore {
  name: string;
  score: number;
  time: number;
  date: string;
}

export interface GameState {
  grid: (Icon | null)[][];
  score: number;
  selectedCell: Cell | null;
  nextIconPositions: Cell[];
  animatingCells: Cell[];
  isGameOver: boolean;
  elapsedTime: number;
}

// Props types
export interface GameBoardProps {
  onScoreUpdate: (points: number) => void;
  onGameOver: () => void;
  onReset: () => void;
  elapsedTime: number;
}

export interface ScoreBoardProps {
  score: number;
  elapsedTime: number;
  onReset: () => void;
}

export interface GameOverProps {
  score: number;
  elapsedTime: number;
  onRestart: () => void;
  onSaveScore: (playerName: string) => void;
}

export interface LeaderboardProps {
  scores: PlayerScore[];
}

export interface TimerProps {
  elapsedTime: number;
}

// Utility types
export interface MatchResult {
  matches: Cell[];
}
