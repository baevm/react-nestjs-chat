import axiosFetch from '@utils/fetcher'

export class GroupService {
  static async getMessages(groupId: string | null) {
    const res = await axiosFetch.get(`/group/messages/${groupId}`)
    return res.data
  }
  static async createGroup(groupName: string) {
    const res = await axiosFetch.post(`/group/createGroup/`, { groupName })
    return res.data
  }

  static async addToGroup(groupId: string, newMemberName: string) {
    const res = await axiosFetch.post(`/group/invite/`, { groupId, username: newMemberName })
    return res.data
  }
}
