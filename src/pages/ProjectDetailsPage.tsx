import { useParams, useNavigate } from "react-router-dom";
import { projects, tasks } from "../data/dashboard";
import { MoveLeft, Plus } from "lucide-react";
import { formatDate } from "../utils/dateUtils";
import { useState } from "react";
import { TaskModal } from "../components/tasks/TaskModal";
import type { Priority, Status } from "../utils/taskStyles";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { KanbanTaskCard } from "../components/tasks/KanbanTaskCard";
import { KanbanColumn } from "../components/tasks/KanbanColumn";
import { TaskCardContent } from "../components/tasks/TaskCardContent";

const kanbanColumns = [
  {
    title: "To Do",
    status: "To Do",
  },
  {
    title: "In Progress",
    status: "In Progress",
  },
  {
    title: "Completed",
    status: "Completed",
  },
];

export function ProjectDetailsPage() {
  const [openedModal, setOpenedModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState<Status>("To Do");
  const [taskPriority, setTaskPriority] = useState<Priority>("Medium");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [taskList, setTaskList] = useState(tasks);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { projectId } = useParams();

  const project = projects.find((proj) => proj.id === Number(projectId));

  if (!project) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-12 py-10 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Project not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The project you're looking for doesn't exist.
          </p>

          <button
            onClick={() => navigate("/projects")}
            className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <MoveLeft size={18} />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const resetForm = () => {
    setTaskTitle("");
    setTaskStatus("To Do");
    setTaskPriority("Medium");
    setTaskDueDate("");
    setTitleError("");
    setDateError("");
  };

  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      setTitleError("Task title is required");
      return;
    }

    if (!taskDueDate) {
      setDateError("Due date is required");
      return;
    }

    setTaskList((prev) => {
      const newId =
        prev.length === 0 ? 1 : Math.max(...prev.map((task) => task.id)) + 1;

      const newTask = {
        id: newId,
        title: taskTitle,
        status: taskStatus,
        priority: taskPriority,
        dueDate: taskDueDate,
        projectId: project.id,
      };

      return [...prev, newTask];
    });

    setTaskTitle("");
    setTaskStatus("To Do");
    setTaskPriority("Medium");
    setTaskDueDate("");

    setTitleError("");
    setDateError("");

    setOpenedModal(false);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTasks);
  };

  const handleEditTask = (id: number) => {
    const editedTask = taskList.find((task) => task.id === id);
    if (!editedTask) return;
    setEditingTaskId(editedTask.id);
    setTaskTitle(editedTask.title);
    setTaskStatus(editedTask.status);
    setTaskPriority(editedTask.priority);
    setTaskDueDate(editedTask.dueDate);
    setOpenedModal(true);
  };

  const handleUpdateTask = () => {
    const updateTasks = taskList.map((task) =>
      task.id === editingTaskId
        ? {
            ...task,
            title: taskTitle,
            status: taskStatus,
            priority: taskPriority,
            dueDate: taskDueDate,
          }
        : task,
    );
    setTaskList(updateTasks);
    resetForm();
    setEditingTaskId(null);
    setOpenedModal(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTaskId(null);

    if (!over) return;

    const currentTask = taskList.find((task) => task.id === active.id);

    if (!currentTask) return;

    if (currentTask.status === over.id) return;

    setTaskList((prev) =>
      prev.map((task) =>
        task.id === active.id
          ? {
              ...task,
              status: over.id as Status,
            }
          : task,
      ),
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(event.active.id as number);
  };

  const projectTasks = taskList.filter((task) => task.projectId === project.id);
  const completedTasks = projectTasks.filter(
    (task) => task.status === "Completed",
  ).length;
  const progress =
    projectTasks.length === 0
      ? 0
      : Math.round((completedTasks / projectTasks.length) * 100);

  const deletingTask = taskList.find((task) => task.id === deletingTaskId);
  const activeTask = taskList.find((t) => t.id === activeTaskId);

  return (
    <div className="flex w-full flex-col">
      <button
        onClick={() => navigate("/projects")}
        className="mt-4 flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <MoveLeft size={18} />
        Back to Projects
      </button>

      <div className="mt-8">
        <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>

        <p className="mt-2 text-base text-slate-500">{project.description}</p>
      </div>

      <div className="mt-8 flex items-center gap-12 border-b border-slate-200 pb-8">
        <div>
          <p className="text-sm text-slate-400">Due date</p>
          <p className="mt-1 font-medium text-slate-800">
            {formatDate(project.dueDate)}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Tasks</p>
          <p className="mt-1 font-medium text-slate-800">
            {projectTasks.length} tasks
          </p>
        </div>

        <div className="w-52">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Progress</p>

            <p className="text-sm font-medium text-slate-700">{progress}%</p>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Board</h2>

          <button
            onClick={() => {
              resetForm();
              setEditingTaskId(null);
              setOpenedModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="mt-5 grid grid-cols-3 gap-5">
            {kanbanColumns.map((c) => {
              const columnTasks = projectTasks.filter(
                (task) => task.status === c.status,
              );

              return (
                <KanbanColumn
                  key={c.status}
                  status={c.status}
                  title={c.title}
                  count={columnTasks.length}
                >
                  {columnTasks.map((t) => (
                    <KanbanTaskCard
                      key={t.id}
                      task={t}
                      onEdit={handleEditTask}
                      onDelete={setDeletingTaskId}
                    />
                  ))}
                </KanbanColumn>
              );
            })}
          </div>
          <DragOverlay>
            {activeTask !== undefined && (
              <TaskCardContent
                task={activeTask}
                onEdit={handleEditTask}
                onDelete={setDeletingTaskId}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
      <TaskModal
        isOpen={openedModal}
        onClose={() => {
          setOpenedModal(false);
          setTaskTitle("");
          setTaskStatus("To Do");
          setTaskPriority("Medium");
          setTaskDueDate("");
          setTitleError("");
          setDateError("");
        }}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskStatus={taskStatus}
        setTaskStatus={setTaskStatus}
        taskPriority={taskPriority}
        setTaskPriority={setTaskPriority}
        taskDueDate={taskDueDate}
        setTaskDueDate={setTaskDueDate}
        titleError={titleError}
        dateError={dateError}
        onSubmit={editingTaskId ? handleUpdateTask : handleAddTask}
        isEditing={editingTaskId !== null}
      />
      {deletingTaskId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900">
              Delete Task
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {`Are you sure you want to delete "${deletingTask?.title}" task?`}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeletingTaskId(null)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteTask(deletingTaskId);
                  setDeletingTaskId(null);
                }}
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
