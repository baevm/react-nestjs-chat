import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(message: { senderId: string; receiverId: string; text: string }) {
    return this.prisma.message.create({ data: message })
  }
}
