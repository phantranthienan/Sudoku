import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  gameState,
  difficultyState,
  boardState,
  solutionState,
  initialBoardState,
  timeState,
  limitedHistoryState,
  errorsState,
  hintsState
} from '../../recoil/atoms';

import DifficultySelection from './DifficultySelection';

import { generateSudokuBoard } from '../../utils/sudoku';
import { GAMESTATES, MAX_HINTS } from '../../utils/constants';

const StartScreen = () => {
  const selectedDifficulty = useRecoilValue(difficultyState);
  const setGameState = useSetRecoilState(gameState);
  const setBoardState = useSetRecoilState(boardState);
  const setSolutionState = useSetRecoilState(solutionState);
  const setInitialBoardState = useSetRecoilState(initialBoardState);
  const setTime = useSetRecoilState(timeState);
  const setHistory = useSetRecoilState(limitedHistoryState);
  const setErrors = useSetRecoilState(errorsState);
  const setHints = useSetRecoilState(hintsState);

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
