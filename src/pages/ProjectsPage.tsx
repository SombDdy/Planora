import { Plus, X, Pencil, Trash2 } from "lucide-react";
import { projects } from "../data/projects";
import { formatDate } from "../utils/dateUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProjectsPage() {
  const [openedModal, setOpenedModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDueDate, setProjectDueDate] = useState("");
  const [projectList, setProjectList] = useState(projects);
  const [projectNameError, setProjectNameError] = useState("");
  const [projectDueDateError, setProjectDueDateError] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(
    null,
  );

  const resetForm = () => {
    setProjectName("");
    setProjectDescription("");
    setProjectDueDate("");
    setProjectNameError("");
    setProjectDueDateError("");
  };

  const handleAddProject = () => {
    if (!projectName || !projectDueDate) {
      if (!projectName) {
        setProjectNameError("Project name is required");
      }
      if (!projectDueDate) {
        setProjectDueDateError("Project date is required");
      }
      return;
    }

    const newProject = {
      id: Date.now(),
      workflowId: 1,
      name: projectName,
      description: projectDescription,
      taskCount: 0,
      progress: 0,
      dueDate: projectDueDate,
    };
    setProjectList([...projectList, newProject]);
    resetForm();
    setOpenedModal(false);
  };

  const handleEditProject = (id: number) => {
    const editedProjectList = projectList.find((proj) => proj.id === id);
    if (!editedProjectList) return;
    setEditingProjectId(editedProjectList.id);
    setProjectName(editedProjectList.name);
    setProjectDescription(editedProjectList.description);
    setProjectDueDate(editedProjectList.dueDate);
    setOpenedModal(true);
  };

  const handleUpdateProject = () => {
    const updatedProjectList = projectList.map((proj) =>
      proj.id === editingProjectId
        ? {
            ...proj,
            name: projectName,
            description: projectDescription,
            dueDate: projectDueDate,
          }
        : proj,
    );
    setProjectList(updatedProjectList);
    resetForm();
    setEditingProjectId(null);
    setOpenedModal(false);
  };

  const handleDeleteProject = (id: number) => {
    const updatedProjectList = projectList.filter((proj) => proj.id !== id);
    setProjectList(updatedProjectList)
  }

  const deletingProject = projectList.find((proj) => proj.id === deletingProjectId)

  const navigate = useNavigate();

  return (
  <div className="flex w-full flex-col">
    <div className="mt-4 flex w-full items-center justify-between">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
        <p className="text-base text-slate-500">
          Manage and organize your projects.
        </p>
      </div>

      <button
        onClick={() => {
          resetForm();
          setEditingProjectId(null);
          setOpenedModal(true);
        }}
        className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
      >
        <Plus size={18} />
        Add Project
      </button>
    </div>

    <div className="grid grid-cols-3 gap-6 pt-12">
      {projectList.length > 0 ? (
        projectList.map((p) => {
          return (
            <div
              key={p.id}
              onClick={() => navigate(`/projects/${p.id}`)}
              className="flex flex-col rounded-xl cursor-pointer border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">{p.name}</h2>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {e.stopPropagation(); handleEditProject(p.id)}}
                    className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-500"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={(e) => {e.stopPropagation(); setDeletingProjectId(p.id)}}
                    className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-slate-500">{p.description}</p>

              <div className="mb-2 mt-6 flex items-center justify-between">
                <p className="text-slate-500">{p.taskCount} tasks</p>
                <p className="font-medium text-slate-700">{p.progress}%</p>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${p.progress}%` }}
                />
              </div>

              <p className="mt-5 text-slate-500">
                Due {formatDate(p.dueDate)}
              </p>
            </div>
          );
        })
      ) : (
        <div className="col-span-3 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16">
          <h2 className="text-lg font-semibold text-slate-900">
            No projects yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Create your first project to get started.
          </p>

          <button
            onClick={() => {
              resetForm();
              setEditingProjectId(null);
              setOpenedModal(true);
            }}
            className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            <Plus size={18} />
            Add Project
          </button>
        </div>
      )}
    </div>

    {openedModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              {editingProjectId !== null ? "Edit project" : "Add project"}
            </h2>

            <button
              onClick={() => {
                setOpenedModal(false);
                setEditingProjectId(null);
                resetForm();
              }}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Project name
            </label>

            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setProjectNameError("");
              }}
              placeholder="Enter project name..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {projectNameError && (
              <p className="mt-1.5 text-sm text-red-500">
                {projectNameError}
              </p>
            )}
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Project Description
            </label>

            <input
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Enter project description..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Due Date
            </label>

            <input
              type="date"
              value={projectDueDate}
              onChange={(e) => {
                setProjectDueDate(e.target.value);
                setProjectDueDateError("");
              }}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {projectDueDateError && (
              <p className="mt-1.5 text-sm text-red-500">
                {projectDueDateError}
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => {
                setOpenedModal(false);
                setEditingProjectId(null);
                resetForm();
              }}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={
                editingProjectId !== null
                  ? handleUpdateProject
                  : handleAddProject
              }
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              {editingProjectId !== null ? "Save changes" : "Add project"}
            </button>
          </div>
        </div>
      </div>
    )}

    {deletingProjectId !== null && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-900">
            Delete Project
          </h2>

          <p className="mt-2 text-sm text-slate-500">  
            {`Are you sure you want to delete "${deletingProject?.name}"?`}
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setDeletingProjectId(null)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                handleDeleteProject(deletingProjectId);
                setDeletingProjectId(null);
              }}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Delete project
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
