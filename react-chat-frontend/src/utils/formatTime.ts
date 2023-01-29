import dayjs from 'dayjs'

export default function formatTime(date: string) {
  return dayjs(date).format('HH:mm')
}
