import { Plus } from "lucide-react";

export function ProjectsPage(){
    return(
        <div className="flex items-center justify-between w-full mt-4">
            <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
            <p className="text-base text-slate-500">
            Manage and organize your projects.
            </p>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-xl bg-indigo-500 transition hover:bg-indigo-600 ">
          <Plus size={18} /> Add Project
        </button>
        </div>
    )
}