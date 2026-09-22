import { Camera, ChevronLeft, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

export function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8">
        <Link
          to="/settings"
          className="mb-4 flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ChevronLeft size={17} />
          Back to settings
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and account details.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-5 border-b border-slate-200 p-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-semibold text-indigo-600">
              PL
            </div>

            <button
              type="button"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white transition hover:bg-slate-700"
              aria-label="Change profile photo"
            >
              <Camera size={15} />
            </button>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">Profile photo</h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload a photo to personalize your account.
            </p>

            <button
              type="button"
              className="mt-3 text-sm font-medium text-indigo-500 transition hover:text-indigo-600"
            >
              Upload new photo
            </button>
          </div>
        </div>

        <form className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Personal information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your personal details.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="full-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="full-name"
                  type="text"
                  defaultValue="Planora User"
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="profile-email"
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
                  id="profile-email"
                  type="email"
                  defaultValue="user@planora.com"
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
