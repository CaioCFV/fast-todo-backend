import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 2000,
      max: 200, 
    }),
  );

  await app.listen(process.env.PORT);

}
bootstrap();
