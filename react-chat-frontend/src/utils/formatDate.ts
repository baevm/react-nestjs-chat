import dayjs from 'dayjs'

export default function formatDate(date: string) {
  let createdAt = dayjs(date)
  let today = dayjs()

  /* if (today.diff(createdAt, 'day') <= 7) {
    return createdAt.format('dddd')
  } else { */
    return createdAt.format('MMM DD, YYYY')
  /* } */
}
