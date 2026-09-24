import { tasks } from "./tasks.data.js";

type CreateTaskData = {
  projectId: number;
  assigneeId: number | null;
  title: string;
  priority: "High" | "Medium" | "Low";
  statusId: number;
  dueDate: string;
};

type UpdateTaskData = {
  projectId?: number;
  assigneeId?: number | null;
  title?: string;
  priority?: "High" | "Medium" | "Low";
  statusId?: number;
  dueDate?: string;
};

export const createTask = (data: CreateTaskData) => {
  const ids = tasks.map((task) => task.id);
  const newId = Math.max(...ids) + 1;

  const newTask = {
    id: newId,
    projectId: data.projectId,
    assigneeId: data.assigneeId,
    title: data.title,
    priority: data.priority,
    statusId: data.statusId,
    dueDate: data.dueDate,
  };

  tasks.push(newTask);

  return newTask;
};

export const updateTask = (id: number, data: UpdateTaskData) => {
  const updatingTask = getTaskById(id);
  if (!updatingTask) {
    return;
  }
  if (data.projectId !== undefined) {
    updatingTask.projectId = data.projectId;
  }
  if (data.assigneeId !== undefined) {
    updatingTask.assigneeId = data.assigneeId;
  }
  if (data.title !== undefined) {
    updatingTask.title = data.title;
  }
  if (data.priority !== undefined) {
    updatingTask.priority = data.priority;
  }
  if (data.statusId !== undefined) {
    updatingTask.statusId = data.statusId;
  }
  if (data.dueDate !== undefined) {
    updatingTask.dueDate = data.dueDate;
  }
  return updatingTask;
};

export const getAllTasks = () => {
  return tasks;
};

export const getTaskById = (id: number) => {
  const exactTask = tasks.find((task) => task.id === id);
  return exactTask;
};
