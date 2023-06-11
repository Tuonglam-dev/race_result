import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT;
const HOST = process.env.HOST;
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, HOST, () => {
    logger.log(`Server Starting On Host: ${HOST}:${PORT}`);
  });
}
bootstrap();
