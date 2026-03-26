import { useId } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiMail } from 'react-icons/fi'
import { ROUTES } from '../../../constants/routes'
import { AuthCard } from '../components/AuthCard'
import { InputField } from '../components/InputField'
import { PrimaryButton } from '../components/PrimaryButton'

export function ForgotPasswordPage() {
    const emailId = useId()

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <AuthCard
            ariaLabel="Forgot password"
            title="Forgot Password?"
            subtitle="No worries! Enter your email below and we'll send you instructions to reset your password."
            footer={
                <Link
                    to={ROUTES.signIn}
                    className="inline-flex items-center justify-center gap-2 text-sm text-(--color-muted) hover:text-(--color-text) focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-card) focus-visible:outline-none"
                >
                    <FiArrowLeft size={16} aria-hidden="true" />
                    Back to Login
                </Link>
            }
        >
            <form className="flex flex-col gap-7" onSubmit={onSubmit}>
                <InputField
                    id={emailId}
                    name="email"
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    placeholder="name@gmail.com"
                    required
                    icon={<FiMail size={18} />}
                />

                <PrimaryButton type="submit">Send Reset Link</PrimaryButton>
            </form>
        </AuthCard>
    )
}
