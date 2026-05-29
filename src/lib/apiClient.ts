import type {
    AuthUser,
    GeneratedTestCase,
    Project,
    Requirement,
    SavedTestCase,
} from '../types'

const env = import.meta.env as Record<string, string | undefined>
const BASE_URL =
    env.NEXT_PUBLIC_API_BASE_URL ||
    env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? '' : 'http://localhost:8072')

const MOCK_DB_KEY = 'testgen_mock_db'

type MockDb = {
    projects: Project[]
    requirements: Requirement[]
    testCasesByRequirementId: Record<number, SavedTestCase[]>
    nextProjectId: number
    nextRequirementId: number
    nextTestCaseId: number
}

function createEmptyMockDb(): MockDb {
    return {
        projects: [
            {
                id: 1,
                name: 'E-commerce Platform',
                description: 'Mock project used when the backend is unavailable.',
                createdAt: new Date().toISOString(),
                lastModifiedAt: null,
            },
        ],
        requirements: [
            {
                id: 1,
                title: 'User login',
                userStory:
                    'As a user, I want to log in using email and password so that I can access my account securely.',
                projectId: 1,
                createdAt: new Date().toISOString(),
                lasModifiedAt: null,
            },
        ],
        testCasesByRequirementId: {
            1: [
                {
                    id: 1,
                    title: 'Valid login',
                    type: 'positive',
                    steps: [
                        'Open the login page',
                        'Enter a valid email address',
                        'Enter a valid password',
                        'Click Sign In',
                    ],
                    expected_result: 'The user is redirected to the dashboard',
                },
            ],
        },
        nextProjectId: 2,
        nextRequirementId: 2,
        nextTestCaseId: 2,
    }
}

function readMockDb(): MockDb {
    if (typeof window === 'undefined') return createEmptyMockDb()

    const stored = window.localStorage.getItem(MOCK_DB_KEY)
    if (!stored) {
        const initial = createEmptyMockDb()
        window.localStorage.setItem(MOCK_DB_KEY, JSON.stringify(initial))
        return initial
    }

    try {
        return JSON.parse(stored) as MockDb
    } catch {
        const initial = createEmptyMockDb()
        window.localStorage.setItem(MOCK_DB_KEY, JSON.stringify(initial))
        return initial
    }
}

function writeMockDb(db: MockDb) {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db))
}

function createMockToken(email: string) {
    return `mock-${btoa(email.toLowerCase())}`
}

function createMockUser(email: string): AuthUser {
    return {
        email,
        role: 'CUSTOMER',
        token: createMockToken(email),
        userId: Math.abs(
            Array.from(email.toLowerCase()).reduce(
                (accumulator, character) =>
                    (accumulator * 31 + character.charCodeAt(0)) >>> 0,
                7
            )
        ),
    }
}

function isBackendUnavailableError(error: unknown) {
    if (error instanceof Error) {
        return (
            error.name === 'TypeError' ||
            error.message.includes('Failed to fetch') ||
            error.message.includes('NetworkError') ||
            error.message.includes('CORS')
        )
    }

    return false
}

function getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('testgen_token')
}

async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken()
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    })

    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')
    const data = isJson ? await response.json() : await response.text()

    if (!response.ok) {
        const message =
            typeof data === 'string'
                ? data
                : data?.errorMessage ||
                  data?.statusMsg ||
                  'An unexpected error occurred'
        throw new Error(message)
    }

    return data as T
}

async function apiRequestWithFallback<T>(
    endpoint: string,
    options: RequestInit = {},
    fallback?: () => Promise<T>
): Promise<T> {
    try {
        return await apiRequest<T>(endpoint, options)
    } catch (error) {
        if (fallback && isBackendUnavailableError(error)) {
            return fallback()
        }

        throw error
    }
}

