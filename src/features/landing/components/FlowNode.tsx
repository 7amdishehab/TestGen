import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

type FlowNodeProps = {
    icon: ReactNode
    state?: 'active' | 'inactive'
    className?: string
}

export function FlowNode({ icon, state = 'active', className }: FlowNodeProps) {
    return (
        <div
            className={cn(
                'flex size-12 items-center justify-center rounded-full bg-(--landing-background)',
                state === 'active'
                    ? 'border-2 border-(--landing-primary)/30 text-(--landing-primary)'
                    : 'border border-(--landing-border) bg-(--landing-card) text-(--landing-muted)',
                className
            )}
        >
            <span aria-hidden="true">{icon}</span>
        </div>
    )
}
