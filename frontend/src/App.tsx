import {ApplicationContextProvider} from "./contexts/ApplicationContextProvider.tsx";
import {AuthenticationContextProvider} from "./contexts/AuthenticationContextProvider.tsx";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Account from "./pages/Account.tsx";
import QuestionnaireRoutes from "./routes/QuestionnaireRoutes.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";

function App() {
  return <ApplicationContextProvider>
    <AuthenticationContextProvider>
      <NavBar/>
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
    </AuthenticationContextProvider>
  </ApplicationContextProvider>;
}

export default App;