function createGeneratedTestCases(requirementTitle: string): SavedTestCase[] {
    return [
        {
            id: 1,
            title: `Valid ${requirementTitle.toLowerCase()}`,
            type: 'positive',
            steps: [
                'Open the relevant page',
                `Perform the ${requirementTitle.toLowerCase()} action`,
                'Submit the form',
            ],
            expected_result: 'The user flow completes successfully',
        },
        {
            id: 2,
            title: `Invalid ${requirementTitle.toLowerCase()}`,
            type: 'negative',
            steps: [
                'Open the relevant page',
                'Provide invalid data',
                'Submit the form',
            ],
            expected_result: 'Validation feedback is displayed',
        },
        {
            id: 3,
            title: `${requirementTitle} boundary case`,
            type: 'boundary',
            steps: [
                'Open the relevant page',
                'Use minimum accepted values',
                'Submit the form',
            ],
            expected_result: 'Boundary conditions are handled correctly',
        },
    ]
}

export const authApi = {
    signUp: (body: { username: string; email: string; password: string }) =>
        apiRequestWithFallback<string>(
            '/testcasegenerator/auth/api/auth/signup',
            {
                method: 'POST',
                body: JSON.stringify(body),
            },
            async () => {
                const user = createMockUser(body.email)
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(
                        'testgen_mock_last_signup',
                        JSON.stringify({
                            username: body.username,
                            email: body.email,
                        })
                    )
                }

                return `Mock account created for ${user.email}`
            }
        ),

    signIn: (body: { email: string; password: string }) =>
        apiRequestWithFallback<AuthUser>(
            '/testcasegenerator/auth/api/auth/signin',
            {
                method: 'POST',
                body: JSON.stringify(body),
            },
            async () => createMockUser(body.email)
        ),

    logout: () =>
        apiRequestWithFallback(
            '/testcasegenerator/auth/logout',
            {
                method: 'POST',
            },
            async () => undefined
        ),
}

