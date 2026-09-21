export type WorkflowStatusColor =
  | "slate"
  | "indigo"
  | "blue"
  | "amber"
  | "green"
  | "red";

export type WorkflowStatus = {
  id: number;
  name: string;
  position: number;
  color: WorkflowStatusColor;
};

export type Workflow = {
  id: number;
  name: string;
  statuses: WorkflowStatus[];
};