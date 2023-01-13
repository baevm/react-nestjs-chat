import Badge from '@components/common/Badge'
import useUser from '@hooks/useUser'
import { useState } from 'react'
import MenuButton from './MenuButton'
import SearchInput from './SearchInput'

interface FolderProps {
  folderName: string
  activeFolder: string
  setActiveFolder: (folderName: string) => void
  contactsLength: number
}

const FolderItem = ({ folderName, activeFolder, setActiveFolder, contactsLength }: FolderProps) => {
  return (
    <div
      className={`border-active-item-color min-w-[3rem] flex gap-2 cursor-pointer font-medium ${
        activeFolder === folderName ? 'border-b-2 text-active-item-color' : 'text-gray-500'
      }`}
      onClick={() => {
        setActiveFolder(folderName)
      }}>
      {folderName}
      <Badge>{contactsLength}</Badge>
    </div>
  )
}

const SidebarHeader = ({ setActiveFolder, activeFolder }: any) => {
  const { user, isLoading } = useUser()

  return (
    <div
      id='sidebar-header'
      className='h-24 border-b-[1px] bg-background-color border-border-color shadow-sm pt-2 px-4 flex flex-col justify-between'>
      <div className='flex items-center gap-4'>
        <MenuButton />
        <SearchInput />
      </div>

      <div id='sidebar-folders' className='flex gap-4'>
        <FolderItem
          activeFolder={activeFolder}
          contactsLength={user.contacts.length}
          folderName='All'
          setActiveFolder={setActiveFolder}
        />

        {user?.folders.map(folder => (
          <FolderItem
            activeFolder={activeFolder}
            contactsLength={folder.contacts.length}
            folderName={folder.name}
            setActiveFolder={setActiveFolder}
          />
        ))}
      </div>
    </div>
  )
}

export default SidebarHeader
