import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ROUTES } from '../../../constants/routes'
import { Container } from './Container'
import Logo from './Logo'
import { LuGithub, LuLinkedin, LuTwitter } from 'react-icons/lu'

export function Footer() {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.footer
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-(--landing-border) py-10"
        >
            <Container className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                <Link
                    to={ROUTES.home}
                    className="inline-flex items-center gap-2 text-lg font-semibold text-(--landing-text)"
                >
                    <Logo />
                    TestGen
                </Link>

                <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-(--landing-muted)">
                    <Link
                        to={ROUTES.home}
                        className="hover:text-(--landing-text)"
                    >
                        Home
                    </Link>
                    <Link
                        to={ROUTES.howItWorks}
                        className="hover:text-(--landing-text)"
                    >
                        How It Works
                    </Link>
                    <Link
                        to={ROUTES.dashboard}
                        className="hover:text-(--landing-text)"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to={ROUTES.signIn}
                        className="hover:text-(--landing-text)"
                    >
                        Login
                    </Link>
                </nav>

                <div className="flex items-center justify-center gap-4 text-(--landing-muted)">
                    <a
                        href="#"
                        aria-label="Twitter"
                        className="hover:text-(--landing-primary)"
                    >
                        <motion.span
                            whileHover={
                                shouldReduceMotion ? undefined : { y: -2 }
                            }
                            className="inline-flex"
                        >
                            <LuTwitter size={20} aria-hidden="true" />
                        </motion.span>
                    </a>
                    <a
                        href="#"
                        aria-label="GitHub"
                        className="hover:text-(--landing-primary)"
                    >
                        <motion.span
                            whileHover={
                                shouldReduceMotion ? undefined : { y: -2 }
                            }
                            className="inline-flex"
                        >
                            <LuGithub size={20} aria-hidden="true" />
                        </motion.span>
                    </a>
                    <a
                        href="#"
                        aria-label="LinkedIn"
                        className="hover:text-(--landing-primary)"
                    >
                        <motion.span
                            whileHover={
                                shouldReduceMotion ? undefined : { y: -2 }
                            }
                            className="inline-flex"
                        >
                            <LuLinkedin size={20} aria-hidden="true" />
                        </motion.span>
                    </a>
                </div>
            </Container>
        </motion.footer>
    )
}
