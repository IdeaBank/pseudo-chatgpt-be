import { Controller, Get } from '@nestjs/common';

import { ChatService } from '@chat/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  public async findUserChats(): Promise<any> {
    return await this.chatService.findUserChats();
  }

  @Get('/history')
  public async getChatHistory() {
    return await this.chatService.getChatHistory(1);
  }
}
