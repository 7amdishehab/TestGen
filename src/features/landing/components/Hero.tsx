import { ROUTES } from '../../../constants/routes'
import { Badge } from './Badge'
import { Button } from './Button'
import { SectionWrapper } from './SectionWrapper'

export function Hero() {
    return (
        <SectionWrapper className="pt-28 pb-16 sm:pt-32 sm:pb-20">
            <div className="flex flex-col gap-10">
                <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 text-center">
                    <Badge>AI-Powered Testing</Badge>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[42px] leading-[1.05] font-bold text-(--landing-text) sm:text-[60px]">
                            Transform Requirements Into{' '}
                            <span className="text-(--landing-primary)">
                                Comprehensive Test Cases
                            </span>
                        </h1>

                        <p className="max-w-3xl text-base text-(--landing-muted) sm:text-lg">
                            Automate test case generation with AI. Transform
                            your requirements into detailed, actionable test
                            cases in seconds, not hours.
                        </p>
                    </div>

                    <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Button
                            as="link"
                            to={ROUTES.uploadRequirements}
                            size="lg"
                        >
                            Start Generating
                        </Button>
                        <Button
                            as="link"
                            to={ROUTES.howItWorks}
                            variant="secondary"
                            size="lg"
                        >
                            How It Works
                        </Button>
                    </div>

                    <p className="text-sm text-(--landing-subtle)">
                        No credit card required • Free tier available
                    </p>
                </div>

                <div className="mx-auto w-full max-w-5xl">
                    <div className="overflow-hidden rounded-[12px] border border-(--landing-border) bg-(--landing-card)">
                        <img
                            src="/hero-preview.svg"
                            alt="Product dashboard preview"
                            className="w-full"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
