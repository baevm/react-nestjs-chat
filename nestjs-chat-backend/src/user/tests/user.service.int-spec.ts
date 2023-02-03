import { HttpException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { User } from '@prisma/client'
import { AppModule } from 'src/app.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from '../user.service'

describe('User service integration', () => {
  let userService: UserService
  let prisma: PrismaService
  let user1: User | null = null
  let user2: User | null = null

  const mockUser1 = {
    username: 'TEST_USER',
    password: 'TEST_USER_PASSWORD',
    id: 'random_user_id',
  }

  const mockUser2 = {
    username: 'CHAT_USER',
    password: 'CHAT_USER_PASSWORD',
    id: 'chatUser1337',
  }

  beforeAll(async () => {
    const appModuleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    prisma = appModuleRef.get(PrismaService)
    userService = appModuleRef.get<UserService>(UserService)
    await prisma.dropDatabase()

    const [newUser1, newUser2] = await prisma.$transaction([
      prisma.user.create({
        data: {
          id: mockUser1.id,
          username: mockUser1.username,
          password: mockUser1.password,
        },
      }),
      prisma.user.create({
        data: {
          id: mockUser2.id,
          username: mockUser2.username,
          password: mockUser2.password,
        },
      }),
    ])

    user1 = newUser1
    user2 = newUser2
  })

  it('Should return user', async () => {
    const userFromDb = await userService.getUser(user1.id)

    expect(userFromDb.username).toBe(user1.username)
  })

  it('Should add contact', async () => {
    const res = await userService.addContact({ id: user1.id, username: user1.username }, user2.username)

    expect(res.message).toBe('ok')
  })

  it('Should return error if already added contact', async () => {
    const addPromise = userService.addContact({ id: user1.id, username: user1.username }, user2.username)

    console.log({ addPromise })

    expect(async () => await addPromise).rejects.toThrowError(HttpException)
  })
})
