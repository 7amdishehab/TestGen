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

export const authApi = {
    signUp: (body: { username: string; email: string; password: string }) =>
        apiRequest<string>('/testcasegenerator/auth/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(body),
        }),

    signIn: (body: { email: string; password: string }) =>
        apiRequest<AuthUser>('/testcasegenerator/auth/api/auth/signin', {
            method: 'POST',
            body: JSON.stringify(body),
        }),

    logout: () =>
        apiRequest('/testcasegenerator/auth/logout', {
            method: 'POST',
        }),
}

export const projectsApi = {
    create: (body: { name: string; description: string }) =>
        apiRequest('/testcasegenerator/projects/api/create', {
            method: 'POST',
            body: JSON.stringify(body),
        }),

    fetchAll: () =>
        apiRequest<Project[]>('/testcasegenerator/projects/api/fetch-all'),

    fetchOne: (id: number) =>
        apiRequest<Project>(`/testcasegenerator/projects/api/fetch/${id}`),

    search: (keyword: string) =>
        apiRequest<Project[]>(
            `/testcasegenerator/projects/api/search?keyword=${encodeURIComponent(keyword)}`
        ),

    update: (id: number, body: { name: string; description: string }) =>
        apiRequest(`/testcasegenerator/projects/api/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
        }),

    delete: (id: number) =>
        apiRequest(`/testcasegenerator/projects/api/delete/${id}`, {
            method: 'DELETE',
        }),
}

export const requirementsApi = {
    create: (body: { title: string; userStory: string; projectId: number }) =>
        apiRequest('/testcasegenerator/requirements/api/create', {
            method: 'POST',
            body: JSON.stringify(body),
        }),

    fetchAll: (projectId: number) =>
        apiRequest<Requirement[]>(
            `/testcasegenerator/requirements/api/fetch-all?projectId=${projectId}`
        ),

    fetchOne: (id: number) =>
        apiRequest<Requirement>(
            `/testcasegenerator/requirements/api/fetch/${id}`
        ),

    update: (
        id: number,
        body: { title: string; userStory: string; projectId: number }
    ) =>
        apiRequest(`/testcasegenerator/requirements/api/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
        }),

    delete: (id: number) =>
        apiRequest(`/testcasegenerator/requirements/api/delete/${id}`, {
            method: 'DELETE',
        }),

    generateTestCases: (requirementId: number) =>
        apiRequest<{ testCases: GeneratedTestCase[] }>(
            `/testcasegenerator/requirements/api/${requirementId}/generate-testcases`,
            { method: 'POST' }
        ),

    fetchTestCases: (requirementId: number) =>
        apiRequest<SavedTestCase[]>(
            `/testcasegenerator/requirements/api/${requirementId}/testcases`
        ),

    deleteTestCases: (requirementId: number) =>
        apiRequest(
            `/testcasegenerator/requirements/api/${requirementId}/testcases`,
            { method: 'DELETE' }
        ),
}
