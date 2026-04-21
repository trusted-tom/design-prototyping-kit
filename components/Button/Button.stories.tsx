import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import type { ButtonProps } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Button>

const CircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    label: 'Button',
    variant: 'accent',
    size: 'standard',
  },
}

// ---------------------------------------------------------------------------
// Interactive — fully controllable via the Controls panel
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'standard',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['accent', 'primary', 'secondary', 'subtle', 'inverted', 'inverted-secondary', 'error'],
    },
    size: {
      control: 'radio',
      options: ['small', 'standard', 'large'],
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

// ---------------------------------------------------------------------------
// All variants
// ---------------------------------------------------------------------------

type Variant = NonNullable<ButtonProps['variant']>

const allVariants: Variant[] = [
  'accent', 'primary', 'secondary', 'subtle', 'inverted', 'inverted-secondary', 'error',
]

const isInverted = (v: Variant) => v === 'inverted' || v === 'inverted-secondary'

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      {allVariants.map(variant => (
        <div
          key={variant}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px 16px',
            borderRadius: '10px',
            backgroundColor: isInverted(variant) ? 'var(--color-bg-brand)' : 'transparent',
          }}
        >
          <span style={{
            width: '160px',
            fontSize: 'var(--font-size-sm)',
            color: isInverted(variant) ? 'var(--color-text-on-dark)' : 'var(--color-text-secondary)',
            fontFamily: 'var(--font-family-sans)',
          }}>
            {variant}
          </span>
          <Button variant={variant} label="Button" />
        </div>
      ))}
    </div>
  ),
}

// ---------------------------------------------------------------------------
// All sizes
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="accent" size="small" label="Small" />
      <Button variant="accent" size="standard" label="Standard" />
      <Button variant="accent" size="large" label="Large" />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// With icons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary" label="Left icon" leftIcon={<CircleIcon />} />
      <Button variant="primary" label="Right icon" rightIcon={<CircleIcon />} />
      <Button variant="primary" label="Both icons" leftIcon={<CircleIcon />} rightIcon={<CircleIcon />} />
      <Button variant="secondary" label="Left icon" leftIcon={<CircleIcon />} />
      <Button variant="accent" label="Left icon" leftIcon={<CircleIcon />} />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      {allVariants.map(variant => (
        <div
          key={variant}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px 16px',
            borderRadius: '10px',
            backgroundColor: isInverted(variant) ? 'var(--color-bg-brand)' : 'transparent',
          }}
        >
          <span style={{
            width: '160px',
            fontSize: 'var(--font-size-sm)',
            color: isInverted(variant) ? 'var(--color-text-on-dark)' : 'var(--color-text-secondary)',
            fontFamily: 'var(--font-family-sans)',
          }}>
            {variant}
          </span>
          <Button variant={variant} label="Disabled" disabled />
        </div>
      ))}
    </div>
  ),
}
