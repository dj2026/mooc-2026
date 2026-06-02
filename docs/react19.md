# Auditoria i Modernització React 19

## Resum

Migració completa del projecte a patrons React 19. S'han eliminat anti-patrons heredats de React 17/18 i redundàncies, sense alterar l'estil visual ni la lògica de negoci.

## Canvis realitzats

### 1. `src/main.tsx`
- **`import React from 'react'`** → **`import { StrictMode } from 'react'`**
- **`ReactDOM.createRoot`** → **`createRoot`**
- **`<React.StrictMode>`** → **`<StrictMode>`**
- **Motiu**: React 19 (com React 17+) té JSX transform automàtic. No cal `import React` per JSX. `createRoot` importat directament evita el namespace `ReactDOM`.

### 2. `src/App.tsx`
- **Dependència `useEffect`**: `[theme, theme.palette.mode]` → `[theme.palette.background.default]`
- **Motiu**: L'objecte `theme` canvia de referència innecessàriament. Dependre del valor primitiu (`string`) evita re-execucions de l'effect.

### 3. `src/contexts/ThemeContext.tsx`
- **Eliminat `useEffect`** que persitia `mode` a localStorage (línia 36-38)
- **Eliminat `useEffect` de l'import**
- **Motiu**: `setMode()` ja crida `localStorage.setItem()`. L'effect era redundant i afegia un cicle de render extra.

### 4. `src/contexts/I18nContext.tsx`
- **Eliminat `useEffect`** que persitia `language` a localStorage (línia 35-37)
- **Motiu**: `setLanguage()` ja crida `localStorage.setItem()`. L'effect era redundant.

### 5. `src/components/Header.tsx`
- **Eliminat estat `mounted`** i el seu `useEffect`
- **Eliminat guard `if (!mounted) return null`**
- **Motiu**: Patró necessari per SSR/hidratació. En app Vite client-side, `mounted` és `true` des del primer render.

### 6. `src/components/Footer.tsx`
- **`import React from 'react'`** → **`import type { ReactNode } from 'react'`**
- **`React.ReactNode`** → **`ReactNode`**
- **Motiu**: JSX transform automàtic. `import type` no impacta al bundle.

### 7. `src/pages/courses/LessonPage.tsx`
- **Eliminat estat `mounted`** (3 referències: declaració, effect, guard)
- **`if (mounted && baseLesson)`** → **`if (baseLesson)`**
- **`[baseLesson, mounted, ...]`** → **`[baseLesson, ...]`**
- **Motiu**: `baseLesson` ja fa de guard. `mounted` era redundant.

### 8. `src/features/student/Login.tsx`
- **`useEffect` + `useState([])`** → **`useState(() => { ... })`** amb lazy initializer
- **`const [students, setStudents]`** → **`const [students]`** (setter no usat)
- **Eliminat `useEffect` de l'import**
- **Motiu**: La lectura de localStorage és síncrona. El lazy initializer només s'executa un cop, evitant un render extra.

## Patrons no detectats (ja nets)

- ❌ `forwardRef` — No s'usa en cap fitxer
- ❌ `PropTypes` / `propTypes` — No s'usa en cap fitxer
- ❌ `defaultProps` — No s'usa en cap fitxer
- ❌ Class components — Tots són function components
- ❌ `findDOMNode` — No s'usa

## Dependències del projecte

```json
"react": "^19.2.7"
"react-dom": "^19.2.7"
"@types/react": "^19.2.16"
```
