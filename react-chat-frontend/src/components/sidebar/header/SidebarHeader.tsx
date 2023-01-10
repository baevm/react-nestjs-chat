import Badge from '@components/common/Badge'
import { useState } from 'react'
import SearchInput from './SearchInput'
import MenuButton from './MenuButton'

const folders = [
  { title: 'All', count: 10 },
  { title: 'Unread', count: 6 },
  { title: 'Trash', count: 0 },
]

const SidebarHeader = () => {
  const [activeFolder, setActiveFolder] = useState('All')

  return (
    <div
      id='sidebar-header'
      className='h-24 border-b-[1px] border-gray-300 shadow-sm pt-2 px-4 flex flex-col justify-between'>
      <div className='flex items-center gap-4'>
        <MenuButton />
        <SearchInput />
      </div>

      <div id='sidebar-folders' className='flex gap-4'>
        {folders.map((folder) => (
          <div
            key={folder.title}
            className={`border-active-item-color min-w-[3rem] flex gap-2 cursor-pointer font-medium ${
              activeFolder === folder.title ? 'border-b-2 text-active-item-color' : 'text-gray-500'
            }`}
            onClick={() => {
              setActiveFolder(folder.title)
            }}>
            {folder.title}
            <Badge>{folder.count}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SidebarHeader
