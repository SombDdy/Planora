import {
  ListTodo,
  Clock3,
  CircleCheckBig,
  type LucideIcon,
} from "lucide-react";

import type { DashboardInfo } from "../utils/taskStyles";

type DashInfo = {
  id: number;
  icon: LucideIcon;
  description: DashboardInfo;
};

export const dashboardInfo: DashInfo[] = [
  {
    id: 1,
    icon: ListTodo,
    description: "Total Tasks",
  },
  {
    id: 2,
    icon: Clock3,
    description: "In Progress",
  },
  {
    id: 3,
    icon: CircleCheckBig,
    description: "Completed",
  },
];