import { Route, Routes } from "react-router-dom";

import { AppLayout } from "../components/layout/AppLayout";
import { AuthLayout } from "../components/layout/AuthLayout";
import { SettingsLayout } from "../components/layout/SettingsLayout";

import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";
import { ProfilePage } from "../pages/profile/ProfilePage";

import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { ProjectDetailsPage } from "../pages/projects/ProjectDetailsPage";
import { ProjectsPage } from "../pages/projects/ProjectsPage";
import { ProjectMembersPage } from "../pages/projects/ProjectMembersPage";
import { ProjectWorkflowPage } from "../pages/projects/ProjectWorkflowPage";
import { ProjectSettingsPage } from "../pages/projects/ProjectSettingsPage";

import { TasksPage } from "../pages/tasks/TasksPage";

import { AccessDeniedPage } from "../pages/system/AccessDeniedPage";
import { NotFoundPage } from "../pages/system/NotFoundPage";

import { SettingsPage } from "../pages/settings/SettingsPage";
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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/projects/:projectId/members" element={<ProjectMembersPage />} />
        <Route path="/projects/:projectId/workflow" element={<ProjectWorkflowPage />} />
        <Route path="/projects/:projectId/settings" element={<ProjectSettingsPage />} />
        <Route path="/403" element={<AccessDeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />

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
