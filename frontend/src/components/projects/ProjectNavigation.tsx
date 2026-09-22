import { NavLink } from "react-router-dom";

type ProjectNavigationProps = {
  projectId: number;
};

export function ProjectNavigation({
  projectId,
}: ProjectNavigationProps) {
  const navigation = [
    {
      label: "Board",
      path: `/projects/${projectId}`,
      end: true,
    },
    {
      label: "Members",
      path: `/projects/${projectId}/members`,
    },
    {
      label: "Workflow",
      path: `/projects/${projectId}/workflow`,
    },
    {
      label: "Settings",
      path: `/projects/${projectId}/settings`,
    },
  ];

  return (
    <nav className="mb-6 flex items-center gap-1 border-b border-slate-200">
      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            `relative px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "text-indigo-600"
                : "text-slate-500 hover:text-slate-900"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {item.label}

              {isActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-indigo-500" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}