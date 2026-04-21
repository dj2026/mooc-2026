import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { Rocket, GraduationCap } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Stack } from '@mui/material';
import { authService } from '../services/authService';
import { useTranslation } from 'react-i18next'; // Importem el hook de traducció

export function Header() {
  const { t, i18n } = useTranslation(); // Inicialitzem traduccions
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

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        width: '100vw', left: 0, right: 0, 
        bgcolor: 'rgba(18, 18, 18, 0.8)', 
        backdropFilter: 'blur(20px)', 
        boxShadow: 'none', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
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
              color="#fff" 
              fill="#8400ff"
              style={{ transform: 'rotate(-45deg)' }} 
            />
          </motion.div>
          
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <Stack direction="row" sx={{ alignItems: 'baseline' }}>
              <Typography variant="h5" sx={{ fontWeight: 900, color: 'white', letterSpacing: '-1.5px' }}>
                MOOC
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#a855f7', ml: 1, letterSpacing: '-1px' }}>
                2026
              </Typography>
            </Stack>
          </RouterLink>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          
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
          </Stack>

          {isLoggedIn ? (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Button 
                component={RouterLink}
                to="/dashboards/student"
                startIcon={<GraduationCap size={18} />}
                sx={{ 
                  fontSize: '0.9rem', fontWeight: 800, color: 'white', textTransform: 'none',
                  px: 3, py: 1, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.1)', borderColor: '#a855f7' },
                }}
              >
                {t('dashboard.my_progress')} {/* Text traduït */}
              </Button>
              
              <IconButton 
                onClick={handleLogout} 
                sx={{ 
                  color: 'rgba(255,255,255,0.4)', 
                  '&:hover': { color: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.1)' } 
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
                background: 'linear-gradient(90deg, #a855f7 0%, #6366f1 100%)',
                fontWeight: 800, textTransform: 'none', px: 3, py: 1, fontSize: '1rem',
                borderRadius: '12px', boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
                '&:hover': { opacity: 0.9, boxShadow: '0 6px 20px rgba(168, 85, 247, 0.6)' }
              }}
            >
              {t('Accedir')}
            </Button>
          )}
        </Box>

        {/* MOBILE TOGGLE */}
        <IconButton sx={{ display: { md: 'none' }, color: 'white' }}>
          <MenuIcon />
        </IconButton>
        
      </Toolbar>
    </AppBar>
  );
}