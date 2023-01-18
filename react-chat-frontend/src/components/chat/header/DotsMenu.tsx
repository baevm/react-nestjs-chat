import ActionIcon from '@components/ui-kit/ActionIcon'
import Menu from '@components/ui-kit/Menu'
import React, { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const DotsMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Menu isOpen={isOpen} setIsOpen={setIsOpen}>
      <Menu.Target>
        <ActionIcon>
          <HiOutlineDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown className='right-4 z-[100]'>
        <Menu.Item>Test</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default DotsMenu
