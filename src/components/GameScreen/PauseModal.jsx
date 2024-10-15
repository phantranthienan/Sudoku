import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

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

const PauseModal = () => {
  const [currentGameState, setGameState] = useRecoilState(gameState);
  const initialBoard = useRecoilValue(initialBoardState);
  const setBoard = useSetRecoilState(boardState);
  const setTime = useSetRecoilState(timeState);
  const setHistory = useSetRecoilState(limitedHistoryState);
  const setErrors = useSetRecoilState(errorsState);
  const setHints = useSetRecoilState(hintsState);

  const handleResume = () => {
    setGameState(GAMESTATES.IN_PROGRESS);
  };

  const handleRestart = () => {
    setGameState(GAMESTATES.IN_PROGRESS);
    setBoard(initialBoard);
    setTime(0);
    setErrors(0);
    setHints(MAX_HINTS);
    setHistory([]);
  };

  if (currentGameState !== 'PAUSED') {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Pause</h2>
        <ButtonWrapper>
          <StyledButton $variant="resume" onClick={handleResume}>
            Resume
          </StyledButton>
          <StyledButton $variant="restart" onClick={handleRestart}>
            Restart
          </StyledButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PauseModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 15rem;
  width: 15rem;
  padding: 1rem;
  border-radius: 10px;

  background-color: var(--pause-modal-bg);

  h2 {
    color: var(--subtext-color);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  height: 2.5rem;
  width: 12rem;
  border: none;
  border-radius: 5px;

  font-size: 1rem;
  color: ${(props) =>
    props.$variant === 'resume' ? 'white' : 'var(--blue-color)'};

  background-color: ${(props) =>
    props.$variant === 'resume'
      ? 'var(--blue-color)'
      : 'var(--pause-modal-bg)'};

  &:hover {
    filter: brightness(0.9);
  }
`;
