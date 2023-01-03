import { useQuery } from '@tanstack/react-query'
import { User } from 'types/app.types'
import { getUser } from '../services/mutations'

export default function useUser() {
  const { data, isLoading, isError, error } = useQuery(['user'], getUser)

  return { user: data as User, isLoading, isError, error }
}
