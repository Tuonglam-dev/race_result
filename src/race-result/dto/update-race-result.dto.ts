import { PartialType } from '@nestjs/mapped-types';
import { CreateRaceResultDto } from './create-race-result.dto';

export class UpdateRaceResultDto extends PartialType(CreateRaceResultDto) {}
