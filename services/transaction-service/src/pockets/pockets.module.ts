import { Module } from '@nestjs/common';
import { PocketsController } from './pockets.controller';
import { PocketsService } from './pockets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pocket } from '../entities/pocket.entity';
import { BankAccount } from '../entities/bank-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pocket, BankAccount])],
  controllers: [PocketsController],
  providers: [PocketsService]
})
export class PocketsModule {}
