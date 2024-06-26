import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChatHistoryRepository } from '@chat-history/chat-history.repository';
import { CreateChatHistoryDto } from '@chat-history/dto/create-chat-history.dto';
import { ChatHistory } from './entities/chat-history.entity';
import { ChatService } from '@chat/chat.service';
import { ErrorType } from '@common/response/error.response';
import { Chat } from '@chat/entities/chat.entity';

@Injectable()
export class ChatHistoryService {
  constructor(
    @InjectRepository(ChatHistoryRepository)
    private chatHistoryRepository: ChatHistoryRepository,

    @Inject(forwardRef(() => ChatService))
    private chatService: ChatService
  ) { }

  public async create(createChatHistoryDto: CreateChatHistoryDto, chat_id: number) {
    let chat: Chat = await this.chatService.findChatById(chat_id);

    if (!chat)
      throw ErrorType.CHAT_NOT_FOUND();

    let chatHistory: ChatHistory = this.chatHistoryRepository.create(createChatHistoryDto);
    chatHistory.chat = chat;

    return this.chatHistoryRepository.save(chatHistory);
  }

  public async findByChatId(chat_id: number) {
    return this.chatHistoryRepository.find({
      where: { chat: { id: chat_id } },
      order: { created_at: 'ASC' }
    });
  }
}
