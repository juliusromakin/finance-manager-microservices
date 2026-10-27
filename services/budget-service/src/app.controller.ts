import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(readonly appService: AppService) {}

  @EventPattern('transaction_created')
  handleTransactionCreated(@Payload() data: any) {
    console.log('📥 [Budget Service] Ricevuta nuova transazione da RabbitMQ! 🚀');
    console.log('Dati transazione:', data);
  }
}