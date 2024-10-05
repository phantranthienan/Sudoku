import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  boardState,
  limitedHistoryState,
  selectedCellState,
  solutionState,
  gameState,
} from '../../recoil/atoms';

import { GAMESTATES } from '../../utils/constants';

const SudokuBoard = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [selectedCell, setSelectedCell] = useRecoilState(selectedCellState);
  const [history, setHistory] = useRecoilState(limitedHistoryState);
  const solution = useRecoilValue(solutionState);
  const currentGameState = useRecoilValue(gameState);

  const handleInput = (rowIndex, colIndex) => {
    return (e) => {
      const value = e.target.value;
      if (value === '' || /^[1-9]$/.test(value)) {
        const updatedBoard = board.map((row, rowIdx) => {
          return row.map((cell, colIdx) =>
            rowIdx === rowIndex && colIdx === colIndex
              ? { ...cell, value: value === '' ? null : parseInt(value) }
              : cell
          );
        });

        setBoard(updatedBoard);

        if (JSON.stringify(updatedBoard) !== JSON.stringify(board)) {
          setHistory([...history, board]); // Save current state before the change
        }

        setSelectedCell({
          row: rowIndex,
          col: colIndex,
          value: value === '' ? null : parseInt(value),
        });
      }
    };
  };

  const handleKeyPress = (rowIndex, colIndex) => (e) => {
    const key = e.key;
    if (key === 'Backspace' || key === 'Delete') {
      const updatedBoard = board.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex
            ? { ...cell, value: null }
            : cell
        )
      );
      setHistory([...history, board]);
      setBoard(updatedBoard);
      setSelectedCell({ row: rowIndex, col: colIndex, value: null });
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
              <GridCell
                key={`${rowIndex}-${colIndex}`}
                value={cell.value ? cell.value : ''}
                readOnly={cell.fixed}
                onClick={() => handleCellClick(rowIndex, colIndex, cell.value)}
                onChange={handleInput(rowIndex, colIndex)}
                onKeyDown={handleKeyPress(rowIndex, colIndex)}
                $selected={
                  selectedCell.row === rowIndex && selectedCell.col === colIndex
                }
                $sameValue={
                  cell.value !== null && cell.value === selectedCell.value
                }
                $incorrect={
                  cell.value !== null &&
                  cell.value !== solution[rowIndex][colIndex]
                }
                $paused={currentGameState === GAMESTATES.PAUSED}
              />
            );
          });
        })}
      </GridBoard>
    </>
  );
};

const GridCell = styled.input`
  height: var(--cell-size);
  width: var(--cell-size);
  border: 0.5px solid var(--line-color);

  text-align: center;
  font-size: var(--number-size);
  color: ${({ readOnly }) =>
    readOnly ? 'var(--fixed-color)' : 'var(--editable-color)'};
  color: ${(props) => props.$incorrect && 'var(--error-color)'};
  color: ${(props) => props.$paused && 'var(--cell-color)'};

  background-color: ${(props) =>
    props.$selected || props.$sameValue
      ? 'var(--cell-filled-color)'
      : 'var(--cell-color)'};

  caret-color: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  /* Thicker right border on every 3rd column */
  &:nth-child(3n) {
    border-right: 3px solid var(--line-color);
  }

  /* Thicker bottom border on every 3rd row */
  &:nth-child(n + 19):nth-child(-n + 27),
  &:nth-child(n + 46):nth-child(-n + 54),
  &:nth-child(n + 73):nth-child(-n + 81) {
    border-bottom: 3px solid var(--line-color);
  }

  /* Remove double-thick left borders */
  &:nth-child(3n + 1) {
    border-left: none;
  }

  /* Add thick left border */
  &:nth-child(9n + 1) {
    border-left: 3px solid var(--line-color);
  }

  /* Remove double-thick top borders */
  &:nth-child(n + 28):nth-child(-n + 36),
  &:nth-child(n + 55):nth-child(-n + 63) {
    border-top: none;
  }

  /* Add thick top border only */
  &:nth-child(-n + 9) {
    border-top: 3px solid var(--line-color);
  }
`;

const GridBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(9, var(--cell-size));
  grid-template-rows: repeat(9, var(--cell-size));
  justify-content: center;
  margin-bottom: auto;
`;

export default SudokuBoard;
