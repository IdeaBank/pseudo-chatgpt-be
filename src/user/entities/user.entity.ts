import { hash } from 'argon2';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    public uuid: string;

    @Column('varchar', { nullable: false })
    public email: string;

    @Column('varchar', { nullable: false })
    public password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password);
    }
}