
const RepliedMessage = ({ username, text }: { username: string; text: string }) => {
  return (
    <div className='border-accent-color border-l-2 pl-2'>
      <div className='text-accent-color font-semibold'>{username}</div>
      <div>{text}</div>
    </div>
  )
}

export default RepliedMessage
