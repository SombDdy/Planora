import { ListTodo, Clock3, CircleCheckBig, type LucideIcon } from "lucide-react";
import type { DashboardInfo } from "../utils/taskStyles";

type dashInfo = {
    id: number;
    icon: LucideIcon;
    description: DashboardInfo;
    quantity: number;
}

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