import { Badge } from '@ui-kit'
import { useGetUserQuery } from 'redux/api/user/userSlice'
import MenuButton from './MenuButton'
import SearchInput from './SearchInput'

interface FolderProps {
  folderName: string
  activeFolder: string
  setActiveFolder: (folderName: string) => void
  contactsLength: number | undefined
}

const FolderItem = ({ folderName, activeFolder, setActiveFolder, contactsLength }: FolderProps) => {
  return (
    <div
      className={`border-active-item-color flex min-w-[3rem] cursor-pointer gap-2 font-medium ${
        activeFolder === folderName ? 'text-active-item-color border-b-2' : 'text-gray-500'
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
  const { data: user, isLoading, isError, error } = useGetUserQuery()

  return (
    <div
      id='sidebar-header'
      className='bg-background-color border-border-color flex h-24 w-full flex-col justify-between border-b-[1px] px-4 pt-2 shadow-sm'>
      <div className='flex w-full items-center gap-4'>
        <MenuButton />
        <SearchInput />
      </div>

      <div id='sidebar-folders' className='flex gap-4'>
        <FolderItem
          activeFolder={activeFolder}
          contactsLength={user?.participants ? user.participants.length : 0}
          folderName='All'
          setActiveFolder={setActiveFolder}
        />

        {/* {user?.folders.map(folder => (
          <FolderItem
            key={folder.id}
            activeFolder={activeFolder}
            contactsLength={folder.contacts.length}
            folderName={folder.name}
            setActiveFolder={setActiveFolder}
          />
        ))} */}
      </div>
    </div>
  )
}

export default SidebarHeader
