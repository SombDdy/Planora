import { dashboardInfo } from "../data/dashboard";
import { projects } from "../data/projects";
import { tasks } from "../data/tasks";
import { workflows } from "../data/workflows";

import {
  getPriorityClasses,
  getStatusClasses,
  getIconsColor,
  type DashboardInfo,
} from "../utils/taskStyles";

const getTaskWorkflowStatuses = (projectId: number) => {
  const project = projects.find(
    (project) => project.id === projectId,
  );

  const workflow = workflows.find(
    (workflow) => workflow.id === project?.workflowId,
  );

  if (!workflow) {
    return [];
  }

  return [...workflow.statuses].sort(
    (a, b) => a.position - b.position,
  );
};

export function DashboardPage() {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => {
    const statuses = getTaskWorkflowStatuses(task.projectId);

    const completedStatus = statuses.at(-1);

    return task.statusId === completedStatus?.id;
  }).length;

  const inProgressTasks = tasks.filter((task) => {
    const statuses = getTaskWorkflowStatuses(task.projectId);
    if (statuses.length === 0){
      return false;
    }

    const firstStatus = statuses[0];
    const completedStatus = statuses.at(-1);

    return (
      task.statusId !== firstStatus?.id &&
      task.statusId !== completedStatus?.id
    );
  }).length;

  const dashboardStats: Record<DashboardInfo, number> = {
    "Total Tasks": totalTasks,
    "In Progress": inProgressTasks,
    Completed: completedTasks,
  };

  return (
    <div className="mt-4 flex w-full flex-col">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-base text-slate-500">
          Overview of your tasks and projects.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-20 pt-12">
        {dashboardInfo.map((info) => {
          const Icon = info.icon;

          return (
            <div
              key={info.id}
              className="flex items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white p-10"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${getIconsColor(
                  info.description,
                )}`}
              >
                <Icon
                  size={26}
                  className="h-7 w-7 text-slate-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-base font-medium text-slate-500">
                  {info.description}
                </p>

                <p className="text-3xl font-semibold">
                  {dashboardStats[info.description]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 pt-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Recent Tasks
        </h2>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="grid grid-cols-3 gap-12 border-b border-slate-200 px-6 py-4">
            <p className="text-base font-medium text-slate-500">
              Task
            </p>

            <p className="text-base font-medium text-slate-500">
              Status
            </p>

            <p className="text-base font-medium text-slate-500">
              Priority
            </p>
          </div>

          {tasks.map((task) => {
            const project = projects.find(
              (project) => project.id === task.projectId,
            );

            const workflow = workflows.find(
              (workflow) =>
                workflow.id === project?.workflowId,
            );

            const taskStatus = workflow?.statuses.find(
              (status) => status.id === task.statusId,
            );

            return (
              <div
                key={task.id}
                className="grid grid-cols-3 gap-12 border-b border-slate-200 p-6 last:border-b-0"
              >
                <p>{task.title}</p>

                <p
                  className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                    taskStatus
                      ? getStatusClasses(taskStatus.color)
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {taskStatus?.name ?? "Unknown"}
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${getPriorityClasses(
                      task.priority,
                    )}`}
                  />

                  <span className="text-base font-medium text-slate-700">
                    {task.priority}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-12">
        <h3 className="text-2xl font-bold text-slate-900">
          Projects Overview
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {projects.map((project) => {
            const projectTasks = tasks.filter((task) => task.projectId === project.id);
            const statuses = getTaskWorkflowStatuses(project.id)
            const completedStatus = statuses.at(-1);
            const completedProjectTasks = projectTasks.filter((task) => task.statusId === completedStatus?.id);
            const progress = projectTasks.length === 0 ? 0 : Math.round(completedProjectTasks.length / projectTasks.length * 100)

            return(
              <div
              key={project.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white"
            >
              <div className="px-4 py-4">
                <p className="pb-5 text-lg font-medium">
                  {project.name}
                </p>

                <div className="mb-2 flex items-center justify-between">
                  <p>{projectTasks.length} tasks</p>
                  <p>{progress}%</p>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}