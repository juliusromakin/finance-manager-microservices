import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pocket } from "./pocket.entity";

@Entity('bank_accounts')
export class BankAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 100, nullable: true })
    name: string;

    @Column({length: 34, unique: true })
    iban: string;

    @Column({length: 7, nullable: true})
    color: string;

    @Column ({length: 50, nullable: true})
    icon: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Pocket, (pocket) => pocket.bankAccount, {cascade: true})
    pockets: Pocket[];
}