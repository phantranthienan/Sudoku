import styled from 'styled-components';

import SwitchThemeButton from './SwitchThemeButton';

const NavBar = () => {
  return (
    <Nav>
      <NavContainer>
        <a href="#">sudoku</a>
        <SwitchThemeButton />
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  background-color: var(--nav-color);

  z-index: 99;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  max-width: 1280px;
  height: var(--nav-size);
  margin: auto;

  a {
    color: var(--blue-color);
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: bold;
  }

  @media (max-width: 400px) {
    a {
      font-size: 1.75rem;
    }
  }
`;

export default NavBar;
