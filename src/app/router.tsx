import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import DashboardPage from "../pages/DashboardPage";
import SprintPage from "../pages/SprintPage";
import AdminPage from "../pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/sprint", element: <SprintPage /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
]);