import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter 
      future={{v7_startTransition: true, v7_relativeSplatPath: true }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>
);