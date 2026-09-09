import { Routes, Route } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { DashboardPage } from "../pages/DashboardPage";
import { TasksPage } from "../pages/TasksPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { Header } from "../components/layout/Header";
import { ProjectDetailsPage } from "../pages/ProjectDetailsPage";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 bg-slate-50 p-6">
          <Header />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailsPage />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
