import { Navigate, Outlet } from 'react-router-dom';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';

const ProtectedRoutes = () => {
  const { isUserAuthenticated } = useApplicationContext();
  return isUserAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
