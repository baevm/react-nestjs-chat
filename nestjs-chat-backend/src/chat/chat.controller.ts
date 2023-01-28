import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators/get-current-userId.decorator'
import { AtGuard } from 'src/common/guards/at.guard'
import { ChatService } from './chat.service'

@UseGuards(AtGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('/updateUnreadCount')
  createFolder(@Body() body: { chatId: string }, @GetCurrentUserId() userId: string) {
    return this.chatService.updateUnreadCount(userId, body.chatId)
  }
}
