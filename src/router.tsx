import Frame from "./components/Frame";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Coin from "./pages/Coin";
import Policies from "./pages/Policies";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/main",
    element: <Frame />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "admin",
        element: <Main />,
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
