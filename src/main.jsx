import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './styles/GlobalStyles.js';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
      <GlobalStyles />
      <App />
    </RecoilRoot>
  </StrictMode>
);
