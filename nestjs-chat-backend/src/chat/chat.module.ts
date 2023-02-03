import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { UserModule } from 'src/user/user.module'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
})
export class ChatModule {}
