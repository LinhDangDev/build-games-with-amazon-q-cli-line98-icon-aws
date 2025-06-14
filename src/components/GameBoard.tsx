import { useState, useEffect, useCallback } from 'react';
import { GameBoardProps, Icon, Cell, MatchResult } from '../types';
import useSound from '../hooks/useSound';
import './GameBoard.css';

// Import AWS service icons
import AmazonAurora from '../assets/images/AmazonAurora.png';
import AmazonS3 from '../assets/images/AmazonSimpleStorageService.png';
import AmazonGlacier from '../assets/images/AmazonSimpleStorageServiceGlacier.png';
import AmazonWorkSpaces from '../assets/images/AmazonWorkSpacesFamily.png';
import AWSLambda from '../assets/images/AWSLambda.png';
import EC2 from '../assets/images/EC2.png';
import VPC from '../assets/images/VPC.png';

const GRID_SIZE = 9;
const EMPTY_CELL = null;
const ICONS: Icon[] = [
  { id: 1, src: AmazonAurora, name: 'Aurora' },
  { id: 2, src: AmazonS3, name: 'S3' },
  { id: 3, src: AmazonGlacier, name: 'Glacier' },
  { id: 4, src: AmazonWorkSpaces, name: 'WorkSpaces' },
  { id: 5, src: AWSLambda, name: 'Lambda' },
  { id: 6, src: EC2, name: 'EC2' },
  { id: 7, src: VPC, name: 'VPC' },
];
const INITIAL_ICONS_COUNT = 5;
const NEW_ICONS_PER_TURN = 3;
const MIN_LINE_LENGTH = 5;

