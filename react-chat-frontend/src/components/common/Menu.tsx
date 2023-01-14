import useClickOutside from '@hooks/useClickOutside'
import React, { createContext, HTMLAttributes, useContext, useRef } from 'react'

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  icon?: any
  className?: React.ComponentProps<'div'>['className']
}

interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  className?: React.ComponentProps<'div'>['className']
}

interface MenuTargetProps extends HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
}

interface MenuDropdownProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: React.ComponentProps<'div'>['className']
}

const MenuContext = createContext({
  isOpen: false,
  setIsOpen: (val: boolean) => {},
})

const Menu = ({ children, isOpen, setIsOpen, ...props }: MenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  useClickOutside(menuRef, () => setIsOpen(false))

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={isOpen ? menuRef : null}>{children}</div>
    </MenuContext.Provider>
  )
}

const MenuDropdown = ({ children, className }: MenuDropdownProps) => {
  const { isOpen } = useContext(MenuContext)

  if (!isOpen) return null

  return (
    <div id='menu-dropdown' className={`rounded-xl absolute py-2 px-2 dropdown-shadow border-gray-300 ${className}`}>
      <div className='w-full flex flex-col gap-2'>{children}</div>
    </div>
  )
}

const MenuItem = ({ children, icon, className, ...props }: MenuItemProps) => {
  return (
    <div
      {...props}
      id='menu-item'
      className={`p-2 w-52 whitespace-nowrap font-medium flex items-center gap-2 text-sm hover:bg-[#00000011] active:scale-[0.98] rounded-lg cursor-pointer ${className}`}>
      {icon} {children}
    </div>
  )
}

const MenuTarget = ({ children, className }: MenuTargetProps) => {
  const { isOpen, setIsOpen } = useContext(MenuContext)
  return (
    <span id='menu-target' onClick={() => setIsOpen(!isOpen)}>
      {children}
    </span>
  )
}

Menu.Item = MenuItem
Menu.Target = MenuTarget
Menu.Dropdown = MenuDropdown

export default Menu
