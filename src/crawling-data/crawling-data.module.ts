import { Module } from '@nestjs/common';
import { CrawlingDataService } from './crawling-data.service';
import { CrawlingDataController } from './crawling-data.controller';

@Module({
  providers: [CrawlingDataService],
  controllers: [CrawlingDataController],
})
export class CrawlingDataModule {}
