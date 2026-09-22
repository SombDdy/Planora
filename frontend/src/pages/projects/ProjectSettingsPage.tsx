import { Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";

import { ProjectNavigation } from "../../components/projects/ProjectNavigation";
import { projects } from "../../data/projects";

export function ProjectSettingsPage() {
  const { projectId } = useParams();

  const currentProjectId = Number(projectId);

  const project = projects.find(
    (project) => project.id === currentProjectId,
  );

  if (!project) {
    return (
      <div className="text-sm text-slate-500">
        Project not found.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Project settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage settings for {project.name}.
        </p>
      </div>

      <ProjectNavigation projectId={project.id} />

      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              General
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your project information.
            </p>
          </div>

          <form className="space-y-5 p-6">
            <div>
              <label
                htmlFor="project-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Project name
              </label>

              <input
                id="project-name"
                type="text"
                defaultValue={project.name}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="project-description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="project-description"
                rows={4}
                defaultValue={project.description}
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="project-due-date"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Due date
              </label>

              <input
                id="project-due-date"
                type="date"
                defaultValue={project.dueDate}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="flex justify-end border-t border-slate-200 pt-6">
              <button
                type="submit"
                className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-xl border border-red-200 bg-white">
          <div className="border-b border-red-100 p-6">
            <h2 className="text-lg font-semibold text-red-600">
              Danger zone
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Destructive actions for this project.
            </p>
          </div>

          <div className="flex items-center justify-between gap-6 p-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Delete project
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Permanently delete this project and all of its tasks.
                This action cannot be undone.
              </p>
            </div>

            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={17} />
              Delete project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}