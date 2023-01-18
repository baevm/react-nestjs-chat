import axiosFetch from '@utils/fetcher'
import { User } from 'types/app.types'

export class UserService {
  static async getUser() {
    const res = await axiosFetch.get<User>('/user')
    return res.data
  }

  static async getMessages(contactId: string | null) {
    const res = await axiosFetch.get(`/user/messages/${contactId}`)
    return res.data
  }

  addContact(contactName: string) {
    return axiosFetch.post(`/user/addContact/`, { username: contactName })
  }

  createFolder(folderName: string) {
    return axiosFetch.post(`/user/createFolder/`, { folderName })
  }
}
