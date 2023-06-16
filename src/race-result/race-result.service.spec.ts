import { Test, TestingModule } from '@nestjs/testing';
import { RaceResultService } from './race-result.service';

describe('RaceResultService', () => {
  let service: RaceResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaceResultService],
    }).compile();

    service = module.get<RaceResultService>(RaceResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
