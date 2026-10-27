import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService){};

    @Post()
    async create(
        @Body()
        body: {
            from_pocket_id?: string;
            to_pocket_id?: string;
            amount: number;
            transaction_type: 'EXPENSE' | 'INCOME' | 'TRANSFER';
            category_id?: string;
            date: Date;
            note?: string;
        }
    ): Promise<Transaction> {
        return await this.transactionsService.create(body)
    }

    @Get()
    async findAll(): Promise<Transaction[]> {
        return await this.transactionsService.findAll();
    }

    
}
