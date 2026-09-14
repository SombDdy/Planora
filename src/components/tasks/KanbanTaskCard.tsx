import { useDraggable} from "@dnd-kit/core";
import type { Task } from "../../data/dashboard";
import { TaskCardContent } from "./TaskCardContent";

type KanbanTaskCardProps = {
    task: Task;
    onEdit: (id: number) => void;
    onDelete: (id:number) => void;
};

export function KanbanTaskCard({task, onEdit, onDelete}: KanbanTaskCardProps) {
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
        <TaskCardContent task={task} onEdit={onEdit} onDelete={onDelete} attributes={attributes} listeners={listeners}/>
    </div>
  );
}