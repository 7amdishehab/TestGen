export type { AuthToken } from './auth'

export interface Project {
    id: number
    name: string
    description: string
    createdAt: string
    lastModifiedAt: string | null
}

export interface Requirement {
    id: number
    title: string
    userStory: string
    projectId: number
    createdAt: string
    lasModifiedAt: string | null
}

export interface GeneratedTestCase {
    title: string
    type: 'positive' | 'negative' | 'boundary'
    steps: string[]
    expected_result: string
}

export interface SavedTestCase extends GeneratedTestCase {
    id: number
}

export interface AuthUser {
    email: string
    role: string
    token: string
    userId: number
}

export interface ApiError {
    apiPath: string
    errorCode: string
    errorMessage: string
    errorTime: string
}
