import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from '../entities/bank-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankAccountsService {
    constructor(
        @InjectRepository(BankAccount)
        private readonly bankAccountRepository: Repository<BankAccount>,
    ) {}

    async create(data: { name?: string; iban: string; color?: string; icon?: string }): Promise<BankAccount> {
        const account = this.bankAccountRepository.create(data);
        return await this.bankAccountRepository.save(account);
    }

    async findAll(): Promise<BankAccount[]> {
        return await this.bankAccountRepository.find();
    }
}
