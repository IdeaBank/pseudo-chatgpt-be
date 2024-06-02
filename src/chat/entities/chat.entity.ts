import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ChatHistory } from '@chat-history/entities/chat-history.entity';
import { User } from '@user/entities/user.entity';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', { nullable: false })
    public name: string;

    @ManyToOne(() => User, { createForeignKeyConstraints: true })
    @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
    public user: User;

    @OneToMany(() => ChatHistory, (chatHistory) => chatHistory.chat, {
        cascade: true,
    })
    public chatHistories: ChatHistory[];
}