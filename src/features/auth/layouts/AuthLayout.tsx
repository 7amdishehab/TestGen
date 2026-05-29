import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { useAuth } from '../../../hooks/useAuth'
import { ScrollToTop } from '../../../components/ScrollToTop'
import { Footer } from '../../landing/components/Footer'
import { Navbar } from '../../landing/components/Navbar'

export function AuthLayout() {
    const { isAuthenticated } = useAuth()
    const hasToken =
        typeof window !== 'undefined' &&
        Boolean(localStorage.getItem('testgen_token'))

    if (isAuthenticated || hasToken) {
        return <Navigate to={ROUTES.dashboard} replace />
    }

    return (
        <div className="flex min-h-screen flex-col bg-(--landing-background) text-(--landing-text)">
            <ScrollToTop />
            <a
                href="#main-content"
                className="skip-link sr-only focus:not-sr-only"
            >
                Skip to content
            </a>
            <Navbar />
            <main
                id="main-content"
                className="flex flex-1 items-center justify-center px-6 py-24"
            >
                <div className="mx-auto w-full max-w-[500px]">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}
