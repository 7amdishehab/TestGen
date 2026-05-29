import { useState } from 'react'
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { InputField } from './InputField'

type PasswordFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> & {
    id: string
    name: string
    label: string
    labelRight?: ReactNode
}

export function PasswordField({
    id,
    name,
    label,
    placeholder,
    autoComplete,
    required,
    labelRight,
    ...props
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <InputField
            id={id}
            name={name}
            label={label}
            labelRight={labelRight}
            type={showPassword ? 'text' : 'password'}
            autoComplete={autoComplete}
            placeholder={placeholder}
            required={required}
            icon={<FiLock size={18} />}
            {...props}
            rightSlot={
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="inline-flex items-center justify-center rounded-md p-1 text-(--color-muted) hover:text-(--color-text)"
                    aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                    }
                >
                    {showPassword ? (
                        <FiEyeOff size={18} />
                    ) : (
                        <FiEye size={18} />
                    )}
                </button>
            }
        />
    )
}
