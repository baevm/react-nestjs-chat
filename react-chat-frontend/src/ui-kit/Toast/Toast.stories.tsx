import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Button } from 'ui-kit/Button'

import { Toast } from './Toast'
import { ToastProvider } from './ToastProvider'
import { useToast } from './useToast'

const meta: Meta = {
  title: 'Toast',
  component: Toast,
  argTypes: {},
}

export default meta

const ComponentWithToast = () => {
  const toast = useToast()

  return (
    <Button onClick={() => toast.show({ type: 'error', title: 'Test toast', text: 'Test toast text' })}>
      Open toast
    </Button>
  )
}

const Template: StoryFn<typeof Toast> = (args) => {
  return (
    <ToastProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ComponentWithToast />
      </div>
    </ToastProvider>
  )
}

export const Default = Template.bind({})
