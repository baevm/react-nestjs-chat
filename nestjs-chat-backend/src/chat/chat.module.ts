import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'

@Module({
  providers: [ChatGateway, ChatService],
  imports: [UserModule],
})
export class ChatModule {}
