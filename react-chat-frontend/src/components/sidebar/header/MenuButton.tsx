import useClickOutside from '@hooks/useClickOutside'
import { useTheme } from '@hooks/useTheme'
import { useLogoutMutation } from '@redux/api/auth/authSlice'
import { ActionIcon, Menu, Switch } from '@ui-kit'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { IoBookmarkOutline, IoLogOutOutline, IoMoonOutline, IoPersonOutline } from 'react-icons/io5'
import { MdOutlineMenu } from 'react-icons/md'

const MenuButton = () => {
  const router = useRouter()
  const { theme, changeTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<null | HTMLDivElement>(null)
  const [logout] = useLogoutMutation()
  useClickOutside(menuRef, () => setIsOpen(false))

  const handleLogout = async () => {
    await logout()
      .unwrap()
      .then(() => router.replace(`/`))
      .catch((error: any) => console.error(error))
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
