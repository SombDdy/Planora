import { ListTodo, Clock3, CircleCheckBig } from "lucide-react";

export const tasks = [
    {
        id: 1,
        title: 'Design dashboard layout',
        priority: 'Medium',
        status: 'Completed',
        dueDate: 'Sep 5'
    },
    {
        id: 2,
        title: 'Create Settings page',
        priority: 'High',
        status: 'In Progress',
        dueDate: 'Sep 8'
    },
    {
        id: 3,
        title: 'Fix Header',
        priority: 'Low',
        status: 'To Do',
        dueDate: 'Sep 12'
    },
]

export const dashboardInfo = [
    {
        id: 1,
        icon: ListTodo,
        description: "Total Tasks",
        quantity: 12
    },
    {
        id: 2,
        icon: Clock3,
        description: "In Progress",
        quantity: 4
    },
    {
        id: 3,
        icon: CircleCheckBig,
        description: "Completed",
        quantity: 8
    },
]

export const projects = [
    {
        id: 1,
        name: "Planora Website",
        taskCount: 6,
        progress: 60,
    },
    {
        id: 2,
        name: "Net-City mobile App",
        taskCount: 2,
        progress: 80,
    },
    {
        id: 3,
        name: "Online Shop",
        taskCount: 9,
        progress: 35,
    },
]