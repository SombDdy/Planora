import { dashboardInfo} from "../data/dashboard";
import { projects } from "../data/projects";
import { tasks } from "../data/tasks";
import { getPriorityClasses, getStatusClasses, getIconsColor } from "../utils/taskStyles"

export function DashboardPage() {

  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
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
              className="flex items-center justify-center gap-4 border border-slate-200 bg-white p-10 rounded-xl"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${getIconsColor(info.description)}`}
              >
                <Icon size={26} className="h-7 w-7 text-slate-500" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base font-medium text-slate-500">
                  {info.description}
                </p>
                <p className="text-3xl font-semibold">{info.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 pt-12">
        <h2 className="text-2xl font-bold text-slate-900">Recent Tasks</h2>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="grid grid-cols-3 px-6 py-4 gap-12 border-b border-slate-200">
            <p className="text-base font-medium text-slate-500">Task</p>
            <p className="text-base font-medium text-slate-500">Status</p>
            <p className="text-base font-medium text-slate-500">Priority</p>      
          </div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-3 p-6 gap-12 border-b border-slate-200 last:border-b-0"
            >
              <p>{task.title}</p>
              <p
                className={`rounded-full px-3 py-1 text-sm font-medium w-fit ${getStatusClasses(task.status)}`}
              >
                {task.status}
              </p>
              <div className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${getPriorityClasses(task.priority)}`}
              />
              <span className="text-base font-medium text-slate-700">
                {task.priority}
              </span>
            </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-12">
        <h3 className="text-2xl font-bold text-slate-900">Projects Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white"
            >
              <div className="px-4 py-4">
                <p className="pb-5 text-lg font-medium">{p.name}</p>
                <div className="mb-2 flex items-center justify-between">
                  <p>{p.taskCount} tasks</p>
                  <p>{p.progress}%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-indigo-500" style={{width: `${p.progress}%`}}>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
