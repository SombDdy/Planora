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
        color: "slate",
      },
      {
        id: 2,
        name: "In Progress",
        position: 2,
        color: "blue",
      },
      {
        id: 3,
        name: "Review",
        position: 3,
        color: "amber",
      },
      {
        id: 4,
        name: "Completed",
        position: 4,
        color: "green",
      },
    ],
  },
];
