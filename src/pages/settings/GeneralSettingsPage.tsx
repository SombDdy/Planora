export function GeneralSettingsPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          General
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your language, timezone and general preferences.
        </p>
      </div>

      <form className="space-y-6 p-6">
        <div>
          <label
            htmlFor="language"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Language
          </label>

          <select
            id="language"
            defaultValue="English"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option>English</option>
            <option>Українська</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="timezone"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Timezone
          </label>

          <select
            id="timezone"
            defaultValue="Europe/Kyiv"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="Europe/Kyiv">
              Europe/Kyiv (UTC+3)
            </option>

            <option value="Europe/London">
              Europe/London
            </option>

            <option value="America/New_York">
              America/New York
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="week-start"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Start of the week
          </label>

          <select
            id="week-start"
            defaultValue="Monday"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option>Monday</option>
            <option>Sunday</option>
          </select>
        </div>

        <div className="flex justify-end border-t border-slate-200 pt-6">
          <button
            type="submit"
            className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}