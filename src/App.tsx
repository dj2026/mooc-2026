import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import Home from './pages/Home';
import CourseLessons from './pages/courses/CourseLessons';
import LessonPage from './pages/courses/LessonPage';
import StudentDashboard from './pages/dashboards/StudentDashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId" element={<CourseLessons />} />
        <Route path="/courses/:courseId/:lessonId" element={<LessonPage />} />
        <Route path="/dashboards/student" element={<StudentDashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;