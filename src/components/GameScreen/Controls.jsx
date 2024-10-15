import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  limitedHistoryState,
  gameState,
  boardState,
  solutionState,
  selectedCellState,
  hintsState,
} from '../../recoil/atoms';

import { FiRotateCcw, FiPauseCircle } from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa6';

import { GAMESTATES } from '../../utils/constants';

const Controls = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [history, setHistoryState] = useRecoilState(limitedHistoryState);
  const [currentGameState, setGameState] = useRecoilState(gameState);
  const [hints, setHints] = useRecoilState(hintsState);
  const solution = useRecoilValue(solutionState);
  const setSelectedCell = useSetRecoilState(selectedCellState);

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
    let hintProvided = false;
    const newBoard = board.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (!hintProvided && cell.value === null && !cell.fixed) {
          hintProvided = true;
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
