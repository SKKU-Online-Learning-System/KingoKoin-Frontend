import router from "./router";
import { StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";

const muiTheme = createTheme({
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
      fontSize: "20px",
      fontWeight: "400",
    },
    "title-m": {
      fontFamily: "Noto Sans KR",
      fontSize: "20px",
      fontWeight: "500",
    },
    "title-l": {
      fontFamily: "Noto Sans KR",
      fontSize: "20px",
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
      fontSize: "12px",
      fontWeight: "100",
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
