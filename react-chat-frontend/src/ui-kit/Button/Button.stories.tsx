import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import { Button } from './Button'

const meta: Meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    children: {
      defaultValue: 'Button',
    },

    variant: {
      options: ['filled', 'light', 'subtle'],
      control: { type: 'radio' },
    },
  },
}

export default meta

const Template: StoryFn<typeof Button> = (args) => <Button {...args}>Submit</Button>

export const filled = Template.bind({})

export const light = Template.bind({})

export const subtle = Template.bind({})

export const loading = Template.bind({})

filled.args = {
  variant: 'filled',
}

light.args = {
  variant: 'light',
}

subtle.args = {
  variant: 'subtle',
}

loading.args = {
  isLoading: true,
}
