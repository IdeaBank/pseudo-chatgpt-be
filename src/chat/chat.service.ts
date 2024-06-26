import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChatHistoryService } from '@chat-history/chat-history.service';
import { ChatHistory } from '@chat-history/entities/chat-history.entity';
import { ChatRepository } from '@chat/chat.repository';
import { Chat } from '@chat/entities/chat.entity';
import { ErrorType } from '@common/response/error.response';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRepository)
    private chatRepository: ChatRepository,

    @Inject(forwardRef(() => ChatHistoryService))
    private chatHistoryService: ChatHistoryService
  ) { }

  public async findUserChats(uuid: string): Promise<Chat[]> {
    let chats = await this.chatRepository.find({
      where: {
        user: { uuid: uuid }
      }
    });

    return chats;
  }

  public async getChatHistory(uuid: string, chat_id: number): Promise<ChatHistory[]> {
    if (!(await this.isOwningChat(uuid, chat_id))) {
      throw ErrorType.FORBIDDEN_ACCESS();
    }

    let chatHistories: ChatHistory[] = await this.chatHistoryService.findByChatId(chat_id);

    return chatHistories;
  }

  public async isOwningChat(uuid: string, chat_id: number): Promise<any> {
    let chats: Chat[] = await this.findUserChats(uuid);

    let isChatExist = chats.some(chat => {
      chat.user.uuid === uuid && chat.id === chat_id
    });

    if (!isChatExist)
      return false;

    return true;
  }

  public async findChatById(chat_id: number) {
    return await this.chatRepository.findOne({
      where: { id: chat_id }
    });
  }
}