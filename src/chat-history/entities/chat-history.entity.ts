import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Role } from '@chat-history/role.enum';
import { Chat } from '@chat/entities/chat.entity';

@Entity()
export class ChatHistory {
    @ManyToOne(() => Chat, { createForeignKeyConstraints: true })
    @JoinColumn({ referencedColumnName: 'id' })
    public chat_id: number;

    @Column('enum', { nullable: false, enum: Role })
    public role: Role;

    @Column('varchar', { nullable: false })
    public content: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public created_at: Date;
}
