import { createTheme, ThemeOptions } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

const primaryPalette = {
  main: '#8400ff',
  light: '#c084fc',
  dark: '#8400ff',
  contrastText: '#ffffff',
};

const getBaseTheme = (mode: ThemeMode): ThemeOptions => ({
  palette: {
    mode,
    primary: primaryPalette,
    secondary: { main: '#ec4899' },
    ...(mode === 'dark'
      ? {
          background: {
            default: '#0a0a0a',
            paper: '#141414',
          },
          text: {
            primary: '#ffffff',
            secondary: '#ffffff',
          },
        }
      : {
          background: {
            default: '#ffffff',
            paper: '#ffffff',
          },
          text: {
            primary: '#1a1a1a',
            secondary: 'rgba(26, 26, 26, 0.7)',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: { fontWeight: 900 },
    h2: { fontWeight: 900 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
          margin: 0,
          WebkitFontSmoothing: 'antialiased',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundImage: 'none',
          ...(mode === 'dark'
            ? {
                border: '1px solid rgba(255, 255, 255, 0.1)',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              }
            : {
                border: '1px solid rgba(0, 0, 0, 0.08)',
                bgcolor: '#ffffff',
              }),
        },
      },
    },
  },
});

export function getTheme(mode: ThemeMode) {
  return createTheme(getBaseTheme(mode));
}

export default getTheme('dark');