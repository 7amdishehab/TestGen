import { useCallback, useEffect, useMemo, useState } from 'react'
import { LuBell, LuPencil, LuPlus, LuSearch, LuTrash2 } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { AppCard } from '../../shared/components/AppCard'
import { IconButton } from '../../shared/components/IconButton'
import { PageHeader } from '../../shared/components/PageHeader'
import { Button } from '../../../landing/components/Button'
import { InlineField } from '../../../landing/components/InlineField'
import { Toast } from '../../../../components/ui/Toast'
import { ROUTES } from '../../../../constants/routes'
import { projectsApi } from '../../../../lib/apiClient'
import type { Project } from '../../../../types'

type ProjectForm = {
    name: string
    description: string
}

const emptyForm: ProjectForm = {
    name: '',
    description: '',
}

function getErrorMessage(err: unknown) {
    return err instanceof Error ? err.message : 'Something went wrong'
}

export function ProjectsPage() {
    const navigate = useNavigate()
    const [projects, setProjects] = useState<Project[]>([])
    const [search, setSearch] = useState('')
    const [form, setForm] = useState<ProjectForm>(emptyForm)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [toast, setToast] = useState<{
        variant: 'success' | 'error'
        message: string
    } | null>(null)

    const fetchProjects = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await projectsApi.fetchAll()
            setProjects(data)
        } catch (err) {
            const message = getErrorMessage(err)
            setError(message)
            setToast({ variant: 'error', message })
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchProjects()
    }, [fetchProjects])

    useEffect(() => {
        const timeout = window.setTimeout(async () => {
            const keyword = search.trim()
            if (!keyword) {
                void fetchProjects()
                return
            }

            setIsLoading(true)
            setError(null)
            try {
                const data = await projectsApi.search(keyword)
                setProjects(data)
            } catch (err) {
                const message = getErrorMessage(err)
                setError(message)
                setToast({ variant: 'error', message })
            } finally {
                setIsLoading(false)
            }
        }, 300)

        return () => window.clearTimeout(timeout)
    }, [fetchProjects, search])

    const formError = useMemo(() => {
        if (!form.name.trim()) return 'Project name is required'
        if (form.name.trim().length < 2)
            return 'Project name must be at least 2 characters'
        return null
    }, [form.name])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (formError) {
            setError(formError)
            return
        }

        setIsSaving(true)
        setError(null)
        try {
            const payload = {
                name: form.name.trim(),
                description: form.description.trim(),
            }
            if (editingProject) {
                await projectsApi.update(editingProject.id, payload)
                setProjects((current) =>
                    current.map((project) =>
                        project.id === editingProject.id
                            ? { ...project, ...payload }
                            : project
                    )
                )
                setToast({
                    variant: 'success',
                    message: 'Project updated successfully',
                })
            } else {
                await projectsApi.create(payload)
                await fetchProjects()
                setToast({
                    variant: 'success',
                    message: 'Project created successfully',
                })
            }
            setForm(emptyForm)
            setEditingProject(null)
        } catch (err) {
            const message = getErrorMessage(err)
            setError(message)
            setToast({ variant: 'error', message })
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(project: Project) {
        if (!window.confirm(`Delete "${project.name}"?`)) return

        setError(null)
        try {
            await projectsApi.delete(project.id)
            setProjects((current) =>
                current.filter((item) => item.id !== project.id)
            )
            setToast({
                variant: 'success',
                message: 'Project deleted successfully',
            })
        } catch (err) {
            const message = getErrorMessage(err)
            setError(message)
            setToast({ variant: 'error', message })
        }
    }

    function handleEdit(project: Project) {
        setEditingProject(project)
        setForm({
            name: project.name,
            description: project.description ?? '',
        })
    }

    function openProject(project: Project) {
        navigate(`${ROUTES.uploadRequirements}?projectId=${project.id}`)
    }

    return (
        <div className="flex flex-col gap-8">
            <PageHeader
                title="Projects"
                subtitle="Create projects, find existing work, and open requirements for generation."
                right={
                    <>
                        <Button
                            variant="secondary"
                            size="sm"
                            leftIcon={<LuPlus size={16} />}
                            onClick={() => {
                                setEditingProject(null)
                                setForm(emptyForm)
                            }}
                        >
                            New Project
                        </Button>
                        <IconButton
                            icon={<LuBell size={16} />}
                            aria-label="Notifications"
                        />
                    </>
                }
            />

            {toast ? (
                <Toast variant={toast.variant}>{toast.message}</Toast>
            ) : null}

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <AppCard className="lg:col-span-1">
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-sm font-semibold text-(--landing-text)">
                            {editingProject ? 'Edit Project' : 'Create Project'}
                        </h2>
                        <InlineField
                            label="Name"
                            placeholder="Project name"
                            value={form.name}
                            onChange={(event) =>
                                setForm((current) => ({
                                    ...current,
                                    name: event.target.value,
                                }))
                            }
                        />
                        <InlineField
                            label="Description"
                            placeholder="Short description"
                            value={form.description}
                            onChange={(event) =>
                                setForm((current) => ({
                                    ...current,
                                    description: event.target.value,
                                }))
                            }
                        />
                        {error ? (
                            <p className="text-xs text-red-300">{error}</p>
                        ) : null}
                        <div className="flex items-center justify-end gap-3">
                            {editingProject ? (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setEditingProject(null)
                                        setForm(emptyForm)
                                    }}
                                >
                                    Cancel
                                </Button>
                            ) : null}
                            <Button type="submit" size="sm" disabled={isSaving}>
                                {isSaving
                                    ? 'Saving...'
                                    : editingProject
                                      ? 'Update'
                                      : 'Create'}
                            </Button>
                        </div>
                    </form>
                </AppCard>

                <AppCard className="lg:col-span-2">
                    <div className="flex flex-col gap-5">
                        <InlineField
                            label=""
                            placeholder="Search projects"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            leftIcon={<LuSearch size={16} />}
                        />

                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-3">
                                {[1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-[12px] border border-(--landing-border) p-4"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="w-2/3">
                                                <div className="h-4 w-3/4 animate-pulse rounded-[6px] bg-(--landing-card)" />
                                                <div className="mt-2 h-3 w-1/2 animate-pulse rounded-[6px] bg-(--landing-card)" />
                                            </div>
                                            <div className="h-8 w-20 animate-pulse rounded-[6px] bg-(--landing-card)" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : projects.length === 0 ? (
                            <p className="rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 p-4 text-sm text-(--landing-muted)">
                                No projects found.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 p-4"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <button
                                                type="button"
                                                className="min-w-0 text-left"
                                                onClick={() =>
                                                    openProject(project)
                                                }
                                            >
                                                <h3 className="truncate text-sm font-semibold text-(--landing-text)">
                                                    {project.name}
                                                </h3>
                                                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-(--landing-muted)">
                                                    {project.description ||
                                                        'No description'}
                                                </p>
                                            </button>
                                            <div className="flex shrink-0 gap-2">
                                                <IconButton
                                                    icon={
                                                        <LuPencil size={15} />
                                                    }
                                                    aria-label="Edit project"
                                                    onClick={() =>
                                                        handleEdit(project)
                                                    }
                                                />
                                                <IconButton
                                                    icon={
                                                        <LuTrash2 size={15} />
                                                    }
                                                    aria-label="Delete project"
                                                    onClick={() =>
                                                        void handleDelete(
                                                            project
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-4 text-xs font-semibold text-(--landing-primary) hover:underline"
                                            onClick={() => openProject(project)}
                                        >
                                            Open requirements
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </AppCard>
            </section>
        </div>
    )
}
