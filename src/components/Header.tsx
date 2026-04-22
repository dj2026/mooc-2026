import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { Rocket, GraduationCap } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Stack, useTheme } from '@mui/material';
import { authService } from '../services/authService';
import { useTranslation } from 'react-i18next';
import { ThemeToggleButton } from './ThemeToggleButton';

export function Header() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Aquesta funció és el "cervell" que decideix si som loguejats o no
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const currentStudent = localStorage.getItem('currentStudent');
    // Si existeix el token o les dades de l'estudiant, posem isLoggedIn a true
    setIsLoggedIn(!!token || !!currentStudent);
  };

  useEffect(() => {
    setMounted(true); 
    checkAuth(); // Comprovem en carregar

    // ESCOLTADORS D'EVENTS:
    // 1. Escolta si el localStorage canvia des d'una altra pestanya
    window.addEventListener('storage', checkAuth);
    // 2. Escolta el nostre event personalitzat que llançarem des del Login
    window.addEventListener('auth-state-change', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-state-change', checkAuth);
    };
  }, [location]); // També re-comprova quan l'usuari navega entre pàgines

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Error durant el logout:", error);
    } finally {
      // Netegem el magatzem de dades
      localStorage.removeItem('token');
      localStorage.removeItem('currentStudent');
      
      // Actualitzem l'estat per forçar el canvi de botó a la vista
      setIsLoggedIn(false);
      
      // Enviem l'usuari a la pàgina principal
      navigate('/');
    }
  };

  if (!mounted) return null;

  const currentLanguage = i18n.language.split('-')[0];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        width: '100vw', left: 0, right: 0, 
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)', 
        boxShadow: 'none', 
        borderBottom: `1px solid ${theme.palette.divider}`, 
        zIndex: 1100, 
        height: '80px', 
        justifyContent: 'center'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 8 }, display: 'flex', justifyContent: 'space-between' }}>
        
        {/* SECCIÓ LOGO */}
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
              <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-1.5px' }}>
                MOOC
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main', ml: 1, letterSpacing: '-1px' }}>
                2026
              </Typography>
            </Stack>
          </RouterLink>
        </Box>

        {/* ACCIONS DRETA */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          
          <ThemeToggleButton />

          {/* SELECTOR D'IDIOMA */}
          <Stack direction="row" sx={{ bgcolor: 'action.hover', borderRadius: '12px', p: 0.5, gap: 0.5 }}>
            {['ca', 'es', 'en'].map((lng) => {
              const isActive = currentLanguage === lng;
              return (
                <Button 
                  key={lng} 
                  onClick={() => i18n.changeLanguage(lng)}
                  sx={{ 
                    minWidth: '40px', px: 1.5, fontSize: '0.75rem', fontWeight: 800,
                    borderRadius: '10px',
                    color: isActive ? '#fff' : 'text.secondary',
                    bgcolor: isActive ? 'primary.main' : 'transparent',
                    boxShadow: isActive ? `0 4px 10px ${theme.palette.primary.main}4D` : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      bgcolor: isActive ? 'primary.main' : 'primary.main' + '1A',
                    }
                  }}
                >
                  {lng.toUpperCase()}
                </Button>
              );
            })}
          </Stack>

          {/* BOTONS CONDICIONALS */}
          {isLoggedIn ? (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Button 
                component={RouterLink}
                to="/dashboards/student"
                startIcon={<GraduationCap size={18} />}
                sx={{ 
                  fontSize: '0.9rem', fontWeight: 800, color: 'text.primary', textTransform: 'none',
                  px: 3, py: 1, bgcolor: 'action.hover', borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'primary.main' + '4D',
                  '&:hover': { bgcolor: 'primary.main' + '1A', borderColor: 'primary.main' },
                }}
              >
                {t('dashboard.my_progress')}
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
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #6366f1 100%)`,
                fontWeight: 800, textTransform: 'none', px: 3, py: 1, fontSize: '1rem',
                borderRadius: '12px', boxShadow: `0 4px 15px ${theme.palette.primary.main}66`,
                '&:hover': { opacity: 0.9, boxShadow: `0 6px 20px ${theme.palette.primary.main}99` }
              }}
            >
              {t('auth.access')}
            </Button>
          )}
        </Box>

        <IconButton sx={{ display: { md: 'none' }, color: 'text.primary' }}>
          <MenuIcon />
        </IconButton>
        
      </Toolbar>
    </AppBar>
  );
}