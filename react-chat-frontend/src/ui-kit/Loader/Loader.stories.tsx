import type { Meta, StoryFn } from '@storybook/react'

import { Loader } from './Loader'

const meta: Meta = {
  title: 'Loader',
  component: Loader,
  argTypes: {},
}

export default meta

const Template: StoryFn<typeof Loader> = (args) => <Loader {...args} />

export const xs = Template.bind({})
export const sm = Template.bind({})
export const md = Template.bind({})

xs.args = {
  size: 'xs',
}

sm.args = {
  size: 'sm',
}

md.args = {
  size: 'md',
}
