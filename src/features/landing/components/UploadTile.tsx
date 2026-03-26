import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

type UploadTileProps = {
    icon: ReactNode
    label: string
    onClick?: () => void
    bgColor: string
    className?: string
}

export function UploadTile({
    icon,
    label,
    onClick,
    bgColor,
    className,
}: UploadTileProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'flex w-full flex-col items-center justify-center gap-3 rounded-[12px] border border-dashed border-(--landing-secondary-border) bg-(--landing-card)/40 px-6 py-6 text-(--landing-muted) transition-colors hover:text-(--landing-text) focus-visible:ring-2 focus-visible:ring-(--landing-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--landing-background) focus-visible:outline-none',
                className
            )}
        >
            <span
                className={`${bgColor} flex h-10 w-10 items-center justify-center rounded-[10px] border border-(--landing-border) text-(--landing-text)`}
                aria-hidden="true"
            >
                {icon}
            </span>
            <span className="text-xs font-medium">{label}</span>
        </button>
    )
}
