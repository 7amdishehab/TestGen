import { FaRegFileLines } from 'react-icons/fa6'
import { ProcessStep } from './ProcessStep'
import { SectionWrapper } from './SectionWrapper'
import { GiProcessor } from 'react-icons/gi'
import { LuDownload } from 'react-icons/lu'

export function ProcessSection() {
    return (
        <SectionWrapper
            title="Simple Three-Step Process"
            subtitle="Get from requirements to comprehensive test coverage in minutes"
        >
            <div className="relative mt-10 flex w-full flex-col items-center justify-center">
                <div className="absolute top-0 left-1/2 hidden w-full -translate-x-1/2 items-center justify-center md:flex">
                    <div className="mx-26 h-[1px] w-full max-w-4xl rounded-full bg-gradient-to-r from-transparent via-(--landing-primary)/40 to-transparent" />
                </div>

                <div className="relative -top-6 grid grid-cols-1 gap-10 md:grid-cols-3">
                    <ProcessStep
                        step={1}
                        icon={<FaRegFileLines size={20} />}
                        title="Input Requirements"
                        description="Upload your requirements document or paste text directly into the intelligent editor."
                    />
                    <ProcessStep
                        step={2}
                        icon={<GiProcessor size={20} />}
                        title="AI Processing"
                        description="Our AI analyzes context and builds comprehensive test scenarios using machine learning."
                    />
                    <ProcessStep
                        step={3}
                        icon={<LuDownload size={20} />}
                        title="Export Results"
                        description="Review your test cases and export directly to your project management tools."
                    />
                </div>
            </div>
        </SectionWrapper>
    )
}
