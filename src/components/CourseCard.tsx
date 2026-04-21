import { Box, Typography, Divider } from '@mui/material';
import { Card, CardContent, CardTitle, CardDescription } from './ui/Card'; 
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-12px)', 
              boxShadow: '0 24px 48px -12px rgba(168, 85, 247, 0.25)',
              borderColor: 'rgba(168, 85, 247, 0.4)',
              bgcolor: 'rgba(255, 255, 255, 0.03)',
            },
          }}
        >
          {/* Header amb Gradient i Logo */}
          <Box sx={{ p: 2, pb: 0 }}>
            <Box
              sx={{
                position: 'relative',
                height: '180px',
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(79,70,229,0.2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.05)',
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
                    width: logoW,
                    height: logoH,
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3)) brightness(1.1)',
                  }}
                />
              </motion.div>
            </Box>
          </Box>

          <CardContent 
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', // Alineació vertical perfecta
              pt: 3 
            }}
          >
            {/* Secció superior del contingut */}
            <Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
                <Badge mode="standard">{course.level}</Badge>
                <Badge mode="outline">{course.duration}</Badge>
              </Box>
              
              <CardTitle sx={{ 
                mb: 1.5, 
                transition: 'color 0.3s',
                '.MuiCard-root:hover &': { color: '#a855f7' } 
              }}>
                {course.title}
              </CardTitle>
              
              <CardDescription sx={{ mb: 3 }}>
                {course.description}
              </CardDescription>
            </Box>

            {/* Secció inferior (Instructor i Acció) */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Divider sx={{ width: 24, borderColor: 'rgba(168,85,247,0.3)', borderBottomWidth: 2 }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  by {course.instructor}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                pt: 2.5, 
                borderTop: '1px solid rgba(255,255,255,0.06)' 
              }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', color: '#a855f7' }}>
                  ENROLL COURSE
                </Typography>
                
                <Box
                  component={motion.div}
                  animate={{ x: [0, 6, 0] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={20} color="#a855f7" strokeWidth={2.5} />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}