import { Outlet } from 'react-router-dom'

export function AuthLayout() {
    return (
        <div className="min-h-screen bg-(--color-background)">
            <div className="mx-auto flex min-h-screen w-full max-w-[500px] items-center justify-center p-6">
                <Outlet />
            </div>
        </div>
    )
}
