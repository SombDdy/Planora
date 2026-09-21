import {
  Bell,
  ChevronLeft,
  LockKeyhole,
  Monitor,
  Settings,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const settingsNavigation = [
  {
    label: "General",
    path: "/settings/general",
    icon: Settings,
  },
  {
    label: "Security",
    path: "/settings/security",
    icon: LockKeyhole,
  },
  {
    label: "Notifications",
    path: "/settings/notifications",
    icon: Bell,
  },
  {
    label: "Appearance",
    path: "/settings/appearance",
    icon: Monitor,
  },
];

export function SettingsLayout() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <NavLink
          to="/settings"
          className="mb-4 flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ChevronLeft size={17} />
          Back to settings
        </NavLink>

        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your Planora preferences.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <nav className="space-y-1">
          {settingsNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}