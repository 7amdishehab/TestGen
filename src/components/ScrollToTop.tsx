import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'

export function ScrollToTop() {
    const { pathname } = useLocation()
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        // Use manual scroll restoration to avoid browser restoring previous positions
        if ('scrollRestoration' in window.history) {
            try {
                window.history.scrollRestoration = 'manual'
            } catch {
                /* ignore */
            }
        }

        return () => {
            // no-op: keep manual restoration during app lifecycle
        }
    }, [])

    useEffect(() => {
        // Always jump to top on route change to avoid opening pages mid-scroll.
        // Use 'auto' for instant reposition (reduced motion users get no surprises).
        try {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: shouldReduceMotion ? 'auto' : 'auto',
            })
        } catch {
            window.scrollTo(0, 0)
        }
    }, [pathname, shouldReduceMotion])

    return null
}

export default ScrollToTop
