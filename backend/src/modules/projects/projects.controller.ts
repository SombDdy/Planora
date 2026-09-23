import type { Request, Response } from "express";
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from "./projects.service.js";

export const getProjectsController = (request: Request, response: Response) => {
    const projects = getAllProjects();
  response.json(projects);
};

export const getProjectController = (request: Request, response: Response) => {
    const id = Number(request.params.id)

    if(Number.isNaN(id)){
        return response.status(400).json({message: "Invalid project id"})
    }
    const project = getProjectById(id);
    if (!project){
       return response.status(404).json({message: "Project not found"});
    }
    return response.json(project);
};

export const postProjectController = (request: Request, response: Response) => {
    const data = request.body;
    const newProject = createProject(data);
    return response.status(201).json(newProject)
}

export const patchProjectController = (request: Request, response: Response) => {
    const id = Number(request.params.id)
    if(Number.isNaN(id)){
        return response.status(400).json({message: "Invalid project id"})
    }
    const data = request.body;
    const updatedProject = updateProject(id, data);
    if(!updatedProject){
        return response.status(404).json({message: "Project not found"});
    }
    return response.status(200).json(updatedProject);
}

export const deleteProjectController = (request: Request, response: Response) => {
    const id = Number(request.params.id)
    if(Number.isNaN(id)){
        return response.status(400).json({message: "Invalid project id"})
    }
    const deletedProject = deleteProject(id);
    if(!deletedProject){
        return response.status(404).json({message: "Project not found"})
    }
    return response.status(200).json(deletedProject);
}
