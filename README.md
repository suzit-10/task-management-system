# Task Management Dashboard

A Task Management Dashboard built with React, TypeScript, and Vite. This application allows users to view, filter, sort, and manage tasks with a clean and intuitive user interface.

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **Granular Filtering & Sorting**: Filter tasks by status and assignees, and sort them strictly by due date or priority.
- **Real-time Feedback**: Integrated toast notifications for all CRUD operations using `react-hot-toast`.
- **Form Validation**: Comprehensive front-end form validation (checking due dates, character lengths, and valid assignees).
- **Persistent Storage**: Uses local storage as a mock backend to persist user tasks.
- **Status & Priority Indicators**: Visual cues for overdue tasks, priorities, and custom status.

## Tech Stack

- **Core**: React 19, TypeScript, Vite
- **State Management**: React Hooks (Custom hooks for state isolation)
- **Feedback**: React Hot Toast
- **Styling**: Tailwind CSS (loaded via `@tailwindcss/browser` CDN for prototype simplicity)
- **Icons**: Material Icons

## Architecture & Component Design

The architecture follows a modular approach separating concerns into logical domains:

1. **State Management (`hooks/`)**:
   - `useTasks`: Encapsulates all interactions with the local persistence layer and state updates.
   - `useTaskFilters`: Isolates the filtering and sorting state from the main UI logic.
   - `useModal`: A reusable toggle pattern for modal interfaces.
2. **Presentational Components (`components/`)**:
   - `Table`: Responsible only for rendering the data matrix and emitting actions.
   - `ControllerSection`: A grouped toolbar for global actions (add, filters, sorts).
   - `SummarySection`: Metrics aggregation.
3. **Utilities (`utils/taskUtils.ts`)**: Pure functions handling the heavy lifting of sorting, filtering, and options generation, keeping the components clean.

### Trade-offs & Decisions Made

1. **Local State vs Global Store**:
   - *Decision*: Used localized component state and custom hooks rather than pulling in external tools like Redux or Zustand.
   - *Trade-off*: Keeps the bundle size small and architecture simple for a dashboard of this scale, though it introduces slight prop-drilling (`App.tsx` → `ControllerSection`).

2. **Manual Form Validation vs External Library**:
   - *Decision*: Built custom validation logic in `AddTaskForm` using a `validateField` pure function with touched/blur-aware error display.
   - *Trade-off*: Avoids dependency bloat from libraries like `react-hook-form` or `zod`, but requires more boilerplate and manual maintenance for field validations.

3. **Mock Backend (`localStorage`)**:
   - *Decision*: Simulates network requests using `localStorage` combined with an `initialData.json` fetch fallback.
   - *Trade-off*: Mirrors an asynchronous setup (loading/error states) while maintaining immediate persistence without requiring a backend server. The limitation is that mutations are not synced across multiple browser tabs and the stored data is not schema-validated on load.

4. **ID Generation (`Math.max`)**:
   - *Decision*: New task IDs are assigned using `Math.max(...tasks.map(t => t.id)) + 1`.
   - *Trade-off*: Simple and readable for a single-user, single-tab prototype. Not collision-safe for concurrent sessions — a `crypto.randomUUID()` or `nanoid()` would be the production choice.

5. **`description` Field Scope**:
   - *Decision*: The `Task` model includes a `description` field (seeded via `initialData.json`), but the form UI intentionally omits it to keep scope focused.
   - *Trade-off*: Reduces form complexity. Existing descriptions are preserved through edits since the save handler spreads over the original task object — only new tasks default to `""`.

## Future Improvements & Next Steps

If this project were to be scaled further, the following additions would be prioritized:

1. **Global State Integration**: Introduce Context API or Zustand to eliminate prop-drilling for filter states and modal states.
2. **Server State Library**: Implement `React Query` (TanStack Query) to manage caching, fetching, and background synchronization when connecting to a real REST/GraphQL API.
3. **Form Refactoring**: Migrate to `react-hook-form` paired with `zod` for zero-re-render form validation schemas.
4. **Pagination / Virtualization**: For `Table.tsx`, implement row virtualization (e.g., `@tanstack/react-virtual`) or pagination to handle datasets scaling.

## Testing

Automated tests are not yet implemented.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
git clone git@github.com:suzit-10/task-management-system.git
cd task-management-system
npm install
npm run dev
```
