import { ListTodo, Clock3, CircleCheckBig, type LucideIcon } from "lucide-react";
import type { Priority, Status, DashboardInfo } from "../utils/taskStyles";


type Task = {
  id: number;
  projectId: number,
  title: string;
  priority: Priority;
  status: Status;
  dueDate: string;
};

type dashInfo = {
    id: number;
    icon: LucideIcon;
    description: DashboardInfo;
    quantity: number;
}

export const tasks: Task[] = [
    {
        id: 1,
        projectId: 1,
        title: 'Fix Header',
        priority: 'Low',
        status: 'To Do',
        dueDate: '2026-09-12'
    },
    {
        id: 2,
        projectId: 1,
        title: 'Design dashboard layout',
        priority: 'Medium',
        status: 'Completed',
        dueDate: '2026-09-05'
    },
    {
        id: 3,
        projectId: 2,
        title: 'Create Settings page',
        priority: 'High',
        status: 'In Progress',
        dueDate: '2026-09-08'
    },
    {
        id: 4,
        projectId: 3,
        title: 'SearchBar Fix',
        priority: 'Medium',
        status: 'To Do',
        dueDate: '2026-09-16'
    },
]

export const dashboardInfo: dashInfo[] = [
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
        description: "Task management application",
        dueDate: "2026-09-20",
        taskCount: 6,
        progress: 60,
    },
    {
        id: 2,
        name: "Net-City mobile App",
        description: "Door bell app",
        dueDate: "2026-09-26",
        taskCount: 2,
        progress: 80,
    },
    {
        id: 3,
        name: "Online Shop",
        description: "Online shop for Apple products",
        dueDate: "2026-10-15",
        taskCount: 9,
        progress: 35,
    },
]