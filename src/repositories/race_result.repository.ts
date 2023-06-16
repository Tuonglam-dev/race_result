import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base/base.abstract.repository';
import { RaceResult } from '../race-result/entities/race-result.entity';
import { RaceResultInterface } from '../race-result/interfaces/race_result.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RaceResultRepository
  extends BaseRepository<RaceResult>
  implements RaceResultInterface
{
  constructor(
    @InjectModel(RaceResult.name)
    private readonly race_result_repository: Model<RaceResult>,
  ) {
    super(race_result_repository);
  }
}
