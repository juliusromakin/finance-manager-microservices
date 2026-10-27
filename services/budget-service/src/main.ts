import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'transactions_queue',
      queueOptions: {
        durable: true,
      }
    },
  })

  await app.startAllMicroservices();
  await app.listen(3001);
  console.log('Budget service is active!');
}
void bootstrap();
