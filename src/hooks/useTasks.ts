import { useState, useEffect } from "react";

export type TaskStatus = "new" | "in-progress" | "blocked" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority?: TaskPriority;
  assignee: string;
  dueDate: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = localStorage.getItem("tasks");

        // If data exists in localStorage, use it instead of fetching
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
          setLoading(false);
        } else {
          // If no data exists, fetch the initialData.json file
          const response = await fetch("./config/initialData.json");
          if (!response.ok) throw new Error("Failed to fetch initial tasks");

          const data = await response.json();
          const initialTasks = data.tasks || [];

          setTasks(initialTasks);
          localStorage.setItem("tasks", JSON.stringify(initialTasks));
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading tasks:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = (newTask: Omit<Task, "id">) => {
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const task = { ...newTask, id: newId };
    const updatedTasks = [...tasks, task];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
  };
};
