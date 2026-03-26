import type { ReactNode } from 'react'

type FeatureCardProps = {
    icon: ReactNode
    title: string
    description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <article className="flex flex-col gap-4 rounded-[12px] border border-(--landing-border) bg-(--landing-card) p-6">
            <div className="inline-flex size-12 items-center justify-center rounded-[8px] border border-(--landing-primary)/20 bg-(--landing-primary)/10 text-(--landing-primary)">
                <span aria-hidden="true">{icon}</span>
            </div>
            <h3 className="text-lg font-semibold text-(--landing-text)">
                {title}
            </h3>
            <p className="text-sm leading-relaxed text-(--landing-muted)">
                {description}
            </p>
        </article>
    )
}
