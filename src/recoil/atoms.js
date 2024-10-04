import { atom, selector } from 'recoil';
import { GAMESTATES } from '../utils/constants';
import { HISTORY_MAX } from '../utils/constants';

export const gameState = atom({
  key: 'gameState',
  default: GAMESTATES.NOT_STARTED,
});

export const difficultyState = atom({
  key: 'difficultyState',
  default: null,
});

export const timeState = atom({
  key: 'timeState',
  default: 0,
});

export const boardState = atom({
  key: 'boardState',
  default: Array(9).fill(Array(9).fill({ value: null, fixed: false })),
});

export const initialBoardState = atom({
  key: 'initialGameState',
  default: [],
});

export const solutionState = atom({
  key: 'solutionState',
  default: Array(9).fill(Array(9).fill(null)),
});

export const selectedCellState = atom({
  key: 'selectedCellState',
  default: { row: null, col: null, value: null },
});

export const historyState = atom({
  key: 'historyState',
  default: [],
});

export const limitedHistoryState = selector({
  key: 'limitedHistoryState',
  get: ({ get }) => {
    return get(historyState);
  },
  set: ({ set }, newHistory) => {
    const updatedHistory = [...newHistory];
    if (updatedHistory.length > HISTORY_MAX) {
      updatedHistory.shift();
    }
    set(historyState, updatedHistory);
  },
});

export const formatTimeState = selector({
  key: 'timeFormattedState',
  get: ({ get }) => {
    const time = get(timeState);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  },
});
