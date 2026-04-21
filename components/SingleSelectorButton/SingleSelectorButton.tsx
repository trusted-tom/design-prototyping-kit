import React from 'react'

export interface SingleSelectorButtonProps {
  label: string
  description?: string
  icon?: React.ReactNode
  selected?: boolean
  onClick?: () => void
  layout?: 'compact' | 'detailed'
  className?: string
}

export const SingleSelectorButton: React.FC<SingleSelectorButtonProps> = ({
  label,
  description,
  icon,
  selected = false,
  onClick,
  layout = 'compact',
  className = '',
}) => {
  const isCompact = layout === 'compact'

  const classes = [
    'flex items-center bg-[var(--color-bg-primary)]',
    'rounded-[var(--radius-lg)]',
    'cursor-pointer select-none',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)]',
    // layout-specific
    isCompact
      ? 'flex-row gap-[var(--space-md)] px-[var(--space-md)] py-[var(--space-sm)] min-w-[100px] flex-1'
      : 'flex-col items-start gap-[var(--space-xxs)] px-[var(--space-lg)] py-[var(--space-md)] w-full',
    // border — always 2px to prevent layout shift; colour signals state
    selected
      ? 'border-2 border-[var(--colour-primary-900)]'
      : 'border-2 border-[var(--color-border-subtle)]',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button type="button" onClick={onClick} className={classes}>
      {isCompact && icon && (
        <span className="shrink-0 w-[20px] h-[20px] text-colour-primary-900 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="text-[var(--font-size-base)] font-normal leading-[var(--line-height-7)] text-colour-primary-900">
        {label}
      </span>
      {!isCompact && description && (
        <span className="text-[var(--font-size-sm)] font-normal leading-[var(--line-height-6)] text-colour-grey-700">
          {description}
        </span>
      )}
    </button>
  )
}
