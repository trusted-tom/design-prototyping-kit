import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SingleSelectorButton } from './SingleSelectorButton'

const meta: Meta<typeof SingleSelectorButton> = {
  title: 'Components/SingleSelectorButton',
  component: SingleSelectorButton,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SingleSelectorButton>

const CircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

// ---------------------------------------------------------------------------
// Compact
// ---------------------------------------------------------------------------

export const CompactUnselected: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-md)', maxWidth: '400px' }}>
      <SingleSelectorButton layout="compact" label="House" icon={<CircleIcon />} />
      <SingleSelectorButton layout="compact" label="Apartment" icon={<CircleIcon />} />
    </div>
  ),
}

export const CompactSelected: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-md)', maxWidth: '400px' }}>
      <SingleSelectorButton layout="compact" label="House" icon={<CircleIcon />} selected />
      <SingleSelectorButton layout="compact" label="Apartment" icon={<CircleIcon />} />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Detailed
// ---------------------------------------------------------------------------

export const DetailedUnselected: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', maxWidth: '480px' }}>
      <SingleSelectorButton
        layout="detailed"
        label="Yes"
        description="Step-free access and no internal stairs"
      />
      <SingleSelectorButton
        layout="detailed"
        label="No"
        description="Stairs or other barriers to access"
      />
    </div>
  ),
}

export const DetailedSelected: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', maxWidth: '480px' }}>
      <SingleSelectorButton
        layout="detailed"
        label="Yes"
        description="Step-free access and no internal stairs"
        selected
      />
      <SingleSelectorButton
        layout="detailed"
        label="No"
        description="Stairs or other barriers to access"
      />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    label: 'Option label',
    description: 'Supporting description text',
    layout: 'compact',
    selected: false,
  },
  argTypes: {
    layout:   { control: 'radio', options: ['compact', 'detailed'] },
    label:       { control: 'text' },
    description: { control: 'text' },
    selected:    { control: 'boolean' },
  },
}
