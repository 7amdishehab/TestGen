import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { InlineField } from '../components/InlineField'
import { PromptTextarea } from '../components/PromptTextarea'
import { UploadTile } from '../components/UploadTile'
import { ROUTES } from '../../../constants/routes'
import { FaFileExcel, FaFilePdf } from 'react-icons/fa'
import { FaRegFileWord } from 'react-icons/fa6'
import { CiCircleAlert } from 'react-icons/ci'
import { BsStars } from 'react-icons/bs'
import { LuPencil, LuTrash2 } from 'react-icons/lu'
import { PageHeader } from '../../app/shared/components/PageHeader'
import { AppCard } from '../../app/shared/components/AppCard'
import { AppBadge } from '../../app/shared/components/AppBadge'
import { IconButton } from '../../app/shared/components/IconButton'
import { Toast } from '../../../components/ui/Toast'
import { projectsApi, requirementsApi } from '../../../lib/apiClient'
import { Skeleton } from '../../../components/ui/Skeleton'
import type { Project, Requirement, SavedTestCase } from '../../../types'

type RequirementForm = {
    title: string
    userStory: string
}

const emptyForm: RequirementForm = {
    title: '',
    userStory: '',
}

function getErrorMessage(err: unknown) {
    return err instanceof Error ? err.message : 'Something went wrong'
}

function testCaseVariant(type: SavedTestCase['type']) {
    if (type === 'positive') return 'success'
    if (type === 'negative') return 'danger'
    return 'neutral'
}

