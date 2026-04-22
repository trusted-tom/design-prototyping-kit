import type { Meta, StoryObj } from '@storybook/react'
import { FormInterstitial } from './FormInterstitial'

const meta: Meta<typeof FormInterstitial> = {
  title: 'Components/FormInterstitial',
  component: FormInterstitial,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj<typeof FormInterstitial>

const defaultSegments = [
  { label: 'Home',   fillPercent: 25 },
  { label: 'Pets',   fillPercent: 0  },
  { label: 'About',  fillPercent: 0  },
  { label: 'Safety', fillPercent: 0  },
]

const SampleIllustration = () => (
  <div
    style={{
      width: '327px',
      height: '327px',
      borderRadius: '24px',
      backgroundColor: 'var(--colour-primary-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="64" height="64" rx="12" stroke="var(--colour-primary-900)" strokeWidth="2.5" />
      <path d="M24 40h32M40 24v32" stroke="var(--colour-primary-900)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </div>
)

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    showHeader: true,
    showBack: true,
    showProgress: true,
    segments: defaultSegments,
    title: 'Home and location',
    description: 'Help sitters picture daily life! Describe your home and neighborhood.',
    illustration: <SampleIllustration />,
    primaryLabel: 'Continue',
    primaryVariant: 'primary',
    showPrimaryIcon: true,
    showSecondary: true,
    secondaryLabel: 'Save & exit',
    secondaryVariant: 'subtle',
  },
}

// ---------------------------------------------------------------------------
// No header
// ---------------------------------------------------------------------------

export const NoHeader: Story = {
  args: {
    showHeader: false,
    showProgress: true,
    segments: defaultSegments,
    title: 'Home and location',
    description: 'Help sitters picture daily life! Describe your home and neighborhood.',
    primaryLabel: 'Continue',
    showSecondary: true,
    secondaryLabel: 'Save & exit',
  },
}

// ---------------------------------------------------------------------------
// No progress bar
// ---------------------------------------------------------------------------

export const NoProgress: Story = {
  args: {
    showHeader: true,
    showBack: true,
    showProgress: false,
    title: 'Home and location',
    description: 'Help sitters picture daily life! Describe your home and neighborhood.',
    illustration: <SampleIllustration />,
    primaryLabel: 'Continue',
    showSecondary: true,
    secondaryLabel: 'Save & exit',
  },
}

// ---------------------------------------------------------------------------
// Single button (no secondary)
// ---------------------------------------------------------------------------

export const SingleButton: Story = {
  args: {
    showHeader: true,
    showBack: true,
    showProgress: true,
    segments: defaultSegments,
    title: 'Home and location',
    description: 'Help sitters picture daily life! Describe your home and neighborhood.',
    illustration: <SampleIllustration />,
    primaryLabel: 'Continue',
    showSecondary: false,
  },
}

// ---------------------------------------------------------------------------
// Progress — midway through flow
// ---------------------------------------------------------------------------

export const ProgressMidFlow: Story = {
  args: {
    showHeader: true,
    showBack: true,
    showProgress: true,
    segments: [
      { label: 'Home',   fillPercent: 100 },
      { label: 'Pets',   fillPercent: 60  },
      { label: 'About',  fillPercent: 0   },
      { label: 'Safety', fillPercent: 0   },
    ],
    title: 'About your pets',
    description: 'Tell sitters what they need to know to care for your animals.',
    primaryLabel: 'Continue',
    showSecondary: true,
    secondaryLabel: 'Save & exit',
  },
}

// ---------------------------------------------------------------------------
// Interactive — full Controls panel
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    showHeader: true,
    showBack: true,
    showClose: false,
    headerTitle: '',
    showProgress: true,
    segments: defaultSegments,
    title: 'Home and location',
    description: 'Help sitters picture daily life! Describe your home and neighborhood.',
    primaryLabel: 'Continue',
    primaryVariant: 'primary',
    showPrimaryIcon: true,
    showSecondary: true,
    secondaryLabel: 'Save & exit',
    secondaryVariant: 'subtle',
  },
  argTypes: {
    showHeader:     { control: 'boolean' },
    showBack:       { control: 'boolean' },
    showClose:      { control: 'boolean' },
    headerTitle:    { control: 'text' },
    showProgress:   { control: 'boolean' },
    title:          { control: 'text' },
    description:    { control: 'text' },
    primaryLabel:   { control: 'text' },
    primaryVariant: { control: 'radio', options: ['primary', 'accent'] },
    showPrimaryIcon: { control: 'boolean' },
    showSecondary:  { control: 'boolean' },
    secondaryLabel: { control: 'text' },
    secondaryVariant: { control: 'radio', options: ['subtle', 'secondary'] },
  },
}
