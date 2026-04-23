import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlayCircle, ChevronRight, CheckCircle2, Loader2, Lock, 
  Code2, Cpu, Globe, Database, Terminal, Layers, Trophy, RotateCcw, 
  UserPlus, Trash2, X, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, Container, Typography, Card, TextField, Button, Avatar, 
  LinearProgress, Stack, Alert, Tabs, Tab, IconButton, Tooltip, useTheme
} from '@mui/material';
import { api } from '../../services/api';
import localData from '../../../public/data.json';
import { useTranslation } from 'react-i18next';

// --- INTERFACES ---
interface Lesson { id: string; title: string; }
interface Course { id: string; title: string; content?: Lesson[]; }
interface Student { id: string; name: string; code: string; email: string; average?: number; }

// --- COMPONENT STUDENT CARD ---
function StudentCard({ student, onLogin, onDelete, error }: { 
  student: Student, onLogin: (s: Student, code: string) => void, onDelete: (id: string, pin: string) => boolean, error: boolean 
}) {
  const { t } = useTranslation();
  const [pin, setPin] = useState("");
  const [deletePin, setDeletePin] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete(student.id, deletePin)) {
      setIsDeleting(false);
    } else {
      alert(t('auth.incorrect_pin'));
      setDeletePin("");
    }
  };

  return (
    <motion.div style={{ position: 'relative' }} whileHover={{ y: -5 }} animate={error ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
      <Box sx={{ position: 'absolute', top: 15, right: 15, zIndex: 10 }}>
        {!isDeleting ? (
          <IconButton onClick={(e) => { e.stopPropagation(); setIsDeleting(true); }} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
            <Trash2 size={18} />
          </IconButton>
        ) : (
          <Stack direction="row" spacing={1} sx={{ bgcolor: 'background.paper', p: 0.5, borderRadius: '8px', border: '1px solid', borderColor: 'error.main', alignItems: 'center' }}>
            <TextField size="small" placeholder="PIN" type="password" value={deletePin} autoFocus onChange={(e) => setDeletePin(e.target.value)} slotProps={{ htmlInput: { maxLength: 4, style: { color: 'text.primary', fontSize: '12px', width: '40px', padding: '4px', textAlign: 'center' } } }} />
            <IconButton onClick={handleConfirmDelete} size="small" sx={{ color: 'success.main' }}><Check size={16} /></IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); setIsDeleting(false); }} size="small" sx={{ color: 'text.secondary' }}><X size={16} /></IconButton>
          </Stack>
        )}
      </Box>

      <Card sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 40, border: '2px solid', borderColor: error ? 'error.main' : 'divider', bgcolor: 'background.paper', backdropFilter: 'blur(20px)', height: '100%', transition: 'all 0.3s ease', '&:hover': { borderColor: 'primary.main' } }}>
        <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main', fontSize: '2.2rem', fontWeight: 900, border: '3px solid', borderColor: 'divider' }}>{student.name.charAt(0)}</Avatar>
        <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>{student.name}</Typography>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField fullWidth type="password" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onLogin(student, pin)} autoComplete="off" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 20 } }} />
          <Button variant="contained" fullWidth size="large" onClick={() => onLogin(student, pin)} startIcon={<Lock size={18} />} sx={{ borderRadius: 20, py: 1.5, fontWeight: 900 }}>{t('auth.login')}</Button>
        </Stack>
      </Card>
    </motion.div>
  );
}

const CourseIcon = ({ title }: { title: string }) => {
  const iconProps = { size: 22, color: '#a855f7' };
  const name = title.toLowerCase();
  if (name.includes('python')) return <Terminal {...iconProps} />;
  if (name.includes('react')) return <Globe {...iconProps} />;
  if (name.includes('learning')) return <Cpu {...iconProps} />;
  if (name.includes('spring') || name.includes('java')) return <Layers {...iconProps} />;
  if (name.includes('base de dades') || name.includes('sql')) return <Database {...iconProps} />;
  return <Code2 {...iconProps} />;
};

