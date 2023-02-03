import { Module } from '@nestjs/common'
import { GroupService } from './group.service'
import { GroupController } from './group.controller'
import { ChatModule } from 'src/chat/chat.module'

@Module({
  providers: [GroupService],
  controllers: [GroupController],
  imports: [ChatModule],
})
export class GroupModule {}
