import type { DropdownOption } from "../components/ui/Dropdown";

export const priorityOptions: DropdownOption[] = [
  {
    value: "High",
    label: "High",
    indicatorClass: "bg-red-500",
  },
  {
    value: "Medium",
    label: "Medium",
    indicatorClass: "bg-amber-600",
  },
  {
    value: "Low",
    label: "Low",
    indicatorClass: "bg-green-500",
  },
];

export const statusOptions: DropdownOption[] = [
  {
    value: "To Do",
    label: "To Do",
    indicatorClass: "bg-indigo-500",
  },
  {
    value: "In Progress",
    label: "In Progress",
    indicatorClass: "bg-amber-500",
  },
  {
    value: "Completed",
    label: "Completed",
    indicatorClass: "bg-green-500",
  },
];