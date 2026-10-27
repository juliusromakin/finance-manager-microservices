import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    from_pocket_id: string;

    @Column({ nullable: true })
    to_pocket_id: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column({ length: 20 })
    transaction_type: string;

    @Column({ nullable: true })
    category_id: string;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'text', nullable: true })
    note: string;

    @CreateDateColumn()
    created_at: Date;
}