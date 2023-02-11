import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Button } from 'ui-kit/Button'

import { ContextMenu } from './ContextMenu'

const meta: Meta = {
  title: 'ContextMenu',
  component: ContextMenu,
  argTypes: {},
}

export default meta

const Template: StoryFn<typeof ContextMenu> = (args) => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'lightblue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ContextMenu>
        <ContextMenu.Target>
          <div className='h-32 w-32 border-2 border-gray-400'>Right click here to open context menu</div>
        </ContextMenu.Target>

        <ContextMenu.Dropdown>
          <ContextMenu.Item>Test</ContextMenu.Item>
          <ContextMenu.Item>Test 1</ContextMenu.Item>
          <ContextMenu.Item>Test 2</ContextMenu.Item>
        </ContextMenu.Dropdown>
      </ContextMenu>
    </div>
  )
}

export const Default = Template.bind({})
