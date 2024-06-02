import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChatHistoryService } from '@chat-history/chat-history.service';
import { ChatHistory } from '@chat-history/entities/chat-history.entity';
import { ChatRepository } from '@chat/chat.repository';
import { Chat } from '@chat/entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRepository)
    private chatRepository: ChatRepository,
    private chatHistoryService: ChatHistoryService
  ) { }

  public async findUserChats(): Promise<Chat[]> {
    // TODO: User uuid 얻어오기
    let uuid = '';

    let chats = await this.chatRepository.find({
      where: {
        user: { uuid: uuid }
      }
    });

    return chats;
  }

  public async getChatHistory(id: number): Promise<ChatHistory[]> {
    if (!(await this.isOwningChat(id))) {
      return Promise.reject();
    }

    let chatHistories: ChatHistory[] = await this.chatHistoryService.findByChatId(id);

    return chatHistories;
  }

  public async isOwningChat(id: number): Promise<any> {
    // TODO: User uuid 얻어오기
    let uuid = '';

    let chats: Chat[] = await this.findUserChats();

    let isChatExist = chats.some(chat => { chat.user.uuid === uuid && chat.id === id });

    if (!isChatExist)
      return false;

    return true;
  }
}