import { FiLayers } from 'react-icons/fi'
import { FaArrowRightLong, FaRegFileLines } from 'react-icons/fa6'
import { GiProcessor } from 'react-icons/gi'
import { IoCloudUploadOutline, IoLinkSharp } from 'react-icons/io5'
import { LuBrain, LuDownload } from 'react-icons/lu'
import { ROUTES } from '../../../constants/routes'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { FeatureCard } from '../components/FeatureCard'
import { Badge } from '../components/Badge'
import { CiFilter } from 'react-icons/ci'
import { FaArrowRight, FaTasks } from 'react-icons/fa'
import { FlowNode } from '../components/FlowNode'
import { WorkflowStepCard } from '../components/WorkflowStepCard'
import { SectionWrapper } from '../components/SectionWrapper'
import { BsStars } from 'react-icons/bs'
import { RxCode } from 'react-icons/rx'
import { MotionReveal } from '../components/MotionReveal'

export function HowItWorksPage() {
    return (
        <>
            <section className="pt-28 pb-10 sm:pt-32 sm:pb-20">
                <Container className="flex flex-col gap-10">
                    <MotionReveal>
                        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 text-center">
                            <Badge>WORKFLOW</Badge>

                            <div className="flex flex-col gap-4">
                                <h1 className="text-[42px] leading-[1.05] font-bold text-(--landing-text) sm:text-[60px]">
                                    From Requirements to Results in{' '}
                                    <span className="text-(--landing-primary)">
                                        Seconds
                                    </span>
                                </h1>
                                <p className="max-w-3xl text-base text-(--landing-muted) sm:text-lg">
                                    See how our AI engine transforms your static
                                    documentation into executable test coverage
                                    through intelligent analysis and automated
                                    generation.
                                </p>
                            </div>
                        </div>
                    </MotionReveal>

                    <MotionReveal
                        className="mx-auto w-full max-w-5xl"
                        delay={0.08}
                    >
                        <div className="flex flex-col gap-10">
                            <div className="relative hidden w-full items-center md:flex">
                                <div className="absolute top-1/2 right-0 left-0 mr-24 -translate-y-1/2">
                                    <div className="h-px w-full bg-linear-to-r from-(--landing-primary) via-(--landing-primary)/40 to-transparent" />
                                </div>

                                <div className="relative grid w-full grid-cols-4 items-center">
                                    <div className="flex justify-start">
                                        <FlowNode
                                            icon={
                                                <IoCloudUploadOutline
                                                    size={20}
                                                />
                                            }
                                            state="active"
                                        />
                                    </div>

                                    <div className="flex justify-start">
                                        <FlowNode
                                            icon={<GiProcessor size={20} />}
                                            state="active"
                                        />
                                    </div>

                                    <div className="flex justify-start">
                                        <FlowNode
                                            icon={<CiFilter size={20} />}
                                            state="active"
                                            className="border"
                                        />
                                    </div>

                                    <div className="flex justify-start">
                                        <FlowNode
                                            icon={<FaTasks size={20} />}
                                            state="inactive"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                                <WorkflowStepCard
                                    stepLabel="STEP 01"
                                    title="Upload Requirements"
                                    description="Upload your PRD, user stories, or Jira tickets. We support PDF, DOCX, and raw text formats."
                                />
                                <WorkflowStepCard
                                    stepLabel="STEP 02"
                                    title="AI Analysis"
                                    description="Our NLP engine scans the text to understand context, user flows, and business logic boundaries."
                                />
                                <WorkflowStepCard
                                    stepLabel="STEP 03"
                                    title="Rule Extraction"
                                    description="The system isolates conditional rules, acceptance criteria, and edge cases from the narrative."
                                />
                                <WorkflowStepCard
                                    stepLabel="STEP 04"
                                    title="Auto-Generation"
                                    description="Receive a complete suite of test cases with steps, expected results, and pre-conditions."
                                />
                            </div>
                        </div>
                    </MotionReveal>
                </Container>
            </section>

            <SectionWrapper
                withTopBorder
                title="Under the Hood"
                subtitle="A visualization of our intelligent processing pipeline"
            >
                <MotionReveal className="mx-auto w-full max-w-5xl" delay={0.06}>
                    <img
                        src="/how%20it%20works.png"
                        alt="How it works overview"
                        className="h-auto"
                        loading="lazy"
                    />
                </MotionReveal>
            </SectionWrapper>

            <SectionWrapper withTopBorder>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FeatureCard
                        icon={<BsStars size={20} />}
                        title="Context Awareness"
                        description="Remembers previous requirements and constraints to avoid conflicting test scenarios."
                    />
                    <FeatureCard
                        icon={<FaRegFileLines size={20} />}
                        title="Format Agnostic"
                        description="Works seamlessly with Gherkin syntax, unstructured natural text, or structured tables."
                    />
                    <FeatureCard
                        icon={<RxCode size={20} />}
                        title="Instant Export"
                        description="Export generated cases directly to Excel, CSV, or push to Jira/Azure DevOps."
                    />
                </div>
            </SectionWrapper>

            <SectionWrapper
                withTopBorder
                title="Ready to streamline your QA?"
                subtitle="Stop writing test cases by hand. Let AI handle the heavy lifting while you focus on quality strategy."
            >
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
                    <Button
                        as="link"
                        to={ROUTES.uploadRequirements}
                        size="lg"
                        className="flex"
                    >
                        <div className="flex items-center gap-2">
                            <span>Start Generating Now</span>
                            <span>
                                <FaArrowRightLong size={16} />
                            </span>
                        </div>
                    </Button>
                </div>
            </SectionWrapper>
        </>
    )
}
