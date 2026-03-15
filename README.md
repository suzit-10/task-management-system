# Task Management Dashboard

A modern, responsive Task Management Dashboard built with React, TypeScript, and Vite. This application allows users to view, filter, sort, and manage tasks with a clean and intuitive user interface.

## 🚀 Features

- **Task Management**: Create, read, update, and delete tasks.
- **Granular Filtering & Sorting**: Filter tasks by status and assignees, and sort them strictly by due date or priority.
- **Real-time Feedback**: Integrated toast notifications for all CRUD operations using `react-hot-toast`.
- **Responsive Design**: Built with modern CSS/Tailwind utility classes for a seamless experience on all devices.
- **Form Validation**: Comprehensive front-end form validation (checking due dates, character lengths, and valid assignees).
- **Persistent Storage**: Uses local storage as a mock backend to persist user tasks between sessions, simulating real-world data fetching workflows.
- **Status & Priority Indicators**: Visual cues (colors, badges) for overdue tasks, priorities, and custom status.

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript, Vite
- **State Management**: React Hooks (Custom hooks for state isolation)
- **Feedback**: React Hot Toast
- **Styling**: Tailwind CSS
- **Icons**: Material Icons

## 🏗️ Architecture & Component Design

The architecture follows a modular approach separating concerns into logical domains:

1. **State Management (`hooks/`)**: 
   - `useTasks`: Encapsulates all interactions with the local persistence layer and state updates.
   - `useTaskFilters`: Isolates the complex filtering, sorting, and search state from the main UI logic.
   - `useModal`: A reusable toggle pattern for modal interfaces.
2. **Presentational Components (`components/`)**:
   - `Table`: Responsible only for rendering the data matrix and emitting actions.
   - `ControllerSection`: A grouped toolbar for global actions (add, filters, sorts).
   - `SummarySection`: Metrics aggregation.
3. **Utilities (`utils/taskUtils.ts`)**: Pure functions handling the heavy lifting of sorting, filtering, and options generation, keeping the components clean.

### ⚖️ Trade-offs & Decisions made

1. **Local State vs Global Store**: 
   - *Decision*: Used localized component state and custom hooks rather than pulling in external tools like Redux or Zustand. 
   - *Trade-off*: Keeps the bundle size small and architecture simple for a dashboard of this scale, though it introduces slight prop-drilling (`App.tsx` -> `ControllerSection`).
2. **Manual Form Validation vs External Library**:
   - *Decision*: Built custom validation logic in `AddTaskForm`.
   - *Trade-off*: Avoids dependency bloat from libraries like `react-hook-form` or `zod`, but requires more boilerplate and manual maintenance for field validations.
3. **Mock Backend (`localStorage`)**:
   - *Decision*: Simulates network requests using `localStorage` combined with an `initialData.json` fetch fallback.
   - *Trade-off*: Perfectly mirrors an asynchronous setup while maintaining immediate persistence without requiring a backend server.

## 🚀 Future Improvements & Next Steps

If this project were to be scaled further, the following additions would be prioritized:

1. **Global State Integration**: Introduce Context API or Zustand to eliminate prop-drilling for filter states and modal states.
2. **Server State Library**: Implement `React Query` (TanStack Query) to manage the caching, fetching, and background synchronizations smoothly when connecting to a real REST/GraphQL API.
3. **Form Refactoring**: Migrate to `react-hook-form` paired with `zod` for zero-re-render form validation schemas.
4. **Pagination / Virtualization**: For `Table.tsx`, implement row virtualization (e.g., `@tanstack/react-virtual`) or pagination to securely handle datasets scaling past 1,000+ items.
5. **Testing**: Implement unit tests with `Vitest` and `React Testing Library`, focusing on `taskUtils.ts` (filtering logic) and edge cases in form submission.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
git clone <repository-url>
cd task-management-dashboard
npm install
npm run dev
```
