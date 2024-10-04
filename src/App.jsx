import { useRecoilValue } from 'recoil';

import { gameState } from './recoil/atoms';

import { GAMESTATES } from './utils/constants';

import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import CompleteScreen from './components/CompleteScreen';

const App = () => {
  const currentGameState = useRecoilValue(gameState);

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
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />
      <MainContent>{renderContent()}</MainContent>
    </>
  );
};

export default App;
