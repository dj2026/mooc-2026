import {useState, useEffect, useMemo, useCallback, type FormEvent, type MouseEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {Loader2} from 'lucide-react';
import {Box, Container, Typography, Stack, Alert, useTheme} from '@mui/material';
import Grid from '@mui/material/Grid';
import {api} from '../../services/api';
import {useTranslation} from 'react-i18next';
import {useNotifications} from '../../contexts/NotificationContext';
import {Login} from '../../features/student/Login';
import {Student, Lesson, Topic, Course} from '../../features/student/types';
import {StudentProfileCard} from '../../features/student/StudentProfileCard';
import {ProgressOverview} from '../../features/student/ProgressOverview';
import {CourseCard} from '../../features/student/CourseCard';
import {RankingCard} from '../../features/student/RankingCard';
import {ScrollIndicator} from '../../features/student/ScrollIndicator';
import { courses as localCourses } from '../../data/courses';
import { students as baseStudents } from '../../data/students';
import { exercises as localExercises } from '../../data/exercises';

export default function StudentDashboard() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [dbProgress, setDbProgress] = useState<Record<string, boolean>>({});
  const [errorId, setErrorId] = useState<string | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'activities'>('syllabus');
  const [rankingTab, setRankingTab] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPin, setNewPin] = useState("");
  const [newRole, setNewRole] = useState<'student' | 'teacher'>('student');

  const lang = (i18n.language?.split('-')[0]) as 'ca' | 'es' | 'en';
  const getText = (field: any): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field['ca'] || '';
  };

  const getCourseTopics = (course: Course): Topic[] => {
    if (course.topics && course.topics.length > 0) return course.topics;
    if (course.content && course.content.length > 0) return [{ title: '', lessons: course.content as Lesson[] }];
    return [];
  };
  const fetchProgress = useCallback(async (studentId: string) => {
    try {
      setActionLoading(true);
      const progressMap = await api.getStudentProgress(studentId);
      setDbProgress(progressMap);
      localStorage.setItem('mooc_global_progress', JSON.stringify(progressMap));
    } catch (err) {
      const local = JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');
      setDbProgress(local);
    } finally { setActionLoading(false); }
  }, []);

  useEffect(() => {
    let mounted = true;
    const initData = async (isInitial = false) => {
      try {if (isInitial) setLoading(true);
        if (!mounted) return;
        setAllCourses(localCourses as any[]);
        const localStudents = JSON.parse(localStorage.getItem('mooc_local_students') || '[]');
        const deletedIds = JSON.parse(localStorage.getItem('mooc_deleted_ids') || '[]');
        const merged = [...baseStudents, ...localStudents].filter(s => !deletedIds.includes(s.id)); setStudents(merged);
        const saved = localStorage.getItem('currentStudent');
        if (saved) {const parsed = JSON.parse(saved); setSelectedStudent(parsed); await fetchProgress(parsed.id);}} catch (err) { setGlobalError('Error loading data'); } finally { if (isInitial) setLoading(false); }
    };
    initData(true);
    const onVisible = () => { if (document.visibilityState === 'visible') initData(); };
    document.addEventListener('visibilitychange', onVisible);
    document.addEventListener('lessonProgressUpdated', () => {
      const saved = localStorage.getItem('currentStudent');
      if (saved) fetchProgress(JSON.parse(saved).id);
    });
    return () => { mounted = false; document.removeEventListener('visibilitychange', onVisible); };
  }, [fetchProgress]);

  const handleCreateStudent = (e: FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPin) return;
    const newStudent = { id: `local-${Date.now()}`, name: newName, email: newEmail, code: newPin, role: newRole };
    const updatedLocal = [...JSON.parse(localStorage.getItem('mooc_local_students') || '[]'), newStudent];
    localStorage.setItem('mooc_local_students', JSON.stringify(updatedLocal));
    setStudents(prev => [...prev, newStudent]);
    setNewName(""); setNewEmail(""); setNewPin(""); setNewRole("student");
    setShowCreateForm(false);
    addNotification(t('notifications.account_created', { name: newName, role: newRole }), 'success');
    window.dispatchEvent(new Event('studentsUpdated'));
  };

  const handleDeleteStudent = (id: string, pin: string): boolean => {
    const target = students.find(s => s.id === id);
    if (!target || target.code !== pin) return false;
    const deletedIds = JSON.parse(localStorage.getItem('mooc_deleted_ids') || '[]');
    localStorage.setItem('mooc_deleted_ids', JSON.stringify([...deletedIds, id]));
    const localOnly = JSON.parse(localStorage.getItem('mooc_local_students') || '[]');
    localStorage.setItem('mooc_local_students', JSON.stringify(localOnly.filter((s: any) => s.id !== id)));
    setStudents(prev => prev.filter(s => s.id !== id));
    addNotification(t('notifications.user_deleted', { name: target.name, role: target.role || 'student' }), 'info');
    window.dispatchEvent(new Event('studentsUpdated'));
    if (selectedStudent?.id === id) {handleLogoutAction();}
    return true;
  };

  const handleLogin = (student: Student, pin: string) => {
    if (student.code !== pin) {
      setErrorId(student.id);
      addNotification(t('notifications.incorrect_pin'), 'error');
      setTimeout(() => setErrorId(null), 500);
      return; 
    }

    if (student.role === 'teacher') {
      alert("⚠️ Mode Professor: In process...");
    } else {
      setSelectedStudent(student);
      localStorage.setItem('currentStudent', JSON.stringify(student));
      addNotification(t('notifications.welcome', { name: student.name }), 'success');
      if (typeof fetchProgress === 'function') {
        fetchProgress(student.id);
      }
    }
  };

  const handleLogoutAction = () => {
    localStorage.removeItem('currentStudent');
    localStorage.removeItem('mooc_global_progress');
    setSelectedStudent(null);
    setDbProgress({});
    addNotification(t('notifications.session_closed'), 'info');
    window.dispatchEvent(new Event('auth-state-change'));
  };

  const handleResetCourse = async (e: MouseEvent, courseId: string) => {
    e.stopPropagation();
    if (!selectedStudent || !window.confirm(t('dashboard.reset_course_confirm'))) return;
    try {
      setActionLoading(true);
      await api.resetCourse(selectedStudent.id, courseId);
      const local = JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');
      Object.keys(local).forEach(key => { if (key.startsWith(`${courseId}_`)) delete local[key]; });
      localStorage.setItem('mooc_global_progress', JSON.stringify(local));
      await fetchProgress(selectedStudent.id);
      addNotification(t('notifications.course_reset'), 'success');
    } catch (err) {
      addNotification(t('notifications.course_reset_error'), 'error');
      setGlobalError("Error reset.");
    } finally { setActionLoading(false); }
  };

  const getCourseProgress = useCallback((course: Course, studentId: string): number => {
    const topics = getCourseTopics(course);
    const totalLessons = topics.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) || 0;
    if (totalLessons === 0) return 0;
    const student = students.find(s => s.id === studentId);
    if (selectedStudent?.id === studentId) {
      const done = topics.reduce((acc, topic) => acc + (topic.lessons?.filter(l => dbProgress[`${course.id}_${l.id}`]).length || 0), 0) || 0;
      return Math.round((done / totalLessons) * 100);
    }
    return student?.average || 0;
  }, [dbProgress, selectedStudent, students, getCourseTopics]);

  const getCoursePoints = useCallback((course: Course, _studentId: string): number => {
    const topics = getCourseTopics(course);
    const done = topics.reduce((acc, topic) => acc + (topic.lessons?.filter(l => {
      const hasExercise = localExercises.some(e => e.id === l.id && e.courseId === course.id);
      return hasExercise && dbProgress[`${course.id}_${l.id}`];
    }).length || 0), 0) || 0;
    return done * 10;
  }, [dbProgress, getCourseTopics]);

  const getTotalPoints = useCallback((_studentId: string): number => {
    return allCourses.reduce((acc, course) => acc + getCoursePoints(course, _studentId), 0);
  }, [allCourses, getCoursePoints]);

  const rankedStudentsByCourse = useMemo(() => {
    const currentCourse = allCourses[rankingTab];
    if (!currentCourse) return [];
    return [...students].sort((a, b) => getCourseProgress(currentCourse, b.id) - getCourseProgress(currentCourse, a.id));
  }, [students, allCourses, rankingTab, getCourseProgress]);

  if (loading) return <Box sx={{ display: 'flex', bgcolor: 'background.default', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '90vh' }}><Loader2 className="animate-spin" color={theme.palette.primary.main} size={48} /></Box>;

  return (
       <Box sx={{ bgcolor: 'background.default', color: 'text.primary', width: '100%', maxWidth: '100vw', minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
       <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 6 }, px: { xs: 3, sm: 1.5, md: 8, lg: 8 }, display: 'flex', flexDirection: 'column' }}>
         <Box sx={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', overflow: { xs: 'visible', md: 'hidden' } }}>
          {globalError && <Alert severity="error" sx={{ mb: 3, borderRadius: '1rem' }}>{globalError}</Alert>}
          
          {!selectedStudent ? (
                <Login
                  students={students}
                  newRole={newRole}
                  onRoleChange={(role) => setNewRole(role)}
                  showCreateForm={showCreateForm}
                  onShowCreateForm={(show) => setShowCreateForm(show)}
                  newName={newName}
                  onNewNameChange={(name) => setNewName(name)}
                  newEmail={newEmail}
                  onNewEmailChange={(email) => setNewEmail(email)}
                  newPin={newPin}
                  onNewPinChange={(pin) => setNewPin(pin)}
                  onCreateStudent={handleCreateStudent}
                  onLogin={handleLogin}
                  onDeleteStudent={handleDeleteStudent}
                  errorId={errorId}
                />
            ) : (
                <Grid container spacing={{ xs: 2, md: 6 }}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={2} sx={{ alignItems: 'center' }}>
                      <StudentProfileCard student={selectedStudent} totalPoints={getTotalPoints(selectedStudent.id)} actionLoading={actionLoading} onLogout={handleLogoutAction} />
                      <Box sx={{ height: { md: '250px' }, width: '100%', display: { xs: 'none', md: 'block' } }} />
                      <ProgressOverview courses={allCourses} getText={getText} getCourseProgress={getCourseProgress} studentId={selectedStudent.id} />
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 9}} sx={{ mt: { xs: '20px', md: '50px' } }}>
                    {expandedCourse && (
                        <Box
                          onClick={() => setExpandedCourse(null)}
                          sx={{ position: 'fixed', inset: 0, zIndex: 40, backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)' }}
                        />
                      )}
                    
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: { xs: 2, md: 3 } }}>{t('dashboard.my_courses')}</Typography>
                    <Grid container spacing={{ xs: 2, md: 2 }}>
                      {allCourses.map(course => (
                        <Grid key={course.id} size={{ xs: 12, md: 3 }}>
                          <CourseCard
                            course={course}
                            isExpanded={expandedCourse === course.id}
                            onToggle={() => {if (!selectedStudent) {navigate('/login'); return;} !course.disabled && setExpandedCourse(expandedCourse === course.id ? null : course.id);}}
                            selectedStudent={selectedStudent}
                            getText={getText}
                            getCoursePoints={getCoursePoints}
                            onResetCourse={handleResetCourse}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            dbProgress={dbProgress}
                            getCourseTopics={getCourseTopics}
                            onNavigate={(path: string) => navigate(path)}
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <ScrollIndicator />
                    
                    <RankingCard courses={allCourses} rankingTab={rankingTab} onRankingTabChange={setRankingTab} rankedStudents={rankedStudentsByCourse} getText={getText} getCoursePoints={getCoursePoints} getCourseProgress={getCourseProgress} selectedStudent={selectedStudent} allCourses={allCourses} />
                  </Grid>
                </Grid>
            )}

        </Box>
      </Container>
    </Box>
  );
}