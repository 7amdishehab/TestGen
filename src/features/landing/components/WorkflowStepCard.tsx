type WorkflowStepCardProps = {
    stepLabel: string
    title: string
    description: string
}

export function WorkflowStepCard({
    stepLabel,
    title,
    description,
}: WorkflowStepCardProps) {
    return (
        <article className="flex flex-col gap-3 rounded-[12px] border border-(--landing-border) bg-(--landing-card) p-6">
            <p className="text-xs font-semibold tracking-wide text-(--landing-primary)">
                {stepLabel}
            </p>
            <h3 className="text-base font-semibold text-(--landing-text)">
                {title}
            </h3>
            <p className="text-sm leading-relaxed text-(--landing-muted)">
                {description}
            </p>
        </article>
    )
}
