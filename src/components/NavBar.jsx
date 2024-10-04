import styled from 'styled-components';

const NavBar = () => {
  return (
    <Nav>
      <NavContainer>
        <a href="#">sudoku</a>
        <button>toggle</button>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  background-color: white;

  z-index: 99;
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: var(--nav-size);

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
