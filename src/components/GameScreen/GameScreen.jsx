import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  gameState,
  timeState,
  boardState,
  solutionState,
} from '../../recoil/atoms';

import SudokuBoard from './SudokuBoard';
import GameInfo from './GameInfo';
import Controls from './Controls';
import NumPad from './Numpad';
import PauseModal from './PauseModal';

import { GAMESTATES } from '../../utils/constants';

const GameScreen = () => {
  const [currentGameState, setGameState] = useRecoilState(gameState);
  const board = useRecoilValue(boardState);
  const solution = useRecoilValue(solutionState);
  const setTime = useSetRecoilState(timeState);

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
