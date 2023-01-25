import useClickOutside from '@hooks/useClickOutside'
import React, { HTMLAttributes, useRef, useState } from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import { IoMoonOutline, IoBookmarkOutline, IoLogOutOutline, IoPersonOutline } from 'react-icons/io5'
import { useRouter } from 'next/router'
import { useTheme } from '@hooks/useTheme'
import { ActionIcon, Menu, Switch } from '@ui-kit'

const MenuButton = () => {
  const router = useRouter()
  const { theme, changeTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<null | HTMLDivElement>(null)
  useClickOutside(menuRef, () => setIsOpen(false))

  const handleLogout = async () => {
    const res = await fetch('http://localhost:5000/auth/logout', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (res.ok) {
      router.replace('/')
    }
  }

  const handleTheme = () => {
    if (theme === 'dark') {
      changeTheme('light')
    } else {
      changeTheme('dark')
    }
  }

  return (
    <div ref={menuRef}>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen}>
        <Menu.Target>
          <ActionIcon>
            <MdOutlineMenu />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className='text-text-color'>
          <Menu.Item icon={<IoBookmarkOutline size='20' />}>Saved messages</Menu.Item>
          <Menu.Item icon={<IoPersonOutline size='20' />}>Contacts</Menu.Item>
          <Menu.Item icon={<IoMoonOutline size='20' />}>
            <div className='w-full flex items-center justify-between'>
              Night mode
              <Switch onChange={handleTheme} checked={theme === 'dark'} />
            </div>
          </Menu.Item>
          <Menu.Item onClick={handleLogout} icon={<IoLogOutOutline size='20' />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}

export default MenuButton
