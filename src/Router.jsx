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
    errorElement: <NotFound />,
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
    children: [{ path: "dashboard", element: <Dashboard /> }],
  },
  {
    path: "/main/admin",
    element: <Frame />,
    children: [
      { path: "users", element: <Users /> },
      { path: "coin", element: <Coin /> },
      { path: "policies", element: <Policies /> },
      { path: "analysis", element: <Analysis /> },
    ],
  },
]);

export default router;
