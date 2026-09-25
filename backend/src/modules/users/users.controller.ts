import { Request, Response } from "express";
import { getAllUsers, getUserById, createUser } from "./users.service.js"

export const getUsersController = (request: Request, response: Response) => {
    const users = getAllUsers();
    return response.json(users);
}

export const getUserController = (request: Request, response: Response) => {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0){
        return response.status(400).json({message: "Invalid user id"});
    }
    const user = getUserById(id);
    if(!user){
        return response.status(404).json({message: "User not found"})
    }
    return response.json(user);
}

export const postUserController = (request: Request, response: Response) => {
    const data = request.body;
    if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0){
        return response.status(400).json({message: "Invalid name"});
    };
    if(!data.email || typeof data.email !== "string" || data.email.trim().length === 0){
        return response.status(400).json({message: "Invalid email"})
    }
    if(data.avatarUrl !== undefined && (typeof data.avatarUrl !=="string" || data.avatarUrl.trim().length === 0)){
        return response.status(400).json({message: "Invalid avatarUrl"})
    }
    const newUser = createUser(data);
    return response.status(201).json(newUser);
}