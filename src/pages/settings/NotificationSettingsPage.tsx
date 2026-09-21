function NotificationRow({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-6 py-5">
      <div>
        <p className="text-sm font-medium text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-4 w-4 shrink-0 accent-indigo-500"
      />
    </label>
  );
}

export function NotificationSettingsPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Notifications
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose what you want Planora to notify you about.
        </p>
      </div>

      <div className="divide-y divide-slate-200 px-6">
        <NotificationRow
          title="Task assigned"
          description="Notify me when someone assigns a task to me."
          defaultChecked
        />

        <NotificationRow
          title="Task due soon"
          description="Notify me when one of my tasks is approaching its due date."
          defaultChecked
        />

        <NotificationRow
          title="Project updates"
          description="Receive notifications about changes in my projects."
          defaultChecked
        />

        <NotificationRow
          title="New project member"
          description="Notify me when someone joins one of my projects."
        />

        <NotificationRow
          title="Email notifications"
          description="Send important Planora notifications to my email."
          defaultChecked
        />
      </div>

      <div className="flex justify-end border-t border-slate-200 p-6">
        <button
          type="button"
          className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}