import { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

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
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.article
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5 text-center"
        >
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
        </motion.article>
    )
}
