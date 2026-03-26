import { AppCard } from '../../shared/components/AppCard'
import { AppBadge } from '../../shared/components/AppBadge'
import { DataTable } from '../../shared/components/DataTable'
import { IconButton } from '../../shared/components/IconButton'
import { PageHeader } from '../../shared/components/PageHeader'
import { ToggleSwitch } from '../../shared/components/ToggleSwitch'
import { Badge } from '../../../landing/components/Badge'
import { Button } from '../../../landing/components/Button'
import { LuBookOpen, LuFileDown, LuRotateCcw } from 'react-icons/lu'
import { FaJira } from 'react-icons/fa'
import { FiFileText } from 'react-icons/fi'
import { RiFileExcel2Line } from 'react-icons/ri'
import { useState } from 'react'
import { VscAzure } from 'react-icons/vsc'

type RecentActivityRow = {
    id: string
    format: 'Excel' | 'PDF' | 'Jira'
    context: string
    requestedBy: string
    date: string
    status: 'Completed' | 'Failed'
    action: 'Download Again' | 'Retry'
}

const activity: RecentActivityRow[] = [
    {
        id: '1',
        format: 'Excel',
        context: 'Full Suite',
        requestedBy: 'Alex Designer',
        date: 'Oct 24, 2023, 10:42 AM',
        status: 'Completed',
        action: 'Download Again',
    },
    {
        id: '2',
        format: 'PDF',
        context: 'Executive Summary',
        requestedBy: 'Sarah Lead',
        date: 'Oct 23, 2023, 04:15 PM',
        status: 'Completed',
        action: 'Download Again',
    },
    {
        id: '3',
        format: 'Jira',
        context: 'Sync Batch #402',
        requestedBy: 'System Automation',
        date: 'Oct 23, 2023, 09:00 AM',
        status: 'Failed',
        action: 'Retry',
    },
]

function FormatIcon({ format }: { format: RecentActivityRow['format'] }) {
    if (format === 'Excel') {
        return (
            <RiFileExcel2Line
                size={16}
                className="text-emerald-400"
                aria-hidden="true"
            />
        )
    }
    if (format === 'PDF') {
        return (
            <FiFileText size={16} className="text-red-400" aria-hidden="true" />
        )
    }
    return <FaJira size={16} className="text-blue-400" aria-hidden="true" />
}

