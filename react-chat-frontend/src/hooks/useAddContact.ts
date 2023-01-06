import { addContact } from '@services/mutations'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useAddContact() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error, mutate } = useMutation(['addContact'], addContact, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
    },
  })

  const handleAdd = (contactName: string) => mutate(contactName)

  return { data, isLoading, isError, error, handleAdd }
}
