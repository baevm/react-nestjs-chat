import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Button } from 'ui-kit/Button'

import { Modal } from './Modal'

const meta: Meta = {
  title: 'Modal',
  component: Modal,
  argTypes: {},
}

export default meta

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpened, setIsOpened] = useState(args.isOpened)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Button onClick={() => setIsOpened(true)}>Open modal</Button>
      <Modal isOpened={isOpened} onClose={() => setIsOpened(false)}>
        <div style={{ backgroundColor: 'white', width: '200px', height: '100px' }}>Test modal</div>
      </Modal>
    </div>
  )
}

export const Default = Template.bind({})
