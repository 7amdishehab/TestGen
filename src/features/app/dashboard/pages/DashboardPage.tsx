import { AppCard } from '../../shared/components/AppCard'
import { AppBadge } from '../../shared/components/AppBadge'
import { DataTable } from '../../shared/components/DataTable'
import { IconButton } from '../../shared/components/IconButton'
import { PageHeader } from '../../shared/components/PageHeader'
import { Button } from '../../../landing/components/Button'
import { LuBell, LuCalendarDays, LuDownload } from 'react-icons/lu'

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

export function DashboardPage() {
    const barHeights: Record<string, string> = {
        Auth: 'h-[110px]',
        Search: 'h-[160px]',
        Profile: 'h-[90px]',
        Cart: 'h-[105px]',
        API: 'h-[150px]',
    }

    return (
        <div className="flex flex-col gap-8">
            <PageHeader
                title="Analytics Overview"
                subtitle="Monitor your AI test generation performance"
                right={
                    <>
                        <div className="hidden items-center gap-2 rounded-[12px] border border-(--landing-border) bg-(--landing-card) px-4 py-2 text-sm text-(--landing-muted) md:flex">
                            <LuCalendarDays size={16} aria-hidden="true" />
                            <span>Feb 24, 2026</span>
                        </div>
                        <div className="hidden items-center gap-2 rounded-[12px] border border-(--landing-border) bg-(--landing-card) px-4 py-2 text-sm text-(--landing-muted) md:flex">
                            <span>Last 30 Days</span>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="hidden md:inline-flex"
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
                <AppCard className="relative overflow-hidden">
                    <div className="text-xs text-(--landing-subtle)">
                        Total Test Cases
                    </div>
                    <div className="mt-2 text-3xl font-semibold text-(--landing-text)">
                        12,450
                    </div>
                    <div className="mt-1 text-xs font-semibold text-emerald-400">
                        +12% this week
                    </div>
                </AppCard>

                <AppCard className="relative overflow-hidden">
                    <div className="text-xs text-(--landing-subtle)">
                        Automation Saved
                    </div>
                    <div className="mt-2 text-3xl font-semibold text-(--landing-text)">
                        850 Hrs
                    </div>
                </AppCard>

                <AppCard className="relative overflow-hidden">
                    <div className="text-xs text-(--landing-subtle)">
                        AI Confidence Score
                    </div>
                    <div className="mt-2 text-3xl font-semibold text-(--landing-text)">
                        98.5%
                    </div>
                </AppCard>
            </section>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <AppCard className="min-h-[220px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-(--landing-text)">
                            Test Coverage
                        </h2>
                        <span className="text-xs text-(--landing-subtle)">
                            Real-time
                        </span>
                    </div>
                    <div className="mt-10 flex items-center justify-center">
                        <div className="flex h-36 w-36 items-center justify-center rounded-full border-[14px] border-(--landing-primary)/25">
                            <div className="text-center">
                                <div className="text-3xl font-semibold text-(--landing-text)">
                                    85%
                                </div>
                                <div className="text-xs text-(--landing-subtle)">
                                    High Coverage
                                </div>
                            </div>
                        </div>
                    </div>
                </AppCard>

                <AppCard className="min-h-[220px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-(--landing-text)">
                            Test Case Types
                        </h2>
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-6">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full border-[14px] border-fuchsia-500/40" />
                        <div className="flex flex-col gap-3 text-xs">
                            <div className="flex items-center justify-between gap-6">
                                <span className="inline-flex items-center gap-2 text-(--landing-muted)">
                                    <span className="h-2 w-2 rounded-full bg-(--landing-primary)" />{' '}
                                    Positive
                                </span>
                                <span className="text-(--landing-text)">
                                    45.0%
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-6">
                                <span className="inline-flex items-center gap-2 text-(--landing-muted)">
                                    <span className="h-2 w-2 rounded-full bg-violet-500" />{' '}
                                    Negative
                                </span>
                                <span className="text-(--landing-text)">
                                    30.0%
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-6">
                                <span className="inline-flex items-center gap-2 text-(--landing-muted)">
                                    <span className="h-2 w-2 rounded-full bg-pink-500" />{' '}
                                    Boundary
                                </span>
                                <span className="text-(--landing-text)">
                                    25.0%
                                </span>
                            </div>
                        </div>
                    </div>
                </AppCard>

                <AppCard className="min-h-[220px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-(--landing-text)">
                            Test Cases per Feature
                        </h2>
                    </div>
                    <div className="mt-10 grid grid-cols-6 items-end gap-3">
                        {[
                            { label: 'Auth' },
                            { label: 'Search' },
                            { label: 'Profile' },
                            { label: 'Cart' },
                            { label: 'API' },
                        ].map((bar) => (
                            <div
                                key={bar.label}
                                className="flex flex-col items-center gap-2"
                            >
                                <div
                                    className={`w-7 rounded-[10px] bg-(--landing-primary) ${barHeights[bar.label]}`}
                                />
                                <div className="text-[11px] text-(--landing-subtle)">
                                    {bar.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </AppCard>
            </section>

            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-(--landing-text)">
                        Recent Generations
                    </h2>
                    <a
                        className="text-xs font-semibold text-(--landing-primary) hover:underline"
                        href="#"
                    >
                        View All
                    </a>
                </div>

                <DataTable
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
                                >
                                    {row.status}
                                </AppBadge>
                            ),
                        },
                        {
                            key: 'module',
                            header: 'Module',
                            cell: (row) => (
                                <span className="text-(--landing-text)">
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
            </section>
        </div>
    )
}
