import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Forgot your password?
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      <form className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          Send reset link
        </button>
      </form>

      <div className="mt-8 flex justify-center">
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
        >
          <ArrowLeft size={16} />
          Back to sign in
        </Link>
      </div>
    </>
  );
}