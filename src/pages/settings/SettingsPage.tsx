import {
  Bell,
  ChevronRight,
  LockKeyhole,
  Monitor,
  Settings,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account preferences and application settings.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <Link
          to="/profile"
          className="flex items-center justify-between border-b border-slate-200 p-5 transition hover:bg-slate-50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
              <User size={20} />
            </div>

            <div>
              <h2 className="font-medium text-slate-900">
                Profile
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your personal information and profile photo.
              </p>
            </div>
          </div>

          <ChevronRight size={20} className="text-slate-400" />
        </Link>

        <Link
          to="/settings/general"
          className="flex items-center justify-between border-b border-slate-200 p-5 transition hover:bg-slate-50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Settings size={20} />
            </div>

            <div>
              <h2 className="font-medium text-slate-900">
                General
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Language, timezone and general preferences.
              </p>
            </div>
          </div>

          <ChevronRight size={20} className="text-slate-400" />
        </Link>

        <Link
          to="/settings/security"
          className="flex items-center justify-between border-b border-slate-200 p-5 transition hover:bg-slate-50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <LockKeyhole size={20} />
            </div>

            <div>
              <h2 className="font-medium text-slate-900">
                Security
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Password, sessions and account security.
              </p>
            </div>
          </div>

          <ChevronRight size={20} className="text-slate-400" />
        </Link>


        <Link
          to="/settings/notifications"
          className="flex items-center justify-between border-b border-slate-200 p-5 transition hover:bg-slate-50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <Bell size={20} />
            </div>

            <div>
              <h2 className="font-medium text-slate-900">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose which notifications you want to receive.
              </p>
            </div>
          </div>

          <ChevronRight size={20} className="text-slate-400" />
        </Link>


        <Link
          to="/settings/appearance"
          className="flex items-center justify-between p-5 transition hover:bg-slate-50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Monitor size={20} />
            </div>

            <div>
              <h2 className="font-medium text-slate-900">
                Appearance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customize how Planora looks on your device.
              </p>
            </div>
          </div>

          <ChevronRight size={20} className="text-slate-400" />
        </Link>
      </div>
    </div>
  );
}