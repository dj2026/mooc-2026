import { useState, useEffect } from 'react'; // Afegim Hooks per a la dada híbrida
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Card, CardActionArea, Stack, Breadcrumbs, Link as MuiLink, Grid, CircularProgress } from '@mui/material';
import { PlayCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';


interface Lesson { id: string; title: string; description: string; duration?: string; }
interface Course { id: string; title: string; description: string; content: Lesson[]; }

export default function CourseLessons() {
  const { courseId } = useParams<{ courseId: string }>();
  
  const [apiData, setApiData] = useState<{ courses: Course[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => {
        setApiData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error carregant dades híbrides:", err);
        setLoading(false);
      });
  }, []);

  const coursesData = apiData?.courses || [];
  const course = coursesData.find((c) => c.id === courseId);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'text.primary' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Curs no trobat</Typography>
        <MuiLink component={RouterLink} to="/" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
          <ArrowLeft size={18} /> Tornar a l'acadèmia
        </MuiLink>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }}}>
        <Breadcrumbs separator={<ChevronRight size={14} style={{ color: 'text.secondary' }} />} sx={{ mb: 6 }}>
          <MuiLink component={RouterLink} to="/" sx={{ color: 'text.primary', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700 }}>Academy</MuiLink>
          <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: 'primary.main' }}>{course.title}</Typography>
        </Breadcrumbs>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.8rem', md: '4.2rem' }, fontWeight: 900, color: 'text.primary', mb: 2 }}>{course.title}</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: '800px' }}>{course.description}</Typography>
        </Box>

        <Grid container spacing={4} sx={{ width: '100%', margin: 0 }}>
          {course.content?.map((lesson, index) => (
            <Grid 
              key={lesson?.id ? `lesson-${lesson.id}` : `idx-${index}`} 
              size={{ xs: 12, sm: 6, md: 4 }} // En MUI v6 s'usa 'size' en lloc de xs, sm, md directament
              sx={{ 
                display: 'flex', 
                padding: '16px',
                alignItems: 'stretch' 
              }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.1 }} 
                style={{ width: '100%', display: 'flex' }}
              >
                <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 5, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', borderColor: 'primary.main' }}}>
                  <CardActionArea component={RouterLink} to={`/courses/${courseId}/${lesson.id}`} sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                    <Box sx={{ width: '100%'}}>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3, width: '100%' }}>
                        <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center' ,border: '1px solid', borderColor: 'divider',}}>
                          <Typography sx={{ fontWeight: 900, color: 'text.primary' }}>{index + 1}</Typography>
                        </Box>
                      </Stack>
                      <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 800, mb: 1.5 }}>{lesson.title}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{lesson.description?.substring(0, 100)}...</Typography>
                    </Box>
                    <Stack direction="row" spacing={1.5} sx={{ color: 'text.primary', alignItems: 'center', mt: 3 }}>
                      <PlayCircle size={22} /><Typography variant="button" sx={{ fontWeight: 800, fontSize: '0.7rem' }}>COMENÇAR LLIÇÓ</Typography>
                    </Stack>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}