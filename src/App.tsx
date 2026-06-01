import { Routes, Route } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { useEffect } from 'react';
import Home from './pages/Home';
import CourseLessons from './pages/courses/CourseLessons';
import LessonPage from './pages/courses/LessonPage';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import { MainLayout } from './layouts/MainLayout';

function App() {
  const theme = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme, theme.palette.mode]);

  return (
    <Box sx={{bgcolor: 'background.default' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route path="/courses/:courseId" element={<CourseLessons />} />
          <Route path="/courses/:courseId/:lessonId" element={<LessonPage />} />
          <Route path="/dashboards/student" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;