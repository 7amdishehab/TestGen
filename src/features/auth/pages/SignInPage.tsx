import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'
import { ROUTES } from '../../../constants/routes'
import { authApi } from '../../../lib/apiClient'
import { useAuth } from '../../../hooks/useAuth'
import { Toast } from '../../../components/ui/Toast'
import { AuthCard } from '../components/AuthCard'
import { CheckboxField } from '../components/CheckboxField'
import { InputField } from '../components/InputField'
import { PasswordField } from '../components/PasswordField'
import { PrimaryButton } from '../components/PrimaryButton'

type FormErrors = {
    email?: string
    password?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SignInPage() {
    const emailId = useId()
    const passwordId = useId()
    const rememberId = useId()
    const navigate = useNavigate()
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<FormErrors>({})
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const nextErrors: FormErrors = {}
        if (!email.trim()) {
            nextErrors.email = 'Email is required'
        } else if (!emailPattern.test(email)) {
            nextErrors.email = 'Enter a valid email address'
        }
        if (!password) nextErrors.password = 'Password is required'

        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        setIsLoading(true)
        setError(null)
        try {
            const data = await authApi.signIn({ email, password })
            login(data)
            navigate(ROUTES.dashboard)
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Invalid email or password'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthCard
            ariaLabel="Sign in"
            title="Welcome back"
            subtitle="Enter your credentials to access your dashboard"
            footer={
                <>
                    Don&apos;t have an account?{' '}
                    <Link
                        to={ROUTES.signUp}
                        className="font-bold text-(--color-primary) hover:underline focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-card) focus-visible:outline-none"
                    >
                        Create an account
                    </Link>
                </>
            }
        >
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
                    <p className="-mt-3 text-xs text-red-300">
                        {errors.email}
                    </p>
                ) : null}
                <PasswordField
                    id={passwordId}
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                    labelRight={
                        <Link
                            to={ROUTES.forgotPassword}
                            className="text-xs font-medium text-(--color-primary) hover:underline focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-card) focus-visible:outline-none"
                        >
                            Forgot password?
                        </Link>
                    }
                />
                {errors.password ? (
                    <p className="-mt-3 text-xs text-red-300">
                        {errors.password}
                    </p>
                ) : null}
                <div className="flex items-center justify-between gap-4">
                    <CheckboxField id={rememberId} name="remember">
                        Remember me for 30 days
                    </CheckboxField>
                </div>

                {error ? <Toast variant="error">{error}</Toast> : null}

                <PrimaryButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </PrimaryButton>
            </form>
        </AuthCard>
    )
}
