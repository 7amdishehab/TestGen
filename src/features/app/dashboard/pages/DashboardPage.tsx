import {
    LuBell,
    LuCalendarDays,
    LuClock3,
    LuDownload,
    LuFileText,
    LuShield,
} from 'react-icons/lu'
import { AppBadge } from '../../shared/components/AppBadge'
import { AppCard } from '../../shared/components/AppCard'
import { DataTable } from '../../shared/components/DataTable'
import { IconButton } from '../../shared/components/IconButton'
import { PageHeader } from '../../shared/components/PageHeader'
import { Button } from '../../../landing/components/Button'

type RecentGenerationRow = {
    id: string
    status: 'Generated' | 'Processing'
    module: string
    type: 'Boundary' | 'Negative' | 'Positive'
    coverage: string
    date: string
}

const rows: RecentGenerationRow[] = [
    {
        id: '1',
        status: 'Generated',
        module: 'Authentication',
        type: 'Boundary',
        coverage: '92%',
        date: 'Oct 24, 2023',
    },
    {
        id: '2',
        status: 'Processing',
        module: 'Payment Gateway',
        type: 'Negative',
        coverage: 'Pending',
        date: 'Oct 24, 2023',
    },
    {
        id: '3',
        status: 'Generated',
        module: 'User Profile',
        type: 'Positive',
        coverage: '88%',
        date: 'Oct 23, 2023',
    },
]

const bars = [
    { label: 'Auth', value: 240 },
    { label: '', value: 330 },
    { label: 'Search', value: 180 },
    { label: 'Profile', value: 210 },
    { label: 'Cart', value: 150 },
    { label: 'API', value: 300 },
]

