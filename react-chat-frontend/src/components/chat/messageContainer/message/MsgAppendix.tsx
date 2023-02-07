import { cls } from 'ui-kit'

const MsgAppendix = ({ isOwn, isOtherFromGroup }: { isOwn: boolean; isOtherFromGroup: boolean }) => {
  return (
    <div
      className={cls(
        'absolute bottom-[9px]',
        isOwn && 'right-[15px]',
        !isOwn && !isOtherFromGroup && 'left-[15px]',
        isOtherFromGroup && 'left-[39px]',
      )}>
      <svg width='9' height='20' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <filter x='-50%' y='-14.7%' width='200%' height='141.2%' filterUnits='objectBoundingBox' id='a'>
            <feOffset dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset>
            <feGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur>
            <feColorMatrix
              values='0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0'
              in='shadowBlurOuter1'></feColorMatrix>
          </filter>
        </defs>
        {isOwn ? (
          <g fill='none' fillRule='evenodd'>
            <path d='M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z'></path>
            <path
              d='M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z'
              fill='var(--chat-message-own-color)'
              className='corner'></path>
          </g>
        ) : (
          <g fill='none' fillRule='evenodd'>
            <path d='M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z'></path>
            <path
              d='M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z'
              fill='var(--chat-message-color)'
              className='corner'></path>
          </g>
        )}
      </svg>
    </div>
  )
}

export default MsgAppendix
