import { Controller, Get } from '@nestjs/common';
import { CrawlingDataService } from './crawling-data.service';

@Controller('crawling-data')
export class CrawlingDataController {
    constructor(
        private readonly CrawlingService: CrawlingDataService
    ) {}

    @Get()
    async getCrawling(): Promise<any> {
        return await this.CrawlingService.CrawlingDataToDB();
    }
}
