import { HttpException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthService } from '../auth.service'
import { Tokens } from '../types/tokens.type'

describe('Auth service integration', () => {
  let prisma: PrismaService
  let authService: AuthService

  beforeAll(async () => {
    const appModuleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    prisma = appModuleRef.get(PrismaService)
    authService = appModuleRef.get(AuthService)
    await prisma.dropDatabase()
  })

  const mockUserData = {
    username: 'TEST_USER',
    password: 'TEST_USER_PASSWORD',
  }

  let tokens: Tokens | null = null

  it('Should signup', async () => {
    const user = await authService.signup(mockUserData)

    expect(user.refresh_token).toBeDefined()
    expect(user.access_token).toBeDefined()
  })

  it('Should login', async () => {
    const user = await authService.login(mockUserData)
    tokens = { ...user }

    expect(user.refresh_token).toBeDefined()
    expect(user.access_token).toBeDefined()
  })

  it('Should return error if credentials is invalid', async () => {
    const user = authService.login({ username: mockUserData.username, password: 'error' })

    expect(async () => await user).rejects.toThrow(HttpException)
  })

  it('Should refresh tokens', async () => {
    const user = await prisma.user.findUnique({
      where: {
        username: mockUserData.username,
      },
    })

    // timeout for 1s so it doesnt generate same token as we received on login
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updateToken = await authService.refreshTokens(user.id, tokens.refresh_token)

    expect(updateToken.access_token).toBeDefined()
    expect(updateToken.refresh_token).toBeDefined()

    expect(updateToken.access_token).not.toEqual(tokens.access_token)
  })
})
