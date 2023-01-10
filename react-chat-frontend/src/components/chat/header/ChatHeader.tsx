import { MdOutlineSearch } from 'react-icons/md'
import ActionIcon from '../../common/ActionIcon'
import BackButton from './BackButton'
import DotsMenu from './DotsMenu'

const ChatHeader = ({ activeChat }: any) => {
  return (
    <>
      <div className='p-2 w-full h-14 bg-white shadow-sm flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <BackButton />
          <div className='flex gap-2 items-center'>
            <img src={activeChat.avatar ? activeChat.avatar : '/user.svg'} className='w-8 h-8' />
            <div className='font-medium text-lg'>{activeChat.username}</div>
          </div>
        </div>
        <div className='flex gap-2'>
          <ActionIcon>
            <MdOutlineSearch />
          </ActionIcon>
          <DotsMenu />
        </div>
      </div>
    </>
  )
}

export default ChatHeader
