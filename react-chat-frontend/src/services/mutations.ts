import axiosFetch from '../utils/fetcher'

export const getUser = async () => {
  const res = await axiosFetch.get('/user')
  return res.data
}

export const getMessages = async (contactId: string | null) => {
  const res = await axiosFetch.get(`/user/messages/${contactId}`)
  return res.data
}

export const addContact = async (contactName: string) => {
  const res = await axiosFetch.post(`/user/addContact/`, { username: contactName })
  return res.data
}

export const createFolder = async (folderName: string) => {
  const res = await axiosFetch.post(`/user/createFolder/`, { folderName })
  return res.data
}

export const createGroup = async (groupName: string) => {
  const res = await axiosFetch.post(`/group/createGroup/`, { groupName })
  return res.data
}