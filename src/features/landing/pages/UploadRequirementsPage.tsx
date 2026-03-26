import { useRef, useState } from 'react'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { InlineField } from '../components/InlineField'
import { PromptTextarea } from '../components/PromptTextarea'
import { UploadTile } from '../components/UploadTile'
import { ROUTES } from '../../../constants/routes'
import { FiFileText, FiLink } from 'react-icons/fi'
import { FaRegFilePdf, FaRegFileWord } from 'react-icons/fa6'
import { RiFileExcel2Line } from 'react-icons/ri'
import { FaFileExcel, FaFilePdf, FaJira } from 'react-icons/fa'
import { CiCircleAlert } from 'react-icons/ci'
import { BsStars } from 'react-icons/bs'
import { IoLinkSharp } from 'react-icons/io5'
import { PageHeader } from '../../app/shared/components/PageHeader'
import { AppCard } from '../../app/shared/components/AppCard'

export function UploadRequirementsPage() {
    const [prompt, setPrompt] = useState('')
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    function handlePickFile() {
        fileInputRef.current?.click()
    }

    return (
        <div className="flex flex-col gap-8">
            <PageHeader
                title="Define Test Scope"
                subtitle="Paste documentation, upload files, or link Jira tickets to generate comprehensive test cases."
                right={<Badge className="text-xs">AI POWERED SESSION</Badge>}
            />

            <div className="w-full">
                <AppCard className="p-6 sm:p-7">
                    <div className="flex flex-col gap-6">
                        <PromptTextarea
                            label="Prompt"
                            hint="Markdown Supported"
                            value={prompt}
                            onChange={setPrompt}
                            placeholder="Paste user stories, acceptance criteria, or PRD content here..."
                            helperText="Example: As a user, I want to be able to reset my password so that I can regain access to my account if I forget it."
                        />

                        <div className="border-t border-(--landing-secondary-border) pt-6">
                            <p className="text-[11px] tracking-widest text-(--landing-muted)">
                                OR UPLOAD SOURCE FILES
                            </p>

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <UploadTile
                                    icon={
                                        <FaFilePdf size={18} color="#F87171" />
                                    }
                                    label="Upload PDF"
                                    bgColor="bg-[#F87171]/10"
                                    onClick={handlePickFile}
                                />
                                <UploadTile
                                    icon={
                                        <FaRegFileWord
                                            size={18}
                                            color="#3B82F6"
                                        />
                                    }
                                    label="Upload Word"
                                    bgColor="bg-[#3B82F6]/10"
                                    onClick={handlePickFile}
                                />
                                <UploadTile
                                    icon={
                                        <FaFileExcel
                                            size={18}
                                            color="#10B981"
                                        />
                                    }
                                    label="Upload Excel"
                                    bgColor="bg-[#10B981]/10"
                                    onClick={handlePickFile}
                                />
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                aria-hidden="true"
                                tabIndex={-1}
                            />
                        </div>

                        <div className="rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="inline-flex items-center gap-3 text-xs font-semibold text-(--landing-text)">
                                        <FaJira
                                            className="text-blue-400"
                                            size={20}
                                        />
                                        Jira Integration
                                    </span>
                                    <span className="rounded-sm border border-(--landing-secondary-border) px-2 py-0.5 text-[10px] font-semibold text-(--landing-muted)">
                                        OPTIONAL
                                    </span>
                                </div>

                                <div className="w-full sm:max-w-110">
                                    <InlineField
                                        label=""
                                        placeholder="Paste Jira Ticket URL or Issue Key (e.g., PROJ-123)"
                                        leftIcon={<IoLinkSharp size={16} />}
                                        rightSlot={
                                            <button
                                                type="button"
                                                className="text-xs font-semibold text-(--landing-primary) hover:underline"
                                            >
                                                Connect
                                            </button>
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 border-t border-(--landing-border) pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2 text-[11px] text-(--landing-muted)">
                                <CiCircleAlert size={18} aria-hidden="true" />
                                <span>
                                    AI Model:{' '}
                                    <span className="font-semibold text-(--landing-text)">
                                        TestGen-v4 (Latest)
                                    </span>
                                </span>
                            </div>

                            <Button
                                variant="primary"
                                size="md"
                                className="w-full bg-(--landing-subtle) text-(--landing-text) opacity-60 hover:bg-(--landing-primary) hover:text-(--landing-card) hover:opacity-80 sm:w-auto"
                            >
                                <div className="flex items-center gap-2">
                                    <BsStars />
                                    <span> Generate Test Cases</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </AppCard>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-1 text-xs text-(--landing-subtle)">
                    <a
                        href={ROUTES.howItWorks}
                        className="hover:text-(--landing-text)"
                    >
                        View Documentation →
                    </a>
                    <span className="hidden sm:inline">·</span>
                    <a
                        href={ROUTES.export}
                        className="hover:text-(--landing-text)"
                    >
                        Import Guidelines →
                    </a>
                </div>
            </div>
        </div>
    )
}
