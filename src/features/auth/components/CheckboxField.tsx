import type { ReactNode } from 'react'

type CheckboxFieldProps = {
    id: string
    name: string
    children: ReactNode
    required?: boolean
}

export function CheckboxField({
    id,
    name,
    children,
    required,
}: CheckboxFieldProps) {
    return (
        <label
            htmlFor={id}
            className="inline-flex items-start gap-2 text-sm text-(--color-muted)"
        >
            <input
                id={id}
                name={name}
                type="checkbox"
                required={required}
                className="mt-0.5 size-4 rounded border-(--color-border) bg-(--color-input) accent-(--color-primary)"
            />
            <span>{children}</span>
        </label>
    )
}
