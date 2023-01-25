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
  const { data: user, isLoading, isError, error } = useGetUserQuery()

  return (
    <div
      id='sidebar-header'
      className='h-24 w-full border-b-[1px] bg-background-color border-border-color shadow-sm pt-2 px-4 flex flex-col justify-between'>
      <div className='w-full flex items-center gap-4'>
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
