import {useAuthenticationContext} from "../contexts/AuthenticationContextProvider.tsx";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
  const {isAuthenticated} = useAuthenticationContext();
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>;
}

export default ProtectedRoutes;
