import { tasks } from "./tasks.data.js";

type CreateTaskData = {
    projectId: number;
    assigneeId: number | null;
    title: string;
    priority: "High" | "Medium" | "Low";
    statusId: number;
    dueDate: string;
}

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
    }

    tasks.push(newTask);

    return newTask;
}

export const getAllTasks = () => {
    return tasks;
};

export const getTaskById = (id: number) => {
    const exactTask= tasks.find((task) => task.id === id);
    return exactTask;
};