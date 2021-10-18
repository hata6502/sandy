import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { FunctionComponent, useMemo } from "react";

export const SandyThemeProvider: FunctionComponent = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: prefersDarkMode ? "dark" : "light",
        primary: {
          main: "#ffeb3b",
        },
        secondary: {
          main: "#ff1744",
        },
      },
    });
  }, [prefersDarkMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
