import { useState } from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import ActionIcon from '../common/ActionIcon'
import Badge from '../common/Badge'
import SearchInput from './SearchInput'

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
        <ActionIcon>
          <MdOutlineMenu color='#707579' />
        </ActionIcon>
        <SearchInput />
      </div>

      <div id='sidebar-folders' className='flex gap-4'>
        {folders.map((folder) => (
          <div
            key={folder.title}
            className={`border-blue-500 min-w-[3rem] flex gap-2 cursor-pointer font-medium ${
              activeFolder === folder.title ? 'border-b-2 text-blue-500' : 'text-gray-500'
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
