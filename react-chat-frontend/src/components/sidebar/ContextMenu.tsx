import React from 'react'

const ContextMenu = ({ xPos, yPos }: { xPos: number; yPos: number }) => {
  return (
    <div
      style={{ top: yPos, left: xPos }}
      className={`rounded-md absolute py-2 px-2 dropdown-shadow text-text-color border-gray-300`}>
      ContextMenu
    </div>
  )
}

export default ContextMenu
