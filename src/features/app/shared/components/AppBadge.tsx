import type { ReactNode } from 'react'
import { cn } from '../../../../utils/cn'

type AppBadgeVariant = 'neutral' | 'success' | 'danger' | 'info'

type AppBadgeProps = {
    children: ReactNode
    variant?: AppBadgeVariant
    className?: string
}

const variantClasses: Record<AppBadgeVariant, string> = {
    neutral:
        'border-(--landing-border) bg-(--landing-background)/20 text-(--landing-subtle)',
    info: 'border-(--landing-primary)/30 bg-(--landing-primary)/10 text-(--landing-primary)',
    success: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
    danger: 'border-red-500/25 bg-red-500/10 text-red-300',
}

export function AppBadge({
    children,
    variant = 'neutral',
    className,
}: AppBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold',
                variantClasses[variant],
                className
            )}
        >
            {children}
        </span>
    )
}
