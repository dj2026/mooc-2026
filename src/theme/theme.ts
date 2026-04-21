import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#a855f7', light: '#c084fc', dark: '#9333ea' },
    secondary: { main: '#ec4899' },
    background: { default: '#0f0a1e', paper: 'rgba(255,255,255,0.05)' },
    text: { primary: '#ffffff', secondary: 'rgba(255,255,255,0.7)' },
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
          backgroundColor: "#0f0a1e",
          margin: 0,
          color: 'white',
          WebkitFontSmoothing: 'antialiased',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;