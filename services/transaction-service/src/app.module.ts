import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { Pocket } from './entities/pocket.entity';
import { Transaction } from './entities/transaction.entity';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { PocketsModule } from './pockets/pockets.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'transactions_db',
      entities: [BankAccount, Pocket, Transaction],
      synchronize: true,
    }),
    BankAccountsModule,
    PocketsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
