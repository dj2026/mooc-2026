import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

// --- Component Typewriter ---
interface TypewriterProps {
  words: string[];
}

const Typewriter = ({ words }: TypewriterProps) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  const WAIT_TIME = 4000;   
  const TYPING_SPEED = 150;  
  const DELETING_SPEED = 60; 

  useEffect(() => {
    if (subIndex === words[index].length && !reverse) {
      const timeout = setTimeout(() => setReverse(true), WAIT_TIME);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <Box component="span" sx={{ 
      color: 'text.primary',
      borderRight: { xs: '3px solid', md: '5px solid' },
      borderColor: 'primary.main',
      paddingRight: '4px',
      display: 'inline-block',
      lineHeight: 1,
      animation: 'blink 1s step-end infinite',
      '@keyframes blink': {
        '0%, 100%': { borderColor: 'primary.main' },
        '50%': { borderColor: 'transparent' },
      }
    }}>
      {words[index].substring(0, subIndex)}
    </Box>
  );
};

export default function Hero() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [apiStats, setApiStats] = useState<{students: number, courses: number}>({ students: 0, courses: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/data.json?t=${new Date().getTime()}`);
        const data = await res.json();
        setApiStats({
          students: data.students?.length || 0,
          courses: data.courses?.length || 0,
        });
      } catch (err) {
        console.error("Error en el polling de stats:", err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 5000); 
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: t('hero.stats.students'), value: apiStats.students, delay: 0 },
    { label: t('hero.stats.courses'), value: apiStats.courses, delay: 0.2 },
    { label: t('hero.stats.support'), value: '24/7', delay: 0.4 },
  ];

  const techStack: string[] = [
    'React', 
    'Python', 
    'SpringBoot', 
    isMobile ? 'ML' : 'Machine Learning'
  ];

  return (
    <Box component="section" sx={{ 
      position: 'relative', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 1, 
      overflow: 'hidden', 
      bgcolor: 'background.default',
      px: 2 
    }}>
      
      {/* FONS DE PARTÍCULES */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: -1 }}>
        <ParticlesBackground />
      </Box>

      <Container maxWidth="lg" sx={{ 
        position: 'relative', 
        zIndex: 10, 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        py: { xs: 8, md: 15 } 
      }}>
        <Box component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          
          {/* TÍTOL PRINCIPAL (MOOC + TYPEWRITER) */}
          <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '1.8rem', sm: '3rem', md: '4rem' },
              fontWeight: 900, 
              color: 'text.primary',
              mt: { xs: -3, md: -5 },
              display: 'flex',
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
              <Box sx={{ flex: 1, textAlign: 'center', pr: { xs: 0.5, sm: 1.5 } }}>
                Mooc
              </Box>
              <Box sx={{ flex: 1, textAlign: 'center', pl: { xs: 0.5, sm: 1.5 }, display: 'flex' }}>
                <Typewriter words={techStack} />
              </Box>
            </Typography>
            
            {/* SUBTÍTOL AMB GRADIENT */}
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '1.3rem', sm: '2rem', md: '3rem' }, 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #10b981 20%, #a855f7 60%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              mt:{xs: 2, md: 5},
              mb:{xs: 2, md: 5},
              lineHeight: 1.2
            }}>
              {t('hero.build_apps')}
            </Typography>
          </Box>

          {/* DESCRIPCIÓ */}
          <Typography component={motion.p} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} sx={{ 
            fontSize: { xs: '1rem', md: '1.3rem' }, 
            color: 'text.secondary', 
            mb: { xs: 6, md: 10 }, 

            maxWidth: '750px', 
            mx: 'auto',
            px: { xs: 1, md: 0 },
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            {t('hero.subtitle')}
          </Typography>

          {/* GRID D'ESTADÍSTIQUES */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }, 
            gap: { xs: 2, md: 5 }, 
            width: '100%', 
            maxWidth: '1100px',
            mx: 'auto',
            mt: -3,
            '& > div:last-child': {
              gridColumn: { xs: '3 / span 2', sm: 'auto' }
            }
          }}>
            {stats.map((stat, i) => {
              const statColors = [theme.palette.primary.main, '#10b981', '#f59e0b'];
              const statColor = statColors[i];
              
              return (
                <Box 
                  key={i} 
                  component={motion.div} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.8 + stat.delay }} 
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <Typography sx={{ 
                    fontSize: { xs: '2rem', md: '3.5rem' }, 
                    fontWeight: 900, 
                    color: statColor, 
                    mb: 0.5, 
                    fontFamily: 'monospace',
                    lineHeight: 1
                  }}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={stat.value}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {stat.value}
                      </motion.span>
                    </AnimatePresence>
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    textTransform: 'uppercase', 
                    letterSpacing: { xs: '0.2em', md: '0.4em' }, 
                    fontWeight: 800, 
                    color: 'text.secondary',
                    fontSize: { xs: '0.6rem', md: '0.75rem' },
                  }}>
                    {stat.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
        {/* INDICADOR DE SCROLL - RATOLÍ MINIMALISTA */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: { xs: 90, md: 100 }, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 2, 
          zIndex: 11,
          width: '100%',
          pointerEvents: 'none'
        }}>
          <Typography sx={{ 
            fontSize: { xs: '0.55rem', md: '0.7rem' }, 
            fontWeight: 900, 
            letterSpacing: '0.5em', 
            color: 'text.primary', 
            textTransform: 'uppercase',
            opacity: 0.7
          }}>
            {t('hero.scroll_down')}
          </Typography>

          {/* Cos del Ratolí */}
          <Box sx={{ 
            width: { xs: '20px', md: '25px' }, 
            height: { xs: '35px', md: '40px' }, 
            border: '2px solid',
            borderColor: 'text.primary', 
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            opacity: 0.6
          }}>
            {/* La "boleta" del ratolí */}
            <Box 
              component={motion.div}
              animate={{ 
                y: [4, 15, 4], 
                opacity: [1, 0.4, 1] 
              }}
              transition={{ 
                duration: 1.8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              sx={{ 
                width: '4px', 
                height: '8px', 
                // El color primari sol funcionar bé en ambdós temes
                bgcolor: 'primary.main', 
                borderRadius: '2px',
                mt: '6px',
                boxShadow: (theme) => `0 0 8px ${theme.palette.primary.main}`
              }} 
            />
          </Box>
        </Box>
        </Box>
  );
}