import type { ReactNode } from 'react'

type AuthCardProps = {
    title: string
    subtitle?: string
    children: ReactNode
    footer?: ReactNode
    ariaLabel: string
}

export function AuthCard({
    title,
    subtitle,
    children,
    footer,
    ariaLabel,
}: AuthCardProps) {
    return (
        <main className="w-full">
            <section
                className="flex w-full flex-col gap-6 rounded-2xl border border-(--color-border) bg-(--color-card) p-8 sm:p-10"
                aria-label={ariaLabel}
            >
                <header className="flex flex-col gap-2 text-center">
                    <h1 className="font-title text-2xl font-bold text-(--color-text)">
                        {title}
                    </h1>
                    {subtitle ? (
                        <p className="text-sm text-(--color-muted)">
                            {subtitle}
                        </p>
                    ) : null}
                </header>

                {children}

                {footer ? (
                    <footer className="text-center text-sm text-(--color-muted)">
                        {footer}
                    </footer>
                ) : null}
            </section>
        </main>
    )
}
