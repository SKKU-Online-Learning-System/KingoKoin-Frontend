import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Policy from "./pages/Policy/Policy";
import Users from "./pages/Users/Users";
import Koin from "./pages/Koin/Koin";
import NotFound from "./pages/NotFound/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
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
            path="/dashboard"
            element={
              <>
                <Top1 />
                <Top2 />
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <Top1 />
                <Top2 />
                <Sidebar>
                  <Users />
                </Sidebar>
              </>
            }
          />
          <Route
            path="/koin"
            element={
              <>
                <Top1 />
                <Top2 />
                <Sidebar>
                  <Koin />
                </Sidebar>
              </>
            }
          />
          <Route
            path="/policy"
            element={
              <>
                <Top1 />
                <Top2 />
                <Sidebar>
                  <div style={{ borderTopLeftRadius: "10px" }}>
                    <Policy />
                  </div>
                </Sidebar>
              </>
            }
          />
          <Route path="*" element={<NotFound />} /> {/* catch-all route */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
