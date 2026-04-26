import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, Stack, Breadcrumbs, Link as MuiLink, CircularProgress, Grid, alpha, useTheme } from '@mui/material';
import { PlayCircle, ChevronRight, BookOpen, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Lesson { id: string; title: string; description: string;}
interface Course { id: string; title: string; description: string; content: Lesson[]; }

export default function CourseLessons() {
  const { courseId } = useParams<{ courseId: string }>();
  const theme = useTheme();
  const [apiData, setApiData] = useState<{ courses: Course[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => { setApiData(json); setLoading(false); })
      .catch((err) => { console.error("Error:", err); setLoading(false); });
  }, []);

  const course = apiData?.courses.find((c) => c.id === courseId);

  if (loading) return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress color="primary" />
    </Box>
  );

  if (!course) return <Typography>Curs no trobat</Typography>;

  return (
    <Box sx={{ minHeight: '90vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header fix o Breadcrumbs a dalt */}
      <Box sx={{ px: 4, pt: 4, pb: 2 }}>
        <Breadcrumbs separator={<ChevronRight size={14} />} sx={{ mb: 2 }}>
          <MuiLink component={RouterLink} to="/" sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '0.8rem' }}>Academy</MuiLink>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 800 }}>{course.title}</Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>{course.title.toUpperCase()}</Typography>
      </Box>

      {/* CONTENIDOR SPA: 2 COLUMNES AMB PIPELINE VERTICAL */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        px: 4,
        gap: 0,
        position: 'relative'
      }}>
        
        {/* SECCIÓ ESQUERRA: TEMARI */}
        <Box sx={{ flex: 1, py: 4, pr: { md: 4 } }}>
          <Stack direction="row" spacing={1.5} sx={{ mb: 4, alignItems: 'center' }}>
            <BookOpen size={20} color="#7c3aed" />
            <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Temari
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {course.content?.map((lesson, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={`topic-${lesson.id}`}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <Card sx={{ 
                    height: '110px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 3,
                    '&:hover': { borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.02) }
                  }}>
                    <CardActionArea component={RouterLink} to={`/courses/${courseId}/${lesson.id}/topic`} sx={{ p: 2, height: '100%' }}>
                      <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: 'text.disabled' }}>{String(index + 1).padStart(2, '0')}</Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: '0.9rem', mt: 0.5, lineHeight: 1.2 }}>{lesson.title}</Typography>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* PIPELINE VERTICAL (Només visible en Desktop) */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          width: '1px', 
          bgcolor: 'divider', 
          my: 4,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Box sx={{ 
            position: 'absolute', 
            p: 1, 
            bgcolor: 'background.default', 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: '50%',
            color: 'text.disabled'
          }}>
            <ChevronRight size={12} />
          </Box>
        </Box>

        {/* SECCIÓ DRETA: LABORATORI */}
        <Box sx={{ flex: 1, py: 4, pl: { md: 4 } }}>
          <Stack direction="row" spacing={1.5} sx={{ mb: 4, alignItems: 'center' }}>
            <Code2 size={20} color="#db2777" />
            <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Laboratori
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {course.content?.map((lesson, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={`lab-${lesson.id}`}>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <Card sx={{ 
                    height: '110px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 3,
                    '&:hover': { borderColor: '#db2777', bgcolor: alpha('#db2777', 0.02) }
                  }}>
                    <CardActionArea component={RouterLink} to={`/courses/${courseId}/${lesson.id}`} sx={{ p: 2, height: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: 'text.disabled' }}>LAB {index + 1}</Typography>
                        <PlayCircle size={14} color="#db2777" />
</Box>
                      <Typography sx={{ fontWeight: 800, fontSize: '0.9rem', mt: 0.5, lineHeight: 1.2 }}>{lesson.title}</Typography>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Box>
    </Box>
  );
}