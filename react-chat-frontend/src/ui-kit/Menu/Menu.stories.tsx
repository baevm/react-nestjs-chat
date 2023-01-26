import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Button } from 'ui-kit/Button'

import { Menu } from './Menu'

const meta: Meta = {
  title: 'Menu',
  component: Menu,
  argTypes: {},
}

export default meta

const Template: StoryFn<typeof Menu> = (args) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Menu isOpen={isOpened} setIsOpen={setIsOpened}>
        <Menu.Target>
          <Button>Open menu</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>Test</Menu.Item>
          <Menu.Item>Test 1</Menu.Item>
          <Menu.Item>Test 2</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}

export const Default = Template.bind({})
