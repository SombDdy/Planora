import type { Request, Response } from "express";
import { getAllTasks, getTaskById, createTask, updateTask } from "./tasks.service.js";

export const getTasksController = (request: Request, response: Response) => {
  const tasks = getAllTasks();
  return response.json(tasks);
};

export const getTaskController = (request: Request, response: Response) => {
  const id = Number(request.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return response.status(400).json({ message: "Invalid task id" });
  }
  const task = getTaskById(id);
  if (!task) {
    return response.status(404).json({ message: "Task not found" });
  }
  return response.json(task);
};

export const postTaskController = (request: Request, response: Response) => {
  const data = request.body;
  if (typeof data.projectId !== "number" || data.projectId <= 0) {
    return response.status(400).json({ message: "Invalid project id" });
  }
  if (
    data.assigneeId !== null &&
    (typeof data.assigneeId !== "number" || data.assigneeId <= 0)
  ) {
    return response.status(400).json({ message: "Invalid assignee id" });
  }
  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim().length === 0
  ) {
    return response.status(400).json({ message: "Invalid title" });
  }
  if (
    !data.priority ||
    typeof data.priority !== "string" ||
    data.priority.trim().length === 0 || !["Low", "Medium", "High"].includes(data.priority)
  ) {
    return response.status(400).json({ message: "Invalid priority" });
  }
  if (typeof data.statusId !== "number" || data.statusId <= 0) {
    return response.status(400).json({ message: "Invalid status id" });
  }
  if (
    !data.dueDate ||
    typeof data.dueDate !== "string" ||
    data.dueDate.trim().length === 0
  ) {
    return response.status(400).json({ message: "Invalid due date" });
  }
  const newTask = createTask(data);
  return response.status(201).json(newTask);
};

export const patchTaskController = (request: Request, response: Response) => {
  const id = Number(request.params.id);
  if(!Number.isInteger(id) || id <= 0){
    return response.status(400).json({message: "Invalid task id"})
  }

  const data = request.body;
  if (data.projectId !== undefined && (typeof data.projectId !== "number" || data.projectId <=0 || !Number.isInteger(data.projectId))){
    return response.status(400).json({message: "Invalid task id"});
  }
  if (data.assigneeId && (typeof data.assigneeId !== "number" || data.assigneeId <= 0 || !Number.isInteger(data.assigneeId))){
    return response.status(400).json({message: "invalid assignee id"});
  }
  const updatedTask = updateTask(id, data);
  return response.status(200).json({updatedTask})
}


