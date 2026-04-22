import type { Meta, StoryObj } from '@storybook/react'
import { Banner } from './Banner'
import type { BannerAppearance } from './Banner'

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Banner>

// ---------------------------------------------------------------------------
// Default states (no-link)
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    appearance: 'default',
    type: 'no-link',
    size: 'mobile',
  },
}

export const Error: Story = {
  args: {
    appearance: 'error',
    type: 'no-link',
    size: 'mobile',
  },
}

export const Inverted: Story = {
  args: {
    appearance: 'inverted',
    type: 'no-link',
    size: 'mobile',
  },
  decorators: [Story => (
    <div style={{ padding: '16px', background: 'var(--colour-primary-950)', borderRadius: '10px' }}>
      <Story />
    </div>
  )],
}

// ---------------------------------------------------------------------------
// Action link — all appearances
// ---------------------------------------------------------------------------

const appearances: BannerAppearance[] = ['default', 'error', 'inverted']

export const WithActionLink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {appearances.map(appearance => (
        <div
          key={appearance}
          style={{
            padding: appearance === 'inverted' ? '16px' : undefined,
            background: appearance === 'inverted' ? 'var(--colour-primary-950)' : undefined,
            borderRadius: '10px',
          }}
        >
          <Banner appearance={appearance} type="action-link" size="mobile" />
        </div>
      ))}
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Call to action — all appearances
// ---------------------------------------------------------------------------

export const WithCallToAction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {appearances.map(appearance => (
        <div
          key={appearance}
          style={{
            padding: appearance === 'inverted' ? '16px' : undefined,
            background: appearance === 'inverted' ? 'var(--colour-primary-950)' : undefined,
            borderRadius: '10px',
          }}
        >
          <Banner appearance={appearance} type="call-to-action" size="mobile" />
        </div>
      ))}
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Desktop size
// ---------------------------------------------------------------------------

export const Desktop: Story = {
  args: {
    appearance: 'default',
    type: 'call-to-action',
    size: 'desktop',
  },
  decorators: [Story => (
    <div style={{ width: '640px' }}>
      <Story />
    </div>
  )],
}

export const DesktopAllAppearances: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '640px' }}>
      {appearances.map(appearance => (
        <div
          key={appearance}
          style={{
            padding: appearance === 'inverted' ? '16px' : undefined,
            background: appearance === 'inverted' ? 'var(--colour-primary-950)' : undefined,
            borderRadius: '10px',
          }}
        >
          <Banner appearance={appearance} type="call-to-action" size="desktop" />
        </div>
      ))}
    </div>
  ),
}

// ---------------------------------------------------------------------------
// With illustration
// ---------------------------------------------------------------------------

export const WithIllustration: Story = {
  args: {
    appearance: 'default',
    type: 'no-link',
    size: 'mobile',
    showIllustration: true,
  },
}

export const WithIllustrationDesktop: Story = {
  args: {
    appearance: 'default',
    type: 'call-to-action',
    size: 'desktop',
    showIllustration: true,
  },
  decorators: [Story => (
    <div style={{ width: '640px' }}>
      <Story />
    </div>
  )],
}

export const WithIllustrationInverted: Story = {
  args: {
    appearance: 'inverted',
    type: 'action-link',
    size: 'mobile',
    showIllustration: true,
  },
  decorators: [Story => (
    <div style={{ padding: '16px', background: 'var(--colour-primary-950)', borderRadius: '10px' }}>
      <Story />
    </div>
  )],
}

// ---------------------------------------------------------------------------
// No title
// ---------------------------------------------------------------------------

export const NoTitle: Story = {
  args: {
    appearance: 'default',
    type: 'no-link',
    size: 'mobile',
    showTitle: false,
  },
}

// ---------------------------------------------------------------------------
// No icon
// ---------------------------------------------------------------------------

export const NoIcon: Story = {
  args: {
    appearance: 'default',
    type: 'action-link',
    size: 'mobile',
    showIcon: false,
  },
}

// ---------------------------------------------------------------------------
// Interactive — all props via Controls panel
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    appearance: 'default',
    type: 'no-link',
    size: 'mobile',
    title: 'Title',
    description: 'Add your text here...',
    linkLabel: 'Link',
    showIcon: true,
    showTitle: true,
    showIllustration: false,
  },
  argTypes: {
    appearance: { control: 'select', options: ['default', 'error', 'inverted'] },
    type: { control: 'select', options: ['no-link', 'action-link', 'call-to-action'] },
    size: { control: 'radio', options: ['mobile', 'desktop'] },
    title: { control: 'text' },
    description: { control: 'text' },
    linkLabel: { control: 'text' },
    showIcon: { control: 'boolean' },
    showTitle: { control: 'boolean' },
    showIllustration: { control: 'boolean' },
  },
  decorators: [
    (Story, context) => (
      <div
        style={{
          padding: '16px',
          background: context.args.appearance === 'inverted' ? 'var(--colour-primary-950)' : undefined,
          borderRadius: '10px',
          width: context.args.size === 'desktop' ? '640px' : '327px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}
