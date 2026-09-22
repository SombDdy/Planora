import {
  LayoutDashboard,
  ListTodo,
  FolderKanban,
} from "lucide-react";

export const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "My Tasks",
    icon: ListTodo,
    path: "/tasks",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
];