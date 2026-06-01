import {motion} from 'framer-motion';
import {Box, Button, Stack, Typography} from '@mui/material';
import {BookOpen, CheckCircle2, PlayCircle} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {Course, Topic} from './types';

interface Props {
  course: Course;
  activeTab: 'syllabus' | 'activities';
  onTabChange: (tab: 'syllabus' | 'activities') => void;
  dbProgress: Record<string, boolean>;
  getText: (field: any) => string;
  getCourseTopics: (course: Course) => Topic[];
  onNavigate: (path: string) => void;
  theme: any;
}

export function CourseExpandedContent({ course, activeTab, onTabChange, dbProgress, getText, getCourseTopics, onNavigate, theme }: Props) {
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, marginTop: '8px' }} onClick={(e) => e.stopPropagation()}>
      <Box sx={{ bgcolor: 'background.paper', borderRadius: { xs: 1, md: 0}, border: '1px solid', borderColor: 'primary.main' + '4D', maxHeight: '350px', overflowY: 'auto' }}>
        <Box sx={{ p: 0.5, bgcolor: 'action.hover', display: 'flex', borderRadius: '8px', m: 1, mb: 0 }}>
          <Button disableRipple onClick={() => onTabChange('syllabus')} sx={{ flex: 1, borderRadius: '6px', py: 0.75, fontWeight: 800, fontSize: '0.75rem', textTransform: 'none', color: activeTab === 'syllabus' ? '#fff' : 'text.secondary', bgcolor: activeTab === 'syllabus' ? 'primary.main' : 'transparent', '&:hover': { bgcolor: activeTab === 'syllabus' ? 'primary.main' : 'action.hover' } }}>{t('dashboard.syllabus')}</Button>
          <Button disableRipple onClick={() => onTabChange('activities')} sx={{ flex: 1, borderRadius: '6px', py: 0.75, fontWeight: 800, fontSize: '0.75rem', textTransform: 'none', color: activeTab === 'activities' ? '#fff' : 'text.secondary', bgcolor: activeTab === 'activities' ? 'primary.main' : 'transparent', '&:hover': { bgcolor: activeTab === 'activities' ? 'primary.main' : 'action.hover' } }}>{t('dashboard.activities')}</Button>
        </Box>
        <Box sx={{ p: 1.5 }}>
          <Stack spacing={2}>
            {getCourseTopics(course).map(topic => (
              <Box key={getText(topic.title)}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main', mb: 0.5, display: 'block' }}>{getText(topic.title)}</Typography>
                <Stack spacing={0.5}>
                  {topic.lessons?.map(lesson => (
                    <Box key={lesson.id} onClick={() => onNavigate(activeTab === 'syllabus' ? `/courses/${course.id}` : `/courses/${course.id}/${lesson.id}`)} sx={{ p: 1, borderRadius: '8px', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{getText(lesson.title)}</Typography>
                        {activeTab === 'syllabus' ? (dbProgress[`${course.id}_${lesson.id}`] ? (<BookOpen size={16} color={theme.palette.success.main} />) : (<BookOpen size={16} color="#7c3aed" />)) : (dbProgress[`${course.id}_${lesson.id}`] ? (<CheckCircle2 size={16} color={theme.palette.success.main} />) : (<PlayCircle size={16} color={theme.palette.primary.main} />))}
                      </Box>
                      {activeTab === 'syllabus' && lesson.theoryInstructions && (<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block',fontSize: '0.65rem', opacity: 0.8 }}></Typography>)}
                      {activeTab === 'activities' && lesson.challenge && (<Typography variant="caption" sx={{ color: 'secondary.main', display: 'block',fontSize: '0.65rem', opacity: 0.8 }}></Typography>)}
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
}
