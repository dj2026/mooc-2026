import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';
import './index.css';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter 
      future={{v7_startTransition: true, v7_relativeSplatPath: true }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>
);