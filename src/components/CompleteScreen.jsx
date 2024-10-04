import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { gameState, difficultyState, timeState } from '../recoil/atoms';

import { GAMESTATES } from '../utils/constants';

const CompleteScreen = () => {
  const difficulty = useRecoilValue(difficultyState);
  const time = useRecoilValue(timeState);
  const setGameState = useSetRecoilState(gameState);
  return (
    <>
      <Title>congratulation!</Title>
      <Message>
        you have completed a <span>{difficulty}</span> sudoku within{' '}
        <span>{time}</span> seconds
      </Message>
      <NewGameButton onClick={() => setGameState(GAMESTATES.NOT_STARTED)}>
        new game
      </NewGameButton>
    </>
  );
};

const Title = styled.h1`
  font-size: var(--title-size);
  color: var(--blue-color);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: var(--text-color);
  line-height: 1.5;
  text-align: center;

  margin: var(--space-y) 0;

  span {
    font-weight: bold;
  }

  @media (max-width: 400px) {
    font-size: 1.25rem;
  }
`;

const NewGameButton = styled.button`
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
export default CompleteScreen;
