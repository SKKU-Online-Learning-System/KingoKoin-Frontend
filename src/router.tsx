import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Frame from "./components/Frame";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
  },
  // {
  //   path: "/main",
  //   element: <Frame />,
  //   children: [{ path: "dashboard", element: <Dashboard /> }],
  // },
]);

export default router;
