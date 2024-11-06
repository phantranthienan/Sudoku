import { useEffect } from 'react';
import { useAtom } from 'jotai';

import {
  gameState,
  timeState,
  boardState,
  solutionState,
  errorsState,
} from '../../jotai/atoms';

import SudokuBoard from './SudokuBoard';
import GameInfo from './GameInfo';
import Controls from './Controls';
import NumPad from './Numpad';
import PauseModal from './PauseModal';

import { GAMESTATES, MAX_ERRORS } from '../../utils/constants';

const GameScreen = () => {
  const [currentGameState, setGameState] = useAtom(gameState);
  const [board] = useAtom(boardState);
  const [solution] = useAtom(solutionState);
  const [errors] = useAtom(errorsState);
  const [, setTime] = useAtom(timeState);

  let isGameRunning = currentGameState === GAMESTATES.IN_PROGRESS;

  useEffect(() => {
    let timer;
    if (isGameRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isGameRunning, setTime]);

  useEffect(() => {
    const checkCompletion = () => {
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          if (
            board[row][col].value === null ||
            board[row][col].value !== solution[row][col]
          ) {
            return false;
          }
        }
      }
      return true;
    };
    if (checkCompletion()) {
      setGameState(GAMESTATES.COMPLETED);
    }
  }, [board, solution, setGameState]);

  useEffect(() => {
    if (errors >= MAX_ERRORS) {
      setGameState(GAMESTATES.FAILED);
    }
  }, [errors, setGameState]);

  return (
    <>
      <GameInfo />
      <SudokuBoard />
      <Controls />
      <NumPad />
      <PauseModal />
    </>
  );
};

export default GameScreen;
