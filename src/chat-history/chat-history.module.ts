import { Module, forwardRef } from '@nestjs/common';

import { ChatHistoryRepository } from '@chat-history/chat-history.repository';
import { ChatHistoryService } from '@chat-history/chat-history.service';
import { ChatModule } from '@chat/chat.module';
import { ChatService } from '@chat/chat.service';
import { ChatRepository } from '@chat/chat.repository';

@Module({
  imports: [
    forwardRef(() => ChatModule)
  ],
  providers: [ChatHistoryService, ChatHistoryRepository],
  exports: [ChatHistoryService, ChatHistoryRepository]
})
export class ChatHistoryModule { }
