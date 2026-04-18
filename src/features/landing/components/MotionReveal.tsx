import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../../utils/cn'

type MotionRevealProps = {
    children: ReactNode
    className?: string
    delay?: number
    y?: number
    once?: boolean
}

export function MotionReveal({
    children,
    className,
    delay = 0,
    y = 20,
    once = true,
}: MotionRevealProps) {
    const shouldReduceMotion = useReducedMotion()

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div
            className={cn(className)}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.2 }}
            transition={{
                duration: 0.55,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    )
}
