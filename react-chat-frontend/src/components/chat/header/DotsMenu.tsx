import { ActionIcon, Menu } from '@ui-kit'
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
