import { useQuery } from '@tanstack/react-query'
import { getUser } from '../services/mutations'

export default function useUser() {
  const { data, isLoading, isError, error } = useQuery(['user'], getUser)

  console.log({ data })

  return { user: data, isLoading, isError, error }
}
