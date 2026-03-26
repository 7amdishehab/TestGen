import { SectionWrapper } from './SectionWrapper'

const companies = ['Google', 'Microsoft', 'Stripe', 'Airbnb', 'Shopify']

export function TrustedCompanies() {
    return (
        <SectionWrapper withTopBorder>
            <div className="flex flex-col gap-6">
                <p className="text-center text-sm text-(--landing-subtle)">
                    Trusted by teams at leading companies
                </p>

                <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-lg text-(--landing-subtle)">
                    {companies.map((name) => (
                        <li key={name} className="opacity-80">
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </SectionWrapper>
    )
}
