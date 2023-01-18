import axiosFetch from "@utils/fetcher"

export class GroupService {
    static async getMessages(groupId: string | null) {
        const res = await axiosFetch.get(`/group/messages/${groupId}`)
        return res.data
    }
    createGroup(groupName: string) {
        return axiosFetch.post(`/group/createGroup/`, { groupName })
    }
}