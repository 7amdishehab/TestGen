import { ROUTES } from '../../../constants/routes'
import { Button } from './Button'
import { SectionWrapper } from './SectionWrapper'

export function CTASection() {
    return (
        <SectionWrapper
            withTopBorder
            title="Ready to Automate Your Testing?"
            subtitle="Get started with AI-powered test case generation today."
        >
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
                <Button as="link" to={ROUTES.signUp} size="lg">
                    Get Started Free
                </Button>
                <p className="text-sm text-(--landing-subtle)">
                    No credit card required • Free plan available
                </p>
            </div>
        </SectionWrapper>
    )
}
