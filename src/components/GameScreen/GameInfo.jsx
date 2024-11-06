import Styled from 'styled-components';
import { useAtom } from 'jotai';

import { formatTimeState, hintsState, errorsState } from '../../jotai/atoms';

import { MAX_ERRORS } from '../../utils/constants';

const GameInfo = () => {
  const [time] = useAtom(formatTimeState);
  const [errors] = useAtom(errorsState);
  const [hints] = useAtom(hintsState);

  return (
    <GameInfoContainer>
      <span className="left">{`Errors: ${errors}/${MAX_ERRORS}`}</span>
      <span className="center">{time}</span>
      <span className="right">{`Hints: ${hints}`}</span>
    </GameInfoContainer>
  );
};

const GameInfoContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(var(--cell-size) * 9);
  color: var(--info-color);
  position: relative;

  span {
    font-size: var(--info-size);
    text-transform: capitalize;
  }

  .left {
    position: absolute;
    left: 0;
    text-align: left;
  }

  .center {
    margin: 0 auto;
    text-align: center;
  }

  .right {
    position: absolute;
    right: 0;
    text-align: right;
  }
`;

export default GameInfo;
