import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

import { ChatHistory } from '@chat-history/entities/chat-history.entity';
import { Role } from '@chat-history/role.enum';

export class CreateChatHistoryDto extends OmitType(ChatHistory, ['created_at']) {
    @IsNotEmpty()
    public chat_id: number;

    @IsNotEmpty()
    public role: Role;

    @IsNotEmpty()
    public content: string;

}