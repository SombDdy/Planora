import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/dateUtils";
import { getPriorityClasses } from "../../utils/taskStyles";
import type { Task } from "../../types/task";
import { users } from "../../data/users";
import type {
  DraggableSyntheticListeners,
  DraggableAttributes,
} from "@dnd-kit/core";

type TaskCardContentProps = {
  task: Task;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  listeners?: DraggableSyntheticListeners;
  attributes?: DraggableAttributes;
};

export function TaskCardContent({
  task,
  onEdit,
  onDelete,
  attributes,
  listeners,
}: TaskCardContentProps) {
  const assignee = users.find((user) => user.id === task.assigneeId);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <button
            {...listeners}
            {...attributes}
            className="mt-0.5 cursor-grab rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing"
          >
            <GripVertical size={18} />
          </button>

          <p className="font-medium text-slate-900">{task.title}</p>
        </div>
        {assignee ? (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
              {assignee.name[0]}
            </div>
            <span className="text-sm text-slate-600">
              {assignee.name}
            </span>
          </div>
        ) : (
          <span className="text-sm text-slate-400">
            Unassigned
          </span>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-500"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${getPriorityClasses(
              task.priority,
            )}`}
          />

          <span className="text-sm font-medium text-slate-700">
            {task.priority}
          </span>
        </div>

        <p className="text-sm text-slate-500">Due {formatDate(task.dueDate)}</p>
      </div>
    </div>
  );
}
