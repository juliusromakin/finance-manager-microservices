import { Body, Controller, Get, Post } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccount } from '../entities/bank-account.entity';

@Controller('bank-accounts')
export class BankAccountsController {
    constructor(private readonly bankAccountsService: BankAccountsService){}

    @Post()
    async create (
        @Body() body: {name?: string; iban: string; color?: string; icon?: string },
    ): Promise<BankAccount> {
        return await this.bankAccountsService.create(body);
    }

    @Get()
    async findAll(): Promise<BankAccount[]> {
        return await this.bankAccountsService.findAll();
    }
}
