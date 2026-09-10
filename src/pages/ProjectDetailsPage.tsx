import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/dashboard";
import { MoveLeft, Plus } from "lucide-react";
import { formatDate } from "../utils/dateUtils";

const kanbanColumns = [
  {
    title: "To Do",
    status: "To Do",
  },
  {
    title: "In Progress",
    status: "In Progress",
  },
  {
    title: "Completed",
    status: "Completed",
  },
];

export function ProjectDetailsPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const project = projects.find((proj) => proj.id === Number(projectId));

  if (!project) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-12 py-10 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Project not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The project you're looking for doesn't exist.
          </p>

          <button
            onClick={() => navigate("/projects")}
            className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <MoveLeft size={18} />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <button
        onClick={() => navigate("/projects")}
        className="mt-4 flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <MoveLeft size={18} />
        Back to Projects
      </button>

      <div className="mt-8">
        <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>

        <p className="mt-2 text-base text-slate-500">{project.description}</p>
      </div>

      <div className="mt-8 flex items-center gap-12 border-b border-slate-200 pb-8">
        <div>
          <p className="text-sm text-slate-400">Due date</p>
          <p className="mt-1 font-medium text-slate-800">
            {formatDate(project.dueDate)}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Tasks</p>
          <p className="mt-1 font-medium text-slate-800">
            {project.taskCount} tasks
          </p>
        </div>

        <div className="w-52">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Progress</p>

            <p className="text-sm font-medium text-slate-700">
              {project.progress}%
            </p>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2>Board</h2>
          <button className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600">
            <Plus size={18} /> Add Task
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-4">
          {kanbanColumns.map((c) => {
            return (
              <div key={c.status} className="rounded-xl bg-slate-100 p-4 min-h-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">
                    {c.title}
                  </h3>
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 text-xs font-medium text-slate-500">
                    0
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
