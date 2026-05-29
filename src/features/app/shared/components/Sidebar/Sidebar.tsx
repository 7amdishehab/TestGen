import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import {
    drawerVariants,
    overlayVariants,
    defaultTransition,
} from '../../../../../lib/motionVariants'
import { ROUTES } from '../../../../../constants/routes'
import Logo from '../../../../landing/components/Logo'
import { SidebarNavItem } from './SidebarNavItem'
import {
    LuClipboardList,
    LuFileDown,
    LuFolderKanban,
    LuLayoutDashboard,
    LuHouse,
    LuLogOut,
    LuUser,
} from 'react-icons/lu'
import { useAuth } from '../../../../../hooks/useAuth'
// `cn` import removed — not used in this file to avoid ESLint unused-var error

type SidebarProps = {
    mobileOpen?: boolean
    onMobileClose?: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
    const shouldReduceMotion = useReducedMotion()
    const { logout, user } = useAuth()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    async function handleLogout() {
        if (isLoggingOut) return

        setIsLoggingOut(true)
        try {
            await logout()
        } finally {
            setIsLoggingOut(false)
            onMobileClose?.()
        }
    }

    const inner = (
        <div className="flex h-full flex-col">
            <Link
                to={ROUTES.home}
                className="mb-8 inline-flex items-center gap-2 px-2 text-lg font-semibold text-(--landing-text)"
                onClick={onMobileClose}
            >
                <Logo />
                TestGen
            </Link>

            <nav className="flex flex-col gap-1">
                <SidebarNavItem
                    to={ROUTES.home}
                    icon={<LuHouse size={18} />}
                    label="Home"
                    onNavigate={onMobileClose}
                />
                <SidebarNavItem
                    to={ROUTES.dashboard}
                    icon={<LuLayoutDashboard size={18} />}
                    label="Dashboard"
                    onNavigate={onMobileClose}
                />
                <SidebarNavItem
                    to={ROUTES.projects}
                    icon={<LuFolderKanban size={18} />}
                    label="Projects"
                    onNavigate={onMobileClose}
                />
                <SidebarNavItem
                    to={ROUTES.uploadRequirements}
                    icon={<LuClipboardList size={18} />}
                    label="Test Suites"
                    onNavigate={onMobileClose}
                />
                <SidebarNavItem
                    to={ROUTES.export}
                    icon={<LuFileDown size={18} />}
                    label="Export & Connect"
                    onNavigate={onMobileClose}
                />
                <SidebarNavItem
                    to={ROUTES.userProfile}
                    icon={<LuUser size={18} />}
                    label="User Profile"
                    onNavigate={onMobileClose}
                />
            </nav>

            <div className="mt-auto">
                <div className="rounded-[16px] border border-(--landing-border) bg-(--landing-card) p-4">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <div
                                className="h-10 w-10 shrink-0 rounded-full border border-(--landing-border) bg-(--landing-background)/30"
                                aria-hidden="true"
                            />

                            <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-(--landing-text)">
                                    {user?.email ?? 'TestGen User'}
                                </div>
                                <div className="text-xs text-(--landing-subtle)">
                                    {user?.role ?? 'Customer'}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-(--landing-border) bg-(--landing-background)/20 text-(--landing-muted) transition-colors hover:bg-(--landing-background)/40 hover:text-(--landing-text)"
                            aria-label="Sign out"
                            title="Sign out"
                            disabled={isLoggingOut}
                            onClick={() => void handleLogout()}
                        >
                            <LuLogOut size={18} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <AnimatePresence>
                {mobileOpen ? (
                    <motion.div
                        variants={overlayVariants}
                        initial={shouldReduceMotion ? undefined : 'initial'}
                        animate={shouldReduceMotion ? undefined : 'animate'}
                        exit={shouldReduceMotion ? undefined : 'exit'}
                        transition={{ ...defaultTransition, duration: 0.18 }}
                        className="fixed inset-0 z-40 bg-black/60 md:hidden"
                        onClick={onMobileClose}
                        aria-hidden="true"
                    />
                ) : null}
            </AnimatePresence>

            {/* Desktop / large: static sidebar */}
            <aside className="z-50 hidden h-screen w-[280px] shrink-0 border-r border-(--landing-border) bg-(--landing-background) px-4 py-6 md:static md:sticky md:top-0 md:block">
                {inner}
            </aside>

            {/* Mobile slide-over */}
            <AnimatePresence>
                {mobileOpen ? (
                    <motion.aside
                        variants={drawerVariants}
                        initial={shouldReduceMotion ? undefined : 'initial'}
                        animate={shouldReduceMotion ? undefined : 'animate'}
                        exit={shouldReduceMotion ? undefined : 'exit'}
                        transition={{ ...defaultTransition, duration: 0.22 }}
                        className="fixed inset-y-0 left-0 z-50 w-[280px] shrink-0 border-r border-(--landing-border) bg-(--landing-background) px-4 py-6 md:hidden"
                    >
                        {inner}
                    </motion.aside>
                ) : null}
            </AnimatePresence>
        </>
    )
}
