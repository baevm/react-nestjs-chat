import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ChatModule } from 'src/chat/chat.module'

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [ChatModule],
})
export class UserModule {}
