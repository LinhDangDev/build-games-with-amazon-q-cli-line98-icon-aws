import { Icon, Cell, PlayerScore } from '../types';

// Format time as MM:SS
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Save scores to localStorage
export const saveScoresToStorage = (scores: PlayerScore[]): void => {
  localStorage.setItem('aws-line98-scores', JSON.stringify(scores));
};

// Load scores from localStorage
export const loadScoresFromStorage = (): PlayerScore[] => {
  const savedScores = localStorage.getItem('aws-line98-scores');
  return savedScores ? JSON.parse(savedScores) : [];
};

// Get random empty cells from grid
export const getRandomEmptyCells = (
  grid: (Icon | null)[][], 
  count: number, 
  gridSize: number
): Cell[] => {
  const emptyCells: Cell[] = [];
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === null) {
        emptyCells.push({ row, col });
      }
    }
  }
  
  // Shuffle and take the first 'count' cells
  return emptyCells
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(count, emptyCells.length));
};

// Check for matches in a line
export const checkForMatches = (
  grid: (Icon | null)[][], 
  row: number, 
  col: number, 
  minLineLength: number,
  gridSize: number
): Cell[] => {
  const icon = grid[row][col];
  if (!icon) return [];
  
  const matches: Cell[] = [];
  
  // Check horizontal, vertical, and diagonal lines
  const directions = [
    [{ row: 0, col: 1 }, { row: 0, col: -1 }],   // horizontal
    [{ row: 1, col: 0 }, { row: -1, col: 0 }],   // vertical
    [{ row: 1, col: 1 }, { row: -1, col: -1 }],  // diagonal \
    [{ row: 1, col: -1 }, { row: -1, col: 1 }]   // diagonal /
  ];
  
  directions.forEach(dirPair => {
    const lineMatches: Cell[] = [{ row, col }];
    
    dirPair.forEach(dir => {
      let r = row + dir.row;
      let c = col + dir.col;
      
      while (
        r >= 0 && r < gridSize &&
        c >= 0 && c < gridSize &&
        grid[r][c] && 
        grid[r][c]!.id === icon.id
      ) {
        lineMatches.push({ row: r, col: c });
        r += dir.row;
        c += dir.col;
      }
    });
    
    if (lineMatches.length >= minLineLength) {
      matches.push(...lineMatches);
    }
  });
  
  // Remove duplicates
  return matches.filter((match, index, self) =>
    index === self.findIndex(m => m.row === match.row && m.col === match.col)
  );
};
