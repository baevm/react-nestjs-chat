import React from 'react'
import { PanelResizeHandle } from 'react-resizable-panels'

// invisible resize handle placed at the right side of the sidebar
function ResizeHandle({ className = '', id }: { className?: string; id?: string }) {
  return (
    <PanelResizeHandle
      className={'absolute top-0 -right-1 bottom-0 z-[1000] w-2 outline-none'}
      style={{ flex: '0 0 0.5rem' }}
      id={id}>
      <div />
    </PanelResizeHandle>
  )
}

export default ResizeHandle
