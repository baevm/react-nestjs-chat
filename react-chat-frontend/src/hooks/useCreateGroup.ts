import { createGroup } from '@services/mutations'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreateGroup() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error, mutate } = useMutation(['createGroup'], createGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
    },
  })

  const handleCreate = (groupName: string) => mutate(groupName)

  return { data, isLoading, isError, error, handleCreate }
}
