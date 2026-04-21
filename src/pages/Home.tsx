import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import Hero from '../components/Hero';
import { Footer } from '../components/Footer';
import { CourseCard } from '../components/CourseCard';
import { courseService } from '../services/courseService';
import { Course } from '../types';
import { Container, Box, Typography, Grid, CircularProgress } from '@mui/material';

export default function Home() {
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
    {icon: '⚡', title: 'Código de Grado Empresarial', desc: 'Domina patrones de diseño escalables y arquitecturas profesionales que utilizan las Big Tech para despliegues reales.' },
    {icon: '💻', title: 'Portfolio de Alto Impacto', desc: 'Construye 20+ aplicaciones fullstack, desde sistemas de pagos con Stripe hasta autenticación robusta para impresionar en cualquier entrevista.' },
    {icon: '🔄', title: 'Stack de Vanguardia 2026', desc: 'No aprendas tecnología obsoleta. Domina Next.js 15, React 19 y Tailwind v4 con las mejores prácticas de la industria.' },
    {icon: '👥', title: 'Networking Global', desc: 'Accede a nuestra comunidad exclusiva en Discord con 50k+ desarrolladores para mentoría, colaboración y oportunidades laborales.' },
    {icon: '📱',  title: 'Aprendizaje Sin Barreras', desc: 'Plataforma 100% optimizada para dispositivos móviles. Estudia donde quieras y cuando quieras con una experiencia fluida.' },
    {icon: '🎓', title: 'Certificación de Maestría', desc: 'Obtén un certificado digital al finalizar tus proyectos para validar tus habilidades técnicas ante reclutadores internacionales.'}
  ];

  return (
    <Box sx={{Height: '100vh', bgcolor: '#0a0a0a', color: 'white', overflowX: 'hidden' }}>
      <Header />
      <Hero />
      
      {/* SECCIÓ 2: CURSOS */}
      <Box 
        component="section" 
        id="courses" 
        sx={{ 
          position: 'relative',
          zIndex: 2, // Per sobre del Hero
          py: { xs: 8, md: 16 },
          bgcolor: '#0a0a0a' // Forcem el fons per evitar transparències estranyes
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
                  background: 'linear-gradient(to right, #ffffff, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  mb: 3 
                }}
              >
                Featured Courses
              </Typography>
              <Typography variant="h5" sx={{ color: 'grey.400', maxWidth: '40rem', mx: 'auto', fontWeight: 400 }}>
                Start your journey with our top-rated courses. Hands-on projects included.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={3}>
            {loading ? (
              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress sx={{ color: '#a855f7' }} />
              </Grid>
            ) : coursesList.length > 0 ? (
              coursesList.map((course: Course, index: number) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={course.id || index}>
                  <CourseCard course={course} index={index} />
                </Grid>
              ))
            ) : (
              <Grid size={12}>
                <Box sx={{ textAlign: 'center', py: 10, border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 8 }}>
                  <Typography variant="body1" sx={{ color: 'grey.500' }}>
                    No hi ha cursos disponibles actualment.
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
          bgcolor: 'rgba(255,255,255,0.02)',
          position: 'relative',
          zIndex: 2 
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 900, mb: 3 }}>
              Why Choose MOOC React?
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Box sx={{
                  p: 4, height: '100%', borderRadius: 6,
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.06)',
                    borderColor: '#a855f7', 
                    transform: 'translateY(-10px)' 
                  }
                }}>
                  <Box sx={{ fontSize: '2.5rem', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{feature.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'grey.500', lineHeight: 1.7 }}>{feature.desc}</Typography>
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