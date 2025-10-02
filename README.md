# Todo App (Next.js 15)

A modern, accessible, and performant task manager built with Next.js 15, React 19, and Tailwind CSS 4. The app demonstrates clean architecture, component-driven development, and pragmatic state management with local persistence.

---

## Features

- **Task CRUD**: Add, edit, toggle complete, delete, and reorder tasks.
- **Filtering & Stats**: View All/Active/Completed and see live counts.
- **Drag & Drop**: Reorder tasks via `@dnd-kit` with keyboard support.
- **Theming & Color**: Light/dark theme and primary color selection.
- **Responsive UI**: Built with an accessible component system (`components/ui/`).
- **Local Persistence**: Tasks are persisted in localStorage.
- **Tested**: Unit tests with Vitest and Testing Library.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS 4, shadcn-inspired components in `components/ui/`
- **Drag & Drop**: `@dnd-kit/*`
- **Forms**: `react-hook-form`, `zod` (validation-ready)
- **Query Client**: `@tanstack/react-query`
- **Icons**: `lucide-react`
- **Theming**: `next-themes`
- **Charts**: `recharts`
- **Tests**: Vitest + Testing Library (jsdom)

---

## Getting Started

### Prerequisites

- Node.js ≥ 18.18
- Package manager: pnpm (recommended), npm, or yarn

### AI Setup (OpenAI)

- This project includes optional AI features (task parsing) powered by OpenAI.
- Set your API key in a local `.env` file at the project root:
  ```bash
  OPENAI_API_KEY=your_openai_api_key
  ```
  The key is required for AI features; the app otherwise works without AI.

### Install dependencies

```bash
# pnpm (recommended)
pnpm install

# or npm
yarn install

# or yarn
npm install
```

### Run in development

```bash
pnpm dev
# open http://localhost:3000
```

### Type check & lint
```bash
pnpm typecheck
pnpm lint        # next lint
```

### Run tests
```bash
pnpm test        # vitest
pnpm test:ui     # vitest --ui
pnpm test:watch  # watch mode
pnpm coverage    # coverage report
```

### Build & start (production)
```bash
pnpm build
pnpm start
```

---

## Project Structure

```text
app/                # Next.js App Router (pages, layouts, server components)
components/
  index.ts          # Barrel exports for public components
  <feature>/        # Folder-based components (code-split friendly)
    index.tsx       # Component implementation
    types.ts        # Co-located types for the component
  ui/               # Reusable, accessible UI primitives (tabs, dialog, etc.)
hooks/              # Reusable React hooks (e.g., use-tasks, use-task-counts)
lib/                # Utilities, storage, domain helpers
public/             # Static assets
styles/             # Global styles (Tailwind)
types/              # App-wide shared type exports
```

Key files:

- `app/page.tsx`: Main screen wiring together form, filters, list, and stats.
- `components/index.ts`: Barrel for importing components as `import { TaskList } from "@/components"`.
- `lib/storage.ts`: Local persistence (read/write user tasks).
- `lib/task-utils.ts`: Domain helpers (formatting, sorting, etc.).
- `components/ui/*`: Accessible UI primitives used by feature components.

---

## Architecture & Design

- **Component Folders**: Each feature component lives in its own folder with `index.tsx` and `types.ts` for clearer ownership, better code splitting, and tree-shaking.
- **Barrel Exports**: `components/index.ts` re-exports public components to simplify imports and maintain a stable API surface.
- **State Management**: Local component state + domain hooks in `hooks/` (`use-tasks`, `use-task-counts`).
- **Persistence**: `lib/storage.ts` manages localStorage persistence; pure functions are unit-test friendly.
- **UI Primitives**: `components/ui/` encapsulates styling and accessibility concerns, keeping feature components focused on domain logic.
- **Styling**: Tailwind CSS utility-first styles with `cn()` helper for conditional classNames.

---

## Conventions

- **Imports**: Prefer the barrel export for public components:
  ```ts
  import { TaskForm, TaskList, TaskFilters } from "@/components/index";
  ```
- **Types**: Co-locate component-specific types in `types.ts` next to the component.
- **Testing**: Co-locate tests under `components/__tests__/` or relevant package test directories.
- **Accessibility**: UI primitives aim for good a11y out of the box; validate via testing when adding new interactions.

---

## Deployment

- Build the app with `pnpm build`; output is optimized for the Next.js runtime.
- Host on Vercel or any Node-compatible environment.
- Ensure Node runtime >= 18 and set `NEXT_PUBLIC_` envs if you add any.

---

## Local Storage & Data

- Tasks are stored client-side in `localStorage` by `lib/storage.ts`.
- No backend is required.
