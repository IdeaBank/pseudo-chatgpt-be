import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChatHistoryRepository } from '@chat-history/chat-history.repository';
import { CreateChatHistoryDto } from '@chat-history/dto/create-chat-history.dto';

@Injectable()
export class ChatHistoryService {
  constructor(
    @InjectRepository(ChatHistoryRepository)
    private chatHistoryRepository: ChatHistoryRepository
  ) { }

  create(createChatHistoryDto: CreateChatHistoryDto) {
    return 'This action adds a new chatHistory';
  }

  public async findByChatId(chat_id: number) {
    return this.chatHistoryRepository.find({
      where: { chat_id: chat_id },
      order: { created_at: 'ASC' }
    });
  }
}
