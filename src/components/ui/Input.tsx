import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../../utils/cn'

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'size'> & {
    label: string
    id: string
    icon?: ReactNode
    hint?: string
    rightSlot?: ReactNode
    labelRight?: ReactNode
}

export function Input({
    className,
    label,
    id,
    icon,
    hint,
    rightSlot,
    labelRight,
    required,
    ...props
}: InputProps) {
    const hintId = hint ? `${id}-hint` : undefined

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between gap-4">
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-(--color-text)"
                >
                    {label}
                    {required ? (
                        <span className="text-(--color-muted)">
                            {' '}
                            *
                        </span>
                    ) : null}
                </label>
                {labelRight ? (
                    <div className="shrink-0">{labelRight}</div>
                ) : null}
            </div>

            <div
                className={cn(
                    'flex items-center gap-3 rounded-[10px] border border-(--color-border) bg-(--color-input) px-4 py-3',
                    'focus-within:ring-2 focus-within:ring-(--color-primary) focus-within:ring-offset-2 focus-within:ring-offset-(--color-card)',
                    className
                )}
            >
                {icon ? (
                    <span
                        className="shrink-0 text-(--color-muted)"
                        aria-hidden="true"
                    >
                        {icon}
                    </span>
                ) : null}

                <input
                    id={id}
                    aria-describedby={hintId}
                    required={required}
                    className={cn(
                        'w-full bg-transparent text-sm text-(--color-text) placeholder:text-(--color-muted)',
                        'outline-none',
                        props.disabled && 'opacity-60'
                    )}
                    {...props}
                />

                {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
            </div>

            {hint ? (
                <p
                    id={hintId}
                    className="text-xs text-(--color-muted)"
                >
                    {hint}
                </p>
            ) : null}
        </div>
    )
}
