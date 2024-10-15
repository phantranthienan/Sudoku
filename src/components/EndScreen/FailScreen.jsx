import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import {
  gameState,
  initialBoardState,
  boardState,
  timeState,
  errorsState,
  hintsState,
  limitedHistoryState,
} from '../../recoil/atoms';

import { GAMESTATES, MAX_HINTS } from '../../utils/constants';

const FailScreen = () => {
  const initialBoard = useRecoilValue(initialBoardState);
  const setGameState = useSetRecoilState(gameState);
  const setBoard = useSetRecoilState(boardState);
  const setTime = useSetRecoilState(timeState);
  const setHistory = useSetRecoilState(limitedHistoryState);
  const setErrors = useSetRecoilState(errorsState);
  const setHints = useSetRecoilState(hintsState);

  const handleNewGame = () => {
    setGameState(GAMESTATES.NOT_STARTED);
  };

  const handleRestart = () => {
    setGameState(GAMESTATES.IN_PROGRESS);
    setBoard(initialBoard);
    setTime(0);
    setErrors(0);
    setHints(MAX_HINTS);
    setHistory([]);
  };

  return (
    <>
      <Title>You Failed!</Title>
      <ButtonContainer>
        <Button onClick={handleNewGame}>New Game</Button>
        <Button onClick={handleRestart}>Restart</Button>
      </ButtonContainer>
    </>
  );
};

const Title = styled.h1`
  font-size: var(--title-size);
  color: red;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: var(--space-y);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  width: calc(240 / 16 * 1rem);
  max-width: 50vw;
  padding: 0.5em 1em;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  text-transform: uppercase;
  font-size: var(--button-label-size);
  color: white;

  background-color: var(--blue-color);

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

export default FailScreen;
