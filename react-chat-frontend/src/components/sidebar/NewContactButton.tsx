import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { RiPencilFill } from 'react-icons/ri'
import NewContactModal from './NewContactModal'

const NewContactButton = () => {
  const [isShow, setIsShow] = useState(false)
  return (
    <>
      <button
        onClick={() => {
          setIsShow(true)
        }}
        className='w-14 h-14 absolute bottom-4 right-4 flex items-center justify-center bg-[#3390EC] rounded-full active:scale-95'>
        <RiPencilFill color='white' />
      </button>
      {isShow && createPortal(<NewContactModal isShow={isShow} setIsShow={setIsShow} />, document.body)}
    </>
  )
}

export default NewContactButton
