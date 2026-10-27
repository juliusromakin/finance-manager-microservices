import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BankAccount } from "./bank-account.entity";

@Entity('pockets')
export class Pocket{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    bank_account_id: string;

    @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.pockets, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'bank_account_id'})
    bankAccount: BankAccount;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 7, nullable: true })
    color: string;

    @Column({ length: 50, nullable: true })
    icon: string;

    @CreateDateColumn()
    created_at: Date;
}