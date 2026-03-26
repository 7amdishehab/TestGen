import { CTASection } from '../components/CTASection'
import { FeaturesSection } from '../components/FeaturesSection'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'
import { ProcessSection } from '../components/ProcessSection'
import { TrustedCompanies } from '../components/TrustedCompanies'

export function HomePage() {
    return (
        <div className="bg-(--landing-background) text-(--landing-text)">
            <Navbar />
            <Hero />
            <TrustedCompanies />
            <FeaturesSection />
            <ProcessSection />
            <CTASection />
            <Footer />
        </div>
    )
}
