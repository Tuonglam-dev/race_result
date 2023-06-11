import { Test, TestingModule } from '@nestjs/testing';
import { CrawlingDataService } from './crawling-data.service';

describe('CrawlingDataService', () => {
  let service: CrawlingDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlingDataService],
    }).compile();

    service = module.get<CrawlingDataService>(CrawlingDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
