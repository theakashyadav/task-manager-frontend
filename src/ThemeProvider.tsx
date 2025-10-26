import React, { useMemo, useState, createContext, useContext } from 'react';
import { createTheme, ThemeProvider as MuiProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeToggleContext = createContext({ toggle: ()=>{}, mode: 'light' as 'light'|'dark' });
export const useThemeToggle = () => useContext(ThemeToggleContext);

export const Provider: React.FC<{children:any}> = ({ children })=>{
  const [mode, setMode] = useState<'light'|'dark'>(()=> (localStorage.getItem('tm_mode') as 'light'|'dark') || 'light');
  const toggle = ()=> { const next = mode === 'light' ? 'dark' : 'light'; setMode(next); localStorage.setItem('tm_mode', next); };
  const theme = useMemo(()=> createTheme({ palette: { mode } }), [mode]);
  return (
    <ThemeToggleContext.Provider value={{ toggle, mode }}>
      <MuiProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiProvider>
    </ThemeToggleContext.Provider>
  );
};
