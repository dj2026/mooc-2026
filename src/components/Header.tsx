import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Rocket, GraduationCap } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AppBar, Toolbar, Box, Typography, Button, IconButton, Stack, useTheme, Divider
} from '@mui/material';
import { authService } from '../services/authService';
import { useTranslation } from 'react-i18next';
import { ThemeToggleButton } from './ThemeToggleButton';

export function Header() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const scrollToDynamic = (desktopPx: number, mobilePx: number) => {
    setMobileOpen(false); 
    const performScroll = () => {
      const isMobile = window.innerWidth < 900;
      const finalPosition = isMobile ? mobilePx : desktopPx;
      window.scrollTo({ top: finalPosition, behavior: 'smooth' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(performScroll, 300);
    } else {
      performScroll();
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const currentStudent = localStorage.getItem('currentStudent');
    setIsLoggedIn(!!token || !!currentStudent);
  };

  useEffect(() => {
    setMounted(true); 
    checkAuth();

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-state-change', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-state-change', checkAuth);
      document.body.style.overflow = 'unset';
    };
  }, [location, mobileOpen]);

  const handleLogout = async () => {
    try { await authService.logout(); } 
    catch (e) { console.warn("Logout error", e); } 
    finally {
      localStorage.removeItem('token');
      localStorage.removeItem('currentStudent');
      setIsLoggedIn(false);
      setMobileOpen(false);
      navigate('/');
    }
  };

  if (!mounted) return null;
  const currentLanguage = i18n.language.split('-')[0];

  const commonButtonStyle = {
    color: 'text.primary',
    fontWeight: 800,
    textTransform: 'none',
    fontSize: '1rem',
    '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          width: '100%', 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)', 
          boxShadow: 'none', 
          borderBottom: `1px solid ${theme.palette.divider}`, 
          zIndex: 1400 
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 8 }, height: '80px', display: 'flex', justifyContent: 'space-between' }}>
          
          {/* LOGO */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <motion.div whileHover={{ scale: 1.05 }} onClick={() => { setMobileOpen(false); navigate('/'); }} style={{ cursor: 'pointer' }}>
              <Rocket size={32} color={theme.palette.primary.main} fill={theme.palette.primary.main} style={{ transform: 'rotate(-45deg)' }} />
            </motion.div>
            <RouterLink to="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none' }}>
              <Stack direction="row" sx={{ alignItems: 'baseline' }}>
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-1.5px' }}>MOOC</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main', ml: 0.5 }}>2026</Typography>
              </Stack>
            </RouterLink>
          </Box>

          {/* DESKTOP NAV (Cursos > Accedir > Language > Theme) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
            <Button onClick={() => scrollToDynamic(1000, 1800)} sx={commonButtonStyle}>
              {t('footer.courses')}
            </Button>

            {isLoggedIn ? (
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Button component={RouterLink} to="/dashboards/student" startIcon={<GraduationCap size={18} />} sx={{ fontWeight: 800, color: 'text.primary', textTransform: 'none', px: 2, bgcolor: 'action.hover', borderRadius: '12px' }}>
                  {t('dashboard.my_progress')}
                </Button>
              </Stack>
            ) : (
              <Button onClick={() => navigate('/dashboards/student')} sx={commonButtonStyle}>{t('auth.access')}</Button>
            )}

            <Stack direction="row" sx={{ bgcolor: 'action.hover', borderRadius: '12px', p: 0.5, gap: 0.5 }}>
              {['ca', 'es', 'en'].map((lng) => (
                <Button key={lng} onClick={() => i18n.changeLanguage(lng)} sx={{ minWidth: '40px', fontSize: '0.75rem', fontWeight: 800, borderRadius: '10px', color: currentLanguage === lng ? '#fff' : 'text.secondary', bgcolor: currentLanguage === lng ? 'primary.main' : 'transparent' }}>
                  {lng.toUpperCase()}
                </Button>
              ))}
            </Stack>

            <ThemeToggleButton />
          </Box>

          {/* MOBILE CONTROLS (Theme + Menu al costat) */}
          <Stack direction="row" spacing={1} sx={{ display: { md: 'none' }, alignItems: 'center' }}>
            <ThemeToggleButton />
            <IconButton sx={{ color: 'text.primary' }} onClick={handleDrawerToggle}>
              {mobileOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* MOBILE MENU OVERLAY (Language > Accedir > Cursos) */}
      <AnimatePresence>
        {mobileOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            sx={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: 'calc(100vh - 80px)',
              bgcolor: 'background.default',
              zIndex: 1300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflowY: 'auto',
              pt: 4,
              pb: 6
            }}
          >
            <Stack spacing={4} sx={{ width: '85%', alignItems: 'center' }}>
              
              {/* 1. Language */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1.5, fontWeight: 700, color: 'text.secondary', letterSpacing: '1px' }}>
                  {t('')?.toUpperCase()}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ bgcolor: 'action.hover', p: 0.5, borderRadius: '12px' }}>
                  {['ca', 'es', 'en'].map((lng) => (
                    <Button 
                      key={lng} size="small" onClick={() => i18n.changeLanguage(lng)} 
                      sx={{ 
                        minWidth: '70px', fontWeight: 800, borderRadius: '10px', 
                        color: currentLanguage === lng ? '#fff' : 'text.secondary', 
                        bgcolor: currentLanguage === lng ? 'primary.main' : 'transparent' 
                      }}
                    >
                      {lng.toUpperCase()}
                    </Button>
                  ))}
                </Stack>
              </Box>

              <Divider sx={{ width: '100%', opacity: 0.1 }} />

              {/* 2. Accedir / Progress */}
              <Stack spacing={2} sx={{ width: '100%' }}>
                {isLoggedIn ? (
                  <>
                    <Button 
                      fullWidth component={RouterLink} to="/dashboards/student" 
                      startIcon={<GraduationCap />} onClick={() => setMobileOpen(false)} 
                      sx={{ fontWeight: 800, borderRadius: '12px', py: 2, color: 'text.primary', bgcolor: 'action.hover', fontSize: '1.1rem' }}
                    >
                      {t('dashboard.my_progress')}
                    </Button>
                    <Button fullWidth color="error" onClick={handleLogout} sx={{ fontWeight: 800, py: 1.5 }}>
                      LOGOUT
                    </Button>
                  </>
                ) : (
                  <Button 
                    fullWidth onClick={() => { navigate('/dashboards/student'); setMobileOpen(false); }} 
                    sx={{ ...commonButtonStyle, py: 2, fontSize: '1.1rem' }}
                  >
                    {t('auth.access').toUpperCase()}
                  </Button>
                )}
              </Stack>

              <Divider sx={{ width: '100%', opacity: 0.1 }} />

              {/* 3. Cursos */}
              <Button 
                fullWidth onClick={() => scrollToDynamic(1000, 700)} 
                sx={{ color: 'text.primary', fontWeight: 900, py: 2, fontSize: '1.4rem' }}
              >
                {t('footer.courses').toUpperCase()}
              </Button>

            </Stack>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}