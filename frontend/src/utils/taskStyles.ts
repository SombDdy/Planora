import type { Priority, } from "../types/task";
import type { WorkflowStatusColor } from "../types/workflow";

const priorityStyles = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
};

const iconsColor = {
    "Total Tasks": 'bg-indigo-100',
    "In Progress": 'bg-amber-100',
    "Completed": 'bg-green-100',
}

export const getStatusIndicatorClasses = (
  color: WorkflowStatusColor,
) => {
  const colors = {
    slate: "bg-slate-500",
    indigo: "bg-indigo-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    green: "bg-green-500",
    red: "bg-red-500",
  };

  return colors[color];
};


export type DashboardInfo = "Total Tasks" |  "In Progress" | "Completed"

export const getPriorityClasses = (priority: Priority) => {
    return priorityStyles[priority];
};

export const getStatusClasses = (color: WorkflowStatusColor) => {
  const colors = {
    slate: "bg-slate-100 text-slate-700",
    indigo: "bg-indigo-100 text-indigo-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
  };

  return colors[color];
};

export const getIconsColor = (description: DashboardInfo) => {
    return iconsColor[description]
}