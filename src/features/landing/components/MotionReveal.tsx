import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { defaultTransition } from '../../../lib/motionVariants'
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

    const localVariants = {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            className={cn(className)}
            variants={localVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once, amount: 0.2 }}
            transition={{ ...defaultTransition, delay }}
        >
            {children}
        </motion.div>
    )
}
