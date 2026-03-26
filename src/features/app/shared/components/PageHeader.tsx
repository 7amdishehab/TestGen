import type { ReactNode } from 'react'
import { cn } from '../../../../utils/cn'

type PageHeaderProps = {
    title: string
    subtitle?: string
    right?: ReactNode
    className?: string
}

export function PageHeader({
    title,
    subtitle,
    right,
    className,
}: PageHeaderProps) {
    return (
        <header
            className={cn(
                'flex flex-col gap-3 md:flex-row md:items-start md:justify-between',
                className
            )}
        >
            <div>
                <h1 className="text-2xl font-semibold text-(--landing-text)">
                    {title}
                </h1>
                {subtitle ? (
                    <p className="mt-1 text-sm text-(--landing-muted)">
                        {subtitle}
                    </p>
                ) : null}
            </div>
            {right ? (
                <div className="flex items-center gap-3">{right}</div>
            ) : null}
        </header>
    )
}
