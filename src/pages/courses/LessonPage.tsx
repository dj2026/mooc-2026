import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Terminal, Code2, Play, CheckCircle2, 
  Zap, HelpCircle, Save, Timer, Trophy, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
<<<<<<< HEAD
import { Box, Typography, Button, IconButton, alpha, CircularProgress } from '@mui/material';
=======
import { Box, Typography, Button, IconButton, alpha, CircularProgress, useTheme } from '@mui/material';
>>>>>>> d735607 (THEME + LANGUAGE)
import { api } from '../../services/api';

interface Lesson {
  id: string; title: string; description: string; instructions: string;
  challenge: string; initialCode: string; solution: string;
}
interface Course { id: string; title: string; content: Lesson[]; }
interface Student { id: string; name: string; }
interface DataStructure { courses: Course[]; students: Student[]; }
type Mode = 'normal' | 'drill' | 'assist' | 'hackathon';

export default function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const theme = useTheme();
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const [apiData, setApiData] = useState<DataStructure | null>(null); // Nou estat per a les dades
  const [loading, setLoading] = useState(true); // Estat de càrrega
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const [userInput, setUserInput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'pass' | 'fail'>('idle');
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [wasSavedInSession, setWasSavedInSession] = useState(false);
  const [currentMode, setCurrentMode] = useState<Mode>('normal');
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [hackathonPoints, setHackathonPoints] = useState(0);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('currentStudent');
    if (saved) setCurrentUser(JSON.parse(saved));

    // Carreguem el JSON des de public
    fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        setApiData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error carregant lliçó:", err);
        setLoading(false);
      });
  }, []);

  const course = apiData?.courses?.find((c) => c.id === courseId);
  const baseLesson = course?.content?.find((l) => l.id === lessonId);

  const codeStorageKey = currentUser ? `code_${currentUser.id}_${courseId}_${lessonId}` : `temp_code_${lessonId}`;
  const getGlobalProgressKey = () => `${courseId}_${lessonId}`;

  useEffect(() => {
    if (mounted && baseLesson && currentUser) {
      const savedCode = localStorage.getItem(codeStorageKey);
      setUserInput(savedCode || baseLesson.initialCode || '');
      
      const globalProgress = JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');
      const key = getGlobalProgressKey();
      
      if (globalProgress[key]) setStatus('pass');
      else setStatus('idle');

      setConsoleOutput([]);
      setHintVisible(false);
      setTimer(60);
      setIsTimerActive(false);
      setIsDirty(false);
      setWasSavedInSession(false);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [baseLesson, mounted, currentUser, courseId, lessonId]);

  // --- LÒGICA DEL TEMPORITZADOR (MODO DRILL) ---
  useEffect(() => {
    if (currentMode === 'drill' && isTimerActive && timer > 0 && status !== 'pass') {
      timerRef.current = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0 && currentMode === 'drill') {
      setStatus('fail');
      setIsTimerActive(false);
      setConsoleOutput(prev => [...prev, "❌ TEMPS EXHAURIT!"]);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTimerActive, timer, currentMode, status]);

  // --- ACCIONS ---
  const handleSaveProgress = async (isAutoSaveOnPass = false) => {
    if (!currentUser || !courseId || !lessonId) return;
    setIsSaving(true);
    try {
      const globalProgress = JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');
      const key = getGlobalProgressKey();
      const wasAlreadyComplete = globalProgress[key] === true;

      localStorage.setItem(codeStorageKey, userInput);
      
      if (isAutoSaveOnPass) {
        globalProgress[key] = true; 
        localStorage.setItem('mooc_global_progress', JSON.stringify(globalProgress));

        if (!wasAlreadyComplete) {
          const currentPoints = parseInt(localStorage.getItem(`points_${currentUser.id}`) || '0');
          const newPoints = currentPoints + 10;
          localStorage.setItem(`points_${currentUser.id}`, newPoints.toString());
          setConsoleOutput(p => [...p, `🏆 +10 Punts d'activitat! (Total: ${newPoints})`]);
        }
      }
      
      await api.postProgress({
        studentId: currentUser.id,
        courseId,
        lessonId,
        status: globalProgress[key] || false 
      });

      window.dispatchEvent(new Event('lessonProgressUpdated'));
      setIsDirty(false); 
      setWasSavedInSession(true);
      setConsoleOutput(p => [...p, "💾 Progrés sincronitzat correctament!"]);
      
    } catch (err) {
      setConsoleOutput(p => [...p, "⚠️ Error al guardar, però s'ha desat localment."]);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRunTests = () => {
    if (currentMode === 'drill' && !isTimerActive && status !== 'pass') return;
    setConsoleOutput(["[SISTEMA]: Executant tests..."]);
    
    const cleanUser = userInput.replace(/\s+/g, '').trim();
    const cleanSol = baseLesson?.solution.replace(/\s+/g, '').trim() || "";

    setTimeout(() => {
      if (cleanUser.includes(cleanSol)) {
        setStatus('pass');
        setIsTimerActive(false);
        setConsoleOutput(p => [...p, "✅ REPTE COMPLETAT!"]);
        
        if (currentMode === 'hackathon') setHackathonPoints(pts => pts + 150);
        
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 } });
        handleSaveProgress(true);
      } else {
        setStatus('fail');
        setConsoleOutput(p => [...p, "❌ ERROR: Revisa el codi."]);
      }
    }, 1000);
  };

  // Pantalla de càrrega
  if (loading) {
    return (
<<<<<<< HEAD
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#050505' }}>
=======
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
>>>>>>> d735607 (THEME + LANGUAGE)
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!mounted || !course || !baseLesson) return null;

return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', color: 'text.primary', overflow: 'hidden' }}>
      {/* Control Bar */}
      <Box sx={{ height: 56, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', px: 3, justifyContent: 'space-between', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', bgcolor: 'action.hover', p: 0.5, borderRadius: 2 }}>
          {(['normal', 'drill', 'assist', 'hackathon'] as Mode[]).map((m) => (
            <Button key={m} onClick={() => { setCurrentMode(m); setTimer(60); setIsTimerActive(false); }}
              sx={{ 
                px: 2, py: 0.5, fontSize: 10, 
                bgcolor: currentMode === m ? 'primary.main' : 'transparent', 
                color: 'text.primary',
                '&:hover': { bgcolor: currentMode === m ? 'primary.dark' : 'action.hover' }
              }}>
              {m === 'drill' && <Zap size={12} style={{ marginRight: 4 }} />} {m.toUpperCase()}
            </Button>
          ))}
        </Box>
        <Button onClick={() => handleSaveProgress(status === 'pass')} disabled={isSaving} variant="contained"
          sx={{ 
            minWidth: 140, 
            bgcolor: wasSavedInSession && !isDirty ? alpha(theme.palette.success.main, 0.1) : 'action.hover', 
            color: wasSavedInSession && !isDirty ? 'success.main' : 'text.primary',
            border: '1px solid',
            borderColor: wasSavedInSession && !isDirty ? 'success.main' : 'transparent',
            '&:hover': { bgcolor: 'action.hover' }
          }}>
          {isSaving ? <CircularProgress size={14} color="inherit" /> : 
           isDirty ? <><Save size={14} style={{marginRight: 8}}/> GUARDAR</> :
           wasSavedInSession ? <><CheckCircle2 size={14} style={{marginRight: 8}}/> DESAT</> :
           <><AlertCircle size={14} style={{marginRight: 8}}/> PENDENT</>}
        </Button>
      </Box>

<<<<<<< HEAD
      {/* BODY */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* ESQUERRA: INSTRUCCIONS */}
        <Box sx={{ width: '25%', borderRight: '1px solid rgba(255,255,255,0.05)', p: 4, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, lineHeight: 1.6 }}>{baseLesson.instructions}</Typography>
=======
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', pt: 2 }}>
        <Box sx={{ width: '25%', borderRight: '1px solid', borderColor: 'divider', p: 4, display: 'flex', flexDirection: 'column', overflowY: 'auto', bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ color: 'text.secondary' }}><ChevronLeft /></IconButton>
            <Box>
              <Typography sx={{ fontSize: 10, color: 'primary.main', fontWeight: 900 }}>{course.title.toUpperCase()}</Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 700 }}>{baseLesson.title}</Typography>
            </Box>
          </Box>
          <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.6 }}>{baseLesson.instructions}</Typography>
