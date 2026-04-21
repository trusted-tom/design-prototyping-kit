import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { ActionRow } from '../../components/ActionRow/ActionRow'
import { ActionList } from '../../components/ActionList/ActionList'
import type { ActionListItem } from '../../components/ActionList/ActionList'
import { Header } from '../../components/Header/Header'

// ---------------------------------------------------------------------------
// State preview — renders a static button-look div for hover/focus/pressed
// states that can't be shown interactively in a flat grid.
// ---------------------------------------------------------------------------

interface StatePreviewProps {
  bg: string
  text: string
  border: string
  borderWidth?: string
  ring?: boolean
  filter?: string
  label: string
}

const StatePreview: React.FC<StatePreviewProps> = ({ bg, text, border, borderWidth = '1px', ring, filter, label }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-family-sans)',
      fontWeight: 600,
      fontSize: 'var(--font-size-base)',
      lineHeight: 'var(--line-height-7)',
      padding: '10px var(--space-md)',
      borderRadius: 'var(--radius-lg)',
      border: `${borderWidth} solid ${border}`,
      backgroundColor: bg,
      color: text,
      filter: filter,
      boxShadow: ring ? '0 0 0 3px var(--color-border-focus)' : undefined,
      cursor: 'default',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </div>
)

// ---------------------------------------------------------------------------
// State data — mapped to token CSS variable names, no raw hex
// ---------------------------------------------------------------------------

type StateData = {
  bg: string
  text: string
  border: string
  borderWidth?: string
  ring?: boolean
  filter?: string
}

const states = ['default', 'hover', 'focus', 'pressed', 'disabled'] as const

