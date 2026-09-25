import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 font-bold text-white">
              LV
            </div>
          </div>

          <p className="text-lg font-semibold text-slate-900">
            Lunvexa
          </p>
        </div>

        <Outlet />
      </div>
    </div>
  );
}