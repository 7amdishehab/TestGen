import { AppCard } from '../../shared/components/AppCard'
import { AppBadge } from '../../shared/components/AppBadge'
import { DataTable } from '../../shared/components/DataTable'
import { IconButton } from '../../shared/components/IconButton'
import { PageHeader } from '../../shared/components/PageHeader'
import { Button } from '../../../landing/components/Button'
import { LuBookOpen, LuFileDown, LuRotateCcw } from 'react-icons/lu'
import { FiFileText } from 'react-icons/fi'
import { RiFileExcel2Line } from 'react-icons/ri'

type RecentActivityRow = {
    id: string
    format: 'Excel' | 'PDF'
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
    return null
}

export function ExportPage() {
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
