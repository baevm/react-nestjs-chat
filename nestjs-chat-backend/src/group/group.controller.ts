import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators/get-current-userId.decorator'
import { AtGuard } from 'src/common/guards/at.guard'
import { GroupService } from './group.service'

@UseGuards(AtGuard)
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('/messages/:groupId')
  getGroupMessages(@Param() params: { groupId: string }) {
    return this.groupService.getGroupMessages(params.groupId)
  }

  @Post('/createGroup')
  createGroup(@Body() body: { groupName: string }, @GetCurrentUserId() userId: string) {
    return this.groupService.createGroup(userId, body.groupName)
  }

  @Post('/invite')
  inviteToGroup(@Body() body: { groupName: string; username: string }) {
    return this.groupService.inviteToGroup(body.groupName, body.username)
  }
}
