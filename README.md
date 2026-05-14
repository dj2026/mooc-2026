# MOOC React 2026

Plataforma d'aprenentatge online per a desenvolupadors, construïda amb tecnologies modernes del 2026.

---

## 1. Dependències Clau

### Per què Vite?

| Característica | Benefici |
|----------------|----------|
| **Build ràpid** | Utilitza esbuild i Rollup per compilacions 10-100x més ràpides que webpack |
| **HMR instantani** | Actualització en calent immediata sense recarregar la pàgina |
| **Experiència de desenvolupament** | Configuració mínima, funciona out-of-the-box |
| **Optimització de producció** | Bundle size optimitzat automàticament |

### Per què React?

- **Componentització**: Reutilització de codi amb components modulars
- **Virtual DOM**: Renderitzat eficient amb diferència mínima
- **Ecosistema**: Major llibreria de llibreries i comunitat activa
- **Hooks**: Lògica d'estat reutilitzable amb `useState`, `useEffect`, `useCallback`, etc.

### Per què Material UI (MUI)?

- **Components professionals**: Botons, cards, formularis, navegació llestos per usar
- **Disseny system**: Tots els components segueixen Material Design
- **Personalització**: Tema propi (dark mode, colors de la marca)
- **Accessibilitat**: Components accessibles per defecte

---

## 2. Arquitectura de Fitxers

### Estructura General

```
src/
├── main.tsx                    # Punt d'entrada de l'aplicació
├── App.tsx                     # Router principal i configuració
├── index.css                   # Estils globals
├── components/                 # Components reutilitzables
│   ├── Header.tsx              # Barra de navegació amb autenticació
│   ├── Hero.tsx                # Secció hero amb typewriter i estadístiques
│   ├── Footer.tsx              #Peu de pàgina amb enllaços
│   ├── CourseCard.tsx          # Targeta de curs per a la llista
│   ├── ParticlesBackground.tsx # Fons interactiu amb Canvas
│   └── ui/                     # Components UI personalitzats
│       ├── Card.tsx            # Wrapper de Card MUI
│       └── badge.tsx           # Badge/etiqueta per nivell
├── pages/                      # Pàgines principals
│   ├── Home.tsx                # Pàgina principal amb llistat de cursos
│   ├── courses/
│   │   ├── CourseLessons.tsx  # Llista de lliçons d'un curs
│   │   └── LessonPage.tsx     # Editor de codi interactiu
│   └── dashboards/
│       └── StudentDashboard.tsx  # Àrea personal de l'estudiant
├── services/                     # Capa d'accés a dades
│   ├── api.ts                    # Client Axios + gestió de progrés
│   ├── authService.ts            # Autenticació (API + fallback local)
│   └── courseService.ts          # Gestió de cursos i lliçons
├── theme/                        # Configuració del tema
│   └── theme.ts                  # Tema MUI dark personalitzat
└── types/                        # Definicions de Tipus TypeScript
    └── index.ts                  # Interfícies per a Course, Lesson, Student
```

### Responsabilitat de Cada Fitxer

