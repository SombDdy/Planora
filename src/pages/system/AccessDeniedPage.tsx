import { ArrowLeft, ShieldX } from "lucide-react";
import { Link } from "react-router-dom";

export function AccessDeniedPage() {
  return (
    <div className="flex min-h-96 items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <ShieldX size={26} />
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-red-500">
          Error 403
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Access denied
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          You don't have permission to access this page.
        </p>

        <div className="mt-7 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Go back
          </button>

          <Link
            to="/"
            className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}