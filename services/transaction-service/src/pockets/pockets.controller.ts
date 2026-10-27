import { Body, Controller, Get, Post } from '@nestjs/common';
import { PocketsService } from './pockets.service';
import { Pocket } from '../entities/pocket.entity';

@Controller('pockets')
export class PocketsController {
    constructor(private readonly pocketService: PocketsService) {}

    @Post()
    async create(
        @Body()
        body: {
            bank_account_id: string;
            name: string;
            color?: string;
            icon?: string;
        },
    ): Promise<Pocket> {
        return await this.pocketService.create(body);
    }

    @Get()
    async findAll(): Promise<Pocket[]> {
        return await this.pocketService.findAll();
    }
}
