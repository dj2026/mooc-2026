# Auditoria i Modernització React 19

## Resum

Migració completa del projecte a patrons React 19. S'han eliminat anti-patrons heredats de React 17/18 i redundàncies, sense alterar l'estil visual ni la lògica de negoci. **Build: 0 errors.**

---

## Canvis realitzats

### 1. `useContext` → `use()` (3 fitxers)
**Fitxers**: `src/contexts/AuthContext.tsx`, `ThemeContext.tsx`, `I18nContext.tsx`

- **`import { useContext, ... }`** → **`import { use, ... }`**
- **`useContext(AuthContext)`** → **`use(AuthContext)`** (i anàlegs per ThemeContext, I18nContext)
- **Motiu**: React 19 recomana `use(Context)` en lloc de `useContext(Context)` per llegir valors de context.

### 2. `useEffect` per persistència → eliminat (2 fitxers)
**Fitxers**: `src/contexts/ThemeContext.tsx`, `src/contexts/I18nContext.tsx`

- **Eliminat `useEffect`** que persistia `mode`/`language` a localStorage
- **Motiu**: `setMode()` i `setLanguage()` ja criden `localStorage.setItem()`. L'effect era redundant i afegia un cicle de render extra.

### 3. `useEffect` amb dades estàtiques → lazy initializer (4 fitxers)
**Fitxers**: `src/components/Hero.tsx`, `src/pages/courses/CourseLessons.tsx`, `src/pages/courses/LessonPage.tsx`, `src/pages/courses/${courseId}/${lesson.id}/LessonTopic.tsx`

- **`useEffect`** que carregava dades de imports estáticos (localCourses, localStudents) → **`useState(() => {...})`** amb lazy initializer
- **`setLoading(true)` + `useEffect(() => setLoading(false))`** → **`useState(false)`**
- **Motiu**: Les dades són sincrones (imports estáticos, localStorage). El lazy initializer evita un render extra i un `useEffect` innecessari.
- Exemple:
  ```tsx
  // React 18
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setData({...}); setLoading(false); }, []);

  // React 19
  const [data] = useState(() => ({...}));
  const [loading] = useState(false);
  ```

### 4. `React.FormEvent`/`React.MouseEvent` → tipus directes (5 fitxers)
**Fitxers**:
- `src/features/student/Login.tsx:21` → `FormEvent`
- `src/pages/dashboards/StudentDashboard.tsx:87,136` → `FormEvent`, `MouseEvent`
- `src/features/student/CourseCard.tsx:16` → `MouseEvent`
- `src/features/student/StudentCard.tsx:17` → `MouseEvent`
- `src/components/CourseCard.tsx:23` → `MouseEvent`

- **`React.FormEvent`** → **`FormEvent`** (importat de `react`)
- **`React.MouseEvent`** → **`MouseEvent`** (importat de `react`)
- **Motiu**: React 19 amb JSX transform automàtic no necessita `import React`. Fer servir tipus directes evita dependre del namespace global `React`.

### 5. `App.tsx` — `useEffect` per body background eliminat
- **Eliminat `useEffect`** que feia `document.body.style.backgroundColor = theme.palette.background.default`
- **Eliminades dependències**: `useTheme`, `useEffect`, `theme`
- **Motiu**: El fons es gestiona directament al JSX (`<Box sx={{bgcolor: 'background.default'}}>`). L'`useEffect` era innecessari.

### 6. `main.tsx` — imports nets
- **`import React from 'react'`** → **`import { StrictMode } from 'react'`**
- **`ReactDOM.createRoot`** → **`createRoot`**
- **`<React.StrictMode>`** → **`<StrictMode>`**
- **Motiu**: JSX transform automàtic. No cal `import React` per JSX.

### 7. `Header.tsx` — estat `mounted` eliminat
- **Eliminat `mounted`** (declaració, effect, guard `if (!mounted) return null`)
- **Motiu**: Patró necessari per SSR/hidratació. En app Vite client-side, `mounted` és `true` des del primer render.

### 8. `Footer.tsx` — `import React` → `import type { ReactNode }`
- **`import React from 'react'`** → **`import type { ReactNode } from 'react'`**
- **`React.ReactNode`** → **`ReactNode`**
- **Motiu**: JSX transform automàtic. `import type` no impacta al bundle.

### 9. `LessonPage.tsx` — `useRef` tipus simplificat
- **`useRef<NodeJS.Timeout | null>(null)`** → **`useRef<ReturnType<typeof setInterval>>(null)`**
- **Motiu**: `ReturnType<typeof setInterval>` és més precís i portable que `NodeJS.Timeout`.

### 10. `Login.tsx` — `useEffect` + `useState` → lazy initializer
- **`useEffect` + `useState([])`** → **`useState(() => {...})`** amb lazy initializer
- **`const [students, setStudents]`** → **`const [students]`** (setter no usat)
- **Motiu**: La lectura de localStorage és síncrona. El lazy initializer només s'executa un cop.

### 11. `LessonPage.tsx` — estat `mounted` eliminat
- **Eliminat `mounted`** (3 referències: declaració, effect, guard)
- **`if (mounted && baseLesson)`** → **`if (baseLesson)`**
- **`[baseLesson, mounted, ...]`** → **`[baseLesson, ...]`**
- **Motiu**: `baseLesson` ja fa de guard. `mounted` era redundant.

---

## Patrons no detectats (ja nets)

| Patró | Estat |
|-------|-------|
| `forwardRef` | ❌ No s'usa |
| `PropTypes` / `propTypes` | ❌ No s'usa |
| `defaultProps` | ❌ No s'usa |
| Class components | ❌ Tots function components |
| `findDOMNode` | ❌ No s'usa |
| `React.FC` / `FunctionComponent` | ❌ No s'usa |

---

## Arxius buits detectats (pendents d'implementar)

```
src/hooks/useTeacherData.ts
src/layouts/TeacherLayout.tsx
src/features/teacher/ChatWidget.tsx
src/features/teacher/CourseForm.tsx
src/features/teacher/ExerciseEditor.tsx
src/features/teacher/StatsCards.tsx
src/features/teacher/StudentFilters.tsx
src/features/teacher/StudentTable.tsx
src/pages/teacher/Dashboard.tsx
src/pages/teacher/Courses.tsx
src/pages/teacher/Exercises.tsx
src/pages/teacher/Students.tsx
src/components/ui/ProgressBar.tsx
src/components/ui/SearchInput.tsx
src/services/teacherService.ts
```

---

## Fitxers que NO cal migrar

Aquests fitxers són TypeScript/JavaScript pur sense cap dependència de React:

| Directori | Motiu |
|-----------|-------|
| `src/services/` | Axios + logic, no React |
| `src/utils/` | Funcions pures, no React |
| `src/data/` | Dades estáticas, no React |
| `src/types/` | Types només, no React |
| `src/theme/` | MUI pur, no React |
| `src/i18n/` | i18next, no React |
| `src/middleware/` | Buit |
| `public/` | Estáticos |
| `dist/` | Build output |

---

## Fitxers de configuració (ja React 19)

| Fitxer | Estat |
|--------|-------|
| `package.json` | ✅ `react@^19.2.7`, `@types/react@^19.2.16` |
| `tsconfig.json` | ✅ `"jsx": "react-jsx"` |
| `vite.config.ts` | ✅ `babel-plugin-react-compiler` amb `target: "19"` |
| `index.html` | ✅ HTML genèric |

---

## Dependències del projecte

```json
"react": "^19.2.7"
"react-dom": "^19.2.7"
"@types/react": "^19.2.16"
"@types/react-dom": "^19.2.3"
```
