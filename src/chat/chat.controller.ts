import { Controller, Get, Logger, Param, ParseIntPipe, Query, Req } from '@nestjs/common';

import { ChatService } from '@chat/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Get()
  public async findUserChats(@Req() req: any): Promise<any> {
    return await this.chatService.findUserChats(req.user.uuid);
  }

  @Get('/history?:id')
  public async getChatHistory(@Req() req: any, @Query('id', ParseIntPipe) id: string) {
    return await this.chatService.getChatHistory(req.user.uuid, +id);
  }
}
