import axiosFetch from '../utils/fetcher'

export const getUser = async () => {
  const res = await axiosFetch.get('/user')
  return res.data
}

export const getMessages = async (contactName: string | null) => {
  const res = await axiosFetch.get(`/user/messages/${contactName}`)
  return res.data
}

export const addContact = async (contactName: string) => {
  const res = await axiosFetch.post(`/user/addContact/`, { username: contactName })
  return res.data
}
