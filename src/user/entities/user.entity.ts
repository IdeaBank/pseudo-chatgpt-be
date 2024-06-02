import { hash } from 'argon2';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Chat } from '@chat/entities/chat.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    public uuid: string;

    @Column('varchar', { nullable: false })
    public email: string;

    @Column('varchar', { nullable: false })
    public password: string;

    @OneToMany(() => Chat, (chat) => chat.user, {
        cascade: true,
    })
    public chats: Chat[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password);
    }
}