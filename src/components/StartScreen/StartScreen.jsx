import styled from 'styled-components';
import { useAtom } from 'jotai';

import {
  gameState,
  difficultyState,
  boardState,
  solutionState,
  initialBoardState,
  timeState,
  limitedHistoryState,
  errorsState,
  hintsState,
} from '../../jotai/atoms';

import DifficultySelection from './DifficultySelection';

import { generateSudokuBoard } from '../../utils/sudoku';
import { GAMESTATES, MAX_HINTS } from '../../utils/constants';

const StartScreen = () => {
  const [selectedDifficulty] = useAtom(difficultyState);
  const [, setGameState] = useAtom(gameState);
  const [, setBoardState] = useAtom(boardState);
  const [, setSolutionState] = useAtom(solutionState);
  const [, setInitialBoardState] = useAtom(initialBoardState);
  const [, setTime] = useAtom(timeState);
  const [, setHistory] = useAtom(limitedHistoryState);
  const [, setErrors] = useAtom(errorsState);
  const [, setHints] = useAtom(hintsState);

  const handleStartGame = () => {
    const { sudokuBoard, solution } = generateSudokuBoard(selectedDifficulty);
    setGameState(GAMESTATES.IN_PROGRESS);
    setBoardState(sudokuBoard);
    setInitialBoardState(sudokuBoard);
    setSolutionState(solution);
    setHints(MAX_HINTS);
    setErrors(0);
    setTime(0);
    setHistory([]);
  };

  return (
    <>
      <Title>
        classic <span>sudoku</span>
      </Title>
      <DifficultySelection />
      <StartButton onClick={handleStartGame} disabled={!selectedDifficulty}>
        start
      </StartButton>
    </>
  );
};

const Title = styled.h1`
  font-size: var(--title-size);
  color: var(--blue-color);
  text-transform: uppercase;

  span {
    color: var(--fixed-color);
  }
`;

const StartButton = styled.button`
  width: calc(240 / 16 * 1rem);
  max-width: 50vw;
  padding: 0.5em 1em;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  font-size: var(--button-label-size);
  text-transform: uppercase;
  font-weight: bold;
  color: var(--blue-color);

  background-color: white;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

export default StartScreen;
