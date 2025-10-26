import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from './ThemeProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
