import { Plus } from "lucide-react";
import { tasks } from "../data/dashboard";
import { useState } from "react";

export function TasksPage() {
  const filters = ["All", "To Do", "In Progress", "Completed"];
  return (
    <div>
      <div className="flex items-center justify-between w-full mt-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-slate-900">My tasks</h1>
          <p className="text-base text-slate-500">
            Manage and track all your tasks.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-xl bg-indigo-500 transition hover:bg-indigo-600 ">
          <Plus size={18} /> Add Task
        </button>
      </div>
      <div className="flex items-center gap-2 pt-5">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "All"
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white mt-8">
        <div className="grid grid-cols-4 px-6 py-4 gap-12 border-b border-slate-200">
            <p className="text-base font-medium text-slate-500">Task</p>
            <p className="text-base font-medium text-slate-500">Priority</p>
            <p className="text-base font-medium text-slate-500">Status</p>
            <p className="text-base font-medium text-slate-500">Due Date</p>
          </div>
        {tasks.map((task) => (
            <div key = {task.id} className="grid grid-cols-4 p-6 gap-12 border-b border-slate-200 last:border-b-0">
                <p>{task.title}</p>
                <p>{task.priority}</p>
                <p>{task.status}</p>
                <p>{task.dueDate}</p>
            </div>
        ))}
      </div>
    </div>
  );
}
