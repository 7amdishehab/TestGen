import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type FeatureCardProps = {
    icon: ReactNode
    title: string
    description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.article
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            whileHover={shouldReduceMotion ? undefined : { y: -3 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 rounded-[12px] border border-(--landing-border) bg-(--landing-card) p-6"
        >
            <div className="inline-flex size-12 items-center justify-center rounded-[8px] border border-(--landing-primary)/20 bg-(--landing-primary)/10 text-(--landing-primary)">
                <span aria-hidden="true">{icon}</span>
            </div>
            <h3 className="text-lg font-semibold text-(--landing-text)">
                {title}
            </h3>
            <p className="text-sm leading-relaxed text-(--landing-muted)">
                {description}
            </p>
        </motion.article>
    )
}