>>>>>>> d735607 (THEME + LANGUAGE)
          
          <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), p: 3, borderRadius: 3, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.2), position: 'relative', mb: 3 }}>
            <Code2 size={20} style={{ position: 'absolute', top: 12, right: 12, opacity: 0.2 }} />
            <Typography sx={{ color: 'primary.main', fontSize: 10, fontWeight: 900, mb: 1 }}>OBJECTIU</Typography>
            <Typography sx={{ fontFamily: 'monospace', fontSize: 13 }}>{baseLesson.challenge}</Typography>
          </Box>

          {currentMode === 'assist' && (
            <Box sx={{ mb: 3 }}>
              <Button fullWidth onClick={() => setHintVisible(!hintVisible)} startIcon={<HelpCircle size={16} />} sx={{ color: 'text.secondary' }}>
                {hintVisible ? 'Amagar Pista' : 'Necessites Ajuda?'}
              </Button>
              <AnimatePresence>
                {hintVisible && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Box sx={{ mt: 2, p: 2, bgcolor: alpha('#3b82f6', 0.1), border: '1px solid #3b82f6', borderRadius: 2 }}>
                      <Typography sx={{ fontSize: 12, color: '#93c5fd' }}>💡 Pista: Revisa l'ús de "{baseLesson.solution.substring(0, 8)}..."</Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          )}

<<<<<<< HEAD
          <Box sx={{ mt: 'auto', p: 3, bgcolor: 'rgba(251,191,36,0.05)', border: '1px solid #fbbf24', borderRadius: 3, textAlign: 'center' }}>
            <Trophy size={32} color="#fbbf24" style={{ margin: '0 auto 8px' }} />
            <Typography sx={{ fontSize: 10, color: '#fbbf24', fontWeight: 900, mb: 1 }}>
=======
          <Box sx={{ mt: 'auto', p: 3, bgcolor: alpha('#fbbf24', 0.05), border: '1px solid #fbbf24', borderRadius: 3, textAlign: 'center' }}>
            <Trophy size={32} color={theme.palette.mode === 'dark' ? '#fbbf24' : '#f59e0b'} style={{ margin: '0 auto 8px' }} />
            <Typography sx={{ fontSize: 10, color: theme.palette.mode === 'dark' ? '#fbbf24' : '#f59e0b', fontWeight: 900, mb: 1 }}>
>>>>>>> d735607 (THEME + LANGUAGE)
              {currentMode === 'hackathon' ? 'HACKATHON BONUS' : 'ESTAT DE PUNTS'}
            </Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 900 }}>
              {currentMode === 'hackathon' ? `+${hackathonPoints}` : '10 PTS'}
            </Typography>
          </Box>
        </Box>

        {/* CENTRE: EDITOR */}
        <Box sx={{ width: '37.5%', borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', position: 'relative', bgcolor: 'background.paper' }}>
          <Box sx={{ height: 40, px: 2, bgcolor: theme.palette.mode === 'dark' ? '#000' : '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
               <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>App.tsx</Typography>
               {currentMode === 'drill' && (
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: alpha(theme.palette.primary.main, 0.2), px: 1, borderRadius: 1 }}>
                   <Timer size={12} color={theme.palette.primary.main} /><Typography sx={{ fontSize: 11, color: 'primary.main', fontWeight: 900 }}>{timer}s</Typography>
                 </Box>
               )}
             </Box>
             <Button onClick={handleRunTests} startIcon={<Play size={12} fill="currentColor" />} sx={{ bgcolor: 'white', color: 'black', height: 24, fontSize: 10, fontWeight: 800 }}>RUN</Button>
          </Box>

          <AnimatePresence>
            {currentMode === 'drill' && !isTimerActive && status !== 'pass' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, zIndex: 10, background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={40} color={theme.palette.primary.main} />
                <Typography sx={{ mb: 2, fontWeight: 800, color: 'text.primary' }}>MODO DRILL: 60 SEGONS</Typography>
                <Button variant="contained" onClick={() => { setTimer(60); setIsTimerActive(true); }} sx={{ bgcolor: 'primary.main' }}>START CHALLENGE</Button>
              </motion.div>
            )}
          </AnimatePresence>

          <textarea 
            value={userInput} 
            onChange={(e) => { setUserInput(e.target.value); setIsDirty(true); setWasSavedInSession(false); }}
            spellCheck="false"
            style={{ flex: 1, background: 'transparent', color: theme.palette.primary.main, fontFamily: "'Fira Code', monospace", padding: '2rem', border: 'none', outline: 'none', resize: 'none', fontSize: '15px', lineHeight: 1.5 }} 
          />
        </Box>

        {/* DRETA: CONSOLE */}
        <Box sx={{ width: '37.5%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ height: 40, px: 2, bgcolor: 'action.hover', display: 'flex', alignItems: 'center' }}>
            <Terminal size={14} style={{ marginRight: 8, opacity: 0.4 }} />
            <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>DEBUG CONSOLE</Typography>
          </Box>
          <Box sx={{ p: 4, flex: 1, overflowY: 'auto' }}>
            {consoleOutput.map((line, i) => (
              <Typography key={i} sx={{ fontFamily: 'monospace', fontSize: 12, mb: 1, color: line.includes('✅') || line.includes('🏆') || line.includes('💾') ? 'success.main' : line.includes('❌') ? 'error.main' : 'text.secondary' }}>
                {'> '} {line}
              </Typography>
            ))}

            <AnimatePresence>
              {wasSavedInSession && !isDirty && status === 'pass' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '2rem' }}>
                  <Box sx={{ p: 3, border: '1px solid', borderColor: 'success.main', borderRadius: 3, textAlign: 'center', bgcolor: alpha(theme.palette.success.main, 0.05) }}>
                    <Typography sx={{ color: 'success.main', fontWeight: 800, mb: 2 }}>LLIÇÓ COMPLETADA AMB ÈXIT</Typography>
                    <Button fullWidth onClick={() => navigate('/dashboards/student')} sx={{ bgcolor: 'text.primary', color: 'background.default', fontWeight: 800 }}>TORNAR AL DASHBOARD</Button>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}