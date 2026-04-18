import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

export function AppLayout() {
    const location = useLocation()
    const shouldReduceMotion = useReducedMotion()

    return (
        <div className="min-h-screen">
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={
                        shouldReduceMotion ? undefined : { opacity: 0, y: 10 }
                    }
                    animate={
                        shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    exit={
                        shouldReduceMotion ? undefined : { opacity: 0, y: -8 }
                    }
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
