import React from 'react'
import { Header } from '../Header/Header'
import { Button } from '../Button/Button'
import { IconChevronRight } from '../../src/icons/index'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProgressSegment {
  label: string
  fillPercent: number // 0–100
}

export interface FormInterstitialProps {
  // Header
  showHeader?: boolean
  headerTitle?: string
  showBack?: boolean
  showClose?: boolean
  onBack?: () => void
  onClose?: () => void

  // Progress bar
  showProgress?: boolean
  segments?: ProgressSegment[]

  // Content
  title: string
  description: string
  illustration?: React.ReactNode

  // Footer — primary always shown
  primaryLabel?: string
  primaryVariant?: 'primary' | 'accent'
  onPrimary?: () => void
  showPrimaryIcon?: boolean

  // Footer — secondary optional
  showSecondary?: boolean
  secondaryLabel?: string
  secondaryVariant?: 'subtle' | 'secondary'
  onSecondary?: () => void

  className?: string
}

// ---------------------------------------------------------------------------
// Illustration placeholder
// ---------------------------------------------------------------------------

const IllustrationPlaceholder = () => (
  <div className="w-full max-w-[327px] aspect-square rounded-[12px] bg-[rgba(0,57,57,0.1)]" />
)

// ---------------------------------------------------------------------------
// FormInterstitial
// ---------------------------------------------------------------------------

export const FormInterstitial: React.FC<FormInterstitialProps> = ({
  showHeader = true,
  headerTitle,
  showBack = false,
  showClose = false,
  onBack,
  onClose,
  showProgress = true,
  segments = [],
  title,
  description,
  illustration,
  primaryLabel = 'Continue',
  primaryVariant = 'primary',
  onPrimary,
  showPrimaryIcon = true,
  showSecondary = true,
  secondaryLabel = 'Save & exit',
  secondaryVariant = 'subtle',
  onSecondary,
  className = '',
}) => {
  const hasSegments = showProgress && segments.length > 0

  return (
    <div
      className={[
        'flex flex-col h-[100dvh] overflow-hidden bg-[var(--color-bg-primary)]',
        className,
      ].filter(Boolean).join(' ')}
    >

      {/* Header */}
      {showHeader && (
        <div className="shrink-0">
          <Header
            state="scrolled"
            showTitle={!!headerTitle}
            title={headerTitle}
            showBack={showBack}
            showClose={showClose}
            onBack={onBack}
            onClose={onClose}
          />
        </div>
      )}

      {/* Segmented progress bar */}
      {hasSegments && (
        <div className="shrink-0 flex items-start gap-[var(--space-xxs)] px-[var(--space-lg)] pt-[var(--space-xs)]">
          {segments.map((seg, i) => (
            <div key={i} className="flex-1 flex flex-col gap-[var(--space-xxs)]">
              <div className="relative h-[4px] rounded-full overflow-hidden bg-[var(--colour-grey-200)]">
                {/* inline style is required here — fillPercent is a runtime value */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[var(--colour-primary-700)] transition-all duration-300"
                  style={{ width: `${seg.fillPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-normal leading-[var(--line-height-4)] text-colour-primary-900">
                {seg.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Content area */}
      <div className="flex-1 overflow-y-auto flex flex-col pt-[40px] px-[var(--space-lg)] pb-[var(--space-lg)]">

        {/* Title + description */}
        <div className="flex flex-col gap-[var(--space-xxs)]">
          <h1 className="m-0 font-bold text-[var(--font-size-4xl)] leading-[44px] text-colour-primary-700">
            {title}
          </h1>
          <p className="m-0 font-normal text-[var(--font-size-sm)] leading-[var(--line-height-6)] text-colour-primary-900">
            {description}
          </p>
        </div>

        {/* Illustration slot — fills remaining space, centred */}
        <div className="flex-1 flex items-center justify-center overflow-hidden py-[var(--space-xxl)]">
          {illustration ?? <IllustrationPlaceholder />}
        </div>

      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-[var(--color-border-subtle)] px-[var(--space-lg)] py-[var(--space-sm)] flex flex-col gap-[var(--space-md)] bg-[var(--color-bg-primary)]">
        <Button
          label={primaryLabel}
          variant={primaryVariant}
          size="large"
          rightIcon={showPrimaryIcon ? <IconChevronRight /> : undefined}
          onClick={onPrimary}
          className="w-full"
        />
        {showSecondary && secondaryLabel && (
          <Button
            label={secondaryLabel}
            variant={secondaryVariant}
            size="large"
            onClick={onSecondary}
            className="w-full"
          />
        )}
      </div>

    </div>
  )
}
