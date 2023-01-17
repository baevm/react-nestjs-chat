import { Injectable } from '@nestjs/common'
import generateId from 'src/common/generateId'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

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

  async createGroup(userId: string, groupName: string) {
    return this.prisma.group.create({
      data: {
        id: generateId('G'),
        name: groupName,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async inviteToGroup(groupName: string, username: string) {
    return this.prisma.group.update({
      where: {
        name: groupName,
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
