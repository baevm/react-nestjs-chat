import { getGroupMessages, getUserMessages } from '@services/mutations'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function useMessages(contactId: string | null) {
  const queryClient = useQueryClient()

  const { data, isError, isLoading } = useQuery(
    ['messages', contactId],
    () => {
      if (contactId?.startsWith('U')) {
        return getUserMessages(contactId)
      } else if (contactId?.startsWith('G')) {
        return getGroupMessages(contactId)
      }
    },
    {
      enabled: !!contactId,
      staleTime: Infinity,
    }
  )

  function cacheNewMessage(msg: any, user: any) {
    // decice which user to cache the message for
    let userToCache = msg.senderId === user.id ? msg.receiverId : msg.senderId

    queryClient.setQueryData(['messages', userToCache], (oldData: any) => {
      if (oldData) {
        return [...oldData, msg]
      }
    })
  }

  return { messages: data, isError, isLoading, cacheNewMessage }
}
