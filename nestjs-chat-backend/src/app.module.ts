import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AlertController } from './alert/alert.controller'
import { AlertGateway } from './alert/alert.gateway'
import { ChatGateway } from './chat/chat.gateway'
import { AuthModule } from './auth/auth.module'
import { AtGuard } from './common/guards/at.guard'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  providers: [
    ChatGateway,
    /* AlertGateway, */
    // Make AtGuard global
    { provide: APP_GUARD, useClass: AtGuard },
  ],
  /* controllers: [AlertController], */
})
export class AppModule {}
