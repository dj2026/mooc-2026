import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container, Box, Typography, Grid, CircularProgress, useTheme } from '@mui/material';
import { Header } from '../components/Header';
import Hero from '../components/Hero';
import { Footer } from '../components/Footer';
import { CourseCard } from '../components/CourseCard';
import { courseService } from '../services/courseService';
import { Course } from '../types';

export default function Home() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        setCoursesList(data);
      } catch (error) {
        console.error("Error carregant cursos des de l'API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const features = [
    {icon: '⚡', title: t('home.features.code_title'), desc: t('home.features.code_desc') },
    {icon: '💻', title: t('home.features.portfolio_title'), desc: t('home.features.portfolio_desc') },
    {icon: '🔄', title: t('home.features.stack_title'), desc: t('home.features.stack_desc') },
    {icon: '👥', title: t('home.features.networking_title'), desc: t('home.features.networking_desc') },
    {icon: '📱', title: t('home.features.mobile_title'), desc: t('home.features.mobile_desc') },
    {icon: '🎓', title: t('home.features.cert_title'), desc: t('home.features.cert_desc')}
  ];

  return (
    <Box sx={{Height: '100vh', bgcolor: 'background.default', color: 'text.primary', overflowX: 'hidden' }}>
      <Header />
      <Hero />
      
      {/* SECCIÓ 2: CURSOS */}
      <Box 
        component="section" 
        id="courses" 
        sx={{ 
          position: 'relative',
          zIndex: 2,
          py: { xs: 8, md: 16 },
          bgcolor: 'background.default'
        }}
      >
        <Container maxWidth="lg">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 10 }}>
              <Typography
                variant="h2"
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' }, 
                  fontWeight: 900, 
                  background: 'linear-gradient(to right, ' + theme.palette.text.primary + ', ' + theme.palette.primary.main + ')',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  mb: 3 
                }}
              >
                {t('home.featured_title')}
              </Typography>
              <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: '40rem', mx: 'auto', fontWeight: 400 }}>
                {t('home.featured_subtitle')}
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={3}>
            {loading ? (
              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress sx={{ color: 'primary.main' }} />
              </Grid>
            ) : coursesList.length > 0 ? (
              coursesList.map((course: Course, index: number) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={course.id || index}>
                  <CourseCard course={course} index={index} />
                </Grid>
              ))
            ) : (
              <Grid size={12}>
                <Box sx={{ textAlign: 'center', py: 10, border: '1px dashed', borderColor: 'divider', borderRadius: 8 }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {t('home.no_courses')}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* SECCIÓ 3: FEATURES */}
      <Box 
        component="section" 
        id="features" 
        sx={{ 
          py: 16, 
          bgcolor: 'action.hover',
          position: 'relative',
          zIndex: 2 
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 900, mb: 3 }}>
              {t('home.why_choose_title')}
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Box sx={{
                  p: 4, height: '100%', borderRadius: 6,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    bgcolor: 'action.hover',
                    borderColor: 'primary.main', 
                    transform: 'translateY(-10px)' 
                  }
                }}>
                  <Box sx={{ fontSize: '2.5rem', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{feature.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{feature.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}