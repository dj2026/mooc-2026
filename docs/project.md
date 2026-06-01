# MOOC React 2026
---

## 1. Tecnologies i Dependències

| Categoria | Llibreria | Versió | Ús |
|-----------|-----------|--------|-----|
| **Framework** | React | ^18.3.1 | Components i hooks |
| **Build** | Vite | ^6.0.0 | Dev server i bundling |
| **UI** | @mui/material | ^9.0.0 | Components Material Design |
| **Estils** | @emotion/react, @emotion/styled | ^11.x | Estils CSS-in-JS |
| **Icons** | @mui/icons-material + lucide-react | ^9.0.0 / ^0.577.0 | Icones |
| **Routing** | react-router-dom | ^6.30.3 | Navegació SPA |
| **Animacions** | framer-motion | ^12.38.0 | Animacions declaratives |
| **Internacionalització** | i18next + react-i18next | ^26.0.6 / ^17.0.4 | Multiidioma (CA, ES, EN) |
| **HTTP** | axios | ^1.15.0 | Peticions a API REST |
| **Confetti** | canvas-confetti | ^1.9.2 | Animació en completar lliçons |
| **Util** | clsx, class-variance-authority | ^2.1.1 / ^0.7.1 | Classes condicionals |
| **Tipus** | TypeScript | ^5.5.0 | Tipat estàtic |

---

## 2. Estructura Completa del Projecte

```
src/
├── App.css                         # Estils globals de l'app
├── App.tsx                         # Router principal amb rutes
├── env.d.ts                        # Declaracions de tipus per a fitxers estàtics
├── index.css                       # Estils base/globals
├── main.tsx                        # Punt d'entrada (BrowserRouter + providers)
│
├── components/                     # Components reutilitzables
│   ├── CourseCard.tsx              # Targeta de curs (Home)
│   ├── Footer.tsx                  # Peu de pàgina
│   ├── Header.tsx                  # Barra de navegació
│   ├── Hero.tsx                    # Secció hero amb typewriter
│   ├── LanguageSwitcher.tsx        # Canviador d'idioma
│   ├── ParticlesBackground.tsx     # Fons interactiu amb Canvas
│   ├── ThemeToggleButton.tsx       # Botó mode clar/fosc
│   └── ui/                         # Components base
│       ├── badge.tsx               # Badge (standard/outline)
│       ├── Card.tsx                # Wrapper MUI Card
│       ├── ProgressBar.tsx         # (BUIT)
│       └── SearchInput.tsx         # (BUIT)
│
├── contexts/                       # Contextos React
│   ├── AuthContext.tsx             # Autenticació (login/logout/token)
│   ├── I18nContext.tsx             # Idioma (persistència localStorage)
│   └── ThemeContext.tsx            # Tema clar/fosc
│
├── data/                           # Dades estàtiques
│   ├── courses.ts                  # Cursos (Python, React, Spring Boot, ML)
│   ├── exercises.ts                # Exercicis (initialCode + solution)
│   └── students.ts                 # Estudiants predefinits
│
├── features/                       # Components agrupats per funció
│   ├── student/
│   │   ├── CourseCard.tsx          # Card de curs al dashboard
│   │   ├── CourseExpandedContent.tsx # Contingut expandit (syllabus/activities)
│   │   ├── CourseIcon.tsx          # Icona dinàmica per curs
│   │   ├── Login.tsx               # Formulari login reusable
│   │   ├── ProgressOverview.tsx    # Barres de progrés per curs
│   │   ├── RankingCard.tsx         # Rànquing d'estudiants
│   │   ├── ScrollIndicator.tsx     # Indicador de scroll mòbil
│   │   ├── StudentCard.tsx         # Targeta login per PIN
│   │   ├── StudentProfileCard.tsx  # Perfil (avatar, nom, punts)
│   │   └── types.ts                # Interfícies compartides
│   │
│   └── teacher/                    # (TOT BUIT)
│       ├── ChatWidget.tsx
│       ├── CourseForm.tsx
│       ├── ExerciseEditor.tsx
│       ├── StatsCards.tsx
│       ├── StudentFilters.tsx
│       └── StudentTable.tsx
│
├── hooks/                          # Hooks personalitzats
│   ├── useI18n.ts                  # Re-exporta I18nProvider + useI18n
│   ├── useTeacherData.ts           # (BUIT)
│   └── useTheme.ts                 # Re-exporta ThemeProvider + useThemeMode
│
├── i18n/                           # Traduccions
│   ├── ca.ts                       # Català
│   ├── en.ts                       # Anglès
│   ├── es.ts                       # Castellà
│   └── index.ts                    # Configuració i18next
│
├── i18n.ts                         # Configuració i18next (punt d'entrada)
│
├── layouts/                        # Layouts per a rutes
│   ├── MainLayout.tsx              # Header + Outlet + Footer
│   └── TeacherLayout.tsx           # (BUIT)
│
├── middleware/                      # (BUIT)
│
├── pages/                          # Pàgines de l'aplicació
│   ├── Home.tsx                    # Pàgina principal
│   ├── courses/
│   │   ├── ${courseId}/
│   │   │   └── ${lesson.id}/
│   │   │       └── LessonTopic.tsx # (per explorar)
│   │   ├── CourseLessons.tsx       # Lliçons d'un curs
│   │   └── LessonPage.tsx          # Editor de codi interactiu
│   ├── dashboards/
│   │   └── StudentDashboard.tsx    # Panell de l'estudiant
│   └── teacher/                    # (TOT BUIT)
│       ├── Courses.tsx
│       ├── Dashboard.tsx
│       ├── Exercises.tsx
│       └── Students.tsx
│
├── services/                       # Capa d'accés a dades
│   ├── api.ts                      # Client axios (progress CRUD)
│   ├── authService.ts              # Login/logout/getMe
│   ├── courseService.ts            # CRUD cursos/lliçons
│   └── teacherService.ts           # (BUIT)
│
├── theme/
│   └── Theme.ts                    # getTheme(mode) per a MUI
│
├── types/
│   └── index.ts                    # Interfícies globals
│
└── utils/                          # Utilitats
    ├── formatters.ts               # Text, progress, points, timestamps
    ├── utils.ts                    # sx() per composar estils MUI
    └── validators.ts               # validatePin, isValidEmail, etc.
```

