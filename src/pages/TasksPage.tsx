import {
  Plus,
  Search,
  X,
  Trash2,
  Pencil,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { tasks } from "../data/dashboard";
import { useState } from "react";
import { getPriorityClasses, getStatusClasses } from "../utils/taskStyles";
import { formatDate } from "../utils/dateUtils";
import type { Priority, Status } from "../utils/taskStyles";

export function TasksPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTask, setSearchTask] = useState("");
  const [sortBy, setSortBy] = useState("Due Date");
  const [openedModal, setOpenedModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState<Status>("To Do");
  const [taskPriority, setTaskPriority] = useState<Priority>("High");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskList, setTaskList] = useState(tasks);
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const resetForm = () => {
    setTaskTitle("");
    setTaskStatus("To Do");
    setTaskPriority("Medium");
    setTaskDueDate("");
    setTitleError("");
    setDateError("");
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

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      status: taskStatus,
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

  const filters = ["All", "To Do", "In Progress", "Completed"];
  const filteredTasks =
    activeFilter === "All"
      ? taskList
      : taskList.filter((task) => task.status === activeFilter);
  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTask.toLowerCase()),
  );

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const statusOrder = {
    "To Do": 1,
    "In Progress": 2,
    Completed: 3,
  };

  const sortedTasks = [...searchedTasks].sort((a, b) => {
    let result = 0;
    if (sortBy === "Due Date") {
      result = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === "Priority") {
      result = priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === "Status") {
      result = statusOrder[a.status] - statusOrder[b.status];
    }
    return sortDirection === "asc" ? result : -result;
  });

  const deletingTask = taskList.find((task) => task.id === deletingTaskId);

  return (
    <div>
      <div className="flex items-center justify-between w-full mt-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-slate-900">My tasks</h1>
          <p className="text-base text-slate-500">
            Manage and track all your tasks.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTaskId(null);
            setOpenedModal(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-xl bg-indigo-500 transition hover:bg-indigo-600 "
        >
          <Plus size={18} /> Add Task
        </button>
      </div>
      <div className="flex items-center gap-2 pt-5">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === activeFilter
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {`${filter}  ${filter === "All" ? taskList.length : taskList.filter((task) => task.status === filter).length}`}
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
            onChange={(i) => setSortBy(i.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 outline-none text-sm"
          >
            <option>Due Date</option>
            <option>Priority</option>
            <option>Status</option>
          </select>
          <div>
            <button
              onClick={() =>
                setSortDirection(sortDirection === "asc" ? "desc" : "asc")
              }
            >
              {sortDirection === "asc" ? <ArrowUp /> : <ArrowDown />}
            </button>
          </div>
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
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white mt-8">
        <div className="grid grid-cols-[2fr_2fr_2fr_2fr_80px] items-center px-6 py-4 gap-12 border-b border-slate-200">
          <p className="text-base font-medium text-slate-500">Task</p>
          <p className="text-base font-medium text-slate-500">Status</p>
          <p className="text-base font-medium text-slate-500">Priority</p>
          <p className="text-base font-medium text-slate-500">Due Date</p>
          <p className="text-base font-medium text-slate-500">Actions</p>
        </div>
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => {
            const today = new Date();

            const todayString = `${today.getFullYear()}-${String(
              today.getMonth() + 1,
            ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
            const isOverdue =
              task.dueDate < todayString &&
              task.status !== "Completed";
            const isDueToday =
              task.dueDate === todayString &&
              task.status !== "Completed";

            return (
              <div
                key={task.id}
                className="grid grid-cols-[2fr_2fr_2fr_2fr_80px] p-6 gap-12 border-b border-slate-200 last:border-b-0"
              >
                <p>{task.title}</p>
                <p
                  className={`rounded-full px-3 py-1 text-sm font-medium w-fit ${getStatusClasses(task.status)}`}
                >
                  {task.status}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${getPriorityClasses(task.priority)}`}
                  />
                  <span className="text-base font-medium text-slate-700">
                    {task.priority}
                  </span>
                </div>
                <p
                  className={`${isOverdue === true ? "text-red-500" : isDueToday === true ? "text-amber-500" : "text-slate-600"}`}
                >
                  {formatDate(task.dueDate)}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-500"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setDeletingTaskId(task.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
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
      {openedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editingTaskId ? "Editing Task" : "Add Task"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">Create a new task</p>
              </div>

              <button
                onClick={() => {
                  resetForm();
                  setEditingTaskId(null);
                  setOpenedModal(false);
                }}
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
                onChange={(e) => {
                  setTaskTitle(e.target.value);
                  setTitleError("");
                }}
                placeholder="Enter task title..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              {titleError && (
                <p className="mt-1.5 text-sm text-red-500">{titleError}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value as Status)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 outline-none text-sm"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-slate-700">
                  Priority
                </label>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value as Priority)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 outline-none text-sm"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
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
                onChange={(e) => {
                  setTaskDueDate(e.target.value);
                  setDateError("");
                }}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              {dateError && (
                <p className="mt-1.5 text-sm text-red-500">{dateError}</p>
              )}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  resetForm();
                  setEditingTaskId(null);
                  setOpenedModal(false);
                }}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={editingTaskId ? handleUpdateTask : handleAddTask}
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
              >
                {editingTaskId ? "Edit Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
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
