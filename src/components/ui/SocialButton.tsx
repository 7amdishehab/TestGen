import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

type SocialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: ReactNode
    label: string
}

export function SocialButton({
    className,
    icon,
    label,
    type = 'button',
    ...props
}: SocialButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                'inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-(--color-border) bg-transparent px-4 py-2.5 text-sm font-medium',
                'text-(--color-text) hover:bg-(--color-input)',
                'focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-card) focus-visible:outline-none',
                className
            )}
            {...props}
        >
            <span
                aria-hidden="true"
                className="text-(--color-muted)"
            >
                {icon}
            </span>
            <span>{label}</span>
        </button>
    )
}