---

## 3. Responsabilitat de Cada Fitxer

### Punt d\'Entrada

| Fitxer | Funció actual | Per fer |
|--------|---------------|---------|
| `main.tsx` | Renderitza `<App />` amb BrowserRouter + ThemeProvider + AuthProvider + I18nProvider | (completat) |
| `App.tsx` | Router: rutes Home, courses/* (MainLayout), dashboards/student (MainLayout), teacher/* | (completat) |

### Components (`src/components/`)

| Fitxer | Exportacions | Funcions clau |
|--------|-------------|---------------|
| `Header.tsx` | `Header` | `scrollToDynamic(desktopPx, mobilePx)`, `handleLogout()`, `checkAuth()` |
| `Hero.tsx` | `Hero (default)` | Typewriter animat, polling `/data.json` cada 5s per stats |
| `Footer.tsx` | `Footer` | `FooterLink` (component intern), any dinàmic |
| `CourseCard.tsx` | `CourseCard` | `handleEnroll()`, `getLocalizedText()` |
| `ParticlesBackground.tsx` | `ParticlesBackground (default)` | Classe `Particle` amb `draw()` i `update()`, `connect()` |
| `ThemeToggleButton.tsx` | `ThemeToggleButton` | Alterna mode clar/fosc via `useThemeMode()` |
| `LanguageSwitcher.tsx` | `LanguageSwitcher` | Canvia idioma via `i18n.changeLanguage()` |

### Components UI (`src/components/ui/`)

| Fitxer | Exportacions |
|--------|-------------|
| `Card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` |
| `badge.tsx` | `Badge` (mode `standard` / `outline`) |
| `ProgressBar.tsx` | (BUIT) |
| `SearchInput.tsx` | (BUIT) |

### Contexts (`src/contexts/`)

| Fitxer | Provider | Hook | Funcions |
|--------|----------|------|----------|
| `AuthContext.tsx` | `AuthProvider` | `useAuth()` | `login(credentials)`, `logout()`, estat: `user`, `token`, `isAuthenticated`, `loading` |
| `I18nContext.tsx` | `I18nProvider` | `useI18n()` | `setLanguage(lang)`, estat: `language` (persistit a localStorage) |
| `ThemeContext.tsx` | `ThemeProvider` | `useThemeMode()` | `toggleTheme()`, `setMode(mode)`, estat: `mode` (persistit a localStorage) |

### Dades Estàtiques (`src/data/`)

| Fitxer | Interfície | Contingut |
|--------|-----------|-----------|
| `courses.ts` | `Course`, `LessonContent`, `SubTopic` | 4 cursos: Python (13 lliçons), React (2 lliçons), Spring Boot (2, deshabilitat), Machine Learning (2, deshabilitat) |
| `exercises.ts` | `Exercise` | 17 exercicis (13 Python, 2 React, 1 Spring Boot, 1 ML) amb `initialCode` i `solution` |
| `students.ts` | `Student` | 3 estudiants predefinits amb PIN: Marc (1), Jordi (2), Miquel (3) |

### Features Student (`src/features/student/`)

| Fitxer | Exportació | Props / Funcions |
|--------|-----------|------------------|
| `CourseCard.tsx` | `CourseCard` | `onToggle`, `onResetCourse`, `onNavigate`, rep `course`, `isExpanded`, `dbProgress` |
| `CourseExpandedContent.tsx` | `CourseExpandedContent` | Tabs syllabus/activities, llista lliçons amb icones de progrés |
| `CourseIcon.tsx` | `CourseIcon` | Retorna icona Lucide segons el nom del curs |
| `Login.tsx` | `Login` | Selector role student/teacher, formulari crear usuari, grid de StudentCards |
| `ProgressOverview.tsx` | `ProgressOverview` | Barres `LinearProgress` per curs amb percentatge |
| `RankingCard.tsx` | `RankingCard` | Tabs per curs, llistat ordenat per progrés, usuari actiu destacat |
| `ScrollIndicator.tsx` | `ScrollIndicator` | 3 chevrons animats a cada costat |
| `StudentCard.tsx` | `StudentCard` | Login per PIN, botó eliminar amb confirmació PIN |
| `StudentProfileCard.tsx` | `StudentProfileCard` | Avatar, nom, punts totals, botó logout |
| `types.ts` | `Student` | Interfície compartida Student |

### Features Teacher (`src/features/teacher/`)

TOTS ELS FITXERS estan BUITS (pendents d\'implementar):
- `ChatWidget.tsx`, `CourseForm.tsx`, `ExerciseEditor.tsx`, `StatsCards.tsx`, `StudentFilters.tsx`, `StudentTable.tsx`

### Pàgines (`src/pages/`)

| Fitxer | Exportació | Funcions clau |
|--------|-----------|---------------|
| `Home.tsx` | (default) | Carrega cursos via `fetch(\'/data.json\')`, 6 targetes de features localitzades |
| `courses/CourseLessons.tsx` | (default) | Layout 3 columnes: syllabus accordion + contingut + "On this page" |
| `courses/LessonPage.tsx` | (default) | Editor codi, 4 modes, tests, confetti, submissions, localStorage progress |
| `dashboards/StudentDashboard.tsx` | (default) | Login, perfil, progrés, cursos expansibles, rànquing |
| `teacher/Courses.tsx` | (BUIT) | |
| `teacher/Dashboard.tsx` | (BUIT) | |
| `teacher/Exercises.tsx` | (BUIT) | |
| `teacher/Students.tsx` | (BUIT) | |

### Serveis (`src/services/`)

| Fitxer | Objecte | Mètodes | API Endpoints |
|--------|---------|---------|---------------|
| `api.ts` | `api` | `getStudentProgress(studentId)`, `postProgress(data)`, `resetCourse(studentId, courseId)` | `GET /api/progress/{id}`, `POST /api/progress`, `DELETE /api/progress/{sid}/{cid}` |
| `authService.ts` | `authService` | `login(credentials)`, `logout()`, `getMe()`, `getCurrentUser()` | `POST /api/users/auth/login/`, `POST /api/users/auth/logout/`, `GET /api/users/me/settings/` |
| `courseService.ts` | `courseService` | `getAllCourses()`, `getCourseBySlug(slug)`, `getCourseLessons(slug)`, `getCourseStudents(slug)`, `submitChallenge(...)` | `GET /api/v1/courses/`, `GET /api/v1/courses/{slug}/`, `GET /api/v1/courses/{slug}/topics/`, `GET /api/v1/courses/{slug}/students/`, `POST /api/v1/courses/{slug}/topics/{t}/problems/{p}/submissions/` |
| `teacherService.ts` | (BUIT) | | |

### Theme (`src/theme/`)

| Fitxer | Exportacions | Colors |
|--------|-------------|--------|
| `Theme.ts` | `getTheme(mode)` | Dark: primary `#90caf9`, secondary `#f48fb1`, bg `#0a1929`; Light: primary `#1976d2`, secondary `#dc004e`, bg `#f5f5f5` |

### Hooks (`src/hooks/`)

| Fitxer | Contingut |
|--------|-----------|
| `useI18n.ts` | Re-exporta `{ I18nProvider, useI18n }` |
| `useTheme.ts` | Re-exporta `{ ThemeProvider, useThemeMode }` |
| `useTeacherData.ts` | (BUIT) |

### Utils (`src/utils/`)

| Fitxer | Funcions |
|--------|----------|
| `formatters.ts` | `getLocalizedText(field, lang)`, `getBaseLanguage(locale)`, `formatProgressPercent(done, total)`, `calculatePoints(completed)`, `padNumber(num)`, `formatTimestamp(timestamp)`, `makeProgressKey(courseId, lessonId)` |
| `utils.ts` | `sx()` per composar estils MUI |
| `validators.ts` | `validatePin(student, pin)`, `validateRequiredFields(fields)`, `isValidPin(pin)`, `isValidEmail(email)`, `validateCodeSolution(userInput, expectedSolution)` |

### Traduccions (`src/i18n/`)

| Fitxer | Seccions |
|--------|----------|
| `ca.ts` | auth, dashboard, home (features, why_choose), hero (stats, subtitle, scroll_down), footer (brand_tagline, explore, community, connect, copyright), course (enroll, by), common (errors), lesson (syllabus, run, debug, objective, challenge, points, etc.) |
| `es.ts` | Mateixes seccions en castellà |
| `en.ts` | Mateixes seccions en anglès |
| `index.ts` | Configuració i18next amb LanguageDetector, fallback \'ca\' |

### Fitxers d\'Arrel

| Fitxer | Propòsit |
|--------|----------|
| `index.html` | HTML entry point amb div#root |
| `vite.config.ts` | Configuració Vite + React plugin |
| `tsconfig.json` | Configuració TypeScript |
| `package.json` | Dependències i scripts (dev, build, preview) |
| `public/data.json` | Dades de fallback local (courses + students) |
| `public/img/` | Logos SVG dels cursos (Python.svg, React.svg, SB.svg, ml.svg) |
| `public/_redirects` | Regles de redirect per SPA (Netlify) |
| `public/robots.txt` | Configuració SEO |

---

## 4. Flux de Dades Actual

### Fonts de Dades

1. **`/data.json` (públic)** - Font principal usada per CourseLessons, LessonPage, StudentDashboard, Hero
2. **`src/data/courses.ts`** - Dades estàtiques de cursos (NO connectades encara a la UI)
3. **`src/data/exercises.ts`** - Dades d\'exercicis (NO connectades encara a la UI)
4. **`src/data/students.ts`** - Estudiants predefinits (NO connectats encara a la UI)
5. **API REST** - `API ISAAC` (amb fallback a `/data.json` si no respon)
6. **localStorage** - Progrés (`mooc_global_progress`), codi (`code_{userId}_{courseId}_{lessonId}`), punts (`points_{userId}`), usuaris locals (`mooc_local_students`), IDs eliminats (`mooc_deleted_ids`)

### Flux del Progrés

```
LessonPage
  │
  ├── handleRunTests()
  │     ├── Compara userInput amb solution (remove spaces + includes)
  │     ├── Si passa: confetti + +10 punts (localStorage)
  │     └── Guarda submissions a mooc_submissions_{courseId}_{lessonId}
  │
  ├── handleSaveProgress()
  │     ├── Desa codi a localStorage (codeStorageKey)
  │     ├── Marca lliçó completada a mooc_global_progress
  │     ├── Suma punts a points_{userId}
  │     └── api.postProgress() → intenta API → si falla, només local
  │
  └── Dispara event \'lessonProgressUpdated\' → CourseLessons i StudentDashboard el reben
```

### Flux d\'Autenticació

```
StudentDashboard / Login
  │
  ├── handleLogin(student, pin)
  │     ├── Compara student.code === pin (validació local)
  │     ├── Si OK: desa a localStorage (currentStudent)
  │     └── Dispara event \'auth-state-change\' → Header el rep
  │
  └── authService.login(credentials)
        ├── Intenta POST /api/users/auth/login/
        └── Fallback: busca a /data.json per email+code
```

---

## 5. Estat Actual del Projecte

### Implementat (Funcional)
- ✅ Components UI (Header, Hero, Footer, CourseCard, ParticlesBackground)
- ✅ Context d\'idioma (I18nContext) + suport multiidioma (CA/ES/EN)
- ✅ Context de tema (ThemeContext) + mode clar/fosc
- ✅ Context d\'autenticació (AuthContext) - Provider creat però NO connectat a l\'app
- ✅ StudentDashboard complet (login, progrés, rànquing, cursos expansibles)
- ✅ CourseLessons (layout 3 columnes amb syllabus + contingut + navegació)
- ✅ LessonPage (editor de codi amb 4 modes, tests, confetti, submissions)
- ✅ Serveis API amb fallback local
- ✅ Dades estàtiques (courses.ts, exercises.ts, students.ts)
- ✅ Utils (formatters, validators)
- ✅ `main.tsx` i `App.tsx` - Connectats amb BrowserRouter, providers i rutes
- ✅ `MainLayout.tsx` - En ús com a layout route (Header + Outlet + Footer)
- ✅ `Login.tsx` - Mogut a features/student/ i usat des de StudentDashboard
- ✅ `StudentDashboard.tsx` - Sense components inline; tota la UI ve de features/student/

### Per Implementar
- ❌ Pàgines de teacher (Courses, Dashboard, Exercises, Students)
- ❌ Components de teacher (ChatWidget, CourseForm, ExerciseEditor, StatsCards, StudentFilters, StudentTable)
- ❌ `middleware/`
- ❌ `ProgressBar.tsx`, `SearchInput.tsx`
- ❌ `useTeacherData.ts`, `teacherService.ts`, `TeacherLayout.tsx` 

### Observacions
- `AuthContext` està creat però no s\'usa (StudentDashboard i Header fan servir localStorage directament)
- Els fitxers a `src/data/` contenen dades completes però no estan connectats a la UI (que fa servir `/data.json` via fetch)
- El projecte té dues capes de dades: una API REST real i un fallback local a `/public/data.json`
- `StudentDashboard.tsx` està completament desacoblat: 0 components inline, tota la UI ve de `features/student/`

---

## 6. APIs Utilitzades

### API REST (Backend esperat a `URL API ISAAC`)

| Mètode | Endpoint | Ús | Servei |
|--------|----------|-----|--------|
| GET | `/api/progress/{studentId}` | Obtenir progrés de l\'estudiant | `api.ts` |
| POST | `/api/progress` | Guardar progrés d\'una lliçó | `api.ts` |
| DELETE | `/api/progress/{studentId}/{courseId}` | Reiniciar progrés d\'un curs | `api.ts` |
| POST | `/api/users/auth/login/` | Login usuari | `authService.ts` |
| POST | `/api/users/auth/logout/` | Logout usuari | `authService.ts` |
| GET | `/api/users/me/settings/` | Obtenir dades de l\'usuari | `authService.ts` |
| GET | `/api/v1/courses/` | Llistat de cursos | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/` | Detalls d\'un curs | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/topics/` | Lliçons d\'un curs | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/students/` | Estudiants d\'un curs | `courseService.ts` |
| POST | `/api/v1/courses/{slug}/topics/{topic}/problems/{problem}/submissions/` | Enviar solució | `courseService.ts` |

### Font de Dades Local (Fallback)

`/data.json` amb estructura:
```json
{
  "courses": [...],
  "students": [...]
}
```

### APIs de Tercers / Llibreries

| API / Llibreria | Ús |
|----------------|-----|
| **react-router-dom** | Navegació SPA (Links, Routes, useNavigate, useParams, useLocation) |
| **i18next + react-i18next** | Traduccions (useTranslation, i18n.changeLanguage) |
| **framer-motion** | Animacions (motion.div, AnimatePresence, whileInView, whileHover) |
| **axios** | Peticions HTTP als endpoints del backend |
| **canvas-confetti** | Animació de confeti en completar lliçons |
| **MUI (Material UI)** | Sistema de components (ThemeProvider, Box, Card, Button, etc.) |
| **localStorage API** | Persistència de: progrés, codi, punts, usuaris, tema, idioma, submissions, IDs eliminats |
| **Canvas API** | Fons interactiu de partícules (ParticlesBackground) |
| **window.dispatchEvent** | Comunicació entre components (auth-state-change, lessonProgressUpdated) |

---

## 7. Modes de la Lliçó (LessonPage.tsx)

| Mode | Descripció | Funcionalitat |
|------|------------|---------------|
| **Normal** | Mode estàndard | Edició lliure, +10 punts en completar |
| **Drill** | Temporitzador de 60s | Botó START, compte enrere, temps esgotat = fail |
| **Assist** | 3 pistes disponibles | Botó "Need help", mostra inici de la solució |
| **Hackathon** | 150 punts extra | Punts addicionals sobre els 10 base |

---

## 8. Instal·lació i Execució

```bash
npm install          # Instal·lar dependències
npm run dev          # Executar en desenvolupament (http://localhost:5173)
npm run build        # Construir per producció
npm run preview      # Previsualitzar producció
```
