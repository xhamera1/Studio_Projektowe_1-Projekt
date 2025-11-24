import { ApplicationContextProvider } from './contexts/ApplicationContextProvider.tsx';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import Account from './pages/Account.tsx';
import QuestionnaireRoutes from './routes/QuestionnaireRoutes.tsx';
import NotFound from './pages/NotFound.tsx';
import ProtectedRoutes from './routes/ProtectedRoutes.tsx';
import PredictionHistory from './pages/PredictionHistory.tsx';
import AppLayout from './components/AppLayout.tsx';
import { ThemeContextProvider } from './contexts/ThemeContextProvider.tsx';

function App() {
  return (
    <ThemeContextProvider>
      <ApplicationContextProvider>
        <Routes>
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/login'} element={<Login />} />
          <Route element={<AppLayout />}>
            <Route element={<ProtectedRoutes />}>
              <Route path={'/'} element={<Home />} />
              <Route path={'/account'} element={<Account />} />
              <Route
                path={'/prediction-history'}
                element={<PredictionHistory />}
              />
              <Route
                path={'/questionnaire/*'}
                element={<QuestionnaireRoutes />}
              />
            </Route>
          </Route>
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </ApplicationContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
