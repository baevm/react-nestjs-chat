import ActionIcon from '@components/common/ActionIcon'
import Menu from '@components/common/Menu'
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
      <Menu.Dropdown className='right-4'>
        <Menu.Item>Test</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default DotsMenu
