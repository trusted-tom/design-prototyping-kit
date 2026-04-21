import React from 'react'

export interface ButtonProps {
  label?: string
  variant?: 'accent' | 'primary' | 'secondary' | 'subtle' | 'inverted' | 'inverted-secondary' | 'error'
  size?: 'small' | 'standard' | 'large'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const base = [
  'inline-flex items-center justify-center',
  'font-semibold',
  'leading-[var(--line-height-7)]',
  'rounded-[var(--radius-lg)]',
  'cursor-pointer select-none',
  'transition-colors duration-150',
  'focus-visible:outline-none',
  'focus-visible:ring-[3px]',
  'focus-visible:ring-[var(--color-border-focus)]',
  'disabled:cursor-not-allowed disabled:pointer-events-none',
].join(' ')

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  // 10px vertical padding has no exact token (between --space-xs 8px and --space-sm 12px) — raw fallback used
  small:    'px-[var(--space-sm)] py-[var(--space-xxs)] text-[var(--font-size-sm)] gap-[var(--space-xs)]',
  standard: 'px-[var(--space-md)] py-[10px] text-[var(--font-size-base)] gap-[var(--space-sm)]',
  large:    'px-[var(--space-lg)] py-[var(--space-sm)] text-[var(--font-size-lg)] gap-[var(--space-sm)]',
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  accent: [
    'border border-transparent',
    'bg-[var(--colour-accent-500)] text-colour-white',
    'hover:bg-[var(--colour-accent-700)]',
    'focus-visible:bg-[var(--colour-accent-700)]',
    'active:bg-[var(--colour-accent-700)]',
    'disabled:bg-[var(--colour-grey-200)] disabled:text-colour-grey-500',
  ].join(' '),

  primary: [
    'border border-transparent',
    'bg-[var(--colour-primary-900)] text-colour-white',
    'hover:bg-[var(--colour-primary-950)]',
    'focus-visible:bg-[var(--colour-primary-950)]',
    'active:bg-[var(--colour-primary-950)]',
    'disabled:bg-[var(--colour-grey-200)] disabled:text-colour-grey-500',
  ].join(' '),

  secondary: [
    'border-2 border-[var(--colour-primary-900)]',
    'bg-transparent text-colour-primary-900',
    'hover:bg-[var(--colour-grey-50)] hover:border-2',
    'focus-visible:bg-[var(--colour-base-white)]',
    'active:bg-[var(--colour-base-white)]',
    'disabled:bg-[var(--colour-grey-200)] disabled:text-colour-grey-500 disabled:border-2 disabled:border-[var(--colour-grey-200)]',
  ].join(' '),

  subtle: [
    'border border-[var(--colour-grey-200)]',
    'bg-[var(--colour-base-white)] text-colour-primary-900',
    'hover:bg-[var(--colour-grey-50)]',
    'focus-visible:bg-[var(--colour-grey-50)]',
    'active:bg-[var(--colour-grey-50)]',
    'disabled:bg-[var(--colour-grey-200)] disabled:text-colour-grey-500',
  ].join(' '),

  // Inverted uses Tennis Ball Green (highlight-500) as bg per Figma spec
  // hover/focus/pressed use highlight-600 (#c2e24b) — close match for Figma's #bcdb4a (Δ R6/G7/B1)
  inverted: [
    'border border-transparent',
    'bg-[var(--colour-highlight-500)] text-colour-primary-900',
    'hover:bg-[var(--colour-highlight-600)]',
    'focus-visible:bg-[var(--colour-highlight-600)]',
    'active:bg-[var(--colour-highlight-600)]',
    'disabled:bg-[var(--colour-grey-200)] disabled:text-colour-grey-500',
  ].join(' '),

  'inverted-secondary': [
    'border border-[var(--colour-highlight-500)]',
    'bg-transparent text-colour-white',
    'hover:bg-[var(--colour-primary-950)]',
    'focus-visible:bg-[var(--colour-base-white)]',
    'active:bg-[var(--colour-base-white)]',
    'disabled:bg-transparent disabled:text-colour-grey-500 disabled:border-[var(--colour-grey-200)]',
  ].join(' '),

  // error bg uses error-700 (#800014) — close match for Figma's #800017 (Δ B3)
  // hover uses brightness filter as Figma specifies same hex + "darken slightly"
  error: [
    'border border-transparent',
    'bg-[var(--colour-error-700)] text-colour-white',
    'hover:brightness-90',
    'focus-visible:bg-[var(--colour-error-700)]',
    'active:bg-[var(--colour-error-700)]',
    'disabled:bg-[var(--colour-grey-200)] disabled:text-colour-grey-500',
  ].join(' '),
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'standard',
  leftIcon,
  rightIcon,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const classes = [base, sizeClasses[size], variantClasses[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {leftIcon}
      {label}
      {rightIcon}
    </button>
  )
}
