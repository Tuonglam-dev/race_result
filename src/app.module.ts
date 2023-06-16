import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrawlingDataModule } from './crawling-data/crawling-data.module';
import { UtilService } from './util/util.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RaceResultModule } from './race-result/race-result.module';
// Node env for current environment
const node_env = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !node_env ? '.env' : `.${node_env}.env`,
    }),
    CrawlingDataModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get<string>(`MONGODB_URI`));
        console.log(configService.get<string>('MONGODB_NAME'));
        return {
          uri: configService.get<string>('MONGODB_URI'),
          dbName: configService.get<string>('MONGODB_NAME'),
        };
      },
      inject: [ConfigService],
    }),
    RaceResultModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilService],
})
export class AppModule {}
