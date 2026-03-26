import { useId } from 'react'
import { cn } from '../../../../utils/cn'

type ToggleSwitchProps = {
    checked: boolean
    onChange: (checked: boolean) => void
    label?: string
    className?: string
}

export function ToggleSwitch({
    checked,
    onChange,
    label,
    className,
}: ToggleSwitchProps) {
    const id = useId()

    return (
        <div className={cn('inline-flex items-center gap-2', className)}>
            {label ? (
                <label htmlFor={id} className="text-xs text-(--landing-subtle)">
                    {label}
                </label>
            ) : null}
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={checked ? 'true' : 'false'}
                onClick={() => onChange(!checked)}
                className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full border border-(--landing-border) bg-(--landing-background)/30 transition-colors focus-visible:ring-2 focus-visible:ring-(--landing-primary) focus-visible:outline-none',
                    checked && 'bg-(--landing-primary)/25'
                )}
            >
                <span
                    className={cn(
                        'inline-block h-5 w-5 translate-x-0.5 rounded-full bg-(--landing-muted) transition-transform',
                        checked && 'translate-x-5 bg-(--landing-primary)'
                    )}
                />
            </button>
        </div>
    )
}
