/* eslint-disable react/prop-types */
import styled from 'styled-components';

const SudokuCell = ({
  value,
  onClick,
  onKeyDown,
  selected,
  sameValue,
  incorrect,
  paused,
  readOnly,
}) => {
  return (
    <GridCell
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      $readOnly={readOnly}
      $selected={selected}
      $sameValue={sameValue}
      $incorrect={incorrect}
      $paused={paused}
    >
      {value}
    </GridCell>
  );
};

const GridCell = styled.div`
  height: var(--cell-size);
  width: var(--cell-size);
  border: 0.5px solid var(--line-color);

  text-align: center;
  line-height: var(--cell-size);
  font-size: var(--number-size);
  color: ${(props) =>
    props.$readOnly ? 'var(--fixed-color)' : 'var(--editable-color)'};
  color: ${(props) => props.$incorrect && 'var(--error-color)'};
  color: ${(props) => props.$paused && 'var(--cell-color)'};

  background-color: ${(props) =>
    props.$selected || props.$sameValue
      ? 'var(--cell-filled-color)'
      : 'var(--cell-color)'};

  caret-color: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  /* Thicker right border on every 3rd column */
  &:nth-child(3n) {
    border-right: 3px solid var(--line-color);
  }

  /* Thicker bottom border on every 3rd row */
  &:nth-child(n + 19):nth-child(-n + 27),
  &:nth-child(n + 46):nth-child(-n + 54),
  &:nth-child(n + 73):nth-child(-n + 81) {
    border-bottom: 3px solid var(--line-color);
  }

  /* Remove double-thick left borders */
  &:nth-child(3n + 1) {
    border-left: none;
  }

  /* Add thick left border */
  &:nth-child(9n + 1) {
    border-left: 3px solid var(--line-color);
  }

  /* Remove double-thick top borders */
  &:nth-child(n + 28):nth-child(-n + 36),
  &:nth-child(n + 55):nth-child(-n + 63) {
    border-top: none;
  }

  /* Add thick top border only */
  &:nth-child(-n + 9) {
    border-top: 3px solid var(--line-color);
  }
`;

export default SudokuCell;
