import type { ReactNode } from 'react'
import { cn } from '../../../../utils/cn'

type AppCardProps = {
    children: ReactNode
    className?: string
}

export function AppCard({ children, className }: AppCardProps) {
    return (
        <section
            className={cn(
                'rounded-[16px] border border-(--landing-border) bg-(--landing-card) p-6',
                className
            )}
        >
            {children}
        </section>
    )
}
