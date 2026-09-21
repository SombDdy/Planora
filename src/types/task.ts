export type Priority = "High" | "Medium" | "Low";

export type Task = {
  id: number;
  projectId: number;
  assigneeId: number | null,
  title: string;
  priority: Priority;
  statusId: number;
  dueDate: string;
};