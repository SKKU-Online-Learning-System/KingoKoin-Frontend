import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Koin from "./pages/Koin/Koin";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Policy from "./pages/Policy/Policy";
import Users from "./pages/Users/Users";

import Sidebar from "./components/Sidebar";
import Top1 from "./components/Top1";
import Top2 from "./components/Top2";
import Policies from "./pages/Policy/Policies";

const queryClient = new QueryClient();

function App() {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#2B6653",
        contrastText: "#F2F2F2",
      },
      secondary: {
        main: "#FF6B0F",
      },
      error: {
        main: "#C54154",
      },
    },
    fontFamily: ["Gugi", "Noto Sans KR"].join(","),
    typography: {
      display: {
        fontFamily: "Noto Sans KR",
        fontSize: "30px",
        fontWeight: "700",
      },
      logo: {
        fontFamily: "Gugi",
        fontSize: "24px",
        fontWeight: "400",
      },
      "title-m": {
        fontFamily: "Noto Sans KR",
        fontSize: "24px",
        fontWeight: "500",
      },
      "title-l": {
        fontFamily: "Noto Sans KR",
        fontSize: "24px",
        fontWeight: "300",
      },

      "label-m": {
        fontFamily: "Noto Sans KR",
        fontSize: "16px",
        fontWeight: "500",
      },
      "label-l": {
        fontFamily: "Noto Sans KR",
        fontSize: "16px",
        fontWeight: "300",
      },
      body: {
        fontFamily: "Noto Sans KR",
        fontSize: "14px",
        fontWeight: "100",
        lineHeight: "2em",
      },
      caption: {
        fontFamily: "Noto Sans KR",
        fontSize: "10px",
        fontWeight: "100",
      },
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <StyledEngineProvider injectFirst>
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
                path="/main"
                element={
                  <>
                    <Main />
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
                      <Policy />
                    </Sidebar>
                  </>
                }
              />
              <Route
                path="/policies"
                element={
                  <>
                    <Top1 />
                    <Top2 />
                    <Sidebar>
                      <Policies />
                    </Sidebar>
                  </>
                }
              />
              <Route path="*" element={<NotFound />} /> {/* catch-all route */}
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
