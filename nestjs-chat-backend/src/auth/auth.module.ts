import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AtStrategy } from 'src/strategies/at.strategy'
import { RtStrategy } from 'src/strategies/rt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'

@Module({
  providers: [AuthService, AtStrategy, RtStrategy],
  controllers: [AuthController],
  imports: [JwtModule.register({}), forwardRef(() => UserModule)],
  exports: [AuthService],
})
export class AuthModule {}
