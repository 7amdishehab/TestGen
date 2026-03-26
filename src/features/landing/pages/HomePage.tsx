import { CTASection } from '../components/CTASection'
import { FeaturesSection } from '../components/FeaturesSection'
import { Hero } from '../components/Hero'
import { ProcessSection } from '../components/ProcessSection'
import { TrustedCompanies } from '../components/TrustedCompanies'

export function HomePage() {
    return (
        <>
            <Hero />
            <TrustedCompanies />
            <FeaturesSection />
            <ProcessSection />
            <CTASection />
        </>
    )
}
