import { FiLayers } from 'react-icons/fi'
import { FeatureCard } from './FeatureCard'
import { SectionWrapper } from './SectionWrapper'
import { LuBrain } from 'react-icons/lu'
import { IoLinkSharp } from 'react-icons/io5'

export function FeaturesSection() {
    return (
        <SectionWrapper
            title="Everything You Need"
            subtitle="Powerful features designed to streamline your quality assurance workflow"
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<LuBrain size={20} />}
                    title="NLP-Powered Analysis"
                    description="Advanced natural language processing understands requirements and automatically generates comprehensive test scenarios."
                />
                <FeatureCard
                    icon={<FiLayers size={20} />}
                    title="Multi-Format Support"
                    description="Export from PDF, Word, Excel, or plain text. Seamlessly convert any document format into structured test cases."
                />
                <FeatureCard
                    icon={<IoLinkSharp size={20} />}
                    title="Jira Integration"
                    description="Seamlessly export generated test cases to Jira, create tickets in any project, and sync status in real-time."
                />
            </div>
        </SectionWrapper>
    )
}
