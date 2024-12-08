import styled from 'styled-components';
import { useAtom } from 'jotai';

import {
  limitedHistoryState,
  gameState,
  boardState,
  solutionState,
  selectedCellState,
  hintsState,
} from '../../jotai/atoms';

import { FiRotateCcw, FiPauseCircle } from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa6';

import { GAMESTATES } from '../../utils/constants';

const Controls = () => {
  const [board, setBoard] = useAtom(boardState);
  const [history, setHistoryState] = useAtom(limitedHistoryState);
  const [currentGameState, setGameState] = useAtom(gameState);
  const [hints, setHints] = useAtom(hintsState);
  const [solution] = useAtom(solutionState);
  const [, setSelectedCell] = useAtom(selectedCellState);

  const handleUndo = () => {
    if (history.length > 0) {
      const previousBoard = history[history.length - 1];
      setBoard(previousBoard);
      setHistoryState(history.slice(0, -1));
      setSelectedCell({ row: null, col: null, value: null });
    }
  };

  const handleHint = () => {
    if (hints === 0) return;
    const emptyCells = [];
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.value === null && !cell.fixed) {
          emptyCells.push({ rowIndex, colIndex });
        }
      });
    });

    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const { rowIndex, colIndex } = randomCell;

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          setHints((prev) => prev - 1);
          return { ...cell, value: solution[rowIndex][colIndex] };
        }
        return cell;
      })
    );

    setHistoryState([...history, board]);
    setBoard(newBoard);
  };

  const handlePause = () => {
    if (currentGameState === GAMESTATES.IN_PROGRESS) {
      setGameState(GAMESTATES.PAUSED);
      setSelectedCell({ row: null, col: null, value: null });
    }
  };

  return (
    <ControlsContainer>
      <ControlButton onClick={handleUndo}>
        <Icon as={FiRotateCcw} />
        <span>Undo</span>
      </ControlButton>
      <ControlButton onClick={handlePause}>
        <Icon as={FiPauseCircle} />
        <span>Pause</span>
      </ControlButton>
      <ControlButton onClick={handleHint}>
        <Icon as={FaRegLightbulb} />
        <span>Hint</span>
      </ControlButton>
    </ControlsContainer>
  );
};

const ControlsContainer = styled.div`
  width: calc(var(--cell-size) * 9);
  display: flex;
  justify-content: space-around;
`;

const ControlButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: var(--cell-size);

  color: var(--text-color);

  background-color: transparent;

  span {
    font-size: var(--info-size);
  }

  &:hover {
    color: var(--editable-color);
  }

  @media (max-height: 700px) {
    gap: 0.25rem;
  }
`;

const Icon = styled.div`
  font-size: var(--icon-size);
`;

export default Controls;
