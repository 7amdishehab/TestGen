import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../../../../utils/cn'

type SidebarNavItemProps = {
    to: string
    icon: ReactNode
    label: string
}

export function SidebarNavItem({ to, icon, label }: SidebarNavItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    'flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm text-(--landing-muted) transition-colors',
                    isActive
                        ? 'bg-(--landing-card) text-(--landing-text)'
                        : 'hover:text-(--landing-text)'
                )
            }
        >
            <span className="text-(--landing-subtle)" aria-hidden="true">
                {icon}
            </span>
            <span className="font-medium">{label}</span>
        </NavLink>
    )
}
