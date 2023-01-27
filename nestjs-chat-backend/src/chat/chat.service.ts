import { Injectable } from '@nestjs/common'
import generateId from 'src/common/generateId'
import { PrismaService } from 'src/prisma/prisma.service'
import { NewMessage } from './types/newMessage.type'

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getChatIdsByUserId(userId: string) {
    const chats = await this.prisma.participants.findMany({
      where: {
        userId,
      },
      select: {
        chatId: true,
      },
    })
    const chatIds = chats.map((chat) => chat.chatId)

    return chatIds
  }

  async saveMessage(message) {
    const newMessage = await this.prisma.message.create({
      data: {
        id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        chatId: message.chatId,
        userId: message.userId,

        readBy: {
          connect: {
            id: message.userId,
          },
        },
      },
    })

    const participants = await this.prisma.participants.updateMany({
      where: {
        chatId: message.chatId,
        NOT: {
          userId: message.userId,
        },
      },
      data: {
        unreadCount: { increment: 1 },
      },
    })

    return newMessage
  }

  formatMessage(message: NewMessage) {
    return {
      ...message,
      id: generateId(),
      createdAt: new Date(),
    }
  }
}
