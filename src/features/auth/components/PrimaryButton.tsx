import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}

export function PrimaryButton({
    className,
    leftIcon,
    rightIcon,
    children,
    type = 'button',
    ...props
}: PrimaryButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                'inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-(--color-primary) px-4 py-3 text-sm font-semibold text-(--color-background)',
                'hover:brightness-110',
                'focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-card) focus-visible:outline-none',
                props.disabled && 'opacity-60 hover:brightness-100',
                className
            )}
            {...props}
        >
            {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
            <span>{children}</span>
            {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
        </button>
    )
}
