import { Link } from 'react-router-dom'
import { ROUTES } from '../../../../../constants/routes'
import Logo from '../../../../landing/components/Logo'
import { SidebarNavItem } from './SidebarNavItem'
import {
    LuClipboardList,
    LuFileDown,
    LuLayoutDashboard,
    LuSettings,
    LuHouse,
    LuLogOut,
} from 'react-icons/lu'
import { cn } from '../../../../../utils/cn'

type SidebarProps = {
    mobileOpen?: boolean
    onMobileClose?: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
    return (
        <>
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-black/60 md:hidden',
                    mobileOpen ? 'block' : 'hidden'
                )}
                onClick={onMobileClose}
                aria-hidden="true"
            />

            <aside
                className={cn(
                    'z-50 h-screen w-[280px] shrink-0 border-r border-(--landing-border) bg-(--landing-background) px-4 py-6',
                    'md:sticky md:top-0',
                    'fixed inset-y-0 left-0 md:static',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full',
                    'transition-transform md:translate-x-0'
                )}
            >
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
                            to={ROUTES.settings}
                            icon={<LuSettings size={18} />}
                            label="Settings"
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
                                            Ayman Nasr
                                        </div>
                                        <div className="text-xs text-(--landing-subtle)">
                                            Pro Plan
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-(--landing-border) bg-(--landing-background)/20 text-(--landing-muted) transition-colors hover:bg-(--landing-background)/40 hover:text-(--landing-text)"
                                    aria-label="Sign out"
                                    title="Sign out"
                                >
                                    <LuLogOut size={18} aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
