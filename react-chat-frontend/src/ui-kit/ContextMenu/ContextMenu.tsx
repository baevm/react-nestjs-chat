import useClickOutside from '@hooks/useClickOutside'
import React, { createContext, HTMLAttributes, useContext, useRef, useState } from 'react'
import { MenuItem } from 'ui-kit/Menu/Menu'

interface MenuDropdownProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: React.ComponentProps<'div'>['className']
}

interface MenuTargetProps extends HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
}

const ContextMenuContext = createContext({
  isOpen: false,
  posXY: { x: 0, y: 0 },
  handleOpen: (e: React.MouseEvent) => {},
  handleClose: () => {},
})

export const ContextMenu = ({
  children,
  onOpen,
  onClose,
}: {
  children: React.ReactNode
  onOpen?: () => void
  onClose?: () => void
}) => {
  const [posXY, setPosXY] = useState({ x: 0, y: 0 })
  const contextRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useClickOutside(contextRef, handleClose)

  function handleClose() {
    setPosXY({ x: 0, y: 0 })
    setIsOpen(false)

    if (onClose) onClose()
  }

  function handleOpen(e: React.MouseEvent) {
    e.preventDefault()
    if (onOpen) onOpen()

    setIsOpen(true)
    setPosXY({ x: e.pageX, y: e.pageY })
  }

  return (
    <ContextMenuContext.Provider value={{ isOpen, posXY, handleOpen, handleClose }}>
      <div ref={isOpen ? contextRef : null}>{children}</div>
    </ContextMenuContext.Provider>
  )
}

const ContextMenuDropdown = ({ children, className }: MenuDropdownProps) => {
  const { isOpen, posXY } = useContext(ContextMenuContext)

  if (!isOpen) return null

  return (
    <div
      style={{ top: posXY.y, left: posXY.x }}
      id='contextmenu-dropdown'
      className={`dropdown-bg-with-shadow text-text-color fixed z-[1000] rounded-md border-gray-300 p-2 ${className}`}>
      <div>{children}</div>
    </div>
  )
}

const MenuTarget = ({ children, className }: MenuTargetProps) => {
  const { isOpen, handleOpen, handleClose } = useContext(ContextMenuContext)


  return (
    <span
      id='contextmenu-target'
      onContextMenu={handleOpen}
      onClick={isOpen ? handleClose : undefined}
      className={className}>
      {children}
    </span>
  )
}

ContextMenu.Item = MenuItem
ContextMenu.Target = MenuTarget
ContextMenu.Dropdown = ContextMenuDropdown
