import React from 'react'
import { IconInfo, IconChevronRight } from '../../src/icons/index'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BannerAppearance = 'default' | 'error' | 'inverted'
export type BannerType = 'no-link' | 'action-link' | 'call-to-action'
export type BannerSize = 'mobile' | 'desktop'

export interface BannerProps {
  appearance?: BannerAppearance
  type?: BannerType
  size?: BannerSize
  title?: string
  description?: string
  linkLabel?: string
  onLinkClick?: () => void
  showIcon?: boolean
  showTitle?: boolean
  showIllustration?: boolean
  icon?: React.ReactNode
  className?: string
}

// ---------------------------------------------------------------------------
// Token maps
// ---------------------------------------------------------------------------

const BG: Record<BannerAppearance, string> = {
  default:  'bg-[var(--colour-shade-100)]',
  error:    'bg-[var(--colour-error-100)]',
  inverted: 'bg-[var(--colour-primary-900)]',
}

const TITLE_COLOR: Record<BannerAppearance, string> = {
  default:  'text-colour-primary-900',
  error:    'text-colour-error-700',
  inverted: 'text-colour-primary-100',
}

const DESC_COLOR: Record<BannerAppearance, string> = {
  default:  'text-colour-primary-900',
  error:    'text-colour-error-700',
  inverted: 'text-colour-white',
}

const LINK_COLOR: Record<BannerAppearance, string> = {
  default:  'text-colour-primary-900',
  error:    'text-colour-error-700',
  inverted: 'text-colour-highlight-500',
}

const ICON_COLOR: Record<BannerAppearance, string> = {
  default:  'text-colour-primary-900',
  error:    'text-colour-error-700',
  inverted: 'text-colour-white',
}

// ---------------------------------------------------------------------------
// Banner
// ---------------------------------------------------------------------------

export const Banner: React.FC<BannerProps> = ({
  appearance = 'default',
  type = 'no-link',
  size = 'mobile',
  title = 'Title',
  description = 'Add your text here...',
  linkLabel = 'Link',
  onLinkClick,
  showIcon = true,
  showTitle = true,
  showIllustration = false,
  icon,
  className = '',
}) => {
  const isDesktop = size === 'desktop'
  const hasLink = type !== 'no-link'

  const linkEl = (
    <button
      type="button"
      onClick={onLinkClick}
      className={[
        'flex items-center gap-[var(--space-xxs)] bg-transparent border-none cursor-pointer p-0',
        'font-[family-name:var(--font-family-sans)] font-semibold',
        isDesktop
          ? 'text-[var(--font-size-base)] leading-[var(--line-height-7)]'
          : 'text-[var(--font-size-sm)] leading-[var(--line-height-6)]',
        LINK_COLOR[appearance],
      ].join(' ')}
    >
      {linkLabel}
      <IconChevronRight />
    </button>
  )

  return (
    <div
      className={[
        'flex items-start gap-[var(--space-md)]',
        'py-[var(--space-md)] px-[var(--space-lg)]',
        'rounded-[var(--radius-lg)]',
        BG[appearance],
        className,
      ].join(' ')}
    >
      {/* Leading icon */}
      {showIcon && (
        <span
          className={[
            'shrink-0 w-5 h-5 flex items-center justify-center mt-[4px]',
            ICON_COLOR[appearance],
          ].join(' ')}
        >
          {icon ?? <IconInfo />}
        </span>
      )}

      {/* Main content */}
      <div
        className={[
          'flex-1 min-w-0',
          isDesktop && hasLink
            ? 'flex items-center gap-[var(--space-lg)]'
            : 'flex flex-col gap-[var(--space-xxs)]',
        ].join(' ')}
      >
        {/* Text block */}
        <div className="flex-1 min-w-0 flex flex-col gap-[var(--space-xxs)]">
          {showTitle && (
            <p
              className={[
                'm-0 font-semibold text-[var(--font-size-base)] leading-[var(--line-height-7)]',
                TITLE_COLOR[appearance],
              ].join(' ')}
            >
              {title}
            </p>
          )}
          <p
            className={[
              'm-0 font-normal text-[var(--font-size-sm)] leading-[var(--line-height-6)]',
              DESC_COLOR[appearance],
            ].join(' ')}
          >
            {description}
          </p>
          {/* Mobile / stacked link */}
          {hasLink && !isDesktop && linkEl}
        </div>

        {/* Desktop inline link */}
        {hasLink && isDesktop && (
          <span className="shrink-0">{linkEl}</span>
        )}
      </div>

      {/* Illustration placeholder */}
      {showIllustration && (
        <div
          className={[
            'shrink-0 rounded-[var(--radius-lg)] bg-[rgba(255,255,255,0.2)]',
            isDesktop ? 'w-[60px] h-[60px]' : 'w-[48px] h-[48px]',
          ].join(' ')}
        />
      )}
    </div>
  )
}
