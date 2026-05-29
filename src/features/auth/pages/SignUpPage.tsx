import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiMail, FiUser } from 'react-icons/fi'
import { ROUTES } from '../../../constants/routes'
import { authApi } from '../../../lib/apiClient'
import { Toast } from '../../../components/ui/Toast'
import { AuthCard } from '../components/AuthCard'
import { CheckboxField } from '../components/CheckboxField'
import { InputField } from '../components/InputField'
import { PasswordField } from '../components/PasswordField'
import { PrimaryButton } from '../components/PrimaryButton'

type FormErrors = {
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SignUpPage() {
    const fullNameId = useId()
    const emailId = useId()
    const passwordId = useId()
    const confirmPasswordId = useId()
    const termsId = useId()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<FormErrors>({})
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const nextErrors: FormErrors = {}
        if (!username.trim()) {
            nextErrors.username = 'Username is required'
        } else if (username.trim().length < 3) {
            nextErrors.username = 'Username must be at least 3 characters'
        }
        if (!email.trim()) {
            nextErrors.email = 'Email is required'
        } else if (!emailPattern.test(email)) {
            nextErrors.email = 'Enter a valid email address'
        }
        if (!password) {
            nextErrors.password = 'Password is required'
        } else if (password.length < 6) {
            nextErrors.password = 'Password must be at least 6 characters'
        }
        if (confirmPassword !== password) {
            nextErrors.confirmPassword = 'Passwords must match'
        }

        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        setIsLoading(true)
        setError(null)
        setMessage(null)
        try {
            await authApi.signUp({
                username: username.trim(),
                email,
                password,
            })
            setMessage('Account created successfully')
            window.setTimeout(() => navigate(ROUTES.signIn), 1500)
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'This email is already registered'
            )
        } finally {
            setIsLoading(false)
        }
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
                    name="username"
                    label="Full Name"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="name"
                    placeholder="name"
                    required
                    icon={<FiUser size={18} />}
                />
                {errors.username ? (
                    <p className="-mt-5 text-xs text-red-300">
                        {errors.username}
                    </p>
                ) : null}

                <InputField
                    id={emailId}
                    name="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    placeholder="name@gmail.com"
                    required
                    icon={<FiMail size={18} />}
                />
                {errors.email ? (
                    <p className="-mt-5 text-xs text-red-300">
                        {errors.email}
                    </p>
                ) : null}

                <PasswordField
                    id={passwordId}
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                />
                {errors.password ? (
                    <p className="-mt-5 text-xs text-red-300">
                        {errors.password}
                    </p>
                ) : null}

                <PasswordField
                    id={confirmPasswordId}
                    name="confirmPassword"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                />
                {errors.confirmPassword ? (
                    <p className="-mt-5 text-xs text-red-300">
                        {errors.confirmPassword}
                    </p>
                ) : null}

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

                {message ? <Toast variant="success">{message}</Toast> : null}
                {error ? <Toast variant="error">{error}</Toast> : null}

                <PrimaryButton
                    type="submit"
                    disabled={isLoading}
                    rightIcon={<FiArrowRight size={18} />}
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </PrimaryButton>
            </form>
        </AuthCard>
    )
}
