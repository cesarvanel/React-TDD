import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../ui/components/Layout/Layout";
import HomeView from "../ui/pages/Home/view/HomeView";
import LoginView from "../ui/pages/login/view/LoginView";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
    ],
  },
]);
