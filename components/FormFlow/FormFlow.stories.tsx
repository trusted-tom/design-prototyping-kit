import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormFlow } from './FormFlow'

const meta: Meta<typeof FormFlow> = {
  title: 'Components/FormFlow',
  component: FormFlow,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj<typeof FormFlow>

// ---------------------------------------------------------------------------
// Shared placeholder pieces — mimic real form content using spec typography
// ---------------------------------------------------------------------------

const PageHeading = ({ title, description }: { title: string; description?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxs)' }}>
    <p style={{
      fontFamily: 'var(--font-family-sans)',
      fontSize: 'var(--font-size-2xl)',
      fontWeight: 700,
      lineHeight: 'var(--line-height-9)',
      color: 'var(--colour-primary-700)',
      margin: 0,
    }}>
      {title}
    </p>
    {description && (
      <p style={{
        fontFamily: 'var(--font-family-sans)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 400,
        lineHeight: 'var(--line-height-6)',
        color: 'var(--colour-primary-900)',
        margin: 0,
      }}>
        {description}
      </p>
    )}
  </div>
)

const FieldGroup = ({ label }: { label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
    <p style={{
      fontFamily: 'var(--font-family-sans)',
      fontSize: 'var(--font-size-base)',
      fontWeight: 600,
      lineHeight: 'var(--line-height-7)',
      color: 'var(--colour-primary-700)',
      margin: 0,
    }}>
      {label}
    </p>
    <div style={{
      height: '52px',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border-subtle)',
      backgroundColor: 'var(--colour-base-white)',
    }} />
  </div>
)

// ---------------------------------------------------------------------------
// Default — single step, no secondary, no footer note
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <FormFlow
      showTitle
      title="Your profile"
      showBack
      showClose
      primaryLabel="Save changes"
      primaryVariant="primary"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxl)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          <PageHeading
            title="Tell us about you"
            description="This helps us match you with the right owners and sitters."
          />
        </div>
        <FieldGroup label="Full name" />
        <FieldGroup label="Date of birth" />
        <FieldGroup label="About you" />
      </div>
    </FormFlow>
  ),
}

// ---------------------------------------------------------------------------
// With secondary button
// ---------------------------------------------------------------------------

export const WithSecondary: Story = {
  render: () => (
    <FormFlow
      showTitle
      title="Your home"
      showBack
      primaryLabel="Continue"
      primaryVariant="primary"
      showSecondary
      secondaryLabel="Skip for now"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxl)' }}>
        <PageHeading
          title="Describe your home"
          description="Sitters want to know what to expect."
        />
        <FieldGroup label="Property type" />
        <FieldGroup label="Number of pets" />
      </div>
    </FormFlow>
  ),
}

// ---------------------------------------------------------------------------
// With footer note
// ---------------------------------------------------------------------------

export const WithFooterNote: Story = {
  render: () => (
    <FormFlow
      showTitle
      title="Verify your identity"
      showBack
      showClose
      primaryLabel="Continue"
      primaryVariant="accent"
      footerNote="Your information is encrypted and never shared with third parties."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxl)' }}>
        <PageHeading
          title="Verify your identity"
          description="We need to confirm who you are before you can apply for sits."
        />
        <FieldGroup label="Government-issued ID" />
        <FieldGroup label="ID number" />
      </div>
    </FormFlow>
  ),
}

// ---------------------------------------------------------------------------
// Multi-step — 3 steps, useState drives title, children, and button labels
// ---------------------------------------------------------------------------

const steps = [
  {
    title: 'About you',
    primaryLabel: 'Continue',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxl)' }}>
        <PageHeading
          title="Tell us about you"
          description="This helps us find the right match."
        />
        <FieldGroup label="Full name" />
        <FieldGroup label="Location" />
      </div>
    ),
  },
  {
    title: 'Your home',
    primaryLabel: 'Continue',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxl)' }}>
        <PageHeading
          title="Describe your home"
          description="Sitters want to know what to expect during their stay."
        />
        <FieldGroup label="Property type" />
        <FieldGroup label="Number of bedrooms" />
        <FieldGroup label="Outdoor space" />
      </div>
    ),
  },
  {
    title: 'Your pets',
    primaryLabel: 'Submit',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxl)' }}>
        <PageHeading
          title="Tell us about your pets"
          description="Sitters will see this on your listing."
        />
        <FieldGroup label="Pet type" />
        <FieldGroup label="Pet name" />
        <FieldGroup label="Special care instructions" />
      </div>
    ),
  },
]

const MultiStepDemo: React.FC = () => {
  const [step, setStep] = useState(1)
  const total = steps.length
  const current = steps[step - 1]

  return (
    <FormFlow
      showTitle
      title={current.title}
      showBack={step > 1}
      onBack={() => setStep(s => Math.max(1, s - 1))}
      showClose
      primaryLabel={current.primaryLabel}
      primaryVariant="primary"
      onPrimary={() => setStep(s => Math.min(total, s + 1))}
      footerNote={`Step ${step} of ${total}`}
    >
      {current.children}
    </FormFlow>
  )
}

export const MultiStep: Story = {
  render: () => <MultiStepDemo />,
}
