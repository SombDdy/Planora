import { users } from "./users.data.js";

export type CreateUserData = {
    name: string;
    email: string;
    avatarUrl?: string;
 }

export const getAllUsers = () => {
    return users;
}

export const getUserById = (id: number) => {
    const exactUser = users.find((user) => user.id === id);
    return exactUser;
}

export const createUser = (data: CreateUserData) => {
    const ids = users.map((user) => user.id);
    const newId = Math.max(...ids) + 1;

    const newUser = {
        id: newId,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
    };

    users.push(newUser);
    return newUser;
}