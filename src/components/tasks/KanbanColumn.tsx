import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

type KanbanColumnProps = {
  status: string;
  title: string;
  count: number;
  children: ReactNode;
};

export function KanbanColumn({
  status,
  title,
  count,
  children,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>

        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-100 px-1.5 text-xs font-semibold text-indigo-600">
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
