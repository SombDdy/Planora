import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function SecuritySettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Password
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update your account password.
          </p>
        </div>

        <form className="space-y-5 p-6">
          <div>
            <label
              htmlFor="current-password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Current password
            </label>

            <div className="relative">
              <input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurrentPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              New password
            </label>

            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNewPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-new-password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Confirm new password
            </label>

            <input
              id="confirm-new-password"
              type="password"
              placeholder="Repeat new password"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="flex justify-end border-t border-slate-200 pt-6">
            <button
              type="submit"
              className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              Update password
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-xl border border-red-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">
          Delete account
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Permanently delete your account and all associated data.
        </p>

        <button
          type="button"
          className="mt-4 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete account
        </button>
      </div>
    </div>
  );
}