import { useDraggable} from "@dnd-kit/core";
import type { Task } from "../../types/task";
import { TaskCardContent } from "./TaskCardContent";

type KanbanTaskCardProps = {
    task: Task;
    onEdit: (id: number) => void;
    onDelete: (id:number) => void;
    canDelete: boolean;
    canEdit: boolean;
};

export function KanbanTaskCard({task, onEdit, onDelete, canDelete, canEdit}: KanbanTaskCardProps) {
    const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

    return (
    <div ref={setNodeRef} className={isDragging ? "opacity-50" : ""}>
        <TaskCardContent task={task} onEdit={onEdit} onDelete={onDelete} attributes={attributes} listeners={listeners} canDelete={canDelete} canEdit={canEdit}/>
    </div>
  );
}