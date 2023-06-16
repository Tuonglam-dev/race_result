import { Test, TestingModule } from '@nestjs/testing';
import { RaceResultController } from './race-result.controller';
import { RaceResultService } from './race-result.service';

describe('RaceResultController', () => {
  let controller: RaceResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaceResultController],
      providers: [RaceResultService],
    }).compile();

    controller = module.get<RaceResultController>(RaceResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
