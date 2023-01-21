import { Injectable } from '@nestjs/common'
import generateId from 'src/common/generateId'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(userId: string, groupName: string) {
    /* return this.prisma.group.create({
      data: {
        id: generateId('G'),
        name: groupName,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    }) */

    const group = await this.prisma.chat.create({
      data: {
        id: generateId('G'),
        title: groupName,
        type: 'group',
      },
    })

    const participants = await this.prisma.participants.create({
      data: {
        chatId: group.id,
        userId,
      },
    })

    return group
  }

  async getGroup(groupId: string) {
    return this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        users: {
          select: {
            username: true,
            id: true,
            avatar: true,
          },
        },
      },
    })
  }

  async getGroupMessages(groupId: string) {
    return this.prisma.message.findMany({
      where: {
        groupId,
      },
      select: {
        id: true,
        text: true,
        senderId: true,
        createdAt: true,
      },
    })
  }

  async inviteToGroup(groupId: string, username: string) {
    return this.prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        users: {
          connect: {
            username,
          },
        },
      },
    })
  }

  async removeFromGroup(groupName: string, username: string) {
    return this.prisma.group.update({
      where: {
        name: groupName,
      },
      data: {
        users: {
          disconnect: {
            username,
          },
        },
      },
    })
  }
}
