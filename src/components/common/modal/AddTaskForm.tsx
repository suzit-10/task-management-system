import { useState } from "react";
import type { Task, TaskStatus, TaskPriority } from "../../../hooks/useTasks";
import { statusOptions, priorityOptions } from "../../../constants/common";

export interface FormData {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
}

interface FormErrors {
  title?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  dueDate?: string;
}

interface TouchedFields {
  title?: boolean;
  status?: boolean;
  priority?: boolean;
  assignee?: boolean;
  dueDate?: boolean;
}

interface TaskFormProps {
  initialData?: Task | null;
  onSave?: (task: FormData) => void;
  onCancel?: () => void;
}

// Custom validation rules
const validateField = (name: keyof FormData, value: string): string => {
  switch (name) {
    case "title":
      if (!value.trim()) return "Title is required";
      if (value.trim().length < 3) return "Title must be at least 3 characters";
      if (value.trim().length > 100)
        return "Title must not exceed 100 characters";
      return "";

    case "assignee":
      if (!value.trim()) return "Assignee is required";
      if (value.trim().length < 2)
        return "Assignee name must be at least 2 characters";
      if (!/^[a-zA-Z\s]+$/.test(value.trim()))
        return "Assignee name should only contain letters and spaces";
      return "";

    case "dueDate": {
      if (!value) return "Due date is required";
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) return "Due date cannot be in the past";

      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 2);
      if (selectedDate > maxDate)
        return "Due date cannot be more than 2 years in the future";
      return "";
    }
    default:
      return "";
  }
};

export default function TaskForm({
  initialData,
  onSave,
  onCancel,
}: TaskFormProps) {
  // Compute initial form data based on props
  const getInitialFormData = (): FormData => {
    if (initialData) {
      return {
        title: initialData.title,
        status: initialData.status,
        priority: initialData.priority || "medium",
        assignee: initialData.assignee,
        dueDate: initialData.dueDate,
      };
    }
    return {
      title: "",
      status: "new",
      priority: "medium",
      assignee: "",
      dueDate: "",
    };
  };

  const [formData, setFormData] = useState<FormData>(getInitialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  // Handle prop changes without useEffect to avoid cascading renders

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof FormData]: value }));

    if (touched[name as keyof TouchedFields]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const allTouched = (Object.keys(formData) as Array<keyof FormData>).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as TouchedFields,
    );
    setTouched(allTouched);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (onSave) {
        onSave(formData);
      }
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-slate-700 mb-1"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${errors.title && touched.title
              ? "border-red-300 focus:ring-red-200 focus:border-red-400"
              : "border-slate-300 focus:ring-blue-200 focus:border-blue-400"
              }`}
            placeholder="Enter task title"
          />
          {errors.title && touched.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-semibold text-slate-700 mb-1"
          >
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none transition-all bg-white"
          >
            {statusOptions
              .filter((opt) => opt.value !== "all")
              .map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Priority <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {priorityOptions.map(({ label, value }) => (
              <label
                key={value}
                className={`flex-1 cursor-pointer transition-all ${formData.priority === value
                  ? value === "low"
                    ? "bg-green-500 text-white shadow-sm"
                    : value === "medium"
                      ? "bg-amber-500 text-white shadow-sm"
                      : "bg-red-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  } rounded-lg px-3 py-2 text-center text-sm font-medium`}
              >
                <input
                  type="radio"
                  name="priority"
                  value={value}
                  checked={formData.priority === value}
                  onChange={handleChange}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="assignee"
            className="block text-sm font-semibold text-slate-700 mb-1"
          >
            Assignee <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${errors.assignee && touched.assignee
              ? "border-red-300 focus:ring-red-200 focus:border-red-400"
              : "border-slate-300 focus:ring-blue-200 focus:border-blue-400"
              }`}
            placeholder="Enter assignee name"
          />
          {errors.assignee && touched.assignee && (
            <p className="mt-1 text-sm text-red-600">{errors.assignee}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-semibold text-slate-700 mb-1"
          >
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${errors.dueDate && touched.dueDate
              ? "border-red-300 focus:ring-red-200 focus:border-red-400"
              : "border-slate-300 focus:ring-blue-200 focus:border-blue-400"
              }`}
          />
          {errors.dueDate && touched.dueDate && (
            <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 font-semibold border-t">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 whitespace-nowrap border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-shrink-0 min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg transition-colors shadow-sm"
          >
            {initialData ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
