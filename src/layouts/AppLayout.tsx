import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollToTop } from '../components/ScrollToTop'
import { pageVariants, defaultTransition } from '../lib/motionVariants'

export function AppLayout() {
    const location = useLocation()
    const shouldReduceMotion = useReducedMotion()

    return (
        <div className="min-h-screen">
            <ScrollToTop />
            <a
                href="#main-content"
                className="skip-link sr-only focus:not-sr-only"
            >
                Skip to content
            </a>
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    variants={pageVariants}
                    initial={shouldReduceMotion ? undefined : 'initial'}
                    animate={shouldReduceMotion ? undefined : 'animate'}
                    exit={shouldReduceMotion ? undefined : 'exit'}
                    transition={defaultTransition}
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
