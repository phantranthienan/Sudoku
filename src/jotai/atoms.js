import { atom } from 'jotai';
import { MAX_HINTS, GAMESTATES, HISTORY_MAX } from '../utils/constants';

//Game States
export const gameState = atom(GAMESTATES.NOT_STARTED);

export const boardState = atom(
  Array(9).fill(Array(9).fill({ value: null, fixed: false }))
);

export const initialBoardState = atom([]);

export const solutionState = atom(Array(9).fill(Array(9).fill(null)));

export const selectedCellState = atom({ row: null, col: null, value: null });

export const historyState = atom([]);

export const limitedHistoryState = atom(
  (get) => get(historyState),
  (get, set, newHistory) => {
    const updatedHistory = [...newHistory];
    if (updatedHistory.length > HISTORY_MAX) {
      updatedHistory.shift();
    }
    set(historyState, updatedHistory);
  }
);

//Info States
export const difficultyState = atom(null);

export const timeState = atom(0);

export const errorsState = atom(0);

export const hintsState = atom(MAX_HINTS);

export const formatTimeState = atom((get) => {
  const time = get(timeState);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

//Theme States
export const darkThemeState = atom(false);
