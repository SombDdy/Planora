import {
  Bell,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-200"
          >
            PL
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              {/* User info */}
              <div className="border-b border-slate-200 px-4 py-3">
                <p className="text-sm font-medium text-slate-900">
                  Planora User
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  user@planora.com
                </p>
              </div>

              {/* Navigation */}
              <div className="p-1">
                <Link
                  to="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <User size={17} />
                  Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <Settings size={17} />
                  Settings
                </Link>
              </div>

              {/* Sign out */}
              <div className="border-t border-slate-200 p-1">
                <Link
                  to="/login"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}