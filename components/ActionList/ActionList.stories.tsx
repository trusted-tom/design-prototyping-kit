import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ActionList } from './ActionList'
import type { ActionListItem } from './ActionList'

const meta: Meta<typeof ActionList> = {
  title: 'Components/ActionList',
  component: ActionList,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ActionList>

const PlaceholderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

// ---------------------------------------------------------------------------
// Default — all small rows
// ---------------------------------------------------------------------------

const defaultItems: ActionListItem[] = [
  { id: '1', label: 'My profile', size: 'small', type: 'subtle' },
  { id: '2', label: 'My listings', size: 'small', type: 'subtle' },
  { id: '3', label: 'Payment methods', size: 'small', type: 'subtle' },
  { id: '4', label: 'Notifications', size: 'small', type: 'subtle' },
]

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', border: '1px solid var(--color-border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
      <ActionList items={defaultItems} />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// With mixed content — tags, counters, descriptions, icons
// ---------------------------------------------------------------------------

const mixedItems: ActionListItem[] = [
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

export const WithMixedContent: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', border: '1px solid var(--color-border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
      <ActionList items={mixedItems} />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Medium rows with descriptions
// ---------------------------------------------------------------------------

const mediumItems: ActionListItem[] = [
  {
    id: '1',
    label: 'Your next sit',
    description: 'The Miller family — London, UK',
    size: 'medium',
    type: 'default',
    leadingIcon: <PlaceholderIcon />,
  },
  {
    id: '2',
    label: 'Upcoming review',
    description: 'Left by Jordan — 3 days ago',
    size: 'medium',
    type: 'default',
    leadingIcon: <PlaceholderIcon />,
  },
  {
    id: '3',
    label: 'Profile completeness',
    description: 'Add a photo and bio to attract more owners',
    size: 'medium',
    type: 'default',
    counter: '60%',
  },
]

export const MediumWithDescriptions: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', border: '1px solid var(--color-border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
      <ActionList items={mediumItems} />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Disabled / no onClick — visual reference
// ---------------------------------------------------------------------------

const noClickItems: ActionListItem[] = [
  { id: '1', label: 'Non-interactive row A', size: 'small' },
  { id: '2', label: 'Non-interactive row B', size: 'small' },
  { id: '3', label: 'Non-interactive row C', size: 'small' },
]

export const NoOnClick: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', border: '1px solid var(--color-border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
      <ActionList items={noClickItems} />
    </div>
  ),
}
