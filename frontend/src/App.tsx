import { UserContextProvider } from './contexts/UserContextProvider.tsx';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import Account from './pages/Account.tsx';
import QuestionnaireRoutes from './routes/QuestionnaireRoutes.tsx';
import NotFound from './pages/NotFound.tsx';
import ProtectedRoutes from './routes/ProtectedRoutes.tsx';
import { AuthenticationContextProvider } from './contexts/AuthenticationContextProvider.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './utils/theme.ts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContextProvider>
        <AuthenticationContextProvider>
          <Routes>
            <Route path={'/signup'} element={<Signup />} />
            <Route path={'/login'} element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path={'/'} element={<Home />} />
              <Route path={'/account'} element={<Account />} />
              <Route
                path={'/questionnaire/*'}
                element={<QuestionnaireRoutes />}
              />
            </Route>
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </AuthenticationContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
