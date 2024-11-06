import { useAtom } from 'jotai';
import { ThemeProvider } from 'styled-components';

import { gameState, darkThemeState } from './jotai/atoms';

import { GAMESTATES } from './utils/constants';
import { lightTheme, darkTheme } from './styles/themes';

import GlobalStyles from './styles/GlobalStyles';

import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import { CompleteScreen, FailScreen } from './components/EndScreen';

const App = () => {
  const [currentGameState] = useAtom(gameState);
  const [isDarkTheme] = useAtom(darkThemeState);

  const renderContent = () => {
    switch (currentGameState) {
      case GAMESTATES.NOT_STARTED:
        return <StartScreen />;
      case GAMESTATES.IN_PROGRESS:
        return <GameScreen />;
      case GAMESTATES.PAUSED:
        return <GameScreen />;
      case GAMESTATES.COMPLETED:
        return <CompleteScreen />;
      case GAMESTATES.FAILED:
        return <FailScreen />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <NavBar />
      <MainContent>{renderContent()}</MainContent>
    </ThemeProvider>
  );
};

export default App;
