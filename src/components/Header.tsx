import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { Rocket, GraduationCap } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Stack, useTheme } from '@mui/material';
import { authService } from '../services/authService';
<<<<<<< HEAD
import { useTranslation } from 'react-i18next'; // Importem el hook de traducció

export function Header() {
  const { t, i18n } = useTranslation(); // Inicialitzem traduccions
=======
import { useTranslation } from 'react-i18next';
import { ThemeToggleButton } from './ThemeToggleButton';

export function Header() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
>>>>>>> d735607 (THEME + LANGUAGE)
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const currentStudent = localStorage.getItem('currentStudent');
    setIsLoggedIn(!!token || !!currentStudent);
  };

  useEffect(() => {
    setMounted(true); 
    checkAuth();
  }, [location]);

  const handleLogout = async () => {
    localStorage.removeItem('currentStudent');
    await authService.logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  if (!mounted) return null;

  // Obtenim l'idioma actual (els primers dos caràcters per si és 'ca-ES', etc.)
  const currentLanguage = i18n.language.split('-')[0];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        width: '100vw', left: 0, right: 0, 
<<<<<<< HEAD
        bgcolor: 'rgba(18, 18, 18, 0.8)', 
        backdropFilter: 'blur(20px)', 
        boxShadow: 'none', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
=======
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)', 
        boxShadow: 'none', 
        borderBottom: `1px solid ${theme.palette.divider}`, 
>>>>>>> d735607 (THEME + LANGUAGE)
        zIndex: 1100, 
        height: '80px', 
        justifyContent: 'center'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 8 }, display: 'flex', justifyContent: 'space-between' }}>
        
        {/* LOGO AMB COET */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/')}
          >
            <Rocket 
              size={32}
              color={theme.palette.mode === 'dark' ? '#fff' : '#1a1a1a'} 
              fill={theme.palette.primary.main}
              style={{ transform: 'rotate(-45deg)' }} 
            />
          </motion.div>
          
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <Stack direction="row" sx={{ alignItems: 'baseline' }}>
<<<<<<< HEAD
              <Typography variant="h5" sx={{ fontWeight: 900, color: 'white', letterSpacing: '-1.5px' }}>
                MOOC
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#a855f7', ml: 1, letterSpacing: '-1px' }}>
=======
              <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-1.5px' }}>
                MOOC
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main', ml: 1, letterSpacing: '-1px' }}>
>>>>>>> d735607 (THEME + LANGUAGE)
                2026
              </Typography>
            </Stack>
          </RouterLink>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          
<<<<<<< HEAD
          {/* SELECTOR D'IDIOMES INTEGRAT */}
          <Stack direction="row" sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '12px', p: 0.5 }}>
            {['ca', 'es', 'en'].map((lng) => (
              <Button 
                key={lng} 
                onClick={() => i18n.changeLanguage(lng)}
                sx={{ 
                  minWidth: '35px', px: 1, fontSize: '0.7rem', fontWeight: 800,
                  color: i18n.language === lng ? '#fff' : 'rgba(255,255,255,0.4)',
                  bgcolor: i18n.language === lng ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.1)' }
                }}
              >
                {lng.toUpperCase()}
              </Button>
            ))}
=======
          <ThemeToggleButton />

          {/* SELECTOR D'IDIOMA AMB INDICADOR LILA */}
          <Stack direction="row" sx={{ bgcolor: 'action.hover', borderRadius: '12px', p: 0.5, gap: 0.5 }}>
            {['ca', 'es', 'en'].map((lng) => {
              const isActive = currentLanguage === lng;
              return (
                <Button 
                  key={lng} 
                  onClick={() => i18n.changeLanguage(lng)}
                  sx={{ 
                    minWidth: '40px', 
                    px: 1.5, 
                    fontSize: '0.75rem', 
                    fontWeight: 800,
                    borderRadius: '10px',
                    // Color del text: Blanc si està actiu, si no, el secundari del tema
                    color: isActive ? '#fff' : 'text.secondary',
                    // Fons: Lila si està actiu, si no, transparent
                    bgcolor: isActive ? 'primary.main' : 'transparent',
                    boxShadow: isActive ? `0 4px 10px ${theme.palette.primary.main}4D` : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      bgcolor: isActive ? 'primary.main' : 'primary.main' + '1A',
                      color: isActive ? '#fff' : 'primary.main'
                    }
                  }}
                >
                  {lng.toUpperCase()}
                </Button>
              );
            })}
>>>>>>> d735607 (THEME + LANGUAGE)
          </Stack>

          {isLoggedIn ? (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Button 
                component={RouterLink}
                to="/dashboards/student"
                startIcon={<GraduationCap size={18} />}
                sx={{ 
<<<<<<< HEAD
                  fontSize: '0.9rem', fontWeight: 800, color: 'white', textTransform: 'none',
                  px: 3, py: 1, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.1)', borderColor: '#a855f7' },
                }}
              >
                {t('dashboard.my_progress')} {/* Text traduït */}
=======
                  fontSize: '0.9rem', fontWeight: 800, color: 'text.primary', textTransform: 'none',
                  px: 3, py: 1, bgcolor: 'action.hover', borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'primary.main' + '4D',
                  '&:hover': { bgcolor: 'primary.main' + '1A', borderColor: 'primary.main' },
                }}
              >
                {t('dashboard.my_progress')}
>>>>>>> d735607 (THEME + LANGUAGE)
              </Button>
              
              <IconButton 
                onClick={handleLogout} 
                sx={{ 
                  color: 'text.secondary', 
                  '&:hover': { color: 'error.main', bgcolor: 'error.main' + '1A' } 
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Stack>
          ) : (
            <Button 
              onClick={() => navigate('/dashboards/student')}
              variant="contained"
              sx={{
<<<<<<< HEAD
                background: 'linear-gradient(90deg, #a855f7 0%, #6366f1 100%)',
                fontWeight: 800, textTransform: 'none', px: 3, py: 1, fontSize: '1rem',
                borderRadius: '12px', boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
                '&:hover': { opacity: 0.9, boxShadow: '0 6px 20px rgba(168, 85, 247, 0.6)' }
              }}
            >
              {t('Accedir')}
=======
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #6366f1 100%)`,
                fontWeight: 800, textTransform: 'none', px: 3, py: 1, fontSize: '1rem',
                borderRadius: '12px', boxShadow: `0 4px 15px ${theme.palette.primary.main}66`,
                '&:hover': { opacity: 0.9, boxShadow: `0 6px 20px ${theme.palette.primary.main}99` }
              }}
            >
              {t('auth.access')}
>>>>>>> d735607 (THEME + LANGUAGE)
            </Button>
          )}
        </Box>

        {/* MOBILE TOGGLE */}
        <IconButton sx={{ display: { md: 'none' }, color: 'text.primary' }}>
          <MenuIcon />
        </IconButton>
        
      </Toolbar>
    </AppBar>
  );
}