export const projectsApi = {
    create: (body: { name: string; description: string }) =>
        apiRequestWithFallback<Project>(
            '/testcasegenerator/projects/api/create',
            {
                method: 'POST',
                body: JSON.stringify(body),
            },
            async () => {
                const db = readMockDb()
                const project: Project = {
                    id: db.nextProjectId,
                    name: body.name,
                    description: body.description,
                    createdAt: new Date().toISOString(),
                    lastModifiedAt: null,
                }
                db.projects.unshift(project)
                db.nextProjectId += 1
                writeMockDb(db)
                return project
            }
        ),

    fetchAll: () =>
        apiRequestWithFallback<Project[]>(
            '/testcasegenerator/projects/api/fetch-all',
            {},
            async () => readMockDb().projects
        ),

    fetchOne: (id: number) =>
        apiRequestWithFallback<Project>(
            `/testcasegenerator/projects/api/fetch/${id}`,
            {},
            async () => {
                const project = readMockDb().projects.find(
                    (item) => item.id === id
                )
                if (!project) throw new Error(`Project with id ${id} not found`)
                return project
            }
        ),

    search: (keyword: string) =>
        apiRequestWithFallback<Project[]>(
            `/testcasegenerator/projects/api/search?keyword=${encodeURIComponent(keyword)}`,
            {},
            async () => {
                const normalized = keyword.toLowerCase()
                return readMockDb().projects.filter(
                    (project) =>
                        project.name.toLowerCase().includes(normalized) ||
                        project.description.toLowerCase().includes(normalized)
                )
            }
        ),

    update: (id: number, body: { name: string; description: string }) =>
        apiRequestWithFallback<Project>(
            `/testcasegenerator/projects/api/update/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(body),
            },
            async () => {
                const db = readMockDb()
                const project = db.projects.find((item) => item.id === id)
                if (!project) throw new Error(`Project with id ${id} not found`)

                project.name = body.name
                project.description = body.description
                project.lastModifiedAt = new Date().toISOString()
                writeMockDb(db)
                return project
            }
        ),

    delete: (id: number) =>
        apiRequestWithFallback(
            `/testcasegenerator/projects/api/delete/${id}`,
            {
                method: 'DELETE',
            },
            async () => {
                const db = readMockDb()
                db.projects = db.projects.filter((project) => project.id !== id)
                db.requirements = db.requirements.filter(
                    (requirement) => requirement.projectId !== id
                )
                Object.keys(db.testCasesByRequirementId).forEach((key) => {
                    const requirementId = Number(key)
                    if (
                        db.requirements.every(
                            (requirement) => requirement.id !== requirementId
                        )
                    ) {
                        delete db.testCasesByRequirementId[requirementId]
                    }
                })
                writeMockDb(db)
            }
        ),
}

export const requirementsApi = {
    create: (body: { title: string; userStory: string; projectId: number }) =>
        apiRequestWithFallback<Requirement>(
            '/testcasegenerator/requirements/api/create',
            {
                method: 'POST',
                body: JSON.stringify(body),
            },
            async () => {
                const db = readMockDb()
                const requirement: Requirement = {
                    id: db.nextRequirementId,
                    title: body.title,
                    userStory: body.userStory,
                    projectId: body.projectId,
                    createdAt: new Date().toISOString(),
                    lasModifiedAt: null,
                }
                db.requirements.unshift(requirement)
                db.nextRequirementId += 1
                writeMockDb(db)
                return requirement
            }
        ),

    fetchAll: (projectId: number) =>
        apiRequestWithFallback<Requirement[]>(
            `/testcasegenerator/requirements/api/fetch-all?projectId=${projectId}`,
            {},
            async () =>
                readMockDb().requirements.filter(
                    (requirement) => requirement.projectId === projectId
                )
        ),

    fetchOne: (id: number) =>
        apiRequestWithFallback<Requirement>(
            `/testcasegenerator/requirements/api/fetch/${id}`,
            {},
            async () => {
                const requirement = readMockDb().requirements.find(
                    (item) => item.id === id
                )
                if (!requirement)
                    throw new Error(`Requirement with id ${id} not found`)
                return requirement
            }
        ),

    update: (
        id: number,
        body: { title: string; userStory: string; projectId: number }
    ) =>
        apiRequestWithFallback<Requirement>(
            `/testcasegenerator/requirements/api/update/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(body),
            },
            async () => {
                const db = readMockDb()
                const requirement = db.requirements.find(
                    (item) => item.id === id
                )
                if (!requirement)
                    throw new Error(`Requirement with id ${id} not found`)

                requirement.title = body.title
                requirement.userStory = body.userStory
                requirement.projectId = body.projectId
                requirement.lasModifiedAt = new Date().toISOString()
                writeMockDb(db)
                return requirement
            }
        ),

    delete: (id: number) =>
        apiRequestWithFallback(
            `/testcasegenerator/requirements/api/delete/${id}`,
            {
                method: 'DELETE',
            },
            async () => {
                const db = readMockDb()
                db.requirements = db.requirements.filter(
                    (requirement) => requirement.id !== id
                )
                delete db.testCasesByRequirementId[id]
                writeMockDb(db)
            }
        ),

    generateTestCases: (requirementId: number) =>
        apiRequestWithFallback<{ testCases: GeneratedTestCase[] }>(
            `/testcasegenerator/requirements/api/${requirementId}/generate-testcases`,
            { method: 'POST' },
            async () => {
                const db = readMockDb()
                const requirement = db.requirements.find(
                    (item) => item.id === requirementId
                )

                const testCases = createGeneratedTestCases(
                    requirement?.title ?? 'test case'
                )

                db.testCasesByRequirementId[requirementId] = testCases
                db.nextTestCaseId = Math.max(
                    db.nextTestCaseId,
                    ...testCases.map((testCase) => testCase.id + 1)
                )
                writeMockDb(db)

                return { testCases }
            }
        ),

    fetchTestCases: (requirementId: number) =>
        apiRequestWithFallback<SavedTestCase[]>(
            `/testcasegenerator/requirements/api/${requirementId}/testcases`,
            {},
            async () => readMockDb().testCasesByRequirementId[requirementId] ?? []
        ),

    deleteTestCases: (requirementId: number) =>
        apiRequestWithFallback(
            `/testcasegenerator/requirements/api/${requirementId}/testcases`,
            { method: 'DELETE' },
            async () => {
                const db = readMockDb()
                delete db.testCasesByRequirementId[requirementId]
                writeMockDb(db)
            }
        ),
}
