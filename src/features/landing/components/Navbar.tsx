import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { revealVariants, defaultTransition } from '../../../lib/motionVariants'
import { ROUTES } from '../../../constants/routes'
import { Button } from './Button'
import { Container } from './Container'
import Logo from './Logo'
import { useAuth } from '../../../hooks/useAuth'
import { LuMenu, LuX } from 'react-icons/lu'

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const shouldReduceMotion = useReducedMotion()
    const { user, logout } = useAuth()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const authLabel = user?.email ? `Welcome, ${user.email}` : 'Login'

    async function handleLogout() {
        if (isLoggingOut) return

        setIsLoggingOut(true)
        try {
            await logout()
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <motion.header
            variants={revealVariants}
            initial={shouldReduceMotion ? undefined : 'initial'}
            animate={shouldReduceMotion ? undefined : 'animate'}
            transition={{ ...defaultTransition, duration: 0.45 }}
            className="fixed inset-x-0 top-0 z-50 border-b border-(--landing-border) bg-(--landing-navbar-bg) backdrop-blur"
        >
            <Container className="flex h-16 items-center justify-between gap-6">
                <Link
                    to={ROUTES.home}
                    className="inline-flex items-center gap-2 text-lg font-semibold text-(--landing-text)"
                    onClick={() => setMobileOpen(false)}
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
                    {user ? (
                        <button
                            type="button"
                            className="hidden max-w-[180px] truncate text-(--landing-muted) transition-colors hover:text-(--landing-text) md:block"
                            onClick={() => void handleLogout()}
                            disabled={isLoggingOut}
                            aria-label={`Logout ${user.email}`}
                            title="Click to logout"
                        >
                            {authLabel}
                        </button>
                    ) : (
                        <Link
                            to={ROUTES.signIn}
                            className="hidden text-(--landing-muted) hover:text-(--landing-text) md:block"
                        >
                            Login
                        </Link>
                    )}
                    <Button
                        as="link"
                        to={ROUTES.signUp}
                        variant="primary"
                        size="sm"
                    >
                        Get Started
                    </Button>

                    <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-(--landing-border) bg-(--landing-card) text-(--landing-muted) transition-colors hover:text-(--landing-text) focus-visible:ring-2 focus-visible:ring-(--landing-primary) focus-visible:outline-none md:hidden"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? (
                            <LuX size={18} aria-hidden="true" />
                        ) : (
                            <LuMenu size={18} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </Container>

            <AnimatePresence>
                {mobileOpen ? (
                    <motion.div
                        variants={revealVariants}
                        initial={shouldReduceMotion ? undefined : 'initial'}
                        animate={shouldReduceMotion ? undefined : 'animate'}
                        exit={shouldReduceMotion ? undefined : 'initial'}
                        transition={{
                            ...defaultTransition,
                            duration: 0.3,
                            delay: 0,
                        }}
                        className="border-t border-(--landing-border) bg-(--landing-navbar-bg) backdrop-blur md:hidden"
                    >
                        <Container className="flex flex-col gap-4 py-4">
                            <nav className="flex flex-col gap-5 text-sm">
                                <NavLink
                                    to={ROUTES.home}
                                    end
                                    onClick={() => setMobileOpen(false)}
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
                                    onClick={() => setMobileOpen(false)}
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
                                    onClick={() => setMobileOpen(false)}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-(--landing-primary)'
                                            : 'text-(--landing-muted) hover:text-(--landing-text)'
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </nav>

                            <div className="flex flex-col gap-3">
                                {user ? (
                                    <button
                                        type="button"
                                        className="flex-1 rounded-[10px] border border-(--landing-border) bg-(--landing-card) px-3 py-2 text-center text-sm text-(--landing-muted) transition-colors hover:text-(--landing-text)"
                                        onClick={() => void handleLogout()}
                                        disabled={isLoggingOut}
                                        aria-label={`Logout ${user.email}`}
                                        title="Click to logout"
                                    >
                                        {authLabel}
                                    </button>
                                ) : (
                                    <Button
                                        as="link"
                                        to={ROUTES.signIn}
                                        variant="secondary"
                                        size="sm"
                                        className="flex-1"
                                    >
                                        Login
                                    </Button>
                                )}
                                <Button
                                    as="link"
                                    to={ROUTES.signUp}
                                    variant="primary"
                                    size="sm"
                                    className="flex-1"
                                >
                                    Get Started
                                </Button>
                            </div>
                        </Container>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.header>
    )
}
