import { X } from "lucide-react";
import type { Priority, Status } from "../../utils/taskStyles";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;

  taskTitle: string;
  setTaskTitle: (value: string) => void;

  taskStatus: Status;
  setTaskStatus: (value: Status) => void;

  taskPriority: Priority;
  setTaskPriority: (value: Priority) => void;

  taskDueDate: string;
  setTaskDueDate: (value: string) => void;

  titleError: string;
  dateError: string;

  onSubmit: () => void;

  isEditing?: boolean;
};

export function TaskModal({
  isOpen,
  onClose,
  taskTitle,
  setTaskTitle,
  taskStatus,
  setTaskStatus,
  taskPriority,
  setTaskPriority,
  taskDueDate,
  setTaskDueDate,
  titleError,
  dateError,
  onSubmit,
  isEditing = false,
}: TaskModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {isEditing ? "Edit Task" : "Add Task"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing ? "Update task information" : "Create a new task"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Task title
          </label>

          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {titleError && (
            <p className="mt-1.5 text-sm text-red-500">{titleError}</p>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value as Status)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-slate-700">
              Priority
            </label>

            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value as Priority)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col">
          <label className="mb-2 text-sm font-medium text-slate-700">
            Due Date
          </label>

          <input
            type="date"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {dateError && (
            <p className="mt-1.5 text-sm text-red-500">{dateError}</p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            {isEditing ? "Edit Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}