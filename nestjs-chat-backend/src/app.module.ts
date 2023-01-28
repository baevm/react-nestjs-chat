import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from './auth/auth.module'
import { ChatGateway } from './chat/chat.gateway'
import { ChatModule } from './chat/chat.module'
import { ChatService } from './chat/chat.service'
import { AtGuard } from './common/guards/at.guard'
import { GroupModule } from './group/group.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ChatModule, GroupModule],
  providers: [
    ChatGateway,
    // Make AtGuard global
    { provide: APP_GUARD, useClass: AtGuard },
    ChatService,
  ],
})
export class AppModule {}
