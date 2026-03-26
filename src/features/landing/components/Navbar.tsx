import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { Button } from './Button'
import { Container } from './Container'
import Logo from './Logo'

export function Navbar() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-(--landing-border) bg-(--landing-navbar-bg) backdrop-blur">
            <Container className="flex h-16 items-center justify-between gap-6">
                <Link
                    to={ROUTES.home}
                    className="inline-flex items-center gap-2 text-lg font-semibold text-(--landing-text)"
                >
                    <Logo />
                    TestGen
                </Link>

                <nav className="hidden items-center gap-6 text-sm md:flex">
                    <NavLink
                        to={ROUTES.home}
                        end
                        className={({ isActive }) =>
                            isActive
                                ? 'text-(--landing-primary)'
                                : 'text-(--landing-muted) hover:text-(--landing-text)'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={ROUTES.howItWorks}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-(--landing-primary)'
                                : 'text-(--landing-muted) hover:text-(--landing-text)'
                        }
                    >
                        How It Works
                    </NavLink>
                    <NavLink
                        to={ROUTES.dashboard}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-(--landing-primary)'
                                : 'text-(--landing-muted) hover:text-(--landing-text)'
                        }
                    >
                        Dashboard
                    </NavLink>
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        to={ROUTES.signIn}
                        className="text-(--landing-muted) hover:text-(--landing-text)"
                    >
                        Login
                    </Link>
                    <Button
                        as="link"
                        to={ROUTES.signUp}
                        variant="primary"
                        size="sm"
                    >
                        Get Started
                    </Button>
                </div>
            </Container>
        </header>
    )
}