export function ExportPage() {
    const [jiraConnected, setJiraConnected] = useState(true)

    return (
        <div className="flex flex-col gap-8">
            <PageHeader
                title="Export & Integrations"
                subtitle="Manage data exports and third-party tool connections"
                right={
                    <>
                        <Button
                            variant="secondary"
                            size="sm"
                            leftIcon={<LuBookOpen size={16} />}
                        >
                            Documentation
                        </Button>
                        <IconButton
                            icon={<LuFileDown size={16} />}
                            aria-label="Download"
                        />
                    </>
                }
            />

            <section className="flex flex-col gap-4">
                <h2 className="text-sm font-semibold text-(--landing-text)">
                    Export Data
                </h2>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <AppCard className="flex flex-col justify-between gap-6">
                        <div>
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[12px] bg-emerald-500/10 text-emerald-400">
                                <RiFileExcel2Line
                                    size={18}
                                    aria-hidden="true"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-(--landing-text)">
                                Export to Excel
                            </h3>
                            <p className="mt-2 text-xs text-(--landing-muted)">
                                Download full test case repository including
                                metadata, steps, expected results, and pass/fail
                                history logs.
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="text-emerald-300"
                            >
                                Generate XLSX
                            </Button>
                        </div>
                    </AppCard>

                    <AppCard className="flex flex-col justify-between gap-6">
                        <div>
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[12px] bg-red-500/10 text-red-400">
                                <FiFileText size={18} aria-hidden="true" />
                            </div>
                            <h3 className="text-sm font-semibold text-(--landing-text)">
                                Export to PDF
                            </h3>
                            <p className="mt-2 text-xs text-(--landing-muted)">
                                Generate a read-only executive summary report
                                suitable for stakeholders, with charts and key
                                insights included.
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="text-red-300"
                            >
                                Generate PDF
                            </Button>
                        </div>
                    </AppCard>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-sm font-semibold text-(--landing-text)">
                    Third-Party Integrations
                </h2>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <AppCard className="flex flex-col justify-between gap-8">
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex min-w-0 flex-col gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-(--landing-border) bg-white text-blue-600">
                                    <FaJira size={20} aria-hidden="true" />
                                </div>

                                <div className="min-w-0">
                                    <div className="text-sm font-semibold text-(--landing-text)">
                                        Atlassian Jira
                                    </div>
                                    <p className="mt-2 text-xs leading-relaxed text-(--landing-muted)">
                                        Sync generated test cases directly to
                                        Jira projects as tickets. Supports
                                        custom fields mapping.
                                    </p>
                                </div>
                            </div>

                            <Badge className="border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-300 [&>span]:hidden">
                                Connected
                            </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                className="text-xs text-(--landing-subtle) underline-offset-4 hover:text-(--landing-text) hover:underline"
                            >
                                Configure Settings
                            </button>
                            <ToggleSwitch
                                checked={jiraConnected}
                                onChange={setJiraConnected}
                            />
                        </div>
                    </AppCard>

                    <AppCard className="flex flex-col justify-between gap-8">
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex min-w-0 flex-col gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-(--landing-border) bg-white">
                                    <span
                                        className="text-sm font-bold text-blue-600"
                                        aria-hidden="true"
                                    >
                                        <VscAzure size={20} />
                                    </span>
                                </div>

                                <div className="min-w-0">
                                    <div className="text-sm font-semibold text-(--landing-text)">
                                        Azure DevOps
                                    </div>
                                    <p className="mt-2 text-xs leading-relaxed text-(--landing-muted)">
                                        Push test plans to Azure Boards and link
                                        with work items. Enable bi-directional
                                        status syncing.
                                    </p>
                                </div>
                            </div>

                            <Badge className="min-w-fit border-(--landing-border) bg-(--landing-background)/20 px-3 py-1 text-[11px] font-semibold text-(--landing-subtle) [&>span]:hidden">
                                Not Connected
                            </Badge>
                        </div>

                        <div className="flex justify-end">
                            <Button size="sm">Connect Account</Button>
                        </div>
                    </AppCard>
                </div>
            </section>

            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-(--landing-text)">
                        Recent Activity
                    </h2>
                    <button
                        type="button"
                        className="text-xs text-(--landing-subtle) hover:text-(--landing-text)"
                    >
                        Clear History
                    </button>
                </div>

                <DataTable
                    columns={[
                        {
                            key: 'format',
                            header: 'Format / Context',
                            cell: (row) => (
                                <div className="flex items-center gap-3 text-(--landing-text)">
                                    <FormatIcon format={row.format} />
                                    <span className="text-sm">
                                        {row.format} / {row.context}
                                    </span>
                                </div>
                            ),
                        },
                        {
                            key: 'requestedBy',
                            header: 'Requested By',
                            cell: (row) => row.requestedBy,
                        },
                        {
                            key: 'date',
                            header: 'Date',
                            cell: (row) => row.date,
                        },
                        {
                            key: 'status',
                            header: 'Status',
                            cell: (row) => (
                                <AppBadge
                                    variant={
                                        row.status === 'Completed'
                                            ? 'success'
                                            : 'danger'
                                    }
                                >
                                    {row.status}
                                </AppBadge>
                            ),
                        },
                        {
                            key: 'action',
                            header: 'Action',
                            className: 'text-right',
                            cell: (row) => (
                                <div className="flex items-center justify-end gap-3">
                                    {row.action === 'Retry' ? (
                                        <IconButton
                                            icon={<LuRotateCcw size={16} />}
                                            aria-label="Retry"
                                        />
                                    ) : null}
                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-(--landing-primary) hover:underline"
                                    >
                                        {row.action}
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                    rows={activity}
                    rowKey={(row) => row.id}
                />
            </section>
        </div>
    )
}
