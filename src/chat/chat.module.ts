import { Module } from '@nestjs/common';

import { ChatHistoryModule } from '@chat-history/chat-history.module';
import { ChatController } from '@chat/chat.controller';
import { ChatRepository } from '@chat/chat.repository';
import { ChatService } from '@chat/chat.service';
import { UserModule } from '@user/user.module';

@Module({
  imports: [UserModule, ChatHistoryModule],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
  exports: [ChatService, ChatRepository]
})
export class ChatModule {}