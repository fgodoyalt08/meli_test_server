import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiMiddleware } from './app.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(ApiMiddleware);
  await app.listen(3001);
}
bootstrap();
