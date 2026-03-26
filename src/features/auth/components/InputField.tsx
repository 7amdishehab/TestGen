import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Input } from '../../../components/ui/Input'

type InputFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'size'> & {
    label: string
    id: string
    icon?: ReactNode
    hint?: string
    rightSlot?: ReactNode
    labelRight?: ReactNode
}

export function InputField(props: InputFieldProps) {
    return <Input {...props} />
}
