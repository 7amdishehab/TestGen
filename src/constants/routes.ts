export const ROUTES = {
    signIn: '/sign-in',
    signUp: '/sign-up',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',

    home: '/',
    dashboard: '/dashboard',
    projects: '/projects',
    export: '/export',
    userProfile: '/user-profile',
    settings: '/settings',
    howItWorks: '/how-it-works',
    uploadRequirements: '/upload-requirements',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
