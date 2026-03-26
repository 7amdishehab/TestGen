import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { Container } from './Container'
import Logo from './Logo'
import { LuGithub, LuLinkedin, LuTwitter } from 'react-icons/lu'

export function Footer() {
    return (
        <footer className="border-t border-(--landing-border) py-10">
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
                        Features
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
                    <a href="#" className="hover:text-(--landing-text)">
                        Support
                    </a>
                </nav>

                <div className="flex items-center justify-center gap-4 text-(--landing-muted)">
                    <a
                        href="#"
                        aria-label="Twitter"
                        className="hover:text-(--landing-primary)"
                    >
                        <LuTwitter size={20} aria-hidden="true" />
                    </a>
                    <a
                        href="#"
                        aria-label="GitHub"
                        className="hover:text-(--landing-primary)"
                    >
                        <LuGithub size={20} aria-hidden="true" />
                    </a>
                    <a
                        href="#"
                        aria-label="LinkedIn"
                        className="hover:text-(--landing-primary)"
                    >
                        <LuLinkedin size={20} aria-hidden="true" />
                    </a>
                </div>
            </Container>
        </footer>
    )
}
