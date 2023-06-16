import { Injectable } from '@nestjs/common';
import { CreateRaceResultDto } from './dto/create-race-result.dto';
import { UpdateRaceResultDto } from './dto/update-race-result.dto';

@Injectable()
export class RaceResultService {
  create(createRaceResultDto: CreateRaceResultDto) {
    return 'This action adds a new raceResult';
  }

  findAll() {
    return `This action returns all raceResult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} raceResult`;
  }

  update(id: number, updateRaceResultDto: UpdateRaceResultDto) {
    return `This action updates a #${id} raceResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} raceResult`;
  }
}
