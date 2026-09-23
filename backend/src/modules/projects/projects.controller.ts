import type { Request, Response } from "express";
import { getAllProjects, getProjectById, createProject } from "./projects.service.js";

export const getProjects = (request: Request, response: Response) => {
    const projects = getAllProjects();
  response.json(projects);
};

export const getProject = (request: Request, response: Response) => {
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

export const postProject = (request: Request, response: Response) => {
    const data = request.body;
    const newProject = createProject(data);
    return response.status(201).json(newProject)
}
