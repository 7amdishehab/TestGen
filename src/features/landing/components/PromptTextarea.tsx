import { useId } from 'react'
import { cn } from '../../../utils/cn'

type PromptTextareaProps = {
    label: string
    hint?: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    helperText?: string
    className?: string
}

export function PromptTextarea({
    label,
    hint,
    value,
    onChange,
    placeholder,
    helperText,
    className,
}: PromptTextareaProps) {
    const id = useId()

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <span className="h-5 w-1 rounded-full bg-(--landing-primary)" />
                    <label
                        htmlFor={id}
                        className="text-sm font-medium text-(--landing-text)"
                    >
                        {label}
                    </label>
                </div>
                {hint ? (
                    <span className="text-xs text-(--landing-subtle)">
                        {hint}
                    </span>
                ) : null}
            </div>

            <div className="rounded-[12px] border border-(--landing-border) bg-(--landing-background)/30 p-3">
                <textarea
                    id={id}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    rows={7}
                    className="w-full resize-none bg-transparent text-sm text-(--landing-text) placeholder:text-(--landing-subtle) focus-visible:outline-none"
                />

                <div className="mt-2 flex flex-col items-start justify-between border-t border-(--landing-border) pt-2 sm:flex-row sm:items-center">
                    <div className="text-[11px] text-(--landing-subtle)">
                        {helperText ? helperText : null}
                    </div>
                    <span className="rounded-[8px] border border-(--landing-border) bg-(--landing-card) px-2 py-1 text-[11px] text-(--landing-subtle)">
                        <span className="me-2 text-(--color-primary)">
                            {value.length}
                        </span>
                        chars
                    </span>
                </div>
            </div>
        </div>
    )
}
