import type { Workflow } from "../types/workflow";

export const workflows: Workflow[] = [
    {
        id: 1,
        name: "Default Workflow",
        statuses: [
            {
                id: 1,
                name: "To Do",
                position: 1,
            },
            {
                id: 2,
                name: "In Progress",
                position: 2,
            },
            {
                id: 3,
                name: "Review",
                position: 3,
            },
            {
                id: 4,
                name: "Completed",
                position: 4,
            },
        ],
    }
]