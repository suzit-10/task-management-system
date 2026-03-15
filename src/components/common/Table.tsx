import { useMemo } from "react";
import { statusOptions } from "../../constants/common";
import Button from "./Button";
import { SingleSelect } from "./SingleSelect";
import type { Task, TaskStatus, TaskPriority } from "../../hooks/useTasks";

interface TableRowProps {
  task: Task;
  onUpdateStatus: (id: number, newStatus: TaskStatus) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const getPriorityDetails = (priority?: TaskPriority) => {
  switch (priority || "medium") {
    case "high":
      return { bg: "bg-red-100", text: "text-red-800", label: "High" };
    case "low":
      return { bg: "bg-green-100", text: "text-green-800", label: "Low" };
    case "medium":
    default:
      return { bg: "bg-amber-100", text: "text-amber-800", label: "Medium" };
  }
};

const TableRow = ({
  task,
  onUpdateStatus,
  onDelete,
  onEdit,
}: TableRowProps) => {
  const priorityInfo = getPriorityDetails(task.priority);

  const isOverdue = useMemo(() => {
    if (task.status === "done" || !task.dueDate) return false;
    const due = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today;
  }, [task.dueDate, task.status]);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 text-sm font-medium text-gray-900">
        {task.title}
      </td>
      <td className="py-4 px-6 max-w-[150px]">
        <SingleSelect
          placeholder="Select Status"
          value={task.status}
          onChange={(val) => onUpdateStatus(task.id, val as TaskStatus)}
          options={statusOptions?.filter((status) => status.value !== "all")}
        />
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 max-w-[80px]">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityInfo.bg} ${priorityInfo.text}`}
        >
          {priorityInfo.label}
        </span>
      </td>
      <td className="py-4 px-6 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
            {task.assignee.substring(0, 1).toUpperCase()}
          </div>
          <span>{task.assignee}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 max-w-[160px]">
        <div className="flex flex-col gap-1 items-start">
          <span>{task.dueDate}</span>
          {isOverdue && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border-red-200">
              OVERDUE
            </span>
          )}
        </div>
      </td>
      <td className="py-4 px-6 max-w-[100px]">
        <div className="flex gap-1 justify-end">
          <Button
            variant="icon"
            icon={<i className="material-icons text-lg text-blue-500">edit</i>}
            title="Edit Task"
            onClick={() => onEdit(task)}
          />
          <Button
            variant="icon"
            icon={<i className="material-icons text-lg text-green-500">done</i>}
            title="Mark as Done"
            onClick={() => onUpdateStatus(task.id, "done")}
          />
          <Button
            variant="icon"
            icon={<i className="material-icons text-lg text-red-500">delete</i>}
            title="Delete Task"
            onClick={() => onDelete(task.id)}
          />
        </div>
      </td>
    </tr>
  );
};

interface TableProps {
  tasks: Task[];
  onUpdateStatus: (id: number, newStatus: TaskStatus) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const Table = ({ tasks, onUpdateStatus, onDelete, onEdit }: TableProps) => {
  return (
    <div className="w-full h-[calc(100vh-15rem)] rounded-lg border border-gray-200 shadow-sm mt-4 overflow-hidden">
      <div className="h-full overflow-auto">
        <table className="w-full border-collapse min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">
                Title
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-w-[100px]">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Priority
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Assignee
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Due Date
              </th>
              <th className="py-3 px-6 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow
                  key={task.id}
                  task={task}
                  onUpdateStatus={onUpdateStatus}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
