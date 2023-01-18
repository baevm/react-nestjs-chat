import { GroupService } from '@services/group.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreateGroup() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error, mutate } = useMutation(['createGroup'], GroupService.createGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
    },
  })

  const handleCreate = (groupName: string) => mutate(groupName)

  return { data, isLoading, isError, error, handleCreate }
}
