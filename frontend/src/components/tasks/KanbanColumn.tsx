import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";
import type { WorkflowStatusColor } from "../../types/workflow";
import { getStatusIndicatorClasses } from "../../utils/taskStyles";

type KanbanColumnProps = {
  statusId: number;
  title: string;
  color: WorkflowStatusColor;
  count: number;
  children: ReactNode;
};

export function KanbanColumn({
  statusId,
  title,
  color,
  count,
  children,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: statusId,
  });

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${getStatusIndicatorClasses(
            color,
          )}`}
        />

        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>

        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-200 px-1.5 text-xs font-semibold text-slate-600">
          {count}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`min-h-96 rounded-xl border p-3 transition ${
          isOver
            ? "border-indigo-300 bg-indigo-50"
            : "border-slate-200 bg-slate-50"
        }`}
      >
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </div>
  );
}
