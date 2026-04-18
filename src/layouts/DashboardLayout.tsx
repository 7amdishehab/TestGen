import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Sidebar } from '../features/app/shared/components/Sidebar'
import { IconButton } from '../features/app/shared/components/IconButton'
import { LuMenu } from 'react-icons/lu'

export function DashboardLayout() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const location = useLocation()
    const shouldReduceMotion = useReducedMotion()

    return (
        <div className="min-h-screen bg-(--landing-background) text-(--landing-text)">
            <div className="mx-auto flex w-full">
                <Sidebar
                    mobileOpen={mobileSidebarOpen}
                    onMobileClose={() => setMobileSidebarOpen(false)}
                />

                <main className="min-w-0 flex-1 px-6 py-6 md:px-8 md:py-8">
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
                            initial={
                                shouldReduceMotion
                                    ? undefined
                                    : { opacity: 0, x: 10 }
                            }
                            animate={
                                shouldReduceMotion
                                    ? undefined
                                    : { opacity: 1, x: 0 }
                            }
                            exit={
                                shouldReduceMotion
                                    ? undefined
                                    : { opacity: 0, x: -10 }
                            }
                            transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    )
}
