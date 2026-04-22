import { Box, Typography, Divider, useTheme } from '@mui/material';
import { Card, CardContent, CardTitle, CardDescription } from './ui/Card'; 
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  instructor: string;
  logoSize?: number;
  logoWidth?: number;
  logoHeight?: number;
}

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const logoW = course.logoWidth || course.logoSize || 100;
  const logoH = course.logoHeight || course.logoSize || 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ height: '100%' }}
    >
      <Link to={`/courses/${course.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <Card
          sx={{
            height: '100%',
            width: { xs: '85%', md: '100%' }, 
            mx: { xs: 'auto', md: 'unset' },
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            '&:hover': {
              transform: { xs: 'none', md: 'translateY(-12px)' }, 
              boxShadow: '0 24px 48px -12px ' + theme.palette.primary.main + '40',
              borderColor: 'primary.main' + '66',
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            },
          }}
        >

          <Box sx={{ p: { xs: 1.5, md: 2 }, pb: 0 }}>
            <Box
              sx={{
                position: 'relative',
                // Reduïm molt l'alçada del contenidor a mòbil per XS
                height: { xs: '120px', md: '180px' }, 
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, ' + theme.palette.primary.main + '26 0%, ' + theme.palette.secondary?.main + '33 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Box
                  component="img"
                  src={course.image}
                  alt={course.title}
                  sx={{
                    // Reduïm la mida del logo a mòbil XS a un 65% per aprimar el header visualment
                    width: { xs: logoW * 0.65, md: logoW },
                    height: { xs: logoH * 0.65, md: logoH },
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3)) brightness(1.1)',
                  }}
                />
              </motion.div>
            </Box>
          </Box>

          {/* Contingut de la Card Content - Més compacte en mòbil */}
          <CardContent 
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              // Ajustem els paddings interiors perquè respire millor en XS
              pt: { xs: 1.5, md: 4 },
              px: { xs: 1.5, md: 3 },
              pb: { xs: 1.5, md: 3 }
            }}
          >
            {/* Secció superior del contingut */}
            <Box>
              <Box sx={{ display: 'flex', gap: 0.5, mb: { xs: 1, md: 2.5 } }}>
                <Badge mode="standard" sx={{ fontSize: { xs: '0.6rem', md: '0.55rem' } }}>
                  {course.level}
                </Badge>
                <Badge mode="outline" sx={{ fontSize: { xs: '0.6rem', md: '0.65rem' } }}>
                  {course.duration}
                </Badge>
              </Box>
              
              <CardTitle sx={{ 
                mb: 1, 
                fontSize: { xs: '1.05rem', md: '1.4rem' },
                lineHeight: 1.3,
                transition: 'color 0.3s',
                '.MuiCard-root:hover &': { color: 'primary.main' } 
              }}>
                {course.title}
              </CardTitle>
              
              <CardDescription sx={{ 
                mb: { xs: 2, md: 3 },
                // Descripció més petita i compacta a mòbil XS
                fontSize: { xs: '0.8rem', md: '1rem' }
              }}>
                {course.description}
              </CardDescription>
            </Box>

            {/* Secció inferior (Instructor i Acció) - Més compacta a mòbil XS */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 1.5, md: 3 } }}>
                <Divider sx={{ width: 16, borderColor: 'primary.main' + '4D', borderBottomWidth: 2 }} />
                <Typography variant="caption" sx={{ 
                  color: 'text.secondary', 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  // Font de l'instructor més petita en XS
                  fontSize: { xs: '0.55rem', md: '0.7rem' }
                }}>
                  {t('course.by')} {course.instructor}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                pt: { xs: 1.5, md: 2.5 }, 
                borderTop: '1px solid', 
                borderColor: 'divider' 
              }}>
                <Typography sx={{ 
                  // Mida del text d'acció "Enroll" més petita en XS
                  fontSize: { xs: '0.6rem', md: '0.8rem' }, 
                  fontWeight: 900, 
                  letterSpacing: '0.15em', 
                  color: 'primary.main' 
                }}>
                  {t('course.enroll')}
                </Typography>
                
                <Box
                  component={motion.div}
                  animate={{ x: [0, 6, 0] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={18} color={theme.palette.primary.main} strokeWidth={2.5} />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}