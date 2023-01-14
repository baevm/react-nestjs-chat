import { useQuery } from '@tanstack/react-query'
import { User } from 'types/app.types'
import { getUser } from '../services/mutations'

export default function useUser() {
  const { data, isLoading, isError, error } = useQuery<User>(['user'], getUser, {
    staleTime: 5000,
  })

  return { user: data, isLoading, isError, error }
}
