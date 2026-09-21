import { Route, Routes } from "react-router-dom";

import { AppLayout } from "../components/layout/AppLayout";
import { AuthLayout } from "../components/layout/AuthLayout";
import { SettingsLayout } from "../components/layout/SettingsLayout";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/ResetPasswordPage";
import { ProfilePage } from "../pages/ProfilePage";

import { DashboardPage } from "../pages/DashboardPage";
import { ProjectDetailsPage } from "../pages/ProjectDetailsPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { TasksPage } from "../pages/TasksPage";
import { SettingsPage } from "../pages/SettingsPage";
import { GeneralSettingsPage } from "../pages/settings/GeneralSettingsPage";
import { SecuritySettingsPage } from "../pages/settings/SecuritySettingsPage";
import { NotificationSettingsPage } from "../pages/settings/NotificationSettingsPage";
import { AppearanceSettingsPage } from "../pages/settings/AppearanceSettingsPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="general" element={<GeneralSettingsPage />} />

          <Route path="security" element={<SecuritySettingsPage />} />

          <Route path="notifications" element={<NotificationSettingsPage />} />

          <Route path="appearance" element={<AppearanceSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
