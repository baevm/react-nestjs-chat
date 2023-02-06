import { useState } from 'react'
import { IoPersonAddOutline } from 'react-icons/io5'
import AddMemberModal from './AddMemberModal'

const AddMemberButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='bg-active-item-color absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full active:scale-95'>
        <IoPersonAddOutline color='white' />
      </button>

      <AddMemberModal isShow={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default AddMemberButton