const variantData: Record<string, Record<typeof states[number], StateData>> = {
  accent: {
    default:  { bg: 'var(--colour-accent-500)',  text: 'var(--colour-base-white)',   border: 'transparent' },
    hover:    { bg: 'var(--colour-accent-700)',  text: 'var(--colour-base-white)',   border: 'transparent' },
    focus:    { bg: 'var(--colour-accent-700)',  text: 'var(--colour-base-white)',   border: 'transparent', ring: true },
    pressed:  { bg: 'var(--colour-accent-700)',  text: 'var(--colour-base-white)',   border: 'transparent' },
    disabled: { bg: 'var(--colour-grey-200)',    text: 'var(--colour-grey-500)',     border: 'transparent' },
  },
  primary: {
    default:  { bg: 'var(--colour-primary-900)', text: 'var(--colour-base-white)',   border: 'transparent' },
    hover:    { bg: 'var(--colour-primary-950)', text: 'var(--colour-base-white)',   border: 'transparent' },
    focus:    { bg: 'var(--colour-primary-950)', text: 'var(--colour-base-white)',   border: 'transparent', ring: true },
    pressed:  { bg: 'var(--colour-primary-950)', text: 'var(--colour-base-white)',   border: 'transparent' },
    disabled: { bg: 'var(--colour-grey-200)',    text: 'var(--colour-grey-500)',     border: 'transparent' },
  },
  secondary: {
    default:  { bg: 'transparent',               text: 'var(--colour-primary-900)', border: 'var(--colour-primary-900)', borderWidth: '2px' },
    hover:    { bg: 'var(--colour-grey-50)',      text: 'var(--colour-primary-900)', border: 'var(--colour-primary-900)', borderWidth: '2px' },
    focus:    { bg: 'var(--colour-base-white)',   text: 'var(--colour-primary-900)', border: 'var(--colour-primary-900)', borderWidth: '2px', ring: true },
    pressed:  { bg: 'var(--colour-base-white)',   text: 'var(--colour-primary-900)', border: 'var(--colour-primary-900)', borderWidth: '2px' },
    disabled: { bg: 'var(--colour-grey-200)',     text: 'var(--colour-grey-500)',    border: 'var(--colour-grey-200)',    borderWidth: '2px' },
  },
  subtle: {
    default:  { bg: 'var(--colour-base-white)',  text: 'var(--colour-primary-900)', border: 'var(--colour-grey-200)' },
    hover:    { bg: 'var(--colour-grey-50)',     text: 'var(--colour-primary-900)', border: 'var(--colour-grey-200)' },
    focus:    { bg: 'var(--colour-grey-50)',     text: 'var(--colour-primary-900)', border: 'var(--colour-grey-200)', ring: true },
    pressed:  { bg: 'var(--colour-grey-50)',     text: 'var(--colour-primary-900)', border: 'var(--colour-grey-200)' },
    disabled: { bg: 'var(--colour-grey-200)',    text: 'var(--colour-grey-500)',    border: 'var(--colour-grey-200)' },
  },
  inverted: {
    default:  { bg: 'var(--colour-highlight-500)', text: 'var(--colour-primary-900)', border: 'transparent' },
    hover:    { bg: 'var(--colour-highlight-600)', text: 'var(--colour-primary-900)', border: 'transparent' },
    focus:    { bg: 'var(--colour-highlight-600)', text: 'var(--colour-primary-900)', border: 'transparent', ring: true },
    pressed:  { bg: 'var(--colour-highlight-600)', text: 'var(--colour-primary-900)', border: 'transparent' },
    disabled: { bg: 'var(--colour-grey-200)',      text: 'var(--colour-grey-500)',    border: 'transparent' },
  },
  'inverted-secondary': {
    default:  { bg: 'transparent',               text: 'var(--colour-base-white)', border: 'var(--colour-highlight-500)' },
    hover:    { bg: 'var(--colour-primary-950)', text: 'var(--colour-base-white)', border: 'var(--colour-highlight-500)' },
    focus:    { bg: 'var(--colour-base-white)',  text: 'var(--colour-base-white)', border: 'var(--colour-highlight-500)', ring: true },
    pressed:  { bg: 'var(--colour-base-white)',  text: 'var(--colour-base-white)', border: 'var(--colour-highlight-500)' },
    disabled: { bg: 'transparent',               text: 'var(--colour-grey-500)',   border: 'var(--colour-grey-200)' },
  },
  error: {
    default:  { bg: 'var(--colour-error-700)', text: 'var(--colour-base-white)', border: 'transparent' },
    hover:    { bg: 'var(--colour-error-700)', text: 'var(--colour-base-white)', border: 'transparent', filter: 'brightness(0.9)' },
    focus:    { bg: 'var(--colour-error-700)', text: 'var(--colour-base-white)', border: 'transparent', ring: true },
    pressed:  { bg: 'var(--colour-error-700)', text: 'var(--colour-base-white)', border: 'transparent' },
    disabled: { bg: 'var(--colour-grey-200)',  text: 'var(--colour-grey-500)',   border: 'transparent' },
  },
}

const darkBgVariants = new Set(['inverted', 'inverted-secondary'])
const allVariants = Object.keys(variantData)

const PlaceholderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const listItems: ActionListItem[] = [
  {
    id: '1',
    label: 'Booking request from Sarah & Tom',
    size: 'small',
    type: 'subtle',
    showTag: true,
    tagLabel: 'new',
  },
  {
    id: '2',
    label: 'Messages',
    size: 'small',
    type: 'subtle',
    counter: '8',
    leadingIcon: <PlaceholderIcon />,
  },
  {
    id: '3',
    label: 'Your next sit',
    description: 'The Miller family — London, UK',
    size: 'medium',
    type: 'default',
    leadingIcon: <PlaceholderIcon />,
  },
  {
    id: '4',
    label: 'Profile completeness',
    description: 'Add a photo and bio to attract more owners',
    size: 'medium',
    type: 'default',
    counter: '60%',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export const ComponentReference: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-[var(--space-xxl)]">
      <div className="max-w-[1200px] mx-auto">

        <div className="mb-[var(--space-xl)]">
          <Link
            to="/"
            className="text-colour-grey-700 hover:text-colour-primary-700 mb-[var(--space-md)] inline-block"
            style={{ fontSize: 'var(--font-size-sm)', textDecoration: 'none' }}
          >
            ← Back to kit
          </Link>
          <h1 className="text-[var(--font-size-4xl)] font-bold text-[var(--color-text-heading)] mb-[var(--space-xs)]">
            Button — State Reference
          </h1>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
            All variants × all states. Hover / focus / pressed are shown as static colour previews.
            Two close-match tokens used: <strong>inverted hover</strong> uses{' '}
            <code>--colour-highlight-600</code> (#c2e24b) for Figma's #bcdb4a (Δ R6/G7);{' '}
            <strong>error bg</strong> uses <code>--colour-error-700</code> (#800014) for Figma's #800017 (Δ B3).
          </p>
        </div>

        {/* Column headers */}
        <div
          className="grid gap-[var(--space-sm)] mb-[var(--space-xs)] px-[var(--space-md)]"
          style={{ gridTemplateColumns: '160px repeat(5, 1fr)' }}
        >
          <div />
          {states.map(s => (
            <p
              key={s}
              className="text-[var(--font-size-xs)] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider"
            >
              {s}
            </p>
          ))}
        </div>

        {/* Variant rows */}
        <div className="flex flex-col gap-[var(--space-xs)]">
          {allVariants.map(variant => {
            const dark = darkBgVariants.has(variant)
            const rowBg = dark ? 'var(--colour-primary-900)' : 'transparent'

            return (
              <div
                key={variant}
                className="grid gap-[var(--space-sm)] items-center px-[var(--space-md)] py-[var(--space-sm)] rounded-[var(--radius-lg)]"
                style={{ gridTemplateColumns: '160px repeat(5, 1fr)', backgroundColor: rowBg }}
              >
                <p
                  className="text-[var(--font-size-sm)] font-medium"
                  style={{ color: dark ? 'var(--colour-grey-400)' : 'var(--color-text-secondary)' }}
                >
                  {variant}
                </p>

                {states.map(state => {
                  const s = variantData[variant][state]

                  if (state === 'default') {
                    return (
                      <div key={state}>
                        <Button variant={variant as never} label="Button" />
                      </div>
                    )
                  }

                  if (state === 'disabled') {
                    return (
                      <div key={state}>
                        <Button variant={variant as never} label="Button" disabled />
                      </div>
                    )
                  }

                  return (
                    <div key={state}>
                      <StatePreview
                        bg={s.bg}
                        text={s.text}
                        border={s.border}
                        borderWidth={s.borderWidth}
                        ring={s.ring}
                        filter={s.filter}
                        label="Button"
                      />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Interactive controls */}
        <div className="mt-[var(--space-xxl)]">
          <h2 className="text-[var(--font-size-2xl)] font-semibold text-[var(--color-text-heading)] mb-[var(--space-md)]">
            Live interaction test
          </h2>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
            Hover and focus these to verify the interactive states match the grid above.
          </p>
          <div className="flex flex-wrap gap-[var(--space-md)] items-center">
            {(['accent', 'primary', 'secondary', 'subtle', 'error'] as const).map(v => (
              <Button key={v} variant={v} label={v} />
            ))}
          </div>
          <div className="flex flex-wrap gap-[var(--space-md)] items-center mt-[var(--space-md)] p-[var(--space-md)] rounded-[var(--radius-lg)] bg-[var(--colour-primary-900)]">
            {(['inverted', 'inverted-secondary'] as const).map(v => (
              <Button key={v} variant={v} label={v} />
            ))}
          </div>
        </div>

        {/* ActionRow */}
        <div className="mt-[var(--space-xxl)]">
          <h2 className="text-[var(--font-size-2xl)] font-semibold text-[var(--color-text-heading)] mb-[var(--space-xs)]">
            ActionRow
          </h2>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
            Standalone rows — small/medium × default/subtle. Chevron appears on small + subtle only.
          </p>

          <div className="flex flex-col gap-[var(--space-lg)]">
            <div>
              <p className="text-[var(--font-size-xs)] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-[var(--space-xs)]">
                Small
              </p>
              <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border-subtle)] max-w-[480px]">
                <ActionRow label="Default — no chevron" size="small" type="default" leadingIcon={<PlaceholderIcon />} counter="4" />
                <ActionRow label="Subtle — shows chevron" size="small" type="subtle" showTag tagLabel="new" />
              </div>
            </div>

            <div>
              <p className="text-[var(--font-size-xs)] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-[var(--space-xs)]">
                Medium
              </p>
              <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border-subtle)] max-w-[480px]">
                <ActionRow label="Default — label only" size="medium" type="default" />
                <ActionRow label="With description and icon" description="The Miller family — London, UK" size="medium" type="default" leadingIcon={<PlaceholderIcon />} />
              </div>
            </div>
          </div>
        </div>

        {/* ActionList */}
        <div className="mt-[var(--space-xxl)]">
          <h2 className="text-[var(--font-size-2xl)] font-semibold text-[var(--color-text-heading)] mb-[var(--space-xs)]">
            ActionList
          </h2>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
            Mixed sizes — tag, counter, description, leading icon.
          </p>
          <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border-subtle)] max-w-[480px]">
            <ActionList items={listItems} />
          </div>
        </div>

        {/* Header */}
        <div className="mt-[var(--space-xxl)]">
          <h2 className="text-[var(--font-size-2xl)] font-semibold text-[var(--color-text-heading)] mb-[var(--space-xs)]">
            Header
          </h2>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
            Two appearances (default / inverse) × two states (default / scrolled). Right actions are hidden on inverse.
          </p>

          <div className="flex flex-col gap-[var(--space-md)] max-w-[640px]">
            <div>
              <p className="text-[var(--font-size-xs)] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-[var(--space-xs)]">
                Default appearance — default state — with title
              </p>
              <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border-subtle)]">
                <Header appearance="default" state="default" showTitle title="Complete your profile" showSubtext subtext="Step 2 of 4" showBack showClose showRightIconAction1 showRightIconAction2 />
              </div>
            </div>

            <div>
              <p className="text-[var(--font-size-xs)] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-[var(--space-xs)]">
                Default appearance — scrolled state — with title
              </p>
              <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border-subtle)]">
                <Header appearance="default" state="scrolled" showTitle title="Complete your profile" showBack showClose showRightIconAction1 showRightIconAction2 showRightTextAction rightActionCopy="Save" />
              </div>
            </div>

            <div>
              <p className="text-[var(--font-size-xs)] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-[var(--space-xs)]">
                Default appearance — default state — with logo
              </p>
              <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border-subtle)]">
                <Header appearance="default" state="default" showLogo showBack showClose showRightIconAction1 showRightIconAction2 />
              </div>
            </div>

            <div>
              <p className="text-[var(--font-size-xs)] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-[var(--space-xs)]">
                Inverse appearance — default state — no title
              </p>
              <div className="rounded-[var(--radius-lg)] overflow-hidden">
                <Header appearance="inverse" state="default" showBack showClose showRightIconAction1 showRightIconAction2 />
              </div>
            </div>
          </div>
        </div>

        {/* Screens */}
        <div className="mt-[var(--space-xxl)]">
          <h2 className="text-[var(--font-size-2xl)] font-semibold text-[var(--color-text-heading)] mb-[var(--space-xs)]">
            Screens
          </h2>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
            Full-screen prototypes.
          </p>
          <div className="flex flex-wrap gap-[var(--space-md)]">
            <Button
              label="Describe your home"
              variant="secondary"
              onClick={() => navigate('/screens/describe-home')}
            />
          </div>
        </div>

      </div>
    </div>
  )
}
