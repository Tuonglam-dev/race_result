import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CrawlingDataModule } from './crawling-data/crawling-data.module';
import { MongooseModule } from '@nestjs/mongoose';
// Node env for current environment
const node_env = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !node_env ? '.env' : `.${node_env}.env`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@test-db.v4j1t6w.mongodb.net/?retryWrites=true&w=majority`,
    ),
    CrawlingDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
