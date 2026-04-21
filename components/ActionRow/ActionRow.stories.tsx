import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ActionRow } from './ActionRow'

const meta: Meta<typeof ActionRow> = {
  title: 'Components/ActionRow',
  component: ActionRow,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ActionRow>

const PlaceholderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    label: 'Action label',
    size: 'medium',
    type: 'default',
  },
}

// ---------------------------------------------------------------------------
// Interactive — fully controllable via the Controls panel
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    label: 'Action label',
    description: 'Supporting description text',
    size: 'medium',
    type: 'default',
    counter: undefined,
    showTag: false,
    tagLabel: 'new',
  },
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium'] },
    type: { control: 'radio', options: ['default', 'subtle'] },
    label: { control: 'text' },
    description: { control: 'text' },
    counter: { control: 'text' },
    showTag: { control: 'boolean' },
    tagLabel: { control: 'text' },
  },
}

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Small: Story = {
  args: {
    label: 'Small action row',
    size: 'small',
    type: 'default',
  },
}

export const Medium: Story = {
  args: {
    label: 'Medium action row',
    description: 'Supporting description text',
    size: 'medium',
    type: 'default',
  },
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export const SubtleWithChevron: Story = {
  args: {
    label: 'Subtle row — shows chevron',
    size: 'small',
    type: 'subtle',
  },
}

// ---------------------------------------------------------------------------
// With slots
// ---------------------------------------------------------------------------

export const WithLeadingIcon: Story = {
  args: {
    label: 'Row with leading icon',
    description: 'Descriptive supporting text',
    size: 'medium',
    type: 'default',
    leadingIcon: <PlaceholderIcon />,
  },
}

export const WithCounter: Story = {
  args: {
    label: 'Messages',
    size: 'small',
    type: 'default',
    counter: '12',
  },
}

export const WithTag: Story = {
  args: {
    label: 'New booking request',
    size: 'small',
    type: 'subtle',
    showTag: true,
    tagLabel: 'new',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Your next sit',
    description: 'The Miller family — London, UK',
    size: 'medium',
    type: 'default',
    leadingIcon: <PlaceholderIcon />,
  },
}

// ---------------------------------------------------------------------------
// All combinations
// ---------------------------------------------------------------------------

export const AllCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '480px' }}>
      <div>
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Small / default
        </p>
        <div style={{ border: '1px solid var(--color-border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
          <ActionRow label="Plain row" size="small" type="default" />
          <ActionRow label="With counter" size="small" type="default" counter="8" />
          <ActionRow label="With leading icon" size="small" type="default" leadingIcon={<PlaceholderIcon />} />
        </div>
      </div>

      <div>
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Small / subtle (chevron)
        </p>
        <div style={{ border: '1px solid var(--color-border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
          <ActionRow label="Subtle row" size="small" type="subtle" />
          <ActionRow label="With tag" size="small" type="subtle" showTag tagLabel="new" />
          <ActionRow label="With counter" size="small" type="subtle" counter="3" />
        </div>
      </div>

      <div>
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Medium / default
        </p>
        <div style={{ border: '1px solid var(--color-border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
          <ActionRow label="Label only" size="medium" type="default" />
          <ActionRow label="With description" description="Supporting detail text" size="medium" type="default" />
          <ActionRow label="Icon + description" description="The Miller family — London, UK" size="medium" type="default" leadingIcon={<PlaceholderIcon />} />
        </div>
      </div>
    </div>
  ),
}
