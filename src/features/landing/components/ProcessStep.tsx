import { ReactNode } from 'react'

type ProcessStepProps = {
    step: number
    title: string
    description: string
    icon: ReactNode
}

export function ProcessStep({
    step,
    title,
    description,
    icon,
}: ProcessStepProps) {
    return (
        <article className="flex flex-col items-center gap-5 text-center">
            <div className="flex size-12 items-center justify-center rounded-full border-2 border-(--landing-primary)/30 bg-(--landing-background) text-lg text-(--landing-primary) shadow-(--landing-shadow)">
                {step}
            </div>
            <div className="inline-flex size-12 items-center justify-center rounded-[8px] border border-(--landing-primary)/20 bg-(--landing-primary)/10 text-(--landing-primary)">
                <span aria-hidden="true">{icon}</span>
            </div>
            <h3 className="text-lg font-semibold text-(--landing-text)">
                {title}
            </h3>
            <p className="text-sm text-(--landing-muted)">{description}</p>
        </article>
    )
}
