import { useId } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { ROUTES } from '../../../constants/routes'
import { AuthCard } from '../components/AuthCard'
import { PasswordField } from '../components/PasswordField'
import { PrimaryButton } from '../components/PrimaryButton'

export function ResetPasswordPage() {
    const newPasswordId = useId()
    const confirmPasswordId = useId()

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <AuthCard
            ariaLabel="Reset password"
            title="Create New Password"
            subtitle="Your new password must be different from previously used passwords to ensure account security."
            footer={
                <Link
                    to={ROUTES.signIn}
                    className="inline-flex items-center justify-center gap-2 text-sm text-(--color-muted) hover:text-(--color-text) focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-card) focus-visible:outline-none"
                >
                    <FiArrowLeft size={16} aria-hidden="true" />
                    Back to Sign In
                </Link>
            }
        >
            <form className="flex flex-col gap-7" onSubmit={onSubmit}>
                <PasswordField
                    id={newPasswordId}
                    name="newPassword"
                    label="New Password"
                    autoComplete="new-password"
                    placeholder="Enter at least 8 characters"
                    required
                />

                <PasswordField
                    id={confirmPasswordId}
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    autoComplete="new-password"
                    placeholder="Repeat your new password"
                    required
                />

                <section className="flex flex-col gap-3 rounded-[10px] border border-(--color-border) bg-(--color-input) p-4">
                    <p className="text-xs font-semibold tracking-wide text-(--color-muted)">
                        SECURITY CHECK
                    </p>

                    <div className="grid grid-cols-1 gap-2 text-xs text-(--color-muted) sm:grid-cols-2">
                        <div className="inline-flex items-center gap-2">
                            <FiCheckCircle size={14} aria-hidden="true" />
                            8+ characters
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <FiCheckCircle size={14} aria-hidden="true" />
                            Special character
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <FiCheckCircle size={14} aria-hidden="true" />
                            One uppercase
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <FiCheckCircle size={14} aria-hidden="true" />
                            One number
                        </div>
                    </div>
                </section>

                <PrimaryButton type="submit">Reset Password</PrimaryButton>
            </form>
        </AuthCard>
    )
}
