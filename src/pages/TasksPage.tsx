import {
  Plus,
  Search,
  X,
  Trash2,
  Pencil,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useState } from "react";

import { tasks } from "../data/tasks";
import { users } from "../data/users";
import { projects } from "../data/projects";
import { workflows } from "../data/workflows";
import { projectMembers } from "../data/projectMembers";
import { priorityOptions } from "../data/taskOptions";

import { getPriorityClasses, getStatusClasses, getStatusIndicatorClasses } from "../utils/taskStyles";
import { formatDate } from "../utils/dateUtils";

import type { Priority, Task } from "../types/task";

import { TaskModal } from "../components/tasks/TaskModal";
import { Dropdown } from "../components/ui/Dropdown";
import { Button } from "../components/ui/Button";

export function TasksPage() {
  const currentProject = projects.find((project) => project.id === 1);

  const currentWorkflow = workflows.find(
    (workflow) => workflow.id === currentProject?.workflowId,
  );

  const firstStatusId = currentWorkflow?.statuses[0]?.id ?? 1;
  const completedStatus = currentWorkflow?.statuses.at(-1);

  const [activeFilter, setActiveFilter] = useState<number | "All">("All");
  const [searchTask, setSearchTask] = useState("");
  const [sortBy, setSortBy] = useState("Due Date");
  const [openedModal, setOpenedModal] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatusId, setTaskStatusId] = useState<number>(firstStatusId);
  const [taskPriority, setTaskPriority] = useState<Priority>("High");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskAssigneeId, setTaskAssigneeId] = useState<number | null>(null);

  const [taskList, setTaskList] = useState(tasks);

  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  type InlineField = "assignee" | "dueDate" | "priority" | "status";

  const [inlineEditing, setInlineEditing] = useState<{
    taskId: number;
    field: InlineField;
  } | null>(null);

  if (!currentProject || !currentWorkflow) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Workflow not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            This project does not have a valid workflow.
          </p>
        </div>
      </div>
    );
  }

  const resetForm = () => {
    setTaskTitle("");
    setTaskStatusId(firstStatusId);
    setTaskPriority("Medium");
    setTaskDueDate("");
    setTitleError("");
    setDateError("");
    setTaskAssigneeId(null);
  };

  const handleAddTask = () => {
    if (!taskTitle || !taskDueDate) {
      if (!taskTitle) {
        setTitleError("Task title is required");
      }

      if (!taskDueDate) {
        setDateError("Due Date is required");
      }

      return;
    }

    const newTask: Task = {
      id: Date.now(),
      projectId: currentProject.id,
      title: taskTitle,
      assigneeId: taskAssigneeId,
      statusId: taskStatusId,
      priority: taskPriority,
      dueDate: taskDueDate,
    };

    setTaskList([...taskList, newTask]);

    resetForm();
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
    setTaskAssigneeId(editedTask.assigneeId);
    setTaskStatusId(editedTask.statusId);
    setTaskPriority(editedTask.priority);
    setTaskDueDate(editedTask.dueDate);
    setOpenedModal(true);
  };

  const handleUpdateTask = () => {
    const updatedTasks = taskList.map((task) =>
      task.id === editingTaskId
        ? {
            ...task,
            title: taskTitle,
            assigneeId: taskAssigneeId,
            statusId: taskStatusId,
            priority: taskPriority,
            dueDate: taskDueDate,
          }
        : task,
    );

    setTaskList(updatedTasks);
    resetForm();
    setEditingTaskId(null);
    setOpenedModal(false);
  };

  const handleInlineUpdate = (
    taskId: number,
    field: "assigneeId" | "dueDate" | "priority" | "statusId",
    value: number | string | null,
  ) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              [field]: value,
            }
          : task,
      ),
    );

    setInlineEditing(null);
  };

  const handleResetFilter = () => {
    setActiveFilter("All");
    setSortBy("Due Date");
    setSortDirection("asc");
    setSearchTask("");
  };

  const hasActiveFilters =
    activeFilter !== "All" ||
    searchTask !== "" ||
    sortBy !== "Due Date" ||
    sortDirection !== "asc";

  const filters = [
    { id: "All" as const, name: "All" },
    ...currentWorkflow.statuses.map((status) => ({
      id: status.id,
      name: status.name,
    })),
  ];

  const filteredTasks =
    activeFilter === "All"
      ? taskList
      : taskList.filter((task) => task.statusId === activeFilter);

  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTask.toLowerCase()),
  );

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const getStatusPosition = (statusId: number) => {
    return (
      currentWorkflow.statuses.find((status) => status.id === statusId)
        ?.position ?? 0
    );
  };

  const sortedTasks = [...searchedTasks].sort((a, b) => {
    let result = 0;

    if (sortBy === "Due Date") {
      result = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === "Priority") {
      result = priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === "Status") {
      result = getStatusPosition(a.statusId) - getStatusPosition(b.statusId);
    }

    return sortDirection === "asc" ? result : -result;
  });

  const deletingTask = taskList.find((task) => task.id === deletingTaskId);

  const currentProjectMembers = projectMembers.filter(
    (member) => member.projectId === currentProject.id,
  );

  const projectUsers = users.filter((user) =>
    currentProjectMembers.some((member) => member.userId === user.id),
  );

  const currentUser = users.find((user) => user.id === 1);

  const currentMember = currentProjectMembers.find(
    (member) => member.userId === currentUser?.id,
  );

  const canEditTask = (task: Task) => {
    if (currentMember?.role === "Owner" || currentMember?.role === "Admin") {
      return true;
    }

    if (currentMember?.role === "User" && task.assigneeId === currentUser?.id) {
      return true;
    }

    return false;
  };

  const canDeleteTask =
    currentMember?.role === "Owner" || currentMember?.role === "Admin";

  const canCreateTask = Boolean(currentMember);

  const assigneeOptions = [
    {
      value: "",
      label: "Unassigned",
      icon: (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-400">
          —
        </span>
      ),
    },

    ...projectUsers.map((user) => ({
      value: String(user.id),
      label: user.name,
      icon: (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
          {user.name[0].toUpperCase()}
        </span>
      ),
    })),
  ];

  const statusOptions = currentWorkflow.statuses.map((status) => ({
    value: String(status.id),
    label: status.name,
    indicatorClass: getStatusIndicatorClasses(status.color),
  }));

  return (
    <div>
      <div className="mt-4 flex w-full items-center justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-slate-900">My tasks</h1>

          <p className="text-base text-slate-500">
            Manage and track all your tasks.
          </p>
        </div>

        {canCreateTask && (
          <Button
            onClick={() => {
              resetForm();
              setEditingTaskId(null);
              setOpenedModal(true);
            }}
          >
            <Plus size={18} />
            Add Task
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 pt-5">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter.id === activeFilter
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {`${filter.name} ${
              filter.id === "All"
                ? taskList.length
                : taskList.filter((task) => task.statusId === filter.id).length
            }`}
          </button>
        ))}

        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-10 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {searchTask && (
            <button
              onClick={() => setSearchTask("")}
              className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-400 transition hover:text-slate-700"
            >
              <X />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
          <p>Sort by:</p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none"
          >
            <option>Due Date</option>
            <option>Priority</option>
            <option>Status</option>
          </select>

          <button
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? <ArrowUp /> : <ArrowDown />}
          </button>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilter}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Reset filters
          </button>
        )}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.5fr_80px] items-center gap-12 border-b border-slate-200 px-6 py-4">
          <p className="text-base font-medium text-slate-500">Task</p>
          <p className="text-base font-medium text-slate-500">Assignee</p>
          <p className="text-base font-medium text-slate-500">Due Date</p>
          <p className="text-base font-medium text-slate-500">Priority</p>
          <p className="text-base font-medium text-slate-500">Status</p>
          <p className="text-base font-medium text-slate-500">Actions</p>
        </div>

        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => {
            const assignee = users.find((user) => user.id === task.assigneeId);

            const taskStatus = currentWorkflow.statuses.find(
              (status) => status.id === task.statusId,
            );

            const today = new Date();

            const todayString = `${today.getFullYear()}-${String(
              today.getMonth() + 1,
            ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

            const isCompleted = task.statusId === completedStatus?.id;

            const isOverdue = task.dueDate < todayString && !isCompleted;

            const isDueToday = task.dueDate === todayString && !isCompleted;

            return (
              <div
                key={task.id}
                className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.5fr_80px] items-center gap-12 border-b border-slate-200 p-6 last:border-b-0"
              >
                <p>{task.title}</p>

                {inlineEditing?.taskId === task.id &&
                inlineEditing.field === "assignee" ? (
                  <Dropdown
                    value={
                      task.assigneeId === null ? "" : String(task.assigneeId)
                    }
                    options={assigneeOptions}
                    onChange={(value) =>
                      handleInlineUpdate(
                        task.id,
                        "assigneeId",
                        value === "" ? null : Number(value),
                      )
                    }
                    onClose={() => setInlineEditing(null)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (canEditTask(task)) {
                        setInlineEditing({
                          taskId: task.id,
                          field: "assignee",
                        });
                      }
                    }}
                    className={`flex w-fit items-center gap-2 rounded-lg px-2 py-1 text-left transition ${
                      canEditTask(task)
                        ? "cursor-pointer hover:bg-slate-100"
                        : "cursor-default"
                    }`}
                  >
                    {assignee ? (
                      <>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
                          {assignee.name[0].toUpperCase()}
                        </span>

                        <span className="text-sm text-slate-600">
                          {assignee.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-400">
                          —
                        </span>

                        <span className="text-sm text-slate-400">
                          Unassigned
                        </span>
                      </>
                    )}
                  </button>
                )}

                {inlineEditing?.taskId === task.id &&
                inlineEditing.field === "dueDate" ? (
                  <input
                    autoFocus
                    type="date"
                    value={task.dueDate}
                    onChange={(e) =>
                      handleInlineUpdate(task.id, "dueDate", e.target.value)
                    }
                    onBlur={() => setInlineEditing(null)}
                    className={`w-fit rounded-lg px-2 py-1 text-left transition ${
                      canEditTask(task)
                        ? "cursor-pointer hover:bg-slate-100"
                        : "cursor-default"
                    }`}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (canEditTask(task)) {
                        setInlineEditing({
                          taskId: task.id,
                          field: "dueDate",
                        });
                      }
                    }}
                    className={`w-fit rounded-lg px-2 py-1 text-left transition ${
                      isOverdue
                        ? "text-red-500"
                        : isDueToday
                          ? "text-amber-500"
                          : "text-slate-600"
                    } ${
                      canEditTask(task)
                        ? "cursor-pointer hover:bg-slate-100"
                        : "cursor-default"
                    }`}
                  >
                    {formatDate(task.dueDate)}
                  </button>
                )}

                {inlineEditing?.taskId === task.id &&
                inlineEditing.field === "priority" ? (
                  <Dropdown
                    value={task.priority}
                    options={priorityOptions}
                    onChange={(value) =>
                      handleInlineUpdate(task.id, "priority", value as Priority)
                    }
                    onClose={() => setInlineEditing(null)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (canEditTask(task)) {
                        setInlineEditing({
                          taskId: task.id,
                          field: "priority",
                        });
                      }
                    }}
                    className={`flex w-fit items-center gap-2 rounded-lg px-2 py-1 transition ${
                      canEditTask(task)
                        ? "cursor-pointer hover:bg-slate-100"
                        : "cursor-default"
                    }`}
                  >
                    <span
                      className={`h-3 w-3 rounded-full ${getPriorityClasses(
                        task.priority,
                      )}`}
                    />

                    <span className="text-base font-medium text-slate-700">
                      {task.priority}
                    </span>
                  </button>
                )}

                {inlineEditing?.taskId === task.id &&
                inlineEditing.field === "status" ? (
                  <Dropdown
                    value={String(task.statusId)}
                    options={statusOptions}
                    onChange={(value) =>
                      handleInlineUpdate(task.id, "statusId", Number(value))
                    }
                    onClose={() => setInlineEditing(null)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (canEditTask(task)) {
                        setInlineEditing({
                          taskId: task.id,
                          field: "status",
                        });
                      }
                    }}
                    className={`w-fit rounded-full px-3 py-1 text-sm font-medium transition ${
                      taskStatus
                        ? getStatusClasses(taskStatus.color)
                        : "bg-slate-100 text-slate-700"
                    } ${
                      canEditTask(task) ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    {taskStatus?.name ?? "Unknown"}
                  </button>
                )}

                <div className="flex items-center gap-1">
                  {canEditTask(task) && (
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-500"
                    >
                      <Pencil size={18} />
                    </button>
                  )}

                  {canDeleteTask && (
                    <button
                      onClick={() => setDeletingTaskId(task.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center">
            <p className="text-base font-medium text-slate-700">
              No tasks found
            </p>
          </div>
        )}
      </div>

      <TaskModal
        isOpen={openedModal}
        onClose={() => {
          resetForm();
          setEditingTaskId(null);
          setOpenedModal(false);
        }}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskAssigneeId={taskAssigneeId}
        setTaskAssigneeId={setTaskAssigneeId}
        taskStatusId={taskStatusId}
        setTaskStatusId={setTaskStatusId}
        taskPriority={taskPriority}
        setTaskPriority={setTaskPriority}
        taskDueDate={taskDueDate}
        setTaskDueDate={setTaskDueDate}
        titleError={titleError}
        dateError={dateError}
        onSubmit={editingTaskId ? handleUpdateTask : handleAddTask}
        isEditing={editingTaskId !== null}
        projectUsers={projectUsers}
        workflowStatuses={currentWorkflow.statuses}
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
              <Button
                variant="secondary"
                onClick={() => setDeletingTaskId(null)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteTask(deletingTaskId);
                  setDeletingTaskId(null);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
