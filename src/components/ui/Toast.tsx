import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type ToastVariant = 'success' | 'error' | 'loading'

type ToastProps = {
    variant: ToastVariant
    children: ReactNode
    className?: string
}

const variantClasses: Record<ToastVariant, string> = {
    success: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-200',
    error: 'border-red-500/25 bg-red-500/10 text-red-200',
    loading: 'border-(--landing-border) bg-(--landing-card) text-(--landing-muted)',
}

export function Toast({ variant, children, className }: ToastProps) {
    return (
        <div
            role={variant === 'error' ? 'alert' : 'status'}
            className={cn(
                'rounded-[10px] border px-4 py-3 text-sm font-medium',
                variantClasses[variant],
                className
            )}
        >
            {children}
        </div>
    )
}
