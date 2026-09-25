import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-96 items-center justify-center">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          The page you're looking for doesn't exist or may have been moved.
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
            className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            <Home size={17} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}