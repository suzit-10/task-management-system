import type { Task } from "../hooks/useTasks";
import type { FilterStatus, SortOption } from "../hooks/useTaskFilters";

export const getAssigneeOptions = (tasks: Task[]) => {
  const assignees = Array.from(new Set(tasks.map((t) => t.assignee)));
  return assignees.map((a) => ({ label: a, value: a }));
};

export const filterAndSortTasks = (
  tasks: Task[],
  filterStatus: FilterStatus,
  filterAssignees: string[],
  sortBy: SortOption,
): Task[] => {
  // Apply filters to tasks
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus === "all" || task.status === filterStatus;
    const assigneeMatch =
      filterAssignees.length === 0 || filterAssignees.includes(task.assignee);
    return statusMatch && assigneeMatch;
  });

  // Apply sorting
  if (sortBy === "dueDate") {
    filteredTasks.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  } else if (sortBy === "priority") {
    const pWeight: Record<string, number> = { high: 3, medium: 2, low: 1 };
    filteredTasks.sort((a, b) => {
      const wA = pWeight[(a.priority || "medium").toLowerCase()] || 0;
      const wB = pWeight[(b.priority || "medium").toLowerCase()] || 0;
      return wB - wA; // High priority first
    });
  }

  return filteredTasks;
};
