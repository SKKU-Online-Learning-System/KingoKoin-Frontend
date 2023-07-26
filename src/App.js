import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import "./App.css";

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
        fontSize: "24px",
        fontWeight: "700",
      },
      logo: {
        fontFamily: "Gugi",
        fontSize: "18px",
        fontWeight: "400",
      },
      "title-m": {
        fontFamily: "Noto Sans KR",
        fontSize: "18px",
        fontWeight: "500",
      },
      "title-l": {
        fontFamily: "Noto Sans KR",
        fontSize: "18px",
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
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
