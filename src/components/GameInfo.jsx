import Styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { formatTimeState, difficultyState } from '../recoil/atoms';

const GameInfo = () => {
  const time = useRecoilValue(formatTimeState);
  const selectedDifficulty = useRecoilValue(difficultyState);

  return (
    <GameInfoContainer>
      <span>difficulty: {selectedDifficulty}</span>
      <span>time: {time}</span>
    </GameInfoContainer>
  );
};

const GameInfoContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(var(--cell-size) * 9);
  color: var(--info-value-color);

  span {
    font-size: var(--info-size);
    text-transform: capitalize;
  }
`;

export default GameInfo;
