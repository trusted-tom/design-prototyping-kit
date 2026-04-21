import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    label: 'new',
  },
}

export const Interactive: Story = {
  args: {
    label: 'new',
  },
  argTypes: {
    label: { control: 'text' },
  },
}
