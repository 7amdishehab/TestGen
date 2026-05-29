import { Outlet } from 'react-router-dom'
import { Footer } from '../features/landing/components/Footer'
import { Navbar } from '../features/landing/components/Navbar'

export function MainLayout() {
    return (
        <div className="bg-(--landing-background) text-(--landing-text)">
            <Navbar />
            <main id="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
