import Modal from '@components/ui-kit/Modal'
import { useAddToGroupMutation } from '@redux/api/group/groupSlice'
import { useRouter } from 'next/router'
import { useState } from 'react'

const AddMemberModal = ({ isShow, handleClose }: { isShow: boolean; handleClose: () => void }) => {
  const router = useRouter()
  const [memberName, setMemberName] = useState('')
  const [handleAdd, { isLoading }] = useAddToGroupMutation()
  const groupId = router.query.id![0]

  const handleAddContact = () => {
    handleAdd({ contactName: memberName, groupId })
  }

  return (
    <Modal isOpened={isShow} onClose={handleClose}>
      <div className='bg-background-color p-4 rounded-md'>
        <div className='modal-header'>
          <div className='text-lg font-semibold text-text-color'>Add member</div>
        </div>

        <div className='my-4'>
          <input
            onChange={(e) => {
              setMemberName(e.target.value)
            }}
            className='border-[1px] border-border-color bg-input-color text-text-color rounded-md p-2 focus:outline-none focus:border-active-item-color'
            placeholder='Username'
          />
        </div>

        <div className='flex gap-2 justify-end font-semibold'>
          <button
            className='modal-default-button text-active-item-color hover:bg-icon-hover-color p-1 rounded-md'
            onClick={() => handleClose()}>
            Cancel
          </button>
          <button
            className='modal-default-button text-active-item-color hover:bg-icon-hover-color p-1 rounded-md'
            onClick={handleAddContact}
            disabled={isLoading}>
            {!isLoading ? 'Done' : 'Load...'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AddMemberModal
