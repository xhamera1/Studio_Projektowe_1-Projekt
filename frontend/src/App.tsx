import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContext } from './contexts/AuthContext.tsx'
import Login from './pages/Login'
import Signup from './pages/Signup.tsx'
import Account from './pages/Account.tsx'
import Button from "@mui/material/Button";

/* This function component is a simple protected dashboard view visible only when logged in.
   It shows a logout button which clears the stored token and axios header. */
function Dashboard() {
    const { logout } = useContext(AuthContext)
    return (
        <div className="card">
            <h1>Dashboard</h1>
            <nav>
                <Button
                type="submit"
                variant="contained"
                onClick={() => logout()}>Logout</Button>
            </nav>
        </div>
    )
}

/* This component wires up the app routes: /login and /signup are public, while "/" is protected.
   It renders navigation links and the routes used across the app. */
export default function App() {
    return (
        <div className="App">
            <h1>Studio Projektowe — Frontend</h1>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            </Routes>
        </div>
    )
}