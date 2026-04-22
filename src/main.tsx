import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from './theme/ThemeContext';
import App from './App';
import './index.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter 
      future={{v7_startTransition: true, v7_relativeSplatPath: true }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);