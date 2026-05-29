import { FiLayers } from 'react-icons/fi'
import { FeatureCard } from './FeatureCard'
import { SectionWrapper } from './SectionWrapper'
import { LuBrain } from 'react-icons/lu'
import { LuFolderKanban } from 'react-icons/lu'

export function FeaturesSection() {
    return (
        <SectionWrapper
            withTopBorder
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
                    icon={<LuFolderKanban size={20} />}
                    title="Project Workspaces"
                    description="Organize generated test cases by project, requirement, and coverage type for a cleaner QA workflow."
                />
            </div>
        </SectionWrapper>
    )
}
