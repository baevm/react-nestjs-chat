import { Modal } from '@ui-kit'
import { useAddToGroupMutation } from '@redux/api/group/groupSlice'
import { useRouter } from 'next/router'
import { useState } from 'react'

const AddMemberModal = ({ isShow, handleClose }: { isShow: boolean; handleClose: () => void }) => {
  const router = useRouter()
  const [memberName, setMemberName] = useState('')
  const [addToGroup, { isLoading }] = useAddToGroupMutation()
  const groupId = router.query.id![0]

  const addToGroupContact = () => {
    addToGroup({ contactName: memberName, groupId })
  }

  return (
    <Modal isOpened={isShow} onClose={handleClose}>
      <div className='bg-background-color rounded-md p-4'>
        <div className='modal-header'>
          <div className='text-text-color text-lg font-semibold'>Add member</div>
        </div>

        <div className='my-4'>
          <input
            onChange={(e) => {
              setMemberName(e.target.value)
            }}
            className='border-border-color bg-input-color text-text-color focus:border-active-item-color rounded-md border-[1px] p-2 focus:outline-none'
            placeholder='Username'
          />
        </div>

        <div className='flex justify-end gap-2 font-semibold'>
          <button
            className='modal-default-button text-active-item-color hover:bg-icon-hover-color rounded-md p-1'
            onClick={() => handleClose()}>
            Cancel
          </button>
          <button
            className='modal-default-button text-active-item-color hover:bg-icon-hover-color rounded-md p-1'
            onClick={addToGroupContact}
            disabled={isLoading}>
            {!isLoading ? 'Done' : 'Load...'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AddMemberModal
