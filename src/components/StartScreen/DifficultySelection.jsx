import styled from 'styled-components';
import { useAtom } from 'jotai';

import { difficultyState } from '../../jotai/atoms'; // Make sure the path is correct
import { DIFFICULTIES } from '../../utils/constants';

const DifficultySelection = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useAtom(difficultyState);

  const handleSelectDifficulty = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  return (
    <SelectionContainer>
      {DIFFICULTIES.map((difficulty) => (
        <DifficultyChoice key={difficulty}>
          <input
            type="radio"
            id={`difficulty-${difficulty}`}
            name="difficulty"
            value={difficulty}
            checked={selectedDifficulty === difficulty}
            onChange={handleSelectDifficulty}
          />
          <label htmlFor={`difficulty-${difficulty}`}>{difficulty}</label>
        </DifficultyChoice>
      ))}
    </SelectionContainer>
  );
};

const SelectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: var(--space-y) 0;

  label {
    text-transform: capitalize;
    font-size: 1.2rem;
    color: var(--subtext-color);
  }
`;

const DifficultyChoice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  input:checked + label {
    color: var(--blue-color);
  }
`;

export default DifficultySelection;
