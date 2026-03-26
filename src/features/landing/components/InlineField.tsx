import type { InputHTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'
import { cn } from '../../../utils/cn'

type InlineFieldProps = {
    label: string
    leftIcon?: ReactNode
    rightSlot?: ReactNode
    className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

export function InlineField({
    label,
    leftIcon,
    rightSlot,
    className,
    ...inputProps
}: InlineFieldProps) {
    const id = useId()
    const hasLabel = Boolean(label && label.trim().length > 0)

    return (
        <div
            className={cn(
                'flex w-full items-center gap-3 rounded-[12px] border border-(--landing-border) bg-(--landing-card) px-3 py-2',
                className
            )}
        >
            {leftIcon ? (
                <span
                    className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-(--landing-border) bg-(--landing-background)/40 text-(--landing-muted)"
                    aria-hidden="true"
                >
                    {leftIcon}
                </span>
            ) : null}

            <div className="flex min-w-0 flex-1 flex-col">
                {hasLabel ? (
                    <label
                        htmlFor={id}
                        className="mb-0.5 text-[11px] text-(--landing-subtle)"
                    >
                        {label}
                    </label>
                ) : null}

                <input
                    id={id}
                    {...inputProps}
                    className={cn(
                        'w-full min-w-0 bg-transparent text-xs text-(--landing-text) placeholder:text-(--landing-subtle) focus-visible:outline-none',
                        hasLabel ? 'py-1' : 'py-1.5'
                    )}
                />
            </div>

            {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
        </div>
    )
}
