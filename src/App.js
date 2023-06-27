import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Page1 from "./pages/Page1/Page1";
import Page2 from "./pages/Dashboard/Dashboard";
import Page3 from "./pages/Page3/Page3";
import NotFound from "./pages/NotFound/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";

import Sidebar from "./components/Sidebar";

import Top1 from "./components/Top1";
import Top2 from "./components/Top2";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/page1"
            element={
              <>
                <Top1 />
                <Top2 />
                <Sidebar>
                  <div style={{ borderTopLeftRadius: "10px" }}>
                    <Page1 />
                  </div>
                </Sidebar>
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Top1 />
                <Top2 />
                <Sidebar>
                  <Page2 />
                </Sidebar>
              </>
            }
          />
          <Route
            path="/page3"
            element={
              <>
                <Top1 />
                <Top2 />
                <Sidebar>
                  <Page3 />
                </Sidebar>
              </>
            }
          />
          <Route path="*" element={<NotFound />} /> {/* catch-all route */}
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