export function DashboardPage() {
    return (
        <div className="flex flex-col gap-8">
            <PageHeader
                title="Analytics Overview"
                subtitle="Monitor your AI test generation performance"
                right={
                    <>
                        <div className="hidden items-center gap-4 rounded-[12px] border border-(--landing-border) bg-(--landing-card) px-4 py-2 text-sm text-(--landing-muted) md:flex">
                            <span className="inline-flex items-center gap-3">
                                <LuCalendarDays
                                    size={16}
                                    aria-hidden="true"
                                    className="text-(--landing-primary)"
                                />
                                Feb 24, 2026
                            </span>
                            <span className="h-5 w-px bg-(--landing-border)" />
                            <span>Last 30 Days</span>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="hidden border-(--landing-primary) bg-transparent text-(--landing-primary) hover:bg-(--landing-primary)/10 md:inline-flex"
                            leftIcon={<LuDownload size={16} />}
                        >
                            Export Report
                        </Button>
                        <IconButton
                            icon={<LuBell size={16} />}
                            aria-label="Notifications"
                        />
                    </>
                }
            />

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <AppCard className="relative min-h-[132px] overflow-hidden p-8">
                    <LuFileText
                        size={86}
                        className="absolute top-5 right-6 text-(--landing-border)/45"
                        aria-hidden="true"
                    />
                    <div className="relative text-sm font-semibold text-(--landing-subtle)">
                        Total Test Cases
                    </div>
                    <div className="relative mt-3 text-4xl font-bold text-(--landing-text)">
                        12,450
                    </div>
                    <div className="relative mt-3 text-sm font-semibold text-(--landing-primary)">
                        +12% this week
                    </div>
                </AppCard>

                <AppCard className="relative min-h-[132px] overflow-hidden p-8">
                    <LuClock3
                        size={92}
                        className="absolute top-5 right-7 text-(--landing-border)/45"
                        aria-hidden="true"
                    />
                    <div className="relative text-sm font-semibold text-(--landing-subtle)">
                        Automation Saved
                    </div>
                    <div className="relative mt-3 text-4xl font-bold text-(--landing-text)">
                        850 Hrs
                    </div>
                </AppCard>

                <AppCard className="relative min-h-[132px] overflow-hidden p-8">
                    <LuShield
                        size={92}
                        className="absolute top-5 right-7 text-(--landing-border)/45"
                        aria-hidden="true"
                    />
                    <div className="relative text-sm font-semibold text-(--landing-subtle)">
                        AI Confidence Score
                    </div>
                    <div className="relative mt-3 text-4xl font-bold text-(--landing-text)">
                        98.5%
                    </div>
                </AppCard>
            </section>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <AppCard className="min-h-[280px] p-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-(--landing-text)">
                            Test Coverage
                        </h2>
                        <span className="text-xs font-semibold text-(--landing-subtle)">
                            Real-time
                        </span>
                    </div>

                    <div className="mt-8 flex items-center justify-center">
                        <div
                            className="relative flex h-44 w-44 items-center justify-center rounded-full"
                            style={{
                                background:
                                    'conic-gradient(var(--landing-primary) 0deg 306deg, #263247 306deg 338deg, transparent 338deg 360deg)',
                            }}
                        >
                            <div className="absolute inset-[22px] rounded-full bg-(--landing-card)" />
                            <div className="relative text-center">
                                <div className="text-4xl font-bold text-(--landing-text)">
                                    85%
                                </div>
                                <div className="mt-2 text-sm text-(--landing-muted)">
                                    High Coverage
                                </div>
                            </div>
                        </div>
                    </div>
                </AppCard>

                <AppCard className="min-h-[280px] p-8">
                    <h2 className="text-base font-semibold text-(--landing-text)">
                        Test Case Types
                    </h2>

                    <div className="mt-8 flex items-center justify-between gap-8">
                        <div
                            className="relative h-42 w-42 shrink-0 rounded-full"
                            style={{
                                background:
                                    'conic-gradient(var(--landing-primary) 0deg 162deg, transparent 162deg 176deg, #a855f7 176deg 284deg, transparent 284deg 298deg, #ec4899 298deg 360deg)',
                            }}
                        >
                            <div className="absolute inset-[30px] rounded-full bg-(--landing-card)" />
                        </div>

                        <div className="flex flex-1 flex-col gap-6 text-sm">
                            <div className="flex items-start gap-4">
                                <span className="mt-1 h-3 w-3 rounded-full bg-(--landing-primary)" />
                                <div>
                                    <div className="text-(--landing-muted)">
                                        Positive
                                    </div>
                                    <div className="mt-1 font-bold text-(--landing-text)">
                                        45.0%
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="mt-1 h-3 w-3 rounded-full bg-purple-500" />
                                <div>
                                    <div className="text-(--landing-muted)">
                                        Negative
                                    </div>
                                    <div className="mt-1 font-bold text-(--landing-text)">
                                        30.0%
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="mt-1 h-3 w-3 rounded-full bg-pink-500" />
                                <div>
                                    <div className="text-(--landing-muted)">
                                        Boundary
                                    </div>
                                    <div className="mt-1 font-bold text-(--landing-text)">
                                        25.0%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AppCard>

                <AppCard className="min-h-[280px] p-8">
                    <h2 className="text-base font-semibold text-(--landing-text)">
                        Test Cases per Feature
                    </h2>

                    <div className="mt-7 grid grid-cols-[34px_1fr] gap-4">
                        <div className="flex h-44 flex-col justify-between text-xs text-(--landing-subtle)">
                            <span>360</span>
                            <span>270</span>
                            <span>180</span>
                            <span>90</span>
                            <span>0</span>
                        </div>
                        <div className="relative h-44 border-b border-(--landing-border)">
                            <div className="absolute inset-x-0 top-0 h-px border-t border-dashed border-(--landing-border)" />
                            <div className="absolute inset-x-0 top-1/4 h-px border-t border-dashed border-(--landing-border)" />
                            <div className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-(--landing-border)" />
                            <div className="absolute inset-x-0 top-3/4 h-px border-t border-dashed border-(--landing-border)" />
                            <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-between gap-3 px-1">
                                {bars.map((bar) => (
                                    <div
                                        key={`${bar.label}-${bar.value}`}
                                        className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                                    >
                                        <div
                                            className="w-full max-w-8 rounded-t-[6px] bg-(--landing-primary)"
                                            style={{
                                                height: `${(bar.value / 360) * 100}%`,
                                            }}
                                        />
                                        <span className="text-xs text-(--landing-subtle)">
                                            {bar.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </AppCard>
            </section>

            <section>
                <div className="overflow-hidden rounded-[16px] border border-(--landing-border) bg-(--landing-card)">
                    <div className="flex items-center justify-between px-6 py-6">
                        <h2 className="text-base font-semibold text-(--landing-text)">
                            Recent Generations
                        </h2>
                        <button
                            type="button"
                            className="text-sm font-semibold text-(--landing-primary) hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    <DataTable
                        className="rounded-none border-x-0 border-b-0"
                        columns={[
                            {
                                key: 'status',
                                header: 'Status',
                                cell: (row) => (
                                    <AppBadge
                                        variant={
                                            row.status === 'Generated'
                                                ? 'success'
                                                : 'neutral'
                                        }
                                        className={
                                            row.status === 'Processing'
                                                ? 'border-yellow-500/25 bg-yellow-500/10 text-yellow-300'
                                                : undefined
                                        }
                                    >
                                        {row.status}
                                    </AppBadge>
                                ),
                            },
                            {
                                key: 'module',
                                header: 'Module',
                                cell: (row) => (
                                    <span className="font-semibold text-(--landing-text)">
                                        {row.module}
                                    </span>
                                ),
                            },
                            {
                                key: 'type',
                                header: 'Type',
                                cell: (row) => (
                                    <AppBadge
                                        variant={
                                            row.type === 'Positive'
                                                ? 'info'
                                                : row.type === 'Negative'
                                                  ? 'neutral'
                                                  : 'danger'
                                        }
                                        className={
                                            row.type === 'Boundary'
                                                ? 'border-pink-500/25 bg-pink-500/10 text-pink-300'
                                                : row.type === 'Negative'
                                                  ? 'border-purple-500/25 bg-purple-500/10 text-purple-300'
                                                  : undefined
                                        }
                                    >
                                        {row.type}
                                    </AppBadge>
                                ),
                            },
                            {
                                key: 'coverage',
                                header: 'Coverage',
                                cell: (row) => row.coverage,
                            },
                            {
                                key: 'date',
                                header: 'Date',
                                cell: (row) => row.date,
                            },
                            {
                                key: 'action',
                                header: 'Action',
                                className: 'text-right',
                                cell: () => (
                                    <div className="flex justify-end">
                                        <IconButton
                                            icon={<LuDownload size={16} />}
                                            aria-label="Download"
                                        />
                                    </div>
                                ),
                            },
                        ]}
                        rows={rows}
                        rowKey={(row) => row.id}
                    />
                </div>
            </section>
        </div>
    )
}
