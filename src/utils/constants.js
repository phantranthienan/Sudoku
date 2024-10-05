const GAMESTATES = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
};

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DIFFICULTIES = ['easy', 'medium', 'hard'];

const CELLSREMOVED = {
  easy: 40,
  medium: 46,
  hard: 52,
};

const HISTORY_MAX = 20;

export { GAMESTATES, NUMBERS, DIFFICULTIES, CELLSREMOVED, HISTORY_MAX };
