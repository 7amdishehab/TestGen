import type { HTMLAttributes } from 'react'

type SkeletonProps = {
    className?: string
} & HTMLAttributes<HTMLDivElement>

export function Skeleton({ className = '', ...rest }: SkeletonProps) {
    return (
        <div
            aria-hidden="true"
            className={`animate-pulse rounded-[8px] bg-(--landing-card) ${className}`}
            {...rest}
        />
    )
}

export default Skeleton
