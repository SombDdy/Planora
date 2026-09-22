import { Laptop, Moon, Sun } from "lucide-react";

export function AppearanceSettingsPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Appearance
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Customize how Lunvexa looks on your device.
        </p>
      </div>

      <div className="p-6">
        <p className="mb-3 text-sm font-medium text-slate-700">
          Theme
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <button
            type="button"
            className="rounded-xl border-2 border-indigo-500 bg-indigo-50 p-4 text-left"
          >
            <Sun size={22} className="mb-4 text-indigo-500" />

            <p className="text-sm font-medium text-slate-900">
              Light
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Use the light theme.
            </p>
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-slate-300"
          >
            <Moon size={22} className="mb-4 text-slate-500" />

            <p className="text-sm font-medium text-slate-900">
              Dark
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Use the dark theme.
            </p>
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-slate-300"
          >
            <Laptop size={22} className="mb-4 text-slate-500" />

            <p className="text-sm font-medium text-slate-900">
              System
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Match your device theme.
            </p>
          </button>
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-200 pt-6">
          <button
            type="button"
            className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}