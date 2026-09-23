import { projects } from "./projects.data.js";

type CreateProjectData = {
  name: string;
  description: string;
  dueDate: string;
  workflowId: number;
};

export const createProject = (data: CreateProjectData) => {
    const ids = projects.map((project) => project.id);
    const newId = Math.max(...ids) + 1;

    const newProject = {
        id: newId,
        name: data.name,
        description: data.description,
        dueDate: data.dueDate,
        workflowId: data.workflowId
    };

    projects.push(newProject);

    return newProject;
}

export const getAllProjects = () => {
    return projects;
};

export const getProjectById = (id: number) => {
    const exactProject = projects.find((project) => project.id === id);
    return exactProject;
}