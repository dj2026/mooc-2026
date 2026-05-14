import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'mooc-theme-mode';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {const stored = localStorage.getItem(STORAGE_KEY); if (stored === 'light' || stored === 'dark') return stored;}
    return 'dark';
  });

  const setMode = (newMode: ThemeMode) => {setModeState(newMode);localStorage.setItem(STORAGE_KEY, newMode);};
  const toggleTheme = () => {setMode(mode === 'dark' ? 'light' : 'dark');};
  useEffect(() => {localStorage.setItem(STORAGE_KEY, mode);}, [mode]);
  const theme = getTheme(mode);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {throw new Error('useThemeMode must be used within ThemeProvider');}
  return context;
}