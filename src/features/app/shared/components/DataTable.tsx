import type { ReactNode } from 'react'
import { cn } from '../../../../utils/cn'

export type DataTableColumn<Row> = {
    key: string
    header: ReactNode
    className?: string
    cell: (row: Row) => ReactNode
}

type DataTableProps<Row> = {
    columns: Array<DataTableColumn<Row>>
    rows: Row[]
    rowKey: (row: Row) => string
    className?: string
}

export function DataTable<Row>({
    columns,
    rows,
    rowKey,
    className,
}: DataTableProps<Row>) {
    return (
        <div
            className={cn(
                'overflow-hidden rounded-[16px] border border-(--landing-border) bg-(--landing-card)',
                className
            )}
        >
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-(--landing-border) text-[11px] tracking-wider text-(--landing-subtle) uppercase">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={cn(
                                        'px-6 py-4 font-semibold',
                                        col.className
                                    )}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr
                                key={rowKey(row)}
                                className="border-b border-(--landing-border) last:border-b-0"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={cn(
                                            'px-6 py-4 text-sm text-(--landing-muted)',
                                            col.className
                                        )}
                                    >
                                        {col.cell(row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
