import type {
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type SharedProps = {
    variant?: ButtonVariant
    size?: ButtonSize
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    className?: string
    children: ReactNode
}

type ButtonAsButtonProps = SharedProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        as?: 'button'
    }

type ButtonAsLinkProps = SharedProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        as: 'a'
        href: string
    }

type ButtonAsRouterLinkProps = SharedProps & {
    as: 'link'
    to: string
}

type ButtonProps =
    | ButtonAsButtonProps
    | ButtonAsLinkProps
    | ButtonAsRouterLinkProps

const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--landing-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--landing-background)'

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-8 py-3.5 text-sm',
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-(--landing-primary) text-(--landing-background) hover:brightness-110',
    secondary:
        'border border-[#374151] bg-[#1C212B] text-(--landing-muted)  hover:text-(--landing-primary)',
    ghost: 'bg-transparent text-(--landing-text) hover:underline',
}

function Content({
    leftIcon,
    rightIcon,
    children,
}: {
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    children: ReactNode
}) {
    return (
        <>
            {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
            <span>{children}</span>
            {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
        </>
    )
}

export function Button(props: ButtonProps) {
    const variant = props.variant ?? 'primary'
    const size = props.size ?? 'md'

    const classes = cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        props.className
    )

    if (props.as === 'a') {
        const {
            as: _as,
            variant: _variant,
            size: _size,
            leftIcon,
            rightIcon,
            children,
            className: _className,
            ...rest
        } = props
        return (
            <a className={classes} {...rest}>
                <Content leftIcon={leftIcon} rightIcon={rightIcon}>
                    {children}
                </Content>
            </a>
        )
    }

    if (props.as === 'link') {
        const {
            as: _as,
            variant: _variant,
            size: _size,
            leftIcon,
            rightIcon,
            children,
            className: _className,
            to,
        } = props
        return (
            <Link className={classes} to={to}>
                <Content leftIcon={leftIcon} rightIcon={rightIcon}>
                    {children}
                </Content>
            </Link>
        )
    }

    const {
        as: _as,
        variant: _variant,
        size: _size,
        leftIcon,
        rightIcon,
        children,
        className: _className,
        ...rest
    } = props

    return (
        <button className={classes} type={rest.type ?? 'button'} {...rest}>
            <Content leftIcon={leftIcon} rightIcon={rightIcon}>
                {children}
            </Content>
        </button>
    )
}
