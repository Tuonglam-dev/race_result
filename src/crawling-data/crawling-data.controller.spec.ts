import { Test, TestingModule } from '@nestjs/testing';
import { CrawlingDataController } from './crawling-data.controller';

describe('CrawlingDataController', () => {
  let controller: CrawlingDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlingDataController],
    }).compile();

    controller = module.get<CrawlingDataController>(CrawlingDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
