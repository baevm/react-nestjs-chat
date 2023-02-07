import useClickOutside from '@hooks/useClickOutside'
import React, { createContext, HTMLAttributes, useContext, useRef } from 'react'

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  icon?: React.ReactNode
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

export const Menu = ({ children, isOpen, setIsOpen, ...props }: MenuProps) => {
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
    <div id='menu-dropdown' className={`dropdown-bg-with-shadow absolute rounded-xl border-gray-300 py-2 px-2 ${className}`}>
      <div className='flex w-full flex-col gap-2'>{children}</div>
    </div>
  )
}

export const MenuItem = ({ children, icon, className, ...props }: MenuItemProps) => {
  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter' || e.key === 'space') {
      e.preventDefault()
      props.onClick?.(e as any)
    }
  }

  return (
    <div
      {...props}
      id='menu-item'
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`flex w-52 cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg p-2 text-sm font-medium hover:bg-[#00000011] active:scale-[0.98] ${className}`}>
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
