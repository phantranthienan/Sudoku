import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const MainContent = ({ children }) => {
  return <ContentContainer>{children}</ContentContainer>;
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: calc(100vh - var(--nav-size));
  margin-top: var(--nav-size);
  padding: 50px 0;

  background-color: var(--bg-main);

  @media (min-height: 800px) {
    padding: 100px 0;
  }
`;

export default MainContent;
