import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { AppLayout } from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { MainLayout } from '../layouts/MainLayout'
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage'
import { SignInPage } from '../pages/auth/SignInPage'
import { SignUpPage } from '../pages/auth/SignUpPage'
import { DashboardPage } from '../pages/app/DashboardPage'
import { ExportPage } from '../pages/app/ExportPage'
import { HomePage } from '../pages/app/HomePage'
import { ProjectsPage } from '../pages/app/ProjectsPage'
import { HowItWorksPage } from '../features/landing/pages/HowItWorksPage'
import { SettingsPage } from '../pages/app/SettingsPage'
import { UploadRequirementsPage } from '../pages/app/UploadRequirementsPage'
import { RequireAuth } from './RequireAuth'

export function AppRouter() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path={ROUTES.signIn} element={<SignInPage />} />
                <Route path={ROUTES.signUp} element={<SignUpPage />} />
                <Route
                    path={ROUTES.forgotPassword}
                    element={<ForgotPasswordPage />}
                />
                <Route
                    path={ROUTES.resetPassword}
                    element={<ResetPasswordPage />}
                />
            </Route>

            <Route element={<AppLayout />}>
                <Route element={<MainLayout />}>
                    <Route
                        path={ROUTES.howItWorks}
                        element={<HowItWorksPage />}
                    />

                    {/* All main pages are public; auth will be enforced only on specific actions like generating test cases. */}
                    <Route path={ROUTES.home} element={<HomePage />} />
                </Route>

                <Route element={<RequireAuth />}>
                    <Route element={<DashboardLayout />}>
                        <Route
                            path={ROUTES.dashboard}
                            element={<DashboardPage />}
                        />
                        <Route
                            path={ROUTES.projects}
                            element={<ProjectsPage />}
                        />
                        <Route path={ROUTES.export} element={<ExportPage />} />
                        <Route
                            path={ROUTES.userProfile}
                            element={<SettingsPage />}
                        />
                        <Route
                            path={ROUTES.settings}
                            element={
                                <Navigate to={ROUTES.userProfile} replace />
                            }
                        />
                        <Route
                            path={ROUTES.uploadRequirements}
                            element={<UploadRequirementsPage />}
                        />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Routes>
    )
}
