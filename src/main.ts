import { NestFactory } from '@nestjs/core';
import { Log4jsLogger } from '@nestx-log4js/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Log4jsLogger));
  await app.listen(3000);
}
bootstrap();
