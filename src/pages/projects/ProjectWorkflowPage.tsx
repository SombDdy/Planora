import {
  GripVertical,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useParams } from "react-router-dom";

import { ProjectNavigation } from "../../components/projects/ProjectNavigation";
import { projects } from "../../data/projects";
import { workflows } from "../../data/workflows";
import { getStatusIndicatorClasses } from "../../utils/taskStyles";

export function ProjectWorkflowPage() {
  const { projectId } = useParams();

  const currentProjectId = Number(projectId);

  const project = projects.find(
    (project) => project.id === currentProjectId,
  );

  const workflow = workflows.find(
    (workflow) => workflow.id === project?.workflowId,
  );

  if (!project) {
    return (
      <div className="text-sm text-slate-500">
        Project not found.
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="text-sm text-slate-500">
        Workflow not found.
      </div>
    );
  }

  const statuses = [...workflow.statuses].sort(
    (a, b) => a.position - b.position,
  );

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Workflow
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Configure how tasks move through {project.name}.
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          <Plus size={18} />
          Add status
        </button>
      </div>

      <ProjectNavigation projectId={project.id} />

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">
          Workflow name
        </p>

        <p className="mt-1 font-semibold text-slate-900">
          {workflow.name}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Statuses
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Statuses define the stages tasks move through in this project.
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {statuses.map((status, index) => (
            <div
              key={status.id}
              className="flex items-center gap-4 px-5 py-4"
            >
              <button
                type="button"
                className="cursor-grab text-slate-300 transition hover:text-slate-500"
                aria-label={`Move ${status.name}`}
              >
                <GripVertical size={20} />
              </button>

              <span
                className={`h-3 w-3 shrink-0 rounded-full ${getStatusIndicatorClasses(
                  status.color,
                )}`}
              />

              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">
                  {status.name}
                </p>

                <p className="mt-0.5 text-sm text-slate-500">
                  Position {status.position}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {index === 0
                  ? "Start"
                  : index === statuses.length - 1
                    ? "Completed"
                    : "Active"}
              </span>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label={`Manage ${status.name}`}
              >
                <MoreHorizontal size={19} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3">
        <p className="text-sm text-indigo-700">
          The first status is the starting point for new tasks. The last
          status is currently treated as completed.
        </p>
      </div>
    </div>
  );
}