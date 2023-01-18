import { useState } from 'react'
import { IoPersonAddOutline } from 'react-icons/io5'
import AddMemberModal from './AddMemberModal'

const AddMemberButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='absolute bottom-4 right-4 w-14 h-14 flex items-center justify-center bg-active-item-color rounded-full active:scale-95'>
        <IoPersonAddOutline color='white' />
      </button>

      {isModalOpen && <AddMemberModal isShow={isModalOpen} handleClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default AddMemberButton
