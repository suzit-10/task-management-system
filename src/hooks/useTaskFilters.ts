import { useState } from "react";
import type { TaskStatus } from "./useTasks";

export type FilterStatus = TaskStatus | "all";
export type SortOption = "default" | "dueDate" | "priority";

export const useTaskFilters = () => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterAssignees, setFilterAssignees] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const resetFilters = () => {
    setFilterStatus("all");
    setFilterAssignees([]);
    setSortBy("default");
  };

  return {
    filterStatus,
    setFilterStatus,
    filterAssignees,
    setFilterAssignees,
    sortBy,
    setSortBy,
    resetFilters,
  };
};
