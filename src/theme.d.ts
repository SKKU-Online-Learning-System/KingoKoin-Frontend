import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    fontFamily: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    fontFamily?: string;
  }

  interface TypographyVariants {
    display: React.CSSProperties;
    logo: React.CSSProperties;
    "title-m": React.CSSProperties;
    "title-l": React.CSSProperties;
    "label-m": React.CSSProperties;
    "label-l": React.CSSProperties;
    body?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    display?: React.CSSProperties;
    logo?: React.CSSProperties;
    "title-m"?: React.CSSProperties;
    "title-l"?: React.CSSProperties;
    "label-m"?: React.CSSProperties;
    "label-l"?: React.CSSProperties;
    body?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display: true;
    display?: true;
    logo?: true;
    "title-m"?: true;
    "title-l"?: true;
    "label-m"?: true;
    "label-l"?: true;
    body?: true;
    h3: false;
  }
}