export function UploadRequirementsPage() {
    const [searchParams] = useSearchParams()
    const projectId = Number(searchParams.get('projectId'))
    const [project, setProject] = useState<Project | null>(null)
    const [requirements, setRequirements] = useState<Requirement[]>([])
    const [selectedRequirementId, setSelectedRequirementId] = useState<
        number | null
    >(null)
    const [testCases, setTestCases] = useState<SavedTestCase[]>([])
    const [form, setForm] = useState<RequirementForm>(emptyForm)
    const [editingRequirement, setEditingRequirement] =
        useState<Requirement | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [toast, setToast] = useState<{
        variant: 'success' | 'error'
        message: string
    } | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const selectedRequirement = requirements.find(
        (requirement) => requirement.id === selectedRequirementId
    )

    const loadTestCases = useCallback(async (requirementId: number) => {
        try {
            const data = await requirementsApi.fetchTestCases(requirementId)
            setTestCases(data)
        } catch (err) {
            const message = getErrorMessage(err)
            setToast({ variant: 'error', message })
        }
    }, [])

    const loadProject = useCallback(async () => {
        if (!projectId) return

        setIsLoading(true)
        setError(null)
        try {
            const [projectData, requirementsData] = await Promise.all([
                projectsApi.fetchOne(projectId),
                requirementsApi.fetchAll(projectId),
            ])
            setProject(projectData)
            setRequirements(requirementsData)
            const nextRequirementId = requirementsData[0]?.id ?? null
            setSelectedRequirementId(nextRequirementId)
            if (nextRequirementId) {
                await loadTestCases(nextRequirementId)
            } else {
                setTestCases([])
            }
        } catch (err) {
            const message = getErrorMessage(err)
            setError(message)
            setToast({ variant: 'error', message })
        } finally {
            setIsLoading(false)
        }
    }, [loadTestCases, projectId])

    useEffect(() => {
        void loadProject()
    }, [loadProject])

    useEffect(() => {
        if (selectedRequirementId) {
            void loadTestCases(selectedRequirementId)
        } else {
            setTestCases([])
        }
    }, [loadTestCases, selectedRequirementId])

    const formError = useMemo(() => {
        if (!projectId) return 'Open this page from a project first'
        if (!form.title.trim()) return 'Requirement title is required'
        if (form.title.trim().length < 3)
            return 'Requirement title must be at least 3 characters'
        if (!form.userStory.trim()) return 'Requirement user story is required'
        if (form.userStory.trim().length < 10)
            return 'Requirement user story must be at least 10 characters'
        return null
    }, [form.title, form.userStory, projectId])

    function handlePickFile() {
        fileInputRef.current?.click()
    }

    async function refreshRequirements(nextSelectedId?: number) {
        const data = await requirementsApi.fetchAll(projectId)
        setRequirements(data)
        const requirementId = nextSelectedId ?? data[0]?.id ?? null
        setSelectedRequirementId(requirementId)
        if (requirementId) await loadTestCases(requirementId)
    }

    async function handleSaveRequirement(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault()
        if (formError) {
            setError(formError)
            return
        }

        setIsSaving(true)
        setError(null)
        try {
            const payload = {
                title: form.title.trim(),
                userStory: form.userStory.trim(),
                projectId,
            }
            if (editingRequirement) {
                await requirementsApi.update(editingRequirement.id, payload)
                await refreshRequirements(editingRequirement.id)
                setToast({
                    variant: 'success',
                    message: 'Requirement updated successfully',
                })
            } else {
                await requirementsApi.create(payload)
                await refreshRequirements()
                setToast({
                    variant: 'success',
                    message: 'Requirement created successfully',
                })
            }
            setForm(emptyForm)
            setEditingRequirement(null)
        } catch (err) {
            const message = getErrorMessage(err)
            setError(message)
            setToast({ variant: 'error', message })
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDeleteRequirement(requirement: Requirement) {
        if (!window.confirm(`Delete "${requirement.title}"?`)) return

        setError(null)
        try {
            await requirementsApi.delete(requirement.id)
            const nextRequirements = requirements.filter(
                (item) => item.id !== requirement.id
            )
            setRequirements(nextRequirements)
            const nextSelected = nextRequirements[0]?.id ?? null
            setSelectedRequirementId(nextSelected)
            setTestCases([])
            setToast({
                variant: 'success',
                message: 'Requirement deleted successfully',
            })
        } catch (err) {
            const message = getErrorMessage(err)
            setError(message)
            setToast({ variant: 'error', message })
        }
    }

    function handleEditRequirement(requirement: Requirement) {
        setEditingRequirement(requirement)
        setForm({
            title: requirement.title,
            userStory: requirement.userStory,
        })
    }

    async function handleGenerate() {
        if (!selectedRequirementId) {
            setError('Select or create a requirement first')
            return
        }

        setIsGenerating(true)
        setError(null)
        try {
            const data = await requirementsApi.generateTestCases(
                selectedRequirementId
            )
            setTestCases(
                data.testCases.map((testCase, index) => ({
                    ...testCase,
                    id: index,
                }))
            )
            setToast({
                variant: 'success',
                message: 'Test cases generated successfully',
            })
        } catch (err) {
            const message = getErrorMessage(err)
            const displayMessage = message.includes('429')
                ? 'Rate limit reached. Please wait a moment before generating again.'
                : message
            setError(displayMessage)
            setToast({ variant: 'error', message: displayMessage })
        } finally {
            setIsGenerating(false)
        }
    }

    async function handleClearTestCases() {
        if (!selectedRequirementId) return
        if (!window.confirm('Delete all test cases for this requirement?'))
            return

        setError(null)
        try {
            await requirementsApi.deleteTestCases(selectedRequirementId)
            setTestCases([])
            setToast({
                variant: 'success',
                message: 'Test cases cleared successfully',
            })
        } catch (err) {
            const message = getErrorMessage(err)
            setError(message)
            setToast({ variant: 'error', message })
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <PageHeader
                title={project ? project.name : 'Define Test Scope'}
                subtitle={
                    project
                        ? project.description ||
                          'Manage requirements and generate comprehensive test cases.'
                        : 'Paste documentation or upload files to generate comprehensive test cases.'
                }
                right={<Badge className="text-xs">AI POWERED SESSION</Badge>}
            />

            {toast ? (
                <Toast variant={toast.variant}>{toast.message}</Toast>
            ) : null}

            <div className="w-full">
                <AppCard className="p-6 sm:p-7">
                    <form
                        className="flex flex-col gap-6"
                        onSubmit={handleSaveRequirement}
                    >
                        <InlineField
                            label="Requirement Title"
                            placeholder="Short requirement title"
                            value={form.title}
                            onChange={(event) =>
                                setForm((current) => ({
                                    ...current,
                                    title: event.target.value,
                                }))
                            }
                        />

                        <PromptTextarea
                            label="Prompt"
                            hint="Markdown Supported"
                            value={form.userStory}
                            onChange={(value) =>
                                setForm((current) => ({
                                    ...current,
                                    userStory: value,
                                }))
                            }
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

                        {error ? (
                            <p className="text-xs text-red-300">{error}</p>
                        ) : null}

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

                            <div className="flex flex-col gap-3 sm:flex-row">
                                {editingRequirement ? (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="md"
                                        onClick={() => {
                                            setEditingRequirement(null)
                                            setForm(emptyForm)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                ) : null}
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    size="md"
                                    disabled={isSaving || !projectId}
                                >
                                    {isSaving
                                        ? 'Saving...'
                                        : editingRequirement
                                          ? 'Update Requirement'
                                          : 'Save Requirement'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="primary"
                                    size="md"
                                    className="w-full bg-(--landing-subtle) text-(--landing-text) opacity-60 hover:bg-(--landing-primary) hover:text-(--landing-card) hover:opacity-80 sm:w-auto"
                                    disabled={
                                        isGenerating || !selectedRequirementId
                                    }
                                    onClick={() => void handleGenerate()}
                                >
                                    <div className="flex items-center gap-2">
                                        <BsStars />
                                        <span>
                                            {isGenerating
                                                ? 'Generating...'
                                                : ' Generate Test Cases'}
                                        </span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </form>
                </AppCard>

                <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <AppCard>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-sm font-semibold text-(--landing-text)">
                                Requirements
                            </h2>
                            {isLoading ? (
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="rounded-[12px] border border-(--landing-border) p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="w-2/3">
                                                <Skeleton className="h-4 w-3/4" />
                                                <div className="mt-2">
                                                    <Skeleton className="h-3 w-1/2" />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Skeleton className="h-8 w-8 rounded-[6px]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-[12px] border border-(--landing-border) p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="w-2/3">
                                                <Skeleton className="h-4 w-3/4" />
                                                <div className="mt-2">
                                                    <Skeleton className="h-3 w-1/2" />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Skeleton className="h-8 w-8 rounded-[6px]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : requirements.length === 0 ? (
                                <p className="rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 p-4 text-sm text-(--landing-muted)">
                                    No requirements found.
                                </p>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {requirements.map((requirement) => (
                                        <div
                                            key={requirement.id}
                                            className="rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <button
                                                    type="button"
                                                    className="min-w-0 text-left"
                                                    onClick={() =>
                                                        setSelectedRequirementId(
                                                            requirement.id
                                                        )
                                                    }
                                                >
                                                    <h3 className="text-sm font-semibold text-(--landing-text)">
                                                        {requirement.title}
                                                    </h3>
                                                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-(--landing-muted)">
                                                        {requirement.userStory}
                                                    </p>
                                                </button>
                                                <div className="flex shrink-0 gap-2">
                                                    <IconButton
                                                        icon={
                                                            <LuPencil
                                                                size={15}
                                                            />
                                                        }
                                                        aria-label="Edit requirement"
                                                        onClick={() =>
                                                            handleEditRequirement(
                                                                requirement
                                                            )
                                                        }
                                                    />
                                                    <IconButton
                                                        icon={
                                                            <LuTrash2
                                                                size={15}
                                                            />
                                                        }
                                                        aria-label="Delete requirement"
                                                        onClick={() =>
                                                            void handleDeleteRequirement(
                                                                requirement
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {selectedRequirementId ===
                                            requirement.id ? (
                                                <div className="mt-3 text-[11px] font-semibold text-(--landing-primary)">
                                                    Selected
                                                </div>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </AppCard>

                    <AppCard>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-sm font-semibold text-(--landing-text)">
                                    Test Cases
                                </h2>
                                {testCases.length > 0 ? (
                                    <button
                                        type="button"
                                        className="text-xs text-(--landing-subtle) hover:text-(--landing-text)"
                                        onClick={() =>
                                            void handleClearTestCases()
                                        }
                                    >
                                        Clear
                                    </button>
                                ) : null}
                            </div>

                            {!selectedRequirement ? (
                                <p className="rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 p-4 text-sm text-(--landing-muted)">
                                    Select a requirement to load test cases.
                                </p>
                            ) : isLoading ? (
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="rounded-[12px] border border-(--landing-border) p-4">
                                        <Skeleton className="h-4 w-1/2" />
                                        <div className="mt-3 h-3 w-full">
                                            <Skeleton className="h-3 w-full" />
                                        </div>
                                    </div>
                                    <div className="rounded-[12px] border border-(--landing-border) p-4">
                                        <Skeleton className="h-4 w-1/2" />
                                        <div className="mt-3 h-3 w-full">
                                            <Skeleton className="h-3 w-full" />
                                        </div>
                                    </div>
                                </div>
                            ) : testCases.length === 0 ? (
                                <p className="rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 p-4 text-sm text-(--landing-muted)">
                                    No saved test cases for this requirement.
                                </p>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {testCases.map((testCase) => (
                                        <div
                                            key={testCase.id}
                                            className="rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 p-4"
                                        >
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <h3 className="text-sm font-semibold text-(--landing-text)">
                                                    {testCase.title}
                                                </h3>
                                                <AppBadge
                                                    variant={testCaseVariant(
                                                        testCase.type
                                                    )}
                                                    className={
                                                        testCase.type ===
                                                        'boundary'
                                                            ? 'border-orange-500/25 bg-orange-500/10 text-orange-300'
                                                            : undefined
                                                    }
                                                >
                                                    {testCase.type}
                                                </AppBadge>
                                            </div>
                                            <ol className="mt-4 list-decimal space-y-2 pl-5 text-xs leading-relaxed text-(--landing-muted)">
                                                {testCase.steps.map((step) => (
                                                    <li key={step}>{step}</li>
                                                ))}
                                            </ol>
                                            <p className="mt-4 text-xs leading-relaxed text-(--landing-text)">
                                                {testCase.expected_result}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </AppCard>
                </section>

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
