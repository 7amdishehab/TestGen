import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'

export function RequireAuth() {
    const { isAuthenticated } = useAuth()
    const location = useLocation()
    const hasToken =
        typeof window !== 'undefined' &&
        Boolean(localStorage.getItem('testgen_token'))

    if (!isAuthenticated && !hasToken) {
        return (
            <Navigate
                to={ROUTES.signIn}
                replace
                state={{ from: location.pathname }}
            />
        )
    }

    return <Outlet />
}
