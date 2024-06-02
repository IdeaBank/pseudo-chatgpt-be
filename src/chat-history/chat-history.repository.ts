import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ChatHistory } from '@chat-history/entities/chat-history.entity';

@Injectable()
export class ChatHistoryRepository extends Repository<ChatHistory> {
    constructor(private dataSource: DataSource) {
        super(ChatHistory, dataSource.createEntityManager());
    }
}