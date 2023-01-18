import ActionIcon from '@components/ui-kit/ActionIcon'
import emoji_data from '@emoji-mart/data'
import useClickOutside from '@hooks/useClickOutside'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { MdOutlineInsertEmoticon } from 'react-icons/md'
const EmojiPicker = dynamic(() => import('@emoji-mart/react'), { ssr: false })

const EmojiButton = ({ setNewMessage }: { setNewMessage: (v: any) => void }) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const emojiPickerRef = useRef<HTMLDivElement | null>(null)
  useClickOutside(emojiPickerRef, () => {
    setIsEmojiPickerOpen(false)
  })

  return (
    <div ref={isEmojiPickerOpen ? emojiPickerRef : null}>
      <ActionIcon onClick={() => setIsEmojiPickerOpen(true)}>
        <MdOutlineInsertEmoticon />
      </ActionIcon>
      {isEmojiPickerOpen && (
        <div className='absolute bottom-full mb-2'>
          <EmojiPicker
            data={emoji_data}
            previewPosition='none'
            onEmojiSelect={(e: any) => setNewMessage((prev: any) => prev + e.native)}
            skinTonePosition='none'
          />
        </div>
      )}
    </div>
  )
}

export default EmojiButton
