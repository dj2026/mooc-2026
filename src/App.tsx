import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { useEffect } from 'react';
import Home from './pages/Home';
import CourseLessons from './pages/courses/CourseLessons';
import LessonPage from './pages/courses/LessonPage';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import { Header } from './components/Header';

const globalRoutes = ['/courses/', '/dashboards/student'];

function App() {
  const theme = useTheme();
  const location = useLocation();
  const isGlobalRoute = globalRoutes.some(route => location.pathname.startsWith(route));

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme, theme.palette.mode]);

  return (
    <Box sx={{bgcolor: 'background.default' }}>
      {isGlobalRoute && (
        <Box sx={{ position: 'relative', zIndex: 1100 }}>
          <Header />
        </Box>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId" element={<CourseLessons />} />
        <Route path="/courses/:courseId/:lessonId" element={<LessonPage />} />
        <Route path="/dashboards/student" element={<StudentDashboard />} />
      </Routes>
    </Box>
  );
}

export default App;