import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { CurrUser, GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { GetCurrentUserId } from 'src/common/decorators/get-current-userId.decorator'
import { AtGuard } from 'src/common/guards/at.guard'
import { UserService } from './user.service'

@UseGuards(AtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetCurrentUserId() userId: string) {
    return this.userService.getUser(userId)
  }

  @Get('/chats')
  getChats(@GetCurrentUserId() userId: string) {
    return this.userService.getChats(userId)
  }


  @Post('/addContact')
  addContact(@Body() body: { username: string }, @GetCurrentUser() user: CurrUser) {
    return this.userService.addContact(user, body.username)
  }

  @Post('/createFolder')
  createFolder(@Body() body: { folderName: string }, @GetCurrentUserId() userId: string) {
    return this.userService.createFolder(userId, body.folderName)
  }
}
