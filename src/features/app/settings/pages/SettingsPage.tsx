import {
    FiActivity,
    FiCode,
    FiClock,
    FiLayers,
    FiShield,
    FiTrendingUp,
} from 'react-icons/fi'
import { AppCard } from '../../shared/components/AppCard'
import { AppBadge } from '../../shared/components/AppBadge'
import { MotionReveal } from '../../../landing/components/MotionReveal'

const user = {
    name: 'Ayman Nasr',
    role: 'QA Engineer',
    email: 'ayman.nasr@example.com',
    joinedAt: 'Joined March 2024',
    avatarUrl: '',
    bio: 'AI-powered test automation specialist with focus on regression testing and API validation. Passionate about improving software quality through intelligent test generation.',
}

const recentActivities = [
    {
        icon: FiActivity,
        iconClassName: 'text-teal-300',
        label: 'Generated API test suite',
        detail: 'E-commerce Backend',
        time: '2 hours ago',
    },
    {
        icon: FiCode,
        iconClassName: 'text-blue-300',
        label: 'Created UI automation tests',
        detail: 'Mobile App v2.0',
        time: '5 hours ago',
    },
    {
        icon: FiShield,
        iconClassName: 'text-violet-300',
        label: 'Generated security test cases',
        detail: 'Payment Gateway',
        time: '1 day ago',
    },
    {
        icon: FiTrendingUp,
        iconClassName: 'text-emerald-300',
        label: 'Created performance tests',
        detail: 'Analytics Dashboard',
        time: '2 days ago',
    },
]

const specializationTags = [
    'API Testing',
    'UI Automation',
    'Performance Testing',
    'Security Testing',
    'Regression Testing',
    'Integration Testing',
]

export function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <MotionReveal>
                <AppCard className="p-6 sm:p-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-start gap-5">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--landing-primary)/35 bg-(--landing-background)/30 text-lg font-semibold text-(--landing-text)">
                                    {user.avatarUrl ? (
                                        <img
                                            src={user.avatarUrl}
                                            alt={`${user.name} profile`}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span aria-hidden="true">AN</span>
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-2">
                                            <h1 className="text-2xl font-semibold text-(--landing-text) sm:text-[30px]">
                                                {user.name}
                                            </h1>
                                            <AppBadge
                                                variant="success"
                                                className="w-fit"
                                            >
                                                {user.role}
                                            </AppBadge>
                                        </div>

                                        <p className="text-sm text-(--landing-subtle)">
                                            {user.joinedAt}
                                        </p>

                                        <p className="max-w-2xl text-sm leading-relaxed text-(--landing-muted) sm:text-[15px]">
                                            {user.bio}
                                        </p>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        {[
                                            {
                                                value: '1,247',
                                                label: 'Test Cases Generated',
                                            },
                                            {
                                                value: '89',
                                                label: 'Test Suites',
                                            },
                                            {
                                                value: '94%',
                                                label: 'Success Rate',
                                            },
                                        ].map((stat) => (
                                            <div key={stat.label}>
                                                <div className="text-2xl font-semibold text-(--landing-text)">
                                                    {stat.value}
                                                </div>
                                                <div className="mt-1 text-xs text-(--landing-subtle)">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AppCard>
            </MotionReveal>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <MotionReveal
                    className="flex flex-col gap-6 lg:col-span-2"
                    delay={0.06}
                >
                    <AppCard>
                        <div className="flex flex-col gap-5">
                            <h2 className="text-sm font-semibold text-(--landing-text)">
                                Recent Test Generation Activity
                            </h2>

                            <div className="divide-y divide-(--landing-border)">
                                {recentActivities.map((activity) => {
                                    const Icon = activity.icon

                                    return (
                                        <div
                                            key={activity.label}
                                            className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--landing-background)/30">
                                                    <Icon
                                                        size={18}
                                                        className={
                                                            activity.iconClassName
                                                        }
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="text-sm font-medium text-(--landing-text)">
                                                        {activity.label}
                                                    </div>
                                                    <div className="mt-1 text-xs text-(--landing-muted)">
                                                        {activity.detail}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-xs text-(--landing-subtle) sm:text-right">
                                                {activity.time}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </AppCard>
                    <AppCard>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-sm font-semibold text-(--landing-text)">
                                Test Specializations
                            </h2>

                            <div className="flex flex-wrap gap-3">
                                {specializationTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-[10px] border border-(--landing-border) bg-(--landing-background)/20 px-3 py-1.5 text-xs font-semibold text-(--landing-primary)"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </AppCard>
                </MotionReveal>

                <div className="grid grid-cols-1 gap-6">
                    <MotionReveal delay={0.1} className="flex flex-col gap-6">
                        <AppCard>
                            <div className="flex flex-col gap-4">
                                <h2 className="text-sm font-semibold text-(--landing-text)">
                                    AI Generation Settings
                                </h2>

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-sm text-(--landing-muted)">
                                            <FiLayers
                                                className="text-(--landing-subtle)"
                                                size={16}
                                            />
                                            <span>Preferred AI Model</span>
                                        </div>
                                        <span className="text-sm font-semibold text-(--landing-primary)">
                                            GPT-4
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-sm text-(--landing-muted)">
                                            <FiClock
                                                className="text-(--landing-subtle)"
                                                size={16}
                                            />
                                            <span>Test Coverage Level</span>
                                        </div>
                                        <span className="text-sm font-semibold text-(--landing-primary)">
                                            Comprehensive
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-sm text-(--landing-muted)">
                                            <FiTrendingUp
                                                className="text-(--landing-subtle)"
                                                size={16}
                                            />
                                            <span>Auto-generation</span>
                                        </div>
                                        <span className="text-sm font-semibold text-(--landing-primary)">
                                            Enabled
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </AppCard>
                        <AppCard>
                            <div className="flex flex-col gap-5">
                                <h2 className="text-sm font-semibold text-(--landing-text)">
                                    This Month
                                </h2>

                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        {
                                            value: '143',
                                            label: 'Tests Created',
                                        },
                                        {
                                            value: '27',
                                            label: 'Bugs Found',
                                        },
                                        {
                                            value: '48',
                                            label: 'Hours Saved',
                                        },
                                        {
                                            value: '96%',
                                            label: 'AI Accuracy',
                                        },
                                    ].map((stat) => (
                                        <div key={stat.label}>
                                            <div className="text-xl font-semibold text-(--landing-text)">
                                                {stat.value}
                                            </div>
                                            <div className="mt-1 text-xs text-(--landing-subtle)">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AppCard>
                    </MotionReveal>
                </div>
            </div>
        </div>
    )
}
