import { motion, useReducedMotion } from 'framer-motion'

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
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.article
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 rounded-[12px] border border-(--landing-border) bg-(--landing-card) p-6"
        >
            <p className="text-xs font-semibold tracking-wide text-(--landing-primary)">
                {stepLabel}
            </p>
            <h3 className="text-base font-semibold text-(--landing-text)">
                {title}
            </h3>
            <p className="text-sm leading-relaxed text-(--landing-muted)">
                {description}
            </p>
        </motion.article>
    )
}
