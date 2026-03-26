type DividerProps = {
    label?: string
}

export function Divider({ label = 'OR CONTINUE WITH' }: DividerProps) {
    return (
        <div className="flex items-center gap-4" aria-hidden="true">
            <div className="h-px flex-1 bg-(--color-border)" />
            <span className="text-xs font-medium tracking-wide text-(--color-muted)">
                {label}
            </span>
            <div className="h-px flex-1 bg-(--color-border)" />
        </div>
    )
}
