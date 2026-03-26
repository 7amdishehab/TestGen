import { useId } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiMail, FiUser } from 'react-icons/fi'
import { ROUTES } from '../../../constants/routes'
import { AuthCard } from '../components/AuthCard'
import { CheckboxField } from '../components/CheckboxField'
import { InputField } from '../components/InputField'
import { PasswordField } from '../components/PasswordField'
import { PrimaryButton } from '../components/PrimaryButton'

export function SignUpPage() {
    const fullNameId = useId()
    const emailId = useId()
    const passwordId = useId()
    const confirmPasswordId = useId()
    const termsId = useId()

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <AuthCard
            ariaLabel="Create account"
            title="Create an account"
            subtitle="Enter your details below to get started with your 14-day free trial."
            footer={
                <>
                    Already have an account?{' '}
                    <Link
                        to={ROUTES.signIn}
                        className="font-bold text-(--color-primary) hover:underline focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-card) focus-visible:outline-none"
                    >
                        Sign In
                    </Link>
                </>
            }
        >
            <form className="flex flex-col gap-7" onSubmit={onSubmit}>
                <InputField
                    id={fullNameId}
                    name="fullName"
                    label="Full Name"
                    type="text"
                    autoComplete="name"
                    placeholder="name"
                    required
                    icon={<FiUser size={18} />}
                />

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

                <PasswordField
                    id={passwordId}
                    name="password"
                    label="Password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                />

                <PasswordField
                    id={confirmPasswordId}
                    name="confirmPassword"
                    label="Confirm Password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                />

                <CheckboxField id={termsId} name="terms" required>
                    <div className="text-[12px]">
                        By clicking &quot;Create Account&quot;, I agree to the{' '}
                        <a
                            href="#"
                            className="font-medium text-(--color-primary) hover:underline focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-card) focus-visible:outline-none"
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href="#"
                            className="font-medium text-(--color-primary) hover:underline focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-card) focus-visible:outline-none"
                        >
                            Privacy Policy
                        </a>
                        .
                    </div>
                </CheckboxField>

                <PrimaryButton
                    type="submit"
                    rightIcon={<FiArrowRight size={18} />}
                >
                    Create Account
                </PrimaryButton>
            </form>
        </AuthCard>
    )
}
