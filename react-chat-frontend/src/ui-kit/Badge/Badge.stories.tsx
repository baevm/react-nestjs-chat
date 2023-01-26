import type { Meta, StoryFn } from '@storybook/react'

import { Badge } from './Badge'

const meta: Meta = {
  title: 'Badge',
  component: Badge,
  argTypes: {
    children: {
      defaultValue: 'Badge',
    },

    variant: {
      options: ['default'],
      control: { type: 'radio' },
    },
  },
}

export default meta

const Template: StoryFn<typeof Badge> = (args) => <Badge {...args}>10</Badge>

export const Default = Template.bind({})
