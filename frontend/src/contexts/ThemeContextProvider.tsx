import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState
} from 'react';
import { CssBaseline, type PaletteMode, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../utils/theme'; // Define the context shape

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const toggleTheme = useMemo(
    () => () => {
      setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    },
    []
  );

  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme
    }),
    [mode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider'
    );
  }
  return context;
};
