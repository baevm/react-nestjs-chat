import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ChatService } from 'src/chat/chat.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService, private chatService: ChatService) {}

  async createGroup(userId: string, groupName: string) {
    const group = await this.chatService.createChatGroup(groupName)

    const connectOwner = await this.prisma.participants.create({
      data: {
        chatId: group.id,
        userId,
      },
    })

    return group
  }

  async inviteToGroup(groupId: string, username: string) {
    const newUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!newUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    return this.prisma.participants.create({
      data: {
        userId: newUser.id,
        chatId: groupId,
      },
    })
  }

  async removeFromGroup(groupId: string, username: string) {
    const removeUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    return this.prisma.chat.update({
      where: {
        id: groupId,
      },
      data: {
        participants: {
          disconnect: {
            id: removeUser.id,
          },
        },
      },
    })
  }
}
