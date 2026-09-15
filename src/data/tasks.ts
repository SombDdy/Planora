import type { Task } from "../types/task";

export const tasks: Task[] = [
    {
        id: 1,
        projectId: 1,
        assigneeId: 1,
        title: 'Fix Header',
        priority: 'Low',
        status: 'To Do',
        dueDate: '2026-09-12'
    },
    {
        id: 2,
        projectId: 1,
        assigneeId: null,
        title: 'Design dashboard layout',
        priority: 'Medium',
        status: 'Completed',
        dueDate: '2026-09-05'
    },
    {
        id: 3,
        projectId: 2,
        assigneeId: 1,
        title: 'Create Settings page',
        priority: 'High',
        status: 'In Progress',
        dueDate: '2026-09-08'
    },
    {
        id: 4,
        projectId: 3,
        assigneeId: 1,
        title: 'SearchBar Fix',
        priority: 'Medium',
        status: 'To Do',
        dueDate: '2026-09-16'
    },
]