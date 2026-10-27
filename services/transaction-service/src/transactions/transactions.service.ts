import { BadRequestException, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pocket } from '../entities/pocket.entity';
import { Transaction } from '../entities/transaction.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TransactionsService  implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Pocket)
        private readonly pocketRepository: Repository<Pocket>,
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy,
    ) {}

    async onApplicationBootstrap() {
    try {
      await this.rabbitClient.connect();
      console.log('Connesso a RabbitMQ con successo!');
    } catch (error) {
      console.error('Errore di connessione a RabbitMQ:', error);
    }
  }

    async create (data: {
        from_pocket_id?: string;
        to_pocket_id?: string;
        amount: number;
        transaction_type: 'EXPENSE' | 'INCOME' | 'TRANSFER';
        category_id?: string;
        date: Date;
        note?: string;
    }): Promise<Transaction> {
        if (data.from_pocket_id) {
            const fromPocket = await this.classExists(this.pocketRepository, data.from_pocket_id);
            if (!fromPocket) throw new BadRequestException('From pocket not found');
        }

        if (data.to_pocket_id) {
            const toPocket = await this.classExists(this.pocketRepository, data.to_pocket_id);
            if (!toPocket) throw new BadRequestException('To pocket not found');
        }

        const transaction = this.transactionRepository.create(data);
        const savedTransaction = await this.transactionRepository.save(transaction);

        this.rabbitClient.emit('transaction_created', savedTransaction);

        return savedTransaction;
    }

    async findAll(): Promise<Transaction[]> {
        return await this.transactionRepository.find({
            order: { date: 'DESC' }
        });
    }
    
    private async classExists(repo: Repository<Pocket>, id: string): Promise<boolean> {
        const count = await repo.count({ where: { id } });
        return count > 0;
    }
    
}
