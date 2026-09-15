export type Priority = "High" | "Medium" | "Low";
export type Status = "Completed" | "In Progress" | "To Do";

export type Task = {
  id: number;
  projectId: number;
  assigneeId: number | null,
  title: string;
  priority: Priority;
  status: Status;
  dueDate: string;
};