export default function StudentDashboard() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [dbProgress, setDbProgress] = useState<Record<string, boolean>>({});
  const [errorId, setErrorId] = useState<string | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [rankingTab, setRankingTab] = useState(0);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPin, setNewPin] = useState("");

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
    const initData = async () => {
      try {
        setLoading(true);
        const jsonStudents = localData.students || [];
        setAllCourses(localData.courses || []);
        const localStudents = JSON.parse(localStorage.getItem('mooc_local_students') || '[]');
        const deletedIds = JSON.parse(localStorage.getItem('mooc_deleted_ids') || '[]');
        const merged = [...jsonStudents, ...localStudents].filter(s => !deletedIds.includes(s.id));
        setStudents(merged);

        const saved = localStorage.getItem('currentStudent');
        if (saved) {
          const parsed = JSON.parse(saved);
          setSelectedStudent(parsed);
          await fetchProgress(parsed.id);
        }
      } catch (err) { setGlobalError(t('common.error_loading')); } finally { setLoading(false); }
    };
    initData();
  }, [fetchProgress, t]);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPin) return;
    const newStudent = { id: `local-${Date.now()}`, name: newName, email: newEmail, code: newPin };
    const updatedLocal = [...JSON.parse(localStorage.getItem('mooc_local_students') || '[]'), newStudent];
    localStorage.setItem('mooc_local_students', JSON.stringify(updatedLocal));
    setStudents(prev => [...prev, newStudent]);
    setNewName(""); setNewEmail(""); setNewPin("");
  };

  const handleDeleteStudent = (id: string, pin: string): boolean => {
    const target = students.find(s => s.id === id);
    if (!target || target.code !== pin) return false;
    const deletedIds = JSON.parse(localStorage.getItem('mooc_deleted_ids') || '[]');
    localStorage.setItem('mooc_deleted_ids', JSON.stringify([...deletedIds, id]));
    const localOnly = JSON.parse(localStorage.getItem('mooc_local_students') || '[]');
    localStorage.setItem('mooc_local_students', JSON.stringify(localOnly.filter((s: any) => s.id !== id)));
    setStudents(prev => prev.filter(s => s.id !== id));
    if (selectedStudent?.id === id) {
      handleLogoutAction();
    }
    return true;
  };

  const handleLogin = async (student: Student, code: string) => {
    if (code === student.code) {
      setSelectedStudent(student);
      localStorage.setItem('currentStudent', JSON.stringify(student));
      
      // AVISAR AL HEADER QUE S'HA FET LOGIN
      window.dispatchEvent(new Event('auth-state-change'));

      await fetchProgress(student.id);
    } else { setErrorId(student.id); setTimeout(() => setErrorId(null), 500); }
  };

  const handleLogoutAction = () => {
    localStorage.removeItem('currentStudent');
    localStorage.removeItem('mooc_global_progress');
    setSelectedStudent(null);
    setDbProgress({});
    
    // AVISAR AL HEADER QUE S'HA FET LOGOUT
    window.dispatchEvent(new Event('auth-state-change'));
  };

  const handleResetCourse = async (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    if (!selectedStudent || !window.confirm(t('dashboard.reset_course_confirm'))) return;
    try {
      setActionLoading(true);
      await api.resetCourse(selectedStudent.id, courseId);
      const local = JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');
      Object.keys(local).forEach(key => { if (key.startsWith(`${courseId}_`)) delete local[key]; });
      localStorage.setItem('mooc_global_progress', JSON.stringify(local));
      await fetchProgress(selectedStudent.id);
    } catch (err) { setGlobalError("Error reset."); } finally { setActionLoading(false); }
  };

  const getCourseProgress = useCallback((course: Course, studentId: string): number => {
    if (!course.content || course.content.length === 0) return 0;
    const student = students.find(s => s.id === studentId);
    if (selectedStudent?.id === studentId) {
      const done = course.content.filter(l => dbProgress[`${course.id}_${l.id}`]).length;
      return Math.round((done / course.content.length) * 100);
    }
    return student?.average || 0;
  }, [dbProgress, selectedStudent, students]);

  const rankedStudentsByCourse = useMemo(() => {
    const currentCourse = allCourses[rankingTab];
    if (!currentCourse) return [];
    return [...students].sort((a, b) => getCourseProgress(currentCourse, b.id) - getCourseProgress(currentCourse, a.id));
  }, [students, allCourses, rankingTab, getCourseProgress]);

  if (loading) return <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" color={theme.palette.primary.main} size={48} /></Box>;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', pb: 8 }}>
      <Container maxWidth="xl" sx={{ pt: 6 }}>
        {globalError && <Alert severity="error" sx={{ mb: 4, borderRadius: '1rem' }}>{globalError}</Alert>}
        
        <AnimatePresence mode="wait">
          {!selectedStudent ? (
            <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Typography variant="h3" align="center" sx={{ fontWeight: 900, mb: 1 }}>{t('dashboard.title')}</Typography>
              <Typography align="center" sx={{ opacity: 0.6, mb: 6 }}>{t('dashboard.subtitle')}</Typography>
              
              <Box sx={{ display: 'grid', gap: 5, gridTemplateColumns: { xs: '1fr', lg: '350px 1fr' } }}>
                <Card sx={{ p: 4, borderRadius: '2.5rem', bgcolor: 'background.paper', border: '2px dashed', borderColor: 'primary.main' + '4D', height: 'fit-content' }}>
                  <Stack spacing={3} component="form" onSubmit={handleCreateStudent}>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <UserPlus color={theme.palette.primary.main} />
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>{t('dashboard.create_user_title')}</Typography>
                    </Stack>
                    <TextField fullWidth label={t('dashboard.name_label')} variant="filled" value={newName} onChange={e => setNewName(e.target.value)} sx={{ bgcolor: 'action.hover', borderRadius: '12px' }} />
                    <TextField fullWidth label={t('dashboard.email_label')} variant="filled" value={newEmail} onChange={e => setNewEmail(e.target.value)} sx={{ bgcolor: 'action.hover', borderRadius: '12px' }} />
                    <TextField fullWidth label={t('dashboard.pin_label')} variant="filled" type="password" value={newPin} onChange={e => setNewPin(e.target.value)} slotProps={{ htmlInput: { maxLength: 4 } }} sx={{ bgcolor: 'action.hover', borderRadius: '12px' }} />
                    <Button type="submit" variant="outlined" fullWidth sx={{ borderRadius: '12px', py: 1.5, borderColor: 'primary.main', color: 'primary.main', fontWeight: 800 }}>{t('dashboard.register_btn')}</Button>
                  </Stack>
                </Card>

                <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(auto-fill, minmax(280px, 1fr))' } }}>
                  {students.map(s => <StudentCard key={s.id} student={s} onLogin={handleLogin} onDelete={handleDeleteStudent} error={errorId === s.id} />)}
                </Box>
              </Box>
            </motion.div>
          ) : (
            <motion.div key="dash" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <Box sx={{ display: 'grid', gap: 5, gridTemplateColumns: { xs: '1fr', md: '320px 1fr' } }}>
                <Stack spacing={3}>
                  <Card sx={{ p: 4, borderRadius: '2.5rem', textAlign: 'center', bgcolor: 'background.paper', position: 'relative', border: '1px solid', borderColor: 'primary.main' + '33' }}>
                    {actionLoading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} color="secondary" />}
                    <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontWeight: 900, fontSize: '2rem' }}>{selectedStudent.name.charAt(0)}</Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>{selectedStudent.name}</Typography>
                    <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: '1.2rem' }}>
                      <Typography variant="caption" sx={{ opacity: 0.5, fontWeight: 800 }}>{t('dashboard.average')}</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main' }}>
                        {allCourses.length > 0 ? Math.floor(allCourses.reduce((acc, c) => acc + getCourseProgress(c, selectedStudent.id), 0) / allCourses.length) : 0}%
                      </Typography>
                    </Box>
                  </Card>
                </Stack>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>{t('dashboard.my_courses')}</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 6 }}>
                    {allCourses.map(course => (
                      <Box key={course.id} sx={{ position: 'relative' }}>
                        <Card onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)} sx={{ p: 2.5, cursor: 'pointer', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'background.paper', border: '2px solid', borderColor: expandedCourse === course.id ? 'primary.main' : 'transparent', transition: '0.2s' }}>
                          <Box sx={{ p: 1.5, bgcolor: 'primary.main' + '1A', borderRadius: '12px' }}><CourseIcon title={course.title} /></Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontWeight: 900 }}>{course.title}</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.6 }}>{getCourseProgress(course, selectedStudent.id)}% {t('dashboard.completed')}</Typography>
                          </Box>
                          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                            <Tooltip title={t('dashboard.reset_course_tooltip')}>
                              <IconButton onClick={(e) => handleResetCourse(e, course.id)} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}><RotateCcw size={16} /></IconButton>
                            </Tooltip>
                            <ChevronRight size={18} style={{ transform: expandedCourse === course.id ? 'rotate(90deg)' : 'none', transition: '0.3s', opacity: 0.5 }} />
                          </Stack>
                        </Card>
                        
                        <AnimatePresence>
                          {expandedCourse === course.id && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, marginTop: '8px' }}>
                              <Box sx={{ p: 1.5, bgcolor: 'background.paper', borderRadius: '1.2rem', border: '1px solid', borderColor: 'primary.main' + '4D', maxHeight: '200px', overflowY: 'auto' }}>
                                {course.content?.map(lesson => (
                                  <Box key={lesson.id} onClick={() => navigate(`/courses/${course.id}/${lesson.id}`)} sx={{ p: 1.2, borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                                    <Typography variant="caption">{lesson.title}</Typography>
                                    {dbProgress[`${course.id}_${lesson.id}`] ? <CheckCircle2 size={18} color={theme.palette.success.main} /> : <PlayCircle size={18} color={theme.palette.primary.main} />}
                                  </Box>
                                ))}
                              </Box>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Box>
                    ))}
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center' }}>
                    <Trophy size={22} color="#ffb700" />
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>{t('dashboard.ranking_title')}</Typography>
                  </Stack>
                  <Card sx={{ borderRadius: '2rem', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                    <Tabs value={rankingTab} onChange={(_, val) => setRankingTab(val)} variant="scrollable" sx={{ bgcolor: 'action.hover', '& .MuiTabs-indicator': { bgcolor: 'primary.main' } }}>
                      {allCourses.map(c => <Tab key={c.id} label={c.title} sx={{ fontWeight: 800, textTransform: 'none' }} />)}
                    </Tabs>
                    <Box sx={{ p: 4, maxHeight: '300px', overflowY: 'auto' }}>
                      <Stack spacing={2.5}>
                        {rankedStudentsByCourse.map((s, idx) => {
                          const isMe = s.id === selectedStudent?.id;
                          return (
                            <Box key={s.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography sx={{ width: 25, fontWeight: 900, color: idx < 3 ? '#ffb700' : 'text.secondary' }}>{idx + 1}</Typography>
                              <Avatar sx={{ width: 32, height: 32, bgcolor: isMe ? 'primary.main' : 'action.disabled' }}>{s.name.charAt(0)}</Avatar>
                              <Typography sx={{ flex: 1, fontWeight: isMe ? 900 : 400, color: isMe ? 'primary.main' : 'text.primary' }}>
                                {s.name} {isMe && `(${t('dashboard.you')})`}
                              </Typography>
                              <Typography sx={{ fontWeight: 900, color: 'primary.main' }}>{getCourseProgress(allCourses[rankingTab], s.id)}%</Typography>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}