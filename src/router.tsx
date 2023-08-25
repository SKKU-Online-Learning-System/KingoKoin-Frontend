import { createBrowserRouter, Outlet } from "react-router-dom";
import Frame from "./components/frames/Frame";
import Analysis from "./pages/Analysis";
import Coin from "./pages/Coin";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Policies from "./pages/Policies";
import Users from "./pages/Users";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <Frame />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          { path: "users", element: <Users /> },
          { path: "coin", element: <Coin /> },
          { path: "policies", element: <Policies /> },
          { path: "analysis", element: <Analysis /> },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
