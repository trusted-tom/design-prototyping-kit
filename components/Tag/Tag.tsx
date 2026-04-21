import React from 'react'

export interface TagProps {
  label: string
  className?: string
}

export const Tag: React.FC<TagProps> = ({ label, className = '' }) => {
  return (
    <span
      className={[
        'inline-flex items-center',
        'px-[var(--space-xs)] py-[var(--space-xxs)]',
        'bg-[var(--colour-accent-500)] rounded-[var(--radius-md)]',
        'text-[var(--font-size-2xs)] font-semibold uppercase text-colour-white tracking-[0.3px]',
        className,
      ].filter(Boolean).join(' ')}
    >
      {label}
    </span>
  )
}
