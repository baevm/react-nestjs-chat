import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/common/constants/token.const'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { GetCurrentUserId } from 'src/common/decorators/get-current-userId.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { AtGuard } from 'src/common/guards/at.guard'
import { RtGuard } from 'src/common/guards/rt.guard'
import { isProduction } from 'src/common/helpers/isProduction'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Tokens } from './types/tokens.type'

const cookieDomain = '.dezzerlol.tech'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signup(dto)
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response): Promise<Tokens> {
    const tokens = await this.authService.login(dto)

    res.cookie(ACCESS_TOKEN, tokens.access_token, {
      secure: true,
      maxAge: 60 * 15 * 1000,
      sameSite: 'none',
      domain: isProduction ? cookieDomain : null,
    })
    res.cookie(REFRESH_TOKEN, tokens.refresh_token, {
      secure: true,
      maxAge: 60 * 60 * 24 * 7 * 1000,
      sameSite: 'none',
      domain: isProduction ? cookieDomain : null,
    })

    return tokens
  }

  @UseGuards(RtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string, @Res({ passthrough: true }) res: Response) {
    res.cookie(ACCESS_TOKEN, '', {
      secure: true,
      maxAge: 1,
      sameSite: 'none',
      domain: isProduction ? cookieDomain : null,
    })
    res.cookie(REFRESH_TOKEN, '', {
      secure: true,
      maxAge: 1,
      sameSite: 'none',
      domain: isProduction ? cookieDomain : null,
    })
    return this.authService.logout(userId)
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<Tokens> {
    try {
      const tokens = await this.authService.refreshTokens(userId, refreshToken)
      res.cookie(ACCESS_TOKEN, tokens.access_token, {
        secure: true,
        maxAge: 60 * 15 * 1000,
        sameSite: 'none',
        domain: isProduction ? cookieDomain : null,
      })
      res.cookie(REFRESH_TOKEN, tokens.refresh_token, {
        secure: true,
        maxAge: 60 * 60 * 24 * 7 * 1000,
        sameSite: 'none',
        domain: isProduction ? cookieDomain : null,
      })

      return tokens
    } catch (error) {
      res.cookie(ACCESS_TOKEN, '', {
        secure: true,
        maxAge: 1,
        sameSite: 'none',
        domain: isProduction ? cookieDomain : null,
      })
      res.cookie(REFRESH_TOKEN, '', {
        secure: true,
        maxAge: 1,
        sameSite: 'none',
        domain: isProduction ? cookieDomain : null,
      })
    }
  }
}
