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

  static async addContact(contactName: string) {
    const res = await axiosFetch.post(`/user/addContact/`, { username: contactName })
    return res.data
  }

  static async createFolder(folderName: string) {
    const res = await axiosFetch.post(`/user/createFolder/`, { folderName })
    return res.data
  }
}
