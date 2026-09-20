export type WorkflowStatus = {
    id: number;
    name: string;
    position: number;
}

export type Workflow = {
    id: number;
    name: string;
    statuses: WorkflowStatus[];
}