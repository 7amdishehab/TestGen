import { Outlet } from 'react-router-dom'
import { Sidebar } from '../features/app/shared/components/Sidebar'

export function DashboardLayout() {
    return (
        <div className="min-h-screen bg-(--landing-background) text-(--landing-text)">
            <div className="mx-auto flex w-full">
                <Sidebar />
                <main className="min-w-0 flex-1 px-8 py-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
