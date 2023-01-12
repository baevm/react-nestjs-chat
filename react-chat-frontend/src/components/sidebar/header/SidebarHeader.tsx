import Badge from '@components/common/Badge'
import { useState } from 'react'
import SearchInput from './SearchInput'
import MenuButton from './MenuButton'
import useUser from '@hooks/useUser'
import { createFolder } from '@services/mutations'

const SidebarHeader = () => {
  const { user, isLoading } = useUser()
  const [activeFolder, setActiveFolder] = useState('All')

  console.log({ user })
  return (
    <div
      id='sidebar-header'
      className='h-24 border-b-[1px] bg-background-color border-border-color shadow-sm pt-2 px-4 flex flex-col justify-between'>
      <div className='flex items-center gap-4'>
        <MenuButton />
        <SearchInput />
      </div>

      <div id='sidebar-folders' className='flex gap-4'>
        {user?.folders.map(folder => (
          <div
            key={folder.id}
            className={`border-active-item-color min-w-[3rem] flex gap-2 cursor-pointer font-medium ${
              activeFolder === folder.name ? 'border-b-2 text-active-item-color' : 'text-gray-500'
            }`}
            onClick={() => {
              setActiveFolder(folder.name)
            }}>
            {folder.name}
            <Badge>{folder.contacts.length}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SidebarHeader
