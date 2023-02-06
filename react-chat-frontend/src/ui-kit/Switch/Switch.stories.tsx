import type { Meta, StoryFn } from '@storybook/react'

import { Switch } from './Switch'

const meta: Meta = {
  title: 'Switch',
  component: Switch,
  argTypes: {},
}

export default meta

const Template: StoryFn<typeof Switch> = (args) => <Switch {...args} />

export const checked = Template.bind({})
