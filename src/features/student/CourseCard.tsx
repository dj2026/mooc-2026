import { AnimatePresence, motion } from 'framer-motion';
import { Box, Typography, Card, Stack, IconButton, Tooltip, useTheme } from '@mui/material';
import { ChevronRight, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Course, Student, Topic } from './types';
import { type MouseEvent } from 'react';
import { CourseIcon } from './CourseIcon';
import { CourseExpandedContent } from './CourseExpandedContent';

interface Props {
  course: Course;
  isExpanded: boolean;
  onToggle: () => void;
  selectedStudent: Student;
  getText: (field: any) => string;
  getCoursePoints: (course: Course, studentId: string) => number;
  onResetCourse: (e: MouseEvent, courseId: string) => void;
  activeTab: 'syllabus' | 'activities';
  onTabChange: (tab: 'syllabus' | 'activities') => void;
  dbProgress: Record<string, boolean>;
  getCourseTopics: (course: Course) => Topic[];
  onNavigate: (path: string) => void;
}

export function CourseCard({
  course,
  isExpanded,
  onToggle,
  selectedStudent,
  getText,
  getCoursePoints,
  onResetCourse,
  activeTab,
  onTabChange,
  dbProgress,
  getCourseTopics,
  onNavigate,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative' }}>
      {course.disabled && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10, bgcolor: 'red', color: 'white', px: 1, py: 0.25, borderRadius: '6px', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          PROXIMAMENT
        </Box>
      )}
      
      <Card 
        component={motion.div}
        onClick={onToggle} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          cursor: course.disabled ? 'default' : 'pointer', 
          borderRadius: { xs: 1.5, md: 1 }, 
          bgcolor: 'background.paper', 
          border: '1px solid', 
          borderColor: isExpanded ? 'primary.main' : (theme.palette.mode === 'dark' ? '#fff' : '#000'), 
          transition: '0.2s', 
          minWidth: 0, 
          minHeight: { xs: 110, md: 120 }, 
          position: 'relative', 
          zIndex: isExpanded ? 50 : 0, 
          width: '100%', 
          opacity: course.disabled ? 0.5 : 1, 
          filter: course.disabled ? 'grayscale(0.8)' : 'none',
          overflow: 'hidden' 
        }}
      >
        <motion.div
          initial={false}
          animate={isExpanded ? { x: '560%', skewX: -25 } : { x: '-200%', skewX: -25 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '35%',
            height: '100%',
            background: 'linear-gradient(135deg, transparent, #8400ff46, transparent)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <Stack spacing={{ xs: 1.5, md: 2 }} sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'nowrap' }}>
            <Typography variant="body2" sx={{ fontWeight: 900, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{getText(course.title)}</Typography>
            <Box sx={{ p: 0.5, bgcolor: 'primary.main' + '1A', borderRadius: '4px', flexShrink: 0, mt: { xs: 2, md: 0 }}}><CourseIcon title={course.title} /></Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main', fontSize: '0.9rem' }}>{getCoursePoints(course, selectedStudent.id)} {t('dashboard.points')}</Typography>
            <Stack direction="row" spacing={0.25} sx={{ alignItems: "center", flexShrink: 0 }}>
              <Tooltip title={t('dashboard.reset_course_tooltip')}>
                <IconButton onClick={(e) => onResetCourse(e, course.id)} size="small" sx={{ color: 'red', '&:hover': { color: 'error.main' } }}><RotateCcw size={15} /></IconButton>
              </Tooltip>
              <ChevronRight size={15} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: '0.3s'}} />
            </Stack>
          </Box>
        </Stack>
      </Card>
                    
      <AnimatePresence>
        {isExpanded && (
          <CourseExpandedContent
            course={course}
            activeTab={activeTab}
            onTabChange={onTabChange}
            dbProgress={dbProgress}
            getText={getText}
            getCourseTopics={getCourseTopics}
            onNavigate={onNavigate}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}