| Fitxer | Responsabilitat |
|--------|-----------------|
| `main.tsx` | Inicialitza React amb `BrowserRouter`, `ThemeProvider` de MUI i `StrictMode` |
| `App.tsx` | Defineix les rutes amb `react-router-dom` (`/`, `/courses/:id`, `/courses/:id/:lessonId`, `/dashboards/student`) |
| `Header.tsx` | Navegació responsive, botó d'accés alumnes, estat d'autenticació |
| `Hero.tsx` | Secció d'inici amb efecte typewriter, comptador de cursos/estudiants, fons de partícules |
| `CourseCard.tsx` | Targeta visual per a cada curs amb imatge, nivell, durada i instructor |
| `Footer.tsx` | Enllaços de navegació, xarxes socials, any de copyright |
| `ParticlesBackground.tsx` | Canvas interactiu amb partícules que reaccionen al mouse |
| `Home.tsx` | Carrega cursos des de `courseService`, mostra `CourseCard` en grid |
| `CourseLessons.tsx` | Llista les lliçons d'un curs des de `data.json` |
| `LessonPage.tsx` | Editor de codi amb modes (normal, drill, assist, hackathon), consola, temporitzador, validació |
| `StudentDashboard.tsx` | Login per estudiants, progrés per curs, ranking, selecció de curs |
| `api.ts` | Client Axios amb fallback local, sincronització progrés (localStorage + API) |
| `authService.ts` | Login/logout amb API real o `data.json` local com a fallback |
| `courseService.ts` | CRUD de cursos, lliçons, enviament de reptes |
| `theme.ts` | Tema MUI dark amb colors personalitzats (primary: #a855f7) |
| `types/index.ts` | Interfícies TypeScript: `Course`, `Lesson`, `Student`, `DataStructure` |

---

## 3. Flux de Dades

### Diagrama de Renderitzat

```
index.html
    │
    ▼
main.tsx (ReactDOM.createRoot)
    │
    ├── <BrowserRouter> ──▶ Historial del navegador
    ├── <ThemeProvider>  ──▶ Context de tema MUI
    │
    ▼
App.tsx (Routes)
    │
    ├── /                    ──▶ Home.tsx
    │                            │
    │                            ▼
    │                       courseService.getAllCourses()
    │                            │
    │                            ▼
    │                       [Course[]]
    │                            │
    │                            ▼
    │                       CourseCard × N
    │
    ├── /courses/:courseId     ──▶ CourseLessons.tsx
    │                              │
    │                              ▼
    │                         fetch('/data.json')
    │                              │
    │                              ▼
    │                         [Lesson[]]
    │
    ├── /courses/:courseId/:lessonId  ──▶ LessonPage.tsx
    │                                        │
    │                                        ├── fetch('/data.json')
    │                                        ├── localStorage (codi usuari)
    │                                        ├── api.postProgress()
    │                                        └── Validació de solució
    │
    └── /dashboards/student     ──▶ StudentDashboard.tsx
                                       │
                                       ├── authService.login()
                                       ├── api.getStudentProgress()
                                       └── Càlcul de progrés per curs
```

### Com Reben Dades els Components MUI

Els components de MUI reben dades a través de:

1. **Props directes**: `<Button variant="contained">Text</Button>`
2. **Props d'estil** (sx): `<Box sx={{ bgcolor: '#0f0a1e' }}>`
3. **Theme Provider**: Tots els fills tenen accés a `theme.palette.primary.main`
4. **Dades dinàmiques**: Passades des del pare via props o hooks

**Exemple** (`CourseCard.tsx`):
```tsx
interface Course {
  id: string;
  title: string;
  level: string;
  // ...
}

export function CourseCard({ course, index }: CourseCardProps) {
  // Dades rebudes com a props
  // Renderitzat amb MUI Card, Typography, Box
}
```

---

## 4. Integració d'APIs

### Crides Externes (fetch / axios)

#### `api.ts` - Gestió de Progrés

```typescript
// Endpoints utilitzats:
GET  /api/progress/{studentId}    → Obtenir progrés de l'estudiant
POST /api/progress                 → Guardar progrés d'una lliçó
DELETE /api/progress/{studentId}/{courseId}  → Reiniciar curs
```

**Gestió de Resposta**:
- **Èxit**: Actualitza `localStorage` + estat de React
- **Error (API Offline)**: Fa servir dades locals de `localStorage`
- **Sincronització híbrida**: Fusiona dades locals i remotes (API té preferència)

#### `authService.ts` - Autenticació

```typescript
// Endpoints utilitzats:
POST /api/users/auth/login/     → Login usuari
POST /api/users/auth/logout/    → Logout usuari
GET  /api/users/me/settings/     → Obtenir dades de l'usuari
```

**Gestió de Resposta**:
- **Èxit**: Guarda token i usuari a `localStorage`
- **Error**: Fa fallback a `data.json` local per a desenvolupament

#### `courseService.ts` - Cursos i Lliçons

```typescript
// Endpoints utilitzats:
GET  /api/v1/courses/                              → Llistat de cursos
GET  /api/v1/courses/{slug}/                       → Detalls d'un curs
GET  /api/v1/courses/{slug}/topics/                → Lliçons del curs
GET  /api/v1/courses/{slug}/students/              → Estudiants del curs
POST /api/v1/courses/{slug}/topics/{topic}/problems/{problem}/submissions/  → Enviar solució
```

**Gestió de Resposta**:
- **Èxit**: Retorna `Course[]`, `Lesson[]`, `Student[]`
- **Error**: Carrega `data.json` des de `/public/` com a fallback local

### Font de Dades Local (Fallback)

Quan l'API no està disponible, l'aplicació carrega `public/data.json`:

```json
{
  "courses": [...],
  "students": [...]
}
```

**Flux**:
1. L'aplicació intenta cridar l'API
2. Si falla, mostra un warning a consola
3. Carrega automàticament el fitxer local
4. L'usuari pot continuar utilitzant l'app en mode "proves"

---

## 5. Estat de React

### useState - Gestió Local

| Component | Estat | Propòsit |
|-----------|-------|----------|
| `Home` | `coursesList`, `loading` | Llistat de cursos i estat de càrrega |
| `LessonPage` | `userInput`, `status`, `consoleOutput` | Codi de l'usuari, resultat de tests, sortida de consola |
| `StudentDashboard` | `selectedStudent`, `dbProgress`, `expandedCourse` | Usuari actiu, progrés per curs, curs expandit |
| `Hero` | `apiStats` | Comptador de cursos/estudiants |

### useEffect - Efectes Secundaris

```tsx
// Exemple: Carregar cursos en muntar el component
useEffect(() => {
  const fetchCourses = async () => {
    const data = await courseService.getAllCourses();
    setCoursesList(data);
  };
  fetchCourses();
}, []);
```

### useCallback - Funcions Optimitzades

```tsx
const fetchProgress = useCallback(async (studentId: string) => {
  const progressMap = await api.getStudentProgress(studentId);
  setDbProgress(progressMap);
}, []);
```

---

## 6. Instal·lació i Execució

### Requisits

- Node.js 18+
- npm o yarn

### Comandes

```bash
# Instal·lar dependències
npm install

# Executar en desenvolupament
npm run dev

# Construir per producció
npm run build

# Previsualitzar producció
npm run preview
```

### Variables d'Entorn

Crea un fitxer `.env` si cal:

```env
VITE_API_URL=http://localhost:8080/api
```

---

## 7. Tecnologies Utilitzades

| Categoria | Llibreria | Versió |
|------------|-----------|--------|
| **Framework** | React | 18.3.1 |
| **Build** | Vite | 6.0.0 |
| **UI** | @mui/material | 9.0.0 |
| **Estils** | @emotion/react | 11.14.0 |
| **HTTP** | axios | 1.15.0 |
| **Routing** | react-router-dom | 6.30.3 |
| **Animacions** | framer-motion | 12.38.0 |
| **Icons** | lucide-react | 0.577.0 |
| **Tipus** | TypeScript | 5.5.0 |

---

## 8. Modes de la Lliçó (`LessonPage.tsx`)

| Mode | Descripció |
|------|------------|
| **Normal** | Mode estàndard, l'estudiant pot practicar lliurement |
| **Drill** | Temporitzador de 60 segons, repte ràpid |
| **Assist** | Pistes disponibles per a principiants |
| **Hackathon** | Punts extres (150 pts) per completar reptes |

---

## 9. Estructura del Tema

El tema MUI dark està definit a `src/theme/theme.ts`:

```typescript
{
  palette: {
    mode: 'dark',
    primary: { main: '#a855f7' },    // Violeta
    secondary: { main: '#ec4899' },  // Rosa
    background: { default: '#0f0a1e' }
  }
}
```

---

*Document generat automàticament per opencode - Technical Writer*
