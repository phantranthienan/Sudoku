import { CELLSREMOVED } from './constants';

const isSafe = (board, row, col, value) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === value || board[i][col] === value) {
      return false;
    }
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === value) {
        return false;
      }
    }
  }

  return true;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const findEmptyCell = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        return [row, col];
      }
    }
  }

  return null;
};

const solveSudoku = (board) => {
  const emptyCell = findEmptyCell(board);

  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;

  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(numbers);

  for (let value of numbers) {
    if (isSafe(board, row, col, value)) {
      board[row][col] = value;
      if (solveSudoku(board)) {
        return true;
      }
      board[row][col] = null;
    }
  }

  return false;
};

function countSolutions(board) {
  const emptyCell = findEmptyCell(board);
  if (!emptyCell) {
    return 1;
  }

  const [row, col] = emptyCell;
  let solutionCount = 0;
  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      solutionCount += countSolutions(board);
      if (solutionCount > 1) break;
      board[row][col] = null;
    }
  }

  return solutionCount;
}

const createEmptyBoard = () => {
  return Array(9)
    .fill()
    .map(() => Array(9).fill(null));
};

const generateCompleteBoard = () => {
  const board = createEmptyBoard();
  solveSudoku(board);
  return board;
};

const removeNumbers = (board, difficulty) => {
  let attempts = 0;
  switch (difficulty) {
    case 'easy':
      attempts = CELLSREMOVED.easy;
      break;
    case 'medium':
      attempts = CELLSREMOVED.medium;
      break;
    case 'hard':
      attempts = CELLSREMOVED.hard;
      break;
    default:
      attempts = CELLSREMOVED.easy;
  }

  let cellsRemoved = 0;
  while (cellsRemoved < attempts) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (board[row][col] !== null) {
      const backup = board[row][col];
      board[row][col] = null;

      const boardCopy = copyBoard(board);
      const solutionCount = countSolutions(boardCopy);

      if (solutionCount !== 1) {
        board[row][col] = backup;
      } else {
        cellsRemoved++;
      }
    }
  }
};

const copyBoard = (board) => {
  return board.map((row) => [...row]);
};

const generateSudokuBoard = (difficulty) => {
  const completeBoard = generateCompleteBoard();
  const solution = copyBoard(completeBoard);
  removeNumbers(completeBoard, difficulty);
  const sudokuBoard = completeBoard.map((row) =>
    row.map((value) => ({
      value,
      fixed: value !== null,
    }))
  );
  return { sudokuBoard, solution };
};

export { generateSudokuBoard };
