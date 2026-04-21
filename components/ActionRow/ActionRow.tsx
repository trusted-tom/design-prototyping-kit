import React from 'react'
import { Tag } from '../Tag/Tag'
import { IconChevronRight } from '../../src/icons/index'

export interface ActionRowProps {
  label: string
  description?: string
  size?: 'small' | 'medium'
  type?: 'default' | 'subtle'
  leadingIcon?: React.ReactNode
  counter?: string
  showTag?: boolean
  tagLabel?: string
  onClick?: () => void
  className?: string
}

export const ActionRow: React.FC<ActionRowProps> = ({
  label,
  description,
  size = 'medium',
  type = 'default',
  leadingIcon,
  counter,
  showTag = false,
  tagLabel = 'new',
  onClick,
  className = '',
}) => {
  const isSmall = size === 'small'
  const showChevron = type === 'subtle' && isSmall

  const classes = [
    'flex items-center w-full text-left',
    'px-[var(--space-lg)] gap-[var(--space-md)]',
    isSmall ? 'py-[var(--space-md)]' : 'py-[var(--space-md)] min-h-[84px]',
    'border-t border-[var(--color-border-subtle)]',
    'first:border-t-0',
    'bg-transparent',
    'cursor-pointer select-none',
    'transition-colors duration-150',
    'hover:bg-[var(--color-interactive-subtle-hover)]',
    'focus-visible:outline-none',
    'focus-visible:ring-[3px]',
    'focus-visible:ring-inset',
    'focus-visible:ring-[var(--color-border-focus)]',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button type="button" onClick={onClick} className={classes}>
      {leadingIcon && (
        <span className="shrink-0 w-[20px] h-[20px] text-colour-primary-900 flex items-center justify-center">
          {leadingIcon}
        </span>
      )}

      <span className="flex-1 flex flex-col items-start min-w-0">
        <span
          className={[
            'truncate w-full text-colour-primary-900',
            isSmall
              ? 'text-[var(--font-size-sm)] font-normal leading-[var(--line-height-6)]'
              : 'text-[var(--font-size-base)] font-semibold leading-[var(--line-height-7)]',
          ].join(' ')}
        >
          {label}
        </span>
        {!isSmall && description && (
          <span className="truncate w-full text-[var(--font-size-sm)] font-normal leading-[var(--line-height-6)] text-colour-grey-700">
            {description}
          </span>
        )}
      </span>

      {counter && (
        <span className="shrink-0 text-[var(--font-size-sm)] leading-[var(--line-height-6)] text-colour-grey-700">
          {counter}
        </span>
      )}

      {showTag && (
        <Tag label={tagLabel} />
      )}

      {showChevron && (
        <span className="shrink-0 text-colour-primary-900">
          <IconChevronRight />
        </span>
      )}
    </button>
  )
}
