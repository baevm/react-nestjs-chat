import dayjs from 'dayjs'

export default function isSameDate(date1: string, date2: string | null) {
  if (!date1 || !date2) return false
  let day1 = dayjs(date1)
  let day2 = dayjs(date2)

  if (day1.diff(date2, 'day') === 0) {
    return true
  }
  return false
}
