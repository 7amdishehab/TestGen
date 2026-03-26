import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

type BadgeProps = {
    children: ReactNode
    className?: string
}

export function Badge({ children, className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex w-fit items-center justify-center gap-2 rounded-full border border-(--landing-primary)/20 bg-(--landing-primary)/10 px-4 py-2 text-sm font-medium text-(--landing-primary)',
                className
            )}
        >
            <span className="h-2 w-2 animate-pulse rounded-full bg-(--landing-primary)" />
            {children}
        </span>
    )
}
