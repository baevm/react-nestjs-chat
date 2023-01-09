import { getMessages } from '@services/mutations'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function useMessages(contactName: string | null) {
  const queryClient = useQueryClient()

  const { data, isError, isLoading } = useQuery(['messages', contactName], () => getMessages(contactName), {
    enabled: !!contactName,
    staleTime: Infinity,
  })

  function addNewMessage(msg: any, user: any) {
    // decice which user to cache the message for
    let userToCache = msg.senderName === user.username ? msg.receiverName : msg.senderName

    queryClient.setQueryData(['messages', userToCache], (oldData: any) => {
      if (oldData) {
        return [...oldData, msg]
      }
    })
  }

  return { messages: data, isError, isLoading, addNewMessage }
}
