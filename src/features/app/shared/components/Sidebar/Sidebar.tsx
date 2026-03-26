import { Link } from 'react-router-dom'
import { ROUTES } from '../../../../../constants/routes'
import Logo from '../../../../landing/components/Logo'
import { SidebarNavItem } from './SidebarNavItem'
import {
    LuClipboardList,
    LuFileDown,
    LuLayoutDashboard,
    LuSettings,
} from 'react-icons/lu'

export function Sidebar() {
    return (
        <aside className="sticky top-0 h-screen w-[280px] shrink-0 border-r border-(--landing-border) bg-(--landing-background) px-4 py-6">
            <div className="flex h-full flex-col">
                <Link
                    to={ROUTES.home}
                    className="mb-8 inline-flex items-center gap-2 px-2 text-lg font-semibold text-(--landing-text)"
                >
                    <Logo />
                    TestGen
                </Link>

                <nav className="flex flex-col gap-1">
                    <SidebarNavItem
                        to={ROUTES.dashboard}
                        icon={<LuLayoutDashboard size={18} />}
                        label="Dashboard"
                    />
                    <SidebarNavItem
                        to={ROUTES.uploadRequirements}
                        icon={<LuClipboardList size={18} />}
                        label="Test Suites"
                    />
                    <SidebarNavItem
                        to={ROUTES.export}
                        icon={<LuFileDown size={18} />}
                        label="Export & Connect"
                    />
                    <SidebarNavItem
                        to={ROUTES.export}
                        icon={<LuSettings size={18} />}
                        label="Settings"
                    />
                </nav>

                <div className="mt-auto">
                    <div className="rounded-[16px] border border-(--landing-border) bg-(--landing-card) p-4">
                        <div className="text-sm font-semibold text-(--landing-text)">
                            Ayman Nasr
                        </div>
                        <div className="text-xs text-(--landing-subtle)">
                            Pro Plan
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
