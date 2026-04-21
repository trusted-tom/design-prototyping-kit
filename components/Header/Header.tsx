import React from 'react'
import { IconClose, IconChevronLeft, IconMore } from '../../src/icons/index'

export interface HeaderProps {
  appearance?: 'default' | 'inverse'
  state?: 'default' | 'scrolled'
  title?: string
  showTitle?: boolean
  subtext?: string
  showSubtext?: boolean
  showLogo?: boolean
  showBack?: boolean
  showClose?: boolean
  showRightIconAction1?: boolean
  showRightIconAction2?: boolean
  showRightTextAction?: boolean
  rightActionCopy?: string
  onBack?: () => void
  onClose?: () => void
  onRightAction1?: () => void
  onRightAction2?: () => void
  onRightTextAction?: () => void
  className?: string
}

// ---------------------------------------------------------------------------
// Internal icon button — 48×48 tap target, 20×20 icon, 10px radius
// ---------------------------------------------------------------------------

interface IconBtnProps {
  icon: React.ReactNode
  onClick?: () => void
  inverse?: boolean
  label: string
}

const IconBtn: React.FC<IconBtnProps> = ({ icon, onClick, inverse = false, label }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={[
      'flex items-center justify-center w-[48px] h-[48px]',
      'rounded-[var(--radius-lg)]',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)]',
      inverse
        ? 'text-colour-white hover:bg-[var(--colour-primary-950)]'
        : 'text-colour-primary-900 hover:bg-[var(--colour-grey-50)]',
    ].join(' ')}
  >
    <span className="w-[20px] h-[20px] flex items-center justify-center">
      {icon}
    </span>
  </button>
)

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export const Header: React.FC<HeaderProps> = ({
  appearance = 'default',
  state = 'default',
  title,
  showTitle = false,
  subtext,
  showSubtext = false,
  showLogo = false,
  showBack = false,
  showClose = false,
  showRightIconAction1 = false,
  showRightIconAction2 = false,
  showRightTextAction = false,
  rightActionCopy = 'Action',
  onBack,
  onClose,
  onRightAction1,
  onRightAction2,
  onRightTextAction,
  className = '',
}) => {
  const isInverse = appearance === 'inverse'
  const isScrolled = state === 'scrolled'
  const showRightZone = !isInverse && (showRightIconAction1 || showRightIconAction2 || showRightTextAction)

  const wrapperClasses = [
    'relative w-full h-[72px]',
    'border-b border-[var(--color-border-subtle)]',
    isInverse
      ? 'bg-[var(--colour-primary-900)]'
      : isScrolled
        ? 'bg-[var(--color-bg-primary)]'
        : 'bg-transparent',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClasses}>

      {/* Left zone — logo, back, or close */}
      <div className="absolute left-[10px] top-1/2 -translate-y-1/2 flex items-center">
        {showLogo && (
          <div className={[
            'w-[48px] h-[58px] flex items-center justify-center',
            isInverse ? 'text-colour-white' : 'text-colour-primary-900',
          ].join(' ')}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-label="Logo">
              <rect x="1.5" y="1.5" width="27" height="27" rx="7.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M15 8L21 12V22H9V12L15 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {showBack && (
          <IconBtn icon={<IconChevronLeft />} onClick={onBack} inverse={isInverse} label="Go back" />
        )}
        {showClose && (
          <IconBtn icon={<IconClose />} onClick={onClose} inverse={isInverse} label="Close" />
        )}
      </div>

      {/* Centre zone — absolutely centred across full width */}
      {(showTitle || showSubtext) && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center max-w-[calc(100%-160px)]">
          {showTitle && title && (
            <span className={[
              'truncate max-w-full text-[var(--font-size-base)] font-semibold leading-[var(--line-height-7)]',
              isInverse ? 'text-colour-white' : 'text-colour-primary-900',
            ].join(' ')}>
              {title}
            </span>
          )}
          {showSubtext && subtext && (
            <span className={[
              'truncate max-w-full text-[var(--font-size-3xs)] font-normal leading-[var(--line-height-4)]',
              isInverse ? 'text-colour-white' : 'text-colour-grey-700',
            ].join(' ')}>
              {subtext}
            </span>
          )}
        </div>
      )}

      {/* Right zone — hidden on inverse appearance */}
      {showRightZone && (
        <div className="absolute right-[10px] top-1/2 -translate-y-1/2 flex items-center">
          {showRightIconAction1 && (
            <IconBtn icon={<IconMore />} onClick={onRightAction1} label="More options" />
          )}
          {showRightIconAction2 && (
            <IconBtn icon={<IconMore />} onClick={onRightAction2} label="More options" />
          )}
          {showRightTextAction && (
            <button
              type="button"
              onClick={onRightTextAction}
              className={[
                'pr-[14px]',
                'text-[var(--font-size-base)] font-normal leading-[var(--line-height-7)]',
                'text-colour-grey-700 hover:text-colour-primary-900',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)]',
                'rounded-[var(--radius-sm)]',
              ].join(' ')}
            >
              {rightActionCopy}
            </button>
          )}
        </div>
      )}

    </div>
  )
}
