// ThemeProvider.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeContextType {
  toggle: () => void;
  mode: "light" | "dark";
}

const ThemeToggleContext = createContext<ThemeContextType>({
  toggle: () => {},
  mode: "light",
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("tm_theme") as "light" | "dark") || "light"
  );

  const toggle = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("tm_theme", next);
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeToggleContext.Provider value={{ toggle, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
