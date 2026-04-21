import React from 'react'
import { Header } from '../Header/Header'
import { Button } from '../Button/Button'

export interface FormFlowProps {
  title?: string
  showTitle?: boolean
  showBack?: boolean
  showClose?: boolean
  onBack?: () => void
  onClose?: () => void
  showRightIconAction1?: boolean
  onRightAction1?: () => void
  children: React.ReactNode
  primaryLabel?: string
  primaryVariant?: 'accent' | 'primary'
  onPrimary?: () => void
  secondaryLabel?: string
  showSecondary?: boolean
  onSecondary?: () => void
  footerNote?: string
  className?: string
}

export const FormFlow: React.FC<FormFlowProps> = ({
  title,
  showTitle = false,
  showBack = false,
  showClose = false,
  onBack,
  onClose,
  showRightIconAction1 = false,
  onRightAction1,
  children,
  primaryLabel = 'Continue',
  primaryVariant = 'primary',
  onPrimary,
  secondaryLabel,
  showSecondary = false,
  onSecondary,
  footerNote,
  className = '',
}) => {
  return (
    <div className={['flex flex-col h-screen bg-[var(--color-bg-primary)]', className].filter(Boolean).join(' ')}>

      {/* Header zone — pinned to top */}
      <div className="shrink-0">
        <Header
          state="scrolled"
          showTitle={showTitle}
          title={title}
          showBack={showBack}
          showClose={showClose}
          onBack={onBack}
          onClose={onClose}
          showRightIconAction1={showRightIconAction1}
          onRightAction1={onRightAction1}
        />
      </div>

      {/* Content zone — scrolls independently */}
      <div className="flex-1 overflow-y-auto px-[var(--space-lg)] pt-[var(--space-xxl)] pb-[var(--space-lg)]">
        {children}
      </div>

      {/* Footer zone — sticky, never scrolls */}
      <div className="shrink-0 border-t border-[var(--color-border-subtle)] px-[var(--space-lg)] py-[var(--space-sm)] flex flex-col gap-[var(--space-md)] bg-[var(--color-bg-primary)]">
        <Button
          label={primaryLabel}
          variant={primaryVariant}
          size="large"
          onClick={onPrimary}
          className="w-full"
        />
        {showSecondary && secondaryLabel && (
          <Button
            label={secondaryLabel}
            variant="subtle"
            size="large"
            onClick={onSecondary}
            className="w-full"
          />
        )}
        {footerNote && (
          <p className="text-[var(--font-size-xs)] font-normal leading-[var(--line-height-5)] text-colour-grey-700 text-center">
            {footerNote}
          </p>
        )}
      </div>

    </div>
  )
}
