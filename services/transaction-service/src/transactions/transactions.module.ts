import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pocket } from '../entities/pocket.entity';
import { Transaction } from '../entities/transaction.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Pocket]),
ClientsModule.register([
  {
    name: 'RABBITMQ_SERVICE',
    transport:Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'transactions_queue',
      queueOptions: {
        durable: true,
      }
    }
  }
])],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
