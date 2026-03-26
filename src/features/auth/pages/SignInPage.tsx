import { useId } from 'react'
import { Link } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa6'
import { ROUTES } from '../../../constants/routes'
import { AuthCard } from '../components/AuthCard'
import { CheckboxField } from '../components/CheckboxField'
import { Divider } from '../components/Divider'
import { InputField } from '../components/InputField'
import { PasswordField } from '../components/PasswordField'
import { PrimaryButton } from '../components/PrimaryButton'
import { SocialButton } from '../components/SocialButton'

export function SignInPage() {
    const emailId = useId()
    const passwordId = useId()
    const rememberId = useId()

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
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
                    autoComplete="email"
                    placeholder="name@gmail.com"
                    required
                    icon={<FiMail size={18} />}
                />
                <PasswordField
                    id={passwordId}
                    name="password"
                    label="Password"
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
                <div className="flex items-center justify-between gap-4">
                    <CheckboxField id={rememberId} name="remember">
                        Remember me for 30 days
                    </CheckboxField>
                </div>

                <PrimaryButton type="submit">Sign In</PrimaryButton>
            </form>

            <Divider />

            <div className="flex flex-col gap-3 sm:flex-row">
                <SocialButton icon={<FaGithub size={18} />} label="GitHub" />
                <SocialButton icon={<FaGoogle size={18} />} label="Google" />
            </div>
        </AuthCard>
    )
}
