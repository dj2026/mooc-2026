import { IconButton, useTheme } from '@mui/material';
import { Moon, Sun } from 'lucide-react';
import { useThemeMode } from '../theme/ThemeContext';

export function ThemeToggleButton() {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <IconButton onClick={toggleTheme} aria-label={isDark ? "Activar mode clar" : "Activar mode fosc"}
      sx={{color: theme.palette.text.primary, transition: 'all 0.3s ease', '&:hover': {color: theme.palette.primary.main, bgcolor: theme.palette.primary.main + '15'},}}>
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </IconButton>
  );
}