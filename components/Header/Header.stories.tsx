import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj<typeof Header>

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    appearance: 'default',
    state: 'default',
    showBack: true,
    showClose: true,
    showRightIconAction1: true,
    showRightIconAction2: true,
  },
}

// ---------------------------------------------------------------------------
// Scrolled
// ---------------------------------------------------------------------------

export const Scrolled: Story = {
  args: {
    appearance: 'default',
    state: 'scrolled',
    showTitle: true,
    title: 'Your profile',
    showBack: true,
    showRightIconAction1: true,
    showRightIconAction2: true,
  },
}

// ---------------------------------------------------------------------------
// With title and subtext
// ---------------------------------------------------------------------------

export const WithTitle: Story = {
  args: {
    appearance: 'default',
    state: 'default',
    showTitle: true,
    title: 'Complete your profile',
    showSubtext: true,
    subtext: 'Step 2 of 4',
    showBack: true,
    showClose: true,
    showRightIconAction1: true,
    showRightIconAction2: true,
    showRightTextAction: true,
    rightActionCopy: 'Save',
  },
}

// ---------------------------------------------------------------------------
// Inverse
// ---------------------------------------------------------------------------

export const Inverse: Story = {
  args: {
    appearance: 'inverse',
    state: 'default',
    showBack: true,
    showClose: true,
    showTitle: true,
    title: 'Browse sitters',
  },
}

// ---------------------------------------------------------------------------
// With logo
// ---------------------------------------------------------------------------

export const WithLogo: Story = {
  args: {
    appearance: 'default',
    state: 'default',
    showLogo: true,
    showRightIconAction1: true,
    showRightTextAction: true,
    rightActionCopy: 'Sign in',
  },
}

// ---------------------------------------------------------------------------
// Interactive — all props controllable via Controls panel
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    appearance: 'default',
    state: 'default',
    title: 'Page title',
    showTitle: false,
    subtext: 'Step 1 of 3',
    showSubtext: false,
    showLogo: false,
    showBack: false,
    showClose: false,
    showRightIconAction1: false,
    showRightIconAction2: false,
    showRightTextAction: false,
    rightActionCopy: 'Save',
  },
  argTypes: {
    appearance: { control: 'radio', options: ['default', 'inverse'] },
    state:      { control: 'radio', options: ['default', 'scrolled'] },
    title:               { control: 'text' },
    showTitle:           { control: 'boolean' },
    subtext:             { control: 'text' },
    showSubtext:         { control: 'boolean' },
    showLogo:            { control: 'boolean' },
    showBack:            { control: 'boolean' },
    showClose:           { control: 'boolean' },
    showRightIconAction1: { control: 'boolean' },
    showRightIconAction2: { control: 'boolean' },
    showRightTextAction:  { control: 'boolean' },
    rightActionCopy:     { control: 'text' },
  },
}
