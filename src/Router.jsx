import Dashboard from "./pages/Dashboard/Dashboard";
import Coin from "./pages/Coin/Coin";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Policies from "./pages/Policies/Policies";
import Users from "./pages/Users/Users";
import Analysis from "./pages/Analysis/Analysis";
import Main from "./pages/Main/Main";
import Frame from "./components/Frame";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/main/login",
    element: <Login />,
  },
  {
    path: "/main",
    element: <Frame />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "admin/users", element: <Users /> },
      { path: "admin/coin", element: <Coin /> },
      { path: "admin/policies", element: <Policies /> },
      { path: "admin/analysis", element: <Analysis /> },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
