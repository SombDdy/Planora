export type ProjectRole = "Owner" | "Admin" | "User";

export type ProjectMember = {
    id: number;
    userId: number;
    projectId: number;
    role: ProjectRole;
}

