import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pocket } from '../entities/pocket.entity';
import { Repository } from 'typeorm';
import { BankAccount } from '../entities/bank-account.entity';

@Injectable()
export class PocketsService {
    constructor(
        @InjectRepository(Pocket)
        private readonly pocketRepository: Repository<Pocket>,
        @InjectRepository(BankAccount)
        private readonly bankAccountRepository: Repository<BankAccount>
    ) {}

    async create(data: {
        bank_account_id: string;
        name: string;
        color?: string;
        icon?: string;
    }): Promise<Pocket> {
        const bankAccount = await this.bankAccountRepository.findOne({
            where: {id: data.bank_account_id},
        });

        if(!bankAccount) {
            throw new NotFoundException('Bank Account with ID '+data.bank_account_id+' not found');
        }

        const pocket = this.pocketRepository.create(data);
        return await this.pocketRepository.save(pocket);
    }

    async findAll(): Promise<Pocket[]> {
        return await this.pocketRepository.find({
            relations: {
                bankAccount: true
            }
        });
    }
}
