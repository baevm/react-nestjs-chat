import ActionIcon from '@components/common/ActionIcon'
import useClickOutside from '@hooks/useClickOutside'
import React, { useRef, useState } from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import { IoMoonOutline, IoBookmarkOutline, IoLogOutOutline, IoPersonOutline } from 'react-icons/io5'

const MenuItem = ({ children, icon, ...props }: { children: React.ReactNode; icon: any }) => {
  return (
    <div
      {...props}
      className='p-2 font-medium flex items-center gap-2 text-sm hover:bg-[#00000011] active:scale-[0.98] rounded-lg cursor-pointer'>
      {icon} {children}
    </div>
  )
}

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  useClickOutside(menuRef, () => setIsOpen(false))

  return (
    <div ref={menuRef}>
      <ActionIcon onClick={() => setIsOpen((val) => !val)}>
        <MdOutlineMenu color='#707579' />
      </ActionIcon>
      {isOpen && (
        <div className='min-w-[270px] rounded-lg absolute z-50 top-12 left-6 backdrop-blur-md p-2 dropdown-shadow border-gray-300'>
          <div className='w-full flex flex-col gap-2'>
            <MenuItem icon={<IoBookmarkOutline size='20' />}>Saved messages</MenuItem>
            <MenuItem icon={<IoPersonOutline size='20' />}>Contacts</MenuItem>
            <MenuItem icon={<IoMoonOutline size='20' />}>Night mode</MenuItem>
            <MenuItem icon={<IoLogOutOutline size='20' />}>Logout</MenuItem>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuButton
