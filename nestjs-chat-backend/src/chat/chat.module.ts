import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { UserModule } from 'src/user/user.module'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [UserModule, AuthModule],
})
export class ChatModule {}
