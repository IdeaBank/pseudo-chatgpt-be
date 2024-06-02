import { Module } from '@nestjs/common';

import { ChatHistoryRepository } from '@chat-history/chat-history.repository';
import { ChatHistoryService } from '@chat-history/chat-history.service';

@Module({
  providers: [ChatHistoryService, ChatHistoryRepository],
  exports: [ChatHistoryService, ChatHistoryRepository]
})
export class ChatHistoryModule { }
