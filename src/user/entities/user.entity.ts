import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    @Unique('username', ['username'])
    username: string;

    @Column({length: 255})
    name: string;

    @Column({length: 255})
    password: string;

    @Column({default: true})
    isActive: boolean;

    @CreateDateColumn({name: 'createdAt', nullable: true})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt', nullable: true})
    updatedAt: Date;
}