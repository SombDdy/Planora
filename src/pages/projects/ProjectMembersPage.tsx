import {
  MoreHorizontal,
  Plus,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useParams } from "react-router-dom";

import { projectMembers } from "../../data/projectMembers";
import { projects } from "../../data/projects";
import { users } from "../../data/users";
import { ProjectNavigation } from "../../components/projects/ProjectNavigation";

export function ProjectMembersPage() {
  const { projectId } = useParams();

  const currentProjectId = Number(projectId);

  const project = projects.find(
    (project) => project.id === currentProjectId,
  );

  const members = projectMembers
    .filter((member) => member.projectId === currentProjectId)
    .map((member) => {
      const user = users.find(
        (user) => user.id === member.userId,
      );

      return {
        ...member,
        user,
      };
    });

  if (!project) {
    return (
      <div className="text-sm text-slate-500">
        Project not found.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl">

      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Project members
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage members and their roles in {project.name}.
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          <Plus size={18} />
          Invite member
        </button>
      </div>
        
      <ProjectNavigation projectId={project.id} />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[1fr_180px_60px] border-b border-slate-200 bg-slate-50 px-5 py-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Member
          </span>

          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Role
          </span>

          <span />
        </div>

        {members.map((member) => {
          if (!member.user) {
            return null;
          }

          const initials = member.user.name
            .split(" ")
            .map((part) => part.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={member.id}
              className="grid grid-cols-[1fr_180px_60px] items-center border-b border-slate-200 px-5 py-4 last:border-b-0"
            >
              {/* User */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                  {initials}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {member.user.name}
                  </p>

                  <p className="mt-0.5 truncate text-sm text-slate-500">
                    {member.user.email}
                  </p>
                </div>
              </div>

              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    member.role === "Owner"
                      ? "bg-indigo-50 text-indigo-600"
                      : member.role === "Admin"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {member.role === "Owner" ? (
                    <ShieldCheck size={14} />
                  ) : (
                    <UserRound size={14} />
                  )}

                  {member.role}
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label={`Manage ${member.user.name}`}
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-sm text-slate-400">
        {members.length}{" "}
        {members.length === 1 ? "member" : "members"} in this project
      </p>
    </div>
  );
}