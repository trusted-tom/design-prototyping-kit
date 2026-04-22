import React from 'react'

interface SitSummaryCardProps {
  sitterName: string
  startDate: string
  endDate: string
  petNames: string[]
}

export const SitSummaryCard: React.FC<SitSummaryCardProps> = ({
  sitterName,
  startDate,
  endDate,
  petNames,
}) => (
  <div className="bg-[var(--colour-shade-100)] rounded-[var(--radius-lg)] p-[var(--space-md)] flex flex-col gap-[var(--space-xs)]">
    <div className="flex flex-col gap-[var(--space-xxs)]">
      <span className="text-[var(--font-size-xs)] font-normal leading-[var(--line-height-5)] text-colour-grey-700 uppercase tracking-wide">
        Sitter
      </span>
      <span className="text-[var(--font-size-base)] font-semibold leading-[var(--line-height-7)] text-colour-primary-900">
        {sitterName}
      </span>
    </div>
    <div className="h-px bg-[var(--colour-grey-200)]" />
    <div className="flex flex-col gap-[var(--space-xxs)]">
      <span className="text-[var(--font-size-xs)] font-normal leading-[var(--line-height-5)] text-colour-grey-700 uppercase tracking-wide">
        Dates
      </span>
      <span className="text-[var(--font-size-sm)] font-normal leading-[var(--line-height-6)] text-colour-primary-900">
        {startDate} – {endDate}
      </span>
    </div>
    <div className="h-px bg-[var(--colour-grey-200)]" />
    <div className="flex flex-col gap-[var(--space-xxs)]">
      <span className="text-[var(--font-size-xs)] font-normal leading-[var(--line-height-5)] text-colour-grey-700 uppercase tracking-wide">
        Pets
      </span>
      <span className="text-[var(--font-size-sm)] font-normal leading-[var(--line-height-6)] text-colour-primary-900">
        {petNames.join(' & ')}
      </span>
    </div>
  </div>
)
