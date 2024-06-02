import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatHistory } from '@chat-history/entities/chat-history.entity';
import { Chat } from '@chat/entities/chat.entity';
import { User } from '@user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3000,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_PSEUDO_CHATGPT,
        autoLoadEntities: true,
        entities: [User, Chat, ChatHistory],
        synchronize: true,
    })],
    exports: [TypeOrmModule]
})
export class DatabaseModule { }
