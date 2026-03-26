import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../../utils/cn'

type IconButtonProps = {
    icon: ReactNode
    'aria-label': string
    className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export function IconButton({ icon, className, ...props }: IconButtonProps) {
    return (
        <button
            type="button"
            {...props}
            className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-(--landing-border) bg-(--landing-card) text-(--landing-muted) transition-colors hover:text-(--landing-text) focus-visible:ring-2 focus-visible:ring-(--landing-primary) focus-visible:outline-none',
                className
            )}
        >
            {icon}
        </button>
    )
}
