import { getMessages } from '@services/mutations'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function useMessages(contactName: string | null) {
  const queryClient = useQueryClient()

  const { data, isError, isLoading } = useQuery(['messages', contactName], () => getMessages(contactName), {
    enabled: !!contactName,
    staleTime: Infinity,
  })

  function addNewMessage(msg: any) {
    queryClient.setQueryData(['messages', contactName], (oldData: any) => {
      return [...oldData, msg]
    })
  }

  return { messages: data, isError, isLoading, addNewMessage }
}
