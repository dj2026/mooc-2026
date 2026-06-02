import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import CourseLessons from './pages/courses/CourseLessons';
import LessonPage from './pages/courses/LessonPage';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import { MainLayout } from './layouts/MainLayout';

function App() {
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