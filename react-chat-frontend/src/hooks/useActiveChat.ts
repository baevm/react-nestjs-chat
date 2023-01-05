import { getMessages } from '@services/mutations'
import { useQuery } from '@tanstack/react-query'

export default function useActiveChat(contactName: string | null) {
  const { data, isError, isLoading } = useQuery(['contact', contactName], () => getMessages(contactName), {
    enabled: !!contactName,
    staleTime: Infinity,
  })

  return { messages: data, isError, isLoading }
}
