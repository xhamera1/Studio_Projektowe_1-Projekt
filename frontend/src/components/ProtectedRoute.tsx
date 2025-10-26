import React, {type JSX, useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext.tsx'

/* This component is a route guard: it redirects to /login when no token is present.
   When a token exists it renders the given children (protected content). */
export default function ProtectedRoute({ children }: { children: React.ReactNode }): JSX.Element {
    const { token } = useContext(AuthContext)
    if (!token) return <Navigate to="/login" replace />
    return <>{children}</>
}