import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AlertController } from './alert/alert.controller'
import { AlertGateway } from './alert/alert.gateway'
import { ChatGateway } from './chat/chat.gateway'
import { AuthModule } from './auth/auth.module'
import { AtGuard } from './common/guards/at.guard'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ChatModule, GroupModule],
  providers: [
    ChatGateway,
    /* AlertGateway, */
    // Make AtGuard global
    { provide: APP_GUARD, useClass: AtGuard },
    ChatService,
  ],
  /* controllers: [AlertController], */
})
export class AppModule {}
