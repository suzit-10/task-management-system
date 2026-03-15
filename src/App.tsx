import { useMemo, useState } from "react";
import Table from "./components/common/Table";
import SummarySection from "./components/SummarySection/SummarySection";
import ControllerSection from "./components/ControllerSection/Controller";
import { useTasks, type Task, type TaskStatus } from "./hooks/useTasks";
import Modal from "./components/common/modal/Modal";
import { useModal } from "./hooks/useModal";
import AddTaskForm, {
  type FormData as TaskFormData,
} from "./components/common/modal/AddTaskForm";
import DeleteConfirmationModal from "./components/common/modal/DeleteConfirmationModal";
import { getAssigneeOptions, filterAndSortTasks } from "./utils/taskUtils";
import { useTaskFilters } from "./hooks/useTaskFilters";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  // Initialize and provide tasks correctly
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();

  const { isOpen, close, open } = useModal();
  const {
    isOpen: isDeleteOpen,
    close: closeDelete,
    open: openDelete,
  } = useModal();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Filtering & Sorting State
  const {
    filterStatus,
    setFilterStatus,
    filterAssignees,
    setFilterAssignees,
    sortBy,
    setSortBy,
  } = useTaskFilters();

  const filteredAndSortedTasks = useMemo(
    () => filterAndSortTasks(tasks, filterStatus, filterAssignees, sortBy),
    [tasks, filterStatus, filterAssignees, sortBy],
  );

  if (loading) {
    return <div className="w-full p-4 text-center">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-500">
        Error loading tasks: {error}
      </div>
    );
  }

  const handleUpdateStatus = (id: number, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTask({ ...task, status: newStatus });
      toast.success(`Task status updated to ${newStatus}`);
    }
  };

  const handleAddClick = () => {
    setEditingTask(null);
    open();
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    open();
  };

  const handleDeleteClick = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTaskToDelete(task);
      openDelete();
    }
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      toast.success("Task deleted successfully");
      setTaskToDelete(null);
      closeDelete();
    }
  };

  const handleSaveForm = (formData: TaskFormData) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...formData });
      toast.success("Task updated successfully");
    } else {
      addTask({ ...formData, description: "" }); // Add default description to "" for new tasks as it has no assignee field in the form and no not displayed in the table
      toast.success("New task created");
    }
    close();
  };

  return (
    <div className="w-full p-4 max-w-screen-2xl mx-auto">
      <SummarySection tasks={tasks} />
      <ControllerSection
        onAddClick={handleAddClick}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        filterAssignees={filterAssignees}
        onFilterAssigneesChange={setFilterAssignees}
        assigneeOptions={getAssigneeOptions(tasks)}
      />
      <Table
        tasks={filteredAndSortedTasks}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
      />

      {/* Centralized Modal for Adding / Editing Tasks */}
      <Modal
        isOpen={isOpen}
        onClose={close}
        size="md"
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <AddTaskForm
          initialData={editingTask}
          onSave={handleSaveForm}
          onCancel={close}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        onConfirm={confirmDelete}
        title="Delete Task"
        itemName={taskToDelete?.title}
        itemType="task"
      />

      <Toaster position="bottom-right" />
    </div>
  );
};

export default App;
