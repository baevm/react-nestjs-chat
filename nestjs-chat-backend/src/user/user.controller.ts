import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators/get-current-userId.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetCurrentUserId() userId: string) {
    return this.userService.getUser(userId)
  }

  @Get('/messages/:contactName')
  getMessages(@GetCurrentUserId() userId: string, @Param() params: { contactName: string }) {
    return this.userService.getMessages(userId, params.contactName)
  }

  @Post('/addContact')
  addContact(@Body() body: { username: string }, @GetCurrentUserId() userId: string) {
    return this.userService.addContact(userId, body.username)
  }
}
