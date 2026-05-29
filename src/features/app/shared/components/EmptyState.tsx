import type { ReactNode } from 'react'

type EmptyStateProps = {
    title: string
    description: string
    icon?: ReactNode
    action?: ReactNode
    className?: string
}

export function EmptyState({
    title,
    description,
    icon,
    action,
    className = '',
}: EmptyStateProps) {
    return (
        <div
            className={`rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 p-5 text-center ${className}`.trim()}
        >
            {icon ? (
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--landing-border) bg-(--landing-card) text-(--landing-muted)">
                    {icon}
                </div>
            ) : null}

            <h3 className="text-sm font-semibold text-(--landing-text)">
                {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-(--landing-muted)">
                {description}
            </p>

            {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
        </div>
    )
}
