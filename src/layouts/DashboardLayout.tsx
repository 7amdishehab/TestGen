import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollToTop } from '../components/ScrollToTop'
import { useState } from 'react'
import { Sidebar } from '../features/app/shared/components/Sidebar'
import { IconButton } from '../features/app/shared/components/IconButton'
import { LuMenu } from 'react-icons/lu'
import { pageVariants, defaultTransition } from '../lib/motionVariants'

export function DashboardLayout() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const location = useLocation()
    const shouldReduceMotion = useReducedMotion()

    return (
        <div className="min-h-screen bg-(--landing-background) text-(--landing-text)">
            <ScrollToTop />
            <div className="mx-auto flex w-full">
                <Sidebar
                    mobileOpen={mobileSidebarOpen}
                    onMobileClose={() => setMobileSidebarOpen(false)}
                />

                <main
                    id="main-content"
                    className="min-w-0 flex-1 px-6 py-6 md:px-8 md:py-8"
                >
                    <div className="sticky top-0 z-30 -mx-6 mb-4 border-b border-(--landing-border) bg-(--landing-background)/80 px-6 py-3 backdrop-blur md:hidden">
                        <div className="flex items-center justify-between">
                            <IconButton
                                icon={<LuMenu size={18} />}
                                aria-label="Open menu"
                                onClick={() => setMobileSidebarOpen(true)}
                            />
                            <div />
                        </div>
                    </div>
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
                </main>
            </div>
        </div>
    )
}
