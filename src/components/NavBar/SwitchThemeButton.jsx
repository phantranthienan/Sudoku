import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { darkThemeState } from '../../recoil/atoms';

import { FaSun, FaMoon } from 'react-icons/fa';

const SwitchThemeButton = () => {
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(darkThemeState);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <Button onClick={toggleTheme}>
      <ButtonIndicator isDarkTheme={isDarkTheme}>
        {isDarkTheme ? <FaMoon size="1rem" /> : <FaSun size="1rem" />}{' '}
        {/* Kích thước icon dùng rem */}
      </ButtonIndicator>
    </Button>
  );
};

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.buttonBackground};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

  cursor: pointer;
`;

const ButtonIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;

  color: ${({ theme }) => theme.buttonIconColor};
`;
export default SwitchThemeButton;
