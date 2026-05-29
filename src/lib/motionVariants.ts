import type { Variants } from 'framer-motion'

export const pageVariants: Variants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
}

export const drawerVariants: Variants = {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
}

export const overlayVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.6 },
    exit: { opacity: 0 },
}

export const revealVariants: Variants = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
}

export const defaultTransition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }

export default pageVariants
