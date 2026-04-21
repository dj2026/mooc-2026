import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import { Box, Container, Typography } from '@mui/material';

// --- Props del Typewriter ---
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
      color: 'white',
      borderRight: '5px solid #8400ff',
      paddingRight: '4px',
      display: 'inline-block',
      lineHeight: 1,
      animation: 'blink 1s step-end infinite',
      '@keyframes blink': {
        '0%, 100%': { borderColor: '#8400ff' },
        '50%': { borderColor: 'transparent' },
      }
    }}>
      {words[index].substring(0, subIndex)}
    </Box>
  );
};

export default function Hero() {
  const [apiStats, setApiStats] = useState<{students: number, courses: number}>({ 
    students: 0, 
    courses: 0 
  });

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
    { label: 'Students', value: apiStats.students, color: '#a855f7', delay: 0 },
    { label: 'Courses', value: apiStats.courses, color: '#10b981', delay: 0.2 },
    { label: 'Support', value: '24/7', color: '#f59e0b', delay: 0.4 },
  ];

  const techStack: string[] = ['React', 'Python', 'SpringBoot', 'Machine Learning'];

  return (
    <Box component="section" sx={{ 
      position: 'relative', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 1, 
      overflow: 'hidden', 
      bgcolor: '#050505' 
    }}>
      
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
        py: 20 
      }}>
        <Box component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          
          <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' }, 
              fontWeight: 900, 
              color: 'white',
              mt: -5,
              mb: 2,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}>
              Mooc <Typewriter words={techStack} />
            </Typography>
            
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '1.8rem', md: '3rem', lg: '3rem' }, 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #10b981 20%, #a855f7 60%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              mb: 4
            }}>
              Build Real-World Apps
            </Typography>
          </Box>

          <Typography component={motion.p} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} sx={{ 
            fontSize: { xs: '1.1rem', md: '1.4rem' }, 
            color: 'rgba(255,255,255,0.6)', 
            mb: 8, 
            maxWidth: '800px', 
            mx: 'auto',
            fontWeight: 500 
          }}>
            Uneix-te als alumnes que ja estan dominant les tecnologies de 2026 amb projectes reals.
          </Typography>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' }, 
            gap: { xs: 4, md: 8 }, 
            width: '100%', 
            mt: 4 
          }}>
            {stats.map((stat, i) => (
              <Box key={i} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + stat.delay }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ 
                  fontSize: { xs: '2.2rem', md: '3.2rem' }, 
                  fontWeight: 900, 
                  color: stat.color, 
                  mb: 1, 
                  textShadow: `0 0 30px ${stat.color}33`,
                  fontFamily: 'monospace'
                }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={stat.value}
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.span>
                  </AnimatePresence>
                </Typography>
                <Typography variant="caption" sx={{ 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.5em', 
                  fontWeight: 800, 
                  color: 'white' 
                }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* INDICADOR DE SCROLL */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 80, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2, 
        zIndex: 11 
      }}>
        <Typography sx={{ 
          fontSize: '0.80rem', 
          fontWeight: 900, 
          letterSpacing: '1em', 
          color: 'white', 
          textTransform: 'uppercase' 
        }}>
          Scroll Down
        </Typography>
        <Box sx={{ 
          width: '2px', 
          height: '60px', 
          background: 'linear-gradient(to bottom, #a855f7, transparent)', 
          position: 'relative' 
        }}>
          <Box 
            component={motion.div} 
            animate={{ y: [0, 60], opacity: [0, 1, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
            sx={{ 
              width: '100%', 
              height: '20px', 
              bgcolor: '#fff', 
              boxShadow: '0 0 10px #fff' 
            }} 
          />
        </Box>
      </Box>
    </Box>
  );
}