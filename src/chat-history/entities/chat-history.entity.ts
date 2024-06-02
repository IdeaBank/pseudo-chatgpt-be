import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '@chat-history/role.enum';
import { Chat } from '@chat/entities/chat.entity';

@Entity()
export class ChatHistory {
    @PrimaryGeneratedColumn('increment')
    public history_id: number;

    @ManyToOne(() => Chat, { createForeignKeyConstraints: true })
    @JoinColumn({ name: 'chat_id', referencedColumnName: 'id' })
    public chat: Chat;

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
