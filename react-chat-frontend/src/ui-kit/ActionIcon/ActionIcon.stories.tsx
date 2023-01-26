import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { IoAddCircle } from 'react-icons/io5'

import { ActionIcon } from './ActionIcon'

const meta: Meta = {
  title: 'Action icon',
  component: ActionIcon,
  argTypes: {
    onClick: { action: 'clicked' },
    children: {
      defaultValue: 'Icon',
    },

    variant: {
      options: ['default', 'loading'],
      control: { type: 'radio' },
    },
  },
}

export default meta

const Template: StoryFn<typeof ActionIcon> = (args) => (
  <ActionIcon {...args}>
    <IoAddCircle />
  </ActionIcon>
)

export const Default = Template.bind({})

export const Loading = Template.bind({})

Loading.args = {
  isLoading: true,
}
