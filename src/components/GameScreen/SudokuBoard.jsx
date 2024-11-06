import styled from 'styled-components';
import { useAtom } from 'jotai';

import {
  boardState,
  errorsState,
  limitedHistoryState,
  selectedCellState,
  solutionState,
  gameState,
} from '../../jotai/atoms';

import SudokuCell from './SudokuCell';

import { GAMESTATES } from '../../utils/constants';

const SudokuBoard = () => {
  const [board, setBoard] = useAtom(boardState);
  const [selectedCell, setSelectedCell] = useAtom(selectedCellState);
  const [history, setHistory] = useAtom(limitedHistoryState);
  const [solution] = useAtom(solutionState);
  const [currentGameState] = useAtom(gameState);
  const [, setErrors] = useAtom(errorsState);

  const handleKeyPress = (rowIndex, colIndex) => (e) => {
    if (board[rowIndex][colIndex].fixed) {
      return;
    }

    const key = e.key;

    if (/^[1-9]$/.test(key) || key === 'Backspace' || key === 'Delete') {
      e.preventDefault();
      const value = /^[1-9]$/.test(key) ? parseInt(key) : null;

      const isIncorrect =
        value !== null && value !== solution[rowIndex][colIndex];

      const updatedBoard = board.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          return rIdx === rowIndex && cIdx === colIndex
            ? { ...cell, value }
            : cell;
        })
      );

      setBoard(updatedBoard);
      if (isIncorrect) {
        setErrors((prevErrors) => prevErrors + 1);
      }
      if (JSON.stringify(updatedBoard) !== JSON.stringify(board)) {
        setHistory([...history, board]);
      }
      setSelectedCell({
        row: rowIndex,
        col: colIndex,
        value,
      });
    }
  };

  const handleCellClick = (row, col, value) => {
    setSelectedCell({ row, col, value });
  };

  return (
    <>
      <GridBoard>
        {board.map((row, rowIndex) => {
          return row.map((cell, colIndex) => {
            return (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cell.value ? cell.value : ''}
                readOnly={cell.fixed}
                onClick={() => handleCellClick(rowIndex, colIndex, cell.value)}
                onKeyDown={handleKeyPress(rowIndex, colIndex)}
                selected={
                  selectedCell.row === rowIndex && selectedCell.col === colIndex
                }
                sameValue={
                  cell.value !== null && cell.value === selectedCell.value
                }
                incorrect={
                  cell.value !== null &&
                  cell.value !== solution[rowIndex][colIndex]
                }
                paused={currentGameState === GAMESTATES.PAUSED}
              />
            );
          });
        })}
      </GridBoard>
    </>
  );
};

const GridBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(9, var(--cell-size));
  grid-template-rows: repeat(9, var(--cell-size));
  justify-content: center;
  margin-bottom: auto;
`;

export default SudokuBoard;