const GameBoard: React.FC<GameBoardProps> = ({
  onScoreUpdate,
  onGameOver,
  onReset,
  elapsedTime
}) => {
  const [grid, setGrid] = useState<(Icon | null)[][]>([]);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [nextIconPositions, setNextIconPositions] = useState<Cell[]>([]);
  const [animatingCells, setAnimatingCells] = useState<Cell[]>([]);
  const [pathCells, setPathCells] = useState<Cell[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const { playSound } = useSound();

  // Initialize the game board
  const initializeBoard = useCallback(() => {
    // Create empty grid
    const newGrid: (Icon | null)[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(EMPTY_CELL)
    );

    // Place initial icons
    const initialPositions = getRandomEmptyCells(newGrid, INITIAL_ICONS_COUNT);
    initialPositions.forEach(pos => {
      const randomIcon = getRandomIcon();
      newGrid[pos.row][pos.col] = randomIcon;
    });

    // Set next icons to appear
    const nextPositions = getRandomEmptyCells(newGrid, NEW_ICONS_PER_TURN);
    setNextIconPositions(nextPositions);

    setGrid(newGrid);
    setSelectedCell(null);
    setAnimatingCells([]);
    setPathCells([]);
    setGameStarted(false);
  }, []);

  // Initialize on first render
  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  // Reset the game when the reset button is clicked
  useEffect(() => {
    if (elapsedTime === 0) {
      initializeBoard();
    }
  }, [elapsedTime, initializeBoard]);

  const getRandomIcon = (): Icon => {
    const randomIndex = Math.floor(Math.random() * ICONS.length);
    return ICONS[randomIndex];
  };

  const getRandomEmptyCells = (currentGrid: (Icon | null)[][], count: number): Cell[] => {
    const emptyCells: Cell[] = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (currentGrid[row][col] === EMPTY_CELL) {
          emptyCells.push({ row, col });
        }
      }
    }

    // Shuffle and take the first 'count' cells
    return emptyCells
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(count, emptyCells.length));
  };

  const handleCellClick = (row: number, col: number) => {
    // Start the timer on first interaction
    if (!gameStarted) {
      setGameStarted(true);
      // Add a fake score update of 0 to start the timer
      onScoreUpdate(0);
    }

    // If the cell is empty and no cell is selected, do nothing
    if (grid[row][col] === EMPTY_CELL && selectedCell === null) {
      return;
    }

    // If no cell is selected, select this one
    if (selectedCell === null) {
      if (grid[row][col] !== EMPTY_CELL) {
        setSelectedCell({ row, col });
        setPathCells([]); // Clear any previous path
      }
      return;
    }

    // If clicking the already selected cell, deselect it
    if (selectedCell.row === row && selectedCell.col === col) {
      setSelectedCell(null);
      setPathCells([]);
      return;
    }

    // If clicking another cell with an icon, select the new cell instead
    if (grid[row][col] !== EMPTY_CELL) {
      setSelectedCell({ row, col });
      setPathCells([]);
      return;
    }

    // Try to move the icon from selected cell to the clicked empty cell
    moveIcon(selectedCell.row, selectedCell.col, row, col);
  };

  const moveIcon = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    // Check if there's a valid path
    const path = findPath(fromRow, fromCol, toRow, toCol);

    if (!path) {
      // No valid path found
      return;
    }

    // Create a new grid with the moved icon
    const newGrid = grid.map(row => [...row]);
    newGrid[toRow][toCol] = newGrid[fromRow][fromCol];
    newGrid[fromRow][fromCol] = EMPTY_CELL;

    // Add animation to the destination cell
    setAnimatingCells([...animatingCells, { row: toRow, col: toCol }]);

    // Update the grid and clear selection
    setGrid(newGrid);
    setSelectedCell(null);
    setPathCells([]);

    // Play move sound
    playSound('move');

    // Check for matches after the move
    setTimeout(() => {
      const gridAfterMatches = checkAndRemoveMatches(newGrid, [{ row: toRow, col: toCol }]);

      if (gridAfterMatches !== newGrid) {
        // Matches were found and removed
        setGrid(gridAfterMatches);
      } else {
        // No matches, add new icons
        addNewIcons(newGrid);
      }
    }, 300);
  };

  const findPath = (startRow: number, startCol: number, endRow: number, endCol: number): Cell[] | null => {
    // Breadth-first search to find a path
    const queue: { row: number; col: number; path: Cell[] }[] = [
      { row: startRow, col: startCol, path: [] }
    ];
    const visited: boolean[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(false)
    );
    visited[startRow][startCol] = true;

    const directions = [
      { row: -1, col: 0 }, // up
      { row: 1, col: 0 },  // down
      { row: 0, col: -1 }, // left
      { row: 0, col: 1 }   // right
    ];

    while (queue.length > 0) {
      const { row, col, path } = queue.shift()!;

      // Check if we reached the destination
      if (row === endRow && col === endCol) {
        const fullPath = [...path, { row, col }];
        setPathCells(fullPath);
        return fullPath;
      }

      // Try all four directions
      for (const dir of directions) {
        const newRow = row + dir.row;
        const newCol = col + dir.col;

        // Check if the new position is valid
        if (
          newRow >= 0 && newRow < GRID_SIZE &&
          newCol >= 0 && newCol < GRID_SIZE &&
          !visited[newRow][newCol] &&
          (grid[newRow][newCol] === EMPTY_CELL || (newRow === endRow && newCol === endCol))
        ) {
          visited[newRow][newCol] = true;
          queue.push({
            row: newRow,
            col: newCol,
            path: [...path, { row, col }]
          });
        }
      }
    }

    // No path found
    return null;
  };

  const checkForMatches = (currentGrid: (Icon | null)[][], row: number, col: number): MatchResult => {
    const icon = currentGrid[row][col];
    if (!icon) return { matches: [] };

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
          r >= 0 && r < GRID_SIZE &&
          c >= 0 && c < GRID_SIZE &&
          currentGrid[r][c] &&
          currentGrid[r][c]!.id === icon.id
        ) {
          lineMatches.push({ row: r, col: c });
          r += dir.row;
          c += dir.col;
        }
      });

      if (lineMatches.length >= MIN_LINE_LENGTH) {
        matches.push(...lineMatches);
      }
    });

    // Remove duplicates
    const uniqueMatches = matches.filter((match, index, self) =>
      index === self.findIndex(m => m.row === match.row && m.col === match.col)
    );

    return { matches: uniqueMatches };
  };

  const removeMatches = (currentGrid: (Icon | null)[][], matches: Cell[]): (Icon | null)[][] => {
    const newGrid = [...currentGrid.map(row => [...row])];

    matches.forEach(match => {
      newGrid[match.row][match.col] = EMPTY_CELL;
    });

    return newGrid;
  };

  const checkAndRemoveMatches = (currentGrid: (Icon | null)[][], positions: Cell[]): (Icon | null)[][] => {
    let hasMatches = false;
    let allMatches: Cell[] = [];

    // Check each position for matches
    for (const pos of positions) {
      // Skip empty cells
      if (!currentGrid[pos.row][pos.col]) continue;

      const matchResult = checkForMatches(currentGrid, pos.row, pos.col);
      if (matchResult.matches.length > 0) {
        hasMatches = true;
        allMatches = [...allMatches, ...matchResult.matches];
      }
    }

    // If no matches found, return the current grid
    if (!hasMatches) {
      return currentGrid;
    }

    // Remove duplicates from matches
    const uniqueMatches = allMatches.filter((match, index, self) =>
      index === self.findIndex(m => m.row === match.row && m.col === match.col)
    );

    // Update score and play sound
    onScoreUpdate(uniqueMatches.length);
    playSound('match');

    // Remove matches from grid
    const gridAfterMatches = removeMatches(currentGrid, uniqueMatches);

    // Check for any adjacent cells that might now form matches
    const adjacentCells: Cell[] = [];

    // For each removed match, check its adjacent cells
    uniqueMatches.forEach(match => {
      const directions = [
        { row: -1, col: 0 }, // up
        { row: 1, col: 0 },  // down
        { row: 0, col: -1 }, // left
        { row: 0, col: 1 }   // right
      ];

      directions.forEach(dir => {
        const adjRow = match.row + dir.row;
        const adjCol = match.col + dir.col;

        // Check if the adjacent cell is valid and has an icon
        if (
          adjRow >= 0 && adjRow < GRID_SIZE &&
          adjCol >= 0 && adjCol < GRID_SIZE &&
          gridAfterMatches[adjRow][adjCol] !== EMPTY_CELL
        ) {
          adjacentCells.push({ row: adjRow, col: adjCol });
        }
      });
    });

    // If there are adjacent cells to check, do it recursively
    if (adjacentCells.length > 0) {
      return checkAndRemoveMatches(gridAfterMatches, adjacentCells);
    }

    // Return the updated grid
    return gridAfterMatches;
  };

  const addNewIcons = (currentGrid: (Icon | null)[][]) => {
    const newGrid = [...currentGrid.map(row => [...row])];
    const newAnimatingCells: Cell[] = [];
    const newIconPositionsAdded: Cell[] = [];

    // Place icons at the next positions
    nextIconPositions.forEach(pos => {
      if (newGrid[pos.row][pos.col] === EMPTY_CELL) {
        newGrid[pos.row][pos.col] = getRandomIcon();
        // Add to animating cells
        newAnimatingCells.push({ row: pos.row, col: pos.col });
        // Track the new icon positions for match checking
        newIconPositionsAdded.push({ row: pos.row, col: pos.col });
      }
    });

    // Check if the game is over
    const emptyCells = getEmptyCellsCount(newGrid);
    if (emptyCells < NEW_ICONS_PER_TURN) {
      onGameOver();
      return;
    }

    // Set next positions for icons
    const nextPositions = getRandomEmptyCells(newGrid, NEW_ICONS_PER_TURN);
    setNextIconPositions(nextPositions);
    setAnimatingCells(newAnimatingCells);

    // Update the grid with the new icons
    setGrid(newGrid);

    // Wait a bit to show the new icons before checking for matches
    setTimeout(() => {
      // Check for matches in the new icons that were just added
      const gridAfterMatches = checkAndRemoveMatches(newGrid, newIconPositionsAdded);

      // Update the grid if there were matches
      if (gridAfterMatches !== newGrid) {
        setGrid(gridAfterMatches);
      }

      // Clear animation state
      setTimeout(() => {
        setAnimatingCells([]);
      }, 300);
    }, 500);
  };

  const getEmptyCellsCount = (currentGrid: (Icon | null)[][]): number => {
    let count = 0;
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (currentGrid[row][col] === EMPTY_CELL) {
          count++;
        }
      }
    }
    return count;
  };

  const isNextPosition = (row: number, col: number): boolean => {
    return nextIconPositions.some(pos => pos.row === row && pos.col === col);
  };

  const isAnimating = (row: number, col: number): boolean => {
    return animatingCells.some(cell => cell.row === row && cell.col === col);
  };

  const isPathCell = (row: number, col: number): boolean => {
    return pathCells.some(cell => cell.row === row && cell.col === col);
  };

  return (
    <div className="flex justify-center items-center w-full h-full py-2">
      <div className="aspect-square w-full max-w-xl mx-auto">
        <div className="game-board">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`board-cell
                    ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}
                    ${isNextPosition(rowIndex, colIndex) ? 'next-position' : ''}
                    ${isPathCell(rowIndex, colIndex) ? 'path-cell' : ''}
                  `}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell && (
                    <div className={`icon-container ${isAnimating(rowIndex, colIndex) ? 'animate' : ''}`}>
                      <img
                        src={cell.src}
                        alt={cell.name}
                        className="icon hover:scale-110 transition-transform duration-200"
                        draggable="false"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
