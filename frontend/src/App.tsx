import {ApplicationContextProvider} from "./contexts/ApplicationContextProvider.tsx";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Account from "./pages/Account.tsx";
import QuestionnaireRoutes from "./routes/QuestionnaireRoutes.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";
import {AuthProvider} from "./contexts/AuthProvider.tsx";

function App() {
  return <ApplicationContextProvider>
    <AuthProvider>
      <Routes>
        <Route path={"/signup"} element={<Signup/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/account"} element={<Account/>}/>
          <Route path={"/questionnaire/*"} element={<QuestionnaireRoutes/>}/>
        </Route>
        <Route path={"*"} element={<NotFound/>}/>
      </Routes>
    </AuthProvider>
  </ApplicationContextProvider>;
}

export default App;
