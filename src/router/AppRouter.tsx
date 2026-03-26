import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { AppLayout } from "../layouts/AppLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";
import { SignInPage } from "../pages/auth/SignInPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { DashboardPage } from "../pages/app/DashboardPage";
import { ExportPage } from "../pages/app/ExportPage";
import { HomePage } from "../pages/app/HomePage";
import { HowItWorksPage } from "../pages/app/HowItWorksPage";
import { UploadRequirementsPage } from "../pages/app/UploadRequirementsPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.signIn} element={<SignInPage />} />
        <Route path={ROUTES.signUp} element={<SignUpPage />} />
        <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.resetPassword} element={<ResetPasswordPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path={ROUTES.howItWorks} element={<HowItWorksPage />} />

        {/* All main pages are public; auth will be enforced only on specific actions like generating test cases. */}
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.export} element={<ExportPage />} />
        <Route
          path={ROUTES.uploadRequirements}
          element={<UploadRequirementsPage />}
        />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}
