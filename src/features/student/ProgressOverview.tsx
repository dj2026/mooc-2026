import {Box, Typography, Card, LinearProgress, Stack, useTheme} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {Course} from './types';

interface Props {
  courses: Course[];
  getText: (field: any) => string;
  getCourseProgress: (course: Course, studentId: string) => number;
  studentId: string;
}

export function ProgressOverview({ courses, getText, getCourseProgress, studentId }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card sx={{ p: { xs: 2, md: 3 }, borderRadius: { xs: 2, md: 1 }, bgcolor: 'background.paper', border: '1px solid', borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000', display: { xs: 'none', md: 'block' }, maxWidth: '280px', width: '100%', mt: { xs: 0, md: '-105px !important' } }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 2 }}>{t('dashboard.progress_detail')}</Typography>
      <Stack spacing={2}>
        {courses.map(course => (
          <Box key={course.id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5}}>
              <Typography variant="caption" sx={{ fontWeight: 600 ,fontSize: '0.8rem'}}>{getText(course.title)}</Typography>
              <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main' , fontSize: '1rem'}}>{getCourseProgress(course, studentId)}%</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={getCourseProgress(course, studentId)} 
              sx={{ height: 8, borderRadius: 4, bgcolor: 'action.hover' }} 
            />
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
