import type { TaskPriority } from "../hooks/useTasks";
import type { FilterStatus, SortOption } from "../hooks/useTaskFilters";

const statusOptions: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "In-progress", value: "in-progress" },
  { label: "Blocked", value: "blocked" },
  { label: "Done", value: "done" },
];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Sort: Default", value: "default" },
  { label: "Sort: Due Date", value: "dueDate" },
  { label: "Sort: Priority", value: "priority" },
];

const priorityOptions: { label: string; value: TaskPriority }[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export { statusOptions, sortOptions, priorityOptions };
