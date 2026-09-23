import { projects } from "./projects.data.js";

type CreateProjectData = {
  name: string;
  description: string;
  dueDate: string;
  workflowId: number;
};

type UpdateProjectData = {
  name?: string;
  description?: string;
  dueDate?: string;
  workflowId?: number;
};

export const createProject = (data: CreateProjectData) => {
  const ids = projects.map((project) => project.id);
  const newId = Math.max(...ids) + 1;

  const newProject = {
    id: newId,
    name: data.name,
    description: data.description,
    dueDate: data.dueDate,
    workflowId: data.workflowId,
  };

  projects.push(newProject);

  return newProject;
};

export const updateProject = (id: number, data: UpdateProjectData) => {
  const updatingProject = getProjectById(id);
  if (!updatingProject) {
    return;
  }
  if (data.name !== undefined) {
    updatingProject.name = data.name;
  }
  if (data.description !== undefined) {
    updatingProject.description = data.description;
  }
  if (data.dueDate !== undefined) {
    updatingProject.dueDate = data.dueDate;
  }
  if (data.workflowId !== undefined) {
    updatingProject.workflowId = data.workflowId;
  }
  return updatingProject;
};

export const deleteProject = (id: number) => {
    const deletingProject = getProjectById(id);
    if(!deletingProject){
        return;
    }
    const projectIndex = projects.findIndex((project) => project.id === id);
    const deletedProjects = projects.splice(projectIndex, 1);
    return deletedProjects[0];
}

export const getAllProjects = () => {
  return projects;
};

export const getProjectById = (id: number) => {
  const exactProject = projects.find((project) => project.id === id);
  return exactProject;
};
