import type { Project } from "../types/project";

export const projects: Project[] = [
    {
        id: 1,
        workflowId: 1,
        name: "Lunvexa Website",
        shortDescription: "short description",
        description: "Task management application",
        dueDate: "2026-09-20",
        taskCount: 6,
        progress: 60,
    },
    {
        id: 2,
        workflowId: 1,
        name: "Net-City mobile App",
        shortDescription: "short description",
        description: "Door bell app",
        dueDate: "2026-09-26",
        taskCount: 2,
        progress: 80,
    },
    {
        id: 3,
        workflowId: 1,
        name: "Online Shop",
        shortDescription: "short description",
        description: "Online shop for Apple products",
        dueDate: "2026-10-15",
        taskCount: 9,
        progress: 35,
    },
]