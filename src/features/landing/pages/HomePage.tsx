import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { CTASection } from '../components/CTASection'
import { FeaturesSection } from '../components/FeaturesSection'
import { Hero } from '../components/Hero'
import { ProcessSection } from '../components/ProcessSection'
import { TrustedCompanies } from '../components/TrustedCompanies'

export function HomePage() {
    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none fixed -right-5 -bottom-10 z-40 hidden h-65 w-55 translate-x-8 opacity-95 xl:block"
            >
                <DotLottieReact
                    src="https://lottie.host/5a92f457-0e85-4fc2-9d05-6066c20e0618/K7eWdt7Cof.lottie"
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            <Hero />
            <TrustedCompanies />
            <FeaturesSection />
            <ProcessSection />
            <CTASection />
        </>
    )
}
