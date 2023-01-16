import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(userId: string, groupName: string) {
    return this.prisma.group.create({
      data: {
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
        messages: {
          select: {
            id: true,
            text: true,
            senderId: true,
            createdAt: true,
          },
        },
      },
    })
  }
}
