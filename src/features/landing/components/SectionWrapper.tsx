import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { Container } from './Container'
import { MotionReveal } from './MotionReveal'

type SectionWrapperProps = {
    children: ReactNode
    className?: string
    withTopBorder?: boolean
    title?: string
    subtitle?: string
}

export function SectionWrapper({
    children,
    className,
    withTopBorder,
    title,
    subtitle,
}: SectionWrapperProps) {
    return (
        <section
            className={cn(
                'py-16 sm:py-20',
                withTopBorder && 'border-t border-(--landing-border)',
                className
            )}
        >
            <Container className="flex flex-col gap-10">
                {title ? (
                    <MotionReveal>
                        <header className="mx-auto flex w-full max-w-3xl flex-col gap-3 text-center">
                            <h2 className="text-[36px] leading-tight font-semibold text-(--landing-text)">
                                {title}
                            </h2>
                            {subtitle ? (
                                <p className="text-base text-(--landing-muted) sm:text-lg">
                                    {subtitle}
                                </p>
                            ) : null}
                        </header>
                    </MotionReveal>
                ) : null}

                <MotionReveal delay={0.08}>{children}</MotionReveal>
            </Container>
        </section>
    )
}
