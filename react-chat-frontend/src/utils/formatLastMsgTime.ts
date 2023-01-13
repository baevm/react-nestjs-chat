import dayjs from 'dayjs'

export default function formatLastMsgTime(date: string) {
  let createdAt = dayjs(date)
  let today = dayjs()

  if (today.diff(createdAt, 'hour') >= 23) {
    return dayjs(createdAt).format('MMM DD, YYYY')
  } else {
    return dayjs(createdAt).format('HH:mm')
  }
}
