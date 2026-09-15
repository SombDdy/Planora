import type { ProjectMember } from "../types/projectMember";

export const projectMembers: ProjectMember[] = [
    {
        id: 1,
        userId: 1,
        projectId: 1,
        role: "Owner",
    },
    {
        id: 2,
        userId: 2,
        projectId: 1,
        role: "Admin",
    },
    {
        id: 3,
        userId: 3,
        projectId: 2,
        role: "User",
    },
]