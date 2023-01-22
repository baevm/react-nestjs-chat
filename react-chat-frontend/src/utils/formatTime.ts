import dayjs from 'dayjs'

export default function formatTime(date: Date) {
  return dayjs(date).format('HH:mm')
}
