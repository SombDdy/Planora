import type { Priority, Status } from "../types/task";

const priorityStyles = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
};

const statusStyles = {
    "Completed": 'bg-green-100 text-green-700',
    "In Progress": 'bg-yellow-100 text-yellow-700',
    "To Do": 'bg-indigo-100 text-indigo-700',
};

const iconsColor = {
    "Total Tasks": 'bg-indigo-100',
    "In Progress": 'bg-amber-100',
    "Completed": 'bg-green-100',
}


export type DashboardInfo = "Total Tasks" |  "In Progress" | "Completed"

export const getPriorityClasses = (priority: Priority) => {
    return priorityStyles[priority];
};

export const getStatusClasses = (status: Status) => {
    return statusStyles[status]
};

export const getIconsColor = (description: DashboardInfo) => {
    return iconsColor[description]
}